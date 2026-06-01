// src/lib/resumeParser.ts
import { ResumeData, defaultResumeData } from './types';
import { api } from './api';

// Sends the extracted resume text to the backend, which builds the prompt,
// calls the AI model, and returns structured resume JSON.
export async function parseResumeWithAI(text: string): Promise<ResumeData> {
  const parsed = await api<Partial<ResumeData>>('/tools/parse', {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
  return { ...defaultResumeData, ...parsed };
}

// Uploads a PDF/DOCX/TXT file to the backend for text extraction.
export async function extractTextFromFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const { text } = await api<{ text: string }>('/tools/extract-text', {
    method: 'POST',
    body: formData,
  });
  return text;
}
