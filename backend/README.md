# ResumeTeX Backend

FastAPI + PostgreSQL backend for the LaTeX Resume Builder. Replaces the old
Supabase setup with a self-hosted database and cookie-based JWT auth.

## What it gives you

- **Email/password auth** with hashed passwords (bcrypt) and HTTP-only
  access + refresh cookies. No third-party auth service.
- **One profile + one master resume per user**, created automatically on
  signup from a neutral template (`app/template_data.py`). New users never see
  anyone else's data.
- **Resume versions** forked from the master, each independently editable,
  renamable, restorable-from-master, and deletable.

## Data model

| Table              | Purpose                                                        |
| ------------------ | -------------------------------------------------------------- |
| `app_users`        | Login identity (email, password hash, active flag).            |
| `user_profiles`    | 1:1 with user — display name and profile metadata.             |
| `master_resumes`   | 1:1 with user — the canonical resume (template on signup).     |
| `resume_versions`  | N per user — tailored copies forked from the master.           |
| `auth_sessions`    | Refresh-token sessions (hashed token, expiry, revocation).     |

Every table is scoped by `user_id` with `ON DELETE CASCADE`, so deleting a user
removes all their data and isolation between users is enforced at the DB level.

## Prerequisites

- Python 3.11+
- A running PostgreSQL with an **empty** `ai_resume_updater` database.

## Setup

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Copy and edit env (DATABASE_URL, JWT_SECRET, FRONTEND_ORIGIN)
copy .env.example .env

# Run — tables + required extensions are created automatically on startup
uvicorn app.main:app --reload --port 8000
```

The API is then at `http://127.0.0.1:8000` and interactive docs at
`http://127.0.0.1:8000/docs`.

> On startup the app runs `create extension pgcrypto` / `citext` and
> `Base.metadata.create_all`, so no manual migrations are needed for a fresh DB.

## Environment variables

| Variable                      | Meaning                                                    |
| ----------------------------- | ---------------------------------------------------------- |
| `DATABASE_URL`                | SQLAlchemy URL, e.g. `postgresql+psycopg://user:pw@host/db`|
| `JWT_SECRET`                  | Secret for signing access tokens — set a long random value.|
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Access-cookie lifetime.                                    |
| `REFRESH_TOKEN_EXPIRE_DAYS`   | Refresh-cookie / session lifetime.                         |
| `FRONTEND_ORIGIN`             | Comma-separated allowed browser origins (CORS).            |
| `COOKIE_SECURE`               | `true` in production (HTTPS); `false` for local http.      |

## API surface

| Method & path                              | Description                          |
| ------------------------------------------ | ------------------------------------ |
| `POST /auth/signup`                        | Create account, master resume, login |
| `POST /auth/login`                         | Login, set cookies                   |
| `POST /auth/logout`                        | Revoke session, clear cookies        |
| `GET  /auth/me`                            | Current user (refreshes access cookie) |
| `GET  /resumes`                            | Master + all versions                |
| `PATCH /resumes/{id}`                      | Update resume data / section config  |
| `PATCH /resumes/{id}/name`                 | Rename                               |
| `POST /resumes/fork`                       | Fork a new version from master       |
| `POST /resumes/{id}/restore-from-master`   | Reset a version to the master's data |
| `DELETE /resumes/{id}`                     | Delete a version (master is protected) |
