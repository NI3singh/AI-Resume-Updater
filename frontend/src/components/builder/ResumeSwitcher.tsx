// src/components/builder/ResumeSwitcher.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  ChevronDown,
  Crown,
  GitFork,
  Layers3,
  Pencil,
  Plus,
  RotateCcw,
  Trash2,
  X,
} from 'lucide-react';
import { ResumeRecord } from '@/hooks/useResumes';
import { useTheme } from '@/lib/ThemeContext';

interface ResumeSwitcherProps {
  resumes: ResumeRecord[];
  activeResume: ResumeRecord | null;
  onSwitch: (id: string) => void;
  onFork: (name: string) => Promise<void>;
  onDelete: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onRestoreToMaster: (id: string) => void;
}

const PANEL = {
  dark: {
    bg: '#17171F',
    bgSoft: '#20202A',
    bgHover: '#262632',
    bgActive: '#2A2618',
    border: '#343445',
    borderSoft: '#292938',
    text: '#F5F0E8',
    muted: '#B7B1A6',
    dim: '#77728A',
    gold: '#C9A84C',
    jade: '#3AAFA9',
    crimson: '#E05A5A',
    shadow: '0 18px 60px rgba(0,0,0,0.58), 0 2px 10px rgba(0,0,0,0.35)',
  },
  light: {
    bg: '#FFFFFF',
    bgSoft: '#F7F2E8',
    bgHover: '#F3EEE4',
    bgActive: '#FFF5D9',
    border: '#D8D0C2',
    borderSoft: '#E8E0D4',
    text: '#1F1A14',
    muted: '#5B5348',
    dim: '#8D8375',
    gold: '#A77D22',
    jade: '#0F766E',
    crimson: '#C2413B',
    shadow: '0 16px 46px rgba(40,30,16,0.16), 0 2px 10px rgba(40,30,16,0.08)',
  },
} as const;

