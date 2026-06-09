// src/lib/resumeImport.ts
// Client side of the AI "Upload resume" pipeline:
//   1. extractText  -> POST /tools/extract-text (multipart file -> plain text)
//   2. parseResume  -> POST /tools/parse        (text -> raw ResumeData JSON)
//   3. verifyResume -> POST /tools/verify       (text + data -> corrected + warnings)
//   4. normalizeResume(raw) -> a structurally-valid ResumeData.
// The LLM output is untrusted, so normalizeResume() coerces every field and
// guarantees generateLatex() never sees a malformed shape.

import { api } from './api';
import {
  ResumeData, PersonalInfo, EducationEntry, SkillCategory, ProjectEntry,
  ExperienceEntry, ExtracurricularEntry, AchievementItem, CertificationItem,
  PublicationEntry, VerifyResult,
} from './types';

// ── Pipeline calls (each hits an auth-gated FastAPI /tools route) ───────────

export async function extractText(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  const res = await api<{ text: string }>('/tools/extract-text', { method: 'POST', body: form });
  return res.text;
}

export async function parseResume(text: string): Promise<unknown> {
  const res = await api<{ data: unknown }>('/tools/parse', {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
  return res.data;
}

export async function verifyResume(text: string, data: unknown): Promise<VerifyResult> {
  return api<VerifyResult>('/tools/verify', {
    method: 'POST',
    body: JSON.stringify({ text, data }),
  });
}

// ── Small coercion helpers ──────────────────────────────────────────────────

let _idCounter = 0;
function uid(prefix: string): string {
  _idCounter += 1;
  return `${prefix}_${Date.now().toString(36)}_${_idCounter}`;
}

function str(v: unknown): string {
  if (typeof v === 'string') return v;
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  return '';
}

function obj(v: unknown): Record<string, unknown> {
  return v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
}

function arr(v: unknown): unknown[] {
  return Array.isArray(v) ? v : [];
}

// Bullets: an array of strings, or a single multi-line string split per line.
function bulletArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(str).map(s => s.trim()).filter(Boolean);
  const s = str(v);
  if (!s.trim()) return [];
  return s.split('\n').map(x => x.replace(/^[\s•\-*]+/, '').trim()).filter(Boolean);
}

// Skill items: an array, or a single string split on commas / newlines / semicolons.
function itemArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(str).map(s => s.trim()).filter(Boolean);
  const s = str(v);
  if (!s.trim()) return [];
  return s.split(/[,\n;]+/).map(x => x.trim()).filter(Boolean);
}

// ── Per-section normalizers (drop blank rows on a key field) ─────────────────

function normPersonal(v: unknown): PersonalInfo {
  const o = obj(v);
  return {
    name: str(o.name),
    email: str(o.email),
    phone: str(o.phone),
    location: str(o.location),
    linkedin: str(o.linkedin),
    github: str(o.github),
    website: str(o.website),
    summary: str(o.summary),
  };
}

function normEducation(v: unknown): EducationEntry[] {
  return arr(v)
    .map((e): EducationEntry => {
      const o = obj(e);
      return {
        id: uid('edu'),
        institution: str(o.institution),
        location: str(o.location),
        gpaFormat: str(o.gpaFormat),
        gpaLabel: str(o.gpaLabel),
        degree: str(o.degree),
        startDate: str(o.startDate),
        endDate: str(o.endDate),
        highlight: str(o.highlight),
      };
    })
    .filter(e => e.institution || e.degree);
}

function normSkills(v: unknown): SkillCategory[] {
  return arr(v)
    .map((s): SkillCategory => {
      const o = obj(s);
      return { id: uid('skill'), category: str(o.category), items: itemArray(o.items) };
    })
    .filter(s => s.category && s.items.length > 0);
}

function normProjects(v: unknown): ProjectEntry[] {
  return arr(v)
    .map((p): ProjectEntry => {
      const o = obj(p);
      return {
        id: uid('proj'),
        name: str(o.name),
        techStack: str(o.techStack),
        githubUrl: str(o.githubUrl),
        liveUrl: str(o.liveUrl),
        bullets: bulletArray(o.bullets),
      };
    })
    .filter(p => p.name);
}

