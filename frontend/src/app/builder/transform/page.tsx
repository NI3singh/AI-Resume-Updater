// src/app/builder/transform/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  AlertTriangle, ArrowLeft, ShieldCheck, Target, Wand2,
} from 'lucide-react';
import { ResumeData, SectionConfig } from '@/lib/types';
import { api, ApiError } from '@/lib/api';
import { JD_MAX_CHARS } from '@/lib/resumeTransform';
import {
  TransformHandoff, markPendingActive, readTransformHandoff,
  writeTransformResult,
} from '@/lib/transformSession';
import { useAuth } from '@/context/AuthContext';
import { PageLoader, Spinner } from '@/components/ui/Spinner';
import { LogoMark } from '@/components/ui/Logo';
import TransformWorkspace from '@/components/builder/TransformWorkspace';

export default function TransformPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // Wait for client hydration before reading sessionStorage (SSR-safe).
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const handoff = useMemo<TransformHandoff | null>(
    () => (hydrated ? readTransformHandoff() : null),
    [hydrated],
  );

  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jd, setJd] = useState('');
  const [started, setStarted] = useState(false);
  const [forking, setForking] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.replace('/login');
  }, [user, authLoading, router]);

  const hasContent = useMemo(() => {
    if (!handoff) return false;
    const d = handoff.resumeData;
    return [
      d.education, d.skills, d.projects, d.experience,
      d.extracurricular, d.achievements, d.certifications, d.publications,
    ].some((s) => (s?.length ?? 0) > 0);
  }, [handoff]);

  const canStart = !!handoff && !!jd.trim() && hasContent;

  // ── Finish paths ────────────────────────────────────────────────────────────
  const finishApply = (data: ResumeData, sectionConfig?: SectionConfig[]) => {
    if (!handoff) return;
    writeTransformResult({
      resumeId: handoff.resumeId,
      data,
      ...(sectionConfig ? { sectionConfig } : {}),
    });
    router.replace('/builder');
  };

  const finishBranch = async (
    name: string,
    data: ResumeData,
    sectionConfig?: SectionConfig[],
  ): Promise<boolean> => {
    if (!handoff || forking) return false;
    setForking(true);
    try {
      const created = await api<{ id: string }>('/resumes/fork', {
        method: 'POST',
        body: JSON.stringify({
          name,
          resume_data: data,
          // Persist the TAILORED layout (dropped sections removed) — falling
          // back to the original only when the caller didn't send one.
          section_config: sectionConfig ?? handoff.sectionConfig,
        }),
      });
      markPendingActive(created.id);
      router.replace('/builder');
      return true;
    } catch (err) {
      // Surface the server's message when we have one; keep the wizard open.
      if (!(err instanceof ApiError)) console.error('fork:', err);
      return false;
    } finally {
      setForking(false);
    }
  };

  // ── Render gates ────────────────────────────────────────────────────────────
  if (authLoading || !hydrated || !user) {
    return <PageLoader label="Preparing the tailoring studio…" />;
  }

  if (!handoff) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center px-4">
        <div className="card-glass max-w-md w-full text-center">
          <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/25 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={20} className="text-gold" />
          </div>
          <h1 className="font-display font-bold text-ivory text-base">No résumé selected</h1>
          <p className="text-ivory/50 text-xs mt-2 leading-relaxed">
            Open your resume in the builder first, then start tailoring from there —
            this page works on the resume you were just editing.
          </p>
          <button
            onClick={() => router.replace('/builder')}
            className="btn-primary mt-6 mx-auto !px-5 !py-2 !text-xs"
          >
            <ArrowLeft size={13} /> Back to builder
          </button>
        </div>
      </div>
    );
  }

  if (started) {
    return (
      <TransformWorkspace
        resumeName={handoff.resumeName}
        sectionConfig={handoff.sectionConfig}
        jobTitle={jobTitle}
        company={company}
        jobDescription={jd.trim()}
        data={handoff.resumeData}
        onApply={finishApply}
        onSaveBranch={finishBranch}
        onExit={() => router.replace('/builder')}
      />
    );
  }

  // ── Setup phase ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-ink-950 overflow-x-hidden relative">
      {/* Ambient atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="orb w-[600px] h-[600px] bg-gold/[0.06] top-[-200px] left-[-180px]" />
        <div className="orb w-[460px] h-[460px] bg-jade/[0.04] bottom-[-160px] right-[-140px]" />
        <span className="absolute -right-8 top-16 font-serif italic text-gold/[0.04] leading-none select-none animate-floaty" style={{ fontSize: '22rem' }}>λ</span>
      </div>

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between gap-3 px-4 py-2.5 border-b border-ink-800/80 bg-ink-900/90 backdrop-blur-md flex-shrink-0 min-h-[52px]">
        <button
          onClick={() => router.replace('/builder')}
          className="flex items-center gap-1.5 text-ivory-dim hover:text-ivory transition-colors text-xs cursor-pointer px-2 py-1.5 rounded-lg hover:bg-ink-800/60"
        >
          <ArrowLeft size={14} />
          <span className="hidden md:block font-mono">Builder</span>
        </button>
        <div className="flex items-center gap-2.5 min-w-0">
          <LogoMark size={22} />
          <span className="font-display font-bold text-ivory text-sm hidden sm:block">Tailor for a role</span>
        </div>
        <span className="text-[10px] font-mono text-ink-500 truncate max-w-[180px] sm:max-w-xs" title={handoff.resumeName}>
          {handoff.resumeName}
        </span>
      </header>

      {/* Setup form */}
      <main className="relative z-10 flex items-start justify-center px-4 pt-14 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card-glass w-full max-w-2xl"
        >
          <div className="flex items-start gap-3.5 mb-6">
            <div className="w-11 h-11 rounded-xl border border-gold/30 bg-gold/[0.08] flex items-center justify-center flex-shrink-0">
              <Target size={19} className="text-gold" />
            </div>
            <div>
              <h1 className="font-display font-bold text-ivory text-lg leading-tight">Tailor your résumé</h1>
              <p className="text-ivory/50 text-xs mt-1 leading-relaxed max-w-md">
                Paste a job description and walk through your résumé unit by unit —
                review and approve every AI rewrite before it lands. Facts and numbers
                are never invented.
              </p>
            </div>
          </div>

          {!hasContent && (
            <div className="flex items-start gap-2 rounded-lg border border-gold/25 bg-gold/[0.06] px-3.5 py-3 mb-5">
              <AlertTriangle size={14} className="text-gold flex-shrink-0 mt-0.5" />
              <p className="text-ivory/60 text-xs leading-relaxed">
                “{handoff.resumeName}” has nothing to tailor yet — add some content in
                the builder first.
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label htmlFor="tf-title" className="text-[10px] text-ivory-dim uppercase tracking-widest mb-1.5 block font-semibold">
                Job title <span className="normal-case tracking-normal font-normal">(optional)</span>
              </label>
              <input
                id="tf-title"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Data Analyst"
                className="input-base !px-3 !py-2 !text-xs"
              />
            </div>
            <div>
              <label htmlFor="tf-company" className="text-[10px] text-ivory-dim uppercase tracking-widest mb-1.5 block font-semibold">
                Company <span className="normal-case tracking-normal font-normal">(optional)</span>
              </label>
              <input
                id="tf-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Google"
                className="input-base !px-3 !py-2 !text-xs"
              />
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="tf-jd" className="text-[10px] text-ivory-dim uppercase tracking-widest mb-1.5 block font-semibold">
              Job description
            </label>
            <textarea
              id="tf-jd"
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              maxLength={JD_MAX_CHARS}
              rows={12}
              placeholder="Paste the full job description here — responsibilities, requirements, skills…"
              className="input-base !text-xs !leading-relaxed resize-y min-h-[200px]"
            />
            <p className="text-right text-[10px] text-ink-500 mt-1 font-mono">
              {jd.length.toLocaleString()} / {JD_MAX_CHARS.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="flex items-start gap-1.5 text-[11px] text-ivory/40 leading-relaxed max-w-sm">
              <ShieldCheck size={12} className="text-jade/70 flex-shrink-0 mt-0.5" />
              <span>
                You’ll review each section in a guided workspace and choose what to apply.
                Nothing changes until you accept it.
              </span>
            </p>
            <button
              onClick={() => setStarted(true)}
              disabled={!canStart}
              className="flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer shadow-sm shadow-gold/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {forking ? <Spinner size={13} tone="current" /> : <Wand2 size={14} />}
              Start tailoring
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
