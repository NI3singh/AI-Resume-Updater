"""GitHub integration for the Profile page.

Reads a user's PUBLIC repositories and crafts résumé project entries grounded in
the project's REAL CODE — manifests, entrypoints, and the source files the user
selects — plus the README. The LLM writes MNC-style bullets which are then run
through the same anti-fabrication guard as Transform (``guard_unit``), so a
number must trace to the actual code/README/user notes. Only public data is
read; an optional app-level ``GITHUB_TOKEN`` just raises the API rate limit.
"""

import base64
import re
from typing import Any
from urllib.parse import quote

import httpx
from fastapi import APIRouter, Depends, HTTPException, status

from ..config import settings
from ..deps import get_current_user
from ..llm import LLMError, LLMNotConfigured, chat_json
from ..models import User
from ..schemas import (
    GithubProjectIn,
    GithubProjectOut,
    GithubRefineIn,
    GithubRefineOut,
    GithubRepoOut,
    GithubReposIn,
    GithubReposOut,
    GithubSummaryIn,
    GithubSummaryOut,
    GithubTreeFile,
    GithubTreeIn,
    GithubTreeOut,
)
from ..transform_guard import guard_unit, resolve_bullet_ops

router = APIRouter(prefix="/github", tags=["github"])

# ── Budgets (bound cost + tokens) ────────────────────────────────────────────
_README_LIMIT = 8000        # chars of README fed to the model
_FILE_CHAR_LIMIT = 4000     # chars kept per selected source file
_DIGEST_CHAR_LIMIT = 48000  # total chars of the code digest
_MAX_FILES = 18             # max selected files actually read
_AUTO_FILES = 10            # files auto-picked when the client sends none
_TREE_MAX_ENTRIES = 400     # files returned in the tree listing
_SUGGEST_COUNT = 12         # how many files are pre-checked in the tree

# ── File-selection heuristics ────────────────────────────────────────────────
_SKIP_DIRS = {
    "node_modules", ".git", "dist", "build", "out", "vendor", "target", ".next",
    ".nuxt", ".venv", "venv", "env", "__pycache__", "coverage", ".idea", ".vscode",
    "site-packages", "bin", "obj", ".cache", "tmp", ".turbo", ".parcel-cache",
}
_LOCKFILES = {
    "package-lock.json", "yarn.lock", "pnpm-lock.yaml", "poetry.lock", "cargo.lock",
    "composer.lock", "gemfile.lock", "go.sum", "bun.lockb",
}
_SKIP_EXT = (
    ".min.js", ".min.css", ".map", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico",
    ".webp", ".bmp", ".pdf", ".zip", ".gz", ".tar", ".rar", ".7z", ".mp4", ".mov",
    ".mp3", ".wav", ".woff", ".woff2", ".ttf", ".eot", ".otf", ".bin", ".exe",
    ".dll", ".so", ".class", ".pyc", ".csv", ".parquet", ".lock",
)
_CODE_EXT = {
    ".py", ".js", ".jsx", ".ts", ".tsx", ".go", ".rs", ".java", ".kt", ".rb",
    ".php", ".c", ".cc", ".cpp", ".h", ".hpp", ".cs", ".swift", ".scala", ".sql",
    ".sh", ".vue", ".svelte", ".dart", ".r", ".jl", ".ipynb", ".yml", ".yaml",
    ".toml", ".json", ".md", ".cfg", ".ini", ".gradle", ".tf", ".proto",
}
_MANIFESTS = {
    "package.json", "requirements.txt", "requirements-dev.txt", "pyproject.toml",
    "setup.py", "setup.cfg", "pipfile", "go.mod", "cargo.toml", "pom.xml",
    "build.gradle", "build.gradle.kts", "gemfile", "composer.json", "dockerfile",
    "docker-compose.yml", "docker-compose.yaml", "makefile", "procfile",
}
_ENTRYPOINT_STEMS = {"main", "index", "app", "server", "cli", "__main__", "wsgi", "asgi", "run", "manage"}
_SRC_DIRS = {"src", "app", "lib", "backend", "frontend", "server", "api", "cmd", "internal", "pkg"}

