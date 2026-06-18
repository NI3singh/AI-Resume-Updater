"""Deterministic benchmark for PDF/DOCX hyperlink recovery.

A résumé stores the URL behind a link as a PDF link annotation (`/Annots`) or a
DOCX relationship — invisible to plain text extraction, which sees only the
anchor text ("Portfolio", "LinkedIn", "[View Credential]"). The app recovers
these (`app/routers/tools.py: _extract_pdf / _extract_docx`) and appends them so
the parser can map each URL onto the right field.

This measures, deterministically (no LLM): how many hyperlinks are recovered,
how many are invisible to the text layer (the value-add over a naive parser),
well-formedness, and classification by type.

Usage (from backend/):  python -m eval.run_link_benchmark
Inputs:  eval/data/resume/*.pdf|*.docx   (gitignored; real résumés = PII)
Outputs (gitignored, under data/): link_benchmark_report.md + link_details.json.
The headline numbers are copied into eval/README.md, which is committed.
"""

from __future__ import annotations

import glob
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.routers.tools import _extract_docx, _extract_pdf  # noqa: E402

_HERE = os.path.dirname(os.path.abspath(__file__))
_DATA = os.path.join(_HERE, "data")
_RES_DIR = os.path.join(_DATA, "resume")


def _classify(url: str) -> str:
    u = url.lower()
    if u.startswith("mailto:"):
        return "email"
    if "linkedin.com" in u:
        return "linkedin"
    if "github.com" in u:
        path = re.sub(r"^https?://(www\.)?github\.com/?", "", u).strip("/")
        return "github_repo" if path.count("/") >= 1 else "github_profile"
    if any(d in u for d in ("credly.com", "coursera.org", "udemy.com", "credential", "certificate")):
        return "credential"
    if any(d in u for d in ("arxiv.org", "doi.org", "/doi/")):
        return "publication"
    if u.startswith(("http://", "https://")):
        return "portfolio_or_other"
    return "other"


def _url_of(link: str) -> str:
    # The DOCX extractor emits "anchor -> url"; the PDF extractor emits a bare url.
    return link.split(" -> ", 1)[1].strip() if " -> " in link else link.strip()


def _wellformed(url: str) -> bool:
    return url.startswith(("http://", "https://", "mailto:"))


def _hidden_from_text(url: str, text: str) -> bool:
    """True when the URL does not appear in the extracted text layer (i.e. only a
    link annotation carried it — a naive text-only parser would never see it)."""
    core = re.sub(r"^(https?://(www\.)?|mailto:)", "", url.lower()).strip("/")[:24]
    return bool(core) and core not in text.lower()


def _extract(path: str):
    raw = open(path, "rb").read()
    return _extract_docx(raw) if path.lower().endswith(".docx") else _extract_pdf(raw)


def run() -> int:
    files = sorted(glob.glob(os.path.join(_RES_DIR, "*.pdf")) +
                   glob.glob(os.path.join(_RES_DIR, "*.docx")))
    if not files:
        print(f"No résumé files in {_RES_DIR}")
        return 2

    rows: list[dict] = []
    details: list[dict] = []
    types: dict[str, int] = {}
    for path in files:
        name = os.path.basename(path)
        try:
            text, links = _extract(path)
        except Exception as exc:  # noqa: BLE001
            print(f"{name[:40]:40} ERROR {exc}")
            continue
        text = text or ""
        urls = [_url_of(x) for x in links]
        hidden = [u for u in urls if _hidden_from_text(u, text)]
        wf = [u for u in urls if _wellformed(u)]
        for u in urls:
            t = _classify(u)
            types[t] = types.get(t, 0) + 1
        rows.append({"name": name, "links": len(urls), "hidden": len(hidden), "wellformed": len(wf)})
        details.append({"name": name, "urls": [
            {"url": u, "type": _classify(u), "hidden_from_text": _hidden_from_text(u, text)} for u in urls]})
        print(f"{name[:40]:40} links={len(urls):2} hidden_from_text={len(hidden):2} wellformed={len(wf):2}")

    total = sum(r["links"] for r in rows)
    hidden_total = sum(r["hidden"] for r in rows)
    wf_total = sum(r["wellformed"] for r in rows)

    lines: list[str] = []
    w = lines.append
    w("# Hyperlink Recovery - Benchmark Report\n")
    w(f"Resumes: **{len(rows)}**  -  hyperlinks recovered: **{total}**\n")
    if total:
        w("## Headline\n")
        w(f"- **Hyperlinks recovered:** {total}")
        w(f"- **Invisible to the text layer (recovered only via link annotations):** "
          f"{hidden_total} = **{100.0 * hidden_total / total:.0f}%**")
        w(f"- **Well-formed (scheme present):** {wf_total} = {100.0 * wf_total / total:.0f}%\n")
        w("> A naive text-only parser would miss the 'invisible' links entirely - it sees "
          "only anchor text such as 'Portfolio' / 'LinkedIn'.\n")
    w("## By type\n")
    w("| type | count |")
    w("|---|---|")
    for t in sorted(types, key=lambda k: -types[k]):
        w(f"| {t} | {types[t]} |")
    w("\n## Per résumé\n")
    w("| résumé | links | hidden from text | well-formed |")
    w("|---|---|---|---|")
    for r in rows:
        w(f"| {r['name'][:40]} | {r['links']} | {r['hidden']} | {r['wellformed']} |")
    w("\n_Recall (links missed entirely) is validated by manual inspection of the source "
      "PDFs; no second annotation parser is used as an oracle._")
    report = "\n".join(lines)
    print("\n" + report)

    with open(os.path.join(_DATA, "link_benchmark_report.md"), "w", encoding="utf-8") as fh:
        fh.write(report + "\n")
    with open(os.path.join(_DATA, "link_details.json"), "w", encoding="utf-8") as fh:
        json.dump(details, fh, ensure_ascii=False, indent=2)
    print(f"\n[report + details written under {_DATA} (gitignored)]")
    return 0


if __name__ == "__main__":
    raise SystemExit(run())
