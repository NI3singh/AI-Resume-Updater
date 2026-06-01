"""AI/PDF utility routes (moved from the Next.js API routes).

All endpoints require an authenticated user.
- POST /tools/extract-text : upload PDF/DOCX/TXT -> plain text
- POST /tools/parse        : resume text -> structured resume JSON (via Nebius)
- POST /tools/compile      : LaTeX source -> compiled PDF bytes
"""

import io
import json

import httpx
from fastapi import APIRouter, Depends, HTTPException, Response, UploadFile, status
from openai import OpenAI

from ..config import settings
from ..deps import get_current_user
from ..models import User
from ..schemas import CompileIn, ParseIn

router = APIRouter(prefix="/tools", tags=["tools"])

MAX_TEXT = 8000

# Prompt template (moved verbatim from the old src/lib/resumeParser.ts). Plain
# string — NOT an f-string — so the JSON braces stay literal. Resume text is
# appended at the end.
PARSE_PROMPT_TEMPLATE = """You are a resume parser. Extract ALL information from the following resume text and return it as a JSON object with EXACTLY this structure. Return ONLY raw JSON, no markdown, no explanation, no code fences.

{
  "personal": {
    "name": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "github": "",
    "website": ""
  },
  "education": [
    {
      "id": "edu_1",
      "institution": "",
      "location": "",
      "gpaLabel": "",
      "degree": "",
      "startDate": "",
      "endDate": "",
      "highlight": ""
    }
  ],
  "skills": [
    {
      "id": "skill_1",
      "category": "",
      "items": [""]
    }
  ],
  "projects": [
    {
      "id": "proj_1",
      "name": "",
      "techStack": "",
      "githubUrl": "",
      "liveUrl": "",
      "bullets": [""]
    }
  ],
  "experience": [
    {
      "id": "exp_1",
      "role": "",
      "company": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "current": false,
      "projectSubtitle": "",
      "bullets": [""]
    }
  ],
  "extracurricular": [
    {
      "id": "extra_1",
      "title": "",
      "organization": "",
      "startDate": "",
      "endDate": "",
      "bullets": [""]
    }
  ],
  "achievements": [
    {
      "id": "ach_1",
      "text": ""
    }
  ],
  "certifications": [
    {
      "id": "cert_1",
      "text": "",
      "credentialUrl": ""
    }
  ],
  "publications": [
    {
      "id": "pub_1",
      "title": "",
      "authors": "",
      "abstractText": "",
      "paperUrl": "",
      "paperLinkLabel": ""
    }
  ]
}

Rules:
- linkedin/github/website: extract the FULL URL including https://
- gpaLabel: the full GPA string e.g. "Agg. CGPA: 8.68"
- degree: full degree line e.g. "B.Tech Artificial Intelligence & Data Science"
- highlight: the italic note line under education, if present
- techStack: comma-separated tech string e.g. "RetinaFace, Facenet"
- projectSubtitle: the italic project line under experience role, if present
- current: true only if still working there (endDate is "Present")
- If a section has no data, use an empty array []
- Generate sequential IDs: edu_1, edu_2 etc.
- Extract every bullet point as individual strings

Resume text:
"""


@router.post("/extract-text")
async def extract_text(file: UploadFile, current_user: User = Depends(get_current_user)) -> dict:
    content_type = (file.content_type or "").lower()
    name = (file.filename or "").lower()
    data = await file.read()

    is_pdf = content_type == "application/pdf" or name.endswith(".pdf")
    is_docx = "wordprocessingml" in content_type or name.endswith(".docx")
    is_txt = content_type.startswith("text/plain") or name.endswith(".txt")

    text = ""
    if is_pdf:
        from pypdf import PdfReader

        reader = PdfReader(io.BytesIO(data))
        text = "\n".join((page.extract_text() or "") for page in reader.pages)
    elif is_docx:
        from docx import Document

        doc = Document(io.BytesIO(data))
        text = "\n".join(p.text for p in doc.paragraphs)
    elif is_txt:
        text = data.decode("utf-8", errors="ignore")
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported file type. Use PDF, DOCX, or TXT.",
        )

    if not text.strip():
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Could not extract text from file. Try a text-based PDF.",
        )

    return {"text": text[:MAX_TEXT]}


@router.post("/parse")
def parse_resume(payload: ParseIn, current_user: User = Depends(get_current_user)) -> dict:
    if not settings.nebius_api_key:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Resume parsing is not configured (missing API key).",
        )

    client = OpenAI(base_url=settings.nebius_base_url, api_key=settings.nebius_api_key)
    try:
        completion = client.chat.completions.create(
            model=settings.nebius_model,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a precise resume parser. Extract structured data from "
                        "resumes and return ONLY valid JSON with no markdown, no code "
                        "blocks, no explanation. Just raw JSON."
                    ),
                },
                {"role": "user", "content": PARSE_PROMPT_TEMPLATE + payload.text},
            ],
        )
        content = completion.choices[0].message.content or ""
    except Exception as exc:  # noqa: BLE001 — surface any SDK/upstream error as 502
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI parsing failed: {exc}",
        ) from exc

    cleaned = content.replace("```json", "").replace("```", "").strip()
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="AI returned a response that was not valid JSON.",
        ) from exc


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
