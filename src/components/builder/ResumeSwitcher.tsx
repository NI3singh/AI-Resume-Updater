// src/components/builder/ResumeSwitcher.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Crown, Plus, Trash2, RotateCcw,
  Pencil, Check, X, GitFork,
} from 'lucide-react';
import { ResumeRecord } from '@/hooks/useResumes';

interface ResumeSwitcherProps {
  resumes: ResumeRecord[];
  activeResume: ResumeRecord | null;
  onSwitch: (id: string) => void;
  onFork: (name: string) => Promise<void>;
  onDelete: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onRestoreToMaster: (id: string) => void;
}

export default function ResumeSwitcher({
  resumes, activeResume,
  onSwitch, onFork, onDelete, onRename, onRestoreToMaster,
}: ResumeSwitcherProps) {
  const [open, setOpen]           = useState(false);
  const [forking, setForking]     = useState(false);
  const [forkName, setForkName]   = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false); setForking(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleFork = async () => {
    if (!forkName.trim()) return;
    await onFork(forkName.trim());
    setForkName(''); setForking(false); setOpen(false);
  };

  const startRename = (r: ResumeRecord, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(r.id);
    setEditDraft(r.name);
  };

  const commitRename = (id: string) => {
    if (editDraft.trim()) onRename(id, editDraft.trim());
    setEditingId(null);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 bg-ink-800 border border-ink-600 hover:border-ink-500 rounded-lg transition-all max-w-[200px]"
      >
        {activeResume?.is_master && <Crown size={11} className="text-gold flex-shrink-0" />}
        <span className="text-xs text-ivory truncate">{activeResume?.name ?? 'Select Resume'}</span>
        <ChevronDown size={12} className={`text-ink-500 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-1.5 w-72 bg-ink-800 border border-ink-600 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            {/* Resume list */}
            <div className="max-h-64 overflow-y-auto">
              {resumes.map(r => (
                <div
                  key={r.id}
                  onClick={() => { if (editingId !== r.id) { onSwitch(r.id); setOpen(false); } }}
                  className={`group flex items-center gap-2 px-3 py-2.5 cursor-pointer transition-colors ${
                    activeResume?.id === r.id ? 'bg-gold/10' : 'hover:bg-ink-700'
                  }`}
                >
                  {r.is_master ? (
                    <Crown size={12} className="text-gold flex-shrink-0" />
                  ) : (
                    <GitFork size={12} className="text-ivory-dim flex-shrink-0" />
                  )}

                  {editingId === r.id ? (
                    <input
                      autoFocus
                      value={editDraft}
                      onChange={e => setEditDraft(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') commitRename(r.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      onBlur={() => commitRename(r.id)}
                      onClick={e => e.stopPropagation()}
                      className="flex-1 bg-ink-700 border border-gold/40 rounded px-1.5 py-0.5 text-xs text-ivory focus:outline-none"
                    />
                  ) : (
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium truncate ${activeResume?.id === r.id ? 'text-ivory' : 'text-ivory-muted'}`}>
                        {r.name}
                      </p>
                      <p className="text-[9px] text-ink-500 font-mono">
                        {r.is_master ? 'Master · always up to date' : `Saved ${new Date(r.updated_at).toLocaleDateString()}`}
                      </p>
                    </div>
                  )}

                  {/* Row actions */}
                  {editingId === r.id ? (
                    <div className="flex gap-0.5">
                      <button onMouseDown={e => { e.preventDefault(); commitRename(r.id); }} className="p-1 text-jade"><Check size={11} /></button>
                      <button onMouseDown={e => { e.preventDefault(); setEditingId(null); }} className="p-1 text-crimson"><X size={11} /></button>
                    </div>
                  ) : (
                    <div className="hidden group-hover:flex items-center gap-0.5">
                      <button onClick={e => startRename(r, e)} className="p-1 text-ink-500 hover:text-ivory-muted" title="Rename">
                        <Pencil size={11} />
                      </button>
                      {!r.is_master && (
                        <>
                          <button onClick={e => { e.stopPropagation(); onRestoreToMaster(r.id); setOpen(false); }}
                            className="p-1 text-ink-500 hover:text-gold" title="Restore to Master">
                            <RotateCcw size={11} />
                          </button>
                          <button onClick={e => { e.stopPropagation(); onDelete(r.id); }}
                            className="p-1 text-ink-500 hover:text-crimson" title="Delete">
                            <Trash2 size={11} />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Divider + Fork action */}
            <div className="border-t border-ink-700">
              {forking ? (
                <div className="flex items-center gap-2 px-3 py-2">
                  <input
                    autoFocus
                    value={forkName}
                    onChange={e => setForkName(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleFork(); if (e.key === 'Escape') setForking(false); }}
                    placeholder="e.g. Data Analyst - Google"
                    className="flex-1 bg-ink-700 border border-gold/40 rounded-lg px-2.5 py-1.5 text-xs text-ivory placeholder-ink-500 focus:outline-none focus:ring-1 focus:ring-gold/40"
                  />
                  <button onClick={handleFork} className="p-1.5 text-jade hover:text-jade"><Check size={13} /></button>
                  <button onClick={() => setForking(false)} className="p-1.5 text-crimson/70 hover:text-crimson"><X size={13} /></button>
                </div>
              ) : (
                <button
                  onClick={() => setForking(true)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-ink-700 transition-colors"
                >
                  <Plus size={12} className="text-gold flex-shrink-0" />
                  <span className="text-xs text-gold font-medium">Fork from Master</span>
                  <span className="text-[9px] text-ink-500 ml-auto">new version</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}