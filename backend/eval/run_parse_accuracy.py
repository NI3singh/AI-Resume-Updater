"""Stage-2B: hyperlink -> field mapping accuracy (parse vs parse+verify).

Measures whether the import pipeline places each recovered hyperlink in the
*correct* ResumeData field. Ground truth is derived from the URL's type, which is
exactly the mapping the pipeline's own spec (`_LINKS_RULE` in
`app/routers/tools.py`) is supposed to follow:

    mailto:                      -> personal.email
    linkedin.com/in/<user>       -> personal.linkedin
    github.com/<user>            -> personal.github
    github.com/<user>/<repo>     -> project.githubUrl   (any project)
    <user>.github.io / portfolio -> personal.website
    credly / coursera / udemy    -> certification.credentialUrl
    *.vercel/netlify/onrender/…  -> project.liveUrl      (any project)
    arxiv.org / doi.org          -> publication.paperUrl

So accuracy = how faithfully the LLM pipeline executes that documented spec.
Ambiguous links (competitive-programming profiles, social posts, file shares,
bare linkedin.com/) have no clean schema field and are excluded from the
denominator. Resumes with zero mappable links (blank templates whose links are
vendor promos) are skipped automatically.

Requires NEBIUS_API_KEY. Two LLM calls per resume (parse, then verify). Inputs
gitignored (PII); the report under data/ is aggregate-only.

Usage (from backend/): python -m eval.run_parse_accuracy
"""

from __future__ import annotations

import glob
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.config import settings  # noqa: E402
from app.llm import LLMError, LLMNotConfigured, chat_json  # noqa: E402
from app.routers.tools import (  # noqa: E402
    PARSE_SYSTEM, VERIFY_SYSTEM, _extract_docx, _extract_pdf, _links_block,
)

_HERE = os.path.dirname(os.path.abspath(__file__))
_DATA = os.path.join(_HERE, "data")
_RES_DIR = os.path.join(_DATA, "resume")

_SECTION = {"project": "projects", "certification": "certifications", "publication": "publications"}


def _expected_field(url: str):
    """(kind, field) the URL should map to per the spec, or None if ambiguous."""
    u = url.lower()
    if u.startswith("mailto:"):
        return ("personal", "email")
    if "linkedin.com/in/" in u:
        return ("personal", "linkedin")
    if ".github.io" in u:
        return ("personal", "website")
    m = re.search(r"github\.com/([^?#]+)", u)
    if m:
        segs = [s for s in m.group(1).strip("/").split("/") if s]
        if len(segs) >= 2:
            return ("project", "githubUrl")
        if len(segs) == 1:
            return ("personal", "github")
    if any(d in u for d in ("credly.com", "coursera.org/account/accomplishments",
                            "udemy.com/certificate", "credly")):
        return ("certification", "credentialUrl")
    if any(d in u for d in ("vercel.app", "netlify.app", "onrender.com",
                            "streamlit.app", "herokuapp.com", "pages.dev")):
        return ("project", "liveUrl")
    if any(d in u for d in ("arxiv.org", "doi.org")):
        return ("publication", "paperUrl")
    return None


def _core(u: str) -> str:
    u = (u or "").lower().strip()
    u = re.sub(r"^mailto:", "", u)
    u = re.sub(r"^https?://(www\.)?", "", u)
    return u.replace(".git", "").rstrip("/")


def _match(url: str, value) -> bool:
    a, b = _core(url), _core(value if isinstance(value, str) else "")
    if not a or not b:
        return False
    return a == b or a in b or b in a or a[:30] == b[:30]


def _placed(data, kind: str, field: str, url: str) -> bool:
    if not isinstance(data, dict):
        return False
    if kind == "personal":
        return _match(url, (data.get("personal") or {}).get(field))
    return any(isinstance(e, dict) and _match(url, e.get(field))
               for e in data.get(_SECTION[kind]) or [])


def _url_of(link: str) -> str:
    return link.split(" -> ", 1)[1].strip() if " -> " in link else link.strip()


def _extract(path: str):
    raw = open(path, "rb").read()
    return _extract_docx(raw) if path.lower().endswith(".docx") else _extract_pdf(raw)


