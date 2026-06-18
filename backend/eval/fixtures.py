"""Hand-authored evaluation fixtures for the anti-fabrication guard.

Each :class:`Case` is a triple ``(original, llm_output, check)`` plus metadata.
The benchmark feeds ``prepare_for_llm(original)`` and ``llm_output`` into
``enforce_no_fabrication`` and calls ``check(guarded, warnings)`` to decide
whether the guard behaved as expected.

Cases are grouped into five **buckets** that drive the metrics, because not all
"correct" behaviours mean the same thing (honesty matters here):

- ``catch``      — a fabrication the guard SHOULD remove (+ warn). Pass = removed.
                   These define *fabrication recall*.
- ``neutralize`` — an immutable-field lie. The guard reverts it **silently** (no
                   warning). Pass = reverted AND no warning. We report these as
                   *neutralized*, never as "caught", because the user gets no signal.
- ``blindspot``  — a fabrication the guard STRUCTURALLY CANNOT catch. Pass = the
                   fabrication is still present. This suite proves the guard's limits.
- ``allowed``    — a legitimate transformation (drop/reorder/number-removal). Pass =
                   it was honoured.
- ``fp``         — a legitimate rephrase that must survive. Pass = preserved;
                   Fail = a FALSE POSITIVE (the guard wrongly dropped a good edit).

The originals deliberately seed numbers and spelled-out quantities so the
number-checking heuristic can be probed precisely.
"""

from __future__ import annotations

import copy
from dataclasses import dataclass
from typing import Any, Callable

from app.transform_guard import prepare_for_llm

# ── buckets ──────────────────────────────────────────────────────────────────
CATCH = "catch"
NEUTRALIZE = "neutralize"
BLINDSPOT = "blindspot"
ALLOWED = "allowed"
FP = "fp"


@dataclass
class Case:
    id: str
    title: str
    bucket: str
    fab_class: str
    original: dict
    llm_output: dict
    check: Callable[[dict, list], bool]
    note: str = ""


# ── probes (read-only helpers used by the per-case checks) ───────────────────
def entry(guarded: dict, section: str, eid: str) -> dict | None:
    for e in guarded.get(section, []) or []:
        if str(e.get("id")) == str(eid):
            return e
    return None


def txt(guarded: dict, section: str, eid: str, needle: str) -> bool:
    e = entry(guarded, section, eid)
    return bool(e) and any(needle in b for b in e.get("bullets", []) or [])


def field(guarded: dict, section: str, eid: str, name: str) -> Any:
    e = entry(guarded, section, eid)
    return e.get(name) if e else None


def items(guarded: dict, eid: str) -> list:
    e = entry(guarded, "skills", eid)
    return list(e.get("items", []) if e else [])


def has_id(guarded: dict, section: str, eid: str) -> bool:
    return any(str(e.get("id")) == str(eid) for e in guarded.get(section, []) or [])


def order(guarded: dict, section: str) -> list:
    return [str(e.get("id")) for e in guarded.get(section, []) or []]


def warned(warnings: list, *subs: str) -> bool:
    return any(all(s.lower() in w.lower() for s in subs) for w in warnings)


# ── llm_output construction ──────────────────────────────────────────────────
def _e(d: dict, section: str, eid: str) -> dict:
    return next(x for x in d[section] if str(x.get("id")) == str(eid))


def set_bullet(section, eid, idx, text):
    def op(out): _e(out, section, eid)["bullets"][idx] = text
    return op


def set_bullets(section, eid, bullets):
    def op(out): _e(out, section, eid)["bullets"] = list(bullets)
    return op


def set_field(section, eid, name, value):
    def op(out): _e(out, section, eid)[name] = value
    return op


def set_summary(text):
    def op(out): out["personal"]["summary"] = text
    return op


def set_items(eid, values):
    def op(out): _e(out, "skills", eid)["items"] = list(values)
    return op


def append_entry(section, entrydict):
    def op(out): out[section].append(copy.deepcopy(entrydict))
    return op


def drop_entry(section, eid):
    def op(out): out[section][:] = [x for x in out[section] if str(x.get("id")) != str(eid)]
    return op


