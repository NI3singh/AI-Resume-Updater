// src/lib/pdfCompiler.ts
import { apiBlob } from './api';

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
