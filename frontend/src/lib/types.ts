// src/lib/types.ts

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  location: string;
  gpaLabel: string;
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
}

export type ActiveSection =
  | 'personal'
  | 'education'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'extracurricular'
  | 'achievements'
  | 'certifications'
  | 'publications';

export interface SectionConfig {
  id: Exclude<ActiveSection, 'personal'>;
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
