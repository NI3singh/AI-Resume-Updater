// src/app/layout.tsx
import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ThemeProvider } from '@/lib/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'LaTeX Resume Builder — Craft Your Professional Resume',
  description: 'Build a perfectly typeset LaTeX resume with AI-powered parsing.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="grain min-h-screen bg-ink-950 text-ivory antialiased">
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}