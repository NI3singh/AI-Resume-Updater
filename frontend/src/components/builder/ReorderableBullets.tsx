'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import { EntryDragHandle } from '@/components/builder/ReorderableList';

// Bullets are stored as plain string[] everywhere (resume_data, AI payloads,
// LaTeX generation). framer-motion's Reorder needs a stable identity per item,
// which a raw string can't give (duplicates / empties collide). So this
// component keeps the string[] contract on the outside while mapping each bullet
// to a stable synthetic id internally for the drag-and-drop list.

interface BulletItem { id: string; text: string; }

interface RenderArgs {
  value: string;
  index: number;
  setValue: (v: string) => void;
  remove: () => void;
  canRemove: boolean;            // false when only one bullet remains
  dragHandle: ReactNode | null;  // null when there's nothing to reorder
}

interface ReorderableBulletsProps {
  bullets: string[];
  onChange: (bullets: string[]) => void;
  className?: string;
  renderBullet: (args: RenderArgs) => ReactNode;
}

const sameTexts = (a: string[], b: string[]): boolean =>
  a.length === b.length && a.every((v, i) => v === b[i]);

function ReorderableBulletRow({
  item,
  index,
  canRemove,
  setValue,
  remove,
  renderBullet,
}: {
  item: BulletItem;
  index: number;
  canRemove: boolean;
  setValue: (v: string) => void;
  remove: () => void;
  renderBullet: (args: RenderArgs) => ReactNode;
}) {
  const controls = useDragControls();
  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      className="list-none"
      whileDrag={{ scale: 1.01, boxShadow: '0 4px 16px rgba(0,0,0,0.4)', zIndex: 50 }}
    >
      {renderBullet({
        value: item.text,
        index,
        setValue,
        remove,
        canRemove,
        dragHandle: <EntryDragHandle controls={controls} />,
      })}
    </Reorder.Item>
  );
}

/** Drag-and-drop reorderable list of string bullets (resume bullet points). */
export default function ReorderableBullets({
  bullets,
  onChange,
  className = 'flex flex-col gap-1.5',
  renderBullet,
}: ReorderableBulletsProps) {
  const counter = useRef(0);
  const [items, setItems] = useState<BulletItem[]>(
    () => bullets.map((text) => ({ id: `b${counter.current++}`, text })),
  );

  // Re-sync when the bullets change from outside (AI regenerate, switching the
  // edited entry, restore). Internal edits echo the same text back, so this is a
  // no-op for those — ids (and any in-flight drag) stay stable.
  useEffect(() => {
    setItems((prev) => {
      if (sameTexts(prev.map((p) => p.text), bullets)) return prev;
      return bullets.map((text, i) => ({ id: prev[i]?.id ?? `b${counter.current++}`, text }));
    });
  }, [bullets]);

  const emit = (next: BulletItem[]) => {
    setItems(next);
    onChange(next.map((n) => n.text));
  };
  const setValue = (id: string, v: string) =>
    emit(items.map((it) => (it.id === id ? { ...it, text: v } : it)));
  const remove = (id: string) => emit(items.filter((it) => it.id !== id));

  if (items.length === 0) return null;

  const canRemove = items.length > 1;

  // One bullet: nothing to reorder — render it plainly, no handle.
  if (items.length === 1) {
    const it = items[0];
    return (
      <div className={className}>
        {renderBullet({
          value: it.text,
          index: 0,
          setValue: (v) => setValue(it.id, v),
          remove: () => remove(it.id),
          canRemove: false,
          dragHandle: null,
        })}
      </div>
    );
  }

  return (
    <Reorder.Group axis="y" values={items} onReorder={emit} className={className}>
      {items.map((it, index) => (
        <ReorderableBulletRow
          key={it.id}
          item={it}
          index={index}
          canRemove={canRemove}
          setValue={(v) => setValue(it.id, v)}
          remove={() => remove(it.id)}
          renderBullet={renderBullet}
        />
      ))}
    </Reorder.Group>
  );
}
