### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\README.md
*Saved at: 3/3/2026, 4:20:15 PM*

**[REMOVED]**
```
(from line ~1)
# ResumeTeX — LaTeX Resume Builder

```
**[ADDED]**
```
1     # ResumeTeX Builder
```
**[REMOVED]**
```
(from line ~3)
A production-grade Next.js app for building professional LaTeX resumes. Fill manually or upload your old resume — AI extracts everything and maps it to your LaTeX template.

```
**[ADDED]**
```
3     A full-stack LaTeX resume builder with AI-powered parsing, cloud storage, and multi-version management. Built with Next.js 14, Supabase, and an OpenAI-compatible LLM API.
```
**[REMOVED]**
```
(from line ~7)
## Directory Structure

```
**[ADDED]**
```
7     ## What It Does
```
**[REMOVED]**
```
(from line ~9)
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

```
**[ADDED]**
```
9     Write your resume once as a **master**. Fork it for every job application — tweak the focus, reorder sections, rename headings — then compile to a pixel-perfect PDF. Every version is saved to the cloud. Roll back any change with a single click, or step through edits one at a time with undo.
```
**[ADDED]**
```
11    Under the hood, everything compiles through your own LaTeX template, so the output looks exactly how you designed it — not like a generic resume builder.
12    
```
**[REMOVED]**
```
(from line ~15)
## Quick Start

```
**[ADDED]**
```
15    ## Features
```
**[REMOVED]**
```
(from line ~17)
### 1. Install dependencies

```
**[ADDED]**
```
17    **Resume Management**
18    - One **Master Resume** per account — your single source of truth
19    - Fork from master for any job application, named however you want
20    - Switch between versions instantly from the header dropdown
21    - Rename, delete, or restore any version to match master
22    - Autosaves every 2 seconds while you edit
23    
24    **Editor**
25    - 9 fully-featured sections: Personal, Education, Technical Skills, Projects, Experience, Extracurricular, Achievements, Certifications, Publications
26    - Drag to reorder sections — order is reflected live in the LaTeX output
27    - Rename any section heading — the `\section*{}` in LaTeX updates instantly
28    - Remove sections you don't need; add them back anytime
29    - Undo any change with `Ctrl+Z` / `Cmd+Z` (50-step history)
30    - **Rollback** button to discard all unsaved edits and restore the last saved state
31    
32    **LaTeX & PDF**
33    - Live LaTeX code preview with syntax highlighting — updates as you type
34    - Download the raw `.tex` file
35    - One-click compile to PDF via [LaTeX.online](https://latex.ytotech.com)
36    - PDF preview directly in the browser
37    
38    **Upload Mode**
39    - Upload an existing PDF or DOCX resume
40    - Text is extracted server-side, then parsed by an LLM
41    - All fields auto-filled — review and adjust before compiling
42    
43    **Auth**
44    - Email/password authentication via Supabase
45    - Detects duplicate accounts on signup and prompts login
46    - Session-persisted, works across tabs and reloads
47    
48    ---
49    
50    ## Tech Stack
51    
52    | Layer | Technology |
53    |---|---|
54    | Framework | Next.js 14 (App Router) |
55    | Auth & Database | Supabase (Auth + PostgreSQL + RLS) |
56    | Styling | Tailwind CSS + CSS variables |
57    | Animation | Framer Motion |
58    | Icons | Lucide React |
59    | LLM (resume parsing) | Nebius API / any OpenAI-compatible endpoint |
60    | PDF extraction | pdf-parse, mammoth |
61    | LaTeX compilation | LaTeX.online API |
62    
63    ---
64    
65    ## Getting Started
66    
67    ### 1. Clone and install
68    
```
**[ADDED]**
```
70    git clone <your-repo>
71    cd latex-resume-builder
```
**[REMOVED]**
```
(from line ~75)
### 2. Configure environment

```
**[ADDED]**
```
75    ### 2. Set up Supabase
76    
77    Create a project at [supabase.com](https://supabase.com), then run the schema:
78    
79    - Go to **SQL Editor → New Query**
80    - Paste the contents of `supabase-schema.sql` and click **Run**
81    - Go to **Authentication → Email** and disable "Confirm email" if you want instant login without email verification
82    
83    ### 3. Configure environment variables
84    
```
**[REMOVED]**
```
(from line ~86)
cp .env.local .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

```
**[ADDED]**
```
86    # .env.local
87    
88    NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
89    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
90    
91    NEBIUS_API_KEY=your_nebius_api_key_here
```
**[REMOVED]**
```
(from line ~94)
### 3. Run development server

```
**[ADDED]**
```
94    Get your Supabase keys from **Settings → API** in your project dashboard.
95    
96    ### 4. Run
97    
```
**[REMOVED]**
```
(from line ~106)
## Features

```
**[ADDED]**
```
106   ## Customising the LaTeX Template
```
**[REMOVED]**
```
(from line ~108)
### Manual Mode
- Fill Personal Info, Summary, Experience, Education, Skills, Projects
- Live LaTeX code preview (updates as you type)
- Syntax-highlighted code view with line numbers
- Export `.tex` file or compile to PDF

```
**[ADDED]**
```
108   The entire LaTeX output is generated from `src/lib/latexTemplate.ts`. Each section has its own builder function that receives the section data and the label string from the user's section config.
```
**[REMOVED]**
```
(from line ~110)
### Upload Mode
- Upload PDF, DOCX, or TXT resume
- Text is extracted server-side
- Claude AI (Haiku) parses and structures all data
- Auto-fills all form fields — review before compiling

```
**[ADDED]**
```
110   To adapt it to a different template:
111   - Edit the preamble string at the bottom of `generateLatex()`
112   - Edit each section builder function to match your template's formatting
113   - The `esc()` helper handles LaTeX special character escaping — always wrap user text through it
```
**[REMOVED]**
```
(from line ~115)
### LaTeX Generation
- Clean, professional LaTeX template
- Proper LaTeX escaping for special characters
- Modular sections (only included if data exists)
- Easy to swap with your own template in `src/lib/latexTemplate.ts`

```
**[ADDED]**
```
115   The section label passed to each builder is whatever the user has named it in the UI, so renaming "Technical Skills" to "Core Competencies" in the sidebar immediately changes the `\section*{}` heading in the output.
```
**[REMOVED]**
```
(from line ~117)
### PDF Compilation
- Sends `.tex` to [LaTeX.online](https://latex.ytotech.com) API
- Falls back to alternative endpoint if needed
- Returns compiled PDF for preview and download


```
**[REMOVED]**
```
(from line ~119)
## Using Your Own LaTeX Template

```
**[ADDED]**
```
119   ## Deployment
```
**[REMOVED]**
```
(from line ~121)
Edit `src/lib/latexTemplate.ts`:

```
**[ADDED]**
```
121   ```bash
122   npm run build
123   ```
```
**[REMOVED]**
```
(from line ~125)
1. Replace the template string with your own LaTeX code
2. Use `${escapeLatex(variable)}` to inject dynamic data
3. The `data` object contains all `ResumeData` fields
4. See the `ResumeData` interface in `src/lib/types.ts`

```
**[ADDED]**
```
125   Deploy to Vercel, Railway, or any Node.js host. Add your three environment variables in the hosting dashboard.
```
**[REMOVED]**
```
(from line ~127)
---

```
**[ADDED]**
```
127   For Vercel:
```
**[REMOVED]**
```
(from line ~129)
## API Keys Needed

```
**[ADDED]**
```
129   ```bash
130   vercel deploy
131   ```
```
**[REMOVED]**
```
(from line ~133)
| Service | Purpose | Free? |
|---|---|---|
| [Anthropic](https://console.anthropic.com) | AI resume parsing (upload mode) | $5 free credits |
| [LaTeX.online](https://latex.ytotech.com) | PDF compilation | Free (rate limited) |


```
**[REMOVED]**
```
(from line ~135)
## Tech Stack

```
**[ADDED]**
```
135   ## Database Schema
```
**[REMOVED]**
```
(from line ~137)
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + custom CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **AI**: Anthropic Claude (claude-3-5-haiku)
- **PDF Extraction**: pdf-parse
- **DOCX Extraction**: mammoth
- **LaTeX Compilation**: latex.ytotech.com API

```
**[ADDED]**
```
137   One table: `resumes`
```
**[ADDED]**
```
139   | Column | Type | Notes |
140   |---|---|---|
141   | `id` | uuid | Primary key |
142   | `user_id` | uuid | References `auth.users`, cascade delete |
143   | `name` | text | e.g. "Master Resume", "Data Analyst - Google" |
144   | `is_master` | boolean | Unique per user — enforced at DB level |
145   | `resume_data` | jsonb | Full `ResumeData` object |
146   | `section_config` | jsonb | Ordered array of `SectionConfig` |
147   | `created_at` | timestamptz | Auto-set |
148   | `updated_at` | timestamptz | Auto-updated via trigger |
149   
150   Row Level Security is enabled — users can only read and write their own rows.
151   
```
**[REMOVED]**
```
(from line ~154)
## Deployment (Vercel)

```
**[ADDED]**
```
154   ## Environment Variables Reference
```
**[REMOVED]**
```
(from line ~156)
```bash
npm run build
vercel deploy
```

```
**[ADDED]**
```
156   | Variable | Required | Description |
157   |---|---|---|
158   | `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
159   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous public key |
160   | `NEBIUS_API_KEY` | Yes (for upload mode) | LLM API key for resume parsing |
```
**[REMOVED]**
```
(from line ~162)
Add `ANTHROPIC_API_KEY` in Vercel project settings → Environment Variables.

```
**[ADDED]**
```
162   The LLM endpoint is configured in `src/app/api/parse-resume/route.ts`. To use a different provider (OpenAI, Groq, Together, etc.), update the `baseURL` and model name — any OpenAI-compatible API works without other changes.
```
**[REMOVED]**
```
(from line ~166)
Built with ♥ using Next.js + Claude AI

```
**[ADDED]**
```
166   Built by [Nitin Singh](https://portfolio-nitinsingh.vercel.app/)
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\styles\globals.css
*Saved at: 3/3/2026, 4:20:03 PM*

**[REMOVED]**
```
(from line ~24)
  --ink-500: #5C5C7A;  /* readable as muted text in dark mode */

```
**[ADDED]**
```
24      --ink-500: #9696B8;  /* muted icons/text — ~5.5:1 contrast on dark bg */
```
**[REMOVED]**
```
(from line ~38)
  --ink-500: #A89F90;

```
**[ADDED]**
```
38      --ink-500: #7A7060;  /* muted icons/text on light bg */
```
**[ADDED]**
```
66    /* ── Global SVG / Icon rules ──────────────────────────────────────────────
67       Lucide icons use currentColor — ensure they always inherit from parent.
68       Without this, SVGs inside elements that don't have an explicit text color
69       can fall back to the browser default (black), invisible on dark backgrounds.
70       ────────────────────────────────────────────────────────────────────────── */
71    svg {
72      color: inherit;
73      fill: none;         /* Lucide icons are stroke-based */
74      stroke: currentColor;
75      flex-shrink: 0;
76    }
77    
78    /* Icon buttons — give a consistent visible default that still feels subtle */
79    button svg,
80    a svg {
81      color: inherit;
82    }
83    
84    /* When a button has no explicit text color, fall back to ivory-dim not black */
85    button:not([class*="text-"]) svg {
86      color: var(--ivory-dim);
87    }
88    
89    /* Inline icon helper — use class="icon" on non-button icon wrappers */
90    .icon {
91      color: var(--ivory-dim);
92    }
93    .icon-muted {
94      color: var(--ink-500);
95    }
96    .icon-gold {
97      color: #C9A84C;
98    }
99    
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:53:16 PM*

**[REMOVED]**
```
(from line ~100)
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ivory-muted" >

```
**[ADDED]**
```
100                     className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ivory-muted" style={{ top: '50%' }} >
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:53:14 PM*

**[REMOVED]**
```
(from line ~100)
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ivory-muted">

```
**[ADDED]**
```
100                     className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ivory-muted" >
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:52:57 PM*

**[REMOVED]**
```
(from line ~98)
                  placeholder="••••••••" className="input-base pl-8 pr-8 w-full" />

```
**[ADDED]**
```
98                      placeholder="••••••••" className="input-base pl-8 pr-8 w-full" style={{ paddingLeft: '32px', paddingRight: '32px' }} />
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:52:38 PM*

**[REMOVED]**
```
(from line ~94)
                <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />

```
**[ADDED]**
```
94                    <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" style={{ top: '50%' }} />
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:52:09 PM*

**[REMOVED]**
```
(from line ~87)
                  placeholder="you@example.com" className="input-base pl-8 w-full"  />

```
**[ADDED]**
```
87                      placeholder="you@example.com" className="input-base pl-8 w-full" style={{ paddingLeft: '32px' }} />
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:52:08 PM*

**[REMOVED]**
```
(from line ~87)
                  placeholder="you@example.com" className="input-base pl-8 w-full" />

```
**[ADDED]**
```
87                      placeholder="you@example.com" className="input-base pl-8 w-full"  />
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:51:39 PM*

**[REMOVED]**
```
(from line ~84)
                <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />

```
**[ADDED]**
```
84                    <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" style={{ top: '50%' }} />
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:49:44 PM*

**[REMOVED]**
```
(from line ~84)
                <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />

```
**[ADDED]**
```
84                    <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:49:39 PM*

**[REMOVED]**
```
(from line ~84)
                <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />

```
**[ADDED]**
```
84                    <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:49:28 PM*

**[REMOVED]**
```
(from line ~87)
                  placeholder="you@example.com" className="input-base pl-19 w-full" />

```
**[ADDED]**
```
87                      placeholder="you@example.com" className="input-base pl-8 w-full" />
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:49:19 PM*

**[REMOVED]**
```
(from line ~87)
                  placeholder="you@example.com" className="input-base pl-1 w-full" />

```
**[ADDED]**
```
87                      placeholder="you@example.com" className="input-base pl-19 w-full" />
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:49:17 PM*

**[REMOVED]**
```
(from line ~87)
                  placeholder="you@example.com" className="input-base pl-10 w-full" />

```
**[ADDED]**
```
87                      placeholder="you@example.com" className="input-base pl-1 w-full" />
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:49:11 PM*

**[REMOVED]**
```
(from line ~87)
                  placeholder="you@example.com" className="input-base pl-8 w-full" />

```
**[ADDED]**
```
87                      placeholder="you@example.com" className="input-base pl-10 w-full" />
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:48:49 PM*

**[REMOVED]**
```
(from line ~86)
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}F

```
**[ADDED]**
```
86                      onKeyDown={e => e.key === 'Enter' && handleSubmit()}
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:48:48 PM*

**[REMOVED]**
```
(from line ~86)
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}

```
**[ADDED]**
```
86                      onKeyDown={e => e.key === 'Enter' && handleSubmit()}F
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:46:58 PM*

**[REMOVED]**
```
(from line ~92)
              <label className="text-[19px] text-ivory-dim uppercase tracking-wider mb-1.5 block">Password</label>

```
**[ADDED]**
```
92                  <label className="text-[10px] text-ivory-dim uppercase tracking-wider mb-1.5 block">Password</label>
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:46:53 PM*

**[REMOVED]**
```
(from line ~92)
              <label className="text-[1px] text-ivory-dim uppercase tracking-wider mb-1.5 block">Password</label>

