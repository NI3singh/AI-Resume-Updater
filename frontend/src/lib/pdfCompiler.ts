// src/lib/pdfCompiler.ts
import { apiBlob, ApiError } from './api';

// Mirrors the same-origin proxy path in api.ts (kept local: apiBlob hides the
// Response, and we need headers for the page count).
const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? '/backend-api').replace(/\/$/, '');

/**
 * Build a clean, professional base file name from the person's name and the
 * resume version name, e.g. "Singh Nitin Rakesh" + "Data Analyst - Google"
 * -> "Singh_Nitin_Rakesh_Data_Analyst_Google". Shared by the .pdf and .tex
 * downloads so every download path produces the same file name.
 */
export function resumeFileBase(personName: string, versionName: string): string {
  const clean = (s: string) =>
    (s || '')
      .normalize('NFKD')
      .replace(/[^\w\s-]/g, '')   // keep letters/digits/underscore, spaces, dashes
      .trim()
      .replace(/[\s-]+/g, '_')    // spaces & dashes -> single underscore
      .replace(/_+/g, '_')        // collapse repeats
      .replace(/^_+|_+$/g, '');   // trim leading/trailing underscores
  const base = [clean(personName), clean(versionName)].filter(Boolean).join('_');
  return base || 'resume';
}

export async function compileToPDF(latexCode: string): Promise<Blob> {
  // The backend (FastAPI /tools/compile) proxies to the LaTeX compile service
  // and returns the PDF bytes. ApiError carries the failure detail.
  return apiBlob('/tools/compile', {
    method: 'POST',
    body: JSON.stringify({ latex: latexCode }),
  });
}

/**
 * Compile and return ONLY the real page count (from the backend's X-Pdf-Pages
 * header) — used by the Transform studio's page-budget check. Discards the PDF
 * bytes. Throws ApiError on compilation failure; returns null when the header
 * is missing (older backend).
 */
export async function compilePdfPages(latexCode: string): Promise<number | null> {
  const res = await fetch(`${API_URL}/tools/compile`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ latex: latexCode }),
  });
  if (!res.ok) throw await (async () => {
    let message = res.statusText || 'Compilation failed';
    try {
      const payload = await res.json();
      if (payload && typeof payload === 'object' && typeof payload.detail === 'string') message = payload.detail;
    } catch { /* non-JSON error body */ }
    return new ApiError(res.status, message);
  })();
  const header = res.headers.get('X-Pdf-Pages');
  await res.body?.cancel().catch(() => {});
  const n = header ? parseInt(header, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadLatex(code: string, filename: string = 'resume.tex') {
  const blob = new Blob([code], { type: 'text/plain' });
  downloadBlob(blob, filename);
}
