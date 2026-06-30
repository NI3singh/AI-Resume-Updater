// src/lib/coverLetter.ts
// Client for the Cover Letter AI:
//   generateCoverLetter -> POST /cover-letter/generate  (JD + company + résumé -> structured letter)
//   renderCoverLetter   -> POST /cover-letter/render    (filled template -> DOCX/PDF blob)
// The server reuses the user's exact .docx template and only rebuilds the body;
// content is grounded in the résumé (numbers that aren't are flagged, never invented).

import { api, apiBlob } from './api';
import { ResumeData } from './types';

// Keep under the backend truncation limit (parse_text_limit = 16000).
export const COVER_JD_MAX = 15000;

export interface CoverLetterContent {
  headerTitle: string;
  salutation: string;
  opening: string;
  bridge: string;
  bullets: string[];
  closing: string[];
  signoff: string;
  signatureName: string;
}

export interface CoverLetterResult {
  content: CoverLetterContent;
  warnings: string[];
  missing_keywords: string[];
}

export interface GenerateCoverLetterArgs {
  jobDescription: string;
  company: string;
  jobTitle: string;
  resumeData: ResumeData;
  instruction?: string;
}

export async function generateCoverLetter(args: GenerateCoverLetterArgs): Promise<CoverLetterResult> {
  return api<CoverLetterResult>('/cover-letter/generate', {
    method: 'POST',
    body: JSON.stringify({
      job_description: args.jobDescription,
      company: args.company,
      job_title: args.jobTitle,
      data: args.resumeData,
      instruction: args.instruction ?? '',
    }),
  });
}

/** Fill the template with the (edited) content and download as DOCX or PDF. */
export async function renderCoverLetter(
  content: CoverLetterContent,
  format: 'docx' | 'pdf',
  name: string,
): Promise<Blob> {
  return apiBlob('/cover-letter/render', {
    method: 'POST',
    body: JSON.stringify({ content, format, name }),
  });
}
