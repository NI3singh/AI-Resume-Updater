"""Unit + characterization tests for the anti-fabrication transform guard.

Three layers:
1. Unit tests for the pure helpers and ``enforce_no_fabrication`` behaviours.
2. Parametrized guard-strength tests driven by the benchmark fixtures
   (catch / neutralize / allowed) — these must always pass.
3. ``xfail(strict=True)`` tests that DOCUMENT the guard's known limitations
   (structural blind spots + residual false-positive classes). They fail today
   on purpose; if the guard ever improves, strict-xfail turns the surprise pass
   into a loud failure so the docs/benchmark get updated.
"""

from __future__ import annotations

import copy

import pytest

from app.transform_guard import (
    _entry_numbers,
    _numbers_in,
    _resume_numbers,
    enforce_no_fabrication,
    merge_llm_report,
    prepare_for_llm,
)
from eval.fixtures import ALLOWED, BLINDSPOT, CASES, CATCH, FP, NEUTRALIZE


# ── helpers ──────────────────────────────────────────────────────────────────
def _exp(bullets, eid="exp_1", **over):
    e = {"id": eid, "role": "Engineer", "company": "Acme", "location": "NYC",
         "startDate": "Jan 2020", "endDate": "", "current": True,
         "projectSubtitle": "", "bullets": list(bullets)}
    e.update(over)
    return e


def _resume(**sections):
    base = {"personal": {}, "education": [], "skills": [], "projects": [],
            "experience": [], "extracurricular": [], "achievements": [],
            "certifications": [], "publications": []}
    base.update(sections)
    return prepare_for_llm(base)


# ── _numbers_in (incl. the spelled-out fix) ──────────────────────────────────
def test_numbers_in_digits_commas_dots():
    assert _numbers_in("served 1,200. users; cut 35% in 8ms") == {"1200", "35", "8"}


def test_numbers_in_spelled_out_cardinals():
    assert "5" in _numbers_in("Mentored five engineers")
    assert _numbers_in("TWENTY winners") == {"20"}  # case-insensitive


def test_numbers_in_compounds_are_not_combined():
    # "twenty five" -> {20, 5}, deliberately NOT 25 (no composite widening).
    assert _numbers_in("twenty five people") == {"20", "5"}


def test_numbers_in_excludes_one_and_articles():
    # "one"/"a"/"an" are intentionally excluded so a fabricated "1" can't hide.
    assert _numbers_in("one team") == set()
    assert _numbers_in("a dozen tasks") == set()


def test_numbers_in_no_substring_false_match():
    # 'one' lives inside 'everyone' but word boundaries prevent a match (and it's
    # excluded anyway); 'four' must not be found inside 'fourteen' as 4.
    assert _numbers_in("everyone benefited") == set()
    assert _numbers_in("fourteen days") == {"14"}


def test_entry_numbers_pools_every_field():
    nums = _entry_numbers(_exp(["Led five teams", "Cut latency 35%"]))
    assert {"2020", "5", "35"} <= nums  # 2020 from startDate, 5 from "five"


def test_resume_numbers_is_union_across_sections():
    data = {"personal": {"summary": "4 years"}, "experience": [_exp(["five wins"])]}
    assert {"4", "5"} <= _resume_numbers(data)


# ── prepare_for_llm ──────────────────────────────────────────────────────────
def test_prepare_assigns_ids_and_strips_custom():
    out = prepare_for_llm({"personal": {"name": "A"},
                           "experience": [{"company": "X"}],
                           "custom": [{"id": "c1"}]})
    assert out["experience"][0]["id"] == "experience_0"
    assert "custom" not in out
    assert out["personal"]["name"] == "A"


def test_prepare_keeps_existing_ids():
    out = prepare_for_llm({"personal": {}, "experience": [{"id": "exp_1", "company": "X"}]})
    assert out["experience"][0]["id"] == "exp_1"


# ── enforce_no_fabrication: core behaviours ──────────────────────────────────
def test_removes_invented_entry():
    original = _resume(experience=[_exp(["Did X"])])
    t = copy.deepcopy(original)
    t["experience"].append(_exp(["Ran the company"], eid="exp_fake", role="CEO"))
    guarded, warnings, _ = enforce_no_fabrication(original, t)
    assert [e["id"] for e in guarded["experience"]] == ["exp_1"]
    assert any("invent" in w.lower() for w in warnings)


def test_restores_immutable_and_drops_invented_keys():
    original = _resume(experience=[_exp(["Built X"])])
    t = copy.deepcopy(original)
    t["experience"][0]["company"] = "Google"   # tampered immutable field
    t["experience"][0]["salary"] = "$200k"      # invented key
    guarded, warnings, _ = enforce_no_fabrication(original, t)
    e = guarded["experience"][0]
    assert e["company"] == "Acme"      # restored verbatim
    assert "salary" not in e           # invented key dropped
    assert warnings == []              # immutable revert is SILENT (no warning)


