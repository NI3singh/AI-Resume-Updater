// src/app/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Upload, Cpu, Download, CheckCircle, Zap, ExternalLink } from 'lucide-react';
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

  const firstName = user?.email
    ? user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1)
    : null;

  return (
    <div className="min-h-screen bg-ink-950 overflow-x-hidden">

      {/* ── Floating Navbar ───────────────────────────────────────────────── */}
      <nav className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-5 py-3 rounded-2xl border border-ink-700/60 backdrop-blur-xl bg-ink-900/80 shadow-xl shadow-black/30">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg border border-gold/50 bg-gold/10 flex items-center justify-center shadow-sm shadow-gold/10">
            <span className="text-gold text-xs font-mono font-bold">λ</span>
          </div>
          <span className="font-display font-bold text-ivory text-sm tracking-tight">ResumeTeX</span>
        </div>

        {/* Right nav */}
        <div className="flex items-center gap-4">
          <a
            href="https://latex.online"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-xs font-medium text-ivory-muted hover:text-ivory transition-colors duration-200 animated-underline"
          >
            LaTeX.online
            <ExternalLink size={10} className="opacity-50" />
          </a>
          <ThemeToggle />
          {loading ? (
            <div className="w-24 h-8 rounded-lg bg-ink-700 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-xs text-ivory-muted font-mono">
                Hey, <span className="text-ivory font-semibold">{firstName}</span>
              </span>
              <Link
                href="/builder"
                className="btn-primary !px-4 !py-1.5 !text-xs !rounded-lg"
              >
                Open Builder
                <ArrowRight size={12} />
              </Link>
              <button
                onClick={() => signOut()}
                className="text-xs text-ivory-dim hover:text-ivory-muted transition-colors cursor-pointer"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="text-xs font-medium text-ivory-muted hover:text-ivory transition-colors duration-200">
                Log In
              </Link>
              <Link
                href="/login"
                className="btn-primary !px-4 !py-1.5 !text-xs !rounded-lg"
              >
                Get Started
                <ArrowRight size={12} />
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="orb w-[600px] h-[600px] bg-gold/[0.06] top-[-100px] left-[-150px]" />
          <div className="orb w-[500px] h-[500px] bg-jade/[0.05] bottom-[-80px] right-[-120px]" />
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.025]" style={{
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/25 bg-gold/[0.08] text-gold text-xs font-mono mb-8"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
            </span>
            LaTeX-powered. AI-assisted. Yours.
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
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
            className="text-ivory/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Fill your personal LaTeX resume template — manually or by uploading your old resume.
            AI extracts everything. One click compiles to PDF.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            {user ? (
              <>
                <Link href="/builder" className="btn-primary">
                  Open Builder
                  <ArrowRight size={15} />
                </Link>
                <Link href="/builder?mode=upload" className="btn-ghost">
                  <Upload size={14} />
                  Upload Resume
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-primary">
                  Get Started Free
                  <ArrowRight size={15} />
                </Link>
                <Link href="/login" className="btn-ghost">
                  Log In
                </Link>
              </>
            )}
          </motion.div>

          {/* Hero mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 relative"
          >
            {/* Glow behind mockup */}
            <div className="absolute -inset-4 bg-gold/[0.04] blur-3xl rounded-3xl" />
            <div className="relative mx-auto max-w-3xl rounded-2xl border border-ink-700/80 bg-ink-900 overflow-hidden shadow-2xl shadow-black/70">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-ink-700/80 bg-ink-800/60">
                <div className="w-2.5 h-2.5 rounded-full bg-crimson/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-gold/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-jade/70" />
                <div className="ml-3 flex-1 flex items-center justify-center">
                  <div className="px-3 py-0.5 rounded-md bg-ink-700/60 border border-ink-600/50 text-[10px] font-mono text-ivory-dim">
                    resume.tex — ResumeTeX Builder
                  </div>
                </div>
              </div>
              {/* Split preview */}
              <div className="grid grid-cols-2 min-h-[260px]">
                {/* Form side */}
                <div className="p-5 border-r border-ink-700/50">
                  <div className="text-[10px] font-mono text-gold/60 mb-4 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                    Personal Info
                  </div>
                  {['Full Name', 'Email Address', 'Phone Number', 'Location'].map((field, i) => (
                    <div key={field} className="mb-3">
                      <div className="text-[9px] font-mono text-ivory-dim/60 mb-1 uppercase tracking-wider">{field}</div>
                      <div
                        className="h-6 rounded-lg bg-ink-700/80 border border-ink-600/50 overflow-hidden"
                        style={{ width: `${68 + i * 7}%` }}
                      >
                        <div
                          className="h-full bg-gradient-to-r from-ink-600/30 to-transparent animate-pulse"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Code side */}
                <div className="p-5 bg-ink-950/60">
                  <div className="text-[10px] font-mono text-jade/60 mb-4 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-jade/60" />
                    LaTeX Output
                  </div>
                  <pre className="text-[10px] font-mono leading-[18px] opacity-55">{`\\begin{document}
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

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="px-6 py-28 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-label flex justify-center">Capabilities</div>
          <h2 className="font-display text-4xl font-bold text-ivory mt-2">Everything you need</h2>
          <p className="text-ivory/50 text-sm mt-3 max-w-md mx-auto">
            From raw data to publication-quality PDF — in seconds.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card group cursor-default hover:border-gold/35 hover:shadow-lg hover:shadow-gold/[0.08] relative overflow-hidden"
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/20 group-hover:border-gold/35 transition-all duration-200">
                <f.icon size={18} className="text-gold" />
              </div>
              <h3 className="font-display font-bold text-ivory text-sm mb-2 leading-snug">{f.title}</h3>
              <p className="text-ivory/50 text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="px-6 py-20 border-t border-ink-800/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label flex justify-center">Process</div>
            <h2 className="font-display text-4xl font-bold text-ivory mt-2">How it works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-7 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px bg-gradient-to-r from-gold/25 via-gold/15 to-gold/25" />
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {/* Numbered badge */}
                <div className="w-14 h-14 rounded-2xl bg-ink-800 border border-ink-700 flex items-center justify-center mb-5 shadow-md shadow-black/20">
                  <span className="font-mono text-lg font-bold text-gold/70">{step.num}</span>
                </div>
                <h3 className="font-display font-bold text-ivory text-base mb-2">{step.title}</h3>
                <p className="text-ivory/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative px-6 py-28 text-center overflow-hidden">
        {/* Glow background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="orb w-[600px] h-[350px] bg-gold/[0.07] -top-16 left-1/2 -translate-x-1/2" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-5 text-xs font-mono text-jade px-3 py-1.5 rounded-full border border-jade/20 bg-jade/[0.08]"
          >
            <CheckCircle size={12} />
            No account required. Runs in your browser.
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl font-extrabold text-ivory mb-4 tracking-tight"
          >
            Build your resume<br />
            <span className="text-shimmer">right now</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-ivory/50 text-sm mb-8"
          >
            No LaTeX knowledge needed. Just fill in your details.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <Link href="/builder" className="btn-primary !px-8 !py-3.5 !text-sm">
              <Zap size={15} />
              Launch Builder
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-ink-800/60 px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-ivory-dim font-mono">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border border-gold/30 bg-gold/[0.08] flex items-center justify-center">
              <span className="text-gold text-[9px] font-bold">λ</span>
            </div>
            <span>ResumeTeX</span>
          </div>
          <div className="flex items-center gap-4 text-ink-500">
            <a href="https://latex.online" target="_blank" rel="noopener noreferrer" className="hover:text-ivory-dim transition-colors duration-200">
              LaTeX.online
            </a>
            <span className="text-ink-600">·</span>
            <span>Powered by Claude AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}