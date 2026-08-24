// src/lib/transformSession.ts
// Cross-page handoff for the dedicated Transform page (/builder/transform).
//
// The builder page owns the live editing state, so navigating to the Transform
// page would otherwise lose it. Three sessionStorage payloads keep everything
// correct across the round trip:
//
//   1. TRANSFORM_SESSION_KEY  builder -> transform   which resume is being tailored
//   2. TRANSFORM_RESULT_KEY   transform -> builder   tailored data to apply (unsaved)
//   3. PENDING_ACTIVE_KEY     transform -> builder   freshly created branch to select
//
// A fourth per-resume key (BUILDER_DRAFT_PREFIX + resumeId) stashes unsaved
// builder edits while the user is away, restoring them (still flagged unsaved)
// when they come back.

import { ResumeData, SectionConfig } from './types';

const TRANSFORM_SESSION_KEY = 'resumetex:transformSession';
const TRANSFORM_RESULT_KEY = 'resumetex:transformResult';
export const PENDING_ACTIVE_KEY = 'resumetex:pendingActive';
const BUILDER_DRAFT_PREFIX = 'resumetex:draft:';

export interface TransformHandoff {
  resumeId: string;
  resumeName: string;
  resumeData: ResumeData;
  sectionConfig: SectionConfig[];
}

export interface TransformApplyPayload {
  resumeId: string;
  data: ResumeData;
  /** Tailored section layout (dropped sections removed), if the plan advised drops. */
  sectionConfig?: SectionConfig[];
}

function readJson<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full / disabled — the flows degrade to "no draft kept".
  }
}

function removeKey(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(key);
  } catch {}
}

// ── Builder → Transform ──────────────────────────────────────────────────────

export function writeTransformHandoff(handoff: TransformHandoff): void {
  writeJson(TRANSFORM_SESSION_KEY, handoff);
}

export function readTransformHandoff(): TransformHandoff | null {
  const h = readJson<TransformHandoff>(TRANSFORM_SESSION_KEY);
  return h && h.resumeId && h.resumeData?.personal && Array.isArray(h.sectionConfig) ? h : null;
}

// ── Builder unsaved-draft stash (survives the detour) ───────────────────────

export interface BuilderDraft {
  resumeData: ResumeData;
  sectionConfig: SectionConfig[];
}

export function stashBuilderDraft(resumeId: string, draft: BuilderDraft): void {
  writeJson(BUILDER_DRAFT_PREFIX + resumeId, draft);
}

export function peekBuilderDraft(resumeId: string): BuilderDraft | null {
  const d = readJson<BuilderDraft>(BUILDER_DRAFT_PREFIX + resumeId);
  return d && d.resumeData?.personal && Array.isArray(d.sectionConfig) ? d : null;
}

export function clearBuilderDraft(resumeId: string): void {
  removeKey(BUILDER_DRAFT_PREFIX + resumeId);
}

// ── Transform → Builder ──────────────────────────────────────────────────────

export function writeTransformResult(payload: TransformApplyPayload): void {
  writeJson(TRANSFORM_RESULT_KEY, payload);
}

export function readTransformResult(): TransformApplyPayload | null {
  const p = readJson<TransformApplyPayload>(TRANSFORM_RESULT_KEY);
  return p && p.resumeId && p.data?.personal ? p : null;
}

export function clearTransformResult(): void {
  removeKey(TRANSFORM_RESULT_KEY);
}

export function markPendingActive(resumeId: string): void {
  writeJson(PENDING_ACTIVE_KEY, { resumeId });
}

/** Consume the pending-active marker (returns the id once, then clears it). */
export function consumePendingActive(): string | null {
  const v = readJson<{ resumeId?: string }>(PENDING_ACTIVE_KEY);
  removeKey(PENDING_ACTIVE_KEY);
  return v?.resumeId ?? null;
}