GITHUB_PROJECT_SYSTEM = (
    "You are an elite résumé writer for top tech companies. From a GitHub "
    "project's metadata, README, package manifests, and selected SOURCE CODE, "
    "write a SMALL set of strong, truthful, information-dense résumé bullets that "
    "capture what was built and the engineering depth.\n\n"
    "LENGTH & COUNT:\n"
    "- Write 3-4 bullets for a typical project. Add a 5th or 6th ONLY when the "
    "project is genuinely large with distinct workstreams that 4 bullets cannot "
    "cover. Fewer, richer bullets beat many thin ones — MERGE related points "
    "instead of splitting them.\n"
    "- Each bullet is a complete, substantial sentence (about one to two lines, "
    "~18-34 words): WHAT was built + the KEY technologies & architecture + the "
    "depth, scope, or impact. No short fragments, no filler padding.\n\n"
    "STRICT GROUNDING:\n"
    "- Ground EVERYTHING in the provided sources (metadata, README, manifests, "
    "code) and any USER NOTES. NEVER invent metrics, users, performance numbers, "
    "outcomes, integrations, or features they don't evidence.\n"
    "- Name the REAL technologies, frameworks, architecture, and techniques "
    "visible in the code/manifests — e.g. 'JWT auth', 'PostgreSQL + Alembic "
    "migrations', 'React + Zustand', 'FastAPI', 'Dockerized', 'CI via GitHub "
    "Actions'.\n"
    "- Include a METRIC only if it genuinely appears in the sources (a benchmark, "
    "test count/coverage, dataset size, etc.). Do NOT pass off arbitrary code "
    "constants (ports, version numbers, buffer sizes, timeouts) as achievements. "
    "If there is no real metric, describe the scope, complexity, and what was "
    "implemented — never fabricate numbers.\n"
    "- Start each bullet with a strong action verb; be specific and technical, no "
    "fluff or marketing. Do NOT restate the project name or any URL.\n"
    "- If a USER REQUEST / NOTES are given, follow them and treat facts they "
    "state as allowed — but still never invent.\n\n"
    'Return ONLY a JSON object: { "bullets": ["..."], '
    '"techStack": "comma-separated real technologies", '
    '"rationale": "one short sentence" }  No markdown, no commentary.'
)

# Agentic editor for the refine/regenerate step: returns edit OPERATIONS over the
# current bullets so the user's request is applied surgically — bullets they want
# untouched are preserved verbatim (server resolves "keep" from the originals).
GITHUB_REFINE_SYSTEM = (
    "You are an agentic résumé-bullet editor. You receive the CURRENT BULLETS "
    "(numbered from 0), the project SOURCES (metadata, README, code), optional "
    "USER NOTES, and a USER REQUEST. Apply the USER REQUEST PRECISELY by emitting "
    "a list of edit operations that produce the FINAL bullets, in final order.\n\n"
    "OPERATIONS — each element of \"bullets\" is one of:\n"
    '  {"op":"keep","index":N}              keep current bullet N EXACTLY as-is\n'
    '  {"op":"edit","index":N,"text":"..."} replace current bullet N with new text\n'
    '  {"op":"add","text":"..."}            add a brand-new bullet\n\n'
    "RULES:\n"
    "- The final bullets are EXACTLY the ops you emit, in order. Any current "
    "bullet you do not 'keep' or 'edit' is DROPPED — to delete one, simply omit "
    "it.\n"
    "- Change ONLY what the request asks. If the user says to keep some bullets "
    "and add another, emit 'keep' for each of those (do NOT reword them) and "
    "'add' for the new one. NEVER silently rewrite a bullet the user wanted left "
    "alone.\n"
    "- Honor explicit counts EXACTLY: 'make it 3 bullets' -> exactly 3 ops; "
    "'keep only 2' -> exactly 2 ops; 'add a bullet' -> the existing ops plus one "
    "more.\n"
    "- New or edited text MUST be grounded in the SOURCES or USER NOTES — name "
    "real tech/architecture; NEVER invent metrics, features, scale, or outcomes. "
    "If no real metric exists, describe scope and depth instead. Keep each bullet "
    "a substantial one-to-two-line sentence.\n"
    "- Strong action verb; specific and technical; no fluff; don't restate the "
    "project name or URLs.\n\n"
    'Return ONLY JSON: { "bullets": [ <ops> ], "rationale": "one short sentence" }'
    "  No markdown, no commentary."
)

