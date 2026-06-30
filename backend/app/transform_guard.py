"""Deterministic anti-fabrication guard for the Transform (JD-tailoring) feature.

The LLM is asked to tailor a resume to a job description by rephrasing,
reordering, and dropping content — never inventing facts. Prompts alone can't
guarantee that, so this module enforces it in code after the LLM responds:

- Entries are matched by ``id``. An entry the LLM "created" (unknown id) is
  deleted. Fact-bearing fields (companies, roles, dates, degrees, URLs, ...)
  are restored verbatim from the original, overwriting whatever the LLM wrote.
- Rephrased text (bullets, highlight, summary) is number-checked: a rewrite
  that introduces a numeric token absent from the source is discarded.
- Skill items must be a subset of the original entry's items.

Pure functions, no FastAPI imports — unit-testable in isolation.
"""

import re
from typing import Any

# Builtin list-section keys (personal is handled separately; custom sections
# never reach the LLM — the client strips and re-attaches them).
_LIST_SECTIONS = [
    "education", "skills", "projects", "experience",
    "extracurricular", "achievements", "certifications", "publications",
]

# personal.* fields restored verbatim (summary is the only tailorable one).
_PERSONAL_IMMUTABLE = ["name", "email", "phone", "location", "linkedin", "github", "website"]

# Per-section field policy. Anything not listed as tailorable is restored from
# the original entry, so new/unknown keys the LLM adds are dropped too.
#   immutable  — copied verbatim from the original entry
#   bullets    — list[str] field that may be rephrased/reordered/dropped (number-checked)
#   text       — str field that may be rephrased (number-checked)
#   subset     — list[str] field whose items must come from the original entry's items
_SECTION_POLICY: dict[str, dict[str, list[str]]] = {
    "education": {
        "immutable": ["institution", "degree", "location", "gpaFormat", "gpaLabel", "startDate", "endDate"],
        "text": ["highlight"],
    },
    "skills": {
        "immutable": ["category"],
        "subset": ["items"],
    },
    "projects": {
        "immutable": ["name", "techStack", "githubUrl", "liveUrl"],
        "bullets": ["bullets"],
    },
    "experience": {
        "immutable": ["role", "company", "location", "startDate", "endDate", "current", "projectSubtitle"],
        "bullets": ["bullets"],
    },
    "extracurricular": {
        "immutable": ["title", "organization", "startDate", "endDate"],
        "bullets": ["bullets"],
    },
    # Ranks/metrics live in these texts; rephrasing risks distortion, so only
    # reorder/inclusion is allowed — every field is restored verbatim.
    "achievements": {"immutable": ["text"]},
    "certifications": {"immutable": ["text", "credentialUrl"]},
    "publications": {"immutable": ["title", "authors", "abstractText", "paperUrl", "paperLinkLabel"]},
}

# Human-readable labels for warnings/changes, per section.
_LABEL_FIELDS = {
    "education": "institution",
    "skills": "category",
    "projects": "name",
    "experience": "company",
    "extracurricular": "title",
    "achievements": "text",
    "certifications": "text",
    "publications": "title",
}

_MAX_KEYWORDS = 20
_MAX_CHANGES = 12


def prepare_for_llm(data: dict[str, Any]) -> dict[str, Any]:
    """Copy of the resume restricted to builtin sections, every entry id'd.

    Custom sections are stripped (the client preserves them), and entries
    missing an ``id`` get a deterministic synthetic one so the guard can match
    the LLM's output back to its source entry.
    """
    personal = data.get("personal")
    out: dict[str, Any] = {"personal": dict(personal) if isinstance(personal, dict) else {}}
    for section in _LIST_SECTIONS:
        entries = data.get(section)
        cleaned: list[dict[str, Any]] = []
        if isinstance(entries, list):
            for i, entry in enumerate(entries):
                if not isinstance(entry, dict):
                    continue
                e = dict(entry)
                if not str(e.get("id") or "").strip():
                    e["id"] = f"{section}_{i}"
                cleaned.append(e)
        out[section] = cleaned
    return out


def _entry_label(section: str, entry: dict[str, Any]) -> str:
    label = str(entry.get(_LABEL_FIELDS.get(section, "")) or "").strip()
    if len(label) > 60:
        label = label[:57] + "..."
    return label or f"a {section} item"