function normExperience(v: unknown): ExperienceEntry[] {
  return arr(v)
    .map((x): ExperienceEntry => {
      const o = obj(x);
      const endDate = str(o.endDate);
      return {
        id: uid('exp'),
        role: str(o.role),
        company: str(o.company),
        location: str(o.location),
        startDate: str(o.startDate),
        endDate,
        current: o.current === true || endDate.toLowerCase() === 'present',
        projectSubtitle: str(o.projectSubtitle),
        bullets: bulletArray(o.bullets),
      };
    })
    .filter(x => x.role || x.company);
}

function normExtracurricular(v: unknown): ExtracurricularEntry[] {
  return arr(v)
    .map((x): ExtracurricularEntry => {
      const o = obj(x);
      return {
        id: uid('extra'),
        title: str(o.title),
        organization: str(o.organization),
        startDate: str(o.startDate),
        endDate: str(o.endDate),
        bullets: bulletArray(o.bullets),
      };
    })
    .filter(x => x.title || x.organization);
}

function normAchievements(v: unknown): AchievementItem[] {
  return arr(v)
    .map((a): AchievementItem => ({
      id: uid('ach'),
      text: typeof a === 'string' ? a : str(obj(a).text),
    }))
    .filter(a => a.text.trim());
}

function normCertifications(v: unknown): CertificationItem[] {
  return arr(v)
    .map((c): CertificationItem => {
      const o = obj(c);
      return {
        id: uid('cert'),
        text: typeof c === 'string' ? c : str(o.text),
        credentialUrl: str(o.credentialUrl),
      };
    })
    .filter(c => c.text.trim());
}

function normPublications(v: unknown): PublicationEntry[] {
  return arr(v)
    .map((p): PublicationEntry => {
      const o = obj(p);
      return {
        id: uid('pub'),
        title: str(o.title),
        authors: str(o.authors),
        abstractText: str(o.abstractText),
        paperUrl: str(o.paperUrl),
        paperLinkLabel: str(o.paperLinkLabel),
      };
    })
    .filter(p => p.title);
}

const KNOWN_SECTIONS = [
  'personal', 'education', 'skills', 'projects', 'experience',
  'extracurricular', 'achievements', 'certifications', 'publications',
];

/** A structurally-complete blank resume — the merge target for parsed data. */
export function emptyResumeData(): ResumeData {
  return {
    personal: { name: '', email: '', phone: '', location: '', linkedin: '', github: '', website: '', summary: '' },
    education: [],
    skills: [],
    projects: [],
    experience: [],
    extracurricular: [],
    achievements: [],
    certifications: [],
    publications: [],
    custom: [],
  };
}

/**
 * Coerce untrusted LLM output into a valid ResumeData. Tolerates a wrapper
 * object ({ resume: {...} }), missing sections, wrong types, and bullets given
 * as a single string. Generates ids and drops blank rows. Custom sections are
 * never produced here (preserved separately by the caller).
 */
export function normalizeResume(raw: unknown): ResumeData {
  let src = obj(raw);
  // Unwrap a possible wrapper like { resume: {...} } or { data: {...} }.
  if (!KNOWN_SECTIONS.some(k => k in src)) {
    for (const val of Object.values(src)) {
      const inner = obj(val);
      if (KNOWN_SECTIONS.some(k => k in inner)) { src = inner; break; }
    }
  }
  return {
    personal: normPersonal(src.personal),
    education: normEducation(src.education),
    skills: normSkills(src.skills),
    projects: normProjects(src.projects),
    experience: normExperience(src.experience),
    extracurricular: normExtracurricular(src.extracurricular),
    achievements: normAchievements(src.achievements),
    certifications: normCertifications(src.certifications),
    publications: normPublications(src.publications),
    custom: [],
  };
}
