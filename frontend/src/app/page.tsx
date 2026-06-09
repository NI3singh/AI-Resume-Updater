// src/app/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Cpu, Download, GitBranch, Zap, ExternalLink, Sparkles } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import AmbientGlyphs from '@/components/ui/AmbientGlyphs';
import { useAuth } from '@/context/AuthContext';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const features = [
  { icon: FileText,  title: 'Your Template, Your Rules', desc: 'Built around your exact LaTeX template. No generic defaults — it adapts to your structure.' },
  { icon: Cpu,       title: 'Live LaTeX Preview',        desc: 'Watch the LaTeX source regenerate as you type. Every field maps straight into your template.' },
  { icon: GitBranch, title: 'Versions & Drafts',         desc: 'Keep a master resume and branch tailored versions. Save, revert, and switch anytime.' },
  { icon: Download,  title: 'Compile to PDF',            desc: 'One click compiles your filled LaTeX through an online engine. Download a pixel-perfect PDF.' },
];

const steps = [
  { num: '01', title: 'Fill your details',   desc: 'Enter your info into the template fields — personal, experience, projects, skills, and more.' },
  { num: '02', title: 'Review & edit',       desc: 'See the live LaTeX code update as you type. Bold a word, reorder sections, tweak any field.' },
  { num: '03', title: 'Compile & download',  desc: 'Hit compile. Your LaTeX is sent to the engine and returns a perfectly typeset PDF.' },
];

