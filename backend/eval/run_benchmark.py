"""Deterministic benchmark for the anti-fabrication transform guard.

Runs every fixture through ``enforce_no_fabrication`` and reports, per bucket:
fabrication recall, neutralization, allowed-transform correctness, confirmed
blind spots, and the false-positive rate on legitimate rephrases.

No network / DB / LLM / .env required - it imports only ``app.transform_guard``.

Usage (from backend/):
    python -m eval.run_benchmark
Exit code is non-zero if any guard-strength case regresses (a catch/neutralize/
allowed case fails) - so this doubles as a guard regression gate.
"""

from __future__ import annotations

import os
import sys

# Make `app` and `eval` importable no matter how this is invoked.
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.transform_guard import enforce_no_fabrication, prepare_for_llm  # noqa: E402
from eval.fixtures import (  # noqa: E402
    ALLOWED, BLINDSPOT, CATCH, CASES, FP, NEUTRALIZE, Case,
)

# Buckets whose cases MUST all pass; a failure here is a guard regression.
_GATING = {CATCH, NEUTRALIZE, ALLOWED}


def _pct(num: int, den: int) -> str:
    return f"{(100.0 * num / den):.0f}%" if den else "n/a"


def run() -> int:
    results: list[tuple[Case, bool, list]] = []
    for case in CASES:
        original = prepare_for_llm(case.original)
        guarded, warnings, _changes = enforce_no_fabrication(original, case.llm_output)
        try:
            passed = bool(case.check(guarded, warnings))
        except Exception as exc:  # a malformed check shouldn't crash the run
            passed = False
            warnings = [*warnings, f"[check error: {exc}]"]
        results.append((case, passed, warnings))

    def bucket(b: str) -> list[tuple[Case, bool, list]]:
        return [r for r in results if r[0].bucket == b]

    catch, neut, allow = bucket(CATCH), bucket(NEUTRALIZE), bucket(ALLOWED)
    blind, fp = bucket(BLINDSPOT), bucket(FP)

    def passes(rs):
        return sum(1 for _, ok, _ in rs if ok)

    fp_failures = [r for r in fp if not r[1]]  # a failing fp case == a false positive

    lines: list[str] = []
    w = lines.append

    w("# Anti-Fabrication Guard - Benchmark Report\n")
    w(f"Total cases: **{len(CASES)}**\n")

    w("## Headline metrics\n")
    w(f"- **Fabrication recall (catchable):** {passes(catch)}/{len(catch)} "
      f"= {_pct(passes(catch), len(catch))}")
    w(f"- **Immutable tampering neutralized (silent revert):** {passes(neut)}/{len(neut)} "
      f"= {_pct(passes(neut), len(neut))}")
    w(f"- **Allowed transformations honoured:** {passes(allow)}/{len(allow)} "
      f"= {_pct(passes(allow), len(allow))}")
    w(f"- **Documented blind spots confirmed:** {passes(blind)}/{len(blind)} "
      f"= {_pct(passes(blind), len(blind))}")
    w(f"- **False positives on legitimate rephrases:** {len(fp_failures)}/{len(fp)} "
      f"= {_pct(len(fp_failures), len(fp))}\n")

    w("## False positives - legitimate rephrases by class\n")
    w("| class | case | preserved? |")
    w("|---|---|---|")
    for case, ok, _ in fp:
        w(f"| {case.fab_class} | {case.title} | {'yes' if ok else 'NO (false positive)'} |")
    w("")

    w("## Blind spots - confirmed structural limitations\n")
    w("| class | case | still passes through? |")
    w("|---|---|---|")
    for case, ok, _ in blind:
        w(f"| {case.fab_class} | {case.title} | {'yes (limitation confirmed)' if ok else 'no - now CAUGHT'} |")
    w("")

    w("## Caught fabrications & neutralizations\n")
    w("| bucket | class | case | as expected? |")
    w("|---|---|---|---|")
    for case, ok, _ in catch + neut + allow:
        w(f"| {case.bucket} | {case.fab_class} | {case.title} | {'yes' if ok else 'NO - REGRESSION'} |")
    w("")

    # Regressions: gating buckets must be all-green.
    regressions = [r for r in results if r[0].bucket in _GATING and not r[1]]
    improvements = [r for r in blind if not r[1]]  # blind spot that became caught

    if improvements:
        w("## Note: blind spots that are now caught (guard improved)\n")
        for case, _ok, _ in improvements:
            w(f"- {case.title} ({case.fab_class})")
        w("")

    if regressions:
        w("## REGRESSIONS (guard got weaker)\n")
        for case, _ok, warns in regressions:
            w(f"- **{case.title}** [{case.bucket}/{case.fab_class}] - {case.note}")
        w("")

    report = "\n".join(lines)
    print(report)

    out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "benchmark_report.md")
    with open(out_path, "w", encoding="utf-8") as fh:
        fh.write(report + "\n")
    print(f"\n[written to {out_path}]")

    return 1 if regressions else 0


if __name__ == "__main__":
    raise SystemExit(run())
