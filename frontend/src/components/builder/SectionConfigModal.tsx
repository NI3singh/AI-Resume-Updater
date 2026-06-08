// src/components/builder/SectionConfigModal.tsx
'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Plus, Trash2, X, Type, List, Calendar, Hash, Link2 } from 'lucide-react';
import { CustomFieldDef, CustomFieldType } from '@/lib/types';

const FIELD_TYPES: { value: CustomFieldType; label: string; icon: React.ElementType }[] = [
  { value: 'text',    label: 'Text',           icon: Type },
  { value: 'bullets', label: 'Bullet list',    icon: List },
  { value: 'date',    label: 'Date',           icon: Calendar },
  { value: 'number',  label: 'Number / Marks', icon: Hash },
  { value: 'link',    label: 'Link',           icon: Link2 },
];

interface Props {
  mode: 'new' | 'edit';
  initialLabel: string;
  initialFields: CustomFieldDef[];
  onSave: (label: string, fields: CustomFieldDef[]) => void;
  onClose: () => void;
}

export default function SectionConfigModal({ mode, initialLabel, initialFields, onSave, onClose }: Props) {
  const [label, setLabel]   = useState(initialLabel);
  const [fields, setFields] = useState<CustomFieldDef[]>(
    initialFields.length ? initialFields : [{ id: `f_${Date.now()}`, label: '', type: 'text' }],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const addField = () => setFields(f => [...f, { id: `f_${Date.now()}_${f.length}`, label: '', type: 'text' }]);
  const updateField = (id: string, patch: Partial<CustomFieldDef>) =>
    setFields(f => f.map(x => (x.id === id ? { ...x, ...patch } : x)));
  const removeField = (id: string) => setFields(f => f.filter(x => x.id !== id));

  const canSave = label.trim().length > 0 && fields.some(f => f.label.trim());
  const save = () => { if (canSave) onSave(label.trim(), fields.filter(f => f.label.trim())); };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md bg-ink-900 border border-ink-700 rounded-2xl shadow-2xl shadow-black/50 flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-5 py-4 border-b border-ink-800 flex-shrink-0">
          <div>
            <h3 className="font-display font-bold text-ivory text-sm">
              {mode === 'new' ? 'New section' : 'Configure section'}
            </h3>
            <p className="text-[11px] text-ivory-dim mt-0.5">Name it and choose the fields each entry will have.</p>
          </div>
          <button onClick={onClose} className="p-1 text-ivory-dim hover:text-ivory transition-colors cursor-pointer">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 overflow-y-auto flex flex-col gap-4">
          <div>
            <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1.5 block">Section name</label>
            <input
              autoFocus
              className="input-base"
              value={label}
              onChange={e => setLabel(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') save(); }}
              placeholder="e.g. Volunteer Work, Recommendations"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] text-ivory-muted uppercase tracking-wider">Fields</label>
              <button onClick={addField} className="flex items-center gap-1 text-[11px] text-gold hover:text-gold-light cursor-pointer">
                <Plus size={12} /> Add field
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {fields.map((f, i) => {
                const TypeIcon = FIELD_TYPES.find(t => t.value === f.type)?.icon ?? Type;
                return (
                  <div key={f.id} className="bg-ink-800/60 border border-ink-700 rounded-xl p-2">
                    <div className="flex items-center gap-2">
                      <span className="flex-shrink-0 w-6 h-6 rounded-md bg-ink-700/70 flex items-center justify-center text-ivory-dim">
                        <TypeIcon size={12} />
                      </span>
                      <input
                        className="input-base flex-1 text-xs !py-2"
                        value={f.label}
                        onChange={e => updateField(f.id, { label: e.target.value })}
                        placeholder={`Field ${i + 1} name (e.g. Organization)`}
                      />
                      <select
                        className="input-base !w-auto text-xs !py-2 cursor-pointer"
                        value={f.type}
                        onChange={e => updateField(f.id, { type: e.target.value as CustomFieldType })}
                      >
                        {FIELD_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                      <button
                        onClick={() => removeField(f.id)}
                        disabled={fields.length <= 1}
                        title="Remove field"
                        className="p-1 text-ivory-dim hover:text-crimson transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex-shrink-0"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    {f.type === 'date' && (
                      <div className="flex items-center gap-2 mt-2 pl-8">
                        <span className="text-[10px] text-ivory-muted uppercase tracking-wider">Mode</span>
                        <select
                          className="input-base !w-auto text-xs !py-1.5 cursor-pointer"
                          value={f.dateRange ? 'range' : 'single'}
                          onChange={e => updateField(f.id, { dateRange: e.target.value === 'range' })}
                        >
                          <option value="single">Single date</option>
                          <option value="range">Date range</option>
                        </select>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-[9px] font-mono text-ink-500 mt-2 leading-relaxed">
              Text/Number show inline (first is bold) · Date right-aligns · Link becomes a clickable URL · Bullet list becomes bullet points.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-ink-800 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory hover:bg-ink-800/50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={!canSave}
            className="px-3 py-1.5 text-xs rounded-lg font-semibold bg-gold text-ink-950 hover:bg-gold-light transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {mode === 'new' ? 'Create section' : 'Save'}
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
