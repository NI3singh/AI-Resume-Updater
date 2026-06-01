"""Application settings, loaded from environment / .env via pydantic-settings."""

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

    # Nebius (OpenAI-compatible) endpoint used for AI resume parsing.
    nebius_api_key: str = ""
    nebius_base_url: str = "https://api.tokenfactory.us-central1.nebius.com/v1/"
    nebius_model: str = "deepseek-ai/DeepSeek-V3.2"

    # External LaTeX compilation services (primary + fallback).
    latex_compile_url: str = "https://latex.ytotech.com/builds/sync"
    latex_compile_fallback: str = "https://latexonline.cc/compile"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.frontend_origin.split(",") if origin.strip()]


settings = Settings()
