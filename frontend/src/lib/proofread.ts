// src/lib/proofread.ts
// Client side of the résumé "Scan" feature: find spelling / grammar / symbol /
// formatting errors in the resume CONTENT (the source of the PDF), so each
// finding maps to an exact field and can be fixed with one click + undone.
//
//   collect(data)        -> every text field as a located unit
//   cleanText(text)      -> deterministic fixes (symbols, mojibake, spacing, dup words)
//   scanResume(data)     -> deterministic + LLM proofread, merged into FieldFix[]
//   applyFix / applyAll  -> write a fix back into ResumeData (whole-field replace)
//
// Apply replaces the WHOLE field with its corrected text (robust — no fragile
// substring matching), and only if the field still matches what was scanned.

import { api } from './api';
import { ResumeData } from './types';

export type ProofCategory = 'spelling' | 'grammar' | 'punctuation' | 'symbol' | 'formatting';

/** Where a piece of text lives in ResumeData — lets a fix read & write it. */
export type ProofLoc =
  | { kind: 'personal'; field: 'summary' | 'name' | 'location' }
  | { kind: 'listField'; section: string; id: string; field: string }
  | { kind: 'listBullet'; section: string; id: string; index: number }
  | { kind: 'skillItem'; id: string; index: number }
  | { kind: 'customText'; sectionId: string; entryId: string; fieldId: string }
  | { kind: 'customBullet'; sectionId: string; entryId: string; fieldId: string; index: number };

export interface ProofIssue {
  category: ProofCategory;
  message: string;
  original?: string;
  suggestion?: string;
}

export interface FieldFix {
  locId: string;
  loc: ProofLoc;
  label: string;
  original: string;   // the scanned field text
  corrected: string;  // the fixed field text (apply target)
  issues: ProofIssue[];
}

// ── Read / write a located field ─────────────────────────────────────────────
type Rec = Record<string, unknown>;
const asArr = (v: unknown): Rec[] => (Array.isArray(v) ? (v as Rec[]) : []);
const deepClone = (d: ResumeData): ResumeData =>
  (typeof structuredClone === 'function'
    ? structuredClone(d)
    : (JSON.parse(JSON.stringify(d)) as ResumeData));

export function readLoc(data: ResumeData, loc: ProofLoc): string {
  const d = data as unknown as Rec;
  switch (loc.kind) {
    case 'personal':
      return String((data.personal as unknown as Rec)[loc.field] ?? '');
    case 'listField': {
      const e = asArr(d[loc.section]).find((x) => x.id === loc.id);
      return e ? String(e[loc.field] ?? '') : '';
    }
    case 'listBullet': {
      const e = asArr(d[loc.section]).find((x) => x.id === loc.id);
      return e && Array.isArray(e.bullets) ? String((e.bullets as unknown[])[loc.index] ?? '') : '';
    }
    case 'skillItem': {
      const e = asArr(d.skills).find((x) => x.id === loc.id);
      return e && Array.isArray(e.items) ? String((e.items as unknown[])[loc.index] ?? '') : '';
    }
    case 'customText':
    case 'customBullet': {
      const sec = asArr(d.custom).find((s) => s.id === loc.sectionId);
      const entry = sec ? asArr((sec as Rec).entries).find((e) => e.id === loc.entryId) : undefined;
      const val = entry ? (entry.values as Rec)?.[loc.fieldId] : undefined;
      if (loc.kind === 'customText') return typeof val === 'string' ? val : '';
      return Array.isArray(val) ? String((val as unknown[])[loc.index] ?? '') : '';
    }
  }
}

