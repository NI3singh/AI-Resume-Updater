// src/components/profile/ProjectCraftDialog.tsx
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  X, Check, Plus, Trash2, RefreshCw, FileCode, Sparkles, ShieldCheck,
  AlertTriangle, ArrowRight, Wand2, Search, ListChecks,
} from 'lucide-react';
import { ApiError } from '@/lib/api';
import {
  GithubRepo, ProjectTree, CraftedProjectFields,
  fetchProjectTree, craftGithubProject, refineGithubProject,
} from '@/lib/github';
import { Spinner } from '@/components/ui/Spinner';

interface Props {
  repo: GithubRepo;
  onAdd: (fields: CraftedProjectFields) => Promise<unknown>;
  onClose: () => void;
}

type Phase = 'tree' | 'analyzing' | 'review' | 'error';

const MAX_FILES = 18;

const errMsg = (err: unknown, fallback: string): string =>
  err instanceof ApiError && [400, 404, 502, 503].includes(err.status) ? err.message : fallback;

const fmtSize = (b: number): string =>
  b < 1024 ? `${b} B` : `${(b / 1024).toFixed(b < 10240 ? 1 : 0)} KB`;

export default function ProjectCraftDialog({ repo, onAdd, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [phase, setPhase] = useState<Phase>('tree');
  const [errorMsg, setErrorMsg] = useState('');
  const [banner, setBanner] = useState('');         // non-fatal error shown on the tree step

  const [tree, setTree] = useState<ProjectTree | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState('');

  // Review state
  const [project, setProject] = useState<CraftedProjectFields | null>(null);
  const [analyzed, setAnalyzed] = useState<string[]>([]);
  const [digest, setDigest] = useState('');
  const [warnings, setWarnings] = useState<string[]>([]);
  const [rationale, setRationale] = useState('');
  const [instruction, setInstruction] = useState('');
  const [regenerating, setRegenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  // ── Load the file tree on mount ─────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const t = await fetchProjectTree(repo.full_name);
        if (cancelled) return;
        setTree(t);
        setSelected(new Set(t.files.filter((f) => f.suggested).map((f) => f.path)));
        setPhase('tree');
      } catch (err) {
        if (cancelled) return;
        setErrorMsg(errMsg(err, 'Could not read this repository. Please try again.'));
        setPhase('error');
      }
    })();
    return () => { cancelled = true; };
  }, [repo.full_name]);

  // ── Esc to close ────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const visibleFiles = useMemo(() => {
    const q = filter.trim().toLowerCase();
    const files = tree?.files ?? [];
    return q ? files.filter((f) => f.path.toLowerCase().includes(q)) : files;
  }, [tree, filter]);

  const toggle = (path: string) =>
    setSelected((s) => { const n = new Set(s); n.has(path) ? n.delete(path) : n.add(path); return n; });
  const selectAllVisible = () =>
    setSelected((s) => { const n = new Set(s); visibleFiles.forEach((f) => n.add(f.path)); return n; });
  const clearVisible = () =>
    setSelected((s) => { const n = new Set(s); visibleFiles.forEach((f) => n.delete(f.path)); return n; });

  const analyze = useCallback(async () => {
    setPhase('analyzing'); setBanner('');
    try {
      const res = await craftGithubProject(repo.full_name, { filePaths: [...selected] });
      setProject(res.project);
      setAnalyzed(res.analyzed_files);
      setDigest(res.digest);
      setWarnings(res.warnings);
      setRationale(res.rationale);
      setInstruction('');
      setPhase('review');
    } catch (err) {
      setBanner(errMsg(err, 'Could not analyze the selected files. Please try again.'));
      setPhase('tree');
    }
  }, [repo.full_name, selected]);

  const regenerate = useCallback(async () => {
    if (!project || regenerating) return;
    setRegenerating(true);
    try {
      const res = await refineGithubProject({
        fullName: repo.full_name, digest, instruction: instruction.trim(),
        currentBullets: project.bullets,
      });
      setProject((p) => (p ? { ...p, bullets: res.bullets } : p));
      setWarnings(res.warnings);
      setRationale(res.rationale || rationale);
    } catch (err) {
      setWarnings([errMsg(err, 'Could not regenerate. Please try again.')]);
    } finally {
      setRegenerating(false);
    }
  }, [project, regenerating, repo.full_name, digest, instruction, rationale]);

  // Review editors
  const setField = (patch: Partial<CraftedProjectFields>) => setProject((p) => (p ? { ...p, ...patch } : p));
  const setBullet = (idx: number, val: string) =>
    setProject((p) => { if (!p) return p; const b = [...p.bullets]; b[idx] = val; return { ...p, bullets: b }; });
  const addBullet = () => setProject((p) => (p ? { ...p, bullets: [...p.bullets, ''] } : p));
  const removeBullet = (idx: number) =>
    setProject((p) => (p ? { ...p, bullets: p.bullets.filter((_, i) => i !== idx) } : p));

  const confirmAdd = async () => {
    if (!project || saving) return;
    setSaving(true);
    try {
      await onAdd({ ...project, bullets: project.bullets.map((b) => b.trim()).filter(Boolean) });
      onClose();
    } catch {
      setWarnings(['Could not save the project to your Master résumé. Please try again.']);
      setSaving(false);
    }
  };

  if (!mounted) return null;

  const overSelected = selected.size > MAX_FILES;

  const overlay = (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="card-glass w-full max-w-2xl max-h-[92vh] flex flex-col !p-0 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-ink-700/60 flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg border border-gold/30 bg-gold/[0.08] flex items-center justify-center flex-shrink-0">
              <FileCode size={15} className="text-gold" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display font-bold text-ivory text-sm truncate">Craft from code — {repo.name}</h2>
              <p className="text-ivory/45 text-[11px] truncate">
                {phase === 'tree' ? 'Pick the files the AI should read' : 'Bullets grounded in your code · review before adding'}
              </p>
            </div>
          </div>
          <button onClick={onClose} title="Close" className="p-1.5 rounded-lg text-ivory-dim hover:text-ivory hover:bg-ink-800/60 transition-colors cursor-pointer flex-shrink-0">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">

          {/* Error (tree fetch failed) */}
          {phase === 'error' && (
            <div className="rounded-lg border border-crimson/30 bg-crimson/[0.07] p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle size={15} className="text-crimson flex-shrink-0 mt-0.5" />
                <p className="text-crimson/90 text-xs leading-relaxed flex-1">{errorMsg}</p>
              </div>
              <button onClick={onClose} className="mt-3 px-3 py-1.5 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory transition-colors cursor-pointer">
                Close
              </button>
            </div>
          )}

          {/* Analyzing */}
          {phase === 'analyzing' && (
            <div className="py-16 text-center">
              <Spinner size={40} />
              <p className="text-ivory text-sm font-medium mt-3">Reading your code…</p>
              <p className="text-ivory/40 text-xs mt-1">
                Analyzing {Math.min(selected.size, MAX_FILES)} file{selected.size === 1 ? '' : 's'} + README, then fact-checking the draft — reasoning models take ~30–60s
              </p>
            </div>
          )}

          {/* Tree / file picker */}
          {phase === 'tree' && (
            <div className="space-y-3">
              {banner && (
                <div className="flex items-start gap-2 rounded-lg border border-crimson/30 bg-crimson/[0.07] px-3 py-2">
                  <AlertTriangle size={13} className="text-crimson flex-shrink-0 mt-0.5" />
                  <p className="text-crimson/90 text-xs flex-1">{banner}</p>
                </div>
              )}
              {!tree ? (
                <div className="py-16 text-center"><Spinner size={32} /><p className="text-ivory/50 text-xs mt-2.5">Reading the repository…</p></div>
              ) : (
                <>
                  <p className="text-ivory/55 text-xs leading-relaxed">
                    The README is always read. Pick the source files & manifests the AI should also study — the
                    important ones are pre-selected. Bullets are grounded in what these files actually show.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="input-base flex items-center gap-2 flex-1 !py-1.5">
                      <Search size={13} className="text-ink-500 flex-shrink-0" />
                      <input
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Filter files…"
                        className="bg-transparent outline-none w-full text-xs text-ivory placeholder:text-ivory-dim"
                      />
                    </div>
                    <button onClick={selectAllVisible} className="px-2.5 py-1.5 text-[11px] rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory transition-colors cursor-pointer flex items-center gap-1">
                      <ListChecks size={12} /> All
                    </button>
                    <button onClick={clearVisible} className="px-2.5 py-1.5 text-[11px] rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory transition-colors cursor-pointer">
                      None
                    </button>
                  </div>

                  {tree.truncated && (
                    <p className="text-[10px] text-gold/70">This repo is large — showing the most relevant files.</p>
                  )}

                  <div className="rounded-xl border border-ink-700/60 divide-y divide-ink-800/60 max-h-[42vh] overflow-y-auto">
                    {visibleFiles.map((f) => {
                      const on = selected.has(f.path);
                      return (
                        <label key={f.path} className="flex items-center gap-2.5 px-3 py-1.5 cursor-pointer hover:bg-ink-800/40">
                          <input type="checkbox" checked={on} onChange={() => toggle(f.path)} className="accent-gold flex-shrink-0" />
                          <span className="font-mono text-[11px] text-ivory/80 truncate flex-1">{f.path}</span>
                          {f.suggested && <span className="text-[9px] text-gold/80 flex-shrink-0">suggested</span>}
                          <span className="text-[10px] text-ivory-dim font-mono flex-shrink-0">{fmtSize(f.size)}</span>
                        </label>
                      );
                    })}
                    {visibleFiles.length === 0 && <p className="text-ivory/40 text-xs py-6 text-center">No matching files.</p>}
                  </div>

                  {overSelected && (
                    <p className="text-[10px] text-gold/80">
                      {selected.size} selected — only the {MAX_FILES} most relevant will be read (to stay fast and within limits).
                    </p>
                  )}
                </>
              )}
            </div>
          )}

          {/* Review */}
          {phase === 'review' && project && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] uppercase tracking-wide text-ink-500 mb-1 block">Name</label>
                  <input value={project.name} onChange={(e) => setField({ name: e.target.value })} className="input-base !text-xs !py-2" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wide text-ink-500 mb-1 block">Tech stack</label>
                  <input value={project.techStack} onChange={(e) => setField({ techStack: e.target.value })} className="input-base !text-xs !py-2" />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wide text-ink-500 mb-1.5 block">Bullets</label>
                <div className="space-y-1.5">
                  {project.bullets.map((b, k) => (
                    <div key={k} className="flex items-start gap-1.5">
                      <textarea
                        value={b}
                        onChange={(e) => setBullet(k, e.target.value)}
                        rows={3}
                        className="input-base flex-1 !text-[11px] !leading-relaxed resize-y min-h-[44px] !py-1.5 !px-2"
                      />
                      <button onClick={() => removeBullet(k)} className="mt-1.5 text-ivory-dim hover:text-crimson transition-colors flex-shrink-0" title="Remove bullet"><Trash2 size={12} /></button>
                    </div>
                  ))}
                  <button onClick={addBullet} className="flex items-center gap-1 text-[10px] text-gold hover:text-gold-light"><Plus size={11} /> Add bullet</button>
                </div>
              </div>

              {rationale && (
                <p className="text-[11px] text-ivory/55 leading-relaxed"><span className="text-ivory-muted font-medium">Why: </span>{rationale}</p>
              )}

              {analyzed.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-ink-500 mb-1">Analyzed {analyzed.length} file{analyzed.length === 1 ? '' : 's'}</p>
                  <div className="flex flex-wrap gap-1">
                    {analyzed.map((p) => (
                      <span key={p} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-ink-700/60 text-ivory-dim border border-ink-600/50">{p}</span>
                    ))}
                  </div>
                </div>
              )}

              {warnings.length > 0 && (
                <ul className="space-y-1">
                  {warnings.map((w, k) => (
                    <li key={k} className="flex items-start gap-1.5 text-[10px] text-ivory/45 leading-relaxed">
                      <ShieldCheck size={11} className="text-jade/60 flex-shrink-0 mt-0.5" /><span>{w}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Refine with a comment */}
              <div className="border-t border-ink-700/50 pt-3">
                <label className="text-[10px] uppercase tracking-wide text-ink-500 mb-1.5 block">Edit with a comment — keep, change, add or remove bullets</label>
                <div className="flex items-start gap-2">
                  <textarea
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && !regenerating) regenerate(); }}
                    rows={2}
                    placeholder="e.g. keep bullets 1–3 and add a 4th about Docker deployment · make it 3 bullets · merge the last two · emphasize the ML pipeline"
                    className="input-base flex-1 !text-[11px] !leading-relaxed resize-y min-h-[40px]"
                  />
                  <button
                    onClick={regenerate}
                    disabled={regenerating}
                    title="Regenerate with your comment"
                    className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg border border-gold/40 text-gold hover:bg-gold/10 transition-colors cursor-pointer disabled:opacity-50 flex-shrink-0"
                  >
                    {regenerating ? <Spinner size={12} tone="current" /> : <RefreshCw size={12} />} Regenerate
                  </button>
                </div>
                <p className="text-[10px] text-ivory/35 mt-1 leading-relaxed">
                  Agentic — say what to keep, change, add, or remove and only that changes. Grounded in your code; facts/numbers not in the repo (or your note) are stripped. (⌘/Ctrl+Enter)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {phase === 'tree' && tree && (
          <div className="flex items-center justify-between gap-2 px-5 py-3.5 border-t border-ink-700/60 flex-shrink-0">
            <p className="text-[11px] text-ivory-dim">{selected.size} file{selected.size === 1 ? '' : 's'} selected</p>
            <button
              onClick={analyze}
              disabled={selected.size === 0}
              className="flex items-center gap-1.5 px-4 py-2 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer shadow-sm shadow-gold/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wand2 size={13} /> Analyze &amp; craft bullets <ArrowRight size={12} />
            </button>
          </div>
        )}

        {phase === 'review' && (
          <div className="flex items-center justify-between gap-2 px-5 py-3.5 border-t border-ink-700/60 flex-shrink-0">
            <button onClick={() => setPhase('tree')} className="px-3 py-2 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory transition-colors cursor-pointer">
              Back to files
            </button>
            <button
              onClick={confirmAdd}
              disabled={saving || !project?.bullets.some((b) => b.trim())}
              className="btn-primary !px-4 !py-2 !text-xs disabled:opacity-50"
            >
              {saving ? <Spinner size={13} tone="current" /> : <Check size={14} />} <Sparkles size={12} /> Add to Master
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  return createPortal(overlay, document.body);
}