```
**[ADDED]**
```
92                  <label className="text-[19px] text-ivory-dim uppercase tracking-wider mb-1.5 block">Password</label>
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:46:50 PM*

**[REMOVED]**
```
(from line ~92)
              <label className="text-[10px] text-ivory-dim uppercase tracking-wider mb-1.5 block">Password</label>

```
**[ADDED]**
```
92                  <label className="text-[1px] text-ivory-dim uppercase tracking-wider mb-1.5 block">Password</label>
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:46:10 PM*

**[REMOVED]**
```
(from line ~129)
                  </button>px

```
**[ADDED]**
```
129                     </button>
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:46:08 PM*

**[REMOVED]**
```
(from line ~129)
                  </button>

```
**[ADDED]**
```
129                     </button>px
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\styles\globals.css
*Saved at: 3/3/2026, 3:43:57 PM*

**[REMOVED]**
```
(from line ~24)
  --ink-500: #3A3A50;

```
**[ADDED]**
```
24      --ink-500: #5C5C7A;  /* readable as muted text in dark mode */
```
**[REMOVED]**
```
(from line ~303)
}

```
**[ADDED]**
```
303   }
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\page.tsx
*Saved at: 3/3/2026, 3:43:35 PM*

**[REMOVED]**
```
(from line ~61)
                className="text-xs text-ink-500 hover:text-ivory-muted transition-colors"

```
**[ADDED]**
```
61                    className="text-xs text-ivory-dim hover:text-ivory-muted transition-colors"
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 3:08:10 PM*

**[REMOVED]**
```
(from line ~24)
    if (!loading && user) router.replace('/builder');

```
**[ADDED]**
```
24        if (!loading && user) router.replace('/');
```
**[REMOVED]**
```
(from line ~38)
      else router.replace('/builder');

```
**[ADDED]**
```
38          else router.replace('/');   // ← go to landing, not builder
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\page.tsx
*Saved at: 3/3/2026, 3:07:58 PM*

**[REMOVED]**
```
(from line ~4)
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

```
**[REMOVED]**
```
(from line ~24)
  const router = useRouter();
  const { user, loading } = useAuth();

```
**[ADDED]**
```
24      const { user, loading, signOut } = useAuth();
```
**[REMOVED]**
```
(from line ~26)
  // Logged-in users have no reason to be on the landing page — send them to builder
  useEffect(() => {
    if (!loading && user) router.replace('/builder');
  }, [user, loading]);

```
**[ADDED]**
```
26      // Extract first name from email (e.g. "nitin" from "nitin@gmail.com")
27      const firstName = user?.email
28        ? user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1)
29        : null;
```
**[REMOVED]**
```
(from line ~42)
          <Link href="/builder" className="text-xs font-medium text-ivory-muted hover:text-ivory transition-colors animated-underline">Builder</Link>

```
**[REMOVED]**
```
(from line ~44)
          <Link href="/builder" className="px-4 py-2 text-xs font-semibold bg-gold text-ink-950 rounded-lg hover:bg-gold-light transition-colors">
            Start Building
          </Link>

```
**[ADDED]**
```
44              {loading ? (
45                // Skeleton while auth resolves
46                <div className="w-24 h-8 rounded-lg bg-ink-700 animate-pulse" />
47              ) : user ? (
48                // ── Logged-in state ──
49                <div className="flex items-center gap-3">
50                  <span className="text-xs text-ivory-muted font-mono">
51                    Hey, <span className="text-ivory font-semibold">{firstName}</span> 👋
52                  </span>
53                  <Link
54                    href="/builder"
55                    className="px-4 py-2 text-xs font-semibold bg-gold text-ink-950 rounded-lg hover:bg-gold-light transition-colors"
56                  >
57                    Open Builder →
58                  </Link>
59                  <button
60                    onClick={() => signOut()}
61                    className="text-xs text-ink-500 hover:text-ivory-muted transition-colors"
62                  >
63                    Sign out
64                  </button>
65                </div>
66              ) : (
67                // ── Guest state ──
68                <div className="flex items-center gap-3">
69                  <Link href="/login" className="text-xs font-medium text-ivory-muted hover:text-ivory transition-colors">
70                    Log In
71                  </Link>
72                  <Link
73                    href="/login"
74                    className="px-4 py-2 text-xs font-semibold bg-gold text-ink-950 rounded-lg hover:bg-gold-light transition-colors"
75                  >
76                    Get Started
77                  </Link>
78                </div>
79              )}
```
**[REMOVED]**
```
(from line ~131)
          {/* CTA */}

```
**[ADDED]**
```
131             {/* CTA — changes based on auth state */}
```
**[REMOVED]**
```
(from line ~138)
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-ink-950 font-semibold text-sm rounded-xl hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5"
            >
              Open Builder
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/builder?mode=upload"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-ink-600 text-ivory-muted text-sm rounded-xl hover:border-ivory/30 hover:text-ivory transition-all duration-300"
            >
              <Upload size={15} />
              Upload Resume
            </Link>

```
**[ADDED]**
```
138               {user ? (
139                 // Logged-in: go straight to builder
140                 <>
141                   <Link
142                     href="/builder"
143                     className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-ink-950 font-semibold text-sm rounded-xl hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5"
144                   >
145                     Open Builder
146                     <ArrowRight size={16} />
147                   </Link>
148                   <Link
149                     href="/builder?mode=upload"
150                     className="inline-flex items-center gap-2 px-7 py-3.5 border border-ink-600 text-ivory-muted text-sm rounded-xl hover:border-ivory/30 hover:text-ivory transition-all duration-300"
151                   >
152                     <Upload size={15} />
153                     Upload Resume
154                   </Link>
155                 </>
156               ) : (
157                 // Guest: go to login
158                 <>
159                   <Link
160                     href="/login"
161                     className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-ink-950 font-semibold text-sm rounded-xl hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5"
162                   >
163                     Get Started Free
164                     <ArrowRight size={16} />
165                   </Link>
166                   <Link
167                     href="/login"
168                     className="inline-flex items-center gap-2 px-7 py-3.5 border border-ink-600 text-ivory-muted text-sm rounded-xl hover:border-ivory/30 hover:text-ivory transition-all duration-300"
169                   >
170                     Log In
171                   </Link>
172                 </>
173               )}
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\page.tsx
*Saved at: 3/3/2026, 2:57:19 PM*

**[REMOVED]**
```
(from line ~1)
// src/app/builder/page.tsx

```
**[ADDED]**
```
1     // src/app/page.tsx
```
**[REMOVED]**
```
(from line ~4)
import { useState, useEffect, useCallback, useRef } from 'react';
import { Suspense } from 'react';

```
**[ADDED]**
```
4     import { useEffect } from 'react';
```
**[REMOVED]**
```
(from line ~6)
import { useSearchParams } from 'next/navigation';

```
**[REMOVED]**
```
(from line ~7)
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Download, FileCode, Eye, Loader2,
  Zap, Copy, Check, Save, LogOut, CloudOff, Cloud,
} from 'lucide-react';
import { ResumeData, SectionConfig, BuilderMode, ActiveSection, ALL_SECTIONS } from '@/lib/types';
import { generateLatex } from '@/lib/latexTemplate';
import { compileToPDF, downloadBlob, downloadLatex } from '@/lib/pdfCompiler';
import FormPanel from '@/components/builder/FormPanel';
import UploadMode from '@/components/builder/UploadMode';

```
**[ADDED]**
```
7     import { motion } from 'framer-motion';
8     import { ArrowRight, FileText, Upload, Cpu, Download, CheckCircle, Zap } from 'lucide-react';
```
**[REMOVED]**
```
(from line ~10)
import ResumeSwitcher from '@/components/builder/ResumeSwitcher';

```
**[REMOVED]**
```
(from line ~11)
import { useResumes } from '@/hooks/useResumes';

```
**[REMOVED]**
```
(from line ~12)
type PreviewTab = 'code' | 'preview';

```
**[ADDED]**
```
12    const features = [
13      { icon: FileText, title: 'Your Template, Your Rules', desc: 'Built around your exact LaTeX template. No generic defaults — it adapts to your structure.' },
14      { icon: Upload, title: 'Upload & Extract', desc: 'Drop your old PDF or DOCX resume. AI extracts every detail and maps it to your template fields.' },
15      { icon: Cpu, title: 'AI-Powered Parsing', desc: 'Claude AI reads your resume and structures the data into perfect JSON, ready to inject.' },
16      { icon: Download, title: 'Compile to PDF', desc: 'One click compiles your filled LaTeX code via LaTeX.online API. Download a pixel-perfect PDF.' },
17    ];
```
**[REMOVED]**
```
(from line ~19)
// Autosave debounce ms
const AUTOSAVE_DELAY = 2000;

```
**[ADDED]**
```
19    const steps = [
20      { num: '01', title: 'Choose your mode', desc: 'Fill the form manually, or upload your existing resume to auto-extract everything.' },
21      { num: '02', title: 'Review & Edit', desc: 'See the live LaTeX code update as you type. Tweak any field instantly.' },
22      { num: '03', title: 'Compile & Download', desc: 'Hit compile. Your LaTeX is sent to the compilation engine and returns a perfect PDF.' },
23    ];
```
**[REMOVED]**
```
(from line ~25)
function BuilderContent() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading, signOut } = useAuth();
  const {
    resumes, activeResume, loading: resumesLoading, saveStatus,
    save, rename, forkFromMaster, restoreToMaster, deleteResume, switchTo,
  } = useResumes();

```
**[ADDED]**
```
25    export default function HomePage() {
26      const router = useRouter();
27      const { user, loading } = useAuth();
```
**[REMOVED]**
```
(from line ~29)
  // Redirect to login if not authenticated

```
**[ADDED]**
```
29      // Logged-in users have no reason to be on the landing page — send them to builder
```
**[REMOVED]**
```
(from line ~31)
    if (!authLoading && !user) router.replace('/login');
  }, [user, authLoading]);

