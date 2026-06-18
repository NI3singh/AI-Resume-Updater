"""Live raw-vs-guarded differential for the transform feature.

Mirrors the production transform route (``app.routers.tools.transform_resume``):
``prepare_for_llm`` -> ``chat_json(TRANSFORM_SYSTEM, ...)`` -> raw LLM output ->
``enforce_no_fabrication``. For each (resume, JD) pair it counts how many
*fabricated claims* the RAW model produced, and how many survive in the GUARDED
output (which should be ~0).

Honesty note: a "fabricated claim" here is defined by the guard's OWN ruleset
(invented entries, out-of-source numbers, ungrounded skills, summary numbers not
present anywhere in the resume). So this measures exactly the classes the guard
targets — it is NOT a claim to catch invented qualitative prose. Always spot-check
a few raw outputs by eye (they are printed) to confirm the flagged items are real.

Requires a configured Nebius key (imports app.llm -> app.config). Reads cases from
``eval/data/cases.json`` (a JSON array of {label?, resume, jd, title?, company?}).

Usage (from backend/):
    python -m eval.run_differential
"""

from __future__ import annotations

import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.config import settings  # noqa: E402
from app.llm import (  # noqa: E402
    LLMError, LLMNotConfigured, _extract_json, chat_json, nebius_client,
)
from app.routers.tools import TRANSFORM_SYSTEM, _SCHEMA  # noqa: E402
from app.transform_guard import (  # noqa: E402
    _LIST_SECTIONS,
    _SECTION_POLICY,
    _entry_numbers,
    _numbers_in,
    _resume_numbers,
    enforce_no_fabrication,
    prepare_for_llm,
)

_DATA = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "cases.json")

# Sampling temperature. 0 = production setting (faithful; stable JSON).
_TEMP = float(os.getenv("EVAL_TEMPERATURE", "0") or 0)

# EVAL_MODE: "production" uses the real anti-fabrication prompt; "naive" uses a
# bare tailoring prompt with NO guardrails - a stress baseline that elicits the
# fabrications the guard exists to remove, while keeping temp 0 for stable JSON.
_MODE = os.getenv("EVAL_MODE", "production").strip().lower()

NAIVE_SYSTEM = (
    "You are a resume tailoring assistant. Rewrite the candidate's resume so it is "
    "as strong a match as possible for the target job description - emphasize "
    "relevant strengths and make the candidate look highly qualified for this role. "
    "Keep each entry's \"id\" field.\n\nThe resume JSON follows this schema:\n\n"
    + _SCHEMA
    + "\n\nReturn ONLY a JSON object of the form {\"data\": <the tailored resume, "
    "same schema, ids preserved>}. No markdown, no commentary."
)

_SYSTEM = NAIVE_SYSTEM if _MODE == "naive" else TRANSFORM_SYSTEM


def _sampled(system: str, user: str, temperature: float):
    """Robust completion for stress runs: try JSON mode, then plain, then uncapped,
    accepting the first response that actually parses (high temp truncates/derails)."""
    client = nebius_client()
    base = [{"role": "system", "content": system}, {"role": "user", "content": user}]
    attempts = [
        {"response_format": {"type": "json_object"}, "max_tokens": 16384},
        {"max_tokens": 16384},
        {},  # no cap - let a verbose reasoning model finish the JSON
    ]
    last: Exception | None = None
    for opts in attempts:
        try:
            resp = client.chat.completions.create(
                model=settings.nebius_model, temperature=temperature, messages=base, **opts)
        except Exception as exc:  # noqa: BLE001
            last = exc
            continue
        content = (resp.choices[0].message.content or "") if resp.choices else ""
        if not content.strip():
            continue
        try:
            return _extract_json(content)
        except LLMError as exc:
            last = exc
            continue
    raise LLMError(f"stress completion did not parse: {last}")


def complete(system: str, user: str, temperature: float):
    """Production path (temp 0) reuses the hardened chat_json; stress uses _sampled."""
    if not temperature:
        return chat_json(system, user)
    return _sampled(system, user, temperature)

# "Fabricated claim" classes (what would reach the user as false content if the
# guard were absent). Immutable-field alterations are tracked separately because
# the guard reverts them silently — they're alterations, not surfaced claims.
_CLAIM_KEYS = ("invented_entries", "out_of_source_numbers", "ungrounded_skills", "summary_numbers")