export function writeLoc(data: ResumeData, loc: ProofLoc, text: string): ResumeData {
  const clone = deepClone(data);
  const d = clone as unknown as Rec;
  switch (loc.kind) {
    case 'personal':
      (clone.personal as unknown as Rec)[loc.field] = text;
      break;
    case 'listField': {
      const e = asArr(d[loc.section]).find((x) => x.id === loc.id);
      if (e) e[loc.field] = text;
      break;
    }
    case 'listBullet': {
      const e = asArr(d[loc.section]).find((x) => x.id === loc.id);
      if (e && Array.isArray(e.bullets)) (e.bullets as unknown[])[loc.index] = text;
      break;
    }
    case 'skillItem': {
      const e = asArr(d.skills).find((x) => x.id === loc.id);
      if (e && Array.isArray(e.items)) (e.items as unknown[])[loc.index] = text;
      break;
    }
    case 'customText':
    case 'customBullet': {
      const sec = asArr(d.custom).find((s) => s.id === loc.sectionId);
      const entry = sec ? asArr((sec as Rec).entries).find((e) => e.id === loc.entryId) : undefined;
      if (entry) {
        const values = entry.values as Rec;
        if (loc.kind === 'customText') values[loc.fieldId] = text;
        else if (Array.isArray(values[loc.fieldId])) (values[loc.fieldId] as unknown[])[loc.index] = text;
      }
      break;
    }
  }
  return clone;
}

// ── Collect every text field as a located, labelled unit ─────────────────────
interface Unit { locId: string; loc: ProofLoc; label: string; text: string; prose: boolean; }

export function collect(data: ResumeData): Unit[] {
  const units: Unit[] = [];
  const push = (loc: ProofLoc, label: string, text: unknown, prose: boolean) => {
    if (typeof text === 'string' && text.trim()) {
      units.push({ locId: JSON.stringify(loc), loc, label, text, prose });
    }
  };

  const p = data.personal;
  push({ kind: 'personal', field: 'summary' }, 'Professional Summary', p.summary, true);
  push({ kind: 'personal', field: 'name' }, 'Name', p.name, false);
  push({ kind: 'personal', field: 'location' }, 'Location', p.location, false);

  data.education.forEach((e) => {
    const w = e.institution || 'Education';
    push({ kind: 'listField', section: 'education', id: e.id, field: 'institution' }, 'Education / institution', e.institution, false);
    push({ kind: 'listField', section: 'education', id: e.id, field: 'degree' }, `Education / ${w} / degree`, e.degree, false);
    push({ kind: 'listField', section: 'education', id: e.id, field: 'location' }, `Education / ${w} / location`, e.location, false);
    push({ kind: 'listField', section: 'education', id: e.id, field: 'highlight' }, `Education / ${w} / note`, e.highlight, true);
  });

  data.skills.forEach((c) => {
    push({ kind: 'listField', section: 'skills', id: c.id, field: 'category' }, 'Skills / category', c.category, false);
    (c.items ?? []).forEach((it, idx) =>
      push({ kind: 'skillItem', id: c.id, index: idx }, `Skills / ${c.category || 'category'} / item`, it, false));
  });

  data.projects.forEach((pr) => {
    const w = pr.name || 'Project';
    push({ kind: 'listField', section: 'projects', id: pr.id, field: 'name' }, 'Project / name', pr.name, false);
    push({ kind: 'listField', section: 'projects', id: pr.id, field: 'techStack' }, `Project / ${w} / tech stack`, pr.techStack, false);
    (pr.bullets ?? []).forEach((b, idx) =>
      push({ kind: 'listBullet', section: 'projects', id: pr.id, index: idx }, `Project / ${w} / bullet ${idx + 1}`, b, true));
  });

  data.experience.forEach((e) => {
    const w = e.company || e.role || 'Experience';
    push({ kind: 'listField', section: 'experience', id: e.id, field: 'role' }, 'Experience / role', e.role, false);
    push({ kind: 'listField', section: 'experience', id: e.id, field: 'company' }, 'Experience / company', e.company, false);
    push({ kind: 'listField', section: 'experience', id: e.id, field: 'location' }, `Experience / ${w} / location`, e.location, false);
    push({ kind: 'listField', section: 'experience', id: e.id, field: 'projectSubtitle' }, `Experience / ${w} / subtitle`, e.projectSubtitle, true);
    (e.bullets ?? []).forEach((b, idx) =>
      push({ kind: 'listBullet', section: 'experience', id: e.id, index: idx }, `Experience / ${w} / bullet ${idx + 1}`, b, true));
  });

  data.extracurricular.forEach((e) => {
    const w = e.title || 'Activity';
    push({ kind: 'listField', section: 'extracurricular', id: e.id, field: 'title' }, 'Activity / title', e.title, false);
    push({ kind: 'listField', section: 'extracurricular', id: e.id, field: 'organization' }, `Activity / ${w} / organization`, e.organization, false);
    (e.bullets ?? []).forEach((b, idx) =>
      push({ kind: 'listBullet', section: 'extracurricular', id: e.id, index: idx }, `Activity / ${w} / bullet ${idx + 1}`, b, true));
  });

  data.achievements.forEach((a, idx) =>
    push({ kind: 'listField', section: 'achievements', id: a.id, field: 'text' }, `Achievement ${idx + 1}`, a.text, true));
  data.certifications.forEach((c, idx) =>
    push({ kind: 'listField', section: 'certifications', id: c.id, field: 'text' }, `Certification ${idx + 1}`, c.text, true));
  data.publications.forEach((pub) => {
    const w = pub.title || 'Publication';
    push({ kind: 'listField', section: 'publications', id: pub.id, field: 'title' }, 'Publication / title', pub.title, true);
    push({ kind: 'listField', section: 'publications', id: pub.id, field: 'authors' }, `Publication / ${w} / authors`, pub.authors, false);
    push({ kind: 'listField', section: 'publications', id: pub.id, field: 'abstractText' }, `Publication / ${w} / abstract`, pub.abstractText, true);
  });

  (data.custom ?? []).forEach((sec) => {
    const byId = Object.fromEntries((sec.fields ?? []).map((f) => [f.id, f]));
    (sec.entries ?? []).forEach((entry) => {
      Object.entries(entry.values ?? {}).forEach(([fid, val]) => {
        const f = byId[fid];
        if (!f) return;
        const fl = f.label || 'field';
        if (f.type === 'bullets' && Array.isArray(val)) {
          val.forEach((b, idx) =>
            push({ kind: 'customBullet', sectionId: sec.id, entryId: entry.id, fieldId: fid, index: idx }, `${fl} / bullet ${idx + 1}`, b, true));
        } else if (f.type === 'text' && typeof val === 'string') {
          push({ kind: 'customText', sectionId: sec.id, entryId: entry.id, fieldId: fid }, fl, val, true);
        }
      });
    });
  });

  return units;
}

