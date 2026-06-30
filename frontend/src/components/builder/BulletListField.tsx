'use client';

import { Trash2 } from 'lucide-react';
import ReorderableBullets from '@/components/builder/ReorderableBullets';

interface Props {
  bullets: string[];
  onChange: (bullets: string[]) => void;
  placeholder?: string;
  minH?: number;   // textarea min-height in px (default 48)
}

/** The builder's standard bullet-point editor row, now drag-and-drop sortable.
 *  Used by Projects / Experience / Extracurricular / custom 'bullets' fields so
 *  every bullet list reorders and looks identical. The "+ Add" button stays with
 *  each caller (it just appends '' to the array). */
export default function BulletListField({ bullets, onChange, placeholder, minH = 48 }: Props) {
  return (
    <ReorderableBullets
      bullets={bullets}
      onChange={onChange}
      renderBullet={({ value, setValue, remove, canRemove, dragHandle }) => (
        <div className="flex items-start gap-2">
          {/* Drag grip when reorderable, else the gold marker (matches the old ▸). */}
          {dragHandle ?? (
            <span className="mt-2 text-[10px] leading-none text-gold flex-shrink-0 select-none">▸</span>
          )}
          <textarea
            className="input-base flex-1 resize-none text-[11px] leading-relaxed"
            style={{ minHeight: minH }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
          />
          {canRemove && (
            <button
              onClick={remove}
              title="Remove bullet"
              className="mt-2 text-ivory-muted hover:text-crimson transition-colors flex-shrink-0"
            >
              <Trash2 size={11} />
            </button>
          )}
        </div>
      )}
    />
  );
}
