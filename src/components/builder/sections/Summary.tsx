// src/components/builder/sections/Summary.tsx
'use client';

import { ResumeData } from '@/lib/types';

interface Props { data: ResumeData; onChange: (d: ResumeData) => void; }

export default function SummarySection({ data, onChange }: Props) {
  return (
    <div>
      <div className="section-label">Professional Summary</div>
      <p className="text-xs text-ivory-muted mb-4 leading-relaxed">
        A brief 2–4 sentence overview of who you are, your core expertise, and what you bring. Optional but recommended.
      </p>
      <textarea
        value={data.summary}
        onChange={(e) => onChange({ ...data, summary: e.target.value })}
        placeholder="Results-driven software engineer with 5+ years of experience building scalable web applications. Passionate about clean code, system design, and developer experience..."
        className="input-base min-h-[160px] resize-y leading-relaxed"
      />
      <div className="flex justify-between mt-1.5">
        <p className="text-[10px] font-mono text-ivory-muted">~50–100 words recommended</p>
        <p className="text-[10px] font-mono text-ivory-muted">{data.summary.split(/\s+/).filter(Boolean).length} words</p>
      </div>
    </div>
  );
}
