# ResumeTeX Builder

A full-stack LaTeX resume builder with AI-powered parsing, cloud storage, and multi-version management. Built with Next.js 14, Supabase, and an OpenAI-compatible LLM API.

---

## What It Does

Write your resume once as a **master**. Fork it for every job application — tweak the focus, reorder sections, rename headings — then compile to a pixel-perfect PDF. Every version is saved to the cloud. Roll back any change with a single click, or step through edits one at a time with undo.

Under the hood, everything compiles through your own LaTeX template, so the output looks exactly how you designed it — not like a generic resume builder.

---

## Features

**Resume Management**
- One **Master Resume** per account — your single source of truth
- Fork from master for any job application, named however you want
- Switch between versions instantly from the header dropdown
- Rename, delete, or restore any version to match master
- Autosaves every 2 seconds while you edit

**Editor**
- 9 fully-featured sections: Personal, Education, Technical Skills, Projects, Experience, Extracurricular, Achievements, Certifications, Publications
- Drag to reorder sections — order is reflected live in the LaTeX output
- Rename any section heading — the `\section*{}` in LaTeX updates instantly
- Remove sections you don't need; add them back anytime
- Undo any change with `Ctrl+Z` / `Cmd+Z` (50-step history)
- **Rollback** button to discard all unsaved edits and restore the last saved state

**LaTeX & PDF**
- Live LaTeX code preview with syntax highlighting — updates as you type
- Download the raw `.tex` file
- One-click compile to PDF via [LaTeX.online](https://latex.ytotech.com)
- PDF preview directly in the browser

**Upload Mode**
- Upload an existing PDF or DOCX resume
- Text is extracted server-side, then parsed by an LLM
- All fields auto-filled — review and adjust before compiling

**Auth**
- Email/password authentication via Supabase
- Detects duplicate accounts on signup and prompts login
- Session-persisted, works across tabs and reloads

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Auth & Database | Supabase (Auth + PostgreSQL + RLS) |
| Styling | Tailwind CSS + CSS variables |
| Animation | Framer Motion |
| Icons | Lucide React |
| LLM (resume parsing) | Nebius API / any OpenAI-compatible endpoint |
| PDF extraction | pdf-parse, mammoth |
| LaTeX compilation | LaTeX.online API |

---

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo>
cd latex-resume-builder
npm install
```

### 2. Set up Supabase

Create a project at [supabase.com](https://supabase.com), then run the schema:

- Go to **SQL Editor → New Query**
- Paste the contents of `supabase-schema.sql` and click **Run**
- Go to **Authentication → Email** and disable "Confirm email" if you want instant login without email verification

### 3. Configure environment variables

```bash
# .env.local

NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

NEBIUS_API_KEY=your_nebius_api_key_here
```

Get your Supabase keys from **Settings → API** in your project dashboard.

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Customising the LaTeX Template

The entire LaTeX output is generated from `src/lib/latexTemplate.ts`. Each section has its own builder function that receives the section data and the label string from the user's section config.

To adapt it to a different template:
- Edit the preamble string at the bottom of `generateLatex()`
- Edit each section builder function to match your template's formatting
- The `esc()` helper handles LaTeX special character escaping — always wrap user text through it

The section label passed to each builder is whatever the user has named it in the UI, so renaming "Technical Skills" to "Core Competencies" in the sidebar immediately changes the `\section*{}` heading in the output.

---

## Deployment

```bash
npm run build
```

Deploy to Vercel, Railway, or any Node.js host. Add your three environment variables in the hosting dashboard.

For Vercel:

```bash
vercel deploy
```

---

## Database Schema

One table: `resumes`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `user_id` | uuid | References `auth.users`, cascade delete |
| `name` | text | e.g. "Master Resume", "Data Analyst - Google" |
| `is_master` | boolean | Unique per user — enforced at DB level |
| `resume_data` | jsonb | Full `ResumeData` object |
| `section_config` | jsonb | Ordered array of `SectionConfig` |
| `created_at` | timestamptz | Auto-set |
| `updated_at` | timestamptz | Auto-updated via trigger |

Row Level Security is enabled — users can only read and write their own rows.

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous public key |
| `NEBIUS_API_KEY` | Yes (for upload mode) | LLM API key for resume parsing |

The LLM endpoint is configured in `src/app/api/parse-resume/route.ts`. To use a different provider (OpenAI, Groq, Together, etc.), update the `baseURL` and model name — any OpenAI-compatible API works without other changes.

---

Built by [Nitin Singh](https://portfolio-nitinsingh.vercel.app/)