def test_blocks_fabricated_bullet_number_and_warns():
    original = _resume(experience=[_exp(["Improved reliability"])])
    t = copy.deepcopy(original)
    t["experience"][0]["bullets"] = ["Improved reliability by 99%"]
    guarded, warnings, _ = enforce_no_fabrication(original, t)
    assert not any("99" in b for b in guarded["experience"][0]["bullets"])
    assert any("number" in w.lower() for w in warnings)


def test_preserves_legit_rephrase_same_number():
    original = _resume(experience=[_exp(["Served 5 million requests per month"])])
    t = copy.deepcopy(original)
    t["experience"][0]["bullets"] = ["Handled 5 million requests monthly"]
    guarded, _, _ = enforce_no_fabrication(original, t)
    assert guarded["experience"][0]["bullets"] == ["Handled 5 million requests monthly"]


def test_skill_items_must_be_subset():
    original = _resume(skills=[{"id": "s1", "category": "Lang", "items": ["Python", "Go"]}])
    t = copy.deepcopy(original)
    t["skills"][0]["items"] = ["Python", "Rust"]
    guarded, warnings, _ = enforce_no_fabrication(original, t)
    assert guarded["skills"][0]["items"] == ["Python"]
    assert any("skill" in w.lower() for w in warnings)


def test_education_is_always_restored_even_if_dropped():
    original = _resume(education=[{"id": "edu_1", "institution": "UT", "degree": "BS",
                                   "location": "", "gpaFormat": "", "gpaLabel": "",
                                   "startDate": "", "endDate": "", "highlight": ""}])
    t = copy.deepcopy(original)
    t["education"] = []   # LLM tried to drop it
    guarded, _, _ = enforce_no_fabrication(original, t)
    assert [e["id"] for e in guarded["education"]] == ["edu_1"]


def test_dedupes_repeated_id():
    original = _resume(experience=[_exp(["X"])])
    t = copy.deepcopy(original)
    t["experience"].append(copy.deepcopy(t["experience"][0]))
    guarded, _, _ = enforce_no_fabrication(original, t)
    assert [e["id"] for e in guarded["experience"]] == ["exp_1"]


def test_experience_drop_warns_and_records_change():
    original = _resume(experience=[_exp(["X"], eid="exp_1"),
                                   _exp(["Y"], eid="exp_2", company="Beta")])
    t = copy.deepcopy(original)
    t["experience"] = [t["experience"][0]]   # drop exp_2 (Beta)
    guarded, warnings, changes = enforce_no_fabrication(original, t)
    assert [e["id"] for e in guarded["experience"]] == ["exp_1"]
    assert any("Beta" in w for w in warnings)
    assert any("Removed" in c for c in changes)


def test_keeps_section_when_llm_returns_garbage():
    original = _resume(skills=[{"id": "s1", "category": "L", "items": ["Python"]}])
    t = copy.deepcopy(original)
    t["skills"] = "not a list"
    guarded, warnings, _ = enforce_no_fabrication(original, t)
    assert guarded["skills"] == original["skills"]
    assert any("skills" in w.lower() for w in warnings)


def test_summary_blocks_ungrounded_number():
    original = _resume(personal={"summary": "Engineer."})
    t = copy.deepcopy(original)
    t["personal"]["summary"] = "Engineer with 20 years."
    guarded, warnings, _ = enforce_no_fabrication(original, t)
    assert guarded["personal"]["summary"] == "Engineer."
    assert any("summary" in w.lower() for w in warnings)


def test_summary_accepts_grounded_rephrase():
    original = _resume(personal={"summary": "Engineer with 5 years."})
    t = copy.deepcopy(original)
    t["personal"]["summary"] = "Seasoned engineer, 5 years in backend."
    guarded, _, changes = enforce_no_fabrication(original, t)
    assert guarded["personal"]["summary"] == "Seasoned engineer, 5 years in backend."
    assert changes  # a change line was recorded


def test_no_summary_is_a_noop():
    original = _resume(personal={"name": "A"})
    guarded, warnings, changes = enforce_no_fabrication(original, copy.deepcopy(original))
    assert guarded["personal"] == {"name": "A"}
    assert warnings == [] and changes == []


def test_unusable_transformed_returns_original():
    original = _resume(experience=[_exp(["X"])])
    guarded, warnings, changes = enforce_no_fabrication(original, "garbage")
    assert guarded == original
    assert warnings and "unusable" in warnings[0].lower()
    assert changes == []