// ── Deterministic checks (instant, client-side; never touch numbers) ─────────
// MOJIBAKE keys are common UTF-8-as-Latin1 garbles -> safe ASCII / correct letter.
const MOJIBAKE: Array<[RegExp, string]> = [
  [/â€™/g, "'"],   // ’ garble -> '
  [/â€˜/g, "'"],   // ‘ garble -> '
  [/â€œ/g, '"'],   // “ garble -> "
  [/â€/g, '"'],   // ” garble -> "
  [/â€”/g, '-'],   // — garble -> -
  [/â€¦/g, '...'], // … garble -> ...
  [/Ã©/g, 'é'],    // Ã© -> é
  [/Ã¨/g, 'è'],    // Ã¨ -> è
  [/Ã±/g, 'ñ'],    // Ã± -> ñ
  [/Ã¼/g, 'ü'],    // Ã¼ -> ü
  [/Ã¶/g, 'ö'],    // Ã¶ -> ö
  [/Â /g, ' '],         // non-breaking-space garble -> space
];
const SYMBOL: Array<[RegExp, string]> = [
  [/\s*→\s*/g, ' -> '],            // →
  [/\s*←\s*/g, ' <- '],            // ←
  [/⇒/g, '=>'],                    // ⇒
  [/[•‣◦▪]/g, '-'], // • ‣ ◦ ▪
  [/[✓✔]/g, ''],              // ✓ ✔
  [/[★☆✦✧]/g, ''],  // ★ ☆ ✦ ✧
];
// Regexes built from ASCII escape strings so no invisible literals live in source.
// Emoji & pictographs the LaTeX (OT1) fonts can't render:
const EMOJI = new RegExp('[\\u{1F000}-\\u{1FAFF}\\u{2600}-\\u{27BF}\\u{2B00}-\\u{2BFF}\\u{FE0F}]', 'gu');
// Control + zero-width + BOM characters:
const INVISIBLE = new RegExp('[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F\\u200B-\\u200D\\uFEFF]', 'g');
// U+FFFD replacement-character marker:
const REPLACEMENT = new RegExp('\\uFFFD', 'g');

