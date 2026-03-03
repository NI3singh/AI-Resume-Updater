// src/components/builder/sections/Publications.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { ResumeData, PublicationEntry } from '@/lib/types';

interface Props { data: ResumeData; onChange: (d: ResumeData) => void; }

const newEntry = (): PublicationEntry => ({
  id: `pub_${Date.now()}`,
  title: '', authors: '', abstractText: '', paperUrl: '', paperLinkLabel: '',
});

export default function PublicationsSection({ data, onChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const add = () => {
    const entry = newEntry();
    onChange({ ...data, publications: [...data.publications, entry] });
    setExpanded(entry.id);
  };
  const remove = (id: string) => {
    onChange({ ...data, publications: data.publications.filter(p => p.id !== id) });
    if (expanded === id) setExpanded(null);
  };
  const update = (id: string, patch: Partial<PublicationEntry>) =>
    onChange({ ...data, publications: data.publications.map(p => p.id === id ? { ...p, ...patch } : p) });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="section-label mb-0">Publications</div>
        <button onClick={add} className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors font-medium">
          <Plus size={13} /> Add Publication
        </button>
      </div>

      {data.publications.length === 0 && (
        <div className="border border-dashed border-ink-600 rounded-xl p-8 text-center">
          <p className="text-ivory-muted text-xs mb-3">No publications yet</p>
          <button onClick={add} className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors">
            <Plus size={12} /> Add publication
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {data.publications.map((pub, idx) => (
            <motion.div key={pub.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="border border-ink-700 rounded-xl overflow-hidden bg-ink-800">
              <div className="flex items-center gap-2 px-3 py-2.5">
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setExpanded(expanded === pub.id ? null : pub.id)}>
                  <p className="text-xs font-medium text-ivory truncate">{pub.title || `Publication ${idx + 1}`}</p>
                  {pub.authors && <p className="text-[10px] text-ivory-muted truncate">{pub.authors}</p>}
                </div>
                <button onClick={() => remove(pub.id)} className="p-1 text-ivory-muted hover:text-crimson transition-colors"><Trash2 size={12} /></button>
                <button onClick={() => setExpanded(expanded === pub.id ? null : pub.id)} className="p-1 text-ivory-muted hover:text-ivory transition-colors">
                  {expanded === pub.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
              </div>

              <AnimatePresence>
                {expanded === pub.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                    className="border-t border-ink-700 overflow-hidden">
                    <div className="p-3 flex flex-col gap-3">

                      <div>
                        <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Paper Title *</label>
                        <input className="input-base" value={pub.title}
                          onChange={e => update(pub.id, { title: e.target.value })}
                          placeholder="Is Architectural Complexity Always the Answer? A Case Study on SwinIR..." />
                      </div>

                      <div>
                        <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Authors *</label>
                        <input className="input-base" value={pub.authors}
                          onChange={e => update(pub.id, { authors: e.target.value })}
                          placeholder="Chandresh Sutariya, Nitin Singh" />
                        <p className="text-[9px] font-mono text-ink-500 mt-1">Your name will appear as-is — bold it manually in .tex if needed</p>
                      </div>

                      <div>
                        <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Abstract</label>
                        <textarea className="input-base min-h-[72px] resize-none text-[11px] leading-relaxed" value={pub.abstractText}
                          onChange={e => update(pub.id, { abstractText: e.target.value })}
                          placeholder="Demonstrated that an optimized CNN achieves near state-of-the-art restoration quality..." />
                      </div>

                      <div>
                        <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Paper URL</label>
                        <input className="input-base" value={pub.paperUrl}
                          onChange={e => update(pub.id, { paperUrl: e.target.value })}
                          placeholder="https://arxiv.org/abs/2510.07984" />
                      </div>

                      <div>
                        <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Link Label</label>
                        <input className="input-base" value={pub.paperLinkLabel}
                          onChange={e => update(pub.id, { paperLinkLabel: e.target.value })}
                          placeholder="arXiv Pre-print, 2025" />
                        <p className="text-[9px] font-mono text-ink-500 mt-1">The clickable text for the paper URL</p>
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
