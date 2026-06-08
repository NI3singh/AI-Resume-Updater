// src/components/builder/sections/Education.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { ResumeData, EducationEntry } from '@/lib/types';
import MonthYearPicker from '@/components/builder/MonthYearPicker';
import { formatScore } from '@/lib/latexTemplate';

interface Props { data: ResumeData; onChange: (d: ResumeData) => void; }

// Placeholder shown in the value box for each grade/score format.
const SCORE_PLACEHOLDER: Record<string, string> = {
  CGPA: '8.68 / 10',
  GPA: '3.8 / 4.0',
  Percentage: '85.4',
  Grade: 'A+',
  '': 'e.g. First Class with Distinction',
};

const newEntry = (): EducationEntry => ({
  id: `edu_${Date.now()}`,
  institution: '', location: '', gpaFormat: 'CGPA', gpaLabel: '',
  degree: '', startDate: '', endDate: '', highlight: '',
});

export default function EducationSection({ data, onChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const add = () => {
    const entry = newEntry();
    onChange({ ...data, education: [...data.education, entry] });
    setExpanded(entry.id);
  };
  const remove = (id: string) => {
    onChange({ ...data, education: data.education.filter(e => e.id !== id) });
    if (expanded === id) setExpanded(null);
  };
  const update = (id: string, patch: Partial<EducationEntry>) =>
    onChange({ ...data, education: data.education.map(e => e.id === id ? { ...e, ...patch } : e) });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="section-label mb-0">Education</div>
        <button onClick={add} className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors font-medium">
          <Plus size={13} /> Add Entry
        </button>
      </div>

      {data.education.length === 0 && (
        <div className="border border-dashed border-ink-600 rounded-xl p-8 text-center">
          <p className="text-ivory-muted text-xs mb-3">No education entries yet</p>
          <button onClick={add} className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors">
            <Plus size={12} /> Add education
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {data.education.map((edu, idx) => (
            <motion.div key={edu.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="border border-ink-700 rounded-xl overflow-hidden bg-ink-800">
              <div className="flex items-center gap-2 px-3 py-2.5">
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setExpanded(expanded === edu.id ? null : edu.id)}>
                  <p className="text-xs font-medium text-ivory truncate">{edu.institution || `Education ${idx + 1}`}</p>
                  {edu.degree && <p className="text-[10px] text-ivory-muted truncate">{edu.degree}</p>}
                </div>
                <button onClick={() => remove(edu.id)} className="p-1 text-ivory-muted hover:text-crimson transition-colors"><Trash2 size={12} /></button>
                <button onClick={() => setExpanded(expanded === edu.id ? null : edu.id)} className="p-1 text-ivory-muted hover:text-ivory transition-colors">
                  {expanded === edu.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
              </div>

              <AnimatePresence>
                {expanded === edu.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                    className="border-t border-ink-700 overflow-hidden">
                    <div className="p-3 flex flex-col gap-3">

                      <div>
                        <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Institution *</label>
                        <input className="input-base" value={edu.institution}
                          onChange={e => update(edu.id, { institution: e.target.value })}
                          placeholder="University of California, Berkeley" />
                      </div>

                      <div>
                        <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Location</label>
                        <input className="input-base" value={edu.location}
                          onChange={e => update(edu.id, { location: e.target.value })}
                          placeholder="Berkeley, CA" />
                      </div>

                      <div>
                        <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Grade / Score</label>
                        <div className="flex gap-2">
                          <select
                            className="input-base !w-auto flex-shrink-0 cursor-pointer"
                            value={edu.gpaFormat ?? ''}
                            onChange={e => update(edu.id, { gpaFormat: e.target.value })}
                          >
                            <option value="CGPA">CGPA</option>
                            <option value="GPA">GPA</option>
                            <option value="Percentage">Percentage</option>
                            <option value="Grade">Grade</option>
                            <option value="">Custom</option>
                          </select>
                          <input
                            className="input-base flex-1"
                            value={edu.gpaLabel}
                            onChange={e => update(edu.id, { gpaLabel: e.target.value })}
                            placeholder={SCORE_PLACEHOLDER[edu.gpaFormat ?? ''] ?? '8.68 / 10'}
                          />
                        </div>
                        {formatScore(edu.gpaFormat, edu.gpaLabel) && (
                          <p className="text-[9px] font-mono text-ink-500 mt-1">Shows as: {formatScore(edu.gpaFormat, edu.gpaLabel)}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Degree *</label>
                        <input className="input-base" value={edu.degree}
                          onChange={e => update(edu.id, { degree: e.target.value })}
                          placeholder="B.S. in Computer Science" />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Start Date</label>
                          <MonthYearPicker value={edu.startDate}
                            onChange={v => update(edu.id, { startDate: v })}
                            placeholder="Aug 2019" />
                        </div>
                        <div>
                          <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">End Date</label>
                          <MonthYearPicker value={edu.endDate}
                            onChange={v => update(edu.id, { endDate: v })}
                            placeholder="May 2023" allowPresent />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Highlight (italic note)</label>
                        <input className="input-base" value={edu.highlight}
                          onChange={e => update(edu.id, { highlight: e.target.value })}
                          placeholder="Graduated with honors; Dean's List all semesters" />
                        <p className="text-[9px] font-mono text-ink-500 mt-1">Rendered in italics below the degree line</p>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}