# Second-pass fact checker (multi-call grounding) — flags bullets whose concrete
# claims are not supported by the sources, so they can be dropped before review.
GITHUB_VERIFY_SYSTEM = (
    "You are a strict fact-checker for résumé bullets. You receive the project "
    "SOURCES (metadata, README, code) and DRAFT BULLETS numbered from 0. For each "
    "bullet decide whether EVERY concrete claim it makes — technologies, "
    "features, architecture, integrations, scale, metrics, outcomes — is "
    "supported by the sources.\n"
    "- Mark ok=false ONLY when a bullet asserts something the sources do not show "
    "(an invented feature, integration, technology, user/scale number, or "
    "metric). Be LENIENT about reasonable wording of what the code clearly does; "
    "do not punish style or generic phrasing.\n"
    "- When ok=false, name the unsupported claim in 'issue' (a few words).\n"
    'Return ONLY JSON: { "verdicts": [ {"index":0,"ok":true,"issue":""}, ... ] } '
    "— exactly one verdict per bullet, in order."
)


# ── GitHub helpers ───────────────────────────────────────────────────────────
def _gh_headers() -> dict[str, str]:
    headers = {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if settings.github_token:
        headers["Authorization"] = f"Bearer {settings.github_token}"
    return headers


def _raise_for_gh_status(code: int, *, not_found: str) -> None:
    """Map a GitHub HTTP status onto a friendly HTTPException (no-op if <400)."""
    if code < 400:
        return
    if code == 404:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=not_found)
    if code in (403, 429):
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="GitHub rate limit reached — try again later, or set GITHUB_TOKEN on the server.",
        )
    raise HTTPException(
        status_code=status.HTTP_502_BAD_GATEWAY,
        detail=f"GitHub request failed ({code}).",
    )


def _clean_username(raw: str) -> str:
    gh = raw.strip().lstrip("@")
    if "github.com/" in gh:
        gh = gh.split("github.com/", 1)[1]
    return gh.strip("/").split("/")[0].split("?")[0]


def _humanize(name: str) -> str:
    """'my-cool_project' -> 'My Cool Project'."""
    words = [w for w in re.split(r"[-_\s]+", name) if w]
    return " ".join(w[:1].upper() + w[1:] for w in words) or name


def _validate_full_name(raw: str) -> str:
    full = raw.strip().strip("/")
    if full.count("/") != 1 or not all(full.split("/")):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Expected a repository in 'owner/repo' form.",
        )
    return full


def _basename(path: str) -> str:
    return path.rsplit("/", 1)[-1].lower()


def _ext(fname: str) -> str:
    dot = fname.rfind(".")
    return fname[dot:] if dot != -1 else ""


def _is_skipped(path: str) -> bool:
    parts = path.lower().split("/")
    if any(d in _SKIP_DIRS for d in parts[:-1]):
        return True
    fname = parts[-1]
    if fname in _LOCKFILES:
        return True
    return any(fname.endswith(ext) for ext in _SKIP_EXT)


def _is_code_ish(path: str) -> bool:
    fname = _basename(path)
    if fname in _MANIFESTS or fname.startswith("readme"):
        return True
    return _ext(fname) in _CODE_EXT


def _score(path: str) -> float:
    """Importance score for pre-selection (higher = more useful to read)."""
    parts = path.lower().split("/")
    fname = parts[-1]
    depth = len(parts) - 1
    dot = fname.rfind(".")
    stem = fname[:dot] if dot != -1 else fname
    if fname in _MANIFESTS or fname.startswith("readme") or fname in ("dockerfile", "makefile"):
        base = 3.0
    elif stem in _ENTRYPOINT_STEMS:
        base = 2.0
    elif parts[0] in _SRC_DIRS:
        base = 1.0
    else:
        base = 0.3
    return base - depth * 0.15


