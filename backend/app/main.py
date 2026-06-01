"""FastAPI application entrypoint."""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import init_db
from .routers import auth, resumes, tools


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create extensions + tables on startup (idempotent).
    init_db()
    yield


app = FastAPI(title="AI Resume Updater API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(resumes.router)
app.include_router(tools.router)


@app.get("/health", tags=["meta"])
def health() -> dict:
    return {"status": "ok"}