export default function HomePage() {
  const { user, loading, signOut } = useAuth();

  const firstName = user?.email
    ? user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1)
    : null;

  return (
    <div className="min-h-screen bg-ink-950 overflow-x-hidden selection:bg-gold/25 selection:text-ivory">
      {/* Ambient drifting golden LaTeX glyphs (behind everything, click-through) */}
      <AmbientGlyphs />

      <div className="relative z-10">

      {/* ── Floating Navbar ───────────────────────────────────────────────── */}
      <nav className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between pl-4 pr-3 py-2.5 rounded-2xl border border-ink-700/60 backdrop-blur-xl bg-ink-900/70 shadow-xl shadow-black/40">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-xl border border-gold/45 bg-gold/10 flex items-center justify-center shadow-sm shadow-gold/10 transition-transform duration-300 group-hover:rotate-6">
            <span className="text-gold text-sm font-mono font-bold">λ</span>
            <div className="absolute -inset-1 rounded-xl bg-gold/10 blur-md -z-10" />
          </div>
          <span className="font-display font-bold text-ivory text-sm tracking-tight">Resume<span className="text-gold">TeX</span></span>
        </Link>

        {/* Right nav */}
        <div className="flex items-center gap-3 sm:gap-4">
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
              <Link href="/builder" className="btn-primary !px-4 !py-1.5 !text-xs !rounded-lg">
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
              <Link href="/login" className="btn-primary !px-4 !py-1.5 !text-xs !rounded-lg">
                Get Started
                <ArrowRight size={12} />
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-16">
        {/* Atmosphere: gradient mesh + orbs + grid + giant lambda */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="orb w-[680px] h-[680px] bg-gold/[0.07] top-[-160px] left-[-180px]" />
          <div className="orb w-[520px] h-[520px] bg-jade/[0.05] bottom-[-120px] right-[-140px]" />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(60% 50% at 50% 38%, rgba(201,168,76,0.08), transparent 70%)',
          }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)',
          }} />
          {/* Oversized brand watermark */}
          <span className="absolute -right-6 top-24 font-serif italic text-gold/[0.05] leading-none select-none animate-floaty" style={{ fontSize: '26rem' }}>λ</span>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/25 bg-gold/[0.07] text-gold text-[11px] font-mono tracking-wide mb-8"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
            </span>
            LaTeX-powered · Pixel-perfect · Yours
          </motion.div>

          {/* Title — Fraunces serif */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="font-serif text-6xl md:text-7xl lg:text-[5.5rem] font-semibold leading-[1.02] tracking-tight text-balance mb-6"
          >
            Your résumé,
            <br />
            <span className="text-shimmer italic font-medium">perfectly typeset.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
            className="text-ivory/65 text-base md:text-lg max-w-xl mx-auto mb-9 leading-relaxed text-balance"
          >
            Fill your personal LaTeX template field by field, watch the source update
            live, and compile to a pixel-perfect PDF — in one click.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.24 }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            {user ? (
              <Link href="/builder" className="btn-primary !px-7 !py-3">
                Open Builder
                <ArrowRight size={15} />
              </Link>
            ) : (
              <>
                <Link href="/login" className="btn-primary !px-7 !py-3">
                  Get Started Free
                  <ArrowRight size={15} />
                </Link>
                <Link href="/login" className="btn-ghost !px-6 !py-3">
                  Log In
                </Link>
              </>
            )}
          </motion.div>

          {/* Hero mockup */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            className="mt-16 relative"
          >
            <div className="absolute -inset-x-10 -top-6 -bottom-10 glow-gold blur-2xl rounded-[2rem]" />
            <div className="relative mx-auto max-w-3xl rounded-2xl border border-ink-700/80 bg-ink-900 overflow-hidden shadow-2xl shadow-black/70">
              {/* gold top hairline */}
              <div className="absolute top-0 inset-x-10 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
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
              <div className="grid grid-cols-2 min-h-[260px] text-left">
                <div className="p-5 border-r border-ink-700/50">
                  <div className="text-[10px] font-mono text-gold/60 mb-4 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                    Personal Info
                  </div>
                  {['Full Name', 'Email Address', 'Phone Number', 'Location'].map((field, i) => (
                    <div key={field} className="mb-3">
                      <div className="text-[9px] font-mono text-ivory-dim/60 mb-1 uppercase tracking-wider">{field}</div>
                      <div className="h-6 rounded-lg bg-ink-700/80 border border-ink-600/50 overflow-hidden" style={{ width: `${68 + i * 7}%` }}>
                        <div className="h-full bg-gradient-to-r from-gold/[0.08] to-transparent animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-5 bg-ink-950/60">
                  <div className="text-[10px] font-mono text-jade/60 mb-4 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-jade/60" />
                    LaTeX Output
                  </div>
                  <pre className="text-[10px] font-mono leading-[18px] opacity-60 text-ivory-muted">{`\\begin{document}
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
      <section className="relative px-6 py-28 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-label flex justify-center">Capabilities</div>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-ivory mt-2 tracking-tight">Everything you need</h2>
          <p className="text-ivory/50 text-sm mt-4 max-w-md mx-auto">From raw fields to publication-quality PDF — in seconds.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              className="card group relative overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1 hover:border-gold/35 hover:shadow-xl hover:shadow-gold/[0.07]"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute top-3 right-4 font-mono text-[11px] text-ink-500/70 group-hover:text-gold/50 transition-colors">0{i + 1}</span>
              <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/20 group-hover:border-gold/35 group-hover:scale-105 transition-all duration-200">
                <f.icon size={18} className="text-gold" />
              </div>
              <h3 className="font-display font-bold text-ivory text-sm mb-2 leading-snug">{f.title}</h3>
              <p className="text-ivory/50 text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="relative px-6 py-24 border-t border-ink-800/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label flex justify-center">Process</div>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-ivory mt-2 tracking-tight">Three steps to done</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-7 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] rule-gold opacity-60" />
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.12 }}
                className="relative"
              >
                <div className="w-14 h-14 rounded-2xl bg-ink-800 border border-ink-700 flex items-center justify-center mb-5 shadow-md shadow-black/20 relative z-10">
                  <span className="font-serif text-xl font-semibold text-gold/80">{step.num}</span>
                </div>
                <h3 className="font-display font-bold text-ivory text-base mb-2">{step.title}</h3>
                <p className="text-ivory/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative px-6 py-32 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="orb w-[640px] h-[360px] bg-gold/[0.08] -top-16 left-1/2 -translate-x-1/2" />
          <div className="absolute top-0 inset-x-0 rule-gold opacity-50" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 mb-6 text-xs font-mono text-jade px-3 py-1.5 rounded-full border border-jade/20 bg-jade/[0.08]"
          >
            <Sparkles size={12} />
            No LaTeX knowledge needed
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="font-serif text-5xl md:text-6xl font-semibold text-ivory mb-5 tracking-tight text-balance"
          >
            Build your resume
            <br />
            <span className="text-shimmer italic font-medium">right now.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            className="text-ivory/50 text-sm mb-9"
          >
            Just fill in your details — we handle the typesetting.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
          >
            <Link href={user ? '/builder' : '/login'} className="btn-primary !px-8 !py-3.5 !text-sm">
              <Zap size={15} />
              {user ? 'Launch Builder' : 'Start Building Free'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-ink-800/60 px-6 py-7">
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
            <span>Typeset with LaTeX</span>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
