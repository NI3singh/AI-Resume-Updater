// src/app/layout.tsx
import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ThemeProvider } from '@/lib/ThemeContext';

export const metadata: Metadata = {
  title: 'LaTeX Resume Builder — Craft Your Professional Resume',
  description: 'Build a perfectly typeset LaTeX resume. Fill manually or upload your existing resume and let AI extract everything.',
  keywords: ['LaTeX resume', 'resume builder', 'ATS-friendly resume', 'professional resume'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="grain min-h-screen bg-ink-950 text-ivory antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
