# 🚀 Deploying ResumeTeX on Render

A complete, step-by-step guide to deploy the **whole stack** — PostgreSQL database, FastAPI backend, and Next.js frontend — on [Render](https://render.com), from zero to a working live app.

---

## Table of contents

1. [How the pieces fit together](#1-how-the-pieces-fit-together)
2. [Prerequisites](#2-prerequisites)
3. [What the backend handles for you](#3-what-the-backend-handles-for-you)
4. [Step 1 — Create the PostgreSQL database](#step-1--create-the-postgresql-database)
5. [Step 2 — Deploy the backend (FastAPI)](#step-2--deploy-the-backend-fastapi)
6. [Step 3 — Deploy the frontend (Next.js)](#step-3--deploy-the-frontend-nextjs)
7. [Step 4 — Wire them together](#step-4--wire-them-together)
8. [Step 5 — Verify the deployment](#step-5--verify-the-deployment)
9. [How login/cookies work in production](#how-logincookies-work-in-production)
10. [Environment variables reference](#environment-variables-reference)
11. [Troubleshooting](#troubleshooting)
12. [Optional: one-click Blueprint (`render.yaml`)](#optional-one-click-blueprint-renderyaml)
13. [Costs & free-tier caveats](#costs--free-tier-caveats)

---

## 1. How the pieces fit together

This is a **monorepo** with three deployable parts:

```
                          ┌──────────────────────────────┐
   Browser  ── HTTPS ──►  │  Frontend  (Next.js web svc) │
                          │  frontend.onrender.com       │
                          │                              │
                          │  /backend-api/*  ──proxy──┐  │   (server-side rewrite,
                          └───────────────────────────┼──┘    so the auth cookie
                                                      │        stays first-party)
                                                      ▼
                          ┌──────────────────────────────┐
                          │  Backend  (FastAPI web svc)  │
                          │  backend.onrender.com        │
                          └───────────────┬──────────────┘
                                          │  postgresql+psycopg://
                                          ▼
                          ┌──────────────────────────────┐
                          │  PostgreSQL (Render managed)  │
                          └──────────────────────────────┘
```

- **Database** — Render Managed PostgreSQL.
- **Backend** — FastAPI, runs from `backend/`. On first boot it **auto-creates its tables and runs all migrations** (Alembic), so there's no manual DB setup.
- **Frontend** — Next.js, runs from `frontend/`. It **proxies** API calls (`/backend-api/*`) to the backend so the browser only ever talks to one origin — this keeps the HttpOnly login cookie working.

You'll create **three separate Render resources**, in this order: **Database → Backend → Frontend**.

---

## 2. Prerequisites

- A [Render account](https://dashboard.render.com/) (free to start).
- This repo pushed to **GitHub/GitLab** (Render deploys from a connected repo). Note the **branch** you want to deploy (e.g. `main`).
- ~15 minutes.

> 💡 Render auto-deploys on every push to the connected branch. Pick the branch you treat as "production."

---

## 3. What the backend handles for you

Two things are built into the backend so deployment is painless on managed Postgres — **no code changes needed**:

- **Driver auto-normalization** — set `DATABASE_URL` to the plain `postgresql://…` URL Render gives you and the app automatically uses the psycopg-3 driver (`postgresql+psycopg://`). Passing the `+psycopg` form explicitly works too.
- **Fail-safe provisioning** — on a fresh local PostgreSQL the app creates the database for you; on managed Postgres (where the DB already exists and the role can't create databases) it safely skips that step.

On first boot the backend also **creates all tables and the `citext` extension, and runs every Alembic migration automatically** — there is no manual database setup. Just push your code and deploy.

---

## Step 1 — Create the PostgreSQL database

1. Render Dashboard → **New +** → **PostgreSQL**.
2. Fill in:
   | Field | Value |
   |---|---|
   | **Name** | `resumetex-db` |
   | **Region** | pick one (e.g. *Oregon*) — **use the same region for all 3 resources** |
   | **PostgreSQL Version** | 16 (default is fine) |
   | **Plan** | Free to test · Basic/Standard for real use |
3. Click **Create Database** and wait until status is **Available**.
4. Open the database page → **Connections** → copy the **Internal Database URL**. It looks like:
   ```
   postgresql://resumetex_user:somepassword@dpg-xxxx-a/resumetex_db
   ```

> ✅ Use this **Internal URL as-is** — the backend automatically selects the psycopg-3 driver (no need to add `+psycopg` yourself, though it's fine if you do). Prefer the **Internal** URL (faster, no egress fees) since the backend runs in the same Render region.

---

## Step 2 — Deploy the backend (FastAPI)

1. Render Dashboard → **New +** → **Web Service** → connect your repo → pick the branch.
2. Render may auto-detect Python. Set the fields exactly:

   | Field | Value |
   |---|---|
   | **Name** | `resumetex-backend` |
   | **Region** | same as the database |
   | **Root Directory** | `backend` |
   | **Runtime** | Python |
   | **Build Command** | `pip install -r requirements.txt` |
   | **Start Command** | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |
   | **Health Check Path** | `/health` |
   | **Instance Type** | Free (sleeps when idle) or Starter (always-on) |

   > ⚠️ The start command **must** include `--host 0.0.0.0 --port $PORT`. Without it Render reports *"No open ports detected"* and the deploy fails. **Do not** add `--reload` (that's for local dev) and **do not** add `--workers` (a single worker avoids two processes racing on the startup migrations).

3. Add **Environment Variables** (scroll down, or the **Environment** tab):

   | Key | Value |
   |---|---|
   | `DATABASE_URL` | the **Internal URL** from Step 1 (plain `postgresql://…` is fine — it's auto-normalized) |
   | `JWT_SECRET` | a long random string — generate with `openssl rand -hex 32` |
   | `COOKIE_SECURE` | `true` |
   | `FRONTEND_ORIGIN` | your frontend URL (set in **Step 4** — or pre-fill `https://resumetex-frontend.onrender.com`) |
   | `PYTHON_VERSION` | `3.11.9` |

4. Click **Create Web Service**. Watch the logs — on first boot you should see Alembic run:
   ```
   INFO  [alembic.runtime.migration] Running upgrade  -> d2790f7a940b, initial schema
   ```
   That means the tables + `citext` extension were created automatically. 🎉

5. Note the backend's public URL, e.g. `https://resumetex-backend.onrender.com`. Confirm it's live:
   - `https://resumetex-backend.onrender.com/health` → `{"status":"ok"}`
   - `https://resumetex-backend.onrender.com/docs` → the Swagger UI

---

## Step 3 — Deploy the frontend (Next.js)

1. Render Dashboard → **New +** → **Web Service** → same repo + branch.
2. Set the fields:

   | Field | Value |
   |---|---|
   | **Name** | `resumetex-frontend` |
   | **Region** | same region |
   | **Root Directory** | `frontend` |
   | **Runtime** | Node |
   | **Build Command** | `npm install && npm run build` |
   | **Start Command** | `npm start` |
   | **Instance Type** | Free or Starter |

   > `npm start` runs `next start`, which automatically binds to `0.0.0.0:$PORT` — no extra flags needed.

3. Add **Environment Variables**:

   | Key | Value |
   |---|---|
   | `BACKEND_ORIGIN` | the backend URL from Step 2, e.g. `https://resumetex-backend.onrender.com` |
   | `NEXT_PUBLIC_API_URL` | `/backend-api` *(optional — this is already the default)* |
   | `NODE_VERSION` | `20` *(optional)* |

   > `BACKEND_ORIGIN` is what `next.config.js` proxies `/backend-api/*` to. It's read at server start, so it just needs to be present as an env var (it is).

4. Click **Create Web Service**. Note the frontend URL, e.g. `https://resumetex-frontend.onrender.com`.

---

## Step 4 — Wire them together

Now that both URLs exist, make sure the backend trusts the frontend:

1. Open the **backend** service → **Environment** → set/confirm:
   ```
   FRONTEND_ORIGIN = https://resumetex-frontend.onrender.com
   ```
   (Comma-separate if you have more than one origin, e.g. a custom domain too.)
2. Saving env vars triggers an automatic redeploy of the backend. Wait for it to go **Live**.

> 🔁 **Render URLs are predictable** (`https://<service-name>.onrender.com`), so you can set `FRONTEND_ORIGIN` and `BACKEND_ORIGIN` upfront and skip the back-and-forth.

---

## Step 5 — Verify the deployment

1. Open the **frontend** URL in a browser → the landing page loads.
2. Go to **/login** → create an account → you should be redirected in, with a session cookie set.
3. Open the **Builder**, fill a field, **Compile** → a PDF preview appears and downloads.
4. Refresh the page → you stay logged in (cookie persisted). Sign out → session revoked.

If all four work, you're done. ✅

---

## How login/cookies work in production

The browser **only ever talks to the frontend domain**. The frontend's `next.config.js` rewrite proxies `/backend-api/*` to `BACKEND_ORIGIN` **server-side**, and forwards cookies both ways. So the backend's `HttpOnly` JWT cookie is treated as **first-party** to the frontend domain — no cross-site cookie blocking.

For this to work in production you need:
- **HTTPS** on both services (Render gives you this automatically), and
- **`COOKIE_SECURE=true`** on the backend (a `Secure` cookie is required over HTTPS).

That's the whole reason the proxy exists — don't point the browser directly at the backend domain.

---

## Environment variables reference

### Backend (`resumetex-backend`)
| Key | Required | Example / Notes |
|---|---|---|
| `DATABASE_URL` | ✅ | Render's Internal URL; a plain `postgresql://…` is accepted (the app adds the psycopg driver) |
| `JWT_SECRET` | ✅ | long random string (`openssl rand -hex 32`) |
| `COOKIE_SECURE` | ✅ | `true` in production |
| `FRONTEND_ORIGIN` | ✅ | `https://resumetex-frontend.onrender.com` (comma-separated for multiple) |
| `PYTHON_VERSION` | recommended | `3.11.9` |

### Frontend (`resumetex-frontend`)
| Key | Required | Example / Notes |
|---|---|---|
| `BACKEND_ORIGIN` | ✅ | `https://resumetex-backend.onrender.com` |
| `NEXT_PUBLIC_API_URL` | optional | defaults to `/backend-api` |
| `NODE_VERSION` | optional | `20` |

---

## Troubleshooting

| Symptom | Cause & fix |
|---|---|
| **"No open ports detected"** (backend) | Start command is missing `--host 0.0.0.0 --port $PORT`. Fix the start command. |
| Backend crashes on boot with a `postgres` DB / permission error | The backend already skips this on managed Postgres — make sure you've deployed the latest code (pull & redeploy). |
| `ModuleNotFoundError` / can't find `app` | **Root Directory** isn't set to `backend`. |
| `could not translate host name` / connection error to the DB | Use the **Internal Database URL** and the **same region** for the DB + backend. (A plain `postgresql://` URL is fine — the app auto-selects the psycopg driver.) |
| `type "citext" does not exist` | The `citext` extension couldn't be created. Render supports it; ensure the DB role can `CREATE EXTENSION`, or enable `citext` once via the DB shell: `CREATE EXTENSION IF NOT EXISTS citext;` |
| Login works but you get **logged out on refresh** / 401s | `COOKIE_SECURE` not `true`, or the frontend is calling the backend directly instead of via `/backend-api`. Confirm `BACKEND_ORIGIN` is set and you're visiting the **frontend** URL. |
| CORS errors in the console | Set `FRONTEND_ORIGIN` on the backend to the exact frontend URL and redeploy. |
| Frontend build fails on `next build` | Make sure **Root Directory = frontend** and Node 18+. Build command `npm install && npm run build`. |
| First request after idle is very slow | Free instances **spin down** after ~15 min. First hit cold-starts (~50s). Upgrade to a paid instance for always-on. |

To watch what's happening, open each service → **Logs**.

---

## Optional: one-click Blueprint (`render.yaml`)

Instead of clicking through the dashboard, commit a `render.yaml` to the repo root and use **New + → Blueprint**. Render provisions all three resources at once.

```yaml
databases:
  - name: resumetex-db
    plan: free            # upgrade for production
    postgresMajorVersion: "16"

services:
  # ── Backend (FastAPI) ──
  - type: web
    name: resumetex-backend
    runtime: python
    rootDir: backend
    plan: free
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
    healthCheckPath: /health
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.9
      - key: JWT_SECRET
        generateValue: true        # Render generates a strong secret
      - key: COOKIE_SECURE
        value: "true"
      - key: FRONTEND_ORIGIN
        sync: false                # set in dashboard after the frontend exists
      - key: DATABASE_URL
        fromDatabase:
          name: resumetex-db
          property: connectionString

  # ── Frontend (Next.js) ──
  - type: web
    name: resumetex-frontend
    runtime: node
    rootDir: frontend
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_VERSION
        value: "20"
      - key: NEXT_PUBLIC_API_URL
        value: /backend-api
      - key: BACKEND_ORIGIN
        sync: false                # set to the backend URL after it's created
```

> **`DATABASE_URL` is wired automatically** via `fromDatabase` — the app normalizes the plain `postgresql://` URL to the psycopg driver, so no manual editing is needed. The remaining `sync: false` vars (`FRONTEND_ORIGIN`, `BACKEND_ORIGIN`) get filled in the dashboard after the first apply, once both service URLs exist.

---

## Costs & free-tier caveats

The free tier is great for testing, but note:

- **Free web services sleep** after ~15 minutes of inactivity → slow cold starts.
- **Free PostgreSQL is deleted after ~30 days** (and is capped in size). For anything real, use a paid database plan and take backups.
- For an always-on app: **Starter** web services (~$7/mo each) + a paid DB.

### Custom domains (optional)
Each service → **Settings → Custom Domains** → add your domain and follow the DNS instructions. After adding a custom domain to the frontend, add it to the backend's `FRONTEND_ORIGIN` (comma-separated) and redeploy.

---

Built with FastAPI + Next.js + PostgreSQL. Happy shipping! 🚀
