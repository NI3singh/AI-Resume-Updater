// src/lib/resumeRules.ts
// Frontend mirror of backend/app/resume_rules.py — the curation rules that
// define what a good, ATS-friendly tailored résumé looks like. Keep the two
// files in sync; the backend stays the source of truth for prompts/clamps,
// these values drive UI counters, warnings and the page-budget heuristic.

export const RESUME_RULES = {
  MAX_PAGES: 2,
  PROJECTS_MIN: 2,
  PROJECTS_MAX: 3,
  CERTS_MAX: 8,
  EXTRA_MAX: 4,
  ACHIEVEMENTS_MAX: 5,
  SKILL_QUESTIONS_MAX: 5,
  /** Professional summary ceiling (3 rendered lines ≈ 320 chars in our template). */
  SUMMARY_MAX_LINES: 3,
  SUMMARY_MAX_CHARS: 320,
  /** Rough rendered lines per page for our LaTeX template (10pt, tight margins). */
  LINES_PER_PAGE: 47,
} as const;

/**
 * Fast page estimate for generated LaTeX — counts content lines with a weight
 * for \item lines (bullets usually wrap). Good enough for instant feedback;
 * the real number comes from the compiler's X-Pdf-Pages header.
 */
export function estimatePages(latex: string): number {
  const docStart = latex.indexOf('\\begin{document}');
  const body = docStart >= 0 ? latex.slice(docStart) : latex;
  let weight = 0;
  for (const raw of body.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('%')) continue;
    weight += line.startsWith('\\item') ? 2.6 : 1;
  }
  return Math.max(1, Math.ceil(weight / RESUME_RULES.LINES_PER_PAGE));
}
