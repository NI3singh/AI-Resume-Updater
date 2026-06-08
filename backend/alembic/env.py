"""Alembic migration environment.

Wired to the application's SQLAlchemy metadata and settings so that:
- the migration URL always comes from the app config (DATABASE_URL / .env), and
- ``alembic revision --autogenerate`` sees every model registered on Base.metadata.
"""

import os
import sys
from logging.config import fileConfig

from sqlalchemy import create_engine, pool

from alembic import context

# Make the `app` package importable no matter which CWD Alembic is launched from
# (CLI from backend/, or programmatically from app startup).
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.config import settings  # noqa: E402
from app.database import Base  # noqa: E402
from app import models  # noqa: E402,F401  (imported for the side effect of registering tables)

config = context.config

# Drive the migration URL from the app config. Escape % so ConfigParser
# interpolation (used by offline mode) never trips on it.
config.set_main_option("sqlalchemy.url", settings.database_url.replace("%", "%%"))

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Emit SQL to stdout without a live DB connection (`alembic upgrade --sql`)."""
    context.configure(
        url=config.get_main_option("sqlalchemy.url"),
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,
        compare_server_default=True,
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations against a live connection built from the app settings."""
    connectable = create_engine(settings.database_url, poolclass=pool.NullPool, future=True)
    try:
        with connectable.connect() as connection:
            context.configure(
                connection=connection,
                target_metadata=target_metadata,
                compare_type=True,
                compare_server_default=True,
            )
            with context.begin_transaction():
                context.run_migrations()
    finally:
        connectable.dispose()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
