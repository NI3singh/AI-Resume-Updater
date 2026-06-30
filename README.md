<div align="center">

<img src="./frontend/src/app/icon.svg" width="88" alt="ResumeTeX logo"/>

# ResumeTeX

**Your résumé, perfectly typeset.**

Build a LaTeX résumé in the browser — fill it by hand, import it from a file with AI,
or let AI tailor it to a job description. Scan it for errors, generate a matching cover
letter, and compile a pixel-perfect PDF in one click. No LaTeX knowledge needed.

<sub>Next.js 14 · FastAPI · PostgreSQL · LLM-powered import, tailoring, proofreading & cover letters</sub>

</div>

---

## 🎬 Watch the Website Tour

<div align="center">

<a href="https://youtu.be/Ln1NzEGeKtc">
  <img src="docs/tour-poster.png" alt="Watch the demo" width="820">
</a>

</div>

*`docs/website-tour.mp4` — a 40-second walkthrough of the live product, rendered with Remotion from real app screenshots.*

---

## Four ways to build

| Mode | What it does |
|---|---|
| ✍️ **Manual** | Fill the form field by field; the LaTeX source regenerates live as you type. Drag to reorder sections, entries, and individual bullets; rename or toggle sections; add fully custom sections; undo with `Ctrl+Z`. |
| 📄 **Upload** | Drop in an existing **PDF / DOCX / TXT** résumé. A three-stage AI pipeline *extracts → parses → verifies* it (real hyperlinks included — even ones hidden behind "View Credential" anchors), shows you a review, then fills the form. |
| 🎯 **Transform** | Paste a **job description** and AI re-tunes your résumé for that exact role — a step-by-step wizard to drop irrelevant sections/entries and surgically rewrite bullets. Save as a new branch or apply in place. |
| ✒️ **Cover Letter** | One click turns the **JD + company + your résumé** into a tailored cover letter in your own Word template — review, tweak, and download as **DOCX or PDF**. |

> **The no-fabrication guarantee.** The AI never invents anything. After it responds, a
> deterministic server-side guard restores every fact — names, employers, dates, degrees,
> numbers, URLs — verbatim from your original, deletes anything the AI made up, and reports
> **honest gaps**: requirements the JD asks for that your résumé doesn't show, explicitly *not* added.

## One master, many versions

Every account gets a **master résumé** plus unlimited tailored **branches** — fork the
master (**or any branch**) for each application, switch between them instantly, rename,
delete, or restore a branch back to the master. Nothing is saved until you say so: manual
**Save**, **Revert** to last saved, and full **Undo** history.

---

## ✨ Features

Everything below is **built and working today**.