def _fetch_meta(client: httpx.Client, full_name: str) -> dict:
    resp = client.get(f"{settings.github_api_url}/repos/{full_name}")
    _raise_for_gh_status(resp.status_code, not_found="Repository not found.")
    meta = resp.json()
    if not isinstance(meta, dict):
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Unexpected GitHub response.")
    return meta


def _fetch_readme(client: httpx.Client, full_name: str) -> str:
    try:
        rd = client.get(f"{settings.github_api_url}/repos/{full_name}/readme")
    except httpx.HTTPError:
        return ""
    if rd.status_code >= 400:
        return ""
    body = rd.json()
    content = body.get("content") if isinstance(body, dict) else None
    if isinstance(content, str):
        try:
            return base64.b64decode(content).decode("utf-8", errors="ignore")
        except Exception:  # noqa: BLE001 — malformed README payload
            return ""
    return ""


def _tree_candidates(client: httpx.Client, full_name: str, branch: str) -> tuple[bool, list[tuple[str, int, float]]]:
    """Return (truncated, [(path, size, score)]) for code-ish files, ranked."""
    resp = client.get(
        f"{settings.github_api_url}/repos/{full_name}/git/trees/{branch}",
        params={"recursive": "1"},
    )
    _raise_for_gh_status(resp.status_code, not_found="Repository tree not found.")
    tree = resp.json()
    truncated = bool(tree.get("truncated")) if isinstance(tree, dict) else False
    entries = tree.get("tree") if isinstance(tree, dict) else []
    cands: list[tuple[str, int, float]] = []
    for e in entries or []:
        if not isinstance(e, dict) or e.get("type") != "blob":
            continue
        path = str(e.get("path") or "")
        if not path or _is_skipped(path) or not _is_code_ish(path):
            continue
        size = int(e.get("size") or 0)
        if size > 500_000:  # skip very large files (data dumps, generated)
            continue
        cands.append((path, size, _score(path)))
    cands.sort(key=lambda c: (-c[2], c[0]))
    return truncated, cands


def _fetch_file_raw(client: httpx.Client, full_name: str, path: str) -> str | None:
    try:
        r = client.get(
            f"{settings.github_api_url}/repos/{full_name}/contents/{quote(path, safe='/')}",
            headers={**_gh_headers(), "Accept": "application/vnd.github.raw"},
        )
    except httpx.HTTPError:
        return None
    if r.status_code >= 400 or not r.text:
        return None
    return r.text


def _build_digest(metadata_text: str, readme: str, fetched: list[tuple[str, str]]) -> str:
    parts = [f"--- PROJECT METADATA ---\n{metadata_text}"]
    if readme:
        parts.append(f"--- README ---\n{readme}")
    for path, content in fetched:
        parts.append(f"--- FILE: {path} ---\n{content}")
    return "\n\n".join(parts)[:_DIGEST_CHAR_LIMIT]


def _readme_blurb(readme: str, limit: int = 180) -> str:
    """First meaningful prose from a README, stripped of markdown — a short card
    blurb for repos with no GitHub 'About'. Skips headings, badges, images,
    HTML, lists, and rules."""
    if not readme:
        return ""
    text = re.sub(r"```.*?```", " ", readme, flags=re.DOTALL)  # drop code blocks
    parts: list[str] = []
    for raw in text.splitlines():
        line = raw.strip()
        if (
            not line
            or line[0] in "#>|"
            or line.startswith(("![", "<", "- ", "* ", "+ "))
            or re.fullmatch(r"[-=*_]{3,}", line)
        ):
            continue
        line = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", line)      # images
        line = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", line)  # links -> text
        line = re.sub(r"<[^>]+>", "", line)                    # html tags
        line = re.sub(r"[*_`#]", "", line).strip()             # inline emphasis
        if len(line) < 12:
            continue
        parts.append(line)
        if len(" ".join(parts)) >= limit:
            break
    blurb = " ".join(parts).strip()
    if len(blurb) > limit:
        blurb = blurb[:limit].rsplit(" ", 1)[0].rstrip() + "…"
    return blurb


