# AI Resume Updater — Backend (FastAPI)

Python/FastAPI service providing authentication and per-user resume storage on a
local PostgreSQL database. The Next.js frontend talks to it over HTTP with a
cookie-based JWT session.

## Stack
- FastAPI + Uvicorn
- SQLAlchemy 2.0 (psycopg 3 driver)
- PostgreSQL (`citext` extension; `gen_random_uuid()` is built in to PG13+)
- JWT in an HttpOnly cookie (python-jose), bcrypt password hashing (passlib)

## Data model
| Table           | Purpose                                                            |
|-----------------|--------------------------------------------------------------------|
| `users`         | Auth identity: `id`, `email` (CITEXT, unique), `password_hash`     |
| `user_profiles` | 1:1 with users: `display_name`                                     |
| `resumes`       | Master + versions per user: `is_master`, `resume_data`/`section_config` (JSONB) |

Per-user isolation: every `resumes` row has a CASCADE FK to `users`, every query
is scoped by `user_id`, and a partial unique index allows exactly one master per
user. New users are seeded with a neutral template (`app/template_data.py`).

## API
| Method | Path                                  | Description                         |
|--------|---------------------------------------|-------------------------------------|
| GET    | `/health`                             | Liveness check                      |
| POST   | `/auth/signup`                        | Create account + master, set cookie |
| POST   | `/auth/login`                         | Verify credentials, set cookie      |
| POST   | `/auth/logout`                        | Clear cookie                        |
| GET    | `/auth/me`                            | Current user (or 401)               |
| GET    | `/resumes`                            | List the user's resumes             |
| PATCH  | `/resumes/{id}`                       | Update resume data/section config   |
| PATCH  | `/resumes/{id}/name`                  | Rename                              |
| POST   | `/resumes/fork`                       | New version copied from master      |
| POST   | `/resumes/{id}/restore-from-master`   | Reset a version to match master     |
| DELETE | `/resumes/{id}`                       | Delete a version (master protected) |

## Setup
```bash
cd backend
python -m venv .venv
# Windows:        .venv\Scripts\activate
# macOS / Linux:  source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # then fill in DATABASE_URL + JWT_SECRET
```

## Run
```bash
uvicorn app.main:app --reload --port 8000
```
Tables and the `citext` extension are created automatically on startup.
Interactive docs at http://127.0.0.1:8000/docs.

## Environment (`.env`)
| Var               | Meaning                                              |
|-------------------|------------------------------------------------------|
| `DATABASE_URL`    | `postgresql+psycopg://user:pass@host:5432/db`        |
| `JWT_SECRET`      | Long random string used to sign tokens               |
| `FRONTEND_ORIGIN` | Comma-separated allowed CORS origins                 |
| `COOKIE_SECURE`   | `true` only when served over HTTPS                   |