_NUM_RE = re.compile(r"\d[\d,.]*")


def _numbers_in(text: str) -> set[str]:
    """Normalized numeric tokens in a text ('1,200.' -> '1200')."""
    return {m.replace(",", "").rstrip(".") for m in _NUM_RE.findall(text or "")}


def _entry_numbers(entry: dict[str, Any]) -> set[str]:
    """All numeric tokens appearing anywhere in an original entry."""
    nums: set[str] = set()
    for value in entry.values():
        if isinstance(value, str):
            nums |= _numbers_in(value)
        elif isinstance(value, list):
            for item in value:
                if isinstance(item, str):
                    nums |= _numbers_in(item)
    return nums


def _resume_numbers(data: dict[str, Any]) -> set[str]:
    """All numeric tokens anywhere in the original resume (for the summary check)."""
    nums: set[str] = set()
    personal = data.get("personal")
    if isinstance(personal, dict):
        for v in personal.values():
            if isinstance(v, str):
                nums |= _numbers_in(v)
    for section in _LIST_SECTIONS:
        for entry in data.get(section) or []:
            if isinstance(entry, dict):
                nums |= _entry_numbers(entry)
    return nums


def _str_list(value: Any) -> list[str]:
    if not isinstance(value, list):
        return []
    return [str(v).strip() for v in value if isinstance(v, (str, int, float)) and str(v).strip()]


def _guard_bullets(
    original: list[str], proposed: Any, allowed_nums: set[str], label: str, warnings: list[str],
) -> list[str]:
    """Keep rephrased bullets whose numbers all exist in the source entry."""
    kept: list[str] = []
    dropped = 0
    for bullet in _str_list(proposed):
        if _numbers_in(bullet) - allowed_nums:
            dropped += 1
            continue
        kept.append(bullet)
    if dropped:
        warnings.append(
            f"Removed {dropped} rewritten bullet{'s' if dropped > 1 else ''} in {label} — "
            "they added numbers not present in your resume."
        )
    if not kept and original:
        # Don't let the guard (or an over-eager model) empty an entry out.
        return list(original)
    return kept


def _sources_numbers(sources: list[str] | None) -> set[str]:
    """Numeric tokens found in user-provided grounding sources (e.g. a README)."""
    nums: set[str] = set()
    for s in sources or []:
        if isinstance(s, str):
            nums |= _numbers_in(s)
    return nums


def guard_unit(
    kind: str,
    original_entry: dict[str, Any] | None,
    proposed: Any,
    *,
    sources: list[str] | None = None,
) -> tuple[dict[str, Any], list[str]]:
    """Guard a single tailored unit for the interactive section-by-section flow.

    Scoped sibling of :func:`enforce_no_fabrication`: it validates ONE unit and
    lets numbers come from the original entry **or** from ``sources`` (e.g. a
    project README the user pasted), so grounded rewrites pass while invented
    numbers are stripped.

    - ``kind`` is ``"summary"`` or a list-section key (``"experience"``,
      ``"projects"``, ``"extracurricular"``, ``"education"``, ``"skills"``).
    - ``original_entry`` is the matching source unit; for the summary pass
      ``{"summary": <old text>}``.
    - ``proposed`` is the model's object for just this unit.

    Returns ``(guarded_fields, warnings)`` containing ONLY the tailorable
    fields. Immutable facts are never produced here — the caller keeps them from
    the original, so they can't be corrupted.
    """
    warnings: list[str] = []
    src = original_entry if isinstance(original_entry, dict) else {}
    raw = proposed if isinstance(proposed, dict) else {}
    allowed = _entry_numbers(src) | _sources_numbers(sources)
    label = str(src.get(_LABEL_FIELDS.get(kind, "")) or "").strip() or f"this {kind} item"
    out: dict[str, Any] = {}

    if kind == "summary":
        old = str(src.get("summary") or "")
        text = raw.get("summary")
        text = text.strip() if isinstance(text, str) else ""
        if text and _numbers_in(text) - allowed:
            warnings.append(
                "Kept your original summary — the rewrite added numbers not in your resume or notes."
            )
            text = old
        out["summary"] = text or old
        return out, warnings

    policy = _SECTION_POLICY.get(kind, {})
    for field in policy.get("bullets", []):
        out[field] = _guard_bullets(
            _str_list(src.get(field)), raw.get(field), allowed, label, warnings,
        )
    for field in policy.get("text", []):
        old = str(src.get(field) or "")
        text = raw.get(field)
        text = text.strip() if isinstance(text, str) else ""
        if text and _numbers_in(text) - allowed:
            warnings.append(
                f"Kept the original {field} of {label} — the rewrite added numbers "
                "not in your resume or notes."
            )
            text = old
        out[field] = text or old
    for field in policy.get("subset", []):
        orig_items = _str_list(src.get(field))
        allowed_items = {i.casefold(): i for i in orig_items}
        kept_items: list[str] = []
        for item in _str_list(raw.get(field)):
            match = allowed_items.get(item.casefold())
            if match is not None and match not in kept_items:
                kept_items.append(match)
        out[field] = kept_items if kept_items else orig_items
    return out, warnings