def _verify_bullets(bullets: list[str], digest: str, notes: str) -> tuple[list[str], list[str]]:
    """Drop draft bullets asserting a concrete claim the sources don't support.

    A conservative, fail-open second LLM pass that lowers hallucinations on top of
    the deterministic number guard. On any error, an unusable response, or a
    verdict that would remove EVERY bullet (likely overzealous), the bullets are
    returned unchanged. Returns ``(kept_bullets, warnings)``.
    """
    clean = [b for b in bullets if isinstance(b, str) and b.strip()]
    if not clean:
        return bullets, []
    numbered = "\n".join(f"[{i}] {b}" for i, b in enumerate(clean))
    msg = (
        "=== SOURCES (metadata, README, code) ===\n" + digest
        + (f"\n\n=== USER NOTES (allowed facts) ===\n{notes}" if notes else "")
        + "\n\n=== DRAFT BULLETS ===\n" + numbered
    )
    try:
        res = chat_json(GITHUB_VERIFY_SYSTEM, msg, max_tokens=1024, temperature=0.0)
    except (LLMError, LLMNotConfigured):
        return clean, []
    verdicts = res.get("verdicts") if isinstance(res, dict) else None
    if not isinstance(verdicts, list):
        return clean, []
    flagged: dict[int, str] = {}
    for v in verdicts:
        if isinstance(v, dict) and v.get("ok") is False:
            idx = v.get("index")
            if isinstance(idx, int) and 0 <= idx < len(clean):
                flagged[idx] = str(v.get("issue") or "").strip()
    if not flagged:
        return clean, []
    kept = [b for i, b in enumerate(clean) if i not in flagged]
    if not kept:  # verifier rejected everything — treat as overzealous, keep all
        return clean, []
    warnings: list[str] = []
    for i, issue in flagged.items():
        snippet = clean[i][:60] + ("…" if len(clean[i]) > 60 else "")
        detail = issue or "claim not found in the code/README"
        warnings.append(f"Removed an unverified bullet — {detail}: {snippet}")
    return kept, warnings


# ── Routes ───────────────────────────────────────────────────────────────────
@router.post("/repos", response_model=GithubReposOut)
def github_repos(
    payload: GithubReposIn, current_user: User = Depends(get_current_user),
) -> GithubReposOut:
    username = _clean_username(payload.username)
    if not username:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Enter a GitHub username.")

    repos: list[GithubRepoOut] = []
    try:
        with httpx.Client(timeout=20.0, headers=_gh_headers()) as client:
            for page in (1, 2):  # up to 200 repos
                resp = client.get(
                    f"{settings.github_api_url}/users/{username}/repos",
                    params={"per_page": 100, "sort": "updated", "type": "owner", "page": page},
                )
                _raise_for_gh_status(resp.status_code, not_found="GitHub user not found.")
                batch = resp.json()
                if not isinstance(batch, list) or not batch:
                    break
                for r in batch:
                    if not isinstance(r, dict):
                        continue
                    repos.append(GithubRepoOut(
                        name=str(r.get("name") or ""),
                        full_name=str(r.get("full_name") or ""),
                        description=str(r.get("description") or ""),
                        language=str(r.get("language") or ""),
                        topics=[str(t) for t in (r.get("topics") or []) if isinstance(t, str)],
                        stars=int(r.get("stargazers_count") or 0),
                        html_url=str(r.get("html_url") or ""),
                        homepage=str(r.get("homepage") or ""),
                        updated_at=str(r.get("updated_at") or ""),
                        fork=bool(r.get("fork")),
                        archived=bool(r.get("archived")),
                    ))
                if len(batch) < 100:
                    break
    except httpx.HTTPError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY, detail=f"Could not reach GitHub: {exc}",
        ) from exc

    return GithubReposOut(repos=repos)


@router.post("/readme-summary", response_model=GithubSummaryOut)
def github_readme_summary(
    payload: GithubSummaryIn, current_user: User = Depends(get_current_user),
) -> GithubSummaryOut:
    """A short README-derived blurb for a single repo — used to fill cards whose
    GitHub 'About' is empty. Best-effort: returns '' if there's no README."""
    full_name = _validate_full_name(payload.full_name)
    try:
        with httpx.Client(timeout=15.0, headers=_gh_headers()) as client:
            readme = _fetch_readme(client, full_name)
    except httpx.HTTPError:
        return GithubSummaryOut(summary="")
    return GithubSummaryOut(summary=_readme_blurb(readme))


