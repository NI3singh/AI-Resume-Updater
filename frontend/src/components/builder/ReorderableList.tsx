'use client';

import { ReactNode } from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import { GripVertical } from 'lucide-react';

/** Drag handle — use inside accordion/card headers so expanded form fields stay editable. */
export function EntryDragHandle({ controls }: { controls: ReturnType<typeof useDragControls> }) {
  return (
    <div
      className="flex-shrink-0 cursor-grab active:cursor-grabbing p-0.5 text-ivory-dim hover:text-ivory transition-colors touch-none"
      onPointerDown={(e) => controls.start(e)}
      title="Drag to reorder"
    >
      <GripVertical size={13} />
    </div>
  );
}

interface ReorderableListProps<T extends { id: string }> {
  items: T[];
  onReorder: (items: T[]) => void;
  className?: string;
  renderItem: (item: T, index: number, dragHandle: ReactNode | null) => ReactNode;
}

function ReorderableListItem<T extends { id: string }>({
  item,
  index,
  showHandle,
  renderItem,
}: {
  item: T;
  index: number;
  showHandle: boolean;
  renderItem: (item: T, index: number, dragHandle: ReactNode | null) => ReactNode;
}) {
  const controls = useDragControls();
  const handle = showHandle ? <EntryDragHandle controls={controls} /> : null;

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      className="list-none"
      whileDrag={{ scale: 1.02, boxShadow: '0 4px 24px rgba(0,0,0,0.45)', zIndex: 50 }}
    >
      {renderItem(item, index, handle)}
    </Reorder.Item>
  );
}

/** Vertical drag-and-drop list for resume entries (projects, experience, etc.). */
export default function ReorderableList<T extends { id: string }>({
  items,
  onReorder,
  className = 'flex flex-col gap-3',
  renderItem,
}: ReorderableListProps<T>) {
  const showHandle = items.length > 1;

  if (items.length === 0) return null;

  if (items.length === 1) {
    return (
      <div className={className}>
        {renderItem(items[0], 0, null)}
      </div>
    );
  }

  return (
    <Reorder.Group axis="y" values={items} onReorder={onReorder} className={className}>
      {items.map((item, index) => (
        <ReorderableListItem
          key={item.id}
          item={item}
          index={index}
          showHandle={showHandle}
          renderItem={renderItem}
        />
      ))}
    </Reorder.Group>
  );
}