def resolve_bullet_ops(raw: Any, current: list[str]) -> list[str]:
    """Resolve a refine model's edit ops into the final ordered bullet list.

    Each op is one of:
      ``{"op": "keep",  "index": N}``               -> ``current[N]`` VERBATIM
      ``{"op": "edit",  "index": N, "text": "…"}``  -> the new text (or current[N] if blank)
      ``{"op": "add",   "text": "…"}``              -> the new text
    A ``keep`` resolves to the original bullet so untouched bullets cannot drift
    (this is what makes "change only bullet 2" surgical). Plain strings are also
    accepted (treated as final bullets) so a model that ignores the op format
    still yields a usable result. Used by both the GitHub project crafter and the
    interactive Transform refine.
    """
    if not isinstance(raw, list):
        return []
    out: list[str] = []
    for item in raw:
        if isinstance(item, str):
            text = item.strip()
            if text:
                out.append(text)
            continue
        if not isinstance(item, dict):
            continue
        op = str(item.get("op") or "").strip().lower()
        idx = item.get("index")
        idx = idx if isinstance(idx, int) else None
        text = str(item.get("text") or "").strip()
        if op == "keep":
            if idx is not None and 0 <= idx < len(current):
                out.append(current[idx])
        elif op in ("edit", "replace", "rewrite", "update"):
            if text:
                out.append(text)
            elif idx is not None and 0 <= idx < len(current):
                out.append(current[idx])
        elif op in ("add", "new", "insert", "append"):
            if text:
                out.append(text)
        elif text:  # unknown/absent op but carries text — keep it
            out.append(text)
    return out


