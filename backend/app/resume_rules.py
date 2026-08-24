"""Curation rules for the Transform pipeline — the single source of truth.

These numbers encode what a good, ATS-friendly résumé looks like for this app:
a 1–2 page document that surfaces only the JD-relevant subset of a (possibly
huge) master résumé. They are used in three places:

1. Injected into LLM prompts (``RULES_FOR_PROMPT``) so the planner *knows* the
   constraints when it votes.
2. Enforced deterministically server-side after the planner responds — the LLM
   may still over-keep, so the clamp logic re-reads these numbers.
3. Mirrored in ``frontend/src/lib/resumeRules.ts`` for UI counters and warnings.

Change a number here and prompts + clamps stay in sync automatically.
"""

# Page budget: hard ceiling for any tailored résumé. One page is ideal for
# freshers / MNC targets; two pages is the absolute maximum we allow.
MAX_PAGES = 2

# Projects: ATS best practice is 2–3 targeted projects, never a full dump.
PROJECTS_MIN = 2
PROJECTS_MAX = 3

# Certifications: masters can hold dozens; a tailored résumé shortlists only
# the credentials relevant to THIS job.
CERTS_MAX = 5

# Soft caps for smaller list sections (kept count after curation).
EXTRA_MAX = 4            # extracurricular activities
ACHIEVEMENTS_MAX = 5     # achievement bullets

# Skills: how many "do you actually know X?" questions per tailoring run,
# and how many removal proposals we accept per run (surgical, not a purge).
SKILL_QUESTIONS_MAX = 5
SKILL_REMOVALS_MAX = 12

# Professional summary: at most 3 rendered lines. Our LaTeX template at 10pt
# with 0.2in margins fits ~110 characters per line, so 320 chars ≈ 3 lines.
SUMMARY_MAX_LINES = 3
SUMMARY_MAX_CHARS = 320

# Sections that are NEVER offered for removal — every résumé needs them.
COMPULSORY_SECTIONS = ("personal", "education")

# Kinds eligible for LLM rewriting in the polish stage. Everything else is
# selection-only: achievements, certifications and publications travel
# verbatim or not at all; education highlight is never touched.
REWRITE_KINDS = ("summary", "skills", "projects", "experience", "extracurricular")

# Per-kind kept-count caps used by the deterministic clamp (kind -> cap).
KIND_CAPS = {
    "projects": PROJECTS_MAX,
    "certifications": CERTS_MAX,
    "extracurricular": EXTRA_MAX,
    "achievements": ACHIEVEMENTS_MAX,
}

RULES_FOR_PROMPT = f"""RESUME CURATION RULES (binding):
- The output must be at most {MAX_PAGES} pages when compiled — prefer fewer entries over density.
- personal and education are COMPULSORY and will never be offered for removal.
- Keep at most {PROJECTS_MAX} projects (ideally {PROJECTS_MIN}-{PROJECTS_MAX}) — rank them by relevance to THIS JD.
- Keep at most {CERTS_MAX} certifications — only ones a recruiter for THIS role cares about.
- Keep at most {EXTRA_MAX} extracurricular activities and {ACHIEVEMENTS_MAX} achievements.
- Publications stay only when they genuinely fit the role's flavour (e.g. research roles), otherwise advise dropping the whole section.
- Experience entries are ALL kept — never suggest dropping one."""
