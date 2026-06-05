// src/components/builder/sections/Education.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { ResumeData, EducationEntry } from '@/lib/types';

interface Props { data: ResumeData; onChange: (d: ResumeData) => void; }

const newEntry = (): EducationEntry => ({
  id: `edu_${Date.now()}`,
  institution: '', location: '', gpaLabel: '',
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
                          placeholder="Uka Tarsadia University" />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Location</label>
                          <input className="input-base" value={edu.location}
                            onChange={e => update(edu.id, { location: e.target.value })}
                            placeholder="Surat, Gujarat" />
                        </div>
                        <div>
                          <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">GPA Label</label>
                          <input className="input-base" value={edu.gpaLabel}
                            onChange={e => update(edu.id, { gpaLabel: e.target.value })}
                            placeholder="Agg. CGPA: 8.68" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Degree *</label>
                        <input className="input-base" value={edu.degree}
                          onChange={e => update(edu.id, { degree: e.target.value })}
                          placeholder="B.Tech Artificial Intelligence & Data Science" />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Start Date</label>
                          <input className="input-base" value={edu.startDate}
                            onChange={e => update(edu.id, { startDate: e.target.value })}
                            placeholder="Sep 2021" />
                        </div>
                        <div>
                          <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">End Date</label>
                          <input className="input-base" value={edu.endDate}
                            onChange={e => update(edu.id, { endDate: e.target.value })}
                            placeholder="May 2025" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Highlight (italic note)</label>
                        <input className="input-base" value={edu.highlight}
                          onChange={e => update(edu.id, { highlight: e.target.value })}
                          placeholder="Achieved a perfect 10.0 SGPA in the final semester..." />
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