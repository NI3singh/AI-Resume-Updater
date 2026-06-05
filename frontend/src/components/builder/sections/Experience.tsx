// src/components/builder/sections/Experience.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { ResumeData, ExperienceEntry } from '@/lib/types';

interface Props { data: ResumeData; onChange: (d: ResumeData) => void; }

const newEntry = (): ExperienceEntry => ({
  id: `exp_${Date.now()}`,
  role: '', company: '', location: '',
  startDate: '', endDate: '', current: false,
  projectSubtitle: '', bullets: [''],
});

export default function ExperienceSection({ data, onChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const add = () => {
    const entry = newEntry();
    onChange({ ...data, experience: [...data.experience, entry] });
    setExpanded(entry.id);
  };
  const remove = (id: string) => {
    onChange({ ...data, experience: data.experience.filter(e => e.id !== id) });
    if (expanded === id) setExpanded(null);
  };
  const update = (id: string, patch: Partial<ExperienceEntry>) =>
    onChange({ ...data, experience: data.experience.map(e => e.id === id ? { ...e, ...patch } : e) });

  const updateBullet = (id: string, idx: number, value: string) => {
    const exp = data.experience.find(e => e.id === id)!;
    const b = [...exp.bullets]; b[idx] = value;
    update(id, { bullets: b });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="section-label mb-0">Experience</div>
        <button onClick={add} className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors font-medium">
          <Plus size={13} /> Add Entry
        </button>
      </div>

      {data.experience.length === 0 && (
        <div className="border border-dashed border-ink-600 rounded-xl p-8 text-center">
          <p className="text-ivory-muted text-xs mb-3">No experience entries yet</p>
          <button onClick={add} className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors">
            <Plus size={12} /> Add your first role
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {data.experience.map((exp, idx) => (
            <motion.div key={exp.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="border border-ink-700 rounded-xl overflow-hidden bg-ink-800">
              <div className="flex items-center gap-2 px-3 py-2.5">
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}>
                  <p className="text-xs font-medium text-ivory truncate">{exp.role || `Experience ${idx + 1}`}</p>
                  {exp.company && <p className="text-[10px] text-ivory-muted truncate">{exp.company}</p>}
                </div>
                <button onClick={() => remove(exp.id)} className="p-1 text-ivory-muted hover:text-crimson transition-colors"><Trash2 size={12} /></button>
                <button onClick={() => setExpanded(expanded === exp.id ? null : exp.id)} className="p-1 text-ivory-muted hover:text-ivory transition-colors">
                  {expanded === exp.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
              </div>

              <AnimatePresence>
                {expanded === exp.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                    className="border-t border-ink-700 overflow-hidden">
                    <div className="p-3 flex flex-col gap-3">

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Job Title *</label>
                          <input className="input-base" value={exp.role}
                            onChange={e => update(exp.id, { role: e.target.value })}
                            placeholder="AI/ML Engineer" />
                        </div>
                        <div>
                          <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Company *</label>
                          <input className="input-base" value={exp.company}
                            onChange={e => update(exp.id, { company: e.target.value })}
                            placeholder="ELaunch Solution Pvt. Ltd." />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Location</label>
                        <input className="input-base" value={exp.location}
                          onChange={e => update(exp.id, { location: e.target.value })}
                          placeholder="Surat, Gujarat" />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Start Date</label>
                          <input className="input-base" value={exp.startDate}
                            onChange={e => update(exp.id, { startDate: e.target.value })}
                            placeholder="Dec 2024" />
                        </div>
                        <div>
                          <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">End Date</label>
                          <input className="input-base" value={exp.endDate}
                            onChange={e => update(exp.id, { endDate: e.target.value })}
                            placeholder="May 2025" disabled={exp.current} />
                        </div>
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <div onClick={() => update(exp.id, { current: !exp.current })}
                          className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${exp.current ? 'bg-gold' : 'bg-ink-600'}`}>
                          <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-all ${exp.current ? 'left-4' : 'left-0.5'}`} />
                        </div>
                        <span className="text-xs text-ivory-muted">Currently working here</span>
                      </label>

                      <div>
                        <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Project Subtitle (optional)</label>
                        <input className="input-base" value={exp.projectSubtitle}
                          onChange={e => update(exp.id, { projectSubtitle: e.target.value })}
                          placeholder="Project: Student Performance Analysis | Python, Numpy" />
                        <p className="text-[9px] font-mono text-ink-500 mt-1">Rendered in italics below the role line</p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-[10px] text-ivory-muted uppercase tracking-wider">Bullet Points</label>
                          <button onClick={() => update(exp.id, { bullets: [...exp.bullets, ''] })} className="text-[10px] text-gold hover:text-gold-light">+ Add</button>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {exp.bullets.map((b, bi) => (
                            <div key={bi} className="bullet-item">
                              <textarea className="input-base flex-1 min-h-[56px] resize-none text-[11px] leading-relaxed"
                                value={b} onChange={e => updateBullet(exp.id, bi, e.target.value)}
                                placeholder="Led development of X, resulting in Y% improvement..." />
                              {exp.bullets.length > 1 && (
                                <button onClick={() => update(exp.id, { bullets: exp.bullets.filter((_, i) => i !== bi) })}
                                  className="mt-2 text-ivory-muted hover:text-crimson transition-colors flex-shrink-0"><Trash2 size={11} /></button>
                              )}
                            </div>
                          ))}
                        </div>
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