"""Tool routes — resume import pipeline + LaTeX compilation.

All endpoints require an authenticated user.
- POST /tools/extract-text : uploaded PDF/DOCX/TXT -> plain text
- POST /tools/parse        : extracted text        -> structured ResumeData (LLM)
- POST /tools/verify       : text + parsed data     -> corrected data + warnings (LLM)
- POST /tools/compile      : LaTeX source           -> compiled PDF bytes
"""

import io
import json

import httpx
from docx import Document as DocxDocument
from fastapi import APIRouter, Depends, File, HTTPException, Response, UploadFile, status
from pypdf import PdfReader

from ..config import settings
from ..deps import get_current_user
from ..llm import LLMError, LLMNotConfigured, chat_json
from ..models import User
from ..schemas import (
    CompileIn,
    ExtractOut,
    ParseIn,
    ParseOut,
    VerifyIn,
    VerifyOut,
    VerifySummary,
)

router = APIRouter(prefix="/tools", tags=["tools"])

# Top-level sections the parser targets (must match the frontend ResumeData type).
_SECTION_KEYS = [
    "personal", "education", "skills", "projects", "experience",
    "extracurricular", "achievements", "certifications", "publications",
]

# Shape the LLM must produce. Custom (user-defined) sections are intentionally
# excluded — too freeform to infer — and are preserved on the client.
_SCHEMA = """{
  "personal": { "name": "", "email": "", "phone": "", "location": "", "linkedin": "", "github": "", "website": "", "summary": "" },
  "education": [ { "institution": "", "degree": "", "location": "", "gpaFormat": "CGPA | GPA | Percentage | Grade | (empty)", "gpaLabel": "", "startDate": "", "endDate": "", "highlight": "" } ],
  "skills": [ { "category": "", "items": ["", ""] } ],
  "projects": [ { "name": "", "techStack": "", "githubUrl": "", "liveUrl": "", "bullets": ["", ""] } ],
  "experience": [ { "role": "", "company": "", "location": "", "startDate": "", "endDate": "", "current": false, "projectSubtitle": "", "bullets": ["", ""] } ],
  "extracurricular": [ { "title": "", "organization": "", "startDate": "", "endDate": "", "bullets": ["", ""] } ],
  "achievements": [ { "text": "" } ],
  "certifications": [ { "text": "", "credentialUrl": "" } ],
  "publications": [ { "title": "", "authors": "", "abstractText": "", "paperUrl": "", "paperLinkLabel": "" } ]
}"""

_RULES = """Rules:
- Return ONLY a single JSON object with exactly these top-level keys: personal, education, skills, projects, experience, extracurricular, achievements, certifications, publications. No markdown, no code fences, no commentary.
- NEVER invent information. If something is not in the source, use "" for text and [] for lists. Do not fabricate emails, phone numbers, URLs, GPAs, or dates.
- Dates must be formatted as "MMM YYYY" (e.g., "Jan 2023"). For an ongoing role/study use "Present" as endDate; for an ongoing job also set "current": true.
- "bullets" and "items" are arrays of strings (one entry each). Keep wording faithful to the source — do not embellish or summarize away detail.
- education.gpaFormat: choose from what the source shows — "8.9/10" -> CGPA (gpaLabel "8.9"), "3.8/4" -> GPA (gpaLabel "3.8"), "85%" -> Percentage (gpaLabel "85"), "A+" -> Grade (gpaLabel "A+"); if unclear, leave gpaFormat "" and put the raw value in gpaLabel.
- Do NOT include any "id" fields. Leave a section's array empty if you cannot populate it.
- personal.summary: include a professional summary/objective only if the resume actually has one."""

PARSE_SYSTEM = (
    "You are a precise resume parser. Convert the resume text the user provides "
    "into structured JSON matching exactly this schema:\n\n"
    + _SCHEMA
    + "\n\n"
    + _RULES
)

VERIFY_SYSTEM = (
    "You are a meticulous resume-data QA reviewer. You are given the ORIGINAL "
    "resume text and a PARSED JSON produced from it. Your job:\n"
    "1. Correct values that don't match the source (typos, wrong dates, mis-split "
    "bullets, fields placed in the wrong section).\n"
    "2. Fill in values clearly present in the text but missing from the JSON.\n"
    "3. Normalize dates to \"MMM YYYY\"/\"Present\" and fix gpaFormat/gpaLabel.\n"
    "4. NEVER invent data that isn't in the source.\n\n"
    "The corrected resume must follow exactly this schema:\n\n"
    + _SCHEMA
    + "\n\nReturn ONLY a JSON object of this form:\n"
    "{\n"
    '  "data": <the corrected resume object>,\n'
    '  "warnings": ["short notes about anything missing, ambiguous, or low-confidence"],\n'
    '  "summary": { "sections_found": [section keys that have content], "missing": [important fields/sections that appear absent] }\n'
    "}\nNo markdown, no code fences, no commentary."
)


