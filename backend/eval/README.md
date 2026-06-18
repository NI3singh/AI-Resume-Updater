# ResumeTeX — Evaluation Harness

Honest, reproducible benchmarks for the two AI surfaces of the résumé app:

1. **The anti-fabrication guard** (`app/transform_guard.py`) — the deterministic
   layer that runs *after* the LLM tailors a résumé to a job description and strips
   anything the model invented.
2. **The import pipeline's hyperlink handling** (`app/routers/tools.py`) — recovering
   the URLs behind a résumé's links and mapping each onto the right field.

The goal throughout is not to flatter the code but to **characterize it honestly** —
what works, what provably doesn't, and the limits of every number.

---

# Part 1 — Anti-fabrication guard

`app/transform_guard.py` runs **after** the LLM tailors a résumé and strips anything
the model invented.

## TL;DR results

**Deterministic benchmark** (27 hand-authored cases, no LLM/network — `run_benchmark.py`)

| Metric | Result |
|---|---|
| Injected fabrications blocked (invented entries, out-of-source numbers, ungrounded skills) | **100%** (5/5 classes) |
| Immutable-field tampering neutralized (silent revert) | **100%** (4/4) |
| Allowed transforms honoured (drop / reorder / number-removal) | **100%** (4/4) |
| False-positive rate on legitimate rephrases | **56% → 33%** after the fix below |
| Structural blind spots documented | **5 classes** |
| Unit/characterization tests · line coverage on the guard | **46 passed, 8 xfailed · 100%** |

**Live raw-vs-guarded differential** (5 real résumés tailored to job descriptions,
`MiniMaxAI/MiniMax-M2.5`, temp 0 — `run_differential.py`)

| Prompt | Raw fabricated claims | After guard | Reduction |
|---|---|---|---|
| Production (full anti-fabrication prompt) | ~19–21 over 5 transforms (≈4 / transform; all ungrounded skills) | **0** | **100%** |
| Naive (no guardrails — stress baseline) | 99 over 5 transforms (≈20 / transform; 81 skills + 17 invented entries) | **0** | **100%** |

On both runs the guard also silently reverted immutable-field edits (4 in
production, 34 under the naive prompt) — category renames, `techStack` additions,
role/name changes.

## Method & honesty notes

The benchmark scores **three** outcomes, not two, because they are not equally good:
- **blocked + warned** — removed and the user is told.
- **silently neutralized** — reverted with *no warning* (immutable-field lies). Reported separately; never counted as "caught".
- **passed through** — the guard's true misses (the blind-spot suite).

Deliberate honesty choices:
- **Recall on injected fabrications is partly tautological** (we inject what the guard targets), so the headline numbers to trust are the **false-positive rate** and the **documented blind spots**, not raw recall.
- The differential's **"fabricated claim" detector is the guard's own ruleset** (invented entries, out-of-source numbers, ungrounded skills, summary numbers absent from the résumé). It therefore measures the classes the guard targets — *not* invented qualitative prose. Every flagged item was eye-checked (see `data/details_*.json`); in the production run all 19 were real skills the candidate never listed, pulled from the JD.
- **Fabrications concentrate in role-mismatched pairs** (e.g. a software-engineer résumé tailored to an IT-technician posting); well-matched pairs produced 0. The average hides this bimodal split.
- `MiniMaxAI/MiniMax-M2.5` is **not perfectly deterministic at temp 0** (the production run measured 21 then 19 across two passes) — numbers are reported as approximate.
- Sample size is small (**N = 5** real transforms); the per-transform figures are indicative, not population estimates.

## The false-positive fix

The number-check (`_numbers_in`) only saw digits, so a legitimate rephrase like
**"five engineers" → "5 engineers"** introduced a "5" absent from the source and
was wrongly dropped. Fix: a conservative spelled-out-cardinal normalizer
(`zero–twenty` + tens), applied in the shared extractor so source and rewrite
compare symmetrically. Deliberately excludes `a`/`an`/`one`, ordinals, and
multipliers (they would widen the allow-set and let a fabricated "1" slip
through). This eliminated the dominant FP class (56% → 33% on the benchmark).

## Documented blind spots (what the guard CANNOT catch)

Encoded as `xfail(strict=True)` tests so they fail loudly if behaviour ever changes:
1. **Invented qualitative claims** with no number ("Built an API" → "Led a team that built a production API").
2. **Number reuse** — a fabricated metric that reuses a number already in the entry ("5 million requests" → "improved latency by 5%").
3. **Cross-bullet number teleporting** within an entry.
4. **Resume-wide summary check** — a summary number is accepted if it appears anywhere in the résumé.
5. **Qualitative education-highlight inflation.**

Residual false-positive classes (also `xfail`): version strings (`2.0`↔`v2`),
magnitude suffixes (`5,000`↔`5k`), and casefold-only skill matching (`Node.js`↔`NodeJS`).

---

# Part 2 — Import pipeline: hyperlink handling

