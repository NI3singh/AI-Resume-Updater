// src/lib/resumeTransform.ts
// Client side of the AI "Transform" (tailor-to-JD) feature:
//   transformResume -> POST /tools/transform (resume + JD -> tailored resume)
// The server runs a deterministic anti-fabrication guard over the LLM output
// (facts restored verbatim, invented entries deleted), but the result is still
// untrusted shape-wise — callers run it through normalizeResume().

import { api } from './api';
import { ResumeData } from './types';

// Keep the textarea under the backend truncation limit (parse_text_limit=16000).
export const JD_MAX_CHARS = 15000;

export interface TransformResult {
  data: unknown;
  changes: string[];
  warnings: string[];
  match: {
    covered_keywords: string[];
    missing_keywords: string[];
  };
}

export async function transformResume(
  jobDescription: string,
  jobTitle: string,
  company: string,
  data: ResumeData,
): Promise<TransformResult> {
  // Custom sections never go to the LLM — the caller re-attaches them.
  const { custom: _custom, ...builtin } = data;
  return api<TransformResult>('/tools/transform', {
    method: 'POST',
    body: JSON.stringify({
      job_description: jobDescription,
      job_title: jobTitle,
      company,
      data: builtin,
    }),
  });
}
