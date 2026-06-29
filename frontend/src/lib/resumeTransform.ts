// src/lib/resumeTransform.ts
// Client side of the interactive AI "Transform" (tailor-to-JD) feature.
//
//   planTransform   -> POST /tools/transform/plan
//                      resume + JD -> ordered list of units to tailor
//   tailorSection   -> POST /tools/transform/section
//                      ONE unit + JD (+ optional grounding sources) -> guarded rewrite
//
// The model only ever sees/returns one small unit at a time, and the server
// runs a deterministic anti-fabrication guard over each rewrite (numbers must
// trace to the unit or to a user-provided source). The old whole-resume
// one-shot endpoint is gone — it was the source of text corruption.

import { api } from './api';
import { ResumeData, SectionConfig } from './types';

// Keep the textarea under the backend truncation limit (parse_text_limit=16000).
export const JD_MAX_CHARS = 15000;

/** A single résumé unit the wizard will walk the user through. */
export interface TransformStep {
  kind: 'summary' | 'experience' | 'projects' | 'extracurricular' | 'education';
  entry_id: string;          // '' for the summary step
  section: string;           // owning section key ('personal' for summary)
  label: string;
  asks_readme: boolean;      // project steps may request the project README (Phase 2)
  asks_related_work: boolean;// experience steps may request JD-related work notes (Phase 2)
  recommend_change: boolean;
  recommend_drop: boolean;   // entry is irrelevant to the JD — offer to drop it (entries phase)
  reason: string;
}

/** AI advice on whether to keep a whole section for this JD. */
export interface SectionAdvice {
  section: string;   // section id (matches SectionConfig.id)
  label: string;
  keep: boolean;
  reason: string;
}

export interface TransformPlan {
  steps: TransformStep[];
  section_advice: SectionAdvice[];
  missing_keywords: string[];
}

/** The tailorable fields a unit can return (only one is populated per kind). */
export interface UnitProposal {
  bullets?: string[];
  text?: string;
  summary?: string;
  items?: string[];
}

export interface SectionProposal {
  proposal: UnitProposal;
  rationale: string;
  covered_keywords: string[];
  missing_keywords: string[];
  warnings: string[];
  no_change_recommended: boolean;
}

/** Ask the backend which résumé units to tailor (cheap, deterministic). */
export async function planTransform(
  jobDescription: string,
  jobTitle: string,
  company: string,
  data: ResumeData,
  sectionConfig: SectionConfig[],
): Promise<TransformPlan> {
  // Custom sections never go to the LLM — the wizard keeps them untouched.
  const { custom: _custom, ...builtin } = data;
  return api<TransformPlan>('/tools/transform/plan', {
    method: 'POST',
    body: JSON.stringify({
      job_description: jobDescription,
      job_title: jobTitle,
      company,
      data: builtin,
      section_config: sectionConfig,
    }),
  });
}

export interface TailorSectionArgs {
  jobDescription: string;
  jobTitle: string;
  company: string;
  kind: TransformStep['kind'];
  /** The single ORIGINAL unit (summary step -> { summary: "..." }). */
  entry: unknown;
  /** The CURRENT draft being refined (bullets/text/summary) — enables surgical,
   *  stateful edits: a change request edits THIS, not the original. */
  current?: UnitProposal;
  /** Optional grounding text (e.g. a pasted README) — allows its facts/numbers. */
  sources?: string[];
  /** Optional user comment steering a regeneration (tone/length/emphasis). */
  instruction?: string;
}

/** Tailor one unit to the JD; returns the guarded (fabrication-checked) rewrite. */
export async function tailorSection(args: TailorSectionArgs): Promise<SectionProposal> {
  return api<SectionProposal>('/tools/transform/section', {
    method: 'POST',
    body: JSON.stringify({
      job_description: args.jobDescription,
      job_title: args.jobTitle,
      company: args.company,
      kind: args.kind,
      entry: args.entry,
      current: args.current ?? {},
      sources: args.sources ?? [],
      instruction: args.instruction ?? '',
    }),
  });
}
