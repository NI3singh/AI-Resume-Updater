"""Resume extraction (PDF/DOCX) and parser-output cleanup.

Strategy:
- Extract clean text with pdfplumber (good spacing) and, crucially, the embedded
  hyperlink annotations paired with their visible anchor label, in reading order.
- The LLM parses the textual content; this module then deterministically attaches
  the real URLs from those pairs and drops any URL the model invented.
"""

from __future__ import annotations

import io
import re
from typing import Any
from urllib.parse import urlsplit

# Matches plain-text URLs (used to build the allow-list for sanitisation).
URL_RE = re.compile(r"(?:https?://|mailto:)[^\s\]\)>,|]+|www\.[^\s\]\)>,|]+", re.IGNORECASE)
BULLET_PREFIX_RE = re.compile(r"^(?:[•‣◦*]|â€¢|-)\s*")

# Unicode / mojibake fixes only — no word-joining or de-hyphenation heuristics
# (the LLM handles those far better than regexes).
_UNICODE_FIXES = {
    "\r\n": "\n",
    "\r": "\n",
    " ": " ",
    " ": " ",
    "�": " ",
    "–": "-",
    "—": "-",
    "‘": "'",
    "’": "'",
    "“": '"',
    "”": '"',
    "â€¢": "•",
    "â€“": "-",
    "â€”": "-",
    "â€": '"',
    "â€": '"',
    "â€˜": "'",
    "â€™": "'",
}


