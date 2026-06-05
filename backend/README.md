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
| `auth_sessions` | Server-side login sessions: `user_id`, `expires_at`, `created_at`   |

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
Interactive docs at http://127.0.0.1:8000/docs.

## Database & migrations
The backend is **self-provisioning** on startup (`init_db()` in `app/database.py`):
1. **Creates the database** if it doesn't exist — it connects to the `postgres`
   maintenance database and runs `CREATE DATABASE`. The role in `DATABASE_URL`
   needs the CREATEDB privilege and the right to create the `citext` extension
   (the `postgres` superuser has both).
2. **Brings the schema to the latest version** with Alembic (`upgrade head`). A
   database that already has the tables but predates Alembic is **adopted**
   (stamped), never recreated — existing data is safe.

To **move to another machine**: install PostgreSQL, point `DATABASE_URL` at it,
and start the backend — the database, the `citext` extension, and all tables are
created for you automatically.

### Schema versioning (Alembic)
Migrations live in `alembic/versions/` and are the source of truth for the schema.
To change it:
```bash
# 1. edit the models in app/models.py
# 2. generate a migration from the model/DB diff
alembic revision --autogenerate -m "describe the change"
# 3. review the generated file under alembic/versions/, then apply it
alembic upgrade head            # restarting the backend also applies pending migrations
```
Handy commands (run from `backend/` with the venv active):

| Command                  | What it does                                       |
|--------------------------|----------------------------------------------------|
| `alembic current`        | Show the database's current revision               |
| `alembic history`        | List the migration history                         |
| `alembic upgrade head`   | Apply all pending migrations                        |
| `alembic downgrade -1`   | Roll back the most recent migration                |
| `alembic check`          | Verify the models match the DB (no pending changes)|

## Environment (`.env`)
| Var               | Meaning                                              |
|-------------------|------------------------------------------------------|
| `DATABASE_URL`    | `postgresql+psycopg://user:pass@host:5432/db`        |
| `JWT_SECRET`      | Long random string used to sign tokens               |
| `FRONTEND_ORIGIN` | Comma-separated allowed CORS origins                 |
| `COOKIE_SECURE`   | `true` only when served over HTTPS                   |
