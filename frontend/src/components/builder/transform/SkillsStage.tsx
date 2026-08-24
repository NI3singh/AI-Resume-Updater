// src/components/builder/transform/SkillsStage.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check, Plus, ShieldCheck, Sparkles, Undo2, X } from 'lucide-react';
import type { SkillQuestion, SkillRemoval } from '@/lib/resumeTransform';

export interface SkillsEdits {
  /** Confirmed removals — exact (category, item) pairs. */
  removes: { category: string; item: string }[];
  /** Confirmed additions with their target category name. */
  adds: { item: string; category: string }[];
  /** Questions the user dismissed with "No" (persisted so Back-navigation
   *  doesn't resurrect them). */
  declinedItems?: string[];
}

interface Props {
  categories: { id?: string; category: string; items: string[] }[];
  proposal: { remove: SkillRemoval[]; questions: SkillQuestion[] } | null;
  rationale?: string;
  /** Previously confirmed edits (restores the panel after Back-navigation). */
  initialEdits?: SkillsEdits;
  /** Reports the CURRENT confirmed edits upward on every change. */
  onChange: (edits: SkillsEdits) => void;
}

const pairKey = (category: string, item: string) => `${category}::${item}`;

/** Default landing category for an added skill: Tools-ish first, else first. */
function defaultTarget(categories: Props['categories']): string {
  const toolish = categories.find((c) => /tool|tech|platform|software/i.test(c.category));
  return (toolish ?? categories[0])?.category ?? '';
}

