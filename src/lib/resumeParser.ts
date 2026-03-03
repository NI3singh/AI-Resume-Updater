// src/lib/resumeParser.ts
import { ResumeData, defaultResumeData } from './types';

export async function parseResumeWithAI(text: string): Promise<ResumeData> {
  const prompt = `You are a resume parser. Extract ALL information from the following resume text and return it as a JSON object with EXACTLY this structure. Return ONLY raw JSON, no markdown, no explanation, no code fences.

{
  "personal": {
    "name": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "github": "",
    "website": ""
  },
  "education": [
    {
      "id": "edu_1",
      "institution": "",
      "location": "",
      "gpaLabel": "",
      "degree": "",
      "startDate": "",
      "endDate": "",
      "highlight": ""
    }
  ],
  "skills": [
    {
      "id": "skill_1",
      "category": "",
      "items": [""]
    }
  ],
  "projects": [
    {
      "id": "proj_1",
      "name": "",
      "techStack": "",
      "githubUrl": "",
      "liveUrl": "",
      "bullets": [""]
    }
  ],
  "experience": [
    {
      "id": "exp_1",
      "role": "",
      "company": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "current": false,
      "projectSubtitle": "",
      "bullets": [""]
    }
  ],
  "extracurricular": [
    {
      "id": "extra_1",
      "title": "",
      "organization": "",
      "startDate": "",
      "endDate": "",
      "bullets": [""]
    }
  ],
  "achievements": [
    {
      "id": "ach_1",
      "text": ""
    }
  ],
  "certifications": [
    {
      "id": "cert_1",
      "text": "",
      "credentialUrl": ""
    }
  ],
  "publications": [
    {
      "id": "pub_1",
      "title": "",
      "authors": "",
      "abstractText": "",
      "paperUrl": "",
      "paperLinkLabel": ""
    }
  ]
}

Rules:
- linkedin/github/website: extract the FULL URL including https://
- gpaLabel: the full GPA string e.g. "Agg. CGPA: 8.68"
- degree: full degree line e.g. "B.Tech Artificial Intelligence & Data Science"
- highlight: the italic note line under education, if present
- techStack: comma-separated tech string e.g. "RetinaFace, Facenet"
- projectSubtitle: the italic project line under experience role, if present
- current: true only if still working there (endDate is "Present")
- If a section has no data, use an empty array []
- Generate sequential IDs: edu_1, edu_2 etc.
- Extract every bullet point as individual strings

Resume text:
${text}`;

  const response = await fetch('/api/parse-resume', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) throw new Error('Failed to parse resume');

  const result = await response.json();

  try {
    const cleaned = result.text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    return { ...defaultResumeData, ...parsed };
  } catch {
    throw new Error('Failed to parse AI response as JSON');
  }
}

export async function extractTextFromFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/extract-text', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('Failed to extract text from file');
  const result = await response.json();
  return result.text;
}