// src/lib/pdfCompiler.ts

export async function compileToPDF(latexCode: string): Promise<Blob> {
  // Using latex.online API
  // API endpoint: https://latex.ytotech.com/builds/sync
  // Alternative: https://latexonline.cc/compile

  const response = await fetch('/api/compile-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ latex: latexCode }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Compilation failed' }));
    throw new Error(error.message || 'LaTeX compilation failed');
  }

  return response.blob();
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