```
**[ADDED]**
```
31        if (!loading && user) router.replace('/builder');
32      }, [user, loading]);
```
**[REMOVED]**
```
(from line ~34)
  const initialMode = searchParams.get('mode') === 'upload' ? 'upload' : 'manual';
  const [mode, setMode]               = useState<BuilderMode>(initialMode);
  const [activeSection, setActiveSection] = useState<ActiveSection>('personal');
  const [latexCode, setLatexCode]     = useState('');
  const [previewTab, setPreviewTab]   = useState<PreviewTab>('code');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileError, setCompileError] = useState('');
  const [copied, setCopied]           = useState(false);
  const [pdfUrl, setPdfUrl]           = useState('');

  // Local editable copies of the active resume's data
  const [resumeData, setResumeData]         = useState<ResumeData | null>(null);
  const [sectionConfig, setSectionConfig]   = useState<SectionConfig[]>(ALL_SECTIONS);

  // Autosave timer
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDirty = useRef(false);

  // When active resume changes (switch/fork/restore), load its data
  useEffect(() => {
    if (!activeResume) return;
    setResumeData(activeResume.resume_data);
    setSectionConfig(
      activeResume.section_config?.length
        ? activeResume.section_config
        : ALL_SECTIONS
    );
    isDirty.current = false;
  }, [activeResume?.id]);

  // Regenerate LaTeX whenever data changes
  useEffect(() => {
    if (!resumeData) return;
    const code = generateLatex(resumeData, sectionConfig);
    setLatexCode(code);
    if (pdfUrl) { URL.revokeObjectURL(pdfUrl); setPdfUrl(''); }
  }, [resumeData, sectionConfig]);

  // Autosave handler
  const triggerAutosave = useCallback((data: ResumeData, config: SectionConfig[]) => {
    isDirty.current = true;
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      if (activeResume && isDirty.current) {
        save(activeResume.id, data, config);
        isDirty.current = false;
      }
    }, AUTOSAVE_DELAY);
  }, [activeResume, save]);

  const handleDataChange = (data: ResumeData) => {
    setResumeData(data);
    triggerAutosave(data, sectionConfig);
  };

  const handleConfigChange = (config: SectionConfig[]) => {
    setSectionConfig(config);
    if (resumeData) triggerAutosave(resumeData, config);
  };

  const handleManualSave = () => {
    if (activeResume && resumeData) {
      save(activeResume.id, resumeData, sectionConfig);
      isDirty.current = false;
    }
  };

  const handleCompile = async () => {
    setIsCompiling(true); setCompileError('');
    try {
      const blob = await compileToPDF(latexCode);
      const url  = URL.createObjectURL(blob);
      setPdfUrl(url); setPreviewTab('preview');
    } catch (err) {
      setCompileError(err instanceof Error ? err.message : 'Compilation failed');
    } finally { setIsCompiling(false); }
  };

  const handleDownloadPDF = async () => {
    const name = `${resumeData?.personal.name || 'resume'} - ${activeResume?.name || 'resume'}.pdf`;
    if (pdfUrl) {
      const a = document.createElement('a'); a.href = pdfUrl; a.download = name; a.click();
    } else {
      setIsCompiling(true);
      try { const blob = await compileToPDF(latexCode); downloadBlob(blob, name); }
      catch (err) { setCompileError(err instanceof Error ? err.message : 'Compilation failed'); }
      finally { setIsCompiling(false); }
    }
  };

  const handleCopyLatex = () => {
    navigator.clipboard.writeText(latexCode);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleParsedResume = useCallback((data: ResumeData) => {
    setResumeData(data); setMode('manual'); setActiveSection('personal');
    triggerAutosave(data, sectionConfig);
  }, [triggerAutosave, sectionConfig]);

  // Loading state
  if (authLoading || resumesLoading || !resumeData) {
    return (
      <div className="h-screen bg-ink-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={28} className="text-gold animate-spin mx-auto mb-3" />
          <p className="text-ivory-muted text-sm">Loading your resumes...</p>
        </div>
      </div>
    );
  }

  // Save status indicator
  const SaveIndicator = () => {
    if (saveStatus === 'saving') return (
      <span className="flex items-center gap-1.5 text-[10px] text-ivory-dim font-mono">
        <Loader2 size={10} className="animate-spin" /> Saving...
      </span>
    );
    if (saveStatus === 'saved') return (
      <span className="flex items-center gap-1.5 text-[10px] text-jade font-mono">
        <Cloud size={10} /> Saved
      </span>
    );
    if (saveStatus === 'error') return (
      <span className="flex items-center gap-1.5 text-[10px] text-crimson font-mono">
        <CloudOff size={10} /> Save failed
      </span>
    );
    return null;
  };


```
**[REMOVED]**
```
(from line ~35)
    <div className="h-screen bg-ink-950 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-ink-800 bg-ink-900/80 backdrop-blur-sm flex-shrink-0">

```
**[ADDED]**
```
35        <div className="min-h-screen bg-ink-950 overflow-x-hidden">
36          {/* Navbar */}
37          <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-ink-800/60 backdrop-blur-md bg-ink-950/80">
```
**[REMOVED]**
```
(from line ~39)
          <Link href="/" className="flex items-center gap-2 text-ivory-dim hover:text-ivory transition-colors text-xs">
            <ArrowLeft size={14} /><span className="font-mono">Home</span>
          </Link>
          <div className="w-px h-4 bg-ink-600" />
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border border-gold/40 flex items-center justify-center">
              <span className="text-gold text-[10px] font-mono font-bold">λ</span>
            </div>
            <span className="font-display text-xs text-ivory font-medium hidden sm:block">ResumeTeX</span>

```
**[ADDED]**
```
39              <div className="w-7 h-7 rounded border border-gold/40 flex items-center justify-center">
40                <span className="text-gold text-xs font-mono font-bold">λ</span>
```
**[ADDED]**
```
42              <span className="font-display font-medium text-ivory text-sm tracking-wide">ResumeTeX</span>
43            </div>
44            <div className="flex items-center gap-6">
45              <Link href="/builder" className="text-xs font-medium text-ivory-muted hover:text-ivory transition-colors animated-underline">Builder</Link>
46              <a href="https://latex.online" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-ivory-muted hover:text-ivory transition-colors animated-underline">LaTeX.online</a>
47              <ThemeToggle />
48              <Link href="/builder" className="px-4 py-2 text-xs font-semibold bg-gold text-ink-950 rounded-lg hover:bg-gold-light transition-colors">
49                Start Building
50              </Link>
51            </div>
52          </nav>
```
**[REMOVED]**
```
(from line ~54)
          {/* Resume Switcher */}
          <ResumeSwitcher
            resumes={resumes}
            activeResume={activeResume}
            onSwitch={switchTo}
            onFork={async (name) => { await forkFromMaster(name); }}
            onDelete={deleteResume}
            onRename={rename}
            onRestoreToMaster={(id) => restoreToMaster(id)}
          />

          {/* Mode toggle */}
          <div className="flex items-center bg-ink-800 rounded-lg p-0.5 border border-ink-700">
            {(['manual', 'upload'] as BuilderMode[]).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${mode === m ? 'bg-gold text-ink-950' : 'text-ivory-muted hover:text-ivory'}`}>
                {m === 'manual' ? 'Manual' : 'Upload'}
              </button>
            ))}
          </div>

```
**[ADDED]**
```
54          {/* Hero */}
55          <section className="relative min-h-screen flex items-center justify-center px-8 pt-20">
56            {/* Background */}
57            <div className="absolute inset-0 overflow-hidden">
58              <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
59              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-jade/5 blur-3xl" />
60              {/* Grid lines */}
61              <div className="absolute inset-0 opacity-[0.03]" style={{
62                backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
63                backgroundSize: '80px 80px',
64              }} />
```
**[REMOVED]**
```
(from line ~67)
        <div className="flex items-center gap-2">
          <SaveIndicator />
          <ThemeToggle />

```
**[ADDED]**
```
67            <div className="relative z-10 text-center max-w-4xl mx-auto">
68              {/* Badge */}
69              <motion.div
70                initial={{ opacity: 0, y: 10 }}
71                animate={{ opacity: 1, y: 0 }}
72                transition={{ duration: 0.5 }}
73                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-mono mb-8"
74              >
75                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
76                LaTeX-powered. AI-assisted. Yours.
77              </motion.div>
```
**[REMOVED]**
```
(from line ~79)
          <button onClick={handleManualSave} disabled={saveStatus === 'saving'}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-ink-600 text-ivory-muted rounded-lg hover:border-ivory/30 hover:text-ivory transition-all disabled:opacity-50">
            <Save size={12} /> Save
          </button>

```
**[ADDED]**
```
79              {/* Title */}
80              <motion.h1
81                initial={{ opacity: 0, y: 20 }}
82                animate={{ opacity: 1, y: 0 }}
83                transition={{ duration: 0.6, delay: 0.1 }}
84                className="font-display text-6xl md:text-7xl font-bold leading-[1.05] mb-6"
85              >
86                Your Resume,
87                <br />
88                <span className="text-shimmer">Perfectly Typeset</span>
89              </motion.h1>
```
**[REMOVED]**
```
(from line ~91)
          <button onClick={() => downloadLatex(latexCode, `${resumeData.personal.name || 'resume'}.tex`)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-ink-600 text-ivory-muted rounded-lg hover:border-ivory/30 hover:text-ivory transition-all">
            <FileCode size={12} /> .tex
          </button>

```
**[ADDED]**
```
91              {/* Subtitle */}
92              <motion.p
93                initial={{ opacity: 0, y: 20 }}
94                animate={{ opacity: 1, y: 0 }}
95                transition={{ duration: 0.6, delay: 0.2 }}
96                className="text-ivory-muted text-lg max-w-xl mx-auto mb-10 font-light leading-relaxed"
97              >
98                Fill your personal LaTeX resume template — manually or by uploading your old resume. 
99                AI extracts everything. One click compiles to PDF.
100             </motion.p>
```
**[REMOVED]**
```
(from line ~102)
          <button onClick={handleCompile} disabled={isCompiling}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gold/40 text-gold rounded-lg hover:bg-gold/10 transition-all disabled:opacity-50">
            {isCompiling ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />} Compile
          </button>

```
**[ADDED]**
```
102             {/* CTA */}
103             <motion.div
104               initial={{ opacity: 0, y: 20 }}
105               animate={{ opacity: 1, y: 0 }}
106               transition={{ duration: 0.6, delay: 0.3 }}
107               className="flex items-center justify-center gap-4"
108             >
109               <Link
110                 href="/builder"
111                 className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-ink-950 font-semibold text-sm rounded-xl hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5"
112               >
113                 Open Builder
114                 <ArrowRight size={16} />
115               </Link>
116               <Link
117                 href="/builder?mode=upload"
118                 className="inline-flex items-center gap-2 px-7 py-3.5 border border-ink-600 text-ivory-muted text-sm rounded-xl hover:border-ivory/30 hover:text-ivory transition-all duration-300"
119               >
120                 <Upload size={15} />
121                 Upload Resume
122               </Link>
123             </motion.div>
```
**[REMOVED]**
```
(from line ~125)
          <button onClick={handleDownloadPDF} disabled={isCompiling}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs bg-gold text-ink-950 font-semibold rounded-lg hover:bg-gold-light transition-all disabled:opacity-50">
            <Download size={12} /> PDF
          </button>

```
**[ADDED]**
```
125             {/* Preview mockup */}
126             <motion.div
127               initial={{ opacity: 0, y: 40 }}
128               animate={{ opacity: 1, y: 0 }}
129               transition={{ duration: 0.8, delay: 0.5 }}
130               className="mt-16 relative"
131             >
132               <div className="relative mx-auto max-w-3xl rounded-2xl border border-ink-700 bg-ink-900 overflow-hidden shadow-2xl shadow-black/60">
133                 {/* Window bar */}
134                 <div className="flex items-center gap-2 px-4 py-3 border-b border-ink-700 bg-ink-800">
135                   <div className="w-3 h-3 rounded-full bg-crimson/60" />
136                   <div className="w-3 h-3 rounded-full bg-gold/60" />
137                   <div className="w-3 h-3 rounded-full bg-jade/60" />
138                   <div className="ml-4 text-xs font-mono text-ivory-dim">resume.tex — ResumeTeX Builder</div>
139                 </div>
140                 {/* Split preview */}
141                 <div className="grid grid-cols-2 min-h-[280px]">
142                   {/* Form side */}
143                   <div className="p-5 border-r border-ink-700">
144                     <div className="text-xs font-mono text-gold/70 mb-4">// Personal Info</div>
145                     {['Full Name', 'Email Address', 'Phone Number', 'Location'].map((field, i) => (
146                       <div key={field} className="mb-3">
147                         <div className="text-[10px] text-ivory-dim mb-1">{field}</div>
148                         <div className="h-7 rounded bg-ink-700 border border-ink-600 animate-pulse" style={{ animationDelay: `${i * 0.1}s`, width: `${70 + i * 5}%` }} />
149                       </div>
150                     ))}
151                   </div>
152                   {/* Code side */}
153                   <div className="p-5 bg-ink-900">
154                     <div className="text-xs font-mono text-gold/70 mb-4">// LaTeX Output</div>
155                     <pre className="text-[10px] font-mono text-ivory-muted leading-5 opacity-70">{`\\begin{document}
156   \\textbf{\\Huge Alex Johnson}
```
**[REMOVED]**
```
(from line ~158)
          {/* User / Sign out */}
          <div className="w-px h-4 bg-ink-600" />
          <button onClick={signOut}
            className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-ink-500 hover:text-ivory-muted transition-colors"
            title={`Sign out (${user?.email})`}>
            <LogOut size={13} />
          </button>

```
**[ADDED]**
```
158   alex@email.com · +1 555 0192
159   San Francisco, CA
160   
161   \\section{Experience}
162   \\textbf{Senior Engineer}
163     \\item Led migration to...
164     \\item Reduced latency...`}</pre>
165                   </div>
166                 </div>
167               </div>
168             </motion.div>
```
**[REMOVED]**
```
(from line ~170)
      </header>

```
**[ADDED]**
```
170         </section>
```
**[REMOVED]**
```
(from line ~172)
      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[400px] flex-shrink-0 border-r border-ink-800 overflow-y-auto bg-ink-900">
          <AnimatePresence mode="wait">
            {mode === 'upload' ? (
              <motion.div key="upload" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="h-full">
                <UploadMode onParsed={handleParsedResume} />
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="h-full">
                <FormPanel
                  data={resumeData}
                  onChange={handleDataChange}
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                  sectionConfig={sectionConfig}
                  onSectionConfigChange={handleConfigChange}
                />
              </motion.div>
            )}
          </AnimatePresence>

```
**[ADDED]**
```
172         {/* Features */}
173         <section className="px-8 py-28 max-w-6xl mx-auto">
174           <div className="text-center mb-16">
175             <div className="section-label text-center justify-center flex">Capabilities</div>
176             <h2 className="font-display text-4xl font-bold text-ivory">Everything you need</h2>
```
**[ADDED]**
```
178           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
179             {features.map((f, i) => (
180               <motion.div
181                 key={f.title}
182                 initial={{ opacity: 0, y: 20 }}
183                 whileInView={{ opacity: 1, y: 0 }}
184                 viewport={{ once: true }}
185                 transition={{ delay: i * 0.1 }}
186                 className="card group hover:border-gold/30 transition-all duration-300"
187               >
188                 <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors">
189                   <f.icon size={18} className="text-gold" />
190                 </div>
191                 <h3 className="font-display font-semibold text-ivory text-base mb-2">{f.title}</h3>
192                 <p className="text-ivory-muted text-xs leading-relaxed">{f.desc}</p>
193               </motion.div>
194             ))}
195           </div>
196         </section>
```
**[REMOVED]**
```
(from line ~198)
        {/* Right Panel */}
        <div className="flex-1 flex flex-col overflow-hidden bg-ink-950">
          <div className="flex items-center justify-between px-5 py-2 border-b border-ink-800 bg-ink-900/50 flex-shrink-0">
            <div className="flex items-center bg-ink-800 rounded-lg p-0.5 border border-ink-700">
              <button onClick={() => setPreviewTab('code')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${previewTab === 'code' ? 'bg-ink-600 text-ivory' : 'text-ivory-muted hover:text-ivory'}`}>
                <FileCode size={12} /> LaTeX Code
              </button>
              <button onClick={() => setPreviewTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${previewTab === 'preview' ? 'bg-ink-600 text-ivory' : 'text-ivory-muted hover:text-ivory'}`}>
                <Eye size={12} /> PDF Preview
              </button>
            </div>
            {previewTab === 'code' && (
              <button onClick={handleCopyLatex} className="flex items-center gap-1.5 text-xs text-ivory-dim hover:text-ivory transition-colors">
                {copied ? <Check size={12} className="text-jade" /> : <Copy size={12} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
            {compileError && <span className="text-xs text-crimson font-mono">{compileError}</span>}

```
**[ADDED]**
```
198         {/* How it works */}
199         <section className="px-8 py-20 border-t border-ink-800">
200           <div className="max-w-4xl mx-auto">
201             <div className="text-center mb-16">
202               <div className="section-label text-center justify-center flex">Process</div>
203               <h2 className="font-display text-4xl font-bold text-ivory">How it works</h2>
```
**[REMOVED]**
```
(from line ~205)

          <AnimatePresence mode="wait">
            {previewTab === 'code' ? (
              <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 overflow-auto p-5">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-right select-none">
                    {latexCode.split('\n').map((_, i) => (
                      <div key={i} className="text-[10px] font-mono text-ink-500 leading-[20px]">{i + 1}</div>
                    ))}
                  </div>
                  <div className="flex-1 overflow-x-auto">
                    <pre className="latex-code leading-5">
                      {latexCode.split('\n').map((line, i) => (
                        <div key={i} className={`hover:bg-ink-800/40 px-1 rounded ${
                          line.startsWith('%') ? 'text-ink-500' :
                          line.startsWith('\\section') ? 'text-gold' :
                          line.startsWith('\\') ? 'text-jade/90' : 'text-ivory-muted'
                        }`}>{line || ' '}</div>
                      ))}
                    </pre>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex-1 overflow-hidden flex items-center justify-center bg-ink-900">
                {pdfUrl ? (
                  <iframe src={pdfUrl} className="w-full h-full border-0" title="PDF Preview" />
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-ink-800 border border-ink-700 flex items-center justify-center mx-auto mb-4">
                      <Eye size={24} className="text-ivory-dim" />
                    </div>
                    <p className="text-ivory-muted text-sm font-medium">No preview yet</p>
                    <p className="text-ivory-dim text-xs mt-1 mb-5">Click Compile to generate PDF preview</p>
                    <button onClick={handleCompile} disabled={isCompiling}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gold text-ink-950 font-semibold text-sm rounded-xl hover:bg-gold-light mx-auto disabled:opacity-50">
                      {isCompiling ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
                      {isCompiling ? 'Compiling...' : 'Compile Now'}
                    </button>
                  </div>

```
**[ADDED]**
```
205             <div className="grid md:grid-cols-3 gap-8">
206               {steps.map((step, i) => (
207                 <motion.div
208                   key={step.num}
209                   initial={{ opacity: 0, x: -20 }}
210                   whileInView={{ opacity: 1, x: 0 }}
211                   viewport={{ once: true }}
212                   transition={{ delay: i * 0.15 }}
213                   className="relative"
214                 >
215                   {i < steps.length - 1 && (
216                     <div className="hidden md:block absolute top-5 left-full w-full h-px bg-gradient-to-r from-gold/20 to-transparent -translate-y-1/2 z-0" />
```
**[ADDED]**
```
218                   <div className="font-mono text-3xl font-bold text-gold/20 mb-3">{step.num}</div>
219                   <h3 className="font-display font-semibold text-ivory text-lg mb-2">{step.title}</h3>
220                   <p className="text-ivory-muted text-sm leading-relaxed">{step.desc}</p>
```
**[REMOVED]**
```
(from line ~222)
            )}
          </AnimatePresence>

```
**[ADDED]**
```
222               ))}
223             </div>
```
**[REMOVED]**
```
(from line ~225)
      </div>

```
**[ADDED]**
```
225         </section>
226   
227         {/* CTA Footer */}
228         <section className="px-8 py-24 text-center">
229           <div className="max-w-2xl mx-auto">
230             <div className="inline-flex items-center gap-2 mb-4 text-xs font-mono text-jade">
231               <CheckCircle size={12} />
232               No account required. Runs in your browser.
233             </div>
234             <h2 className="font-display text-5xl font-bold text-ivory mb-6">
235               Build your resume <br />
236               <span className="text-shimmer">right now</span>
237             </h2>
238             <Link
239               href="/builder"
240               className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-ink-950 font-semibold rounded-xl hover:bg-gold-light transition-all hover:shadow-xl hover:shadow-gold/20"
241             >
242               <Zap size={16} />
243               Launch Builder
244             </Link>
245           </div>
246         </section>
247   
248         {/* Footer */}
249         <footer className="border-t border-ink-800 px-8 py-6 flex items-center justify-between text-xs text-ivory-dim font-mono">
250           <span>ResumeTeX — LaTeX Resume Builder</span>
251           <span>Powered by LaTeX.online API + Claude AI</span>
252         </footer>
```
**[REMOVED]**
```
(from line ~255)
}

export default function BuilderPage() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-ink-950 flex items-center justify-center">
        <Loader2 size={24} className="text-gold animate-spin" />
      </div>
    }>
      <BuilderContent />
    </Suspense>
  );

```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\builder\page.tsx
*Saved at: 3/3/2026, 2:56:57 PM*

**[REMOVED]**
```
(from line ~4)
import { useState, useEffect, useCallback } from 'react';

```
**[ADDED]**
```
4     import { useState, useEffect, useCallback, useRef } from 'react';
```
**[ADDED]**
```
6     import { useRouter } from 'next/navigation';
```
**[REMOVED]**
```
(from line ~8)
import Link from 'next/link';

```
**[REMOVED]**
```
(from line ~9)
import { ArrowLeft, Download, FileCode, Eye, Loader2, Zap, Copy, Check } from 'lucide-react';
import { ResumeData, defaultResumeData, BuilderMode, ActiveSection, SectionConfig, ALL_SECTIONS } from '@/lib/types';

```
**[ADDED]**
```
9     import {
10      ArrowLeft, Download, FileCode, Eye, Loader2,
11      Zap, Copy, Check, Save, LogOut, CloudOff, Cloud,
12      Undo2, RotateCcw,
13    } from 'lucide-react';
14    import { ResumeData, SectionConfig, BuilderMode, ActiveSection, ALL_SECTIONS } from '@/lib/types';
```
**[ADDED]**
```
20    import ResumeSwitcher from '@/components/builder/ResumeSwitcher';
21    import { useAuth } from '@/context/AuthContext';
22    import { useResumes } from '@/hooks/useResumes';
```
**[ADDED]**
```
26    const AUTOSAVE_DELAY = 2000;
27    const MAX_HISTORY    = 50;
28    
29    // ── Snapshot stored in undo history ─────────────────────────────────────────
30    interface Snapshot {
31      resumeData:    ResumeData;
32      sectionConfig: SectionConfig[];
33    }
34    
```
**[ADDED]**
```
36      const router       = useRouter();
```
**[REMOVED]**
```
(from line ~38)
  const initialMode = searchParams.get('mode') === 'upload' ? 'upload' : 'manual';

```
**[ADDED]**
```
38      const { user, loading: authLoading, signOut } = useAuth();
39      const {
40        resumes, activeResume, loading: resumesLoading, saveStatus,
41        save, rename, forkFromMaster, restoreToMaster, deleteResume, switchTo,
42      } = useResumes();
```
**[REMOVED]**
```
(from line ~44)
  const [mode, setMode] = useState<BuilderMode>(initialMode);
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

```
**[ADDED]**
```
44      useEffect(() => {
45        if (!authLoading && !user) router.replace('/login');
46      }, [user, authLoading]);
47    
48      const initialMode = searchParams.get('mode') === 'upload' ? 'upload' : 'manual';
49      const [mode, setMode]                 = useState<BuilderMode>(initialMode);
```
**[REMOVED]**
```
(from line ~51)
  const [sectionConfig, setSectionConfig] = useState<SectionConfig[]>(ALL_SECTIONS);
  const [latexCode, setLatexCode] = useState('');
  const [previewTab, setPreviewTab] = useState<PreviewTab>('code');
  const [isCompiling, setIsCompiling] = useState(false);

```
**[ADDED]**
```
51      const [latexCode, setLatexCode]       = useState('');
52      const [previewTab, setPreviewTab]     = useState<PreviewTab>('code');
53      const [isCompiling, setIsCompiling]   = useState(false);
```
**[REMOVED]**
```
(from line ~55)
  const [copied, setCopied] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

```
**[ADDED]**
```
55      const [copied, setCopied]             = useState(false);
56      const [pdfUrl, setPdfUrl]             = useState('');
```
**[REMOVED]**
```
(from line ~58)
  // Regenerate LaTeX whenever data OR section config changes

```
**[ADDED]**
```
58      const [resumeData, setResumeData]       = useState<ResumeData | null>(null);
59      const [sectionConfig, setSectionConfig] = useState<SectionConfig[]>(ALL_SECTIONS);
60    
61      // ── Undo history ────────────────────────────────────────────────────────────
62      // undoStack holds past snapshots; undoIndex is current position in stack
63      const undoStack  = useRef<Snapshot[]>([]);
64      const undoIndex  = useRef<number>(-1);
65      const skipPush   = useRef(false); // true when we're restoring from history
66      const [undoCount, setUndoCount] = useState(0); // reactive counter for UI
67    
68      const pushHistory = useCallback((snapshot: Snapshot) => {
69        if (skipPush.current) return;
70        // Trim any "future" states that were undone
71        undoStack.current = undoStack.current.slice(0, undoIndex.current + 1);
72        undoStack.current.push(snapshot);
73        if (undoStack.current.length > MAX_HISTORY) undoStack.current.shift();
74        undoIndex.current = undoStack.current.length - 1;
75        setUndoCount(undoIndex.current);
76      }, []);
77    
78      const handleUndo = useCallback(() => {
79        if (undoIndex.current <= 0) return;
80        undoIndex.current -= 1;
81        const snap = undoStack.current[undoIndex.current];
82        skipPush.current = true;
83        setResumeData(snap.resumeData);
84        setSectionConfig(snap.sectionConfig);
85        setUndoCount(undoIndex.current);
86        // allow next real change to push
87        setTimeout(() => { skipPush.current = false; }, 50);
88      }, []);
89    
90      // ── Autosave ─────────────────────────────────────────────────────────────────
91      const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
92      const isDirty       = useRef(false);
93      // lastSaved holds what's currently persisted in DB for this resume
94      const lastSaved     = useRef<Snapshot | null>(null);
95    
96      const triggerAutosave = useCallback((data: ResumeData, config: SectionConfig[]) => {
97        isDirty.current = true;
98        if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
99        autosaveTimer.current = setTimeout(() => {
100         if (activeResume && isDirty.current) {
101           save(activeResume.id, data, config);
102           lastSaved.current = { resumeData: data, sectionConfig: config };
103           isDirty.current = false;
104         }
105       }, AUTOSAVE_DELAY);
106     }, [activeResume, save]);
107   
108     // ── Load active resume ───────────────────────────────────────────────────────
```
**[REMOVED]**
```
(from line ~110)
    const code = generateLatex(resumeData, sectionConfig);
    setLatexCode(code);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl('');
    }

```
**[ADDED]**
```
110       if (!activeResume) return;
111       const snap: Snapshot = {
112         resumeData:    activeResume.resume_data,
113         sectionConfig: activeResume.section_config?.length ? activeResume.section_config : ALL_SECTIONS,
114       };
115       skipPush.current = true;
116       setResumeData(snap.resumeData);
117       setSectionConfig(snap.sectionConfig);
118       lastSaved.current  = snap;
119       undoStack.current  = [snap];
120       undoIndex.current  = 0;
121       setUndoCount(0);
122       isDirty.current = false;
123       setTimeout(() => { skipPush.current = false; }, 50);
124     }, [activeResume?.id]);
125   
126     // ── Regenerate LaTeX ─────────────────────────────────────────────────────────
127     useEffect(() => {
128       if (!resumeData) return;
129       setLatexCode(generateLatex(resumeData, sectionConfig));
130       if (pdfUrl) { URL.revokeObjectURL(pdfUrl); setPdfUrl(''); }
```
**[ADDED]**
```
133     // ── Keyboard shortcut Ctrl/Cmd+Z ────────────────────────────────────────────
134     useEffect(() => {
135       const onKey = (e: KeyboardEvent) => {
136         if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
137           e.preventDefault();
138           handleUndo();
139         }
140       };
141       window.addEventListener('keydown', onKey);
142       return () => window.removeEventListener('keydown', onKey);
143     }, [handleUndo]);
144   
145     // ── Data change handlers ─────────────────────────────────────────────────────
146     const handleDataChange = (data: ResumeData) => {
147       setResumeData(data);
148       pushHistory({ resumeData: data, sectionConfig });
149       triggerAutosave(data, sectionConfig);
150     };
151   
152     const handleConfigChange = (config: SectionConfig[]) => {
153       setSectionConfig(config);
154       if (resumeData) {
155         pushHistory({ resumeData, sectionConfig: config });
156         triggerAutosave(resumeData, config);
157       }
158     };
159   
160     // ── Restore to last cloud-saved state (discard all unsaved changes) ──────────
161     const handleRestoreCloud = useCallback(() => {
162       if (!lastSaved.current) return;
163       skipPush.current = true;
164       setResumeData(lastSaved.current.resumeData);
165       setSectionConfig(lastSaved.current.sectionConfig);
166       undoStack.current = [lastSaved.current];
167       undoIndex.current = 0;
168       setUndoCount(0);
169       isDirty.current = false;
170       setTimeout(() => { skipPush.current = false; }, 50);
171     }, []);
172   
173     // ── Manual save ──────────────────────────────────────────────────────────────
174     const handleManualSave = () => {
175       if (activeResume && resumeData) {
176         save(activeResume.id, resumeData, sectionConfig);
177         lastSaved.current = { resumeData, sectionConfig };
178         isDirty.current = false;
179       }
180     };
181   
182     // ── Compile / Download ───────────────────────────────────────────────────────
```
**[REMOVED]**
```
(from line ~184)
    setIsCompiling(true);
    setCompileError('');

```
**[ADDED]**
```
184       setIsCompiling(true); setCompileError('');
```
**[REMOVED]**
```
(from line ~187)
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

```
**[ADDED]**
```
187         setPdfUrl(URL.createObjectURL(blob));
```
**[REMOVED]**
```
(from line ~191)
    } finally {
      setIsCompiling(false);
    }

```
**[ADDED]**
```
191       } finally { setIsCompiling(false); }
```
**[ADDED]**
```
195       const filename = `${resumeData?.personal.name || 'resume'} - ${activeResume?.name || 'resume'}.pdf`;
```
**[REMOVED]**
```
(from line ~197)
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = `${resumeData.personal.name || 'resume'}.pdf`;
      a.click();

```
**[ADDED]**
```
197         const a = document.createElement('a'); a.href = pdfUrl; a.download = filename; a.click();
```
**[REMOVED]**
```
(from line ~200)
      try {
        const blob = await compileToPDF(latexCode);
        downloadBlob(blob, `${resumeData.personal.name || 'resume'}.pdf`);
      } catch (err) {
        setCompileError(err instanceof Error ? err.message : 'Compilation failed');
      } finally {
        setIsCompiling(false);
      }

```
**[ADDED]**
```
200         try { downloadBlob(await compileToPDF(latexCode), filename); }
201         catch (err) { setCompileError(err instanceof Error ? err.message : 'Compilation failed'); }
202         finally { setIsCompiling(false); }
```
**[REMOVED]**
```
(from line ~208)
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

```
**[ADDED]**
```
208       setCopied(true); setTimeout(() => setCopied(false), 2000);
```
**[REMOVED]**
```
(from line ~212)
    setResumeData(data);
    setMode('manual');
    setActiveSection('personal');
  }, []);

```
**[ADDED]**
```
212       setResumeData(data); setMode('manual'); setActiveSection('personal');
213       pushHistory({ resumeData: data, sectionConfig });
214       triggerAutosave(data, sectionConfig);
215     }, [pushHistory, triggerAutosave, sectionConfig]);
```
**[REMOVED]**
```
(from line ~217)
  const wordCount = resumeData.personal.name ? [
    resumeData.personal.name,
    ...resumeData.experience.map(e => e.role),
    ...resumeData.education.map(e => e.institution),
  ].filter(Boolean).length : 0;

```
**[ADDED]**
```
217     // ── Loading ──────────────────────────────────────────────────────────────────
218     if (authLoading || resumesLoading || !resumeData) {
219       return (
220         <div className="h-screen bg-ink-950 flex items-center justify-center">
221           <div className="text-center">
222             <Loader2 size={28} className="text-gold animate-spin mx-auto mb-3" />
223             <p className="text-ivory-muted text-sm">Loading your resumes...</p>
224           </div>
225         </div>
226       );
227     }
```
**[ADDED]**
```
229     // ── Save status indicator ────────────────────────────────────────────────────
230     const SaveIndicator = () => {
231       if (saveStatus === 'saving') return (
232         <span className="flex items-center gap-1.5 text-[10px] text-ivory-dim font-mono">
233           <Loader2 size={10} className="animate-spin" /> Saving...
234         </span>
235       );
236       if (saveStatus === 'saved') return (
237         <span className="flex items-center gap-1.5 text-[10px] text-jade font-mono">
238           <Cloud size={10} /> Saved
239         </span>
240       );
241       if (saveStatus === 'error') return (
242         <span className="flex items-center gap-1.5 text-[10px] text-crimson font-mono">
243           <CloudOff size={10} /> Save failed
244         </span>
245       );
246       return null;
247     };
248   
249     const canUndo = undoCount > 0;
250   
```
**[REMOVED]**
```
(from line ~253)
      {/* Top Bar */}

```
**[ADDED]**
```
253         {/* ── Top Bar ───────────────────────────────────────────────────────────── */}
```
**[REMOVED]**
```
(from line ~255)
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-ivory-dim hover:text-ivory transition-colors text-xs">

```
**[ADDED]**
```
255           <div className="flex items-center gap-3">
256   
257             {/* Back button — uses router.back() so it always goes to previous page */}
258             <button
259               onClick={() => router.back()}
260               className="flex items-center gap-1.5 text-ivory-dim hover:text-ivory transition-colors text-xs"
261             >
```
**[REMOVED]**
```
(from line ~263)
            <span className="font-mono">Home</span>
          </Link>

```
**[ADDED]**
```
263               <span className="font-mono">Back</span>
264             </button>
265   
```
**[ADDED]**
```
267   
```
**[REMOVED]**
```
(from line ~272)
            <span className="font-display text-xs text-ivory font-medium">ResumeTeX Builder</span>

```
**[ADDED]**
```
272               <span className="font-display text-xs text-ivory font-medium hidden sm:block">ResumeTeX</span>
```
**[REMOVED]**
```
(from line ~274)
          <div className="flex items-center bg-ink-800 rounded-lg p-0.5 border border-ink-700 ml-2">
            {(['manual', 'upload'] as BuilderMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 capitalize ${
                  mode === m ? 'bg-gold text-ink-950' : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                {m === 'manual' ? 'Manual' : 'Upload Resume'}

```
**[ADDED]**
```
274   
275             {/* Resume Switcher */}
276             <ResumeSwitcher
277               resumes={resumes}
278               activeResume={activeResume}
279               onSwitch={switchTo}
280               onFork={async (name) => { await forkFromMaster(name); }}
281               onDelete={deleteResume}
282               onRename={rename}
283               onRestoreToMaster={(id) => restoreToMaster(id)}
284             />
285   
286             {/* Mode toggle */}
287             <div className="flex items-center bg-ink-800 rounded-lg p-0.5 border border-ink-700">
288               {(['manual', 'upload'] as BuilderMode[]).map(m => (
289                 <button key={m} onClick={() => setMode(m)}
290                   className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${mode === m ? 'bg-gold text-ink-950' : 'text-ivory-muted hover:text-ivory'}`}>
291                   {m === 'manual' ? 'Manual' : 'Upload'}
```
**[REMOVED]**
```
(from line ~298)
          {wordCount > 0 && (
            <span className="text-[10px] font-mono text-ivory-dim bg-ink-800 px-2 py-1 rounded">
              {wordCount} fields filled
            </span>
          )}

```
**[ADDED]**
```
298             <SaveIndicator />
```
**[ADDED]**
```
300   
301             {/* ── Undo button ── */}
```
**[REMOVED]**
```
(from line ~303)
            onClick={() => downloadLatex(latexCode, `${resumeData.personal.name || 'resume'}.tex`)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-ink-600 text-ivory-muted rounded-lg hover:border-ivory/30 hover:text-ivory transition-all"

```
**[ADDED]**
```
303               onClick={handleUndo}
304               disabled={!canUndo}
305               title={canUndo ? `Undo (${undoCount} step${undoCount !== 1 ? 's' : ''} available) · Ctrl+Z` : 'Nothing to undo'}
306               className={`flex items-center gap-1.5 px-3 py-1.5 text-xs border rounded-lg transition-all ${
307                 canUndo
308                   ? 'border-ink-600 text-ivory-muted hover:border-ivory/30 hover:text-ivory'
309                   : 'border-ink-700 text-ink-600 cursor-not-allowed'
310               }`}
```
**[REMOVED]**
```
(from line ~312)
            <FileCode size={12} />
            .tex

```
**[ADDED]**
```
312               <Undo2 size={12} />
313               {canUndo && <span className="font-mono text-[10px] text-ink-500">{undoCount}</span>}
```
**[ADDED]**
```
315   
316             {/* ── Restore to last cloud save ── */}
```
**[REMOVED]**
```
(from line ~318)
            onClick={handleCompile}
            disabled={isCompiling}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gold/40 text-gold rounded-lg hover:bg-gold/10 transition-all disabled:opacity-50"

```
**[ADDED]**
```
318               onClick={handleRestoreCloud}
319               title="Discard all unsaved changes and restore the last cloud-saved version"
320               className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-ink-600 text-ivory-muted rounded-lg hover:border-crimson/40 hover:text-crimson transition-all"
```
**[REMOVED]**
```
(from line ~322)
            {isCompiling ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />}
            Compile

```
**[ADDED]**
```
322               <RotateCcw size={12} />
323               Rollback
```
**[REMOVED]**
```
(from line ~325)
          <button
            onClick={handleDownloadPDF}
            disabled={isCompiling}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs bg-gold text-ink-950 font-semibold rounded-lg hover:bg-gold-light transition-all disabled:opacity-50"
          >
            <Download size={12} />
            PDF

```
**[ADDED]**
```
325   
326             {/* ── Manual save ── */}
327             <button onClick={handleManualSave} disabled={saveStatus === 'saving'}
328               className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-ink-600 text-ivory-muted rounded-lg hover:border-ivory/30 hover:text-ivory transition-all disabled:opacity-50">
329               <Save size={12} /> Save
```
**[ADDED]**
```
331   
332             <button onClick={() => downloadLatex(latexCode, `${resumeData.personal.name || 'resume'}.tex`)}
333               className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-ink-600 text-ivory-muted rounded-lg hover:border-ivory/30 hover:text-ivory transition-all">
334               <FileCode size={12} /> .tex
335             </button>
336   
337             <button onClick={handleCompile} disabled={isCompiling}
338               className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gold/40 text-gold rounded-lg hover:bg-gold/10 transition-all disabled:opacity-50">
339               {isCompiling ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />} Compile
340             </button>
341   
342             <button onClick={handleDownloadPDF} disabled={isCompiling}
343               className="flex items-center gap-1.5 px-4 py-1.5 text-xs bg-gold text-ink-950 font-semibold rounded-lg hover:bg-gold-light transition-all disabled:opacity-50">
344               <Download size={12} /> PDF
345             </button>
346   
347             <div className="w-px h-4 bg-ink-600" />
348             <button onClick={signOut} title={`Sign out (${user?.email})`}
349               className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-ink-500 hover:text-ivory-muted transition-colors">
350               <LogOut size={13} />
351             </button>
```
**[REMOVED]**
```
(from line ~355)
      {/* Main Layout */}

```
**[ADDED]**
```
355         {/* ── Main ──────────────────────────────────────────────────────────────── */}
```
**[REMOVED]**
```
(from line ~367)
                  onChange={setResumeData}

```
**[ADDED]**
```
367                     onChange={handleDataChange}
```
**[REMOVED]**
```
(from line ~371)
                  onSectionConfigChange={setSectionConfig}

```
**[ADDED]**
```
371                     onSectionConfigChange={handleConfigChange}
```
**[REMOVED]**
```
(from line ~383)
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${previewTab === 'code' ? 'bg-ink-600 text-ivory' : 'text-ivory-muted hover:text-ivory'}`}>

```
**[ADDED]**
```
383                   className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${previewTab === 'code' ? 'bg-ink-600 text-ivory' : 'text-ivory-muted hover:text-ivory'}`}>
```
**[REMOVED]**
```
(from line ~387)
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${previewTab === 'preview' ? 'bg-ink-600 text-ivory' : 'text-ivory-muted hover:text-ivory'}`}>

```
**[ADDED]**
```
387                   className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${previewTab === 'preview' ? 'bg-ink-600 text-ivory' : 'text-ivory-muted hover:text-ivory'}`}>
```
**[REMOVED]**
```
(from line ~402)
              <motion.div key="code-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 overflow-auto p-5">

