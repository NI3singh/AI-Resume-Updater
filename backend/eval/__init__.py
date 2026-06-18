"""Offline evaluation harness for the anti-fabrication transform guard.

Two entry points:
- ``run_benchmark`` — deterministic; exercises ``enforce_no_fabrication`` over a
  hand-authored fixture set. No network/DB/LLM/.env required.
- ``run_differential`` — live; compares the raw LLM transform against the guarded
  one on real resumes. Requires a configured Nebius key (imports ``app.llm``).
"""