# ── merge_llm_report ─────────────────────────────────────────────────────────
def test_merge_filters_covered_keywords_to_present_only():
    guarded = {"personal": {"summary": "Python and Django"},
               "experience": [{"id": "e", "bullets": ["Built APIs with FastAPI"]}]}
    llm = {"changes": ["Reordered bullets"],
           "match": {"covered_keywords": ["Python", "FastAPI", "Kubernetes"],
                     "missing_keywords": ["AWS"]}}
    changes, covered, missing = merge_llm_report(guarded, llm, ["Tailored summary"])
    assert set(covered) == {"Python", "FastAPI"}   # Kubernetes filtered (absent)
    assert missing == ["AWS"]
    assert "Tailored summary" in changes and "Reordered bullets" in changes


def test_merge_caps_and_tolerates_bad_shapes():
    many = [f"kw{i}" for i in range(40)]
    changes, covered, missing = merge_llm_report(
        {"personal": {}}, {"changes": "not-a-list", "match": "not-a-dict"}, [])
    assert covered == [] and missing == []        # bad shapes tolerated
    _, _, missing2 = merge_llm_report({"personal": {}}, {"match": {"missing_keywords": many}}, [])
    assert len(missing2) <= 20                     # capped


# ── robustness against malformed input ──────────────────────────────────────
def test_skips_non_dict_entries():
    original = prepare_for_llm({"personal": {}, "experience": [_exp(["X"]), "junk", 123]})
    assert [e["id"] for e in original["experience"]] == ["exp_1"]   # non-dicts ignored
    t = copy.deepcopy(original)
    t["experience"].append("garbage")                              # non-dict in LLM output
    guarded, _, _ = enforce_no_fabrication(original, t)
    assert [e["id"] for e in guarded["experience"]] == ["exp_1"]


def test_long_label_is_truncated_in_change_log():
    long_name = "P" * 80
    original = _resume(projects=[{"id": "proj_1", "name": long_name, "techStack": "",
                                  "githubUrl": "", "liveUrl": "", "bullets": ["did a thing"]}])
    t = copy.deepcopy(original)
    t["projects"] = []   # dropping a non-education entry logs a (truncated) label
    _, _, changes = enforce_no_fabrication(original, t)
    assert any("..." in c for c in changes)


def test_merge_serialize_tolerates_non_dict_entries():
    guarded = {"personal": {"summary": "Python"},
               "experience": ["oops", {"id": "e", "bullets": ["FastAPI work"]}]}
    _, covered, _ = merge_llm_report(guarded, {"match": {"covered_keywords": ["Python", "FastAPI"]}}, [])
    assert set(covered) == {"Python", "FastAPI"}


# ── benchmark-fixture-driven guard-strength (must always pass) ───────────────
_GATING = [c for c in CASES if c.bucket in (CATCH, NEUTRALIZE, ALLOWED)]


@pytest.mark.parametrize("case", _GATING, ids=[c.id for c in _GATING])
def test_guard_strength(case):
    guarded, warnings, _ = enforce_no_fabrication(prepare_for_llm(case.original), case.llm_output)
    assert case.check(guarded, warnings), case.note


_FP_OK = [c for c in CASES if c.bucket == FP and "residual" not in c.fab_class]


@pytest.mark.parametrize("case", _FP_OK, ids=[c.id for c in _FP_OK])
def test_no_false_positive_on_legit_rephrase(case):
    guarded, warnings, _ = enforce_no_fabrication(prepare_for_llm(case.original), case.llm_output)
    assert case.check(guarded, warnings), case.note


# ── documented limitations (xfail strict: fail loudly if they ever change) ───
_FP_RESIDUAL = [c for c in CASES if c.bucket == FP and "residual" in c.fab_class]


@pytest.mark.parametrize("case", _FP_RESIDUAL, ids=[c.id for c in _FP_RESIDUAL])
@pytest.mark.xfail(strict=True, reason="documented residual false-positive class")
def test_residual_false_positive(case):
    guarded, warnings, _ = enforce_no_fabrication(prepare_for_llm(case.original), case.llm_output)
    assert case.check(guarded, warnings)   # check==False today -> xfail


_BLIND = [c for c in CASES if c.bucket == BLINDSPOT]


@pytest.mark.parametrize("case", _BLIND, ids=[c.id for c in _BLIND])
@pytest.mark.xfail(strict=True, reason="structural blind spot the guard cannot catch")
def test_blind_spot_is_caught(case):
    guarded, warnings, _ = enforce_no_fabrication(prepare_for_llm(case.original), case.llm_output)
    # Ideal world: the fabrication is gone. Today it survives (check()==True), so
    # asserting it's gone fails -> xfail. If the guard improves, this xpasses ->
    # strict turns that into a failure, prompting a docs/benchmark update.
    assert not case.check(guarded, warnings)