@router.post("/project/tree", response_model=GithubTreeOut)
def github_project_tree(
    payload: GithubTreeIn, current_user: User = Depends(get_current_user),
) -> GithubTreeOut:
    """List the repo's code-ish files (junk filtered out) with the important ones
    pre-flagged, so the user can choose what the AI reads."""
    full_name = _validate_full_name(payload.full_name)
    try:
        with httpx.Client(timeout=25.0, headers=_gh_headers()) as client:
            meta = _fetch_meta(client, full_name)
            branch = str(meta.get("default_branch") or "HEAD")
            truncated, cands = _tree_candidates(client, full_name, branch)
    except httpx.HTTPError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY, detail=f"Could not reach GitHub: {exc}",
        ) from exc

    suggested = {p for p, _, sc in cands[:_SUGGEST_COUNT] if sc >= 1.0}
    files = [
        GithubTreeFile(path=p, size=s, suggested=(p in suggested))
        for p, s, _ in cands[:_TREE_MAX_ENTRIES]
    ]
    files.sort(key=lambda f: (not f.suggested, f.path))
    return GithubTreeOut(default_branch=branch, truncated=truncated, files=files)


@router.post("/project", response_model=GithubProjectOut)
def github_project(
    payload: GithubProjectIn, current_user: User = Depends(get_current_user),
) -> GithubProjectOut:
    """Craft code-grounded project bullets by reading the selected source files +
    manifests + README, then guarding the result against fabrication."""
    full_name = _validate_full_name(payload.full_name)
    instruction = payload.instruction.strip()[: settings.parse_text_limit]
    notes = payload.notes.strip()[: settings.parse_text_limit]
    selected = [p.strip() for p in payload.file_paths if isinstance(p, str) and p.strip()]

    fetched: list[tuple[str, str]] = []
    try:
        with httpx.Client(timeout=30.0, headers=_gh_headers()) as client:
            meta = _fetch_meta(client, full_name)
            readme = _fetch_readme(client, full_name)[:_README_LIMIT]
            if not selected:  # fallback: auto-pick the most important files
                branch = str(meta.get("default_branch") or "HEAD")
                _, cands = _tree_candidates(client, full_name, branch)
                selected = [p for p, _, sc in cands[:_AUTO_FILES] if sc >= 1.0]
            for path in selected[:_MAX_FILES]:
                content = _fetch_file_raw(client, full_name, path)
                if content:
                    fetched.append((path, content[:_FILE_CHAR_LIMIT]))
    except httpx.HTTPError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY, detail=f"Could not reach GitHub: {exc}",
        ) from exc

    name = _humanize(str(meta.get("name") or ""))
    language = str(meta.get("language") or "")
    topics = [str(t) for t in (meta.get("topics") or []) if isinstance(t, str)]
    tech_meta = ", ".join(([language] if language else []) + topics)
    github_url = str(meta.get("html_url") or "")
    homepage = str(meta.get("homepage") or "")
    description = str(meta.get("description") or "")

    metadata_text = (
        f"Name: {name}\nDescription: {description}\nPrimary language: {language}\n"
        f"Topics: {', '.join(topics)}\nStars: {meta.get('stargazers_count') or 0}"
    )
    digest = _build_digest(metadata_text, readme, fetched)
    analyzed = [p for p, _ in fetched]

    draft_entry: dict[str, Any] = {
        "id": "gh", "name": name, "techStack": tech_meta,
        "githubUrl": github_url, "liveUrl": homepage,
        "bullets": [description] if description else [],
    }

    header = f"PROJECT: {name}\nPRIMARY LANGUAGE: {language or '(unknown)'}\n"
    if instruction:
        header += f"\n*** USER REQUEST (apply this; never invent facts): {instruction}\n"
    user_msg = header + "\n=== SOURCES (metadata, README, code) ===\n" + digest
    if notes:
        user_msg += f"\n\n=== USER NOTES (facts the user provided — allowed) ===\n{notes}"
    if instruction:
        user_msg += f"\n\nREMINDER — apply the user request above: {instruction}"

    sources = [digest] + ([notes] if notes else []) + ([instruction] if instruction else [])
    warnings: list[str] = []
    bullets: list[str] = []
    tech = tech_meta
    rationale = ""
    try:
        result = chat_json(GITHUB_PROJECT_SYSTEM, user_msg, max_tokens=2048, temperature=0.3)
        guarded, warnings = guard_unit(
            "projects", draft_entry, {"bullets": result.get("bullets")}, sources=sources,
        )
        bullets = guarded.get("bullets", [])
        tech = str(result.get("techStack") or "").strip() or tech_meta
        rationale = str(result.get("rationale") or "").strip()
        # Second grounding pass: fact-check the bullets, dropping unsupported claims.
        bullets, verify_warnings = _verify_bullets(bullets, digest, notes)
        warnings += verify_warnings
    except LLMNotConfigured:
        bullets = [description] if description else []
        warnings = ["AI is not configured — added the repo description as a starter bullet."]
    except LLMError as exc:
        bullets = [description] if description else []
        warnings = [f"AI could not draft bullets ({exc}). Edit freely."]

    if not bullets:
        bullets = [description] if description else []
        if not analyzed and not readme:
            warnings.append("No README or code files could be read — add bullets manually.")

    project = {
        "name": name, "techStack": tech, "githubUrl": github_url,
        "liveUrl": homepage, "bullets": bullets,
    }
    return GithubProjectOut(
        project=project, warnings=warnings, analyzed_files=analyzed,
        digest=digest, rationale=rationale,
    )


