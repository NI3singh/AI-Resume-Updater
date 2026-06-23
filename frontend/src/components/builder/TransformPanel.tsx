// src/components/builder/TransformPanel.tsx
'use client';

import { useState } from 'react';
import { Target, AlertTriangle, Wand2, ShieldCheck } from 'lucide-react';
import { ResumeData } from '@/lib/types';
import { JD_MAX_CHARS } from '@/lib/resumeTransform';
import TransformWizard from './TransformWizard';

interface TransformPanelProps {
  data: ResumeData | null;
  /** Whether the current resume has tailorable content (computed by the page). */
  hasContent: boolean;
  /** Apply the tailored data to the current resume (unsaved + undoable). */
  onApply: (data: ResumeData) => void;
  /** Save the tailored data as a new resume branch; resolves false on failure. */
  onSaveBranch: (name: string, data: ResumeData) => Promise<boolean>;
}

export default function TransformPanel({ data, hasContent, onApply, onSaveBranch }: TransformPanelProps) {
  const [jd, setJd]             = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany]   = useState('');
  const [open, setOpen]         = useState(false);

  const canStart = !!data && !!jd.trim() && hasContent;

  return (
    <div className="p-4 space-y-4">
      {/* Heading */}
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-lg border border-gold/30 bg-gold/[0.08] flex items-center justify-center flex-shrink-0">
          <Target size={15} className="text-gold" />
        </div>
        <div>
          <h2 className="font-display font-bold text-ivory text-sm">Tailor for a job</h2>
          <p className="text-ivory/50 text-xs mt-0.5 leading-relaxed">
            Paste a job description and walk through your résumé section by section —
            review and approve each AI rewrite before it lands. Facts and numbers are
            never invented.
          </p>
        </div>
      </div>

      {!hasContent && (
        <div className="flex items-start gap-2 rounded-lg border border-gold/25 bg-gold/[0.06] px-3 py-2.5">
          <AlertTriangle size={13} className="text-gold flex-shrink-0 mt-0.5" />
          <p className="text-ivory/60 text-xs leading-relaxed">
            Your résumé is empty — add some content in Manual mode first, so there&apos;s
            something to tailor.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="tf-title" className="text-[10px] text-ivory-dim uppercase tracking-widest mb-1 block font-semibold">
            Job title <span className="normal-case tracking-normal font-normal">(optional)</span>
          </label>
          <input
            id="tf-title"
            type="text"
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
            placeholder="e.g. Data Analyst"
            className="input-base !px-3 !py-2 !text-xs"
          />
        </div>
        <div>
          <label htmlFor="tf-company" className="text-[10px] text-ivory-dim uppercase tracking-widest mb-1 block font-semibold">
            Company <span className="normal-case tracking-normal font-normal">(optional)</span>
          </label>
          <input
            id="tf-company"
            type="text"
            value={company}
            onChange={e => setCompany(e.target.value)}
            placeholder="e.g. Google"
            className="input-base !px-3 !py-2 !text-xs"
          />
        </div>
      </div>

      <div>
        <label htmlFor="tf-jd" className="text-[10px] text-ivory-dim uppercase tracking-widest mb-1 block font-semibold">
          Job description
        </label>
        <textarea
          id="tf-jd"
          value={jd}
          onChange={e => setJd(e.target.value)}
          maxLength={JD_MAX_CHARS}
          rows={9}
          placeholder="Paste the full job description here — responsibilities, requirements, skills…"
          className="input-base !text-xs !leading-relaxed resize-y min-h-[120px]"
        />
        <p className="text-right text-[10px] text-ink-500 mt-1 font-mono">
          {jd.length.toLocaleString()} / {JD_MAX_CHARS.toLocaleString()}
        </p>
      </div>

      <button
        onClick={() => setOpen(true)}
        disabled={!canStart}
        className="w-full flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer shadow-sm shadow-gold/25 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Wand2 size={13} /> Start tailoring
      </button>

      <p className="flex items-start gap-1.5 text-[11px] text-ivory/40 leading-relaxed">
        <ShieldCheck size={12} className="text-jade/70 flex-shrink-0 mt-0.5" />
        <span>
          You&apos;ll review each section in a step-by-step dialog and choose what to apply.
          Nothing changes until you accept it.
        </span>
      </p>

      {open && data && (
        <TransformWizard
          data={data}
          jobTitle={jobTitle}
          company={company}
          jobDescription={jd.trim()}
          onApply={onApply}
          onSaveBranch={onSaveBranch}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
