// src/components/builder/sections/Achievements.tsx
'use client';

import { Plus, Trash2 } from 'lucide-react';
import { ResumeData, AchievementItem } from '@/lib/types';
import ReorderableList from '@/components/builder/ReorderableList';

interface Props { data: ResumeData; onChange: (d: ResumeData) => void; }

const newItem = (): AchievementItem => ({ id: `ach_${Date.now()}`, text: '' });

export default function AchievementsSection({ data, onChange }: Props) {
  const add = () => onChange({ ...data, achievements: [...data.achievements, newItem()] });

  const remove = (id: string) =>
    onChange({ ...data, achievements: data.achievements.filter(a => a.id !== id) });

  const update = (id: string, text: string) =>
    onChange({ ...data, achievements: data.achievements.map(a => a.id === id ? { ...a, text } : a) });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="section-label mb-0">Achievements</div>
        <button onClick={add} className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors font-medium">
          <Plus size={13} /> Add Achievement
        </button>
      </div>

      <p className="text-xs text-ivory-muted mb-4 leading-relaxed">
        Each item becomes a bullet point in the Achievements section of your resume.
        Wrap a word in **double asterisks** for bold.
      </p>

      {data.achievements.length === 0 && (
        <div className="border border-dashed border-ink-600 rounded-xl p-8 text-center">
          <p className="text-ivory-muted text-xs mb-3">No achievements yet</p>
          <button onClick={add} className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors">
            <Plus size={12} /> Add achievement
          </button>
        </div>
      )}

      <ReorderableList
        items={data.achievements}
        onReorder={(achievements) => onChange({ ...data, achievements })}
        className="flex flex-col gap-2"
        renderItem={(item, idx, dragHandle) => (
          <div className="flex items-start gap-2">
            {dragHandle}
            <div className="bullet-item flex-1 min-w-0">
              <textarea
                className="input-base flex-1 min-h-[56px] resize-none text-[11px] leading-relaxed"
                value={item.text}
                onChange={e => update(item.id, e.target.value)}
                placeholder={`Achievement ${idx + 1} — e.g. Won 1st place at the 2024 University Hackathon`}
              />
              <button onClick={() => remove(item.id)}
                className="mt-2 text-ivory-muted hover:text-crimson transition-colors flex-shrink-0">
                <Trash2 size={11} />
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
}
