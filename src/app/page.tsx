// src/app/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Upload, Cpu, Download, CheckCircle, Zap } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useAuth } from '@/context/AuthContext';

const features = [
  { icon: FileText, title: 'Your Template, Your Rules', desc: 'Built around your exact LaTeX template. No generic defaults — it adapts to your structure.' },
  { icon: Upload, title: 'Upload & Extract', desc: 'Drop your old PDF or DOCX resume. AI extracts every detail and maps it to your template fields.' },
  { icon: Cpu, title: 'AI-Powered Parsing', desc: 'Claude AI reads your resume and structures the data into perfect JSON, ready to inject.' },
  { icon: Download, title: 'Compile to PDF', desc: 'One click compiles your filled LaTeX code via LaTeX.online API. Download a pixel-perfect PDF.' },
];

const steps = [
  { num: '01', title: 'Choose your mode', desc: 'Fill the form manually, or upload your existing resume to auto-extract everything.' },
  { num: '02', title: 'Review & Edit', desc: 'See the live LaTeX code update as you type. Tweak any field instantly.' },
  { num: '03', title: 'Compile & Download', desc: 'Hit compile. Your LaTeX is sent to the compilation engine and returns a perfect PDF.' },
];

export default function HomePage() {
  const { user, loading, signOut } = useAuth();

  // Extract first name from email (e.g. "nitin" from "nitin@gmail.com")
  const firstName = user?.email
    ? user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1)
    : null;

  return (
    <div className="min-h-screen bg-ink-950 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-ink-800/60 backdrop-blur-md bg-ink-950/80">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded border border-gold/40 flex items-center justify-center">
            <span className="text-gold text-xs font-mono font-bold">λ</span>
          </div>
          <span className="font-display font-medium text-ivory text-sm tracking-wide">ResumeTeX</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://latex.online" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-ivory-muted hover:text-ivory transition-colors animated-underline">LaTeX.online</a>
          <ThemeToggle />
          {loading ? (
            // Skeleton while auth resolves
            <div className="w-24 h-8 rounded-lg bg-ink-700 animate-pulse" />
          ) : user ? (
            // ── Logged-in state ──
            <div className="flex items-center gap-3">
              <span className="text-xs text-ivory-muted font-mono">
                Hey, <span className="text-ivory font-semibold">{firstName}</span> 👋
              </span>
              <Link
                href="/builder"
                className="px-4 py-2 text-xs font-semibold bg-gold text-ink-950 rounded-lg hover:bg-gold-light transition-colors"
              >
                Open Builder →
              </Link>
              <button
                onClick={() => signOut()}
                className="text-xs text-ivory-dim hover:text-ivory-muted transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            // ── Guest state ──
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-xs font-medium text-ivory-muted hover:text-ivory transition-colors">
                Log In
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 text-xs font-semibold bg-gold text-ink-950 rounded-lg hover:bg-gold-light transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>

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
        </div>

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

          {/* CTA — changes based on auth state */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          >
            {user ? (
              // Logged-in: go straight to builder
              <>
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
              </>
            ) : (
              // Guest: go to login
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-ink-950 font-semibold text-sm rounded-xl hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5"
                >
                  Get Started Free
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-ink-600 text-ivory-muted text-sm rounded-xl hover:border-ivory/30 hover:text-ivory transition-all duration-300"
                >
                  Log In
                </Link>
              </>
            )}
          </motion.div>

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
                <div className="ml-4 text-xs font-mono text-ivory-dim">resume.tex — ResumeTeX Builder</div>
              </div>
              {/* Split preview */}
              <div className="grid grid-cols-2 min-h-[280px]">
                {/* Form side */}
                <div className="p-5 border-r border-ink-700">
                  <div className="text-xs font-mono text-gold/70 mb-4">// Personal Info</div>
                  {['Full Name', 'Email Address', 'Phone Number', 'Location'].map((field, i) => (
                    <div key={field} className="mb-3">
                      <div className="text-[10px] text-ivory-dim mb-1">{field}</div>
                      <div className="h-7 rounded bg-ink-700 border border-ink-600 animate-pulse" style={{ animationDelay: `${i * 0.1}s`, width: `${70 + i * 5}%` }} />
                    </div>
                  ))}
                </div>
                {/* Code side */}
                <div className="p-5 bg-ink-900">
                  <div className="text-xs font-mono text-gold/70 mb-4">// LaTeX Output</div>
                  <pre className="text-[10px] font-mono text-ivory-muted leading-5 opacity-70">{`\\begin{document}
\\textbf{\\Huge Alex Johnson}

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
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-28 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-label text-center justify-center flex">Capabilities</div>
          <h2 className="font-display text-4xl font-bold text-ivory">Everything you need</h2>
        </div>
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

      {/* How it works */}
      <section className="px-8 py-20 border-t border-ink-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label text-center justify-center flex">Process</div>
            <h2 className="font-display text-4xl font-bold text-ivory">How it works</h2>
          </div>
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
                )}
                <div className="font-mono text-3xl font-bold text-gold/20 mb-3">{step.num}</div>
                <h3 className="font-display font-semibold text-ivory text-lg mb-2">{step.title}</h3>
                <p className="text-ivory-muted text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
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
      <footer className="border-t border-ink-800 px-8 py-6 flex items-center justify-between text-xs text-ivory-dim font-mono">
        <span>ResumeTeX — LaTeX Resume Builder</span>
        <span>Powered by LaTeX.online API + Claude AI</span>
      </footer>
    </div>
  );
}