def _entry_label(d: dict) -> str:
    for k in ("role", "company", "name", "title", "category", "institution", "text"):
        v = d.get(k)
        if isinstance(v, str) and v.strip():
            return v.strip()[:60]
    return str(d.get("id") or "?")


def count_fabrications(original: dict, candidate):
    """Count guard-defined fabrications in ``candidate`` vs ``original`` (which must
    be ``prepare_for_llm`` output). Returns ``(counts, details)``; ``details`` lists
    each flagged item so the findings can be spot-checked by eye."""
    c = {"invented_entries": 0, "out_of_source_numbers": 0,
         "ungrounded_skills": 0, "summary_numbers": 0, "altered_immutable": 0}
    details: list[dict] = []
    if not isinstance(candidate, dict):
        return c, details

    summary = (candidate.get("personal") or {}).get("summary")
    if isinstance(summary, str) and summary.strip():
        extra = _numbers_in(summary) - _resume_numbers(original)
        if extra:
            c["summary_numbers"] += 1
            details.append({"type": "summary_number", "nums": sorted(extra), "snippet": summary[:140]})

    for section in _LIST_SECTIONS:
        policy = _SECTION_POLICY[section]
        by_id = {str(e.get("id")): e for e in original.get(section) or []}
        for raw in candidate.get(section) or []:
            if not isinstance(raw, dict):
                continue
            src = by_id.get(str(raw.get("id") or ""))
            if src is None:
                c["invented_entries"] += 1
                details.append({"type": "invented_entry", "section": section, "label": _entry_label(raw)})
                continue
            ent_nums = _entry_numbers(src)
            for f in policy.get("bullets", []):
                for b in raw.get(f) or []:
                    if isinstance(b, str) and (_numbers_in(b) - ent_nums):
                        c["out_of_source_numbers"] += 1
                        details.append({"type": "out_of_source_number", "section": section,
                                        "field": f, "nums": sorted(_numbers_in(b) - ent_nums),
                                        "snippet": b[:140]})
            for f in policy.get("text", []):
                t = raw.get(f)
                if isinstance(t, str) and t.strip() and (_numbers_in(t) - ent_nums):
                    c["out_of_source_numbers"] += 1
                    details.append({"type": "out_of_source_number", "section": section,
                                    "field": f, "nums": sorted(_numbers_in(t) - ent_nums),
                                    "snippet": t[:140]})
            for f in policy.get("subset", []):
                allowed = {str(i).casefold() for i in (src.get(f) or [])}
                for it in raw.get(f) or []:
                    if isinstance(it, str) and it.strip() and it.casefold() not in allowed:
                        c["ungrounded_skills"] += 1
                        details.append({"type": "ungrounded_skill", "section": section, "item": it[:60]})
            for f in policy.get("immutable", []):
                if f in raw and raw.get(f) != src.get(f):
                    c["altered_immutable"] += 1
                    details.append({"type": "altered_immutable", "section": section, "field": f})
    return c, details


def _claims(counts: dict) -> int:
    return sum(counts[k] for k in _CLAIM_KEYS)


def _load_cases() -> list[dict]:
    if not os.path.exists(_DATA):
        print(f"No cases file at {_DATA}\n"
              "Create it as a JSON array of objects:\n"
              '  [{"label": "swe x backend-role", "resume": <ResumeData>, '
              '"jd": "<job description>", "title": "...", "company": "..."}]')
        raise SystemExit(2)
    with open(_DATA, encoding="utf-8") as fh:
        data = json.load(fh)
    return data if isinstance(data, list) else [data]


