// src/components/builder/sections/Skills.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X } from 'lucide-react';
import { useState, KeyboardEvent } from 'react';
import { ResumeData, SkillCategory } from '@/lib/types';

interface Props { data: ResumeData; onChange: (d: ResumeData) => void; }

const newCategory = (): SkillCategory => ({
  id: `skill_${Date.now()}`,
  category: '',
  items: [],
});

export default function SkillsSection({ data, onChange }: Props) {
  const [inputs, setInputs] = useState<Record<string, string>>({});

  const addCategory = () => {
    const cat = newCategory();
    onChange({ ...data, skills: [...data.skills, cat] });
  };

  const remove = (id: string) => {
    onChange({ ...data, skills: data.skills.filter(s => s.id !== id) });
  };

  const update = (id: string, patch: Partial<SkillCategory>) => {
    onChange({ ...data, skills: data.skills.map(s => s.id === id ? { ...s, ...patch } : s) });
  };

  const addItem = (id: string) => {
    const val = inputs[id]?.trim();
    if (!val) return;
    const skill = data.skills.find(s => s.id === id)!;
    update(id, { items: [...skill.items, val] });
    setInputs(prev => ({ ...prev, [id]: '' }));
  };

  const removeItem = (id: string, item: string) => {
    const skill = data.skills.find(s => s.id === id)!;
    update(id, { items: skill.items.filter(i => i !== item) });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addItem(id);
    }
  };

  // Quick add popular skill categories
  const quickAdd = [
    { category: 'Languages', items: ['Python', 'TypeScript', 'Go'] },
    { category: 'Frameworks', items: ['React', 'Next.js', 'FastAPI'] },
    { category: 'Tools', items: ['Docker', 'Git', 'AWS'] },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="section-label mb-0">Skills</div>
        <button onClick={addCategory} className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors font-medium">
          <Plus size={13} /> Add Category
        </button>
      </div>

      {data.skills.length === 0 && (
        <div className="border border-dashed border-ink-600 rounded-xl p-5 mb-4">
          <p className="text-ivory-muted text-xs mb-3 text-center">No skill categories yet</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {quickAdd.map(q => (
              <button
                key={q.category}
                onClick={() => {
                  const cat: SkillCategory = { id: `skill_${Date.now()}_${q.category}`, category: q.category, items: q.items };
                  onChange({ ...data, skills: [...data.skills, cat] });
                }}
                className="text-[10px] px-2.5 py-1 border border-gold/30 text-gold rounded-lg hover:bg-gold/10 transition-colors"
              >
                + {q.category}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {data.skills.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="border border-ink-700 rounded-xl p-3 bg-ink-800"
            >
              <div className="flex items-center gap-2 mb-3">
                <input
                  className="input-base flex-1 text-xs font-semibold"
                  value={skill.category}
                  onChange={(e) => update(skill.id, { category: e.target.value })}
                  placeholder="Category name (e.g. Languages)"
                />
                <button onClick={() => remove(skill.id)} className="p-1.5 text-ivory-muted hover:text-crimson transition-colors flex-shrink-0">
                  <Trash2 size={12} />
                </button>
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {skill.items.map((item) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-ink-700 border border-ink-600 rounded-md text-[10px] font-mono text-ivory-muted"
                  >
                    {item}
                    <button onClick={() => removeItem(skill.id, item)} className="hover:text-crimson transition-colors">
                      <X size={9} />
                    </button>
                  </motion.span>
                ))}
              </div>

              {/* Add skill input */}
              <div className="flex gap-1.5">
                <input
                  className="input-base flex-1 text-xs"
                  value={inputs[skill.id] || ''}
                  onChange={(e) => setInputs(prev => ({ ...prev, [skill.id]: e.target.value }))}
                  onKeyDown={(e) => handleKeyDown(e, skill.id)}
                  placeholder="Type skill, press Enter or comma..."
                />
                <button
                  onClick={() => addItem(skill.id)}
                  className="px-3 text-xs bg-gold/10 border border-gold/30 text-gold rounded-lg hover:bg-gold/20 transition-colors flex-shrink-0"
                >
                  Add
                </button>
              </div>
              <p className="text-[9px] font-mono text-ink-500 mt-1.5">Press Enter or comma to add</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