export default function ResumeSwitcher({
  resumes,
  activeResume,
  onSwitch,
  onFork,
  onDelete,
  onRename,
  onRestoreToMaster,
}: ResumeSwitcherProps) {
  const { theme } = useTheme();
  const P = PANEL[theme];

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [forking, setForking] = useState(false);
  const [forkName, setForkName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState('');

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const closeOnOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      setOpen(false);
      setForking(false);
      setEditingId(null);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setForking(false);
        setEditingId(null);
      }
    };

    document.addEventListener('pointerdown', closeOnOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const handleFork = async () => {
    const name = forkName.trim();
    if (!name) return;
    await onFork(name);
    setForkName('');
    setForking(false);
    setOpen(false);
  };

  const startRename = (resume: ResumeRecord, event: React.MouseEvent) => {
    event.stopPropagation();
    setEditingId(resume.id);
    setEditDraft(resume.name);
  };

  const commitRename = (id: string) => {
    const name = editDraft.trim();
    if (name) onRename(id, name);
    setEditingId(null);
  };

  const panel = mounted ? createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 bg-black/35 backdrop-blur-sm" />
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-[440px] max-w-full rounded-2xl overflow-hidden"
            style={{
              background: P.bg,
              border: `1px solid ${P.border}`,
              boxShadow: P.shadow,
            }}
          >
            <div className="px-4 py-3 border-b" style={{ borderColor: P.borderSoft }}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Layers3 size={14} style={{ color: P.gold }} />
                    <p className="text-sm font-semibold" style={{ color: P.text }}>
                      Resume versions
                    </p>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed" style={{ color: P.dim }}>
                    Fork a copy from Master, then edit that version for each opportunity.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setOpen(false);
                    setForking(false);
                    setEditingId(null);
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors"
                  style={{ color: P.dim, background: P.bgSoft, border: `1px solid ${P.borderSoft}` }}
                  title="Close"
                >
                  <X size={14} />
                </button>
              </div>
              <span
                className="mt-3 inline-flex rounded-full px-2 py-1 text-[10px] font-mono"
                style={{ color: P.dim, background: P.bgSoft, border: `1px solid ${P.borderSoft}` }}
              >
                {resumes.length} total
              </span>
            </div>

            <div className="max-h-[min(56vh,520px)] overflow-y-auto py-2">
              {resumes.map((resume) => {
                const isActive = activeResume?.id === resume.id;
                const isEditing = editingId === resume.id;

                return (
                  <div
                    key={resume.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      if (isEditing) return;
                      onSwitch(resume.id);
                      setOpen(false);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !isEditing) {
                        onSwitch(resume.id);
                        setOpen(false);
                      }
                    }}
                    className="group mx-2 flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors cursor-pointer"
                    style={{ background: isActive ? P.bgActive : 'transparent' }}
                    onMouseEnter={(event) => {
                      if (!isActive) event.currentTarget.style.background = P.bgHover;
                    }}
                    onMouseLeave={(event) => {
                      if (!isActive) event.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-lg border"
                      style={{
                        color: resume.is_master ? P.gold : P.muted,
                        background: resume.is_master ? P.bgActive : P.bgSoft,
                        borderColor: resume.is_master ? `${P.gold}66` : P.borderSoft,
                      }}
                    >
                      {resume.is_master ? <Crown size={14} /> : <GitFork size={14} />}
                    </span>

                    <div className="min-w-0 flex-1">
                      {isEditing ? (
                        <input
                          autoFocus
                          value={editDraft}
                          onChange={(event) => setEditDraft(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') commitRename(resume.id);
                            if (event.key === 'Escape') setEditingId(null);
                          }}
                          onBlur={() => commitRename(resume.id)}
                          onClick={(event) => event.stopPropagation()}
                          className="w-full rounded-lg px-2 py-1.5 text-xs outline-none"
                          style={{
                            color: P.text,
                            background: P.bgSoft,
                            border: `1px solid ${P.gold}88`,
                          }}
                        />
                      ) : (
                        <>
                          <div className="flex items-center gap-2 min-w-0">
                            <p className="truncate text-xs font-semibold" style={{ color: P.text }}>
                              {resume.name}
                            </p>
                            {isActive && (
                              <span
                                className="rounded-full px-1.5 py-0.5 text-[9px] font-mono"
                                style={{ color: P.jade, background: `${P.jade}18` }}
                              >
                                active
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 truncate text-[10px] font-mono" style={{ color: P.dim }}>
                            {resume.is_master
                              ? 'Master source'
                              : `Updated ${new Date(resume.updated_at).toLocaleDateString()}`}
                          </p>
                        </>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="flex items-center gap-0.5">
                        <button
                          onMouseDown={(event) => {
                            event.preventDefault();
                            commitRename(resume.id);
                          }}
                          className="rounded-md p-1.5"
                          style={{ color: P.jade }}
                          title="Save name"
                        >
                          <Check size={13} />
                        </button>
                        <button
                          onMouseDown={(event) => {
                            event.preventDefault();
                            setEditingId(null);
                          }}
                          className="rounded-md p-1.5"
                          style={{ color: P.crimson }}
                          title="Cancel rename"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(event) => startRename(resume, event)}
                          className="rounded-md p-1.5 transition-colors"
                          style={{ color: P.dim }}
                          title="Rename version"
                        >
                          <Pencil size={13} />
                        </button>
                        {!resume.is_master && (
                          <>
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                onRestoreToMaster(resume.id);
                                setOpen(false);
                              }}
                              className="rounded-md p-1.5 transition-colors"
                              style={{ color: P.dim }}
                              title="Restore this version from Master"
                            >
                              <RotateCcw size={13} />
                            </button>
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                onDelete(resume.id);
                              }}
                              className="rounded-md p-1.5 transition-colors"
                              style={{ color: P.crimson }}
                              title="Delete version"
                            >
                              <Trash2 size={13} />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="border-t p-3" style={{ borderColor: P.borderSoft, background: P.bgSoft }}>
              {forking ? (
                <div className="flex items-center gap-2">
                  <input
                    autoFocus
                    value={forkName}
                    onChange={(event) => setForkName(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') handleFork();
                      if (event.key === 'Escape') setForking(false);
                    }}
                    placeholder="e.g. Data Analyst - Google"
                    className="min-w-0 flex-1 rounded-lg px-3 py-2 text-xs outline-none"
                    style={{
                      color: P.text,
                      background: P.bg,
                      border: `1px solid ${P.gold}88`,
                    }}
                  />
                  <button
                    onClick={handleFork}
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ color: P.jade, background: P.bg }}
                    title="Create version"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={() => setForking(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ color: P.crimson, background: P.bg }}
                    title="Cancel"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setForking(true)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors"
                  style={{
                    color: P.gold,
                    background: P.bg,
                    border: `1px solid ${P.gold}55`,
                  }}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-lg"
                      style={{ background: `${P.gold}18` }}
                    >
                      <Plus size={14} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold">Fork from Master</span>
                      <span className="block truncate text-[10px] font-mono" style={{ color: P.dim }}>
                        Creates a separate editable copy
                      </span>
                    </span>
                  </span>
                  <GitFork size={14} />
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen((value) => !value)}
        className={`flex h-8 min-w-[150px] max-w-[220px] items-center gap-2 rounded-lg border px-3 text-xs transition-all cursor-pointer ${
          open ? 'border-gold/70 ring-2 ring-gold/15' : 'border-ink-600 hover:border-ink-500'
        } bg-ink-800`}
        title="Manage resume versions"
      >
        {activeResume?.is_master ? (
          <Crown size={12} className="text-gold flex-shrink-0" />
        ) : (
          <GitFork size={12} className="text-ivory-dim flex-shrink-0" />
        )}
        <span className="min-w-0 flex-1 truncate text-left text-ivory">
          {activeResume?.name ?? 'Select Resume'}
        </span>
        <ChevronDown
          size={13}
          className={`text-ink-500 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {panel}
    </>
  );
}
