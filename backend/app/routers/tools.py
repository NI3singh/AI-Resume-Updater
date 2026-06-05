"""LaTeX compilation route — proxies LaTeX source to the external compile service.

Requires an authenticated user.
- POST /tools/compile : LaTeX source -> compiled PDF bytes
"""

import httpx
from fastapi import APIRouter, Depends, HTTPException, Response, status

from ..config import settings
from ..deps import get_current_user
from ..models import User
from ..schemas import CompileIn

router = APIRouter(prefix="/tools", tags=["tools"])


@router.post("/compile")
def compile_pdf(payload: CompileIn, current_user: User = Depends(get_current_user)) -> Response:
    pdf: bytes | None = None
    try:
        with httpx.Client(timeout=60.0) as client:
            primary = client.post(
                settings.latex_compile_url,
                json={
                    "compiler": "pdflatex",
                    "resources": [{"main": True, "content": payload.latex}],
                },
            )
            if primary.status_code < 400 and primary.content:
                pdf = primary.content
            else:
                # Fallback service (GET with the LaTeX as a query param).
                alt = client.get(settings.latex_compile_fallback, params={"text": payload.latex})
                if alt.status_code < 400 and alt.content:
                    pdf = alt.content
    except httpx.HTTPError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Compilation service error: {exc}",
        ) from exc

    if not pdf:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="LaTeX compilation failed. Check your LaTeX code for errors.",
        )

    return Response(
        content=pdf,
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="resume.pdf"'},
    )