export function cleanText(input: string): { corrected: string; issues: ProofIssue[] } {
  let s = input;
  const issues: ProofIssue[] = [];
  const sub = (re: RegExp, rep: string, category: ProofCategory, message: string) => {
    const n = s.replace(re, rep);
    if (n !== s) {
      s = n;
      if (!issues.some((i) => i.message === message)) issues.push({ category, message });
    }
  };

  for (const [re, rep] of MOJIBAKE) sub(re, rep, 'symbol', 'Garbled character fixed');
  sub(REPLACEMENT, '', 'symbol', 'Garbled character fixed');
  for (const [re, rep] of SYMBOL) sub(re, rep, 'symbol', 'Unsupported symbol replaced');
  sub(EMOJI, '', 'symbol', 'Emoji removed');
  sub(INVISIBLE, '', 'symbol', 'Invisible character removed');
  sub(/\b(\w+)\s+\1\b/gi, '$1', 'grammar', 'Duplicated word removed');
  sub(/\s+([,.;:!?])/g, '$1', 'punctuation', 'Space before punctuation removed');
  sub(/\t+/g, ' ', 'formatting', 'Tab replaced with a space');
  sub(/ {2,}/g, ' ', 'formatting', 'Extra spaces removed');

  return s === input ? { corrected: input, issues: [] } : { corrected: s, issues };
}

// ── Full scan: deterministic + LLM proofread, merged ─────────────────────────
interface ApiUnitOut { id: string; corrected: string; issues: ProofIssue[]; }

export async function scanResume(data: ResumeData): Promise<{ fixes: FieldFix[]; aiOk: boolean }> {
  const units = collect(data);
  const prose = units.filter((u) => u.prose);

  const aiMap: Record<string, { corrected: string; issues: ProofIssue[] }> = {};
  let aiOk = true;
  if (prose.length) {
    try {
      const res = await api<{ units: ApiUnitOut[] }>('/tools/proofread', {
        method: 'POST',
        body: JSON.stringify({ units: prose.map((u) => ({ id: u.locId, label: u.label, text: u.text })) }),
      });
      for (const r of res.units ?? []) {
        aiMap[r.id] = {
          corrected: r.corrected,
          issues: (r.issues ?? []).map((i) => ({
            category: (i.category as ProofCategory) || 'spelling',
            message: i.message,
            original: i.original,
            suggestion: i.suggestion,
          })),
        };
      }
    } catch {
      aiOk = false; // fall back to deterministic-only
    }
  }

  const fixes: FieldFix[] = [];
  for (const u of units) {
    const ai = aiMap[u.locId];
    // Start from the AI-corrected text when available, then run the deterministic
    // pass over it so the final text is clean either way. Numbers can't change.
    const base = ai?.corrected || u.text;
    const det = cleanText(base);
    const corrected = det.corrected;
    if (corrected === u.text) continue;

    const issues: ProofIssue[] = [];
    const seen = new Set<string>();
    for (const it of [...(ai?.issues ?? []), ...cleanText(u.text).issues]) {
      const k = `${it.category}|${it.message}`;
      if (!seen.has(k)) { seen.add(k); issues.push(it); }
    }
    if (!issues.length) issues.push({ category: 'spelling', message: 'Corrected' });

    fixes.push({ locId: u.locId, loc: u.loc, label: u.label, original: u.text, corrected, issues });
  }
  return { fixes, aiOk };
}

// ── Apply ────────────────────────────────────────────────────────────────────
export function applyFix(data: ResumeData, fix: FieldFix): { data: ResumeData; applied: boolean } {
  // Only apply if the field still matches what was scanned (no clobbering edits).
  if (readLoc(data, fix.loc) !== fix.original) return { data, applied: false };
  return { data: writeLoc(data, fix.loc, fix.corrected), applied: true };
}

export function applyAll(data: ResumeData, fixes: FieldFix[]): { data: ResumeData; applied: number } {
  let d = data;
  let applied = 0;
  for (const f of fixes) {
    const r = applyFix(d, f);
    if (r.applied) { d = r.data; applied += 1; }
  }
  return { data: d, applied };
}
