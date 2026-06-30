// src/components/builder/CoverLetterPanel.tsx
'use client';

import { useState } from 'react';
import { FileSignature, AlertTriangle, Wand2, ShieldCheck } from 'lucide-react';
import { ResumeData } from '@/lib/types';
import { COVER_JD_MAX } from '@/lib/coverLetter';
import CoverLetterWizard from './CoverLetterWizard';

interface Props {
  data: ResumeData | null;
  /** Whether the résumé has content to ground the letter (computed by the page). */
  hasContent: boolean;
}

export default function CoverLetterPanel({ data, hasContent }: Props) {
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
          <FileSignature size={15} className="text-gold" />
        </div>
        <div>
          <h2 className="font-display font-bold text-ivory text-sm">Cover letter</h2>
          <p className="text-ivory/50 text-xs mt-0.5 leading-relaxed">
            One click turns the job description + this résumé into a tailored cover letter in
            your template — weaving in real projects and skills. Review, tweak, then download
            DOCX or PDF. Facts and numbers are never invented.
          </p>
        </div>
      </div>

      {!hasContent && (
        <div className="flex items-start gap-2 rounded-lg border border-gold/25 bg-gold/[0.06] px-3 py-2.5">
          <AlertTriangle size={13} className="text-gold flex-shrink-0 mt-0.5" />
          <p className="text-ivory/60 text-xs leading-relaxed">
            Your résumé is empty — add some content in Manual mode first, so the letter has
            real projects and skills to draw on.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="cl-title" className="text-[10px] text-ivory-dim uppercase tracking-widest mb-1 block font-semibold">
            Job title <span className="normal-case tracking-normal font-normal">(optional)</span>
          </label>
          <input
            id="cl-title"
            type="text"
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
            placeholder="e.g. Data Analyst"
            className="input-base !px-3 !py-2 !text-xs"
          />
        </div>
        <div>
          <label htmlFor="cl-company" className="text-[10px] text-ivory-dim uppercase tracking-widest mb-1 block font-semibold">
            Company <span className="normal-case tracking-normal font-normal">(optional)</span>
          </label>
          <input
            id="cl-company"
            type="text"
            value={company}
            onChange={e => setCompany(e.target.value)}
            placeholder="e.g. Google"
            className="input-base !px-3 !py-2 !text-xs"
          />
        </div>
      </div>

      <div>
        <label htmlFor="cl-jd" className="text-[10px] text-ivory-dim uppercase tracking-widest mb-1 block font-semibold">
          Job description
        </label>
        <textarea
          id="cl-jd"
          value={jd}
          onChange={e => setJd(e.target.value)}
          maxLength={COVER_JD_MAX}
          rows={9}
          placeholder="Paste the full job description here — responsibilities, requirements, skills…"
          className="input-base !text-xs !leading-relaxed resize-y min-h-[120px]"
        />
        <p className="text-right text-[10px] text-ink-500 mt-1 font-mono">
          {jd.length.toLocaleString()} / {COVER_JD_MAX.toLocaleString()}
        </p>
      </div>

      <button
        onClick={() => setOpen(true)}
        disabled={!canStart}
        className="w-full flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer shadow-sm shadow-gold/25 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Wand2 size={13} /> Generate cover letter
      </button>

      <p className="flex items-start gap-1.5 text-[11px] text-ivory/40 leading-relaxed">
        <ShieldCheck size={12} className="text-jade/70 flex-shrink-0 mt-0.5" />
        <span>
          Uses your exact letter template — only the content changes per job. You can edit
          every part before downloading.
        </span>
      </p>

      {open && data && (
        <CoverLetterWizard
          data={data}
          jobDescription={jd.trim()}
          company={company.trim()}
          jobTitle={jobTitle.trim()}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
