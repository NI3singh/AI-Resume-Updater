// src/components/builder/TransformWizard.tsx
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  X, ArrowLeft, ArrowRight, Check, SkipForward, RefreshCw, Plus, Trash2,
  GitFork, PencilLine, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, Wand2,
} from 'lucide-react';
import { ResumeData } from '@/lib/types';
import { ApiError } from '@/lib/api';
import {
  planTransform, tailorSection, TransformStep, SectionProposal,
} from '@/lib/resumeTransform';
import { Spinner } from '@/components/ui/Spinner';

interface Props {
  data: ResumeData;
  jobTitle: string;
  company: string;
  jobDescription: string;
  /** Fill the editor with the tailored result (unsaved + undoable). */
  onApply: (data: ResumeData) => void;
  /** Save the tailored result as a new branch; resolves false on failure. */
  onSaveBranch: (name: string, data: ResumeData) => Promise<boolean>;
  onClose: () => void;
}

type Phase = 'planning' | 'stepping' | 'done' | 'error';
type Draft = { bullets?: string[]; text?: string };
type StepStatus = 'pending' | 'accepted' | 'skipped';
type PropState = 'loading' | 'ready' | 'error';

const BULLET_KINDS = new Set<TransformStep['kind']>(['experience', 'projects', 'extracurricular']);

// Shallow-deep clone that's safe for our plain-JSON resume data.
const clone = (d: ResumeData): ResumeData =>
  (typeof structuredClone === 'function'
    ? structuredClone(d)
    : (JSON.parse(JSON.stringify(d)) as ResumeData));

const errMsg = (err: unknown): string =>
  err instanceof ApiError && [400, 502, 503].includes(err.status)
    ? err.message
    : 'The AI could not tailor this section right now. Please try again.';