def reorder(section, ids):
    def op(out):
        out[section][:] = [next(x for x in out[section] if str(x.get("id")) == i) for i in ids]
    return op


def duplicate_entry(section, eid):
    def op(out): out[section].append(copy.deepcopy(_e(out, section, eid)))
    return op


def transformed(original: dict, *ops) -> dict:
    """A deep copy of ``prepare_for_llm(original)`` with the given mutations
    applied — i.e. a plausible (or adversarial) LLM response."""
    out = copy.deepcopy(prepare_for_llm(original))
    for op in ops:
        op(out)
    return out


# ── base resume (realistic; seeds numbers + spelled-out quantities) ──────────
SWE: dict = {
    "personal": {
        "name": "Alex Morgan",
        "email": "alex.morgan@example.com",
        "phone": "+1 555 0100",
        "location": "Austin, TX",
        "linkedin": "https://linkedin.com/in/alexmorgan",
        "github": "https://github.com/alexmorgan",
        "website": "",
        "summary": "Backend engineer with 4 years building Python APIs.",
    },
    "education": [
        {
            "id": "edu_1", "institution": "UT Austin", "degree": "B.S. Computer Science",
            "location": "Austin, TX", "gpaFormat": "GPA", "gpaLabel": "3.7",
            "startDate": "Aug 2016", "endDate": "May 2020",
            "highlight": "Graduated with honors.",
        }
    ],
    "skills": [
        {"id": "skill_1", "category": "Languages", "items": ["Python", "Go", "SQL"]},
        {"id": "skill_2", "category": "Tools", "items": ["Docker", "Postgres", "Redis"]},
    ],
    "projects": [
        {
            "id": "proj_1", "name": "InvoiceFlow", "techStack": "Python, FastAPI, Postgres",
            "githubUrl": "https://github.com/alexmorgan/invoiceflow", "liveUrl": "",
            "bullets": [
                "Built a billing service handling 1,200 invoices per day.",
                "Reduced p95 latency by 35% via query optimization.",
            ],
        }
    ],
    "experience": [
        {
            "id": "exp_1", "role": "Software Engineer", "company": "Acme Corp",
            "location": "Austin, TX", "startDate": "Jun 2020", "endDate": "",
            "current": True, "projectSubtitle": "",
            "bullets": [
                "Built REST APIs in Python serving 5 million requests per month.",
                "Mentored two junior engineers.",
                "Cut deployment time from 30 minutes to 8 minutes.",
            ],
        },
        {
            "id": "exp_2", "role": "Engineering Intern", "company": "Beta LLC",
            "location": "Remote", "startDate": "Jun 2019", "endDate": "Aug 2019",
            "current": False, "projectSubtitle": "",
            "bullets": ["Wrote unit tests for the payments module."],
        },
    ],
    "extracurricular": [
        {
            "id": "extra_1", "title": "Volunteer Mentor", "organization": "Code4Good, Austin",
            "startDate": "Jan 2021", "endDate": "Dec 2021",
            "bullets": ["Taught Python to five high-school students."],
        }
    ],
    "achievements": [
        {"id": "ach_1", "text": "Won 1st place at the Acme internal hackathon 2021."}
    ],
    "certifications": [
        {"id": "cert_1", "text": "AWS Certified Developer Associate.",
         "credentialUrl": "https://aws.amazon.com/cred/123"}
    ],
    "publications": [],
}

# Original spelled-out / formatted strings we rephrase in fp cases.
_ORIG_MENTORED = "Mentored two junior engineers."
_ORIG_TAUGHT = "Taught Python to five high-school students."


def mini(bullets: list, role: str = "Software Engineer") -> dict:
    """Minimal one-experience-entry resume for focused number-heuristic cases."""
    return {
        "personal": {"name": "Sam Lee", "email": "sam@example.com", "phone": "",
                     "location": "", "linkedin": "", "github": "", "website": "", "summary": ""},
        "education": [], "skills": [], "projects": [],
        "experience": [{
            "id": "exp_1", "role": role, "company": "Acme", "location": "NYC",
            "startDate": "Jan 2020", "endDate": "", "current": True,
            "projectSubtitle": "", "bullets": list(bullets),
        }],
        "extracurricular": [], "achievements": [], "certifications": [], "publications": [],
    }


