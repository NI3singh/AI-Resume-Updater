# ResumeTeX — LaTeX Resume Builder

A production-grade Next.js app for building professional LaTeX resumes. Fill manually or upload your old resume — AI extracts everything and maps it to your LaTeX template.

---

## Directory Structure

```
latex-resume-builder/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Landing page
│   │   ├── builder/
│   │   │   └── page.tsx            # Main builder UI
│   │   └── api/
│   │       ├── parse-resume/       # Claude AI resume parser
│   │       │   └── route.ts
│   │       ├── extract-text/       # PDF/DOCX text extractor
│   │       │   └── route.ts
│   │       └── compile-pdf/        # LaTeX → PDF compiler
│   │           └── route.ts
│   ├── components/
│   │   └── builder/
│   │       ├── FormPanel.tsx       # Left panel with section nav
│   │       ├── UploadMode.tsx      # Upload & AI extraction UI
│   │       └── sections/
│   │           ├── PersonalInfo.tsx
│   │           ├── Summary.tsx
│   │           ├── Experience.tsx
│   │           ├── Education.tsx
│   │           ├── Skills.tsx
│   │           └── Projects.tsx
│   ├── lib/
│   │   ├── types.ts                # TypeScript interfaces
│   │   ├── latexTemplate.ts        # LaTeX code generator
│   │   ├── resumeParser.ts         # AI parse client calls
│   │   └── pdfCompiler.ts          # PDF compile + download utils
│   └── styles/
│       └── globals.css             # Global styles + Tailwind
├── .env.local                      # Environment variables
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.local .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Features

### Manual Mode
- Fill Personal Info, Summary, Experience, Education, Skills, Projects
- Live LaTeX code preview (updates as you type)
- Syntax-highlighted code view with line numbers
- Export `.tex` file or compile to PDF

### Upload Mode
- Upload PDF, DOCX, or TXT resume
- Text is extracted server-side
- Claude AI (Haiku) parses and structures all data
- Auto-fills all form fields — review before compiling

### LaTeX Generation
- Clean, professional LaTeX template
- Proper LaTeX escaping for special characters
- Modular sections (only included if data exists)
- Easy to swap with your own template in `src/lib/latexTemplate.ts`

### PDF Compilation
- Sends `.tex` to [LaTeX.online](https://latex.ytotech.com) API
- Falls back to alternative endpoint if needed
- Returns compiled PDF for preview and download

---

## Using Your Own LaTeX Template

Edit `src/lib/latexTemplate.ts`:

1. Replace the template string with your own LaTeX code
2. Use `${escapeLatex(variable)}` to inject dynamic data
3. The `data` object contains all `ResumeData` fields
4. See the `ResumeData` interface in `src/lib/types.ts`

---

## API Keys Needed

| Service | Purpose | Free? |
|---|---|---|
| [Anthropic](https://console.anthropic.com) | AI resume parsing (upload mode) | $5 free credits |
| [LaTeX.online](https://latex.ytotech.com) | PDF compilation | Free (rate limited) |

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + custom CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **AI**: Anthropic Claude (claude-3-5-haiku)
- **PDF Extraction**: pdf-parse
- **DOCX Extraction**: mammoth
- **LaTeX Compilation**: latex.ytotech.com API

---

## Deployment (Vercel)

```bash
npm run build
vercel deploy
```

Add `ANTHROPIC_API_KEY` in Vercel project settings → Environment Variables.

---

Built with ♥ using Next.js + Claude AI
