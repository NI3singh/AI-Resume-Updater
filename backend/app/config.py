"""Application settings, loaded from environment / .env via pydantic-settings."""

import os

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # PostgreSQL connection (SQLAlchemy URL, psycopg 3 driver).
    database_url: str = os.getenv("DATABASE_URL")

    # JWT signing.
    jwt_secret: str = os.getenv("JWT_SECRET")
    jwt_algorithm: str = "HS256"
    access_token_ttl_hours: int = 24 * 7  # 7 days

    # Comma-separated list of allowed browser origins for CORS.
    frontend_origin: str = os.getenv("FRONTEND_ORIGIN")

    # Add the Secure flag to the auth cookie (only when served over HTTPS).
    cookie_secure: bool = os.getenv("COOKIE_SECURE") == "true"

    # External LaTeX compilation services (primary + fallback).
    latex_compile_url: str = "https://latex.ytotech.com/builds/sync"
    latex_compile_fallback: str = "https://latexonline.cc/compile"

    # Nebius LLM (OpenAI-compatible endpoint) used by the resume Upload feature
    # to parse and verify uploaded documents. Leave the key blank to disable the
    # AI import cleanly (the parse/verify endpoints then return 503).
    nebius_api_key: str = os.getenv("NEBIUS_API_KEY")
    nebius_base_url: str = "https://api.tokenfactory.us-central1.nebius.com/v1/"
    nebius_model: str = "MiniMaxAI/MiniMax-M2.5"
    nebius_max_tokens: int = 16384  # response token budget for parse/verify/transform (0 = let server decide)

    # GitHub integration (Profile page). Only PUBLIC repos are read. A token is
    # optional — it just raises the API rate limit (60/hr anon -> 5000/hr). The
    # app never needs the user's own token; this is a single app-level token.
    github_api_url: str = "https://api.github.com"
    github_token: str = os.getenv("GITHUB_TOKEN", "")

    # Resume upload limits.
    upload_max_bytes: int = 5 * 1024 * 1024  # 5 MB max upload
    parse_text_limit: int = 16000            # chars of extracted text sent to the LLM

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
