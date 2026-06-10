<div align="center">

<img src="./frontend/src/app/icon.svg" width="88" alt="ResumeTeX logo"/>

# ResumeTeX

**Your résumé, perfectly typeset.**

Build a LaTeX resume in the browser — fill it by hand, import it from a file with AI,
or let AI tailor it to a job description. Watch the LaTeX update live and compile to
a pixel-perfect PDF in one click.

<sub>Next.js 14 · FastAPI · PostgreSQL · LLM-powered import & tailoring · zero LaTeX knowledge needed</sub>

</div>

---

## Three ways to build

| Mode | What it does |
|---|---|
| ✍️ **Manual** | Fill the form field by field; the LaTeX source regenerates live as you type. Reorder, rename, or toggle sections; add fully custom sections; undo with `Ctrl+Z`. |
| 📄 **Upload** | Drop in an existing **PDF / DOCX / TXT** resume. A three-stage AI pipeline *extracts → parses → verifies* it (real hyperlinks included — even the ones hidden behind "View Credential" anchors), shows you a review, then fills the form. |
| 🎯 **Transform** | Paste a **job description** and AI re-tunes your resume for that exact role — rephrasing bullets, reordering sections, and surfacing what matters. Save the result as a new branch or apply it in place. |

> **The no-fabrication guarantee.** Transform never invents anything. After the AI responds,
> a deterministic server-side guard restores every fact — names, employers, dates, degrees,
> numbers, URLs — verbatim from your original, deletes any entry the AI made up, and reports
> **honest gaps**: requirements the JD asks for that your resume doesn't show, explicitly *not* added.

## One master, many versions

Every account gets a **master resume** plus unlimited tailored **branches** — fork the
master for each application, switch between them instantly, rename, delete, or restore
any branch back to the master. Nothing is saved until you say so: manual **Save**,
**Revert** to last saved, and full **Undo** history.

## Features at a glance

- 🖋 **Live LaTeX preview** — see the generated source update on every keystroke
- 📑 **One-click PDF** — compiled by a real LaTeX engine, downloadable instantly
- 🎨 **Ink & Gold design** — dark and light themes, ambient typographic atmosphere
- 🔐 **Self-owned data** — your resumes live in *your* PostgreSQL; HttpOnly-cookie auth with revocable server-side sessions
- 🧩 **Custom sections** — define your own fields beyond the nine built-in sections
- ⚡ **Fast dev loop** — Turbopack dev server, self-hosted fonts, instant route feedback

## Tech stack

| Layer | Frontend | Backend |
|---|---|---|
| Core | Next.js 14 (App Router), React 18, TypeScript | FastAPI, Uvicorn |
| Data | — | SQLAlchemy 2 + psycopg 3, PostgreSQL, Alembic |
| Auth | same-origin cookie session | JWT in HttpOnly cookie, bcrypt, revocable sessions |
| AI | — | Nebius LLM (OpenAI-compatible) for import & tailoring |
| Styling | Tailwind CSS, Framer Motion, lucide-react | — |
| PDF | live LaTeX preview | proxies LaTeX → external compile service |

The browser talks only to the frontend, which proxies API calls to the backend
(`/backend-api/*`) so the auth cookie stays first-party — no CORS, no third-party
cookie issues.

## Quickstart

**Prerequisites:** Node.js 18+, Python 3.11+, PostgreSQL 14+

### 1. Backend

```bash
cd backend
python -m venv .venv
# Windows:      .venv\Scripts\activate
# macOS/Linux:  source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # fill in DATABASE_URL + JWT_SECRET (+ NEBIUS_API_KEY for AI)
uvicorn app.main:app --reload --port 8000
```

On startup the backend **creates the database if it's missing** and applies Alembic
migrations — pointing `DATABASE_URL` at a fresh PostgreSQL just works.
Interactive API docs: http://127.0.0.1:8000/docs

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local    # defaults proxy to http://127.0.0.1:8000
npm run dev                   # Turbopack
```

Open http://localhost:3000

> AI features (Upload & Transform) need `NEBIUS_API_KEY` in `backend/.env`. Without it
> they return a clean *"AI is not configured"* message — everything else works normally.

## How it works

1. **Sign up / log in** — the backend sets an HttpOnly JWT cookie and seeds a neutral
   master resume (never another user's data).
2. **Build** — by hand, from an uploaded file, or tailored to a JD. The LaTeX source
   regenerates live from `frontend/src/lib/latexTemplate.ts`.
3. **Review** — AI results always pass through a review step (sections detected,
   warnings, matched keywords, honest gaps) before they touch your resume — and even
   then they're unsaved and undoable.
4. **Version** — fork branches per application; switch, rename, restore, or delete.
5. **Compile** — `POST /tools/compile` proxies to an external LaTeX engine and returns
   the PDF for preview and download.

### The AI pipelines

```
Upload     file ──▶ extract text (+ hidden hyperlink URLs) ──▶ LLM parse ──▶ LLM verify ──▶ review ──▶ fill & compile

Transform  resume + JD ──▶ LLM tailor ──▶ deterministic anti-fabrication guard ──▶ review ──▶ branch or apply
```

The guard is code, not prompts: entries are matched by id, invented entries are deleted,
fact fields are restored verbatim, rewritten bullets are number-checked against the
source, and skills must be a subset of what you actually listed.

## Environment variables

**`backend/.env`**

| Var | Meaning |
|---|---|
| `DATABASE_URL` | `postgresql+psycopg://user:pass@host:5432/db` |
| `JWT_SECRET` | Long random string used to sign tokens |
| `FRONTEND_ORIGIN` | Comma-separated allowed CORS origins |
| `COOKIE_SECURE` | `true` only when served over HTTPS |
| `NEBIUS_API_KEY` | Nebius API key — blank disables AI features gracefully |
| `NEBIUS_BASE_URL` | OpenAI-compatible endpoint (defaults in `config.py`) |
| `NEBIUS_MODEL` | Model id used for parse / verify / transform |

**`frontend/.env.local`**

| Var | Meaning |
|---|---|
| `NEXT_PUBLIC_API_URL` | API base path used by the browser (default `/backend-api`) |
| `BACKEND_ORIGIN` | Where Next proxies `/backend-api/*` (default `http://127.0.0.1:8000`) |

## Customising the LaTeX template

The entire LaTeX output is generated in `frontend/src/lib/latexTemplate.ts`. Each section
has a builder function that receives its data and the user-defined label. Edit the
preamble at the bottom of `generateLatex()` and the per-section builders to match a
different template; the `esc()` helper handles LaTeX special-character escaping —
always pass user text through it.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup (HTTPS cookies, CORS,
process management, and environment hardening).
