"""Application settings, loaded from environment / .env via pydantic-settings."""

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # PostgreSQL connection (SQLAlchemy URL, psycopg 3 driver).
    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/ai_resume_updater"

    # JWT signing.
    jwt_secret: str = "change-me-in-env"
    jwt_algorithm: str = "HS256"
    access_token_ttl_hours: int = 24 * 7  # 7 days

    # Comma-separated list of allowed browser origins for CORS.
    frontend_origin: str = "http://127.0.0.1:3000,http://localhost:3000"

    # Add the Secure flag to the auth cookie (only when served over HTTPS).
    cookie_secure: bool = False

    # External LaTeX compilation services (primary + fallback).
    latex_compile_url: str = "https://latex.ytotech.com/builds/sync"
    latex_compile_fallback: str = "https://latexonline.cc/compile"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    @field_validator("database_url")
    @classmethod
    def _ensure_psycopg_driver(cls, v: str) -> str:
        """Accept a plain PostgreSQL URL (managed hosts like Render/Heroku hand
        out ``postgresql://`` or ``postgres://``) and make sure SQLAlchemy uses
        the psycopg-3 driver. A URL that already names a driver is left as-is."""
        if v.startswith("postgresql+"):
            return v
        if v.startswith("postgresql://"):
            return "postgresql+psycopg://" + v[len("postgresql://"):]
        if v.startswith("postgres://"):
            return "postgresql+psycopg://" + v[len("postgres://"):]
        return v

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.frontend_origin.split(",") if origin.strip()]


settings = Settings()