```
**[ADDED]**
```
402                 <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 overflow-auto p-5">
```
**[REMOVED]**
```
(from line ~415)
                          line.startsWith('\\') ? 'text-jade/90' :
                          'text-ivory-muted'
                        }`}>
                          {line || ' '}
                        </div>

```
**[ADDED]**
```
415                             line.startsWith('\\') ? 'text-jade/90' : 'text-ivory-muted'
416                           }`}>{line || ' '}</div>
```
**[REMOVED]**
```
(from line ~423)
              <motion.div key="preview-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}

```
**[ADDED]**
```
423                 <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
```
**[REMOVED]**
```
(from line ~435)
                      className="flex items-center gap-2 px-5 py-2.5 bg-gold text-ink-950 font-semibold text-sm rounded-xl hover:bg-gold-light transition-all mx-auto disabled:opacity-50">

```
**[ADDED]**
```
435                         className="flex items-center gap-2 px-5 py-2.5 bg-gold text-ink-950 font-semibold text-sm rounded-xl hover:bg-gold-light mx-auto disabled:opacity-50">
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\components\builder\ResumeSwitcher.tsx
*Saved at: 3/3/2026, 2:26:50 PM*

**[ADDED]**
```
1     // src/components/builder/ResumeSwitcher.tsx
2     'use client';
3     
4     import { useState, useRef, useEffect } from 'react';
5     import { motion, AnimatePresence } from 'framer-motion';
6     import {
7       ChevronDown, Crown, Plus, Trash2, RotateCcw,
8       Pencil, Check, X, GitFork,
9     } from 'lucide-react';
10    import { ResumeRecord } from '@/hooks/useResumes';
11    
12    interface ResumeSwitcherProps {
13      resumes: ResumeRecord[];
14      activeResume: ResumeRecord | null;
15      onSwitch: (id: string) => void;
16      onFork: (name: string) => Promise<void>;
17      onDelete: (id: string) => void;
18      onRename: (id: string, name: string) => void;
19      onRestoreToMaster: (id: string) => void;
20    }
21    
22    export default function ResumeSwitcher({
23      resumes, activeResume,
24      onSwitch, onFork, onDelete, onRename, onRestoreToMaster,
25    }: ResumeSwitcherProps) {
26      const [open, setOpen]           = useState(false);
27      const [forking, setForking]     = useState(false);
28      const [forkName, setForkName]   = useState('');
29      const [editingId, setEditingId] = useState<string | null>(null);
30      const [editDraft, setEditDraft] = useState('');
31      const dropdownRef = useRef<HTMLDivElement>(null);
32    
33      // Close on outside click
34      useEffect(() => {
35        const handler = (e: MouseEvent) => {
36          if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
37            setOpen(false); setForking(false);
38          }
39        };
40        document.addEventListener('mousedown', handler);
41        return () => document.removeEventListener('mousedown', handler);
42      }, []);
43    
44      const handleFork = async () => {
45        if (!forkName.trim()) return;
46        await onFork(forkName.trim());
47        setForkName(''); setForking(false); setOpen(false);
48      };
49    
50      const startRename = (r: ResumeRecord, e: React.MouseEvent) => {
51        e.stopPropagation();
52        setEditingId(r.id);
53        setEditDraft(r.name);
54      };
55    
56      const commitRename = (id: string) => {
57        if (editDraft.trim()) onRename(id, editDraft.trim());
58        setEditingId(null);
59      };
60    
61      return (
62        <div className="relative" ref={dropdownRef}>
63          {/* Trigger */}
64          <button
65            onClick={() => setOpen(!open)}
66            className="flex items-center gap-2 px-3 py-1.5 bg-ink-800 border border-ink-600 hover:border-ink-500 rounded-lg transition-all max-w-[200px]"
67          >
68            {activeResume?.is_master && <Crown size={11} className="text-gold flex-shrink-0" />}
69            <span className="text-xs text-ivory truncate">{activeResume?.name ?? 'Select Resume'}</span>
70            <ChevronDown size={12} className={`text-ink-500 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
71          </button>
72    
73          {/* Dropdown */}
74          <AnimatePresence>
75            {open && (
76              <motion.div
77                initial={{ opacity: 0, y: -6, scale: 0.97 }}
78                animate={{ opacity: 1, y: 0, scale: 1 }}
79                exit={{ opacity: 0, y: -6, scale: 0.97 }}
80                transition={{ duration: 0.15 }}
81                className="absolute left-0 top-full mt-1.5 w-72 bg-ink-800 border border-ink-600 rounded-xl shadow-2xl overflow-hidden z-50"
82              >
83                {/* Resume list */}
84                <div className="max-h-64 overflow-y-auto">
85                  {resumes.map(r => (
86                    <div
87                      key={r.id}
88                      onClick={() => { if (editingId !== r.id) { onSwitch(r.id); setOpen(false); } }}
89                      className={`group flex items-center gap-2 px-3 py-2.5 cursor-pointer transition-colors ${
90                        activeResume?.id === r.id ? 'bg-gold/10' : 'hover:bg-ink-700'
91                      }`}
92                    >
93                      {r.is_master ? (
94                        <Crown size={12} className="text-gold flex-shrink-0" />
95                      ) : (
96                        <GitFork size={12} className="text-ivory-dim flex-shrink-0" />
97                      )}
98    
99                      {editingId === r.id ? (
100                       <input
101                         autoFocus
102                         value={editDraft}
103                         onChange={e => setEditDraft(e.target.value)}
104                         onKeyDown={e => {
105                           if (e.key === 'Enter') commitRename(r.id);
106                           if (e.key === 'Escape') setEditingId(null);
107                         }}
108                         onBlur={() => commitRename(r.id)}
109                         onClick={e => e.stopPropagation()}
110                         className="flex-1 bg-ink-700 border border-gold/40 rounded px-1.5 py-0.5 text-xs text-ivory focus:outline-none"
111                       />
112                     ) : (
113                       <div className="flex-1 min-w-0">
114                         <p className={`text-xs font-medium truncate ${activeResume?.id === r.id ? 'text-ivory' : 'text-ivory-muted'}`}>
115                           {r.name}
116                         </p>
117                         <p className="text-[9px] text-ink-500 font-mono">
118                           {r.is_master ? 'Master · always up to date' : `Saved ${new Date(r.updated_at).toLocaleDateString()}`}
119                         </p>
120                       </div>
121                     )}
122   
123                     {/* Row actions */}
124                     {editingId === r.id ? (
125                       <div className="flex gap-0.5">
126                         <button onMouseDown={e => { e.preventDefault(); commitRename(r.id); }} className="p-1 text-jade"><Check size={11} /></button>
127                         <button onMouseDown={e => { e.preventDefault(); setEditingId(null); }} className="p-1 text-crimson"><X size={11} /></button>
128                       </div>
129                     ) : (
130                       <div className="hidden group-hover:flex items-center gap-0.5">
131                         <button onClick={e => startRename(r, e)} className="p-1 text-ink-500 hover:text-ivory-muted" title="Rename">
132                           <Pencil size={11} />
133                         </button>
134                         {!r.is_master && (
135                           <>
136                             <button onClick={e => { e.stopPropagation(); onRestoreToMaster(r.id); setOpen(false); }}
137                               className="p-1 text-ink-500 hover:text-gold" title="Restore to Master">
138                               <RotateCcw size={11} />
139                             </button>
140                             <button onClick={e => { e.stopPropagation(); onDelete(r.id); }}
141                               className="p-1 text-ink-500 hover:text-crimson" title="Delete">
142                               <Trash2 size={11} />
143                             </button>
144                           </>
145                         )}
146                       </div>
147                     )}
148                   </div>
149                 ))}
150               </div>
151   
152               {/* Divider + Fork action */}
153               <div className="border-t border-ink-700">
154                 {forking ? (
155                   <div className="flex items-center gap-2 px-3 py-2">
156                     <input
157                       autoFocus
158                       value={forkName}
159                       onChange={e => setForkName(e.target.value)}
160                       onKeyDown={e => { if (e.key === 'Enter') handleFork(); if (e.key === 'Escape') setForking(false); }}
161                       placeholder="e.g. Data Analyst - Google"
162                       className="flex-1 bg-ink-700 border border-gold/40 rounded-lg px-2.5 py-1.5 text-xs text-ivory placeholder-ink-500 focus:outline-none focus:ring-1 focus:ring-gold/40"
163                     />
164                     <button onClick={handleFork} className="p-1.5 text-jade hover:text-jade"><Check size={13} /></button>
165                     <button onClick={() => setForking(false)} className="p-1.5 text-crimson/70 hover:text-crimson"><X size={13} /></button>
166                   </div>
167                 ) : (
168                   <button
169                     onClick={() => setForking(true)}
170                     className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-ink-700 transition-colors"
171                   >
172                     <Plus size={12} className="text-gold flex-shrink-0" />
173                     <span className="text-xs text-gold font-medium">Fork from Master</span>
174                     <span className="text-[9px] text-ink-500 ml-auto">new version</span>
175                   </button>
176                 )}
177               </div>
178             </motion.div>
179           )}
180         </AnimatePresence>
181       </div>
182     );
183   }
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\layout.tsx
*Saved at: 3/3/2026, 2:26:23 PM*