def _extract_pdf(raw: bytes) -> str:
    reader = PdfReader(io.BytesIO(raw))
    return "\n".join((page.extract_text() or "") for page in reader.pages)


def _extract_docx(raw: bytes) -> str:
    doc = DocxDocument(io.BytesIO(raw))
    parts = [p.text for p in doc.paragraphs]
    for table in doc.tables:
        for row in table.rows:
            parts.append("\t".join(cell.text for cell in row.cells))
    return "\n".join(parts)


def _sections_present(data: dict) -> list[str]:
    """Builtin section keys that actually carry content (for the review summary)."""
    found: list[str] = []
    for key in _SECTION_KEYS:
        value = data.get(key)
        if key == "personal":
            if isinstance(value, dict) and any(str(v).strip() for v in value.values()):
                found.append(key)
        elif isinstance(value, list) and value:
            found.append(key)
    return found


@router.post("/extract-text", response_model=ExtractOut)
def extract_text(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
) -> ExtractOut:
    raw = file.file.read()
    if len(raw) > settings.upload_max_bytes:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File too large (max {settings.upload_max_bytes // (1024 * 1024)} MB).",
        )
    if not raw:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="The file is empty.")

    name = (file.filename or "").lower()
    ctype = (file.content_type or "").lower()
    try:
        if name.endswith(".pdf") or "pdf" in ctype:
            text = _extract_pdf(raw)
        elif name.endswith(".docx") or "wordprocessingml" in ctype:
            text = _extract_docx(raw)
        elif name.endswith(".txt") or ctype.startswith("text/"):
            text = raw.decode("utf-8", errors="ignore")
        elif name.endswith(".doc"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Legacy .doc isn't supported — save it as PDF or DOCX and try again.",
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unsupported file type. Please upload a PDF, DOCX, or TXT file.",
            )
    except HTTPException:
        raise
    except Exception as exc:  # noqa: BLE001 — corrupt/unreadable document
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Could not read the document: {exc}",
        ) from exc

    text = (text or "").strip()
    if not text:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="No selectable text found. Scanned or image-only PDFs aren't supported.",
        )
    return ExtractOut(text=text[: settings.parse_text_limit])


@router.post("/parse", response_model=ParseOut)
def parse_resume(payload: ParseIn, current_user: User = Depends(get_current_user)) -> ParseOut:
    try:
        data = chat_json(PARSE_SYSTEM, payload.text)
    except LLMNotConfigured as exc:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)) from exc
    except LLMError as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc)) from exc
    return ParseOut(data=data)


@router.post("/verify", response_model=VerifyOut)
def verify_resume(payload: VerifyIn, current_user: User = Depends(get_current_user)) -> VerifyOut:
    user_msg = (
        "ORIGINAL RESUME TEXT:\n"
        + payload.text
        + "\n\nPARSED JSON TO REVIEW:\n"
        + json.dumps(payload.data, ensure_ascii=False)
    )
    try:
        result = chat_json(VERIFY_SYSTEM, user_msg)
    except LLMNotConfigured as exc:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)) from exc
    except LLMError:
        # Resilient: never block the user — keep the parsed data and flag it.
        return VerifyOut(
            data=payload.data,
            warnings=["Verification step was unavailable — please review the imported fields carefully."],
            summary=VerifySummary(sections_found=_sections_present(payload.data)),
        )

    data = result.get("data")
    if not isinstance(data, dict):
        data = payload.data

    warnings_raw = result.get("warnings") or []
    warnings = (
        [str(w) for w in warnings_raw]
        if isinstance(warnings_raw, list)
        else [str(warnings_raw)]
    )

    summary_raw = result.get("summary") if isinstance(result.get("summary"), dict) else {}
    sections_found = summary_raw.get("sections_found")
    missing = summary_raw.get("missing")
    summary = VerifySummary(
        sections_found=(
            [str(s) for s in sections_found]
            if isinstance(sections_found, list)
            else _sections_present(data)
        ),
        missing=[str(m) for m in missing] if isinstance(missing, list) else [],
    )
    return VerifyOut(data=data, warnings=warnings, summary=summary)


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
