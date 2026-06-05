// src/components/builder/sections/Extracurricular.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { ResumeData, ExtracurricularEntry } from '@/lib/types';

interface Props { data: ResumeData; onChange: (d: ResumeData) => void; }

const newEntry = (): ExtracurricularEntry => ({
  id: `extra_${Date.now()}`,
  title: '', organization: '', startDate: '', endDate: '', bullets: [''],
});

export default function ExtracurricularSection({ data, onChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const add = () => {
    const entry = newEntry();
    onChange({ ...data, extracurricular: [...data.extracurricular, entry] });
    setExpanded(entry.id);
  };
  const remove = (id: string) => {
    onChange({ ...data, extracurricular: data.extracurricular.filter(e => e.id !== id) });
    if (expanded === id) setExpanded(null);
  };
  const update = (id: string, patch: Partial<ExtracurricularEntry>) =>
    onChange({ ...data, extracurricular: data.extracurricular.map(e => e.id === id ? { ...e, ...patch } : e) });

  const updateBullet = (id: string, idx: number, value: string) => {
    const entry = data.extracurricular.find(e => e.id === id)!;
    const b = [...entry.bullets]; b[idx] = value;
    update(id, { bullets: b });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="section-label mb-0">Extracurricular Activities</div>
        <button onClick={add} className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors font-medium">
          <Plus size={13} /> Add Entry
        </button>
      </div>

      {data.extracurricular.length === 0 && (
        <div className="border border-dashed border-ink-600 rounded-xl p-8 text-center">
          <p className="text-ivory-muted text-xs mb-3">No activities yet</p>
          <button onClick={add} className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors">
            <Plus size={12} /> Add activity
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {data.extracurricular.map((entry, idx) => (
            <motion.div key={entry.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="border border-ink-700 rounded-xl overflow-hidden bg-ink-800">
              <div className="flex items-center gap-2 px-3 py-2.5">
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}>
                  <p className="text-xs font-medium text-ivory truncate">{entry.title || `Activity ${idx + 1}`}</p>
                  {entry.organization && <p className="text-[10px] text-ivory-muted truncate">{entry.organization}</p>}
                </div>
                <button onClick={() => remove(entry.id)} className="p-1 text-ivory-muted hover:text-crimson transition-colors"><Trash2 size={12} /></button>
                <button onClick={() => setExpanded(expanded === entry.id ? null : entry.id)} className="p-1 text-ivory-muted hover:text-ivory transition-colors">
                  {expanded === entry.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
              </div>

              <AnimatePresence>
                {expanded === entry.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                    className="border-t border-ink-700 overflow-hidden">
                    <div className="p-3 flex flex-col gap-3">

                      <div>
                        <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Title / Role *</label>
                        <input className="input-base" value={entry.title}
                          onChange={e => update(entry.id, { title: e.target.value })}
                          placeholder="Research Community Member" />
                      </div>

                      <div>
                        <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Organization *</label>
                        <input className="input-base" value={entry.organization}
                          onChange={e => update(entry.id, { organization: e.target.value })}
                          placeholder="Swaayan Drone Club, SVNIT, Surat, Gujarat" />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Start Date</label>
                          <input className="input-base" value={entry.startDate}
                            onChange={e => update(entry.id, { startDate: e.target.value })}
                            placeholder="May 2024" />
                        </div>
                        <div>
                          <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">End Date</label>
                          <input className="input-base" value={entry.endDate}
                            onChange={e => update(entry.id, { endDate: e.target.value })}
                            placeholder="June 2024 / Present" />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-[10px] text-ivory-muted uppercase tracking-wider">Bullet Points</label>
                          <button onClick={() => update(entry.id, { bullets: [...entry.bullets, ''] })} className="text-[10px] text-gold hover:text-gold-light">+ Add</button>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {entry.bullets.map((b, bi) => (
                            <div key={bi} className="bullet-item">
                              <textarea className="input-base flex-1 min-h-[48px] resize-none text-[11px] leading-relaxed"
                                value={b} onChange={e => updateBullet(entry.id, bi, e.target.value)}
                                placeholder="Built and calibrated drones for bootcamp events..." />
                              {entry.bullets.length > 1 && (
                                <button onClick={() => update(entry.id, { bullets: entry.bullets.filter((_, i) => i !== bi) })}
                                  className="mt-2 text-ivory-muted hover:text-crimson flex-shrink-0"><Trash2 size={11} /></button>
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
