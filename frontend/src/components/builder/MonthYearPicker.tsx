// src/components/builder/MonthYearPicker.tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const POP_W = 232;
const POP_H = 250;

// Parse an existing free-text value ("Sep 2021", "September 2021", "Present", "")
// into a month index + year so the picker can highlight the current selection.
function parseValue(value: string): { month: number | null; year: number | null; present: boolean } {
  const v = (value || '').trim();
  if (!v) return { month: null, year: null, present: false };
  if (/^present$/i.test(v)) return { month: null, year: null, present: true };
  const yearMatch = v.match(/\b(19|20)\d{2}\b/);
  const year = yearMatch ? parseInt(yearMatch[0], 10) : null;
  const monthMatch = v.match(/[A-Za-z]{3,}/);
  let month: number | null = null;
  if (monthMatch) {
    const key = monthMatch[0].slice(0, 3).toLowerCase();
    const idx = MONTHS.findIndex(m => m.toLowerCase() === key);
    if (idx >= 0) month = idx;
  }
  return { month, year, present: false };
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Show a "Present" quick-pick (for end dates of ongoing roles/activities). */
  allowPresent?: boolean;
}

export default function MonthYearPicker({ value, onChange, placeholder = 'Select date', disabled, allowPresent }: Props) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  const parsed = parseValue(value);
  const [viewYear, setViewYear] = useState<number>(parsed.year ?? new Date().getFullYear());

  // Position the popover next to the trigger using fixed coordinates so it is
  // never clipped by the form's overflow-hidden cards.
  const place = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let top = r.bottom + 6;
    if (top + POP_H > window.innerHeight) top = Math.max(8, r.top - POP_H - 6); // flip up
    let left = r.left;
    if (left + POP_W > window.innerWidth) left = Math.max(8, window.innerWidth - POP_W - 8);
    setPos({ top, left });
  }, []);

  const openPicker = () => {
    setViewYear(parseValue(value).year ?? new Date().getFullYear());
    place();
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (popRef.current?.contains(t) || triggerRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true); // capture: also catch scrolling inside the form panel
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open, place]);

  const pick = (monthIdx: number) => { onChange(`${MONTHS[monthIdx]} ${viewYear}`); setOpen(false); };
  const clear = () => { onChange(''); setOpen(false); };
  const setPresent = () => { onChange('Present'); setOpen(false); };

  const display = (value || '').trim();

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openPicker())}
        className={`input-base flex items-center justify-between gap-2 text-left ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span className={display ? '' : 'text-ivory-dim'}>{display || placeholder}</span>
        <Calendar size={12} className="text-ivory-muted flex-shrink-0" />
      </button>

      {open && pos && typeof document !== 'undefined' && createPortal(
        <div
          ref={popRef}
          style={{ position: 'fixed', top: pos.top, left: pos.left, width: POP_W, zIndex: 300 }}
          className="rounded-xl border border-ink-600 bg-ink-900 shadow-2xl shadow-black/50 p-3"
        >
          {/* Year navigation */}
          <div className="flex items-center justify-between mb-2">
            <button type="button" onClick={() => setViewYear(y => y - 1)}
              className="p-1 rounded-md text-ivory-muted hover:text-ivory hover:bg-ink-800 transition-colors cursor-pointer">
              <ChevronLeft size={14} />
            </button>
            <span className="text-sm font-mono font-semibold text-ivory">{viewYear}</span>
            <button type="button" onClick={() => setViewYear(y => y + 1)}
              className="p-1 rounded-md text-ivory-muted hover:text-ivory hover:bg-ink-800 transition-colors cursor-pointer">
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Month grid */}
          <div className="grid grid-cols-3 gap-1">
            {MONTHS.map((m, i) => {
              const selected = parsed.month === i && parsed.year === viewYear;
              return (
                <button
                  type="button"
                  key={m}
                  onClick={() => pick(i)}
                  className={`py-1.5 text-xs rounded-md transition-colors cursor-pointer ${
                    selected ? 'bg-gold text-ink-950 font-semibold' : 'text-ivory-muted hover:bg-ink-800 hover:text-ivory'
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>

          {/* Footer: clear + optional Present */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-ink-700/70">
            <button type="button" onClick={clear}
              className="flex items-center gap-1 text-[10px] text-ivory-dim hover:text-crimson transition-colors cursor-pointer">
              <X size={10} /> Clear
            </button>
            {allowPresent && (
              <button type="button" onClick={setPresent}
                className={`text-[10px] px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                  parsed.present ? 'bg-gold text-ink-950 font-semibold' : 'text-gold hover:bg-gold/10'
                }`}>
                Present
              </button>
            )}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
