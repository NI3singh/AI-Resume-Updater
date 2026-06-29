// src/components/builder/sections/Projects.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { ResumeData, ProjectEntry } from '@/lib/types';
import ReorderableList from '@/components/builder/ReorderableList';
import BulletListField from '@/components/builder/BulletListField';

interface Props { data: ResumeData; onChange: (d: ResumeData) => void; }

const newEntry = (): ProjectEntry => ({
  id: `proj_${Date.now()}`,
  name: '', techStack: '', githubUrl: '', liveUrl: '', bullets: [''],
});

export default function ProjectsSection({ data, onChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const add = () => {
    const entry = newEntry();
    onChange({ ...data, projects: [...data.projects, entry] });
    setExpanded(entry.id);
  };
  const remove = (id: string) => {
    onChange({ ...data, projects: data.projects.filter(p => p.id !== id) });
    if (expanded === id) setExpanded(null);
  };
  const update = (id: string, patch: Partial<ProjectEntry>) =>
    onChange({ ...data, projects: data.projects.map(p => p.id === id ? { ...p, ...patch } : p) });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="section-label mb-0">Projects</div>
        <button onClick={add} className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors font-medium">
          <Plus size={13} /> Add Project
        </button>
      </div>

      {data.projects.length === 0 && (
        <div className="border border-dashed border-ink-600 rounded-xl p-8 text-center">
          <p className="text-ivory-muted text-xs mb-3">No projects yet</p>
          <button onClick={add} className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors">
            <Plus size={12} /> Add a project
          </button>
        </div>
      )}

      <ReorderableList
        items={data.projects}
        onReorder={(projects) => onChange({ ...data, projects })}
        renderItem={(proj, idx, dragHandle) => (
          <div className="border border-ink-700 rounded-xl overflow-hidden bg-ink-800">
            <div className="flex items-center gap-2 px-3 py-2.5">
              {dragHandle}
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setExpanded(expanded === proj.id ? null : proj.id)}>
                <p className="text-xs font-medium text-ivory truncate">{proj.name || `Project ${idx + 1}`}</p>
                {proj.techStack && <p className="text-[10px] text-ivory-muted truncate">{proj.techStack}</p>}
              </div>
              <button onClick={() => remove(proj.id)} className="p-1 text-ivory-muted hover:text-crimson transition-colors"><Trash2 size={12} /></button>
              <button onClick={() => setExpanded(expanded === proj.id ? null : proj.id)} className="p-1 text-ivory-muted hover:text-ivory transition-colors">
                {expanded === proj.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            </div>

            <AnimatePresence>
              {expanded === proj.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                  className="border-t border-ink-700 overflow-hidden">
                  <div className="p-3 flex flex-col gap-3">

                    <div>
                      <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Project Name *</label>
                      <input className="input-base" value={proj.name}
                        onChange={e => update(proj.id, { name: e.target.value })}
                        placeholder="Personal Portfolio Website" />
                    </div>

                    <div>
                      <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Tech Stack</label>
                      <input className="input-base" value={proj.techStack}
                        onChange={e => update(proj.id, { techStack: e.target.value })}
                        placeholder="Next.js, Tailwind CSS" />
                      <p className="text-[9px] font-mono text-ink-500 mt-1">Comma-separated, shown after | in the heading</p>
                    </div>

                    <div>
                      <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">GitHub URL</label>
                      <input className="input-base" value={proj.githubUrl}
                        onChange={e => update(proj.id, { githubUrl: e.target.value })}
                        placeholder="https://github.com/username/repo" />
                    </div>

                    <div>
                      <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Live URL (optional)</label>
                      <input className="input-base" value={proj.liveUrl}
                        onChange={e => update(proj.id, { liveUrl: e.target.value })}
                        placeholder="https://myproject.onrender.com" />
                      <p className="text-[9px] font-mono text-ink-500 mt-1">Leave blank to omit Live Link</p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[10px] text-ivory-muted uppercase tracking-wider">Bullet Points</label>
                        <button onClick={() => update(proj.id, { bullets: [...proj.bullets, ''] })} className="text-[10px] text-gold hover:text-gold-light">+ Add</button>
                      </div>
                      <p className="text-[9px] font-mono text-ink-500 mb-2">Wrap a word in **double asterisks** for bold.</p>
                      <BulletListField
                        bullets={proj.bullets}
                        onChange={(bullets) => update(proj.id, { bullets })}
                        placeholder="Built a responsive web app serving 1,000+ monthly users"
                        minH={56}
                      />
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      />
    </div>
  );
}