def mini_skills(values: list) -> dict:
    base = mini([])
    base["skills"] = [{"id": "skill_1", "category": "Tools", "items": list(values)}]
    return base


# ── the fixture set ──────────────────────────────────────────────────────────
CASES: list[Case] = [

    # ============================ CATCH ======================================
    Case(
        "catch_invented_entry", "Invented experience entry (unknown id)", CATCH,
        "invented entry", SWE,
        transformed(SWE, append_entry("experience", {
            "id": "exp_fake", "role": "Director of Engineering", "company": "FAANG Inc",
            "location": "SF", "startDate": "Jan 2018", "endDate": "Dec 2019",
            "current": False, "projectSubtitle": "", "bullets": ["Led a 50-person org."],
        })),
        lambda g, w: (not has_id(g, "experience", "exp_fake")
                      and has_id(g, "experience", "exp_1") and warned(w, "invented")),
        "LLM appends an entry that was never in the source.",
    ),
    Case(
        "catch_fab_number_bullet", "Fabricated number in a rephrased bullet", CATCH,
        "out-of-source number", SWE,
        transformed(SWE, set_bullet("experience", "exp_2", 0,
                                    "Wrote unit tests reaching 97% coverage.")),
        lambda g, w: (not txt(g, "experience", "exp_2", "97")
                      and warned(w, "bullet")),
        "97% never appears in the source entry.",
    ),
    Case(
        "catch_invented_skill", "Invented skill item", CATCH,
        "ungrounded skill", SWE,
        transformed(SWE, set_items("skill_1", ["Python", "Go", "SQL", "Rust"])),
        lambda g, w: ("Rust" not in items(g, "skill_1") and warned(w, "skill")),
        "Rust is not among the candidate's listed languages.",
    ),
    Case(
        "catch_fab_number_text", "Fabricated number in education highlight (text field)", CATCH,
        "out-of-source number", SWE,
        transformed(SWE, set_field("education", "edu_1", "highlight",
                                   "Graduated 2nd in a cohort of 400.")),
        lambda g, w: (field(g, "education", "edu_1", "highlight") == "Graduated with honors."
                      and warned(w, "highlight")),
        "Numbers 2/400 are absent from the source; text reverts.",
    ),
    Case(
        "catch_fab_number_summary", "Fabricated number in summary", CATCH,
        "out-of-source number", SWE,
        transformed(SWE, set_summary("10x engineer with 50 years of experience.")),
        lambda g, w: (g["personal"]["summary"] == SWE["personal"]["summary"]
                      and warned(w, "summary")),
        "Neither 10 nor 50 appears anywhere in the resume; summary reverts.",
    ),

    # ========================== NEUTRALIZE ===================================
    Case(
        "neut_company", "Tampered company name (immutable)", NEUTRALIZE,
        "immutable field", SWE,
        transformed(SWE, set_field("experience", "exp_1", "company", "Google")),
        lambda g, w: (field(g, "experience", "exp_1", "company") == "Acme Corp" and not w),
        "Company is restored verbatim — but the user gets NO warning.",
    ),
    Case(
        "neut_techstack", "Tampered project tech stack (immutable)", NEUTRALIZE,
        "immutable field", SWE,
        transformed(SWE, set_field("projects", "proj_1", "techStack",
                                   "Python, FastAPI, Postgres, Kubernetes, AWS")),
        lambda g, w: (field(g, "projects", "proj_1", "techStack") == "Python, FastAPI, Postgres"
                      and not w),
        "Invented technologies in techStack are silently reverted.",
    ),
    Case(
        "neut_achievement", "Tampered achievement text (whole-field restore)", NEUTRALIZE,
        "immutable field", SWE,
        transformed(SWE, set_field("achievements", "ach_1", "text",
                                   "Won 1st place at the ACM World Finals 2021.")),
        lambda g, w: (field(g, "achievements", "ach_1", "text")
                      == SWE["achievements"][0]["text"] and not w),
        "Achievements are restored verbatim; only reorder/drop is permitted.",
    ),
    Case(
        "neut_degree", "Tampered degree (immutable)", NEUTRALIZE,
        "immutable field", SWE,
        transformed(SWE, set_field("education", "edu_1", "degree",
                                   "Ph.D. Computer Science")),
        lambda g, w: (field(g, "education", "edu_1", "degree") == "B.S. Computer Science"
                      and not w),
        "Degree inflation is silently reverted.",
    ),

    # =========================== BLINDSPOT ===================================
    Case(
        "blind_qualitative", "Invented qualitative claim (no number)", BLINDSPOT,
        "qualitative inflation", SWE,
        transformed(SWE, set_bullet("experience", "exp_2", 0,
                                    "Owned the end-to-end testing strategy for the entire payments platform.")),
        lambda g, w: txt(g, "experience", "exp_2", "Owned the end-to-end testing strategy"),
        "No new number, so the number-check can't see the inflated scope.",
    ),
    Case(
        "blind_same_entry_collision", "Fabricated metric reusing a same-entry number", BLINDSPOT,
        "number collision", SWE,
        transformed(SWE, set_bullet("experience", "exp_1", 1,
                                    "Led 5 cross-team initiatives.")),
        lambda g, w: txt(g, "experience", "exp_1", "Led 5 cross-team initiatives"),
        "'5' already exists in the entry (5 million requests), so '5 initiatives' passes.",
    ),
    Case(
        "blind_cross_bullet", "Number teleported into a fabricated context", BLINDSPOT,
        "number collision", SWE,
        transformed(SWE, set_bullet("projects", "proj_1", 1,
                                    "Grew the customer base to 35 enterprise accounts.")),
        lambda g, w: txt(g, "projects", "proj_1", "35 enterprise accounts"),
        "'35' was a latency %, now reused as an invented customer count.",
    ),
    Case(
        "blind_summary_wide", "Summary number sourced from elsewhere in the resume", BLINDSPOT,
        "resume-wide summary", SWE,
        transformed(SWE, set_summary("Backend engineer with 8 years scaling APIs to 35 services.")),
        lambda g, w: g["personal"]["summary"] == "Backend engineer with 8 years scaling APIs to 35 services.",
        "8 and 35 exist somewhere in the resume, so the resume-wide check accepts them.",
    ),
    Case(
        "blind_highlight_qualitative", "Education highlight inflation (no number)", BLINDSPOT,
        "qualitative inflation", SWE,
        transformed(SWE, set_field("education", "edu_1", "highlight",
                                   "Graduated at the very top of the cohort with distinction.")),
        lambda g, w: field(g, "education", "edu_1", "highlight")
                     == "Graduated at the very top of the cohort with distinction.",
        "Qualitative highlight inflation with no number is not caught.",
    ),

    # ============================ ALLOWED ====================================
    Case(
        "allow_drop_experience", "Drop a less-relevant experience entry", ALLOWED,
        "intentional drop", SWE,
        transformed(SWE, drop_entry("experience", "exp_2")),
        lambda g, w: (not has_id(g, "experience", "exp_2") and has_id(g, "experience", "exp_1")),
        "Dropping for relevance is allowed (experience drops are warned).",
    ),
    Case(
        "allow_reorder_experience", "Reorder experience entries", ALLOWED,
        "reorder", SWE,
        transformed(SWE, reorder("experience", ["exp_2", "exp_1"])),
        lambda g, w: order(g, "experience") == ["exp_2", "exp_1"],
        "Reordering is honoured verbatim.",
    ),
    Case(
        "allow_reorder_skills", "Reorder skill items", ALLOWED,
        "reorder", SWE,
        transformed(SWE, set_items("skill_1", ["SQL", "Python", "Go"])),
        lambda g, w: items(g, "skill_1") == ["SQL", "Python", "Go"],
        "A subset reorder is preserved.",
    ),
    Case(
        "allow_number_removal", "Vaguen a metric (remove a number)", ALLOWED,
        "number removal", SWE,
        transformed(SWE, set_bullet("projects", "proj_1", 1,
                                    "Dramatically reduced p95 latency via query optimization.")),
        lambda g, w: (txt(g, "projects", "proj_1", "Dramatically reduced")
                      and not txt(g, "projects", "proj_1", "35%")),
        "Dropping a number is allowed (the check is one-directional).",
    ),

    # ============================== FP =======================================
    Case(
        "fp_plain_rephrase_num", "Plain rephrase keeping the same number", FP,
        "plain rephrase", SWE,
        transformed(SWE, set_bullet("experience", "exp_1", 0,
                                    "Engineered Python REST APIs handling 5 million requests monthly.")),
        lambda g, w: txt(g, "experience", "exp_1", "Engineered Python REST APIs"),
        "Same number (5 million) — must survive.",
    ),
    Case(
        "fp_plain_rephrase_nonum", "Plain rephrase with no numbers", FP,
        "plain rephrase", SWE,
        transformed(SWE, set_bullet("experience", "exp_2", 0,
                                    "Authored comprehensive unit tests for the payments module.")),
        lambda g, w: txt(g, "experience", "exp_2", "Authored comprehensive unit tests"),
        "No numbers involved — must survive.",
    ),
    Case(
        "fp_unit_spacing", "Unit spacing change '50 ms' -> '50ms'", FP,
        "format (control)", mini(["Cut response time to 50 ms."]),
        transformed(mini(["Cut response time to 50 ms."]),
                    set_bullet("experience", "exp_1", 0, "Cut response time to 50ms.")),
        lambda g, w: txt(g, "experience", "exp_1", "50ms"),
        "Negative control: symbols/spaces are ignored by the regex — should pass.",
    ),
    Case(
        "fp_comma", "Comma change '1,200' -> '1200'", FP,
        "format (control)", mini(["Processed 1,200 records nightly."]),
        transformed(mini(["Processed 1,200 records nightly."]),
                    set_bullet("experience", "exp_1", 0, "Processed 1200 records nightly.")),
        lambda g, w: txt(g, "experience", "exp_1", "1200 records"),
        "Negative control: commas are stripped — should pass.",
    ),
    Case(
        "fp_spelledout_two", "Spelled-out -> digit: 'two' -> '2'", FP,
        "spelled-out number", SWE,
        transformed(SWE, set_bullet("experience", "exp_1", 1, "Mentored 2 junior engineers.")),
        lambda g, w: txt(g, "experience", "exp_1", "Mentored 2 junior engineers"),
        "Legit normalization the guard wrongly drops PRE-fix; the fix preserves it.",
    ),
    Case(
        "fp_spelledout_five", "Spelled-out -> digit: 'five' -> '5'", FP,
        "spelled-out number", SWE,
        transformed(SWE, set_bullet("extracurricular", "extra_1", 0,
                                    "Taught Python to 5 high-school students.")),
        lambda g, w: txt(g, "extracurricular", "extra_1", "Taught Python to 5"),
        "Second spelled-out case; PRE-fix false positive, fixed by the normalizer.",
    ),
    Case(
        "fp_version_residual", "Version string '2.0' -> 'v2'", FP,
        "version (residual)", mini(["Shipped the 2.0 release of the API."]),
        transformed(mini(["Shipped the 2.0 release of the API."]),
                    set_bullet("experience", "exp_1", 0, "Shipped the v2 release of the API.")),
        lambda g, w: txt(g, "experience", "exp_1", "v2 release"),
        "Documented residual FP: '2' != '2.0'; the word-fix does not address this.",
    ),
    Case(
        "fp_magnitude_residual", "Magnitude suffix '5,000' -> '5k'", FP,
        "magnitude (residual)", mini(["Served 5,000 daily active users."]),
        transformed(mini(["Served 5,000 daily active users."]),
                    set_bullet("experience", "exp_1", 0, "Served 5k daily active users.")),
        lambda g, w: txt(g, "experience", "exp_1", "5k daily"),
        "Documented residual FP: '5' (from 5k) != '5000'.",
    ),
    Case(
        "fp_skill_casing_residual", "Skill variant 'Node.js' -> 'NodeJS'", FP,
        "skill casing (residual)", mini_skills(["Node.js", "Python"]),
        transformed(mini_skills(["Node.js", "Python"]), set_items("skill_1", ["NodeJS", "Python"])),
        lambda g, w: "NodeJS" in items(g, "skill_1"),
        "Documented residual FP: subset match is casefold-only, so 'NodeJS' != 'Node.js'.",
    ),
]
