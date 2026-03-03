// src/lib/latexTemplate.ts
import {
  ResumeData,
  SectionConfig,
  EducationEntry,
  SkillCategory,
  ProjectEntry,
  ExperienceEntry,
  ExtracurricularEntry,
  AchievementItem,
  CertificationItem,
  PublicationEntry,
} from './types';

// ---------------------------------------------------------------------------
// Escape plain text for LaTeX
// ---------------------------------------------------------------------------
const esc = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g,  '\\&')
    .replace(/%/g,  '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g,  '\\#')
    .replace(/_/g,  '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/~/g,  '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
};

const bulletList = (items: string[]): string => {
  const lines = items.filter(b => b.trim());
  if (!lines.length) return '';
  return `\\begin{itemize}
${lines.map(b => `    \\item ${esc(b)}`).join('\n')}
\\end{itemize}`;
};

// ---------------------------------------------------------------------------
// HEADER — always rendered, never part of body section order
// ---------------------------------------------------------------------------
const buildHeader = (p: ResumeData['personal']): string => {
  if (!p.name) return '';

  const line2: string[] = [];
  if (p.phone)    line2.push(esc(p.phone));
  if (p.location) line2.push(esc(p.location));

  const line3: string[] = [];
  if (p.email)   line3.push(`\\href{mailto:${p.email}}{${esc(p.email)}}`);
  if (p.linkedin) {
    const display = p.linkedin.replace(/^https?:\/\/(www\.)?/, 'www.');
    line3.push(`\\href{${p.linkedin}}{${esc(display)}}`);
  }
  if (p.github) {
    const display = p.github.replace(/^https?:\/\/(www\.)?/, 'www.');
    line3.push(`\\href{${p.github}}{${esc(display)}}`);
  }
  if (p.website) line3.push(`\\href{${p.website}}{Portfolio}`);

  return `\\begin{center}
    {\\huge\\textbf{${esc(p.name.toUpperCase())}}}
    
    \\vspace{2pt}
    
    ${line2.join(' \\textbar{} ')}
    
    \\vspace{2pt}
    
    ${line3.join(' \\textbar{} ')}
\\end{center}`;
};

// ---------------------------------------------------------------------------
// SECTION BUILDERS — each receives a custom label from SectionConfig
// ---------------------------------------------------------------------------

const buildEducation = (entries: EducationEntry[], label: string): string => {
  if (!entries.length) return '';
  const rows = entries.map(e => {
    const gpa   = e.gpaLabel ? `\\textbf{${esc(e.gpaLabel)}}` : '';
    const dates = [e.startDate, e.endDate].filter(Boolean).map(esc).join(' - ');
    const line1 = `\\textbf{${esc(e.institution)}} \\textbar{} ${esc(e.location)} \\hfill ${gpa}\\\\`;
    const line2 = `${esc(e.degree)} \\hfill ${dates}${e.highlight ? '\\\\' : ''}`;
    const line3 = e.highlight ? `\\textit{${esc(e.highlight)}}` : '';
    return [line1, line2, line3].filter(Boolean).join('\n');
  });
  return `\\section*{${esc(label)}}\n\n${rows.join('\n\n\\vspace{5pt}\n\n')}`;
};

const buildSkills = (cats: SkillCategory[], label: string): string => {
  const lines = cats
    .filter(c => c.category && c.items.length)
    .map(c => `\\skillitem{${esc(c.category)}}${c.items.map(esc).join(', ')}`);
  if (!lines.length) return '';
  return `\\section*{${esc(label)}}\n\n${lines.join('\n\n')}`;
};

const buildProjects = (projects: ProjectEntry[], label: string): string => {
  if (!projects.length) return '';
  const blocks = projects.map(p => {
    const techPart = p.techStack ? ` \\textbar{} ${esc(p.techStack)}` : '';
    const ghLink   = p.githubUrl
      ? ` \\hfill \\href{${p.githubUrl}}{\\textcolor{blue!70!black}{Github Link}}`
      : '';
    const liveLink = p.liveUrl
      ? `\n\\textbar{\\href{${p.liveUrl}}{\\textcolor{blue!70!black}{Live Link}}}`
      : '';
    return `\\textbf{${esc(p.name)}}${techPart}${ghLink}${liveLink}\n${bulletList(p.bullets)}`;
  });
  return `\\section*{${esc(label)}}\n\n${blocks.join('\n\n\\vspace{3pt}\n\n')}`;
};

const buildExperience = (entries: ExperienceEntry[], label: string): string => {
  if (!entries.length) return '';
  const blocks = entries.map(e => {
    const dateRange   = e.current
      ? `${esc(e.startDate)} - Present`
      : [e.startDate, e.endDate].filter(Boolean).map(esc).join(' - ');
    const companyPart = [e.company, e.location].filter(Boolean).map(esc).join(', ');
    const subtitle    = e.projectSubtitle ? `\\\\\n\\textit{${esc(e.projectSubtitle)}}` : '';
    return `\\textbf{${esc(e.role)}} \\textbar{} ${companyPart} \\hfill ${dateRange}${subtitle}\n${bulletList(e.bullets)}`;
  });
  return `\\section*{${esc(label)}}\n\n${blocks.join('\n\n\\vspace{3pt}\n\n')}`;
};

const buildExtracurricular = (entries: ExtracurricularEntry[], label: string): string => {
  if (!entries.length) return '';
  const blocks = entries.map(e => {
    const dateRange = [e.startDate, e.endDate].filter(Boolean).map(esc).join(' - ');
    return `\\textbf{${esc(e.title)}} \\textbar{} ${esc(e.organization)} \\hfill ${dateRange}\n${bulletList(e.bullets)}`;
  });
  return `\\section*{${esc(label)}}\n\n${blocks.join('\n\n\\vspace{3pt}\n\n')}`;
};

const buildAchievements = (items: AchievementItem[], label: string): string => {
  const valid = items.filter(a => a.text.trim());
  if (!valid.length) return '';
  return `\\section*{${esc(label)}}\n\\begin{itemize}\n${valid.map(a => `    \\item ${esc(a.text)}`).join('\n')}\n\\end{itemize}`;
};

const buildCertifications = (items: CertificationItem[], label: string): string => {
  const valid = items.filter(c => c.text.trim());
  if (!valid.length) return '';
  const lines = valid.map(c => {
    const link = c.credentialUrl
      ? ` \\href{${c.credentialUrl}}{\\textcolor{blue!70!black}{[View Credential]}}`
      : '';
    return `    \\item ${esc(c.text)}${link}`;
  });
  return `\\section*{${esc(label)}}\n\\begin{itemize}\n${lines.join('\n')}\n\\end{itemize}`;
};

const buildPublications = (entries: PublicationEntry[], label: string): string => {
  if (!entries.length) return '';
  const blocks = entries.map(p => {
    const abstractLine = p.abstractText ? `    \\item \\textbf{Abstract:} ${esc(p.abstractText)}` : '';
    const linkLine     = p.paperUrl && p.paperLinkLabel
      ? `    \\item \\href{${p.paperUrl}}{\\textcolor{blue!70!black}{${esc(p.paperLinkLabel)}}}`
      : '';
    const itemLines = [abstractLine, linkLine].filter(Boolean).join('\n');
    return `\\textbf{${esc(p.title)}} \\textbar{} ${esc(p.authors)}\n\\begin{itemize}\n${itemLines}\n\\end{itemize}`;
  });
  return `\\section*{${esc(label)}}\n\n${blocks.join('\n\n\\vspace{3pt}\n\n')}`;
};

// ---------------------------------------------------------------------------
// MAIN EXPORT
// sectionConfig drives order AND label of every body section.
// Removing a section from config = it disappears from LaTeX output entirely.
// ---------------------------------------------------------------------------
export const generateLatex = (data: ResumeData, sectionConfig: SectionConfig[]): string => {
  const header = buildHeader(data.personal);

  const body = sectionConfig
    .map(({ id, label }) => {
      switch (id) {
        case 'education':       return buildEducation(data.education, label);
        case 'skills':          return buildSkills(data.skills, label);
        case 'projects':        return buildProjects(data.projects, label);
        case 'experience':      return buildExperience(data.experience, label);
        case 'extracurricular': return buildExtracurricular(data.extracurricular, label);
        case 'achievements':    return buildAchievements(data.achievements, label);
        case 'certifications':  return buildCertifications(data.certifications, label);
        case 'publications':    return buildPublications(data.publications, label);
        default:                return '';
      }
    })
    .filter(Boolean)
    .join('\n\n\\vspace{5pt}\n\n');

  return `\\documentclass[10pt, a4paper]{article}
\\usepackage[left=0.2in, right=0.2in, top=0.2in, bottom=0.2in]{geometry}
\\usepackage{times}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{xcolor}
\\usepackage{tabularx}
\\usepackage{array}

% Remove page numbering
\\pagestyle{empty}

% Define colors for links
\\hypersetup{
    colorlinks=true,
    linkcolor=blue!70!black,
    urlcolor=blue!70!black,
}

% Custom section formatting with consistent separators
\\usepackage{titlesec}
\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\vspace{2pt}\\hrule height 0.5pt\\vspace{4pt}]
\\titlespacing{\\section}{0pt}{0.5pt}{0pt}

% Remove default indentation
\\setlength{\\parindent}{0pt}

% Custom itemize formatting for clean bullet points
\\setlist[itemize]{
    leftmargin=15pt,
    topsep=2pt,
    itemsep=1pt,
    parsep=1pt,
    label=\\textbullet
}

% Define a command for subsection headers (bold with colon)
\\newcommand{\\skillitem}[1]{\\textbf{#1} : }

\\begin{document}

${header}

\\vspace{-12pt}

${body}

\\vspace{3pt}

\\end{document}
`;
};