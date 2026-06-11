"""Gated Access integration (the `gated-access` PyPI package).

The gate app is mounted at /gate by main.py and runs its own four-step flow
(sign in -> verify the action -> email a one-time code -> redeem for a JWT).
This module also provides the dependency that locks a route behind that JWT:
the frontend sends it in an X-Gate-Token header and we verify it locally with
the shared secret — no extra HTTP hop to the gate.

Config lives in backend/gated-access.yaml; secrets come from the environment.
gated-access reads os.environ directly (pydantic-settings keeps .env values to
itself), so backend/.env is loaded into the process environment first.
"""

import logging
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException, status
from fastapi.responses import JSONResponse
from gated_access.config import load_config
from gated_access.factory import create_app as create_gate_app
from gated_access.tokens import verify_access_token

logger = logging.getLogger(__name__)

_BACKEND_DIR = Path(__file__).resolve().parent.parent

load_dotenv(_BACKEND_DIR / ".env")

gate_config = load_config(str(_BACKEND_DIR / "gated-access.yaml"))

# With demo_mode off, gated-access refuses to build until the real secrets and
# GitHub OAuth credentials are in place. Don't take the whole site down with
# it — serve a stub that answers 503 and keep /tools/transform locked.
try:
    gate_app = create_gate_app(gate_config)
except Exception as exc:  # noqa: BLE001 — any misconfiguration
    logger.error("Gated Access is disabled (config incomplete): %s", exc)
    gate_app = FastAPI(title="Gated Access (not configured)")

    @gate_app.api_route("/{path:path}", methods=["GET", "POST"])
    async def _gate_unavailable(path: str) -> JSONResponse:
        return JSONResponse(
            {"error": "The unlock service isn't configured on the server yet."},
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        )


def require_gate_token(
    x_gate_token: str = Header(default="", alias="X-Gate-Token"),
) -> dict:
    """Dependency: the request must carry a valid gate-issued access token."""
    claims = verify_access_token(gate_config.jwt_secret, x_gate_token)
    if not claims:
        # Sentinel detail — the frontend recognizes it and shows the unlock flow.
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="GATE_LOCKED")
    return claims