export default function SkillsStage({
  categories, proposal, rationale, initialEdits, onChange,
}: Props) {
  const removals = useMemo(() => proposal?.remove ?? [], [proposal]);
  const questions = useMemo(() => proposal?.questions ?? [], [proposal]);

  // Internal state initialises FROM the parent's persisted edits so leaving
  // and re-entering this step (left-rail navigation) shows exactly what was
  // chosen — the parent draft is the source of truth, this panel mirrors it.
  const [marked, setMarked] = useState<Record<string, boolean>>(() => {
    const m: Record<string, boolean> = {};
    for (const r of initialEdits?.removes ?? []) m[pairKey(r.category, r.item)] = true;
    return m;
  });
  const [yesOn, setYesOn] = useState<Record<string, boolean>>(() => {
    const added = new Set((initialEdits?.adds ?? []).map((a) => a.item));
    return Object.fromEntries(questions.map((q) => [q.item, added.has(q.item)]));
  });
  const [target, setTarget] = useState<Record<string, string>>(() => {
    const t: Record<string, string> = {};
    const def = defaultTarget(categories);
    for (const q of questions) t[q.item] = def;
    for (const a of initialEdits?.adds ?? []) if (a.category) t[a.item] = a.category;
    return t;
  });
  // Declined questions collapse to a slim "won't add" row (undoable).
  const [declined, setDeclined] = useState<Record<string, boolean>>(() => {
    const d: Record<string, boolean> = {};
    for (const item of initialEdits?.declinedItems ?? []) d[item] = true;
    return d;
  });

  // Report confirmed edits upward whenever anything changes.
  useEffect(() => {
    const removes = removals
      .filter((r) => marked[pairKey(r.category, r.item)])
      .map((r) => ({ category: r.category, item: r.item }));
    const adds = questions
      .filter((q) => yesOn[q.item])
      .map((q) => ({ item: q.item, category: target[q.item] || defaultTarget(categories) }));
    const declinedItems = questions.filter((q) => declined[q.item]).map((q) => q.item);
    onChange({ removes, adds, declinedItems });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marked, yesOn, target, declined, removals, questions]);

  const removalByCat = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const r of removals) {
      if (!m.has(r.category)) m.set(r.category, new Set());
      m.get(r.category)!.add(r.item);
    }
    return m;
  }, [removals]);

  const removalReason = (cat: string, item: string): string =>
    removals.find((r) => r.category === cat && r.item === item)?.reason ?? '';

  const activeQuestions = questions.filter((q) => !declined[q.item]);
  const declinedQuestions = questions.filter((q) => declined[q.item]);
  const markedCount = removals.filter((r) => marked[pairKey(r.category, r.item)]).length;
  const yesCount = questions.filter((q) => yesOn[q.item]).length;
  const nothingProposed = removals.length === 0 && questions.length === 0;

  const setCatMarks = (cat: string, items: Set<string>, value: boolean) =>
    setMarked((s) => ({
      ...s,
      ...Object.fromEntries([...items].map((it) => [pairKey(cat, it), value])),
    }));

  const resetAll = () => {
    setMarked({});
    setYesOn(Object.fromEntries(questions.map((q) => [q.item, false])));
    setDeclined({});
    const def = defaultTarget(categories);
    setTarget(Object.fromEntries(questions.map((q) => [q.item, def])));
  };

  return (
    <div className="space-y-6">
      {rationale && (
        <p className="text-xs text-ivory/55 leading-relaxed">
          <span className="text-ivory-muted font-medium">Why: </span>{rationale}
        </p>
      )}

      {nothingProposed ? (
        <div className="flex items-start gap-2 rounded-2xl border border-jade/25 bg-jade/[0.06] px-4 py-3">
          <ShieldCheck size={15} className="text-jade flex-shrink-0 mt-0.5" />
          <p className="text-ivory/60 text-xs leading-relaxed">
            Your skill areas already fit this role — no changes suggested.
          </p>
        </div>
      ) : (
        <>
          {/* ── Live tally — instant feedback for every tap ── */}
          <div className="flex items-center gap-4 rounded-xl border border-ink-700/60 bg-ink-900/50 px-4 py-2.5">
            <span className={`inline-flex items-center gap-1.5 text-xs font-mono ${markedCount ? 'text-crimson' : 'text-ivory-dim'}`}>
              <X size={12} /> removing <span className="font-semibold">{markedCount}</span>
            </span>
            <span className="w-px h-4 bg-ink-700" />
            <span className={`inline-flex items-center gap-1.5 text-xs font-mono ${yesCount ? 'text-jade' : 'text-ivory-dim'}`}>
              <Plus size={12} /> adding <span className="font-semibold">{yesCount}</span>
            </span>
            {declinedQuestions.length > 0 && (
              <>
                <span className="w-px h-4 bg-ink-700" />
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-500">
                  <Undo2 size={11} /> {declinedQuestions.length} declined
                </span>
              </>
            )}
            {(markedCount > 0 || yesCount > 0 || declinedQuestions.length > 0) && (
              <button
                onClick={resetAll}
                className="ml-auto text-[10px] font-mono text-ink-500 hover:text-ivory-muted transition-colors cursor-pointer"
              >
                reset all
              </button>
            )}
          </div>

          {/* ── Categories: tap a suggested chip to mark it for removal ── */}
          <div className="space-y-4">
            {categories.map((c) => {
              const catRemovals = removalByCat.get(c.category);
              const landed = questions.filter((q) => yesOn[q.item] && (target[q.item] || defaultTarget(categories)) === c.category);
              if (!catRemovals && landed.length === 0) return null;
              const catMarked = [...catRemovals ?? []].filter((it) => marked[pairKey(c.category, it)]).length;
              return (
                <div key={c.id ?? c.category} className="rounded-2xl border border-ink-700/60 bg-ink-900/40 p-4">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <p className="text-xs font-semibold text-ivory">
                      {c.category}
                      <span className="ml-2 text-[10px] font-mono text-ivory-dim">
                        {c.items.length - catMarked + landed.length} kept
                        {catMarked > 0 && <span className="text-crimson"> · {catMarked} marked</span>}
                      </span>
                    </p>
                    {!!catRemovals && (
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => setCatMarks(c.category, catRemovals, true)}
                          disabled={catMarked === catRemovals.size}
                          title="Mark every suggested item for removal"
                          className="text-[10px] font-mono text-crimson/80 hover:text-crimson transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          drop suggested ({catRemovals.size})
                        </button>
                        <span className="text-ink-600">·</span>
                        <button
                          onClick={() => setCatMarks(c.category, catRemovals, false)}
                          disabled={catMarked === 0}
                          title="Unmark everything in this category"
                          className="text-[10px] font-mono text-ink-500 hover:text-ivory-muted transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          clear
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.items.map((item) => {
                      const key = pairKey(c.category, item);
                      const isMarked = !!marked[key];
                      if (!catRemovals?.has(item)) {
                        return (
                          <span key={key} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-ink-700/70 border border-ink-600 text-ivory-muted">
                            {item}
                          </span>
                        );
                      }
                      return (
                        <button
                          key={key}
                          onClick={() => setMarked((s) => ({ ...s, [key]: !isMarked }))}
                          title={isMarked
                            ? 'Will be removed from this tailored copy — click to keep'
                            : `AI suggests removing: ${removalReason(c.category, item)} — click to remove`}
                          className={`group inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono border transition-all cursor-pointer ${
                            isMarked
                              ? 'bg-crimson/[0.1] border-crimson/50 text-crimson line-through decoration-crimson/70'
                              : 'bg-ink-700/60 border-ink-600 text-ivory-muted hover:border-crimson/40 hover:text-ivory'
                          }`}
                        >
                          {item}
                          <X
                            size={9}
                            className={isMarked
                              ? 'text-crimson'
                              : 'text-ink-500 group-hover:text-crimson transition-colors'}
                          />
                        </button>
                      );
                    })}
                    {landed.map((q) => (
                      <span key={`add-${q.item}`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono bg-jade/[0.08] border border-jade/35 text-jade">
                        <Plus size={9} /> {q.item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Addition questions ── */}
          {questions.length > 0 && (
            <div className="space-y-3">
              <div>
                <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gold/70 font-semibold mb-1">
                  <Sparkles size={11} /> Fill the gaps?
                </p>
                <p className="text-[11px] text-ivory/45 leading-relaxed">
                  These aren&apos;t on your résumé. Say <span className="text-jade">Yes</span> only if you
                  genuinely use them — they&apos;ll be added to the tailored copy (your master stays untouched).
                </p>
              </div>

              {activeQuestions.map((q) => {
                const yes = !!yesOn[q.item];
                if (yes) {
                  // Confirmed "added" state — terminal, with a single undo.
                  return (
                    <div
                      key={q.item}
                      className="rounded-2xl border border-jade/30 bg-jade/[0.06] px-4 py-3"
                    >
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <p className="text-sm font-medium text-jade flex items-center gap-2">
                          <Check size={14} />
                          Added {q.item}
                          <span className="text-ivory/40 font-normal text-xs">under</span>
                          <select
                            value={target[q.item] ?? defaultTarget(categories)}
                            onChange={(e) => setTarget((s) => ({ ...s, [q.item]: e.target.value }))}
                            className="input-base !w-auto !py-1 !px-2 !text-[11px] cursor-pointer"
                          >
                            {categories.map((c) => (
                              <option key={c.id ?? c.category} value={c.category}>{c.category}</option>
                            ))}
                          </select>
                        </p>
                        <button
                          onClick={() => setYesOn((s) => ({ ...s, [q.item]: false }))}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] rounded-lg border border-ink-600 text-ivory-dim hover:text-ivory hover:border-ivory/25 transition-colors cursor-pointer"
                        >
                          <Undo2 size={11} /> Undo
                        </button>
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={q.item}
                    className="rounded-2xl border border-ink-700/60 bg-ink-900/40 px-4 py-3"
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ivory">
                          {q.item}
                          <span className={`ml-2 text-[9px] font-mono px-1.5 py-0.5 rounded border align-middle ${
                            q.source === 'smart'
                              ? 'bg-gold/10 text-gold border-gold/25'
                              : 'bg-jade/10 text-jade border-jade/20'
                          }`}>
                            {q.source === 'smart' ? 'suggestion' : 'from JD'}
                          </span>
                        </p>
                        {q.why && <p className="text-[11px] text-ivory/45 mt-0.5 leading-relaxed">{q.why}</p>}
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => setDeclined((s) => ({ ...s, [q.item]: true }))}
                          title="Skip this suggestion"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] rounded-lg border border-ink-600 text-ivory-dim hover:text-ivory hover:border-ivory/25 transition-colors cursor-pointer"
                        >
                          <X size={11} /> No, skip
                        </button>
                        <button
                          onClick={() => setYesOn((s) => ({ ...s, [q.item]: true }))}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] rounded-lg border border-jade/40 text-jade hover:bg-jade/[0.08] transition-colors cursor-pointer font-semibold"
                        >
                          <Check size={11} /> Yes, add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Declined — collapsed rows with undo */}
              {declinedQuestions.length > 0 && (
                <div className="rounded-xl border border-ink-800 bg-ink-900/30 divide-y divide-ink-800/70">
                  {declinedQuestions.map((q) => (
                    <div key={q.item} className="flex items-center justify-between gap-2 px-3.5 py-2">
                      <p className="text-[11px] text-ink-500 font-mono flex items-center gap-1.5">
                        <X size={10} /> {q.item} — won&apos;t be added
                      </p>
                      <button
                        onClick={() => setDeclined((s) => ({ ...s, [q.item]: false }))}
                        className="text-[10px] font-mono text-gold hover:text-gold-light transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <Undo2 size={10} /> undo
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <p className="flex items-start gap-1.5 text-[10px] text-ivory/35 leading-relaxed border-t border-ink-700/50 pt-3">
            <ShieldCheck size={11} className="text-jade/60 flex-shrink-0 mt-0.5" />
            <span>
              Removals apply only to this tailored copy when you press Apply — your master résumé keeps
              everything. Nothing is ever added without your explicit Yes.
            </span>
          </p>
        </>
      )}
    </div>
  );
}