def run() -> int:
    cases = _load_cases()
    rows: list[dict] = []
    lines: list[str] = []
    w = lines.append

    for i, case in enumerate(cases):
        label = case.get("label") or f"case_{i + 1}"
        resume = case["resume"]
        jd = (case.get("jd") or "")[: settings.parse_text_limit]
        original = prepare_for_llm(resume)
        user_msg = (
            f"JOB TITLE: {case.get('title') or '(not provided)'}\n"
            f"COMPANY: {case.get('company') or '(not provided)'}\n\n"
            "JOB DESCRIPTION:\n" + jd
            + "\n\nRESUME JSON (each entry has an \"id\" - preserve them exactly):\n"
            + json.dumps(original, ensure_ascii=False)
        )
        print(f"[{i + 1}/{len(cases)}] {label} - calling model (mode={_MODE}, temp={_TEMP}; cold start ~30s)...")
        try:
            result = complete(_SYSTEM, user_msg, _TEMP)
        except LLMError as exc:
            print(f"    LLM error: {exc}")
            rows.append({"label": label, "error": str(exc)})
            continue

        raw_data = result.get("data") if isinstance(result, dict) else None
        raw_counts, raw_details = count_fabrications(original, raw_data)
        guarded, warnings, changes = enforce_no_fabrication(original, raw_data)
        guarded_counts, _ = count_fabrications(original, guarded)

        rows.append({
            "label": label,
            "raw_claims": _claims(raw_counts),
            "guarded_claims": _claims(guarded_counts),
            "raw": raw_counts,
            "guarded": guarded_counts,
            "warnings": len(warnings),
            "details": raw_details,
        })
        print(f"    raw fabricated claims: {_claims(raw_counts)}  ->  guarded: {_claims(guarded_counts)}"
              f"  (altered immutable fields, reverted: {raw_counts['altered_immutable']})")
        # Compact list of flagged fabrications for manual spot-check.
        for d in raw_details:
            tag = d.get("item") or d.get("label") or d.get("snippet") or d.get("field") or ""
            print(f"      - {d['type']}: {str(tag)[:90]}")

    ok = [r for r in rows if "error" not in r]
    n = len(ok)
    raw_total = sum(r["raw_claims"] for r in ok)
    guarded_total = sum(r["guarded_claims"] for r in ok)
    altered_total = sum(r["raw"]["altered_immutable"] for r in ok)

    details_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", f"details_{_MODE}.json")
    with open(details_path, "w", encoding="utf-8") as fh:
        json.dump([{"label": r["label"], "details": r.get("details", [])} for r in ok],
                  fh, ensure_ascii=False, indent=2)

    w("# Transform Guard - Live Raw-vs-Guarded Differential\n")
    w(f"Transforms run: **{n}**  (errors: {len(rows) - n})\n")
    prompt_kind = "naive (no guardrails)" if _MODE == "naive" else "production anti-fabrication"
    w(f"Model: `{settings.nebius_model}`  -  prompt: **{prompt_kind}**  -  temperature: **{_TEMP}**\n")
    if n:
        w("## Headline\n")
        w(f"- **Raw fabricated claims:** {raw_total} over {n} transforms "
          f"= **{raw_total / n:.2f} per transform**")
        w(f"- **Guarded fabricated claims:** {guarded_total} over {n} transforms "
          f"= **{guarded_total / n:.2f} per transform**")
        if raw_total:
            w(f"- **Reduction:** {100.0 * (raw_total - guarded_total) / raw_total:.0f}%")
        w(f"- **Immutable fields silently reverted by the guard:** {altered_total}\n")
        w("> 'Fabricated claim' = invented entry + out-of-source number + ungrounded "
          "skill + summary number absent from the resume (the guard's own ruleset).\n")
        w("## Fabrication types (raw, aggregate)\n")
        w("| type | count |")
        w("|---|---|")
        for k in ("invented_entries", "out_of_source_numbers", "ungrounded_skills", "summary_numbers"):
            w(f"| {k} | {sum(r['raw'][k] for r in ok)} |")
        w(f"| altered_immutable (reverted) | {altered_total} |")
        w("")
    w("## Per-transform\n")
    w("| case | raw claims | guarded claims | reverted immutable |")
    w("|---|---|---|---|")
    for r in rows:
        if "error" in r:
            w(f"| {r['label']} | (LLM error) | - | - |")
        else:
            w(f"| {r['label']} | {r['raw_claims']} | {r['guarded_claims']} | {r['raw']['altered_immutable']} |")
    w("")

    report = "\n".join(lines)
    print("\n" + report)
    report_path = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                               f"differential_report_{_MODE}.md")
    with open(report_path, "w", encoding="utf-8") as fh:
        fh.write(report + "\n")
    print(f"[written to {report_path}]")
    print(f"[fabrication details written to {details_path}]")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(run())
    except LLMNotConfigured as exc:
        print(f"Nebius is not configured: {exc}\n"
              "Set NEBIUS_API_KEY (and NEBIUS_BASE_URL / NEBIUS_MODEL) in backend/.env.")
        raise SystemExit(3)