### 🖊 Building & editing
- ✅ **Live LaTeX preview** — generated source updates on every keystroke
- ✅ **One-click PDF** — compiled by a real LaTeX engine, downloadable instantly
- ✅ **Drag-and-drop reordering** — sections, entries, **and individual bullet points**, everywhere
- ✅ **9 built-in sections + custom sections** — define your own typed fields (text · bullets · date · number/marks · link)
- ✅ **Section control** — reorder, rename, and show/hide any section per résumé
- ✅ **`**bold**` markdown** in any field, rendered into the PDF
- ✅ **LaTeX special-character safety** — `<` `>` `|` `&` `%` `$` `#` `_` `{` `}` `~` `^` `\` escaped automatically (no more `<` turning into `¡`)
- ✅ **Undo history (`Ctrl+Z`)**, manual **Save**, and **Revert** to last saved
- ✅ **Dark & light themes** with an ambient typographic atmosphere

### 🗂 Versions & data
- ✅ **Master résumé + unlimited branches**
- ✅ **Fork from the master *or any version*,** rename, delete, restore-to-master, instant switch
- ✅ **Self-owned data** — your résumés live in *your* PostgreSQL, per-user isolated

### 🤖 AI — Import (Upload)
- ✅ **PDF / DOCX / TXT import** via an *extract → parse → verify* pipeline
- ✅ **Hidden-hyperlink recovery** (the URL behind "Portfolio", "View Credential", etc.)
- ✅ **Review step** before anything touches your résumé

### 🤖 AI — Transform (tailor to a JD)
- ✅ **Interactive, section-by-section wizard** — review every change before it lands
- ✅ **Whole-section keep/drop advice** for the role
- ✅ **Per-entry keep/drop** — drop a project/experience that doesn't fit (e.g. a non-ML project for an ML role)
- ✅ **Surgical, agentic refine** — keep/edit/add per bullet, so "change bullet 2" changes *only* bullet 2
- ✅ **Numbered current bullets** so you can reference them while editing
- ✅ **Anti-fabrication guard + honest gaps**; apply in place or save as a new branch

### 🤖 AI — Résumé Scan (proofread)
- ✅ **One-click scan** with a green scanner-line sweep over the PDF
- ✅ Detects **spelling, grammar, symbol/mojibake/emoji, and formatting** problems
- ✅ **One-click per-field fixes + Apply all** — numbers are never changed, every fix is undoable

### 🤖 AI — Profile & GitHub
- ✅ **/profile page** — connect a GitHub username, import **public repos** as guarded project entries
- ✅ **Code-aware bullets** — reads the actual source files you pick, MNC résumé style, metrics only if real, with a comment-refine loop
- ✅ **README blurbs** on repo cards, a **certifications manager**, and a "new repos" **sync badge**

### 🤖 AI — Cover Letter
- ✅ **One-click, JD/company/résumé-tailored** letter in **your exact Word template** (layout, fonts, header preserved)
- ✅ **Editable review with a live Preview**, `**bold**` / `__underline__`, and "tweak it" → Regenerate
- ✅ **Download DOCX** (exact) **or PDF** (via headless LibreOffice)

### 🔐 Platform
- ✅ **HttpOnly-cookie auth** (JWT, bcrypt, revocable server-side sessions)
- ✅ **Same-origin API proxy** — no CORS or third-party-cookie headaches
- ✅ **Auto database creation + Alembic migrations** on startup
- ✅ **Themed backend landing page** with a live status check

---

## 🚀 Roadmap

Planned next — contributions welcome.

- [ ] **Live hosted app on a custom `.com` domain** — sign up and build with zero local setup
- [ ] **Multiple résumé & cover-letter templates/themes** to choose from
- [ ] **ATS score & keyword-match meter** against a pasted JD
- [ ] **Cloud DOCX → PDF** for cover letters (no local LibreOffice required)
- [ ] **One-click "application pack"** — tailored résumé + matching cover letter together
- [ ] **LinkedIn profile import**
- [ ] **Shareable public résumé link** (a hosted web version of your résumé)
- [ ] **Auth niceties** — email verification, password reset, and Google/GitHub sign-in
- [ ] **Multi-language résumés**

---

## 🧱 Tech stack

| Layer | Frontend | Backend |
|---|---|---|
| Core | Next.js 14 (App Router), React 18, TypeScript | FastAPI, Uvicorn |
| Data | — | SQLAlchemy 2 + psycopg 3, PostgreSQL, Alembic |
| Auth | same-origin cookie session | JWT in HttpOnly cookie, bcrypt, revocable sessions |
| AI | — | Nebius LLM (OpenAI-compatible) for import, tailoring, proofreading & cover letters |
| Docs | — | `python-docx` (DOCX), headless LibreOffice (DOCX → PDF) |
| Styling | Tailwind CSS, Framer Motion, lucide-react | — |
| PDF | live LaTeX preview | proxies LaTeX → external compile service |

The browser talks only to the frontend, which proxies API calls to the backend
(`/backend-api/*`) so the auth cookie stays first-party — no CORS, no third-party
cookie issues.

## ⚡ Quickstart

**Prerequisites:** Node.js 18+, Python 3.11+, PostgreSQL 14+. *Optional:* LibreOffice
(for cover-letter PDF export).

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

> AI features (Upload, Transform, Scan, Cover Letter, GitHub import) need `NEBIUS_API_KEY`
> in `backend/.env`. Without it they return a clean *"AI is not configured"* message —
> everything else works normally.

## 🔍 How it works

1. **Sign up / log in** — the backend sets an HttpOnly JWT cookie and seeds a neutral
   master résumé (never another user's data).
2. **Build** — by hand, from an uploaded file, or tailored to a JD. The LaTeX source
   regenerates live from `frontend/src/lib/latexTemplate.ts`.
3. **Review** — AI results always pass through a review step (warnings, matched keywords,
   honest gaps) before they touch your résumé — and even then they're unsaved and undoable.
4. **Version** — fork branches per application; switch, rename, restore, or delete.
5. **Ship** — compile to PDF, scan for errors, and generate a matching cover letter.

### The AI pipelines

```
Upload       file ──▶ extract text (+ hidden hyperlink URLs) ──▶ LLM parse ──▶ LLM verify ──▶ review ──▶ fill & compile
Transform    résumé + JD ──▶ section/entry plan ──▶ per-unit LLM rewrite ──▶ anti-fabrication guard ──▶ review ──▶ branch or apply
Scan         résumé content ──▶ deterministic checks + LLM proofread ──▶ number-guarded fixes ──▶ one-click apply
Cover Letter résumé + JD + company ──▶ LLM (strict JSON) ──▶ fill your .docx template ──▶ DOCX / PDF
GitHub       public repo ──▶ pick files ──▶ read code ──▶ LLM bullets ──▶ guard ──▶ add to master
```

The guard is **code, not prompts**: entries are matched by id, invented entries are deleted,
fact fields are restored verbatim, rewritten text is number-checked against the source, and
skills must be a subset of what you actually listed.

## ⚙️ Environment variables

**`backend/.env`**

| Var | Meaning |
|---|---|
| `DATABASE_URL` | `postgresql+psycopg://user:pass@host:5432/db` |
| `JWT_SECRET` | Long random string used to sign tokens |
| `FRONTEND_ORIGIN` | Comma-separated allowed CORS origins |
| `COOKIE_SECURE` | `true` only when served over HTTPS |
| `NEBIUS_API_KEY` | Nebius API key — blank disables AI features gracefully |
| `NEBIUS_BASE_URL` | OpenAI-compatible endpoint (defaults in `config.py`) |
| `NEBIUS_MODEL` | Model id used for the AI features |
| `GITHUB_TOKEN` | *Optional* — raises the public-repo rate limit (60→5000/hr) for Profile import |
| `SOFFICE_PATH` | *Optional* — path to LibreOffice `soffice` for cover-letter PDF (auto-detected if blank) |

**`frontend/.env.local`**

| Var | Meaning |
|---|---|
| `NEXT_PUBLIC_API_URL` | API base path used by the browser (default `/backend-api`) |
| `BACKEND_ORIGIN` | Where Next proxies `/backend-api/*` (default `http://127.0.0.1:8000`) |

## 🎨 Customising the LaTeX template

The entire LaTeX output is generated in `frontend/src/lib/latexTemplate.ts`. Each section
has a builder function that receives its data and the user-defined label. Edit the preamble
in `generateLatex()` and the per-section builders to match a different template; the `esc()`
helper handles LaTeX special-character escaping — always pass user text through it.

The cover-letter template lives at `backend/app/templates/cover_letter_template.docx`; the
server fills its body cell while preserving the layout, fonts, and header.

## ☁️ Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup (HTTPS cookies, CORS, process
management, and environment hardening). A hosted version on a custom domain is on the
[roadmap](#-roadmap).