**[ADDED]**
```
5     import { AuthProvider } from '@/context/AuthContext';
```
**[REMOVED]**
```
(from line ~9)
  description: 'Build a perfectly typeset LaTeX resume. Fill manually or upload your existing resume and let AI extract everything.',
  keywords: ['LaTeX resume', 'resume builder', 'ATS-friendly resume', 'professional resume'],

```
**[ADDED]**
```
9       description: 'Build a perfectly typeset LaTeX resume with AI-powered parsing.',
```
**[REMOVED]**
```
(from line ~16)
        <ThemeProvider>
          {children}
        </ThemeProvider>

```
**[ADDED]**
```
16            <AuthProvider>
17              <ThemeProvider>
18                {children}
19              </ThemeProvider>
20            </AuthProvider>
```
**[REMOVED]**
```
(from line ~24)
}

```
**[ADDED]**
```
24    }
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\layout.tsx
*Saved at: 3/3/2026, 2:26:20 PM*

**[REMOVED]**
```
(from line ~5)
import { AuthProvider } from '@/context/AuthContext';

```
**[REMOVED]**
```
(from line ~8)
  description: 'Build a perfectly typeset LaTeX resume with AI-powered parsing.',

```
**[ADDED]**
```
8       description: 'Build a perfectly typeset LaTeX resume. Fill manually or upload your existing resume and let AI extract everything.',
9       keywords: ['LaTeX resume', 'resume builder', 'ATS-friendly resume', 'professional resume'],
```
**[REMOVED]**
```
(from line ~16)
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>

