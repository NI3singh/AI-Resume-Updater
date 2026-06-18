# Anti-Fabrication Guard — Evaluation

This folder benchmarks `app/transform_guard.py`, the deterministic layer that runs
**after** the LLM tailors a résumé to a job description and strips anything the
model invented. The goal of the eval is not to flatter the guard but to
**characterize it honestly** — what it catches, what it provably cannot, and how
often it wrongly blocks a legitimate edit.

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

## Running it

```bash
# from backend/  (deterministic — no key/DB/network needed)
python -m eval.run_benchmark
pytest -q --cov=app.transform_guard --cov-report=term-missing

# live differential (needs NEBIUS_API_KEY in .env; inputs under data/, gitignored)
python -m eval.build_cases                      # resume PDFs -> cases.json (parse pipeline)
python -m eval.run_differential                 # production prompt, temp 0
EVAL_MODE=naive python -m eval.run_differential # no-guardrails stress baseline
```

Generated artifacts: `benchmark_report.md`, `differential_report_production.md`,
`differential_report_naive.md` (aggregate only, PII-safe). Inputs and per-item
fabrication details live under `data/` and are **gitignored** (real résumés = PII).

## Résumé bullets these numbers support

> Built a deterministic anti-fabrication guard for an LLM résumé-tailoring feature
> (FastAPI): on a 27-case adversarial benchmark it blocked **100%** of injected
> fabrications (invented entries, out-of-source numbers, ungrounded skills) and on
> live runs over real résumés removed **100%** of the model's hallucinated skills —
> up to **10 per résumé** when tailored to a mismatched role — while cutting the
> guard's own false-positive rate **56% → 33%**; **100%** line coverage, 5 blind
> spots documented.

(Shorter variants and the metrics list are in the project chat.)
