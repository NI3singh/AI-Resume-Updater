// src/lib/pdfCompiler.ts
import { apiBlob } from './api';

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