export default function TransformWizard({
  data, jobTitle, company, jobDescription, onApply, onSaveBranch, onClose,
}: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [working, setWorking] = useState<ResumeData>(() => clone(data));
  const [phase, setPhase] = useState<Phase>('planning');
  const [planError, setPlanError] = useState('');
  const [steps, setSteps] = useState<TransformStep[]>([]);
  const [i, setI] = useState(0);

  const [proposals, setProposals] = useState<Record<number, SectionProposal>>({});
  const [propState, setPropState] = useState<Record<number, PropState>>({});
  const [propError, setPropError] = useState<Record<number, string>>({});
  const [drafts, setDrafts] = useState<Record<number, Draft>>({});
  const [statuses, setStatuses] = useState<Record<number, StepStatus>>({});
  // Per-step grounding text (project README / experience related-work notes).
  const [sourceText, setSourceText] = useState<Record<number, string>>({});
  // Per-step refine comment that steers a regeneration (tone/length/emphasis).
  const [instruction, setInstruction] = useState<Record<number, string>>({});
  // JD requirements the résumé as a whole doesn't show (from the plan).
  const [planMissing, setPlanMissing] = useState<string[]>([]);

  // Branch-save sub-state (on the done screen).
  const [naming, setNaming] = useState(false);
  const [branchName, setBranchName] = useState('');
  const [savingBranch, setSavingBranch] = useState(false);
  const [branchError, setBranchError] = useState('');

  // ── Original-unit lookups (against the untouched `data`, for grounding + diff) ──
  const findEntry = useCallback((section: string, id: string): Record<string, unknown> => {
    const list = ((data as unknown as Record<string, unknown[]>)[section] ?? []) as Record<string, unknown>[];
    return (list.find((e) => e.id === id) as Record<string, unknown>) ?? {};
  }, [data]);

  const originalUnit = useCallback((step: TransformStep): Record<string, unknown> =>
    step.kind === 'summary' ? { summary: data.personal.summary ?? '' } : findEntry(step.section, step.entry_id),
  [data, findEntry]);

  const oldBullets = (step: TransformStep): string[] =>
    ((originalUnit(step).bullets as string[]) ?? []).filter(Boolean);
  const oldText = (step: TransformStep): string =>
    step.kind === 'summary'
      ? (data.personal.summary ?? '')
      : String(originalUnit(step).highlight ?? '');

  // Whole-résumé text — used as the grounding source for the summary step, so a
  // number that legitimately lives elsewhere in the résumé is allowed there.
  const resumeDigest = useMemo(() => {
    const parts: string[] = [data.personal.summary ?? ''];
    const sections = ['education', 'skills', 'projects', 'experience', 'extracurricular', 'achievements', 'certifications', 'publications'] as const;
    for (const sec of sections) {
      for (const e of ((data[sec] as unknown[]) ?? [])) {
        for (const v of Object.values(e as Record<string, unknown>)) {
          if (typeof v === 'string') parts.push(v);
          else if (Array.isArray(v)) parts.push(...v.filter((x): x is string => typeof x === 'string'));
        }
      }
    }
    return parts.filter(Boolean).join('\n');
  }, [data]);

  const sourcesFor = useCallback((step: TransformStep, idx: number): string[] => {
    // Summary may legitimately cite numbers from anywhere in the résumé.
    if (step.kind === 'summary') return [resumeDigest];
    // Entry units are grounded ONLY in the entry + the user's pasted source for
    // THIS unit (no cross-entry number teleporting).
    const extra = (sourceText[idx] ?? '').trim();
    return extra ? [extra] : [];
  }, [resumeDigest, sourceText]);

  const draftFromProposal = useCallback((step: TransformStep, res: SectionProposal): Draft => {
    const orig = originalUnit(step);
    if (step.kind === 'summary') return { text: res.proposal.summary ?? String(orig.summary ?? '') };
    if (step.kind === 'education') return { text: res.proposal.text ?? String(orig.highlight ?? '') };
    return { bullets: res.proposal.bullets ?? ((orig.bullets as string[]) ?? ['']) };
  }, [originalUnit]);

  // ── Plan (once, on mount) ───────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const plan = await planTransform(jobDescription, jobTitle, company, data);
        if (cancelled) return;
        setSteps(plan.steps);
        setPlanMissing(plan.missing_keywords ?? []);
        setPhase(plan.steps.length ? 'stepping' : 'done');
      } catch (err) {
        if (cancelled) return;
        setPlanError(errMsg(err));
        setPhase('error');
      }
    })();
    return () => { cancelled = true; };
  }, [data, jobDescription, jobTitle, company]);

  // ── Lazy per-step suggestion fetch ──────────────────────────────────────────
  const fetchProposal = useCallback(async (idx: number) => {
    const step = steps[idx];
    if (!step) return;
    setPropState((s) => ({ ...s, [idx]: 'loading' }));
    setPropError((e) => ({ ...e, [idx]: '' }));
    try {
      const res = await tailorSection({
        jobDescription, jobTitle, company,
        kind: step.kind, entry: originalUnit(step), sources: sourcesFor(step, idx),
        instruction: (instruction[idx] ?? '').trim(),
      });
      setProposals((p) => ({ ...p, [idx]: res }));
      setDrafts((d) => ({ ...d, [idx]: draftFromProposal(step, res) }));
      setPropState((s) => ({ ...s, [idx]: 'ready' }));
    } catch (err) {
      setPropError((e) => ({ ...e, [idx]: errMsg(err) }));
      setPropState((s) => ({ ...s, [idx]: 'error' }));
    }
  }, [steps, jobDescription, jobTitle, company, originalUnit, sourcesFor, draftFromProposal, instruction]);

  useEffect(() => {
    if (phase !== 'stepping') return;
    const s = steps[i];
    if (!s || proposals[i] || propState[i] === 'loading') return;
    // Auto-suggest only for units that need a change AND don't ask for extra
    // input — README / related-work steps wait for an explicit Generate so the
    // user can paste grounding first.
    if (s.recommend_change && !s.asks_readme && !s.asks_related_work) fetchProposal(i);
  }, [phase, i, steps, proposals, propState, fetchProposal]);

  // ── Esc to close ────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // ── Apply a draft into the working copy ─────────────────────────────────────
  const applyDraft = (step: TransformStep, draft: Draft) => {
    setWorking((w) => {
      if (step.kind === 'summary') {
        return { ...w, personal: { ...w.personal, summary: (draft.text ?? '').trim() } };
      }
      const section = step.section;
      const list = (((w as unknown as Record<string, unknown[]>)[section] ?? []) as Record<string, unknown>[]);
      const next = list.map((e) => {
        if (e.id !== step.entry_id) return e;
        if (step.kind === 'education') return { ...e, highlight: (draft.text ?? '').trim() };
        const cleaned = (draft.bullets ?? []).filter((b) => b.trim());
        const orig = (e.bullets as string[]) ?? [];
        return { ...e, bullets: cleaned.length ? cleaned : orig };
      });
      return { ...w, [section]: next } as unknown as ResumeData;
    });
  };

  const advance = () => {
    if (i < steps.length - 1) setI(i + 1);
    else setPhase('done');
  };

  const accept = () => {
    const step = steps[i];
    const draft = drafts[i];
    if (step && draft) applyDraft(step, draft);
    setStatuses((s) => ({ ...s, [i]: 'accepted' }));
    advance();
  };
  const skip = () => {
    const s = steps[i];
    // Restore the original content for this unit (handles Back → re-skip after a
    // prior Accept), then move on.
    if (s) applyDraft(s, BULLET_KINDS.has(s.kind) ? { bullets: oldBullets(s) } : { text: oldText(s) });
    setStatuses((st) => ({ ...st, [i]: 'skipped' }));
    advance();
  };
  const regenerate = () => {
    setProposals((p) => { const n = { ...p }; delete n[i]; return n; });
    setDrafts((d) => { const n = { ...d }; delete n[i]; return n; });
    fetchProposal(i);
  };

  // ── Draft editing ───────────────────────────────────────────────────────────
  const setDraftText = (val: string) =>
    setDrafts((d) => ({ ...d, [i]: { ...d[i], text: val } }));
  const setBullet = (k: number, val: string) =>
    setDrafts((d) => {
      const b = [...(d[i]?.bullets ?? [])]; b[k] = val;
      return { ...d, [i]: { ...d[i], bullets: b } };
    });
  const addBullet = () =>
    setDrafts((d) => ({ ...d, [i]: { ...d[i], bullets: [...(d[i]?.bullets ?? []), ''] } }));
  const removeBullet = (k: number) =>
    setDrafts((d) => {
      const b = (d[i]?.bullets ?? []).filter((_, idx) => idx !== k);
      return { ...d, [i]: { ...d[i], bullets: b } };
    });

  const acceptedCount = Object.values(statuses).filter((s) => s === 'accepted').length;

  const confirmBranch = async () => {
    if (!branchName.trim() || savingBranch) return;
    setSavingBranch(true); setBranchError('');
    const ok = await onSaveBranch(branchName.trim(), working);
    setSavingBranch(false);
    if (ok) onClose();
    else setBranchError("Couldn't create the branch — please try again.");
  };

  if (!mounted) return null;

  const step = steps[i];
  const isBullets = step ? BULLET_KINDS.has(step.kind) : false;
  const proposal = proposals[i];
  const draft = drafts[i];
  const loading = propState[i] === 'loading';
  const failed = propState[i] === 'error';
  // Units that wait for an explicit Generate: those asking for input, or ones
  // the planner judged already-fitting (optional to tailor).
  const needsGenerate = !!step && (!step.recommend_change || step.asks_readme || step.asks_related_work);
  const awaitingAuto = !!step && step.recommend_change && !step.asks_readme && !step.asks_related_work && !proposal && !failed;
  const showSpinner = loading || awaitingAuto;
  const askLabel = step?.asks_readme ? 'README' : step?.asks_related_work ? 'notes' : '';

  const overlay = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="card-glass w-full max-w-3xl max-h-[90vh] flex flex-col !p-0 overflow-hidden"
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-ink-700/60 flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg border border-gold/30 bg-gold/[0.08] flex items-center justify-center flex-shrink-0">
              <Wand2 size={15} className="text-gold" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display font-bold text-ivory text-sm truncate">
                Tailor your résumé{jobTitle.trim() ? ` — ${jobTitle.trim()}` : ''}
              </h2>
              <p className="text-ivory/45 text-[11px] truncate">
                One section at a time · review every change before it lands
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            title="Close"
            className="p-1.5 rounded-lg text-ivory-dim hover:text-ivory hover:bg-ink-800/60 transition-colors cursor-pointer flex-shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Progress dots (stepping/done) ── */}
        {(phase === 'stepping' || phase === 'done') && steps.length > 0 && (
          <div className="flex items-center gap-1.5 px-5 py-2.5 border-b border-ink-800/60 flex-shrink-0 overflow-x-auto">
            {steps.map((s, idx) => {
              const st = statuses[idx];
              const active = phase === 'stepping' && idx === i;
              const color =
                st === 'accepted' ? 'bg-jade'
                : st === 'skipped' ? 'bg-ink-500'
                : active ? 'bg-gold'
                : 'bg-ink-600';
              return (
                <div key={`${s.kind}-${s.entry_id}-${idx}`} className="flex items-center gap-1.5 flex-shrink-0">
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors ${color} ${active ? 'ring-2 ring-gold/30' : ''}`} />
                </div>
              );
            })}
            <span className="ml-auto text-[10px] font-mono text-ivory-dim flex-shrink-0">
              {phase === 'done' ? `${acceptedCount} applied` : `Step ${i + 1} of ${steps.length}`}
            </span>
          </div>
        )}

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto px-5 py-4">

          {/* Planning */}
          {phase === 'planning' && (
            <div className="py-16 text-center">
              <Spinner size={40} />
              <p className="text-ivory text-sm font-medium mt-3">Reading the job description…</p>
              <p className="text-ivory/40 text-xs mt-1">Mapping it to your résumé sections</p>
            </div>
          )}

          {/* Plan error */}
          {phase === 'error' && (
            <div className="rounded-lg border border-crimson/30 bg-crimson/[0.07] p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle size={15} className="text-crimson flex-shrink-0 mt-0.5" />
                <p className="text-crimson/90 text-xs leading-relaxed flex-1">{planError}</p>
              </div>
              <button
                onClick={onClose}
                className="mt-3 px-3 py-1.5 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          )}

          {/* Stepping */}
          {phase === 'stepping' && step && (
            <div className="space-y-4">
              {/* Step title */}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gold/70">{step.kind}</span>
                  {step.asks_readme && <span className="text-[10px] text-ink-500">· README-grounded</span>}
                  {step.asks_related_work && <span className="text-[10px] text-ink-500">· add related work</span>}
                </div>
                <h3 className="font-display font-semibold text-ivory text-base mt-0.5">{step.label}</h3>
                {step.reason && <p className="text-[11px] text-ivory/45 mt-0.5 leading-relaxed">{step.reason}</p>}
              </div>

              {/* Grounding source: projects -> README, experience -> related work.
                  Numbers/facts pasted here become allowed in the rewrite. */}
              {(step.asks_readme || step.asks_related_work) && (
                <div className="rounded-xl border border-ink-700/60 bg-ink-800/30 p-3">
                  <label className="text-[10px] uppercase tracking-wide text-ink-500 mb-1.5 block">
                    {step.asks_readme ? 'Project README' : 'Related work for this role'}{' '}
                    <span className="normal-case tracking-normal text-ivory-dim">(optional)</span>
                  </label>
                  <p className="text-[10px] text-ivory/40 mb-2 leading-relaxed">
                    {step.asks_readme
                      ? 'Paste your project’s README or notes — its facts and numbers become usable in the rewrite. Nothing else is invented.'
                      : 'Did anything you did here match this JD? Add notes — their facts and numbers become usable in the rewrite.'}
                  </p>
                  <textarea
                    value={sourceText[i] ?? ''}
                    onChange={(e) => setSourceText((s) => ({ ...s, [i]: e.target.value }))}
                    rows={3}
                    placeholder={step.asks_readme ? 'Paste README / project notes…' : 'e.g. Built the REST API and cut p95 latency 30%…'}
                    className="input-base w-full !text-[11px] !leading-relaxed resize-y min-h-[60px]"
                  />
                </div>
              )}

              {/* Planner judged this unit already-fitting */}
              {!step.recommend_change && !proposal && !showSpinner && (
                <div className="flex items-start gap-2 rounded-lg border border-jade/25 bg-jade/[0.06] px-3 py-2">
                  <CheckCircle2 size={13} className="text-jade flex-shrink-0 mt-0.5" />
                  <p className="text-ivory/60 text-[11px] leading-relaxed">
                    This section already fits the role — keep it as is, or tailor it anyway.
                  </p>
                </div>
              )}

              {/* Explicit Generate for units that wait for input / are optional */}
              {needsGenerate && !proposal && !showSpinner && !failed && (
                <button
                  onClick={() => fetchProposal(i)}
                  className="w-full flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer shadow-sm shadow-gold/25"
                >
                  <Wand2 size={13} /> {sourceText[i]?.trim() ? `Generate using your ${askLabel || 'input'}` : 'Generate suggestion'}
                </button>
              )}

              {showSpinner && (
                <div className="py-12 text-center">
                  <Spinner size={32} />
                  <p className="text-ivory/60 text-xs mt-2.5">Tailoring this section… reasoning models take ~10–30s</p>
                </div>
              )}

              {failed && (
                <div className="rounded-lg border border-crimson/30 bg-crimson/[0.07] p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-crimson flex-shrink-0 mt-0.5" />
                    <p className="text-crimson/90 text-xs leading-relaxed flex-1">{propError[i]}</p>
                  </div>
                  <button
                    onClick={() => fetchProposal(i)}
                    className="mt-2.5 flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer"
                  >
                    <RefreshCw size={12} /> Retry
                  </button>
                </div>
              )}

              {proposal && draft && !showSpinner && (
                <>
                  {proposal.no_change_recommended && (
                    <div className="flex items-start gap-2 rounded-lg border border-jade/25 bg-jade/[0.06] px-3 py-2">
                      <CheckCircle2 size={13} className="text-jade flex-shrink-0 mt-0.5" />
                      <p className="text-ivory/60 text-[11px] leading-relaxed">
                        This section already fits the role well — you can safely skip it.
                      </p>
                    </div>
                  )}

                  {/* Old → New */}
                  <div className="grid md:grid-cols-2 gap-3">
                    {/* Current */}
                    <div className="rounded-xl border border-ink-700/60 bg-ink-900/40 p-3">
                      <p className="text-[10px] uppercase tracking-wide text-ink-500 mb-2">Current</p>
                      {isBullets ? (
                        <ul className="space-y-1.5">
                          {oldBullets(step).map((b, k) => (
                            <li key={k} className="flex items-start gap-1.5 text-[11px] text-ivory/50 leading-relaxed">
                              <span className="text-ink-500 mt-0.5">•</span><span>{b}</span>
                            </li>
                          ))}
                          {oldBullets(step).length === 0 && <p className="text-[11px] text-ivory-dim italic">empty</p>}
                        </ul>
                      ) : (
                        <p className="text-[11px] text-ivory/50 leading-relaxed whitespace-pre-wrap">{oldText(step) || <span className="italic text-ivory-dim">empty</span>}</p>
                      )}
                    </div>

                    {/* Tailored (editable) */}
                    <div className="rounded-xl border border-gold/25 bg-gold/[0.04] p-3">
                      <p className="text-[10px] uppercase tracking-wide text-gold/70 mb-2 flex items-center gap-1">
                        <Sparkles size={10} /> Tailored — edit freely
                      </p>
                      {isBullets ? (
                        <div className="space-y-1.5">
                          {(draft.bullets ?? []).map((b, k) => (
                            <div key={k} className="flex items-start gap-1.5">
                              <textarea
                                value={b}
                                onChange={(e) => setBullet(k, e.target.value)}
                                rows={2}
                                className="input-base flex-1 !text-[11px] !leading-relaxed resize-y min-h-[44px] !py-1.5 !px-2"
                              />
                              {(draft.bullets ?? []).length > 1 && (
                                <button
                                  onClick={() => removeBullet(k)}
                                  className="mt-1.5 text-ivory-dim hover:text-crimson transition-colors flex-shrink-0 cursor-pointer"
                                  title="Remove bullet"
                                >
                                  <Trash2 size={12} />
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            onClick={addBullet}
                            className="flex items-center gap-1 text-[10px] text-gold hover:text-gold-light transition-colors cursor-pointer"
                          >
                            <Plus size={11} /> Add bullet
                          </button>
                        </div>
                      ) : (
                        <textarea
                          value={draft.text ?? ''}
                          onChange={(e) => setDraftText(e.target.value)}
                          rows={5}
                          className="input-base w-full !text-[11px] !leading-relaxed resize-y min-h-[100px]"
                        />
                      )}
                    </div>
                  </div>

                  {/* Rationale + keyword chips */}
                  {proposal.rationale && (
                    <p className="text-[11px] text-ivory/55 leading-relaxed">
                      <span className="text-ivory-muted font-medium">Why: </span>{proposal.rationale}
                    </p>
                  )}
                  {(proposal.covered_keywords.length > 0 || proposal.missing_keywords.length > 0) && (
                    <div className="flex flex-wrap gap-1.5">
                      {proposal.covered_keywords.map((k) => (
                        <span key={`c-${k}`} className="px-2 py-0.5 rounded-md text-[10px] bg-jade/10 text-jade border border-jade/20">{k}</span>
                      ))}
                      {proposal.missing_keywords.map((k) => (
                        <span key={`m-${k}`} className="px-2 py-0.5 rounded-md text-[10px] bg-gold/10 text-gold border border-gold/25" title="Required by the JD but not shown here — not added">{k}</span>
                      ))}
                    </div>
                  )}

                  {/* Guard warnings */}
                  {proposal.warnings.length > 0 && (
                    <ul className="space-y-1">
                      {proposal.warnings.map((w, k) => (
                        <li key={k} className="flex items-start gap-1.5 text-[10px] text-ivory/45 leading-relaxed">
                          <ShieldCheck size={11} className="text-jade/60 flex-shrink-0 mt-0.5" /><span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Refine: comment-driven regeneration */}
                  <div className="border-t border-ink-700/50 pt-3">
                    <label className="text-[10px] uppercase tracking-wide text-ink-500 mb-1.5 block">
                      Want changes? Tell the AI
                    </label>
                    <div className="flex items-start gap-2">
                      <textarea
                        value={instruction[i] ?? ''}
                        onChange={(e) => setInstruction((s) => ({ ...s, [i]: e.target.value }))}
                        onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && !showSpinner) regenerate(); }}
                        rows={2}
                        placeholder="e.g. make it shorter · emphasize leadership · use more metrics · focus on backend"
                        className="input-base flex-1 !text-[11px] !leading-relaxed resize-y min-h-[40px]"
                      />
                      <button
                        onClick={regenerate}
                        disabled={showSpinner}
                        title="Regenerate with your comment"
                        className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg border border-gold/40 text-gold hover:bg-gold/10 transition-colors cursor-pointer disabled:opacity-50 flex-shrink-0"
                      >
                        <RefreshCw size={12} /> Regenerate
                      </button>
                    </div>
                    <p className="text-[10px] text-ivory/35 mt-1 leading-relaxed">
                      Your note guides the rewrite — facts and numbers are still never invented. (⌘/Ctrl+Enter)
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Done */}
          {phase === 'done' && (
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-2xl bg-jade/10 border border-jade/25 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={22} className="text-jade" />
                </div>
                <h3 className="font-display font-semibold text-ivory text-base">
                  {steps.length === 0 ? 'Nothing to tailor' : `${acceptedCount} section${acceptedCount === 1 ? '' : 's'} tailored`}
                </h3>
                <p className="text-ivory/50 text-xs mt-1">
                  {steps.length === 0
                    ? 'Add some content in Manual mode first, then tailor it to a job.'
                    : 'Apply to this résumé, or save it as a new branch — your facts are protected.'}
                </p>
              </div>

              {planMissing.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-ink-500 mb-1.5">Honest gaps — required by the JD, not shown on your résumé</p>
                  <div className="flex flex-wrap gap-1.5">
                    {planMissing.map((k) => (
                      <span key={k} className="px-2 py-0.5 rounded-md text-[10px] bg-gold/10 text-gold border border-gold/25">{k}</span>
                    ))}
                  </div>
                  <p className="text-[10px] text-ivory/40 mt-1.5 leading-relaxed">
                    We did <span className="text-ivory-muted font-medium">not</span> add these — inventing skills you don’t have is exactly what this tool refuses to do.
                  </p>
                </div>
              )}

              <p className="flex items-start gap-1.5 text-[11px] text-ivory/45 leading-relaxed border-t border-ink-700/50 pt-3">
                <ShieldCheck size={12} className="text-jade/70 flex-shrink-0 mt-0.5" />
                <span>Every number was checked against your résumé (and any notes you pasted); invented numbers were stripped, and you approved each change.</span>
              </p>
            </div>
          )}
        </div>

        {/* ── Footer actions ── */}
        {phase === 'stepping' && (
          <div className="flex items-center justify-between gap-2 px-5 py-3.5 border-t border-ink-700/60 flex-shrink-0">
            <button
              onClick={() => setI(Math.max(0, i - 1))}
              disabled={i === 0}
              className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ArrowLeft size={13} /> Back
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={skip}
                className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory transition-colors cursor-pointer"
              >
                <SkipForward size={12} /> Keep original
              </button>
              <button
                onClick={accept}
                disabled={!proposal || showSpinner}
                className="flex items-center gap-1.5 px-4 py-2 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer shadow-sm shadow-gold/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check size={13} /> {i < steps.length - 1 ? 'Accept & next' : 'Accept & finish'}
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        )}

        {phase === 'done' && (
          <div className="px-5 py-3.5 border-t border-ink-700/60 flex-shrink-0">
            {naming ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && confirmBranch()}
                  disabled={savingBranch}
                  maxLength={200}
                  autoFocus
                  placeholder="New branch name"
                  className="input-base !px-3 !py-2 !text-xs flex-1 disabled:opacity-60"
                />
                <button
                  onClick={confirmBranch}
                  disabled={!branchName.trim() || savingBranch}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer disabled:opacity-50"
                >
                  {savingBranch ? <Spinner size={12} tone="current" /> : <Check size={13} />} Create
                </button>
                <button
                  onClick={() => setNaming(false)}
                  disabled={savingBranch}
                  className="p-2 rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory transition-colors cursor-pointer disabled:opacity-50"
                >
                  <X size={13} />
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-end gap-2">
                {branchError && <p className="text-[11px] text-crimson mr-auto">{branchError}</p>}
                <button
                  onClick={onClose}
                  className="px-3 py-2 text-xs rounded-lg text-ivory-dim hover:text-ivory transition-colors cursor-pointer"
                >
                  Discard
                </button>
                {steps.length > 0 && (
                  <>
                    <button
                      onClick={() => { onApply(working); onClose(); }}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory hover:bg-ink-800/50 transition-colors cursor-pointer"
                    >
                      <PencilLine size={13} /> Apply here (unsaved)
                    </button>
                    <button
                      onClick={() => { setBranchName(`${jobTitle.trim() || 'Tailored'}${company.trim() ? ` — ${company.trim()}` : ''}`); setBranchError(''); setNaming(true); }}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer shadow-sm shadow-gold/25"
                    >
                      <GitFork size={13} /> Save as new branch
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  return createPortal(overlay, document.body);
}