def run() -> int:
    files = sorted(glob.glob(os.path.join(_RES_DIR, "*.pdf")) +
                   glob.glob(os.path.join(_RES_DIR, "*.docx")))
    if not files:
        print(f"No resume files in {_RES_DIR}")
        return 2

    rows, details = [], []
    by_type: dict[str, list[int]] = {}
    for path in files:
        name = os.path.basename(path)
        text, links = _extract(path)
        text = text or ""
        expected = [(u, _expected_field(u)) for u in (_url_of(x) for x in links)]
        expected = [(u, kf) for u, kf in expected if kf]
        if not expected:
            print(f"{name[:40]:40} - no mappable links, skipped")
            continue

        text_for_llm = text[: settings.parse_text_limit] + _links_block(links)
        print(f"{name[:40]:40} - parse + verify ({len(expected)} mappable links; cold start ~30s)...")
        try:
            parsed = chat_json(PARSE_SYSTEM, text_for_llm)
            vres = chat_json(VERIFY_SYSTEM,
                             "ORIGINAL RESUME TEXT:\n" + text_for_llm
                             + "\n\nPARSED JSON TO REVIEW:\n" + json.dumps(parsed, ensure_ascii=False))
        except LLMError as exc:
            print(f"    LLM error, skipping: {exc}")
            continue
        verified = vres.get("data") if isinstance(vres, dict) and isinstance(vres.get("data"), dict) else parsed

        pc = vc = 0
        for url, (kind, field) in expected:
            pok = _placed(parsed, kind, field, url)
            vok = _placed(verified, kind, field, url)
            pc += pok
            vc += vok
            t = f"{kind}.{field}"
            by_type.setdefault(t, [0, 0, 0])
            by_type[t][0] += pok
            by_type[t][1] += vok
            by_type[t][2] += 1
            details.append({"resume": name, "url": url, "expected": t,
                            "parse_ok": bool(pok), "verify_ok": bool(vok)})
        rows.append({"name": name, "n": len(expected), "parse": pc, "verify": vc})
        print(f"    parse: {pc}/{len(expected)}   parse+verify: {vc}/{len(expected)}")

    total = sum(r["n"] for r in rows)
    p_tot = sum(r["parse"] for r in rows)
    v_tot = sum(r["verify"] for r in rows)

    lines: list[str] = []
    w = lines.append
    w("# Hyperlink -> Field Mapping Accuracy (parse vs parse+verify)\n")
    w(f"Resumes with mappable links: **{len(rows)}**  -  mappable hyperlinks: **{total}**\n")
    w(f"Model: `{settings.nebius_model}`\n")
    if total:
        w("## Headline\n")
        w(f"- **Parse-only field accuracy:** {p_tot}/{total} = **{100.0 * p_tot / total:.0f}%**")
        w(f"- **Parse + verify field accuracy:** {v_tot}/{total} = **{100.0 * v_tot / total:.0f}%**")
        w(f"- **Verify lift:** {(100.0 * (v_tot - p_tot) / total):+.0f} pts\n")
        w("> Ground truth = the URL-type mapping rules the pipeline's own spec defines; "
          "accuracy measures conformance to that spec. Ambiguous links excluded.\n")
        w("## By field type\n")
        w("| field | parse | parse+verify | n |")
        w("|---|---|---|---|")
        for t, (p, v, n) in sorted(by_type.items(), key=lambda kv: -kv[1][2]):
            w(f"| {t} | {p}/{n} | {v}/{n} | {n} |")
        w("\n## Per resume\n")
        w("| resume | mappable | parse | parse+verify |")
        w("|---|---|---|---|")
        for r in rows:
            w(f"| {r['name'][:40]} | {r['n']} | {r['parse']} | {r['verify']} |")
    report = "\n".join(lines)
    print("\n" + report)

    with open(os.path.join(_DATA, "parse_accuracy_report.md"), "w", encoding="utf-8") as fh:
        fh.write(report + "\n")
    with open(os.path.join(_DATA, "parse_accuracy_details.json"), "w", encoding="utf-8") as fh:
        json.dump(details, fh, ensure_ascii=False, indent=2)
    print(f"\n[report + details written under {_DATA} (gitignored)]")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(run())
    except LLMNotConfigured as exc:
        print(f"Nebius not configured: {exc}")
        raise SystemExit(3)