def normalize_text(text: str) -> str:
    """Gentle whitespace/unicode normalisation that preserves wording."""
    if "\\n" in text and text.count("\n") < max(2, text.count("\\n") // 3):
        text = text.replace("\\n", "\n")
    for bad, good in _UNICODE_FIXES.items():
        text = text.replace(bad, good)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


# ── PDF extraction (text + anchored hyperlinks) ─────────────────────────────

def _overlap(a: tuple, b: tuple) -> float:
    ix = max(0.0, min(a[2], b[2]) - max(a[0], b[0]))
    iy = max(0.0, min(a[3], b[3]) - max(a[1], b[1]))
    return ix * iy


def _dedupe_pairs(pairs: list[tuple[str, str]]) -> list[tuple[str, str]]:
    seen: set[tuple[str, str]] = set()
    out: list[tuple[str, str]] = []
    for label, url in pairs:
        key = (label.strip().lower(), url.rstrip("/").lower())
        if key in seen:
            continue
        seen.add(key)
        out.append((label.strip(), url))
    return out


def extract_pdf(data: bytes) -> tuple[str, list[tuple[str, str]]]:
    """Return (text, [(anchor_label, url)]) for a PDF using pdfplumber."""
    import pdfplumber

    texts: list[str] = []
    pairs: list[tuple[str, str]] = []
    with pdfplumber.open(io.BytesIO(data)) as doc:
        for page in doc.pages:
            texts.append(page.extract_text() or "")
            try:
                words = page.extract_words(use_text_flow=True)
            except Exception:
                words = []
            for link in page.hyperlinks or []:
                uri = link.get("uri")
                if not uri:
                    continue
                box = (
                    float(link.get("x0", 0)),
                    float(link.get("top", 0)),
                    float(link.get("x1", 0)),
                    float(link.get("bottom", 0)),
                )
                label = " ".join(
                    w["text"]
                    for w in words
                    if _overlap((w["x0"], w["top"], w["x1"], w["bottom"]), box) > 0
                ).strip()
                pairs.append((label, str(uri)))

    return "\n".join(texts), _dedupe_pairs(pairs)


INVENTORY_HEADER = "--- Embedded hyperlinks (anchor text -> URL, in document order) ---"
_INVENTORY_LINE_RE = re.compile(r'^\s*\d+\.\s*"(.*)"\s*->\s*(\S+)\s*$')


def build_hyperlink_inventory(pairs: list[tuple[str, str]]) -> str:
    """A parser-readable, ordered list pairing each anchor label with its URL."""
    if not pairs:
        return ""
    lines = ["", "", INVENTORY_HEADER]
    lines.extend(f'{i}. "{label}" -> {url}' for i, (label, url) in enumerate(pairs, 1))
    return "\n".join(lines)


def parse_inventory_from_text(text: str) -> list[tuple[str, str]]:
    """Recover the (label, url) pairs from an inventory previously appended to text.

    /tools/parse only receives the extracted text, so the structured pairs are
    re-derived from the inventory block that /tools/extract-text embedded.
    """
    pairs: list[tuple[str, str]] = []
    for line in text.splitlines():
        match = _INVENTORY_LINE_RE.match(line)
        if match:
            pairs.append((match.group(1).strip(), match.group(2).strip()))
    return _dedupe_pairs(pairs)


def _norm_url(value: str) -> str:
    value = value.strip().rstrip(".,;:")
    if value.lower().startswith("www."):
        return f"https://{value}"
    return value


def collect_allowed_urls(source_text: str, pairs: list[tuple[str, str]]) -> set[str]:
    """All URLs that genuinely appear in the document (annotations + plain text)."""
    allowed = {_norm_url(url).lower().rstrip("/") for _, url in pairs}
    for match in URL_RE.finditer(source_text):
        allowed.add(_norm_url(match.group(0).rstrip(".,;:")).lower().rstrip("/"))
    return {url for url in allowed if url}


# ── Shape coercion ──────────────────────────────────────────────────────────

def _empty_resume() -> dict[str, Any]:
    return {
        "personal": {k: "" for k in ("name", "email", "phone", "location", "linkedin", "github", "website")},
        "education": [],
        "skills": [],
        "projects": [],
        "experience": [],
        "extracurricular": [],
        "achievements": [],
        "certifications": [],
        "publications": [],
    }


def _clean(value: Any) -> str:
    if value is None:
        return ""
    value = normalize_text(str(value))
    value = BULLET_PREFIX_RE.sub("", value).strip()
    value = re.sub(r"\s+", " ", value)
    return value.strip(" \t|")


def _as_list(value: Any) -> list[Any]:
    return value if isinstance(value, list) else []


def _as_str_list(value: Any) -> list[str]:
    if not isinstance(value, list):
        return []
    return [_clean(item) for item in value if _clean(item)]


def _coerce_resume_shape(parsed: Any) -> dict[str, Any]:
    data = parsed if isinstance(parsed, dict) else {}
    resume = _empty_resume()

    personal = data.get("personal") if isinstance(data.get("personal"), dict) else {}
    for key in resume["personal"]:
        resume["personal"][key] = _clean(personal.get(key))

    for item in _as_list(data.get("education")):
        item = item if isinstance(item, dict) else {}
        resume["education"].append(
            {
                "id": "",
                "institution": _clean(item.get("institution")),
                "location": _clean(item.get("location")),
                "gpaLabel": _clean(item.get("gpaLabel")),
                "degree": _clean(item.get("degree")),
                "startDate": _clean(item.get("startDate")),
                "endDate": _clean(item.get("endDate")),
                "highlight": _clean(item.get("highlight")),
            }
        )

    for item in _as_list(data.get("skills")):
        item = item if isinstance(item, dict) else {}
        category = _clean(item.get("category"))
        items = _as_str_list(item.get("items"))
        if category or items:
            resume["skills"].append({"id": "", "category": category, "items": items})

    for item in _as_list(data.get("projects")):
        item = item if isinstance(item, dict) else {}
        bullets = _as_str_list(item.get("bullets"))
        if not bullets and item.get("description"):
            bullets = [_clean(item.get("description"))]
        resume["projects"].append(
            {
                "id": "",
                "name": _clean(item.get("name")),
                "techStack": _clean(item.get("techStack")),
                "githubUrl": _clean(item.get("githubUrl")),
                "liveUrl": _clean(item.get("liveUrl")),
                "bullets": bullets,
            }
        )

    for item in _as_list(data.get("experience")):
        item = item if isinstance(item, dict) else {}
        end_date = _clean(item.get("endDate"))
        resume["experience"].append(
            {
                "id": "",
                "role": _clean(item.get("role")),
                "company": _clean(item.get("company")),
                "location": _clean(item.get("location")),
                "startDate": _clean(item.get("startDate")),
                "endDate": end_date,
                "current": bool(item.get("current")) or end_date.lower() == "present",
                "projectSubtitle": _clean(item.get("projectSubtitle")),
                "bullets": _as_str_list(item.get("bullets")),
            }
        )

    for item in _as_list(data.get("extracurricular")):
        item = item if isinstance(item, dict) else {}
        resume["extracurricular"].append(
            {
                "id": "",
                "title": _clean(item.get("title")),
                "organization": _clean(item.get("organization")),
                "startDate": _clean(item.get("startDate")),
                "endDate": _clean(item.get("endDate")),
                "bullets": _as_str_list(item.get("bullets")),
            }
        )

    for item in _as_list(data.get("achievements")):
        item = item if isinstance(item, dict) else {}
        text = _clean(item.get("text"))
        if text:
            resume["achievements"].append({"id": "", "text": text})

    for item in _as_list(data.get("certifications")):
        item = item if isinstance(item, dict) else {}
        text = _clean(item.get("text"))
        if text:
            resume["certifications"].append(
                {"id": "", "text": text, "credentialUrl": _clean(item.get("credentialUrl"))}
            )

    for item in _as_list(data.get("publications")):
        item = item if isinstance(item, dict) else {}
        title = _clean(item.get("title"))
        if title:
            resume["publications"].append(
                {
                    "id": "",
                    "title": title,
                    "authors": _clean(item.get("authors")),
                    "abstractText": _clean(item.get("abstractText")),
                    "paperUrl": _clean(item.get("paperUrl") or item.get("paperLink")),
                    "paperLinkLabel": _clean(item.get("paperLinkLabel") or item.get("paperLabel")),
                }
            )

    return resume


# ── URL handling ────────────────────────────────────────────────────────────

def _is_github_profile(url: str) -> bool:
    parsed = urlsplit(url if "://" in url else f"https://{url}")
    if "github.com" not in parsed.netloc.lower():
        return False
    segments = [seg for seg in parsed.path.strip("/").split("/") if seg]
    return len(segments) == 1


def _sanitize_urls(resume: dict[str, Any], allowed: set[str]) -> None:
    """Drop any URL field whose value is not a real URL from the document."""

    def safe(value: str) -> str:
        value = _norm_url(_clean(value))
        if not re.match(r"^https?://", value, re.IGNORECASE):
            return ""
        return value if value.lower().rstrip("/") in allowed else ""

    p = resume["personal"]
    p["linkedin"] = safe(p.get("linkedin", ""))
    p["github"] = safe(p.get("github", ""))
    p["website"] = safe(p.get("website", ""))
    for project in resume["projects"]:
        project["githubUrl"] = safe(project.get("githubUrl", ""))
        project["liveUrl"] = safe(project.get("liveUrl", ""))
    for cert in resume["certifications"]:
        cert["credentialUrl"] = safe(cert.get("credentialUrl", ""))
    for pub in resume["publications"]:
        pub["paperUrl"] = safe(pub.get("paperUrl", ""))


def _attach_hyperlinks(resume: dict[str, Any], pairs: list[tuple[str, str]]) -> None:
    """Deterministically place real URLs from anchored pairs onto the resume.

    Pairs are in document reading order, so same-labelled links (e.g. several
    "[View Credential]") align positionally with their list entries.
    """
    if not pairs:
        return

    def has(label: str, *needles: str) -> bool:
        low = label.lower()
        return any(n in low for n in needles)

    linkedin = next((u for _, u in pairs if "linkedin.com" in u.lower()), "")
    github_profile = next((u for _, u in pairs if _is_github_profile(u)), "")
    portfolio = next((u for label, u in pairs if has(label, "portfolio")), "")
    paper = next((u for _, u in pairs if "arxiv.org" in u.lower() or "doi.org" in u.lower()), "")

    if linkedin:
        resume["personal"]["linkedin"] = linkedin
    if github_profile:
        resume["personal"]["github"] = github_profile
    if portfolio:
        resume["personal"]["website"] = portfolio
    if paper and resume["publications"]:
        resume["publications"][0]["paperUrl"] = paper

    # "[View Credential]" links -> certifications, in order (when counts align).
    cred = [u for label, u in pairs if has(label, "view credential", "credential")]
    if cred and len(cred) == len(resume["certifications"]):
        for cert, url in zip(resume["certifications"], cred):
            cert["credentialUrl"] = url

    # "GitHub Link" links -> projects, in order (when counts align).
    gh_links = [u for label, u in pairs if has(label, "github link")]
    if gh_links and len(gh_links) == len(resume["projects"]):
        for project, url in zip(resume["projects"], gh_links):
            project["githubUrl"] = url

    # "Live Link" links -> the projects (in order) that the model marked as live.
    live_links = [u for label, u in pairs if has(label, "live link")]
    if live_links:
        live_projects = [p for p in resume["projects"] if p.get("liveUrl")]
        if len(live_projects) == len(live_links):
            for project, url in zip(live_projects, live_links):
                project["liveUrl"] = url


def _renumber_ids(resume: dict[str, Any]) -> None:
    prefixes = {
        "education": "edu",
        "skills": "skill",
        "projects": "proj",
        "experience": "exp",
        "extracurricular": "extra",
        "achievements": "ach",
        "certifications": "cert",
        "publications": "pub",
    }
    for section, prefix in prefixes.items():
        for idx, item in enumerate(resume[section], start=1):
            item["id"] = f"{prefix}_{idx}"


def repair_parsed_resume(
    parsed: Any,
    allowed_urls: set[str],
    pairs: list[tuple[str, str]],
) -> dict[str, Any]:
    """Coerce the model output to the app schema and fix up all URLs."""
    resume = _coerce_resume_shape(parsed)
    _sanitize_urls(resume, allowed_urls)   # remove hallucinated URLs from the model
    _attach_hyperlinks(resume, pairs)      # add the real ones from the PDF
    _renumber_ids(resume)
    return resume
