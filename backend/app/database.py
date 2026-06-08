"""SQLAlchemy engine, session factory, and database initialisation.

Startup is self-provisioning and portable across machines:
1. ``ensure_database_exists()`` creates the target database if it is missing, so
   pointing at a fresh PostgreSQL server (e.g. your laptop) just works.
2. Alembic migrations then bring the schema to the latest revision. An existing
   pre-Alembic database is *adopted* (stamped), never recreated — data is safe.
"""

import os
from collections.abc import Generator

from sqlalchemy import create_engine, inspect, text
from sqlalchemy.engine import make_url
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from .config import settings

engine = create_engine(settings.database_url, pool_pre_ping=True, future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)

# Absolute path to backend/alembic.ini, resolved from this file so Alembic can be
# driven programmatically regardless of the current working directory.
_BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ALEMBIC_INI = os.path.join(_BACKEND_DIR, "alembic.ini")


class Base(DeclarativeBase):
    pass


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency yielding a request-scoped session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def ensure_database_exists() -> None:
    """Create the target database if it does not already exist (best-effort).

    On a fresh local PostgreSQL this connects to the ``postgres`` maintenance
    database and issues ``CREATE DATABASE`` so things "just work". On managed
    Postgres (e.g. Render) the database already exists and the role usually can't
    reach ``postgres`` or create databases — in that case this is a safe no-op
    and the migrations run against the existing database next.
    """
    url = make_url(settings.database_url)
    db_name = url.database
    if not db_name:
        return

    try:
        maintenance = create_engine(
            url.set(database="postgres"), isolation_level="AUTOCOMMIT", future=True
        )
        try:
            with maintenance.connect() as conn:
                exists = conn.execute(
                    text("SELECT 1 FROM pg_database WHERE datname = :name"),
                    {"name": db_name},
                ).scalar()
                if not exists:
                    # A database name is an identifier and cannot be a bound
                    # parameter; it comes from trusted config but is quoted anyway.
                    safe_name = '"' + db_name.replace('"', '""') + '"'
                    conn.execute(text(f"CREATE DATABASE {safe_name}"))
        finally:
            maintenance.dispose()
    except Exception:
        # Managed Postgres: DB already exists / 'postgres' not reachable — skip.
        pass


def _alembic_config():
    """Build an Alembic Config pointed at backend/alembic.ini."""
    from alembic.config import Config

    return Config(ALEMBIC_INI)


def init_db() -> None:
    """Ensure the database exists and its schema is at the latest revision.

    - Fresh server: the database is created, then every migration is applied.
    - Pre-Alembic database (app tables but no ``alembic_version``): the current
      schema is adopted as the baseline by stamping ``head`` — no DDL is run.
    - Already Alembic-managed: any pending migrations are applied.
    """
    from alembic import command

    ensure_database_exists()

    cfg = _alembic_config()
    tables = set(inspect(engine).get_table_names())

    if "alembic_version" not in tables and "users" in tables:
        command.stamp(cfg, "head")
    else:
        command.upgrade(cfg, "head")