def enforce_no_fabrication(
    original: dict[str, Any], transformed: Any,
) -> tuple[dict[str, Any], list[str], list[str]]:
    """Rebuild the transformed resume so it cannot contain invented facts.

    Returns ``(guarded_data, warnings, changes)``. ``original`` must be the
    output of :func:`prepare_for_llm` (ids guaranteed).
    """
    warnings: list[str] = []
    changes: list[str] = []
    if not isinstance(transformed, dict):
        return original, ["The AI response was unusable — your resume was left unchanged."], []

    guarded: dict[str, Any] = {}

    # ── personal: contact facts restored, summary number-checked ───────────
    orig_personal: dict[str, Any] = original.get("personal") or {}
    out_personal = dict(orig_personal)
    t_personal = transformed.get("personal")
    if isinstance(t_personal, dict):
        new_summary = t_personal.get("summary")
        if isinstance(new_summary, str) and new_summary.strip():
            if _numbers_in(new_summary) - _resume_numbers(original):
                warnings.append(
                    "Kept your original summary — the rewritten one added numbers "
                    "not present in your resume."
                )
            elif new_summary.strip() != str(orig_personal.get("summary") or "").strip():
                out_personal["summary"] = new_summary.strip()
                changes.append("Rewrote the professional summary for this role.")
    guarded["personal"] = out_personal

    # ── list sections: match by id, restore facts, check rewrites ──────────
    for section in _LIST_SECTIONS:
        policy = _SECTION_POLICY[section]
        orig_entries: list[dict[str, Any]] = original.get(section) or []
        by_id = {str(e.get("id")): e for e in orig_entries}

        proposed = transformed.get(section)
        if not isinstance(proposed, list):
            if orig_entries:
                warnings.append(f"The AI returned no usable '{section}' section — yours was kept as-is.")
            guarded[section] = orig_entries
            continue

        out_entries: list[dict[str, Any]] = []
        seen_ids: set[str] = set()
        invented = 0
        for raw in proposed:
            if not isinstance(raw, dict):
                continue
            entry_id = str(raw.get("id") or "")
            src = by_id.get(entry_id)
            if src is None:
                invented += 1
                continue
            if entry_id in seen_ids:
                continue
            seen_ids.add(entry_id)

            entry: dict[str, Any] = {"id": entry_id}
            for field in policy.get("immutable", []):
                entry[field] = src.get(field)
            label = _entry_label(section, src)
            entry_nums = _entry_numbers(src)
            for field in policy.get("bullets", []):
                entry[field] = _guard_bullets(
                    _str_list(src.get(field)), raw.get(field), entry_nums, label, warnings,
                )
            for field in policy.get("text", []):
                text = raw.get(field)
                text = text.strip() if isinstance(text, str) else ""
                if text and _numbers_in(text) - entry_nums:
                    warnings.append(
                        f"Kept the original {field} of {label} — the rewrite added "
                        "numbers not present in your resume."
                    )
                    text = str(src.get(field) or "")
                entry[field] = text if text else str(src.get(field) or "")
            for field in policy.get("subset", []):
                orig_items = _str_list(src.get(field))
                allowed = {i.casefold(): i for i in orig_items}
                kept_items: list[str] = []
                novel = 0
                for item in _str_list(raw.get(field)):
                    match = allowed.get(item.casefold())
                    if match is None:
                        novel += 1
                    elif match not in kept_items:
                        kept_items.append(match)
                if novel:
                    warnings.append(
                        f"Removed {novel} skill{'s' if novel > 1 else ''} the AI added "
                        f"under '{label}' that aren't on your resume."
                    )
                entry[field] = kept_items if kept_items else orig_items
            # Fill any policy-unlisted original fields back in (future-proof).
            for field, value in src.items():
                entry.setdefault(field, value)
            out_entries.append(entry)

        if invented:
            warnings.append(
                f"Removed {invented} {section} item{'s' if invented > 1 else ''} "
                "the AI invented (not in your resume)."
            )

        # Entries the LLM omitted = intentional tailoring drops — except
        # education, which is always restored.
        dropped = [e for e in orig_entries if str(e.get("id")) not in seen_ids]
        if section == "education":
            out_entries.extend(dropped)
        else:
            for e in dropped:
                line = f"Removed: {_entry_label(section, e)} ({section})"
                changes.append(line)
                if section == "experience":
                    warnings.append(
                        f"Dropped the experience entry '{_entry_label(section, e)}' as "
                        "less relevant — review before saving."
                    )

        guarded[section] = out_entries

    return guarded, warnings, changes


def merge_llm_report(
    guarded: dict[str, Any],
    llm_result: dict[str, Any],
    computed_changes: list[str],
) -> tuple[list[str], list[str], list[str]]:
    """Combine computed change lines with the LLM's self-report, and keep only
    covered keywords that actually appear in the guarded resume text.

    Returns ``(changes, covered_keywords, missing_keywords)``.
    """
    changes = list(computed_changes)
    raw_changes = llm_result.get("changes")
    if isinstance(raw_changes, list):
        for c in raw_changes:
            if isinstance(c, str) and c.strip() and len(changes) < _MAX_CHANGES:
                changes.append(c.strip())

    match = llm_result.get("match") if isinstance(llm_result.get("match"), dict) else {}
    haystack = _serialize(guarded).casefold()
    covered = [
        k for k in _str_list(match.get("covered_keywords"))
        if k.casefold() in haystack
    ][:_MAX_KEYWORDS]
    missing = _str_list(match.get("missing_keywords"))[:_MAX_KEYWORDS]
    return changes[:_MAX_CHANGES], covered, missing


def _serialize(data: dict[str, Any]) -> str:
    """All human-readable text of a resume, for keyword presence checks."""
    parts: list[str] = []
    personal = data.get("personal")
    if isinstance(personal, dict):
        parts.extend(str(v) for v in personal.values() if isinstance(v, str))
    for section in _LIST_SECTIONS:
        for entry in data.get(section) or []:
            if not isinstance(entry, dict):
                continue
            for value in entry.values():
                if isinstance(value, str):
                    parts.append(value)
                elif isinstance(value, list):
                    parts.extend(str(v) for v in value if isinstance(v, str))
    return "\n".join(parts)
