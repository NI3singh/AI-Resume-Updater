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
  CustomSection,
} from './types';

// ---------------------------------------------------------------------------
// Escape plain text for LaTeX (low-level — only used inside tex() below).
//
// Single-pass replacement via a lookup map: each special character maps to its
// LaTeX-safe form and is substituted exactly once, so the backslashes/braces we
// introduce are never re-scanned (a chained .replace() would, e.g., turn a typed
// "\" into \textbackslash{} and then escape ITS braces — corrupting it).
//   & % $ # _ { }      -> backslash-escaped
//   \ ~ ^ < > |        -> text commands (\textbackslash{}, \textless{}, …)
// <, >, | matter because in LaTeX's default OT1 text encoding the raw glyphs
// render as ¡ ¿ — (this is why a typed "<" came out looking like "!").
// ---------------------------------------------------------------------------
const LATEX_ESCAPES: Record<string, string> = {
  '\\': '\\textbackslash{}',
  '&': '\\&',
  '%': '\\%',
  '$': '\\$',
  '#': '\\#',
  '_': '\\_',
  '{': '\\{',
  '}': '\\}',
  '~': '\\textasciitilde{}',
  '^': '\\textasciicircum{}',
  '<': '\\textless{}',
  '>': '\\textgreater{}',
  '|': '\\textbar{}',
};

