// src/lib/types.ts

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  summary?: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  location: string;
  gpaFormat?: string; // 'CGPA' | 'GPA' | 'Percentage' | 'Grade' | '' (custom). Optional for backward compat.
  gpaLabel: string;   // the score value (e.g. '8.68', '85.4', 'A+'), or a full custom label
  degree: string;
  startDate: string;
  endDate: string;
  highlight: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  techStack: string;
  githubUrl: string;
  liveUrl: string;
  bullets: string[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  projectSubtitle: string;
  bullets: string[];
}

export interface ExtracurricularEntry {
  id: string;
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface AchievementItem {
  id: string;
  text: string;
}

export interface CertificationItem {
  id: string;
  text: string;
  credentialUrl: string;
}

export interface PublicationEntry {
  id: string;
  title: string;
  authors: string;
  abstractText: string;
  paperUrl: string;
  paperLinkLabel: string;
}

// ── Custom (user-defined) sections ──────────────────────────────────────────
export type CustomFieldType = 'text' | 'bullets' | 'date' | 'number' | 'link';

export interface CustomFieldDef {
  id: string;
  label: string;
  type: CustomFieldType;
  dateRange?: boolean; // only for type 'date': true = start–end range, else single date
}

export interface LinkValue {
  url: string;
  text: string; // the clickable label shown in the resume
}

export interface DateRangeValue {
  from: string;
  to: string;
}

export interface MarkValue {
  format: string; // 'CGPA' | 'GPA' | 'Percentage' | 'Grade' | '' (custom)
  value: string;  // the marks obtained
  outOf: string;  // denominator, e.g. '10', '4.0', '500' (optional)
}

export interface CustomEntry {
  id: string;
  values: Record<string, string | string[] | LinkValue | DateRangeValue | MarkValue>; // fieldId -> value
}

export interface CustomSection {
  id: string;          // 'custom_…' — matches its id in sectionConfig
  fields: CustomFieldDef[];
  entries: CustomEntry[];
}

export interface ResumeData {
  personal: PersonalInfo;
  education: EducationEntry[];
  skills: SkillCategory[];
  projects: ProjectEntry[];
  experience: ExperienceEntry[];
  extracurricular: ExtracurricularEntry[];
  achievements: AchievementItem[];
  certifications: CertificationItem[];
  publications: PublicationEntry[];
  custom?: CustomSection[];
}

export type BuiltinSection =
  | 'personal'
  | 'education'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'extracurricular'
  | 'achievements'
  | 'certifications'
  | 'publications';

// A section id is a builtin id or a custom section id ('custom_…').
// (string & {}) keeps builtin autocomplete while still allowing any custom id.
export type ActiveSection = BuiltinSection | (string & {});

export interface SectionConfig {
  id: string;    // builtin id (minus 'personal') or a custom section id ('custom_…')
  label: string; // shown in nav AND used as \section*{label} in LaTeX
}

export const ALL_SECTIONS: SectionConfig[] = [
  { id: 'education',       label: 'Education' },
  { id: 'skills',          label: 'Technical Skills' },
  { id: 'projects',        label: 'Projects' },
  { id: 'experience',      label: 'Experience' },
  { id: 'extracurricular', label: 'Extracurricular Activities' },
  { id: 'achievements',    label: 'Achievements' },
  { id: 'certifications',  label: 'Certifications' },
  { id: 'publications',    label: 'Publications' },
];

// ── AI Upload import (extract → parse → verify) ─────────────────────────────
// Result of the backend /tools/verify pass. `data` is still the *raw* LLM
// object — run it through normalizeResume() before using it as ResumeData.
export interface VerifyResult {
  data: unknown;
  warnings: string[];
  summary: { sections_found: string[]; missing: string[] };
}
