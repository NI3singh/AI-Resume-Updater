"""Application settings, loaded from environment / .env via pydantic-settings."""

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # PostgreSQL connection (SQLAlchemy URL, psycopg 3 driver).
    database_url: str = "postgresql+psycopg://postgres:elaunch123456789@localhost:5432/ai_resume_updater"

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

    # Nebius LLM (OpenAI-compatible endpoint) used by the resume Upload feature
    # to parse and verify uploaded documents. Leave the key blank to disable the
    # AI import cleanly (the parse/verify endpoints then return 503).
    nebius_api_key: str = "v1.CmQKHHN0YXRpY2tleS1lMDBrZGV5cGo3NzAxOGVmeHASIXNlcnZpY2VhY2NvdW50LWUwMGp2cWQ0M2U4cmhhNDJ0eDIMCOL9oNEGEJnirMgCOgwI34C5nAcQwLjYhwJAAloDZTAw.AAAAAAAAAAGfSz71xUJPKJZK3Rk0c7F1G9wfQWQx403pVptwk973bMHM0LSCl-nyHR9UlBT3nHDXllGirPPUugom1F5QFEUC"
    nebius_base_url: str = "https://api.tokenfactory.us-central1.nebius.com/v1/"
    nebius_model: str = "MiniMaxAI/MiniMax-M2.5"
    nebius_max_tokens: int = 8192  # response token budget for parse/verify (0 = let server decide)

    # Resume upload limits.
    upload_max_bytes: int = 5 * 1024 * 1024  # 5 MB max upload
    parse_text_limit: int = 16000            # chars of extracted text sent to the LLM

    # extra="ignore": .env also carries keys for other consumers (Gated Access
    # reads GATED_ACCESS_*/GITHUB_*/SMTP_* via os.environ) — don't reject them.
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

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