@router.post("/project/refine", response_model=GithubRefineOut)
def github_project_refine(
    payload: GithubRefineIn, current_user: User = Depends(get_current_user),
) -> GithubRefineOut:
    """Regenerate bullets from a comment, reusing the digest from the analyze
    step (no GitHub re-fetch). The comment steers the rewrite and its facts are
    allowed; the guard still strips anything ungrounded."""
    digest = (payload.digest or "")[:_DIGEST_CHAR_LIMIT]
    if not digest.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Nothing to refine — analyze the project first.",
        )
    instruction = payload.instruction.strip()[: settings.parse_text_limit]
    notes = payload.notes.strip()[: settings.parse_text_limit]
    current = [b for b in payload.current_bullets if isinstance(b, str) and b.strip()]

    header = (
        "Edit the résumé bullets for this GitHub project by applying the user "
        "request below. Use ONLY the sources for any new facts, and emit edit "
        "operations (keep / edit / add) over the current bullets.\n"
    )
    if instruction:
        header += f"\n*** USER REQUEST (apply EXACTLY; never invent facts): {instruction}\n"
    user_msg = header
    if current:
        user_msg += (
            "\nCURRENT BULLETS (reference these by index in your ops):\n"
            + "\n".join(f"[{i}] {b}" for i, b in enumerate(current))
            + "\n"
        )
    else:
        user_msg += "\n(There are no current bullets yet — use 'add' ops.)\n"
    user_msg += "\n=== SOURCES (metadata, README, code) ===\n" + digest
    if notes:
        user_msg += f"\n\n=== USER NOTES (facts the user provided — allowed) ===\n{notes}"
    if instruction:
        user_msg += (
            "\n\nREMINDER — apply the user request EXACTLY: change only what it asks "
            "and preserve every other bullet with a 'keep' op. Request: "
            f"{instruction}"
        )

    sources = [digest] + ([notes] if notes else []) + ([instruction] if instruction else [])
    try:
        result = chat_json(GITHUB_REFINE_SYSTEM, user_msg, max_tokens=2048, temperature=0.3)
    except LLMNotConfigured as exc:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)) from exc
    except LLMError as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc)) from exc

    proposed = resolve_bullet_ops(result.get("bullets"), current)
    guarded, warnings = guard_unit(
        "projects", {"bullets": current}, {"bullets": proposed}, sources=sources,
    )
    return GithubRefineOut(
        bullets=guarded.get("bullets", []),
        warnings=warnings,
        rationale=str(result.get("rationale") or "").strip(),
    )