const esc = (str: string): string =>
  str ? str.replace(/[\\&%$#_{}~^<>|]/g, (ch) => LATEX_ESCAPES[ch]) : '';

// ---------------------------------------------------------------------------
// Render ANY user-entered text: LaTeX-escape everything, but turn **bold**
// markers into \textbf{...}. This is used for every text field below, so a
// user can bold a word by wrapping it in **double asterisks** anywhere they
// type — no raw LaTeX needed. Matching is per-field, so an unclosed ** simply
// stays literal in that field instead of affecting the rest of the document.
// (URLs are never passed through here — they stay raw inside \href{...}.)
// ---------------------------------------------------------------------------
const tex = (raw: string): string =>
  (raw || '')
    .split(/(\*\*[^*]+\*\*)/g)
    .map(part => {
      const m = part.match(/^\*\*([^*]+)\*\*$/);
      return m ? `\\textbf{${esc(m[1])}}` : esc(part);
    })
    .join('');

// Compose a grade/score label from the chosen format + the user's value:
//   CGPA "8.68" -> "CGPA: 8.68"       Percentage "85.4" -> "85.4%"
//   GPA "3.8/4.0" -> "GPA: 3.8/4.0"   Grade "A+" -> "Grade: A+"
// An empty/unknown format (custom or legacy data) renders the value as-is.
export const formatScore = (format: string | undefined, value: string): string => {
  const v = (value || '').trim();
  if (!v) return '';
  switch (format) {
    case 'CGPA':       return `CGPA: ${v}`;
    case 'GPA':        return `GPA: ${v}`;
    case 'Percentage': return v.includes('%') ? v : `${v}%`;
    case 'Grade':      return `Grade: ${v}`;
    default:           return v;
  }
};

// Like formatScore, but for the custom "Number / Marks" field — also supports an
// "out of" denominator. CGPA "8.68" /10 -> "CGPA: 8.68 / 10"; Percentage -> "85.4%".
export const formatMark = (format: string | undefined, value: string, outOf?: string): string => {
  const v = (value || '').trim();
  if (!v) return '';
  const o = (outOf || '').trim();
  const denom = o ? ` / ${o}` : '';
  switch (format) {
    case 'Percentage': return v.includes('%') ? v : `${v}%`;
    case 'Grade':      return `Grade: ${v}`;
    case 'CGPA':       return `CGPA: ${v}${denom}`;
    case 'GPA':        return `GPA: ${v}${denom}`;
    default:           return `${v}${denom}`;
  }
};

const bulletList = (items: string[]): string => {
  const lines = items.filter(b => b.trim());
  if (!lines.length) return '';
  return `\\begin{itemize}
${lines.map(b => `    \\item ${tex(b)}`).join('\n')}
\\end{itemize}`;
};

// ---------------------------------------------------------------------------
// HEADER — always rendered, never part of body section order
// ---------------------------------------------------------------------------
const buildHeader = (p: ResumeData['personal']): string => {
  if (!p.name) return '';

  const line2: string[] = [];
  if (p.phone)    line2.push(tex(p.phone));
  if (p.location) line2.push(tex(p.location));

  const line3: string[] = [];
  if (p.email)   line3.push(`\\href{mailto:${p.email}}{${tex(p.email)}}`);
  if (p.linkedin) {
    const display = p.linkedin.replace(/^https?:\/\/(www\.)?/, 'www.');
    line3.push(`\\href{${p.linkedin}}{${tex(display)}}`);
  }
  if (p.github) {
    const display = p.github.replace(/^https?:\/\/(www\.)?/, 'www.');
    line3.push(`\\href{${p.github}}{${tex(display)}}`);
  }
  if (p.website) line3.push(`\\href{${p.website}}{Portfolio}`);

  return `\\begin{center}
    {\\huge\\textbf{${tex(p.name.toUpperCase())}}}

    \\vspace{2pt}

    ${line2.join(' \\textbar{} ')}

    \\vspace{2pt}

    ${line3.join(' \\textbar{} ')}
\\end{center}`;
};

// ---------------------------------------------------------------------------
// PROFESSIONAL SUMMARY — optional; rendered first, above the body sections.
// ---------------------------------------------------------------------------
const buildSummary = (summary: string | undefined): string => {
  const text = (summary ?? '').trim();
  if (!text) return '';
  return `\\section*{Professional Summary}\n\n${tex(text)}`;
};

// ---------------------------------------------------------------------------
// SECTION BUILDERS — each receives a custom label from SectionConfig
// ---------------------------------------------------------------------------

const buildEducation = (entries: EducationEntry[], label: string): string => {
  if (!entries.length) return '';
  const rows = entries.map(e => {
    const score = formatScore(e.gpaFormat, e.gpaLabel);
    const gpa   = score ? `\\textbf{${tex(score)}}` : '';
    const dates = [e.startDate, e.endDate].filter(Boolean).map(tex).join(' - ');
    const line1 = `\\textbf{${tex(e.institution)}} \\textbar{} ${tex(e.location)} \\hfill ${gpa}\\\\`;
    const line2 = `${tex(e.degree)} \\hfill ${dates}${e.highlight ? '\\\\' : ''}`;
    const line3 = e.highlight ? `\\textit{${tex(e.highlight)}}` : '';
    return [line1, line2, line3].filter(Boolean).join('\n');
  });
  return `\\section*{${tex(label)}}\n\n${rows.join('\n\n\\vspace{5pt}\n\n')}`;
};

const buildSkills = (cats: SkillCategory[], label: string): string => {
  const lines = cats
    .filter(c => c.category && c.items.length)
    .map(c => `\\skillitem{${tex(c.category)}}${c.items.map(tex).join(', ')}`);
  if (!lines.length) return '';
  return `\\section*{${tex(label)}}\n\n${lines.join('\n\n')}`;
};

const buildProjects = (projects: ProjectEntry[], label: string): string => {
  if (!projects.length) return '';
  const blocks = projects.map(p => {
    const techPart = p.techStack ? ` \\textbar{} ${tex(p.techStack)}` : '';
    const ghLink   = p.githubUrl
      ? ` \\hfill \\href{${p.githubUrl}}{\\textcolor{blue!70!black}{Github Link}}`
      : '';
    const liveLink = p.liveUrl
      ? `\n\\textbar{} {\\href{${p.liveUrl}}{\\textcolor{blue!70!black}{Live Link}}}`
      : '';
    return `\\textbf{${tex(p.name)}}${techPart}${ghLink}${liveLink}\n${bulletList(p.bullets)}`;
  });
  return `\\section*{${tex(label)}}\n\n${blocks.join('\n\n\\vspace{3pt}\n\n')}`;
};

const buildExperience = (entries: ExperienceEntry[], label: string): string => {
  if (!entries.length) return '';
  const blocks = entries.map(e => {
    const dateRange   = e.current
      ? `${tex(e.startDate)} - Present`
      : [e.startDate, e.endDate].filter(Boolean).map(tex).join(' - ');
    const companyPart = [e.company, e.location].filter(Boolean).map(tex).join(', ');
    const subtitle    = e.projectSubtitle ? `\\\\\n\\textit{${tex(e.projectSubtitle)}}` : '';
    return `\\textbf{${tex(e.role)}} \\textbar{} ${companyPart} \\hfill ${dateRange}${subtitle}\n${bulletList(e.bullets)}`;
  });
  return `\\section*{${tex(label)}}\n\n${blocks.join('\n\n\\vspace{3pt}\n\n')}`;
};

const buildExtracurricular = (entries: ExtracurricularEntry[], label: string): string => {
  if (!entries.length) return '';
  const blocks = entries.map(e => {
    const dateRange = [e.startDate, e.endDate].filter(Boolean).map(tex).join(' - ');
    return `\\textbf{${tex(e.title)}} \\textbar{} ${tex(e.organization)} \\hfill ${dateRange}\n${bulletList(e.bullets)}`;
  });
  return `\\section*{${tex(label)}}\n\n${blocks.join('\n\n\\vspace{3pt}\n\n')}`;
};

const buildAchievements = (items: AchievementItem[], label: string): string => {
  const valid = items.filter(a => a.text.trim());
  if (!valid.length) return '';
  return `\\section*{${tex(label)}}\n\\begin{itemize}\n${valid.map(a => `    \\item ${tex(a.text)}`).join('\n')}\n\\end{itemize}`;
};

const buildCertifications = (items: CertificationItem[], label: string): string => {
  const valid = items.filter(c => c.text.trim());
  if (!valid.length) return '';
  const lines = valid.map(c => {
    const link = c.credentialUrl
      ? ` \\href{${c.credentialUrl}}{\\textcolor{blue!70!black}{[View Credential]}}`
      : '';
    return `    \\item ${tex(c.text)}${link}`;
  });
  return `\\section*{${tex(label)}}\n\\begin{itemize}\n${lines.join('\n')}\n\\end{itemize}`;
};

const buildPublications = (entries: PublicationEntry[], label: string): string => {
  if (!entries.length) return '';
  const blocks = entries.map(p => {
    const abstractLine = p.abstractText ? `    \\item \\textbf{Abstract:} ${tex(p.abstractText)}` : '';
    const linkLine     = p.paperUrl && p.paperLinkLabel
      ? `    \\item \\href{${p.paperUrl}}{\\textcolor{blue!70!black}{${tex(p.paperLinkLabel)}}}`
      : '';
    const itemLines = [abstractLine, linkLine].filter(Boolean).join('\n');
    return `\\textbf{${tex(p.title)}} \\textbar{} ${tex(p.authors)}\n\\begin{itemize}\n${itemLines}\n\\end{itemize}`;
  });
  return `\\section*{${tex(label)}}\n\n${blocks.join('\n\n\\vspace{3pt}\n\n')}`;
};

// ---------------------------------------------------------------------------
// CUSTOM SECTIONS — user-defined sections with arbitrary fields.
// Inline fields (text/number/link) form the header line (first text value
// bold), date fields are right-aligned, and 'bullets' fields render as lists.
// ---------------------------------------------------------------------------
const buildCustomSection = (section: CustomSection, label: string): string => {
  const inline       = section.fields.filter(f => f.type !== 'bullets' && f.type !== 'date');
  const dates        = section.fields.filter(f => f.type === 'date');
  const bulletFields = section.fields.filter(f => f.type === 'bullets');

  const blocks = section.entries.map(entry => {
    let boldUsed = false;
    const left = inline.map(f => {
      if (f.type === 'link') {
        const lv = entry.values[f.id];
        let url = '', text = '';
        if (typeof lv === 'string') url = lv;                                  // legacy: url only
        else if (lv && typeof lv === 'object' && !Array.isArray(lv) && 'url' in lv) { url = lv.url ?? ''; text = lv.text ?? ''; }
        if (!url.trim()) return '';
        return `\\href{${url.trim()}}{${tex(text.trim() || f.label || 'Link')}}`;
      }
      if (f.type === 'number') {
        const mv = entry.values[f.id];
        let s = '';
        if (typeof mv === 'string') s = mv;                                                  // legacy: plain number
        else if (mv && typeof mv === 'object' && !Array.isArray(mv) && 'format' in mv) s = formatMark(mv.format, mv.value, mv.outOf);
        return s.trim() ? tex(s.trim()) : '';                                                 // never bold (it's a score, not a title)
      }
      const v = String(entry.values[f.id] ?? '').trim();
      if (!v) return '';
      if (!boldUsed) { boldUsed = true; return `\\textbf{${tex(v)}}`; }
      return tex(v);
    }).filter(Boolean).join(' \\textbar{} ');

    const right = dates.map(f => {
      const dv = entry.values[f.id];
      let s = '';
      if (typeof dv === 'string') s = dv;                                          // single date
      else if (dv && typeof dv === 'object' && !Array.isArray(dv) && 'from' in dv) // range
        s = [dv.from, dv.to].map(x => (x || '').trim()).filter(Boolean).join(' - ');
      return tex(s.trim());
    }).filter(Boolean).join(', ');

    const header = [left, right].filter(Boolean).join(' \\hfill ');

    const bullets = bulletFields
      .map(f => bulletList(Array.isArray(entry.values[f.id]) ? (entry.values[f.id] as string[]) : []))
      .filter(Boolean)
      .join('\n');

    return [header, bullets].filter(Boolean).join('\n');
  }).filter(Boolean);

  if (!blocks.length) return '';
  return `\\section*{${tex(label)}}\n\n${blocks.join('\n\n\\vspace{3pt}\n\n')}`;
};

// ---------------------------------------------------------------------------
// MAIN EXPORT
// sectionConfig drives order AND label of every body section.
// Removing a section from config = it disappears from LaTeX output entirely.
// ---------------------------------------------------------------------------
export const generateLatex = (data: ResumeData, sectionConfig: SectionConfig[]): string => {
  const header = buildHeader(data.personal);

  const sections = [
    buildSummary(data.personal.summary),
    ...sectionConfig.map(({ id, label }) => {
      switch (id) {
        case 'education':       return buildEducation(data.education, label);
        case 'skills':          return buildSkills(data.skills, label);
        case 'projects':        return buildProjects(data.projects, label);
        case 'experience':      return buildExperience(data.experience, label);
        case 'extracurricular': return buildExtracurricular(data.extracurricular, label);
        case 'achievements':    return buildAchievements(data.achievements, label);
        case 'certifications':  return buildCertifications(data.certifications, label);
        case 'publications':    return buildPublications(data.publications, label);
        default: {
          const cs = data.custom?.find(c => c.id === id);
          return cs ? buildCustomSection(cs, label) : '';
        }
      }
    }),
  ]
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

${sections}

\\vspace{3pt}

\\end{document}
`;
};