```
**[ADDED]**
```
16            <ThemeProvider>
17              {children}
18            </ThemeProvider>
```
**[REMOVED]**
```
(from line ~22)
}
```
**[ADDED]**
```
22    }
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\layout.tsx
*Saved at: 3/3/2026, 2:26:18 PM*

**[ADDED]**
```
5     import { AuthProvider } from '@/context/AuthContext';
```
**[REMOVED]**
```
(from line ~9)
  description: 'Build a perfectly typeset LaTeX resume. Fill manually or upload your existing resume and let AI extract everything.',
  keywords: ['LaTeX resume', 'resume builder', 'ATS-friendly resume', 'professional resume'],

```
**[ADDED]**
```
9       description: 'Build a perfectly typeset LaTeX resume with AI-powered parsing.',
```
**[REMOVED]**
```
(from line ~16)
        <ThemeProvider>
          {children}
        </ThemeProvider>

```
**[ADDED]**
```
16            <AuthProvider>
17              <ThemeProvider>
18                {children}
19              </ThemeProvider>
20            </AuthProvider>
```
**[REMOVED]**
```
(from line ~24)
}

```
**[ADDED]**
```
24    }
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\page.tsx
*Saved at: 3/3/2026, 2:26:07 PM*

**[REMOVED]**
```
(from line ~1)
// src/app/page.tsx

```
**[ADDED]**
```
1     // src/app/builder/page.tsx
```
**[ADDED]**
```
4     import { useState, useEffect, useCallback, useRef } from 'react';
5     import { Suspense } from 'react';
6     import { useRouter } from 'next/navigation';
7     import { useSearchParams } from 'next/navigation';
```
**[REMOVED]**
```
(from line ~9)
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Upload, Cpu, Download, CheckCircle, Zap } from 'lucide-react';

```
**[ADDED]**
```
9     import { motion, AnimatePresence } from 'framer-motion';
10    import {
11      ArrowLeft, Download, FileCode, Eye, Loader2,
12      Zap, Copy, Check, Save, LogOut, CloudOff, Cloud,
13    } from 'lucide-react';
14    import { ResumeData, SectionConfig, BuilderMode, ActiveSection, ALL_SECTIONS } from '@/lib/types';
15    import { generateLatex } from '@/lib/latexTemplate';
16    import { compileToPDF, downloadBlob, downloadLatex } from '@/lib/pdfCompiler';
17    import FormPanel from '@/components/builder/FormPanel';
18    import UploadMode from '@/components/builder/UploadMode';
```
**[ADDED]**
```
20    import ResumeSwitcher from '@/components/builder/ResumeSwitcher';
21    import { useAuth } from '@/context/AuthContext';
22    import { useResumes } from '@/hooks/useResumes';
```
**[REMOVED]**
```
(from line ~24)
const features = [
  { icon: FileText, title: 'Your Template, Your Rules', desc: 'Built around your exact LaTeX template. No generic defaults — it adapts to your structure.' },
  { icon: Upload, title: 'Upload & Extract', desc: 'Drop your old PDF or DOCX resume. AI extracts every detail and maps it to your template fields.' },
  { icon: Cpu, title: 'AI-Powered Parsing', desc: 'Claude AI reads your resume and structures the data into perfect JSON, ready to inject.' },
  { icon: Download, title: 'Compile to PDF', desc: 'One click compiles your filled LaTeX code via LaTeX.online API. Download a pixel-perfect PDF.' },
];

```
**[ADDED]**
```
24    type PreviewTab = 'code' | 'preview';
```
**[REMOVED]**
```
(from line ~26)
const steps = [
  { num: '01', title: 'Choose your mode', desc: 'Fill the form manually, or upload your existing resume to auto-extract everything.' },
  { num: '02', title: 'Review & Edit', desc: 'See the live LaTeX code update as you type. Tweak any field instantly.' },
  { num: '03', title: 'Compile & Download', desc: 'Hit compile. Your LaTeX is sent to the compilation engine and returns a perfect PDF.' },
];