A résumé stores the URL behind a link as a PDF link annotation (or DOCX
relationship) — invisible to plain-text extraction, which sees only the anchor text
("Portfolio", "LinkedIn"). The pipeline recovers these and maps each onto the right
`ResumeData` field. Both benchmarks run on **9 real résumés**.

## 2A — Hyperlink recovery (deterministic — `run_link_benchmark.py`)

| Metric | Result |
|---|---|
| Hyperlinks recovered | **70** across 9 résumés |
| **Invisible to the text layer** (only a link annotation carried them) | **54 = 77%** |
| Well-formed (scheme present) | 70 = 100% |
| By type | 18 github-repo · 12 linkedin · 9 github-profile · 9 email · 2 credential · 20 portfolio/other |

A naive text-only parser would drop the 77% entirely — including project repos,
Power BI dashboards, Credly badges, and portfolio sites. Recall (links missed
outright) was validated by manual inspection of the source PDFs; there is no second
annotation parser used as an oracle.

## 2B — URL → field-mapping accuracy (parse vs. parse+verify — `run_parse_accuracy.py`)

Does each recovered URL land in the **correct** field? Ground truth = the URL-type
mapping rules the pipeline's own spec defines (`linkedin → personal.linkedin`,
`github repo → project.githubUrl`, `credly → certification.credentialUrl`, deployed
app → `project.liveUrl`, …), so accuracy = conformance to that spec. Scored over the
53 spec-mappable links (ambiguous ones — competitive-programming profiles, social
posts, custom-domain deploys — are excluded; template résumés auto-skip).

| field type | parse | parse+verify | n |
|---|---|---|---|
| personal.email | 9/9 | 8/9 | 9 |
| personal.linkedin | 9/9 | 9/9 | 9 |
| personal.github | 9/9 | 9/9 | 9 |
| personal.website | 1/1 | 1/1 | 1 |
| certification.credentialUrl | 2/2 | 2/2 | 2 |
| project.githubUrl | 13/18 | 13/18 | 18 |
| project.liveUrl (deployed apps) | 2/5 | 2/5 | 5 |
| **Overall** | **45/53 = 85%** | 44/53 = 83% | 53 |

Honest reading of the gaps:
- **Contact / profile / credential / website links: 30/30 at parse** (29/30 after verify).
- The 5 `githubUrl` misses are all **open-source PR/contribution links** to one
  external repo (`…/pull/####`) — correctly *not* mapped as the candidate's own projects.
- The 3 `liveUrl` misses are vercel/netlify deploys, 2 of which are portfolio sites
  the spec rule conservatively expects as `liveUrl` — so **85% is a pessimistic floor**.
- **The verify stage did not help** link routing (it regressed exactly one email and
  improved none); its value is in correcting field *values* (dates, formats), not URLs.

## Running it

```bash
# from backend/  (deterministic — no key/DB/network needed)
python -m eval.run_benchmark                      # Part 1: guard benchmark
python -m eval.run_link_benchmark                 # Part 2A: hyperlink recovery
pytest -q --cov=app.transform_guard --cov-report=term-missing

# LLM-backed (need NEBIUS_API_KEY in .env; inputs under data/resume|jd, gitignored)
python -m eval.build_cases                        # resume PDFs -> cases.json (parse pipeline)
python -m eval.run_differential                   # Part 1: production prompt, temp 0
EVAL_MODE=naive python -m eval.run_differential   # Part 1: no-guardrails stress baseline
python -m eval.run_parse_accuracy                 # Part 2B: URL -> field mapping (parse + verify)
```

Only `benchmark_report.md` (synthetic, reproducible) is committed. Everything derived
from real résumés — `differential_report_*.md`, `link_benchmark_report.md`,
`parse_accuracy_report.md`, all inputs, and per-item detail files — lives under
`data/` and is **gitignored** (real résumés are PII).

## Résumé bullets these numbers support

**Anti-fabrication guard (Part 1):**

> Built a deterministic anti-fabrication guard for an LLM résumé-tailoring feature
> (FastAPI): on a 27-case adversarial benchmark it blocked **100%** of injected
> fabrications (invented entries, out-of-source numbers, ungrounded skills) and on
> live runs over real résumés removed **100%** of the model's hallucinated skills —
> up to **10 per résumé** when tailored to a mismatched role — while cutting the
> guard's own false-positive rate **56% → 33%**; **100%** line coverage, 5 blind
> spots documented.

**Import pipeline / hyperlink handling (Part 2):**

> Benchmarked a résumé-import pipeline on **9 real résumés**: recovered **70
> hyperlinks, 77% invisible to plain-text extraction** (project repos, dashboards,
> credential badges) by parsing PDF link annotations / DOCX relationships, then
> mapped each to the correct structured field at **85% accuracy — 100% for
> contact/profile/credential links** — quantifying both extraction and routing.

(Shorter variants and the metrics list are in the project chat.)
