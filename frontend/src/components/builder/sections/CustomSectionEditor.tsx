// src/components/builder/sections/CustomSectionEditor.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown, ChevronUp, Settings2 } from 'lucide-react';
import { ResumeData, CustomFieldDef, CustomEntry, LinkValue, DateRangeValue, MarkValue } from '@/lib/types';
import MonthYearPicker from '@/components/builder/MonthYearPicker';
import { formatMark } from '@/lib/latexTemplate';

// Value-box placeholders for the Number / Marks field, per chosen format.
const MARK_PLACEHOLDER: Record<string, string> = {
  CGPA: '8.68', GPA: '3.8', Percentage: '85.4', Grade: 'A+', '': 'e.g. 8.5',
};
const OUTOF_PLACEHOLDER: Record<string, string> = { CGPA: '10', GPA: '4.0', '': '500' };

interface Props {
  data: ResumeData;
  onChange: (d: ResumeData) => void;
  sectionId: string;
  onConfigure: () => void; // opens the field-configuration modal
}

// Renders the correct input for one field of one entry.
function FieldInput({ field, value, onChange }: {
  field: CustomFieldDef;
  value: string | string[] | LinkValue | DateRangeValue | MarkValue | undefined;
  onChange: (v: string | string[] | LinkValue | DateRangeValue | MarkValue) => void;
}) {
  const label = field.label || 'Field';

  if (field.type === 'bullets') {
    const bullets = Array.isArray(value) ? value : [''];
    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-[10px] text-ivory-muted uppercase tracking-wider">{label}</label>
          <button onClick={() => onChange([...bullets, ''])} className="text-[10px] text-gold hover:text-gold-light">+ Add</button>
        </div>
        <p className="text-[9px] font-mono text-ink-500 mb-2">Wrap a word in **double asterisks** for bold.</p>
        <div className="flex flex-col gap-1.5">
          {bullets.map((b, i) => (
            <div key={i} className="bullet-item">
              <textarea
                className="input-base flex-1 min-h-[48px] resize-none text-[11px] leading-relaxed"
                value={b}
                onChange={e => { const next = [...bullets]; next[i] = e.target.value; onChange(next); }}
                placeholder="Detail or description..."
              />
              {bullets.length > 1 && (
                <button onClick={() => onChange(bullets.filter((_, j) => j !== i))}
                  className="mt-2 text-ivory-muted hover:text-crimson transition-colors flex-shrink-0"><Trash2 size={11} /></button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === 'link') {
    const lv: LinkValue = (value && typeof value === 'object' && !Array.isArray(value) && 'url' in value)
      ? value
      : { url: typeof value === 'string' ? value : '', text: '' };
    return (
      <div>
        <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">{label}</label>
        <input className="input-base" value={lv.url}
          onChange={e => onChange({ ...lv, url: e.target.value })} placeholder="https://..." />
        <input className="input-base mt-2" value={lv.text}
          onChange={e => onChange({ ...lv, text: e.target.value })} placeholder="Link label — e.g. View Project" />
        <p className="text-[9px] font-mono text-ink-500 mt-1">Top: the URL · Bottom: the clickable text shown on the resume.</p>
      </div>
    );
  }

  if (field.type === 'date') {
    if (field.dateRange) {
      const dv: DateRangeValue = (value && typeof value === 'object' && !Array.isArray(value) && 'from' in value)
        ? value
        : { from: typeof value === 'string' ? value : '', to: '' };
      return (
        <div>
          <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">{label}</label>
          <div className="grid grid-cols-2 gap-2">
            <MonthYearPicker value={dv.from} onChange={v => onChange({ ...dv, from: v })} placeholder="Start" />
            <MonthYearPicker value={dv.to}   onChange={v => onChange({ ...dv, to: v })}   placeholder="End" allowPresent />
          </div>
        </div>
      );
    }
    const single = typeof value === 'string' ? value : '';
    return (
      <div>
        <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">{label}</label>
        <MonthYearPicker value={single} onChange={onChange} placeholder="Jun 2022" allowPresent />
      </div>
    );
  }

  if (field.type === 'number') {
    const mv: MarkValue = (value && typeof value === 'object' && !Array.isArray(value) && 'format' in value)
      ? value
      : { format: '', value: typeof value === 'string' ? value : '', outOf: '' };
    const showOutOf = mv.format !== 'Percentage' && mv.format !== 'Grade';
    return (
      <div>
        <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">{label}</label>
        <div className="flex gap-2">
          <select className="input-base !w-auto text-xs cursor-pointer" value={mv.format}
            onChange={e => onChange({ ...mv, format: e.target.value })}>
            <option value="CGPA">CGPA</option>
            <option value="GPA">GPA</option>
            <option value="Percentage">Percentage</option>
            <option value="Grade">Grade</option>
            <option value="">Custom</option>
          </select>
          <input className="input-base flex-1" value={mv.value}
            onChange={e => onChange({ ...mv, value: e.target.value })}
            placeholder={MARK_PLACEHOLDER[mv.format] ?? 'e.g. 8.5'} />
          {showOutOf && (
            <>
              <span className="flex items-center text-ivory-dim text-sm">/</span>
              <input className="input-base !w-20" value={mv.outOf}
                onChange={e => onChange({ ...mv, outOf: e.target.value })}
                placeholder={OUTOF_PLACEHOLDER[mv.format] ?? '10'} />
            </>
          )}
        </div>
        {formatMark(mv.format, mv.value, mv.outOf) && (
          <p className="text-[9px] font-mono text-ink-500 mt-1">Shows as: {formatMark(mv.format, mv.value, mv.outOf)}</p>
        )}
      </div>
    );
  }

  const str = typeof value === 'string' ? value : '';
  return (
    <div>
      <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">{label}</label>
      <input
        className="input-base"
        value={str}
        onChange={e => onChange(e.target.value)}
        placeholder="Value"
      />
    </div>
  );
}

export default function CustomSectionEditor({ data, onChange, sectionId, onConfigure }: Props) {
  const sections = data.custom ?? [];
  const section  = sections.find(s => s.id === sectionId);
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!section) return <p className="text-xs text-ivory-muted">Section not found.</p>;

  const update = (patch: Partial<typeof section>) =>
    onChange({ ...data, custom: sections.map(s => s.id === sectionId ? { ...s, ...patch } : s) });

  const addEntry = () => {
    const values: Record<string, string | string[] | LinkValue | DateRangeValue | MarkValue> = {};
    section.fields.forEach(f => {
      values[f.id] =
        f.type === 'bullets' ? ['']
        : f.type === 'link' ? { url: '', text: '' }
        : f.type === 'number' ? { format: '', value: '', outOf: '' }
        : (f.type === 'date' && f.dateRange) ? { from: '', to: '' }
        : '';
    });
    const entry: CustomEntry = { id: `e_${Date.now()}`, values };
    update({ entries: [...section.entries, entry] });
    setExpanded(entry.id);
  };
  const removeEntry = (eid: string) => {
    update({ entries: section.entries.filter(e => e.id !== eid) });
    if (expanded === eid) setExpanded(null);
  };
  const setValue = (eid: string, fid: string, value: string | string[] | LinkValue | DateRangeValue | MarkValue) =>
    update({ entries: section.entries.map(e => e.id === eid ? { ...e, values: { ...e.values, [fid]: value } } : e) });

  const entryTitle = (entry: CustomEntry, idx: number): string => {
    const first = section.fields.find(f => f.type === 'text' || f.type === 'number');
    const v = first ? entry.values[first.id] : '';
    return (typeof v === 'string' && v.trim()) || `Entry ${idx + 1}`;
  };

  return (
    <div>
      {/* Header: entries + configure-fields */}
      <div className="flex items-center justify-between mb-3">
        <div className="section-label mb-0">{section.fields.length ? 'Entries' : 'Section'}</div>
        <div className="flex items-center gap-3">
          <button onClick={onConfigure}
            className="flex items-center gap-1 text-[11px] text-ivory-dim hover:text-gold transition-colors cursor-pointer">
            <Settings2 size={12} /> Fields
          </button>
          {section.fields.length > 0 && (
            <button onClick={addEntry}
              className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors font-medium">
              <Plus size={13} /> Add Entry
            </button>
          )}
        </div>
      </div>

      {section.fields.length === 0 ? (
        <div className="border border-dashed border-ink-600 rounded-xl p-6 text-center">
          <p className="text-ivory-muted text-xs mb-3">This section has no fields yet.</p>
          <button onClick={onConfigure} className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold-light cursor-pointer">
            <Settings2 size={12} /> Configure fields
          </button>
        </div>
      ) : section.entries.length === 0 ? (
        <div className="border border-dashed border-ink-600 rounded-xl p-6 text-center">
          <p className="text-ivory-muted text-xs mb-3">No entries yet</p>
          <button onClick={addEntry} className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold-light cursor-pointer">
            <Plus size={12} /> Add entry
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {section.entries.map((entry, idx) => (
              <motion.div key={entry.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                className="border border-ink-700 rounded-xl overflow-hidden bg-ink-800">
                <div className="flex items-center gap-2 px-3 py-2.5">
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}>
                    <p className="text-xs font-medium text-ivory truncate">{entryTitle(entry, idx)}</p>
                  </div>
                  <button onClick={() => removeEntry(entry.id)} className="p-1 text-ivory-muted hover:text-crimson transition-colors"><Trash2 size={12} /></button>
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
                        {section.fields.map(f => (
                          <FieldInput key={f.id} field={f} value={entry.values[f.id]}
                            onChange={v => setValue(entry.id, f.id, v)} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
