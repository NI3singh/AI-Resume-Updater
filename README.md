# ResumeTeX — LaTeX Resume Builder

A full-stack monorepo for building LaTeX resumes in the browser: fill your details
into a template, watch the LaTeX update live, and compile to a pixel-perfect PDF.
Each account gets a **master resume** plus as many tailored versions as you like.

## Repository layout

```
.
├── frontend/                 # Next.js 14 app (App Router, TypeScript, Tailwind)
│   ├── src/
│   │   ├── app/              # routes: / (landing), /login, /builder
│   │   ├── components/       # builder UI — form panel, sections, switcher
│   │   ├── context/          # auth context
│   │   ├── hooks/            # useResumes
│   │   └── lib/              # api client, LaTeX generator, PDF compile helper
│   ├── next.config.js        # proxies /backend-api/* → backend (same-origin cookie)
│   └── package.json
│
├── backend/                  # FastAPI service (Python)
│   ├── app/
│   │   ├── main.py           # app + router wiring
│   │   ├── routers/          # auth, resumes, tools (LaTeX compile)
│   │   ├── models.py         # SQLAlchemy models
│   │   ├── schemas.py        # Pydantic request/response models
│   │   ├── security.py       # JWT + password hashing
│   │   ├── deps.py           # current-user dependency
│   │   ├── database.py       # engine, self-provisioning init_db(), migrations
│   │   └── template_data.py  # neutral starter resume seeded per user
│   ├── alembic/              # schema migrations (version history)
│   ├── alembic.ini
│   └── requirements.txt
│
├── resume_template.tex       # reference LaTeX template (mirrored by template_data.py)
└── README.md
```

The two apps are independent but connected: the browser talks only to the
frontend, which proxies API calls to the backend (`/backend-api/*`) so the
HttpOnly auth cookie stays first-party.

## Tech stack

| Layer    | Frontend                                  | Backend                                  |
|----------|-------------------------------------------|------------------------------------------|
| Core     | Next.js 14 (App Router), React 18, TS     | FastAPI, Uvicorn                         |
| Data     | —                                         | SQLAlchemy 2 + psycopg 3, PostgreSQL     |
| Auth     | cookie session (via backend)              | JWT in HttpOnly cookie, bcrypt hashing   |
| Styling  | Tailwind CSS, Framer Motion, lucide-react | —                                        |
| PDF      | live LaTeX preview                        | proxies LaTeX → external compile service |

## Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- PostgreSQL 14+ (a local database)

## Setup

### 1. Backend
```bash
cd backend
python -m venv .venv
# Windows:      .venv\Scripts\activate
# macOS/Linux:  source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # then fill in DATABASE_URL + JWT_SECRET
uvicorn app.main:app --reload --port 8000
```
On startup the backend **creates the database if it's missing** and applies
Alembic migrations — so pointing `DATABASE_URL` at a fresh PostgreSQL (e.g. on a
new machine) just works. Interactive API docs: http://127.0.0.1:8000/docs

### 2. Frontend
```bash
cd frontend
npm install
cp .env.example .env.local    # defaults proxy to http://127.0.0.1:8000
npm run dev
```
Open http://localhost:3000

## How it works
1. **Sign up / log in** — the backend sets an HttpOnly JWT cookie and seeds a
   neutral master resume from `backend/app/template_data.py` (never another
   user's data).
2. **Build** — fill the form; `frontend/src/lib/latexTemplate.ts` regenerates the
   LaTeX live. Reorder, rename, or toggle sections; undo with `Ctrl+Z`; Save or
   Revert to the last saved version (no autosave).
3. **Versions** — fork the master for each application, then switch, rename,
   delete, or restore a version to match the master.
4. **Compile** — the LaTeX is sent to `POST /tools/compile`, which proxies to an
   external LaTeX engine and returns the PDF to preview and download.

## Environment variables

**`backend/.env`**

| Var               | Meaning                                          |
|-------------------|--------------------------------------------------|
| `DATABASE_URL`    | `postgresql+psycopg://user:pass@host:5432/db`    |
| `JWT_SECRET`      | Long random string used to sign tokens           |
| `FRONTEND_ORIGIN` | Comma-separated allowed CORS origins             |
| `COOKIE_SECURE`   | `true` only when served over HTTPS               |

**`frontend/.env.local`**

| Var                   | Meaning                                                       |
|-----------------------|---------------------------------------------------------------|
| `NEXT_PUBLIC_API_URL` | API base path used by the browser (default `/backend-api`)    |
| `BACKEND_ORIGIN`      | Where Next proxies `/backend-api/*` (default `http://127.0.0.1:8000`) |

## Customising the LaTeX template
The entire LaTeX output is generated in `frontend/src/lib/latexTemplate.ts`. Each
section has a builder function that receives its data and the user-defined label.
Edit the preamble at the bottom of `generateLatex()` and the per-section builders
to match a different template; the `esc()` helper handles LaTeX special-character
escaping — always pass user text through it.