```
**[ADDED]**
```
26    // Autosave debounce ms
27    const AUTOSAVE_DELAY = 2000;
```
**[REMOVED]**
```
(from line ~29)
export default function HomePage() {

```
**[ADDED]**
```
29    function BuilderContent() {
30      const router       = useRouter();
31      const searchParams = useSearchParams();
32      const { user, loading: authLoading, signOut } = useAuth();
33      const {
34        resumes, activeResume, loading: resumesLoading, saveStatus,
35        save, rename, forkFromMaster, restoreToMaster, deleteResume, switchTo,
36      } = useResumes();
37    
38      // Redirect to login if not authenticated
39      useEffect(() => {
40        if (!authLoading && !user) router.replace('/login');
41      }, [user, authLoading]);
42    
43      const initialMode = searchParams.get('mode') === 'upload' ? 'upload' : 'manual';
44      const [mode, setMode]               = useState<BuilderMode>(initialMode);
45      const [activeSection, setActiveSection] = useState<ActiveSection>('personal');
46      const [latexCode, setLatexCode]     = useState('');
47      const [previewTab, setPreviewTab]   = useState<PreviewTab>('code');
48      const [isCompiling, setIsCompiling] = useState(false);
49      const [compileError, setCompileError] = useState('');
50      const [copied, setCopied]           = useState(false);
51      const [pdfUrl, setPdfUrl]           = useState('');
52    
53      // Local editable copies of the active resume's data
54      const [resumeData, setResumeData]         = useState<ResumeData | null>(null);
55      const [sectionConfig, setSectionConfig]   = useState<SectionConfig[]>(ALL_SECTIONS);
56    
57      // Autosave timer
58      const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
59      const isDirty = useRef(false);
60    
61      // When active resume changes (switch/fork/restore), load its data
62      useEffect(() => {
63        if (!activeResume) return;
64        setResumeData(activeResume.resume_data);
65        setSectionConfig(
66          activeResume.section_config?.length
67            ? activeResume.section_config
68            : ALL_SECTIONS
69        );
70        isDirty.current = false;
71      }, [activeResume?.id]);
72    
73      // Regenerate LaTeX whenever data changes
74      useEffect(() => {
75        if (!resumeData) return;
76        const code = generateLatex(resumeData, sectionConfig);
77        setLatexCode(code);
78        if (pdfUrl) { URL.revokeObjectURL(pdfUrl); setPdfUrl(''); }
79      }, [resumeData, sectionConfig]);
80    
81      // Autosave handler
82      const triggerAutosave = useCallback((data: ResumeData, config: SectionConfig[]) => {
83        isDirty.current = true;
84        if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
85        autosaveTimer.current = setTimeout(() => {
86          if (activeResume && isDirty.current) {
87            save(activeResume.id, data, config);
88            isDirty.current = false;
89          }
90        }, AUTOSAVE_DELAY);
91      }, [activeResume, save]);
92    
93      const handleDataChange = (data: ResumeData) => {
94        setResumeData(data);
95        triggerAutosave(data, sectionConfig);
96      };
97    
98      const handleConfigChange = (config: SectionConfig[]) => {
99        setSectionConfig(config);
100       if (resumeData) triggerAutosave(resumeData, config);
101     };
102   
103     const handleManualSave = () => {
104       if (activeResume && resumeData) {
105         save(activeResume.id, resumeData, sectionConfig);
106         isDirty.current = false;
107       }
108     };
109   
110     const handleCompile = async () => {
111       setIsCompiling(true); setCompileError('');
112       try {
113         const blob = await compileToPDF(latexCode);
114         const url  = URL.createObjectURL(blob);
115         setPdfUrl(url); setPreviewTab('preview');
116       } catch (err) {
117         setCompileError(err instanceof Error ? err.message : 'Compilation failed');
118       } finally { setIsCompiling(false); }
119     };
120   
121     const handleDownloadPDF = async () => {
122       const name = `${resumeData?.personal.name || 'resume'} - ${activeResume?.name || 'resume'}.pdf`;
123       if (pdfUrl) {
124         const a = document.createElement('a'); a.href = pdfUrl; a.download = name; a.click();
125       } else {
126         setIsCompiling(true);
127         try { const blob = await compileToPDF(latexCode); downloadBlob(blob, name); }
128         catch (err) { setCompileError(err instanceof Error ? err.message : 'Compilation failed'); }
129         finally { setIsCompiling(false); }
130       }
131     };
132   
133     const handleCopyLatex = () => {
134       navigator.clipboard.writeText(latexCode);
135       setCopied(true); setTimeout(() => setCopied(false), 2000);
136     };
137   
138     const handleParsedResume = useCallback((data: ResumeData) => {
139       setResumeData(data); setMode('manual'); setActiveSection('personal');
140       triggerAutosave(data, sectionConfig);
141     }, [triggerAutosave, sectionConfig]);
142   
143     // Loading state
144     if (authLoading || resumesLoading || !resumeData) {
145       return (
146         <div className="h-screen bg-ink-950 flex items-center justify-center">
147           <div className="text-center">
148             <Loader2 size={28} className="text-gold animate-spin mx-auto mb-3" />
149             <p className="text-ivory-muted text-sm">Loading your resumes...</p>
150           </div>
151         </div>
152       );
153     }
154   
155     // Save status indicator
156     const SaveIndicator = () => {
157       if (saveStatus === 'saving') return (
158         <span className="flex items-center gap-1.5 text-[10px] text-ivory-dim font-mono">
159           <Loader2 size={10} className="animate-spin" /> Saving...
160         </span>
161       );
162       if (saveStatus === 'saved') return (
163         <span className="flex items-center gap-1.5 text-[10px] text-jade font-mono">
164           <Cloud size={10} /> Saved
165         </span>
166       );
167       if (saveStatus === 'error') return (
168         <span className="flex items-center gap-1.5 text-[10px] text-crimson font-mono">
169           <CloudOff size={10} /> Save failed
170         </span>
171       );
172       return null;
173     };
174   
```
**[REMOVED]**
```
(from line ~176)
    <div className="min-h-screen bg-ink-950 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-ink-800/60 backdrop-blur-md bg-ink-950/80">

```
**[ADDED]**
```
176       <div className="h-screen bg-ink-950 flex flex-col overflow-hidden">
177         {/* Top Bar */}
178         <header className="flex items-center justify-between px-5 py-3 border-b border-ink-800 bg-ink-900/80 backdrop-blur-sm flex-shrink-0">
```
**[REMOVED]**
```
(from line ~180)
          <div className="w-7 h-7 rounded border border-gold/40 flex items-center justify-center">
            <span className="text-gold text-xs font-mono font-bold">λ</span>
          </div>
          <span className="font-display font-medium text-ivory text-sm tracking-wide">ResumeTeX</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/builder" className="text-xs font-medium text-ivory-muted hover:text-ivory transition-colors animated-underline">Builder</Link>
          <a href="https://latex.online" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-ivory-muted hover:text-ivory transition-colors animated-underline">LaTeX.online</a>
          <ThemeToggle />
          <Link href="/builder" className="px-4 py-2 text-xs font-semibold bg-gold text-ink-950 rounded-lg hover:bg-gold-light transition-colors">
            Start Building

```
**[ADDED]**
```
180             <Link href="/" className="flex items-center gap-2 text-ivory-dim hover:text-ivory transition-colors text-xs">
181               <ArrowLeft size={14} /><span className="font-mono">Home</span>
```
**[REMOVED]**
```
(from line ~183)
        </div>
      </nav>

```
**[ADDED]**
```
183             <div className="w-px h-4 bg-ink-600" />
184             <div className="flex items-center gap-2">
185               <div className="w-5 h-5 rounded border border-gold/40 flex items-center justify-center">
186                 <span className="text-gold text-[10px] font-mono font-bold">λ</span>
187               </div>
188               <span className="font-display text-xs text-ivory font-medium hidden sm:block">ResumeTeX</span>
189             </div>
```
**[REMOVED]**
```
(from line ~191)
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-8 pt-20">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-jade/5 blur-3xl" />
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />

```
**[ADDED]**
```
191             {/* Resume Switcher */}
192             <ResumeSwitcher
193               resumes={resumes}
194               activeResume={activeResume}
195               onSwitch={switchTo}
196               onFork={async (name) => { await forkFromMaster(name); }}
197               onDelete={deleteResume}
198               onRename={rename}
199               onRestoreToMaster={(id) => restoreToMaster(id)}
200             />
201   
202             {/* Mode toggle */}
203             <div className="flex items-center bg-ink-800 rounded-lg p-0.5 border border-ink-700">
204               {(['manual', 'upload'] as BuilderMode[]).map(m => (
205                 <button key={m} onClick={() => setMode(m)}
206                   className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${mode === m ? 'bg-gold text-ink-950' : 'text-ivory-muted hover:text-ivory'}`}>
207                   {m === 'manual' ? 'Manual' : 'Upload'}
208                 </button>
209               ))}
210             </div>
```
**[REMOVED]**
```
(from line ~213)
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-mono mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            LaTeX-powered. AI-assisted. Yours.
          </motion.div>

```
**[ADDED]**
```
213           <div className="flex items-center gap-2">
214             <SaveIndicator />
215             <ThemeToggle />
```
**[REMOVED]**
```
(from line ~217)
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-6xl md:text-7xl font-bold leading-[1.05] mb-6"
          >
            Your Resume,
            <br />
            <span className="text-shimmer">Perfectly Typeset</span>
          </motion.h1>

```
**[ADDED]**
```
217             <button onClick={handleManualSave} disabled={saveStatus === 'saving'}
218               className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-ink-600 text-ivory-muted rounded-lg hover:border-ivory/30 hover:text-ivory transition-all disabled:opacity-50">
219               <Save size={12} /> Save
220             </button>
```
**[REMOVED]**
```
(from line ~222)
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-ivory-muted text-lg max-w-xl mx-auto mb-10 font-light leading-relaxed"
          >
            Fill your personal LaTeX resume template — manually or by uploading your old resume. 
            AI extracts everything. One click compiles to PDF.
          </motion.p>

```
**[ADDED]**
```
222             <button onClick={() => downloadLatex(latexCode, `${resumeData.personal.name || 'resume'}.tex`)}
223               className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-ink-600 text-ivory-muted rounded-lg hover:border-ivory/30 hover:text-ivory transition-all">
224               <FileCode size={12} /> .tex
225             </button>
```
**[REMOVED]**
```
(from line ~227)
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          >
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-ink-950 font-semibold text-sm rounded-xl hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5"
            >
              Open Builder
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/builder?mode=upload"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-ink-600 text-ivory-muted text-sm rounded-xl hover:border-ivory/30 hover:text-ivory transition-all duration-300"
            >
              <Upload size={15} />
              Upload Resume
            </Link>
          </motion.div>

```
**[ADDED]**
```
227             <button onClick={handleCompile} disabled={isCompiling}
228               className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gold/40 text-gold rounded-lg hover:bg-gold/10 transition-all disabled:opacity-50">
229               {isCompiling ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />} Compile
230             </button>
```
**[REMOVED]**
```
(from line ~232)
          {/* Preview mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto max-w-3xl rounded-2xl border border-ink-700 bg-ink-900 overflow-hidden shadow-2xl shadow-black/60">
              {/* Window bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-ink-700 bg-ink-800">
                <div className="w-3 h-3 rounded-full bg-crimson/60" />
                <div className="w-3 h-3 rounded-full bg-gold/60" />
                <div className="w-3 h-3 rounded-full bg-jade/60" />
                <div className="ml-4 text-xs font-mono text-ivory-muted">resume.tex — ResumeTeX Builder</div>
              </div>
              {/* Split preview */}
              <div className="grid grid-cols-2 min-h-[280px]">
                {/* Form side */}
                <div className="p-5 border-r border-ink-700">
                  <div className="text-xs font-mono text-gold/70 mb-4">// Personal Info</div>
                  {['Full Name', 'Email Address', 'Phone Number', 'Location'].map((field, i) => (
                    <div key={field} className="mb-3">
                      <div className="text-[10px] text-ivory-muted mb-1">{field}</div>
                      <div className="h-7 rounded bg-ink-700 border border-ink-600 animate-pulse" style={{ animationDelay: `${i * 0.1}s`, width: `${70 + i * 5}%` }} />
                    </div>
                  ))}
                </div>
                {/* Code side */}
                <div className="p-5 bg-ink-900">
                  <div className="text-xs font-mono text-gold/70 mb-4">// LaTeX Output</div>
                  <pre className="text-[10px] font-mono text-ivory-muted leading-5 opacity-70">{`\\begin{document}
\\textbf{\\Huge Alex Johnson}

```
**[ADDED]**
```
232             <button onClick={handleDownloadPDF} disabled={isCompiling}
233               className="flex items-center gap-1.5 px-4 py-1.5 text-xs bg-gold text-ink-950 font-semibold rounded-lg hover:bg-gold-light transition-all disabled:opacity-50">
234               <Download size={12} /> PDF
235             </button>
```
**[REMOVED]**
```
(from line ~237)
alex@email.com · +1 555 0192
San Francisco, CA

\\section{Experience}
\\textbf{Senior Engineer}
  \\item Led migration to...
  \\item Reduced latency...`}</pre>
                </div>
              </div>
            </div>
          </motion.div>

```
**[ADDED]**
```
237             {/* User / Sign out */}
238             <div className="w-px h-4 bg-ink-600" />
239             <button onClick={signOut}
240               className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-ink-500 hover:text-ivory-muted transition-colors"
241               title={`Sign out (${user?.email})`}>
242               <LogOut size={13} />
243             </button>
```
**[REMOVED]**
```
(from line ~245)
      </section>

```
**[ADDED]**
```
245         </header>
```
**[REMOVED]**
```
(from line ~247)
      {/* Features */}
      <section className="px-8 py-28 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-label text-center justify-center flex">Capabilities</div>
          <h2 className="font-display text-4xl font-bold text-ivory">Everything you need</h2>

```
**[ADDED]**
```
247         {/* Main */}
248         <div className="flex flex-1 overflow-hidden">
249           <div className="w-[400px] flex-shrink-0 border-r border-ink-800 overflow-y-auto bg-ink-900">
250             <AnimatePresence mode="wait">
251               {mode === 'upload' ? (
252                 <motion.div key="upload" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="h-full">
253                   <UploadMode onParsed={handleParsedResume} />
254                 </motion.div>
255               ) : (
256                 <motion.div key="form" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="h-full">
257                   <FormPanel
258                     data={resumeData}
259                     onChange={handleDataChange}
260                     activeSection={activeSection}
261                     onSectionChange={setActiveSection}
262                     sectionConfig={sectionConfig}
263                     onSectionConfigChange={handleConfigChange}
264                   />
265                 </motion.div>
266               )}
267             </AnimatePresence>
```
**[REMOVED]**
```
(from line ~269)
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card group hover:border-gold/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors">
                <f.icon size={18} className="text-gold" />
              </div>
              <h3 className="font-display font-semibold text-ivory text-base mb-2">{f.title}</h3>
              <p className="text-ivory-muted text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

```
**[REMOVED]**
```
(from line ~270)
      {/* How it works */}
      <section className="px-8 py-20 border-t border-ink-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label text-center justify-center flex">Process</div>
            <h2 className="font-display text-4xl font-bold text-ivory">How it works</h2>

```
**[ADDED]**
```
270           {/* Right Panel */}
271           <div className="flex-1 flex flex-col overflow-hidden bg-ink-950">
272             <div className="flex items-center justify-between px-5 py-2 border-b border-ink-800 bg-ink-900/50 flex-shrink-0">
273               <div className="flex items-center bg-ink-800 rounded-lg p-0.5 border border-ink-700">
274                 <button onClick={() => setPreviewTab('code')}
275                   className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${previewTab === 'code' ? 'bg-ink-600 text-ivory' : 'text-ivory-muted hover:text-ivory'}`}>
276                   <FileCode size={12} /> LaTeX Code
277                 </button>
278                 <button onClick={() => setPreviewTab('preview')}
279                   className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${previewTab === 'preview' ? 'bg-ink-600 text-ivory' : 'text-ivory-muted hover:text-ivory'}`}>
280                   <Eye size={12} /> PDF Preview
281                 </button>
282               </div>
283               {previewTab === 'code' && (
284                 <button onClick={handleCopyLatex} className="flex items-center gap-1.5 text-xs text-ivory-dim hover:text-ivory transition-colors">
285                   {copied ? <Check size={12} className="text-jade" /> : <Copy size={12} />}
286                   {copied ? 'Copied!' : 'Copy'}
287                 </button>
288               )}
289               {compileError && <span className="text-xs text-crimson font-mono">{compileError}</span>}
```
**[REMOVED]**
```
(from line ~291)
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-full w-full h-px bg-gradient-to-r from-gold/20 to-transparent -translate-y-1/2 z-0" />

```
**[ADDED]**
```
291   
292             <AnimatePresence mode="wait">
293               {previewTab === 'code' ? (
294                 <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 overflow-auto p-5">
295                   <div className="flex gap-4">
296                     <div className="flex-shrink-0 text-right select-none">
297                       {latexCode.split('\n').map((_, i) => (
298                         <div key={i} className="text-[10px] font-mono text-ink-500 leading-[20px]">{i + 1}</div>
299                       ))}
300                     </div>
301                     <div className="flex-1 overflow-x-auto">
302                       <pre className="latex-code leading-5">
303                         {latexCode.split('\n').map((line, i) => (
304                           <div key={i} className={`hover:bg-ink-800/40 px-1 rounded ${
305                             line.startsWith('%') ? 'text-ink-500' :
306                             line.startsWith('\\section') ? 'text-gold' :
307                             line.startsWith('\\') ? 'text-jade/90' : 'text-ivory-muted'
308                           }`}>{line || ' '}</div>
309                         ))}
310                       </pre>
311                     </div>
312                   </div>
313                 </motion.div>
314               ) : (
315                 <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
316                   className="flex-1 overflow-hidden flex items-center justify-center bg-ink-900">
317                   {pdfUrl ? (
318                     <iframe src={pdfUrl} className="w-full h-full border-0" title="PDF Preview" />
319                   ) : (
320                     <div className="text-center">
321                       <div className="w-16 h-16 rounded-2xl bg-ink-800 border border-ink-700 flex items-center justify-center mx-auto mb-4">
322                         <Eye size={24} className="text-ivory-dim" />
323                       </div>
324                       <p className="text-ivory-muted text-sm font-medium">No preview yet</p>
325                       <p className="text-ivory-dim text-xs mt-1 mb-5">Click Compile to generate PDF preview</p>
326                       <button onClick={handleCompile} disabled={isCompiling}
327                         className="flex items-center gap-2 px-5 py-2.5 bg-gold text-ink-950 font-semibold text-sm rounded-xl hover:bg-gold-light mx-auto disabled:opacity-50">
328                         {isCompiling ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
329                         {isCompiling ? 'Compiling...' : 'Compile Now'}
330                       </button>
331                     </div>
```
**[REMOVED]**
```
(from line ~333)
                <div className="font-mono text-3xl font-bold text-gold/20 mb-3">{step.num}</div>
                <h3 className="font-display font-semibold text-ivory text-lg mb-2">{step.title}</h3>
                <p className="text-ivory-muted text-sm leading-relaxed">{step.desc}</p>

```
**[REMOVED]**
```
(from line ~334)
            ))}
          </div>

```
**[ADDED]**
```
334               )}
335             </AnimatePresence>
```
**[REMOVED]**
```
(from line ~337)
      </section>

      {/* CTA Footer */}
      <section className="px-8 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4 text-xs font-mono text-jade">
            <CheckCircle size={12} />
            No account required. Runs in your browser.
          </div>
          <h2 className="font-display text-5xl font-bold text-ivory mb-6">
            Build your resume <br />
            <span className="text-shimmer">right now</span>
          </h2>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-ink-950 font-semibold rounded-xl hover:bg-gold-light transition-all hover:shadow-xl hover:shadow-gold/20"
          >
            <Zap size={16} />
            Launch Builder
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink-800 px-8 py-6 flex items-center justify-between text-xs text-ivory-muted font-mono">
        <span>ResumeTeX — LaTeX Resume Builder</span>
        <span>Powered by LaTeX.online API + Claude AI</span>
      </footer>

```
**[ADDED]**
```
337         </div>
```
**[ADDED]**
```
341   
342   export default function BuilderPage() {
343     return (
344       <Suspense fallback={
345         <div className="h-screen bg-ink-950 flex items-center justify-center">
346           <Loader2 size={24} className="text-gold animate-spin" />
347         </div>
348       }>
349         <BuilderContent />
350       </Suspense>
351     );
352   }
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\app\login\page.tsx
*Saved at: 3/3/2026, 2:25:34 PM*

**[ADDED]**
```
1     // src/app/login/page.tsx
2     'use client';
3     
4     import { useState, useEffect } from 'react';
5     import { useRouter } from 'next/navigation';
6     import { createClient } from '@/lib/supabase/client';
7     import { useAuth } from '@/context/AuthContext';
8     import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
9     
10    export default function LoginPage() {
11      const router   = useRouter();
12      const { user, loading } = useAuth();
13      const supabase = createClient();
14    
15      const [mode, setMode]             = useState<'login' | 'signup'>('login');
16      const [email, setEmail]           = useState('');
17      const [password, setPassword]     = useState('');
18      const [showPass, setShowPass]     = useState(false);
19      const [submitting, setSubmitting] = useState(false);
20      const [error, setError]           = useState('');
21      const [success, setSuccess]       = useState('');
22    
23      useEffect(() => {
24        if (!loading && user) router.replace('/builder');
25      }, [user, loading]);
26    
27      const handleSubmit = async () => {
28        if (!email || !password) { setError('Please fill in all fields.'); return; }
29        setSubmitting(true); setError(''); setSuccess('');
30    
31        if (mode === 'signup') {
32          const { error } = await supabase.auth.signUp({ email, password });
33          if (error) setError(error.message);
34          else { setSuccess('Account created! Check your email to confirm, then log in.'); setMode('login'); }
35        } else {
36          const { error } = await supabase.auth.signInWithPassword({ email, password });
37          if (error) setError(error.message);
38          else router.replace('/builder');
39        }
40        setSubmitting(false);
41      };
42    
43      if (loading) return (
44        <div className="h-screen bg-ink-950 flex items-center justify-center">
45          <Loader2 size={24} className="text-gold animate-spin" />
46        </div>
47      );
48    
49      return (
50        <div className="h-screen bg-ink-950 flex items-center justify-center p-4">
51          <div className="w-full max-w-sm">
52            <div className="text-center mb-8">
53              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-gold/30 bg-gold/5 mb-4">
54                <span className="text-gold text-xl font-mono font-bold">λ</span>
55              </div>
56              <h1 className="font-display text-2xl font-bold text-ivory">ResumeTeX Builder</h1>
57              <p className="text-ivory-muted text-sm mt-1">Craft your perfect LaTeX resume</p>
58            </div>
59    
60            <div className="bg-ink-900 border border-ink-700 rounded-2xl p-6 shadow-2xl">
61              <div className="flex items-center bg-ink-800 rounded-lg p-0.5 border border-ink-700 mb-6">
62                {(['login', 'signup'] as const).map(m => (
63                  <button key={m} onClick={() => { setMode(m); setError(''); setSuccess(''); }}
64                    className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${mode === m ? 'bg-gold text-ink-950' : 'text-ivory-muted hover:text-ivory'}`}>
65                    {m === 'login' ? 'Log In' : 'Sign Up'}
66                  </button>
67                ))}
68              </div>
69    
70              <div className="flex flex-col gap-4">
71                <div>
72                  <label className="text-[10px] text-ivory-dim uppercase tracking-wider mb-1.5 block">Email</label>
73                  <div className="relative">
74                    <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
75                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
76                      onKeyDown={e => e.key === 'Enter' && handleSubmit()}
77                      placeholder="you@example.com" className="input-base pl-8 w-full" />
78                  </div>
79                </div>
80    
81                <div>
82                  <label className="text-[10px] text-ivory-dim uppercase tracking-wider mb-1.5 block">Password</label>
83                  <div className="relative">
84                    <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
85                    <input type={showPass ? 'text' : 'password'} value={password}
86                      onChange={e => setPassword(e.target.value)}
87                      onKeyDown={e => e.key === 'Enter' && handleSubmit()}
88                      placeholder="••••••••" className="input-base pl-8 pr-8 w-full" />
89                    <button onClick={() => setShowPass(!showPass)}
90                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ivory-muted">
91                      {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
92                    </button>
93                  </div>
94                </div>
95    
96                {error   && <p className="text-xs text-crimson bg-crimson/10 border border-crimson/20 rounded-lg px-3 py-2">{error}</p>}
97                {success && <p className="text-xs text-jade  bg-jade/10  border border-jade/20  rounded-lg px-3 py-2">{success}</p>}
98    
99                <button onClick={handleSubmit} disabled={submitting}
100                 className="w-full flex items-center justify-center gap-2 py-2.5 bg-gold text-ink-950 font-semibold text-sm rounded-xl hover:bg-gold-light transition-all disabled:opacity-60 mt-1">
101                 {submitting && <Loader2 size={14} className="animate-spin" />}
102                 {mode === 'login' ? 'Log In' : 'Create Account'}
103               </button>
104             </div>
105           </div>
106   
107           <p className="text-center text-[11px] text-ink-500 mt-4">
108             Your resumes are stored securely in the cloud.
109           </p>
110         </div>
111       </div>
112     );
113   }
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\hooks\useResumes.ts
*Saved at: 3/3/2026, 2:25:19 PM*

**[ADDED]**
```
1     // src/hooks/useResumes.ts
2     'use client';
3     
4     import { useState, useEffect, useCallback } from 'react';
5     import { createClient } from '@/lib/supabase/client';
6     import { ResumeData, SectionConfig, defaultResumeData, ALL_SECTIONS } from '@/lib/types';
7     import { useAuth } from '@/context/AuthContext';
8     
9     export interface ResumeRecord {
10      id: string;
11      name: string;
12      is_master: boolean;
13      resume_data: ResumeData;
14      section_config: SectionConfig[];
15      created_at: string;
16      updated_at: string;
17    }
18    
19    export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';
20    
21    export function useResumes() {
22      const { user } = useAuth();
23      const supabase = createClient();
24    
25      const [resumes, setResumes]             = useState<ResumeRecord[]>([]);
26      const [activeResume, setActiveResume]   = useState<ResumeRecord | null>(null);
27      const [loading, setLoading]             = useState(true);
28      const [saveStatus, setSaveStatus]       = useState<SaveStatus>('idle');
29    
30      // ── Fetch all resumes for user ─────────────────────────────────────────────
31      const fetchResumes = useCallback(async () => {
32        if (!user) return;
33        const { data, error } = await supabase
34          .from('resumes')
35          .select('*')
36          .eq('user_id', user.id)
37          .order('is_master', { ascending: false }) // master first
38          .order('created_at', { ascending: true });
39    
40        if (error) { console.error('fetchResumes:', error); return; }
41        return data as ResumeRecord[];
42      }, [user]);
43    
44      // ── On mount: fetch or create master ──────────────────────────────────────
45      useEffect(() => {
46        if (!user) return;
47    
48        (async () => {
49          setLoading(true);
50          let data = await fetchResumes();
51          if (!data) { setLoading(false); return; }
52    
53          // If user has no master resume yet, create one from defaultResumeData
54          if (!data.find(r => r.is_master)) {
55            const { data: created, error } = await supabase
56              .from('resumes')
57              .insert({
58                user_id:        user.id,
59                name:           'Master Resume',
60                is_master:      true,
61                resume_data:    defaultResumeData,
62                section_config: ALL_SECTIONS,
63              })
64              .select()
65              .single();
66    
67            if (error) { console.error('create master:', error); setLoading(false); return; }
68            data = [created as ResumeRecord, ...data];
69          }
70    
71          setResumes(data);
72          // Open master by default
73          setActiveResume(data.find(r => r.is_master) ?? data[0]);
74          setLoading(false);
75        })();
76      }, [user]);
77    
78      // ── Save (update) a resume ─────────────────────────────────────────────────
79      const save = useCallback(async (
80        id: string,
81        resumeData: ResumeData,
82        sectionConfig: SectionConfig[]
83      ) => {
84        setSaveStatus('saving');
85        const { error } = await supabase
86          .from('resumes')
87          .update({ resume_data: resumeData, section_config: sectionConfig })
88          .eq('id', id);
89    
90        if (error) { console.error('save:', error); setSaveStatus('error'); return; }
91    
92        setResumes(prev => prev.map(r =>
93          r.id === id ? { ...r, resume_data: resumeData, section_config: sectionConfig } : r
94        ));
95        setSaveStatus('saved');
96        setTimeout(() => setSaveStatus('idle'), 2000);
97      }, []);
98    
99      // ── Rename a resume ────────────────────────────────────────────────────────
100     const rename = useCallback(async (id: string, name: string) => {
101       const { error } = await supabase.from('resumes').update({ name }).eq('id', id);
102       if (error) { console.error('rename:', error); return; }
103       setResumes(prev => prev.map(r => r.id === id ? { ...r, name } : r));
104       setActiveResume(prev => prev?.id === id ? { ...prev, name } : prev);
105     }, []);
106   
107     // ── Fork from master (create a new version) ────────────────────────────────
108     const forkFromMaster = useCallback(async (versionName: string) => {
109       if (!user) return null;
110       const master = resumes.find(r => r.is_master);
111       if (!master) return null;
112   
113       const { data, error } = await supabase
114         .from('resumes')
115         .insert({
116           user_id:        user.id,
117           name:           versionName,
118           is_master:      false,
119           resume_data:    master.resume_data,
120           section_config: master.section_config,
121         })
122         .select()
123         .single();
124   
125       if (error) { console.error('fork:', error); return null; }
126   
127       const newRecord = data as ResumeRecord;
128       setResumes(prev => [...prev, newRecord]);
129       setActiveResume(newRecord);
130       return newRecord;
131     }, [user, resumes]);
132   
133     // ── Restore this version to match master ──────────────────────────────────
134     const restoreToMaster = useCallback(async (id: string) => {
135       const master = resumes.find(r => r.is_master);
136       if (!master) return;
137       await save(id, master.resume_data, master.section_config);
138       setActiveResume(prev =>
139         prev?.id === id
140           ? { ...prev, resume_data: master.resume_data, section_config: master.section_config }
141           : prev
142       );
143     }, [resumes, save]);
144   
145     // ── Delete a version (master cannot be deleted) ───────────────────────────
146     const deleteResume = useCallback(async (id: string) => {
147       const target = resumes.find(r => r.id === id);
148       if (!target || target.is_master) return;
149   
150       const { error } = await supabase.from('resumes').delete().eq('id', id);
151       if (error) { console.error('delete:', error); return; }
152   
153       const remaining = resumes.filter(r => r.id !== id);
154       setResumes(remaining);
155   
156       // If we deleted the active one, switch to master
157       if (activeResume?.id === id) {
158         setActiveResume(remaining.find(r => r.is_master) ?? remaining[0]);
159       }
160     }, [resumes, activeResume]);
161   
162     // ── Switch active resume ───────────────────────────────────────────────────
163     const switchTo = useCallback((id: string) => {
164       const found = resumes.find(r => r.id === id);
165       if (found) setActiveResume(found);
166     }, [resumes]);
167   
168     return {
169       resumes, activeResume, loading, saveStatus,
170       save, rename, forkFromMaster, restoreToMaster, deleteResume, switchTo,
171     };
172   }
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\context\AuthContext.tsx
*Saved at: 3/3/2026, 2:25:09 PM*

**[ADDED]**
```
1     // src/context/AuthContext.tsx
2     'use client';
3     
4     import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
5     import { User, Session } from '@supabase/supabase-js';
6     import { createClient } from '@/lib/supabase/client';
7     
8     interface AuthContextType {
9       user: User | null;
10      session: Session | null;
11      loading: boolean;
12      signOut: () => Promise<void>;
13    }
14    
15    const AuthContext = createContext<AuthContextType>({
16      user: null, session: null, loading: true,
17      signOut: async () => {},
18    });
19    
20    export function AuthProvider({ children }: { children: ReactNode }) {
21      const [user, setUser]       = useState<User | null>(null);
22      const [session, setSession] = useState<Session | null>(null);
23      const [loading, setLoading] = useState(true);
24      const supabase = createClient();
25    
26      useEffect(() => {
27        // Get initial session
28        supabase.auth.getSession().then(({ data: { session } }) => {
29          setSession(session);
30          setUser(session?.user ?? null);
31          setLoading(false);
32        });
33    
34        // Listen for auth changes
35        const { data: { subscription } } = supabase.auth.onAuthStateChange(
36          (_event, session) => {
37            setSession(session);
38            setUser(session?.user ?? null);
39            setLoading(false);
40          }
41        );
42    
43        return () => subscription.unsubscribe();
44      }, []);
45    
46      const signOut = async () => {
47        await supabase.auth.signOut();
48      };
49    
50      return (
51        <AuthContext.Provider value={{ user, session, loading, signOut }}>
52          {children}
53        </AuthContext.Provider>
54      );
55    }
56    
57    export const useAuth = () => useContext(AuthContext);
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\lib\supabase\server.ts
*Saved at: 3/3/2026, 2:24:52 PM*

**[ADDED]**
```
1     // src/lib/supabase/server.ts
2     // Server-side Supabase client (used in API routes / server components)
3     import { createServerClient } from '@supabase/ssr';
4     import { cookies } from 'next/headers';
5     
6     export function createClient() {
7       const cookieStore = cookies();
8       return createServerClient(
9         process.env.NEXT_PUBLIC_SUPABASE_URL!,
10        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
11        {
12          cookies: {
13            getAll() { return cookieStore.getAll(); },
14            setAll(cookiesToSet) {
15              try {
16                cookiesToSet.forEach(({ name, value, options }) =>
17                  cookieStore.set(name, value, options)
18                );
19              } catch {}
20            },
21          },
22        }
23      );
24    }
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\lib\supabase\client.ts
*Saved at: 3/3/2026, 2:24:45 PM*

**[ADDED]**
```
1     // src/lib/supabase/client.ts
2     // Browser-side Supabase client (used in components/hooks)
3     import { createBrowserClient } from '@supabase/ssr';
4     
5     export function createClient() {
6       return createBrowserClient(
7         process.env.NEXT_PUBLIC_SUPABASE_URL!,
8         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
9       );
10    }
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\package.json
*Saved at: 3/3/2026, 2:19:18 PM*

**[REMOVED]**
```
(from line ~12)
    "clsx": "^2.1.1",

```
**[ADDED]**
```
12        "next": "14.2.5",
13        "react": "^18",
14        "react-dom": "^18",
```
**[REMOVED]**
```
(from line ~18)
    "next": "^16.1.6",
    "openai": "^6.25.0",

```
**[REMOVED]**
```
(from line ~19)
    "react": "^18",
    "react-dom": "^18",
    "tailwind-merge": "^2.4.0"

```
**[ADDED]**
```
19        "clsx": "^2.1.1",
20        "tailwind-merge": "^2.4.0",
21        "@supabase/supabase-js": "^2.45.0",
22        "@supabase/ssr": "^0.5.0",
23        "openai": "^4.56.0"
```
**[ADDED]**
```
26        "typescript": "^5",
```
**[REMOVED]**
```
(from line ~30)
    "autoprefixer": "^10.0.1",
    "eslint": "^10.0.2",
    "eslint-config-next": "^16.1.6",
    "postcss": "^8",

```
**[REMOVED]**
```
(from line ~31)
    "typescript": "^5"

```
**[ADDED]**
```
31        "postcss": "^8",
32        "autoprefixer": "^10.0.1",
33        "eslint": "^8",
34        "eslint-config-next": "14.2.5"
```
**[REMOVED]**
```
(from line ~36)
}

```
**[ADDED]**
```
36    }
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\.env.local
*Saved at: 3/3/2026, 2:17:33 PM*

**[REMOVED]**
```
(from line ~4)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```
**[ADDED]**
```
4     NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_rAmb2bWgxsQrj8c7PFz4zw_bpkZMSNV
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\.env.local
*Saved at: 3/3/2026, 2:15:45 PM*

**[REMOVED]**
```
(from line ~3)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

```
**[ADDED]**
```
3     NEXT_PUBLIC_SUPABASE_URL=https://lnhwgninkjafcdjdqlpe.supabase.co
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\.env.local
*Saved at: 3/3/2026, 2:15:36 PM*

**[REMOVED]**
```
(from line ~2)
NEBIUS_API_KEY=v1.CmMKHHN0YXRpY2tleS1lMDBhY2FmcGVyZ3E5dmQzNnASIXNlcnZpY2VhY2NvdW50LWUwMHI0OGNxY3NzcG5idnAxejILCM3bhM0GEI2U_n06DAjM3pyYBxCA9vK2AkACWgNlMDA.AAAAAAAAAAFVry4KbCsuXWBamJZ_mxLfd67cCxR7iIXajyTVBYtgCBTpu81fN_OeGEs8ZgYuDHxM-XppPMrhpHEcpD9ZXz0O
```
**[ADDED]**
```
2     NEBIUS_API_KEY=v1.CmMKHHN0YXRpY2tleS1lMDBhY2FmcGVyZ3E5dmQzNnASIXNlcnZpY2VhY2NvdW50LWUwMHI0OGNxY3NzcG5idnAxejILCM3bhM0GEI2U_n06DAjM3pyYBxCA9vK2AkACWgNlMDA.AAAAAAAAAAFVry4KbCsuXWBamJZ_mxLfd67cCxR7iIXajyTVBYtgCBTpu81fN_OeGEs8ZgYuDHxM-XppPMrhpHEcpD9ZXz0O
3     NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
4     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\.env.example
*Saved at: 3/3/2026, 2:15:30 PM*

**[ADDED]**
```
2     NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
3     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\.env.example
*Saved at: 3/3/2026, 2:15:29 PM*

**[REMOVED]**
```
(from line ~1)
NEBIUS_API_KEY=
```
**[ADDED]**
```
1     NEBIUS_API_KEY=
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\.env.example
*Saved at: 3/3/2026, 1:49:40 PM*

**[ADDED]**
```
1     NEBIUS_API_KEY=
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\.env.local
*Saved at: 3/3/2026, 1:49:37 PM*

**[REMOVED]**
```
(from line ~2)
v1.CmMKHHN0YXRpY2tleS1lMDBhY2FmcGVyZ3E5dmQzNnASIXNlcnZpY2VhY2NvdW50LWUwMHI0OGNxY3NzcG5idnAxejILCM3bhM0GEI2U_n06DAjM3pyYBxCA9vK2AkACWgNlMDA.AAAAAAAAAAFVry4KbCsuXWBamJZ_mxLfd67cCxR7iIXajyTVBYtgCBTpu81fN_OeGEs8ZgYuDHxM-XppPMrhpHEcpD9ZXz0O
```
**[ADDED]**
```
2     NEBIUS_API_KEY=v1.CmMKHHN0YXRpY2tleS1lMDBhY2FmcGVyZ3E5dmQzNnASIXNlcnZpY2VhY2NvdW50LWUwMHI0OGNxY3NzcG5idnAxejILCM3bhM0GEI2U_n06DAjM3pyYBxCA9vK2AkACWgNlMDA.AAAAAAAAAAFVry4KbCsuXWBamJZ_mxLfd67cCxR7iIXajyTVBYtgCBTpu81fN_OeGEs8ZgYuDHxM-XppPMrhpHEcpD9ZXz0O
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\.env.local
*Saved at: 3/3/2026, 1:49:36 PM*

**[REMOVED]**
```
(from line ~2)
NEBIUS_API_KEY=v1.CmMKHHN0YXRpY2tleS1lMDBhY2FmcGVyZ3E5dmQzNnASIXNlcnZpY2VhY2NvdW50LWUwMHI0OGNxY3NzcG5idnAxejILCM3bhM0GEI2U_n06DAjM3pyYBxCA9vK2AkACWgNlMDA.AAAAAAAAAAFVry4KbCsuXWBamJZ_mxLfd67cCxR7iIXajyTVBYtgCBTpu81fN_OeGEs8ZgYuDHxM-XppPMrhpHEcpD9ZXz0O
```
**[ADDED]**
```
2     v1.CmMKHHN0YXRpY2tleS1lMDBhY2FmcGVyZ3E5dmQzNnASIXNlcnZpY2VhY2NvdW50LWUwMHI0OGNxY3NzcG5idnAxejILCM3bhM0GEI2U_n06DAjM3pyYBxCA9vK2AkACWgNlMDA.AAAAAAAAAAFVry4KbCsuXWBamJZ_mxLfd67cCxR7iIXajyTVBYtgCBTpu81fN_OeGEs8ZgYuDHxM-XppPMrhpHEcpD9ZXz0O
```

---

