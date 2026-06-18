"""Build eval/data/cases.json from real resume + JD PDFs.

Resumes go through the app's real extract->parse pipeline (``_extract_pdf`` +
``PARSE_SYSTEM`` via ``chat_json``) to produce ``ResumeData``; JD PDFs are
extracted to plain text. Each resume is paired round-robin with a JD.

Usage (from backend/):
    python -m eval.build_cases
Inputs:  eval/data/resume/*.pdf , eval/data/jd/*.pdf   (gitignored)
Output:  eval/data/cases.json                           (gitignored)
"""

from __future__ import annotations

import glob
import json
import os

from app.config import settings
from app.llm import LLMError, chat_json
from app.routers.tools import PARSE_SYSTEM, _extract_pdf, _links_block

_HERE = os.path.dirname(os.path.abspath(__file__))
_RES_DIR = os.path.join(_HERE, "data", "resume")
_JD_DIR = os.path.join(_HERE, "data", "jd")
_OUT = os.path.join(_HERE, "data", "cases.json")


def _pdf_text(path: str, with_links: bool = True) -> str:
    with open(path, "rb") as fh:
        raw = fh.read()
    text, links = _extract_pdf(raw)
    text = (text or "").strip()[: settings.parse_text_limit]
    return text + _links_block(links) if with_links else text


def _stem(path: str) -> str:
    return os.path.splitext(os.path.basename(path))[0]


def main() -> int:
    resumes = sorted(glob.glob(os.path.join(_RES_DIR, "*.pdf")))
    jds = sorted(glob.glob(os.path.join(_JD_DIR, "*.pdf")))
    if not resumes or not jds:
        print(f"Need PDFs in {_RES_DIR} and {_JD_DIR}")
        return 2

    jd_texts = [(_stem(p), _pdf_text(p, with_links=False)) for p in jds]
    cases: list[dict] = []
    for i, rpath in enumerate(resumes):
        rname = _stem(rpath)
        print(f"[{i + 1}/{len(resumes)}] parsing resume: {rname} (LLM; cold start ~30s)...")
        try:
            resume = chat_json(PARSE_SYSTEM, _pdf_text(rpath))
        except LLMError as exc:
            print(f"    parse failed, skipping: {exc}")
            continue
        if not isinstance(resume, dict):
            print("    parse returned non-dict, skipping")
            continue
        jname, jd = jd_texts[i % len(jd_texts)]
        filled = [k for k, v in resume.items() if v]
        cases.append({
            "label": f"{rname[:28]} x {jname[:28]}",
            "resume": resume,
            "jd": jd,
            "title": jname,
            "company": "(real JD)",
        })
        print(f"    paired with JD: {jname}")
        print(f"    parsed sections with content: {filled}")

    with open(_OUT, "w", encoding="utf-8") as fh:
        json.dump(cases, fh, ensure_ascii=False, indent=2)
    print(f"\nwrote {len(cases)} cases to {_OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
