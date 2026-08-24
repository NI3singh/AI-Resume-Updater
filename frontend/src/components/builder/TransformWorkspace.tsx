// src/components/builder/TransformWorkspace.tsx
'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  X, ArrowLeft, ArrowRight, Check, SkipForward, RefreshCw, Plus, Trash2,
  GitFork, PencilLine, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles,
  Wand2, BookOpen, FileText, ChevronRight, Layers, Lock, Search,
} from 'lucide-react';
import { ResumeData, SectionConfig } from '@/lib/types';
import { ApiError } from '@/lib/api';
import {
  planTransform, tailorSection, tailorSkillsSection, TransformStep, SectionProposal,
  SkillsCuration,
} from '@/lib/resumeTransform';
import { RESUME_RULES, estimatePages } from '@/lib/resumeRules';
import { generateLatex } from '@/lib/latexTemplate';
import { compilePdfPages } from '@/lib/pdfCompiler';
import { Spinner } from '@/components/ui/Spinner';
import { LogoMark } from '@/components/ui/Logo';
import ReorderableBullets from '@/components/builder/ReorderableBullets';
import SkillsStage, { SkillsEdits } from '@/components/builder/transform/SkillsStage';

interface Props {
  resumeName: string;
  sectionConfig: SectionConfig[];
  jobTitle: string;
  company: string;
  jobDescription: string;
  data: ResumeData;
  /** Hand the tailored result (+ tailored layout) back to the builder (unsaved). */
  onApply: (data: ResumeData, sectionConfig?: SectionConfig[]) => void;
  /** Fork the tailored result (+ tailored layout) as a new branch; false on failure. */
  onSaveBranch: (name: string, data: ResumeData, sectionConfig?: SectionConfig[]) => Promise<boolean>;
  onExit: () => void;
}

type Phase = 'planning' | 'sections' | 'content' | 'stepping' | 'done' | 'error';
type Draft = {
  bullets?: string[];
  text?: string;
  skills?: SkillsEdits;   // skills_section step only
};
type StepStatus = 'pending' | 'accepted' | 'skipped';
type PropState = 'loading' | 'ready' | 'error';

const BULLET_KINDS = new Set<TransformStep['kind']>(['experience', 'projects', 'extracurricular']);
// Kinds whose entries are pick-or-drop in the content stage (experience is
// droppable-kind NO more — ALL experience entries are always kept).
const DROPPABLE_KINDS = new Set<TransformStep['kind']>([
  'projects', 'extracurricular', 'achievements', 'certifications',
]);
const SELECTION_ONLY_KINDS = new Set<TransformStep['kind']>(['achievements', 'certifications']);

// Short labels for the one-click trim chips (entry-level, never whole sections).
const TRIM_LABEL: Partial<Record<TransformStep['kind'], string>> = {
  certifications: 'Cert',
  achievements: 'Award',
  extracurricular: 'Activity',
  projects: 'Project',
};

// Shallow-deep clone that's safe for our plain-JSON resume data.
const clone = (d: ResumeData): ResumeData =>
  (typeof structuredClone === 'function'
    ? structuredClone(d)
    : (JSON.parse(JSON.stringify(d)) as ResumeData));

const errMsg = (err: unknown): string =>
  err instanceof ApiError && [400, 502, 503].includes(err.status)
    ? err.message
    : 'The AI could not tailor this section right now. Please try again.';

export default function TransformWorkspace({
  resumeName, sectionConfig, jobTitle, company, jobDescription,
  data, onApply, onSaveBranch, onExit,
}: Props) {
  const [working, setWorking] = useState<ResumeData>(() => clone(data));
  const [phase, setPhase] = useState<Phase>('planning');
  const [planError, setPlanError] = useState('');
  const [steps, setSteps] = useState<TransformStep[]>([]);
  const [i, setI] = useState(0);
  // Frozen polish order — built once when entering the polish stage so later
  // trims on the done screen can't shift indexes under live proposals.
  const [queue, setQueue] = useState<TransformStep[]>([]);

  const [proposals, setProposals] = useState<Record<number, SectionProposal>>({});
  const [skillsCur, setSkillsCur] = useState<Record<number, SkillsCuration>>({});
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
  // Whole-section keep/drop choices (AI pre-selected via advice.keep).
  const [sectionAdviceRaw, setSectionAdviceRaw] = useState<{ section: string; label: string; keep: boolean; reason: string }[]>([]);
  const [keepSections, setKeepSections] = useState<Record<string, boolean>>({});
  // Per-entry keep/drop choices (content stage) — keyed by entry_id.
  const [keepEntries, setKeepEntries] = useState<Record<string, boolean>>({});
  // Certifications search box (content stage).
  const [certQuery, setCertQuery] = useState('');

  // Page-budget checks (done screen).
  const [realPages, setRealPages] = useState<number | null>(null);
  const [checkingPages, setCheckingPages] = useState(false);
  const [pagesError, setPagesError] = useState('');

  // Branch-save sub-state (on the done screen).
  const [naming, setNaming] = useState(false);
  const [branchName, setBranchName] = useState('');
  const [savingBranch, setSavingBranch] = useState(false);
  const [branchError, setBranchError] = useState('');

  // ── Curation derivations ────────────────────────────────────────────────────

  const droppedSet = useMemo(
    () => new Set(sectionAdviceRaw.filter((a) => keepSections[a.section] === false).map((a) => a.section)),
    [sectionAdviceRaw, keepSections],
  );

  /** Effective whole-section decision (user toggle wins over AI default). */
  const sectionOn = useCallback(
    (id: string) => {
      const adv = sectionAdviceRaw.find((a) => a.section === id);
      return keepSections[id] ?? adv?.keep ?? true;
    },
    [sectionAdviceRaw, keepSections],
  );

  const kindSteps = useCallback(
    (kind: TransformStep['kind']) =>
      steps.filter((s) => s.kind === kind && !droppedSet.has(s.section)),
    [steps, droppedSet],
  );

  const isSelected = useCallback(
    (s: TransformStep) => keepEntries[s.entry_id] ?? !s.recommend_drop,
    [keepEntries],
  );

  const projSteps = useMemo(() => kindSteps('projects'), [kindSteps]);
  const extraSteps = useMemo(() => kindSteps('extracurricular'), [kindSteps]);
  const achSteps = useMemo(() => kindSteps('achievements'), [kindSteps]);
  const certSteps = useMemo(() => kindSteps('certifications'), [kindSteps]);
  const expSteps = useMemo(() => steps.filter((s) => s.kind === 'experience' && !droppedSet.has('experience')), [steps, droppedSet]);

  const selProj = useMemo(() => projSteps.filter(isSelected), [projSteps, isSelected]);
  const selExtra = useMemo(() => extraSteps.filter(isSelected), [extraSteps, isSelected]);
  const selAch = useMemo(() => achSteps.filter(isSelected), [achSteps, isSelected]);
  const selCert = useMemo(() => certSteps.filter(isSelected), [certSteps, isSelected]);

  const projectFloor = Math.min(RESUME_RULES.PROJECTS_MIN, projSteps.length);
  const contentOk =
    selProj.length >= projectFloor &&
    selProj.length <= RESUME_RULES.PROJECTS_MAX &&
    selExtra.length <= RESUME_RULES.EXTRA_MAX &&
    selAch.length <= RESUME_RULES.ACHIEVEMENTS_MAX &&
    selCert.length <= RESUME_RULES.CERTS_MAX;

  const anySelectable = projSteps.length + extraSteps.length + achSteps.length + certSteps.length > 0;
  const skillsAvailable = (data.skills ?? []).some((c) => c.items?.length > 0);

  /** The polish order: Summary → Skills → kept Projects → ALL Experience → kept Extras. */
  const buildQueue = useCallback((): TransformStep[] => {
    const q: TransformStep[] = [];
    const summary = steps.find((s) => s.kind === 'summary');
    if (summary) q.push(summary);
    if (skillsAvailable && sectionOn('skills')) {
      q.push({
        kind: 'skills_section', entry_id: '__skills__', section: 'skills',
        label: 'Technical Skills', asks_readme: false, asks_related_work: false,
        recommend_change: true, recommend_drop: false, reason: '',
      });
    }
    const byRank = (a: TransformStep, b: TransformStep) =>
      (a.rank ?? 10_000) - (b.rank ?? 10_000);
    q.push(...selProj.slice().sort(byRank));
    q.push(...expSteps);
    q.push(...selExtra.slice().sort(byRank));
    return q;
  }, [steps, skillsAvailable, sectionOn, selProj, expSteps, selExtra]);

  const resetTransient = () => {
    setProposals({}); setSkillsCur({}); setPropState({}); setPropError({});
    setDrafts({}); setStatuses({}); setSourceText({}); setInstruction({});
  };

  const enterStepping = () => {
    const q = buildQueue();
    resetTransient();
    setQueue(q);
    setI(0);
    setPhase(q.length ? 'stepping' : 'done');
  };

  // ── Original-unit lookups (against the untouched `data`) ────────────────────
  const findEntry = useCallback((section: string, id: string): Record<string, unknown> => {
    const list = ((data as unknown as Record<string, unknown[]>)[section] ?? []) as Record<string, unknown>[];
    return (list.find((e) => e.id === id) as Record<string, unknown>) ?? {};
  }, [data]);

  const originalUnit = useCallback((step: TransformStep): Record<string, unknown> =>
    step.kind === 'summary' ? { summary: data.personal.summary ?? '' } : findEntry(step.section, step.entry_id),
  [data, findEntry]);

  const oldBullets = (step: TransformStep): string[] =>
    ((originalUnit(step).bullets as string[]) ?? []).filter(Boolean);

  // Whole-résumé text — grounding source for the summary step, so a number that
  // legitimately lives elsewhere in the résumé is allowed there.
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
    if (step.kind === 'summary') return [resumeDigest];
    const extra = (sourceText[idx] ?? '').trim();
    return extra ? [extra] : [];
  }, [resumeDigest, sourceText]);

  const draftFromProposal = useCallback((step: TransformStep, res: SectionProposal): Draft => {
    const orig = originalUnit(step);
    if (step.kind === 'summary') return { text: res.proposal.summary ?? String(orig.summary ?? '') };
    return { bullets: res.proposal.bullets ?? ((orig.bullets as string[]) ?? ['']) };
  }, [originalUnit]);

  // ── Plan (once, on mount) ───────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const plan = await planTransform(jobDescription, jobTitle, company, data, sectionConfig);
        if (cancelled) return;
        const advice = plan.section_advice ?? [];
        setSteps(plan.steps);
        setSectionAdviceRaw(advice.map((a) => ({ section: a.section, label: a.label, keep: a.keep, reason: a.reason })));
        setKeepSections(Object.fromEntries(advice.map((a) => [a.section, a.keep] as [string, boolean])));
        setKeepEntries(Object.fromEntries(
          plan.steps
            .filter((s) => DROPPABLE_KINDS.has(s.kind))
            .map((s) => [s.entry_id, !s.recommend_drop] as [string, boolean]),
        ));
        setPlanMissing(plan.missing_keywords ?? []);

        const selectable = plan.steps.some((s) => DROPPABLE_KINDS.has(s.kind));
        if (advice.length) setPhase('sections');
        else if (selectable) setPhase('content');
        else {
          // Nothing to curate — go straight to polish (summary/skills/experience).
          const q: TransformStep[] = [];
          const summary = plan.steps.find((s) => s.kind === 'summary');
          if (summary) q.push(summary);
          if ((data.skills ?? []).some((c) => c.items?.length > 0)) {
            q.push({
              kind: 'skills_section', entry_id: '__skills__', section: 'skills',
              label: 'Technical Skills', asks_readme: false, asks_related_work: false,
              recommend_change: true, recommend_drop: false, reason: '',
            });
          }
          q.push(...plan.steps.filter((s) => s.kind === 'experience'));
          setQueue(q); setI(0);
          setPhase(q.length ? 'stepping' : 'done');
        }
      } catch (err) {
        if (cancelled) return;
        setPlanError(errMsg(err));
        setPhase('error');
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Per-step suggestion fetches ─────────────────────────────────────────────
  const fetchProposal = useCallback(async (idx: number) => {
    const step = queue[idx];
    if (!step) return;
    setPropState((s) => ({ ...s, [idx]: 'loading' }));
    setPropError((e) => ({ ...e, [idx]: '' }));
    try {
      if (step.kind === 'skills_section') {
        const res = await tailorSkillsSection({
          jobDescription, jobTitle, company,
          categories: (data.skills ?? []).map((c) => ({ id: c.id, category: c.category, items: c.items })),
          instruction: (instruction[idx] ?? '').trim(),
        });
        setSkillsCur((p) => ({ ...p, [idx]: res }));
        setDrafts((d) => ({ ...d, [idx]: {} })); // SkillsStage reports edits upward
      } else {
        const res = await tailorSection({
          jobDescription, jobTitle, company,
          kind: step.kind, entry: originalUnit(step), sources: sourcesFor(step, idx),
          instruction: (instruction[idx] ?? '').trim(),
        });
        setProposals((p) => ({ ...p, [idx]: res }));
        setDrafts((d) => ({ ...d, [idx]: draftFromProposal(step, res) }));
      }
      setPropState((s) => ({ ...s, [idx]: 'ready' }));
    } catch (err) {
      setPropError((e) => ({ ...e, [idx]: errMsg(err) }));
      setPropState((s) => ({ ...s, [idx]: 'error' }));
    }
  }, [queue, jobDescription, jobTitle, company, data.skills, originalUnit, sourcesFor, draftFromProposal, instruction]);

  // Surgical refine for already-tailored units (never for the skills pass —
  // regeneration there re-runs the whole curation with the new instruction).
  const refineSection = useCallback(async (idx: number) => {
    const step = queue[idx];
    const curDraft = drafts[idx];
    if (!step || !curDraft) return;
    const current = BULLET_KINDS.has(step.kind)
      ? { bullets: (curDraft.bullets ?? []).filter((b) => b.trim()) }
      : { summary: curDraft.text ?? '' };
    setPropState((s) => ({ ...s, [idx]: 'loading' }));
    setPropError((e) => ({ ...e, [idx]: '' }));
    try {
      const res = await tailorSection({
        jobDescription, jobTitle, company,
        kind: step.kind, entry: originalUnit(step), current,
        sources: sourcesFor(step, idx), instruction: (instruction[idx] ?? '').trim(),
      });
      setProposals((p) => ({ ...p, [idx]: res }));
      setDrafts((d) => ({ ...d, [idx]: draftFromProposal(step, res) }));
      setPropState((s) => ({ ...s, [idx]: 'ready' }));
    } catch (err) {
      setPropError((e) => ({ ...e, [idx]: errMsg(err) }));
      setPropState((s) => ({ ...s, [idx]: 'error' }));
    }
  }, [queue, drafts, jobDescription, jobTitle, company, originalUnit, sourcesFor, draftFromProposal, instruction]);

  useEffect(() => {
    if (phase !== 'stepping') return;
    const s = queue[i];
    if (!s || proposals[i] || skillsCur[i] || propState[i] === 'loading') return;
    if (s.recommend_change && !s.asks_readme && !s.asks_related_work) fetchProposal(i);
  }, [phase, i, queue, proposals, skillsCur, propState, fetchProposal]);

  // ── Esc to exit ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onExit(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onExit]);

  // ── Apply a draft into the working copy ─────────────────────────────────────
  const pairKey = (category: string, item: string) => `${category}::${item}`;

  const applyDraft = (step: TransformStep, draft: Draft) => {
    setWorking((w) => {
      if (step.kind === 'skills_section') {
        const rm = new Set((draft.skills?.removes ?? []).map((r) => pairKey(r.category, r.item)));
        const adds = draft.skills?.adds ?? [];
        return {
          ...w,
          skills: w.skills.map((c) => {
            const kept = c.items.filter((it) => !rm.has(pairKey(c.category, it)));
            const incoming = adds.filter((a) => a.category === c.category).map((a) => a.item);
            return incoming.length ? { ...c, items: [...kept, ...incoming] } : { ...c, items: kept };
          }),
        };
      }
      if (step.kind === 'summary') {
        return { ...w, personal: { ...w.personal, summary: (draft.text ?? '').trim() } };
      }
      const section = step.section;
      const list = (((w as unknown as Record<string, unknown[]>)[section] ?? []) as Record<string, unknown>[]);
      const next = list.map((e) => {
        if (e.id !== step.entry_id) return e;
        const cleaned = (draft.bullets ?? []).filter((b) => b.trim());
        const orig = (e.bullets as string[]) ?? [];
        return { ...e, bullets: cleaned.length ? cleaned : orig };
      });
      return { ...w, [section]: next } as unknown as ResumeData;
    });
  };

  const advance = () => {
    if (i < queue.length - 1) setI(i + 1);
    else setPhase('done');
  };

  const accept = () => {
    const step = queue[i];
    const draft = drafts[i];
    if (step && draft) applyDraft(step, draft);
    setStatuses((s) => ({ ...s, [i]: 'accepted' }));
    advance();
  };
  const skip = () => {
    const s = queue[i];
    if (s) {
      if (s.kind === 'skills_section') {
        // Restore pristine categories (undoes an earlier Accept on Back).
        setWorking((w) => ({
          ...w,
          skills: (data.skills ?? []).map((c) => ({ id: c.id, category: c.category, items: [...c.items] })),
        }));
      } else if (BULLET_KINDS.has(s.kind)) {
        applyDraft(s, { bullets: oldBullets(s) });
      } else if (s.kind === 'summary') {
        applyDraft(s, { text: data.personal.summary ?? '' });
      }
    }
    setStatuses((st) => ({ ...st, [i]: 'skipped' }));
    advance();
  };
  const regenerate = () => {
    const s = queue[i];
    if (!s) return;
    if (s.kind !== 'skills_section' && (instruction[i] ?? '').trim() && drafts[i]) {
      refineSection(i);
      return;
    }
    setProposals((p) => { const n = { ...p }; delete n[i]; return n; });
    setSkillsCur((p) => { const n = { ...p }; delete n[i]; return n; });
    setDrafts((d) => { const n = { ...d }; delete n[i]; return n; });
    fetchProposal(i);
  };

  // ── Draft editing ───────────────────────────────────────────────────────────
  const setDraftText = (val: string) =>
    setDrafts((d) => ({ ...d, [i]: { ...d[i], text: val } }));
  const setBullets = (bullets: string[]) =>
    setDrafts((d) => ({ ...d, [i]: { ...d[i], bullets } }));
  const addBullet = () =>
    setDrafts((d) => ({ ...d, [i]: { ...d[i], bullets: [...(d[i]?.bullets ?? []), ''] } }));

  const acceptedCount = Object.values(statuses).filter((s) => s === 'accepted').length;

  const confirmBranch = async () => {
    if (!branchName.trim() || savingBranch) return;
    setSavingBranch(true); setBranchError('');
    const ok = await onSaveBranch(branchName.trim(), finalData, tailoredConfig);
    setSavingBranch(false);
    if (!ok) setBranchError("Couldn't create the branch — please try again.");
  };

  // ── Final artefacts ──────────────────────────────────────────────────────────
  /** Entry ids dropped via content-stage toggles (their sections are kept). */
  const unselectedIds = useMemo(() => {
    const ids = new Set<string>();
    for (const group of [projSteps, extraSteps, achSteps, certSteps]) {
      for (const s of group) if (!isSelected(s)) ids.add(s.entry_id);
    }
    return ids;
  }, [projSteps, extraSteps, achSteps, certSteps, isSelected]);

  const tailoredConfig = useMemo(
    () => sectionConfig.filter((s) => sectionOn(s.id)),
    [sectionConfig, sectionOn],
  );

  const finalData = useMemo(() => {
    const d = clone(working);
    const filterLists = (sec: string) => {
      const list = (d as unknown as Record<string, { id?: string }[]>)[sec];
      if (Array.isArray(list)) {
        (d as unknown as Record<string, unknown>)[sec] = list.filter(
          (e) => !unselectedIds.has(String(e.id)),
        );
      }
    };
    for (const sec of ['experience', 'projects', 'extracurricular', 'achievements', 'certifications'] as const) {
      filterLists(sec);
    }
    return d;
  }, [working, unselectedIds]);

  const finalLatex = useMemo(
    () => generateLatex(finalData, tailoredConfig),
    [finalData, tailoredConfig],
  );
  const estPages = useMemo(() => estimatePages(finalLatex), [finalLatex]);

  // The REAL compiled page count is the judge; the estimate is only a
  // placeholder until it arrives. Over-budget claims are never made from the
  // heuristic alone while a measurement is pending.
  const measured = realPages !== null;
  const measurePending = !measured && !pagesError;
  const pagesOver = measured
    ? (realPages as number) > RESUME_RULES.MAX_PAGES
    : !measurePending && estPages > RESUME_RULES.MAX_PAGES;

  const autoCheck = useRef({ armed: true });

  const runRealCheck = async () => {
    setCheckingPages(true); setPagesError('');
    try {
      setRealPages(await compilePdfPages(finalLatex));
    } catch (err) {
      setPagesError(err instanceof Error ? err.message : 'Compilation failed');
    } finally {
      setCheckingPages(false);
    }
  };

  // Measure once on entering the done screen, and again automatically after
  // any trim invalidates the previous measurement.
  useEffect(() => {
    if (phase === 'done' && autoCheck.current.armed && !checkingPages) {
      autoCheck.current.armed = false;
      void runRealCheck();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, realPages]);

  /** Least-relevant kept items across capped kinds — the 1-click trim menu. */
  const trimCandidates = useMemo(() => {
    if (!pagesOver) return [];
    const out: TransformStep[] = [];
    for (const k of ['certifications', 'achievements', 'extracurricular', 'projects'] as const) {
      out.push(...kindSteps(k).filter((s) => isSelected(s)).sort((a, b) => (b.rank ?? 0) - (a.rank ?? 0)));
    }
    return out.slice(0, 5);
  }, [pagesOver, kindSteps, isSelected]);

  const trim = (id: string) => {
    setKeepEntries((m) => ({ ...m, [id]: false }));
    // Content changed — the previous compiled measurement is stale; re-measure.
    setRealPages(null);
    setPagesError('');
    autoCheck.current.armed = true;
  };

  // ── Current-step conveniences ────────────────────────────────────────────────
  const step = queue[i];
  const isSkills = step?.kind === 'skills_section';
  const isBullets = step ? BULLET_KINDS.has(step.kind) : false;
  const proposal = proposals[i];
  const skillsResult = skillsCur[i];
  const draft = drafts[i];
  const loading = propState[i] === 'loading';
  const failed = propState[i] === 'error';
  const hasProposal = !!proposal || !!skillsResult;
  const needsGenerate = !!step && (!step.recommend_change || step.asks_readme || step.asks_related_work);
  const awaitingAuto = !!step && step.recommend_change && !step.asks_readme && !step.asks_related_work && !hasProposal && !failed;
  const showSpinner = loading || awaitingAuto;
  const askLabel = step?.asks_readme ? 'README' : step?.asks_related_work ? 'notes' : '';
  const committable = queue.length > 0 || unselectedIds.size > 0;

  const roleChip = [jobTitle.trim(), company.trim()].filter(Boolean).join(' · ');
  const showFlowStrip = phase === 'sections' || phase === 'content' || phase === 'stepping';

  const railStatusIcon = (idx: number) => {
    const st = statuses[idx];
    if (st === 'accepted') return <CheckCircle2 size={13} className="text-jade flex-shrink-0" />;
    if (st === 'skipped') return <span className="w-[11px] h-[11px] rounded-full border-2 border-ink-500 flex-shrink-0" />;
    const ps = propState[idx];
    if (ps === 'loading') return <Spinner size={12} />;
    if (ps === 'error') return <AlertTriangle size={12} className="text-crimson flex-shrink-0" />;
    return <span className="w-[11px] h-[11px] rounded-full border-2 border-ink-600 flex-shrink-0" />;
  };

  const filteredCertSteps = certSteps.filter((s) =>
    !certQuery.trim() || s.label.toLowerCase().includes(certQuery.trim().toLowerCase()));

  return (
    <div className="h-screen flex flex-col bg-ink-950 overflow-hidden">
      {/* ── Top bar ── */}
      <header className="relative z-10 flex items-center justify-between gap-3 px-4 py-2.5 border-b border-ink-800/80 bg-ink-900/90 backdrop-blur-md flex-shrink-0 min-h-[52px]">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onExit}
            title="Back to builder (Esc)"
            className="flex items-center gap-1.5 text-ivory-dim hover:text-ivory transition-colors text-xs cursor-pointer px-2 py-1.5 rounded-lg hover:bg-ink-800/60"
          >
            <ArrowLeft size={14} />
            <span className="hidden md:block font-mono">Builder</span>
          </button>
          <div className="w-px h-5 bg-ink-700/80 hidden sm:block" />
          <LogoMark size={22} />
          <div className="min-w-0">
            <h1 className="font-display font-bold text-ivory text-sm leading-tight truncate">Tailor your résumé</h1>
            <p className="text-[10px] text-ivory-dim font-mono truncate">
              {roleChip ? `${roleChip} · ` : ''}{resumeName}
            </p>
          </div>
        </div>

        {showFlowStrip && (
          <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
            {([
              { key: 'sections', label: 'Sections', idx: 0 },
              { key: 'content', label: 'Entries', idx: 1 },
              { key: 'stepping', label: 'Polish', idx: 2 },
            ] as const).map((f, fi) => {
              const currentIdx =
                phase === 'sections' ? 0 : phase === 'content' ? 1 : 2;
              const current = f.idx === currentIdx;
              const done = f.idx < currentIdx;
              return (
                <span key={f.key} className="flex items-center gap-1.5">
                  {fi > 0 && <ChevronRight size={11} className="text-ink-600" />}
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono border ${
                    current ? 'bg-gold/15 text-gold border-gold/30'
                      : done ? 'text-jade border-jade/25 bg-jade/[0.06]'
                      : 'text-ink-500 border-ink-700'
                  }`}>
                    {done && <Check size={9} />}
                    {f.label}
                  </span>
                </span>
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-3 flex-shrink-0">
          {(phase === 'stepping' || phase === 'done') && queue.length > 0 && (
            <span className="text-[10px] font-mono text-ivory-dim hidden sm:block">
              {phase === 'done' ? `${acceptedCount}/${queue.length} applied` : `Step ${i + 1} of ${queue.length}`}
            </span>
          )}
          <button
            onClick={onExit}
            title="Exit to builder"
            className="p-1.5 rounded-lg text-ivory-dim hover:text-ivory hover:bg-ink-800/60 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Polish checklist rail */}
        {(phase === 'stepping' || phase === 'done') && queue.length > 0 && (
          <aside className="hidden lg:flex w-72 flex-shrink-0 flex-col border-r border-ink-800/80 bg-ink-900/50 overflow-hidden">
            <div className="px-4 pt-4 pb-2 flex items-center justify-between flex-shrink-0">
              <span className="section-label mb-0">Polish queue</span>
              <span className="text-[10px] font-mono text-ink-500">{queue.length}</span>
            </div>
            <div className="flex-1 overflow-y-auto px-2 pb-3 space-y-0.5">
              {queue.map((s, idx) => {
                const active = phase === 'stepping' && idx === i;
                return (
                  <button
                    key={`${s.kind}-${s.entry_id}-${idx}`}
                    onClick={() => { if (phase === 'stepping') setI(idx); }}
                    disabled={phase !== 'stepping'}
                    className={`w-full text-left flex items-start gap-2 px-2.5 py-2 rounded-lg transition-colors ${
                      active ? 'bg-gold/10 border border-gold/25' : 'border border-transparent hover:bg-ink-800/50'
                    } ${phase !== 'stepping' ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <span className="mt-0.5">{railStatusIcon(idx)}</span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-xs font-medium truncate ${active ? 'text-ivory' : 'text-ivory-muted'}`}>
                        {s.label}
                      </span>
                      <span className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-gold/60">
                          {s.kind === 'skills_section' ? 'skills' : s.kind}
                        </span>
                        {s.asks_readme && <BookOpen size={9} className="text-ink-500" />}
                        {s.asks_related_work && <FileText size={9} className="text-ink-500" />}
                        {!s.recommend_change && s.kind !== 'skills_section' && (
                          <span className="text-[8px] px-1 py-px rounded bg-jade/10 text-jade border border-jade/20">fits</span>
                        )}
                      </span>
                      {s.reason && (
                        <span className="block text-[10px] text-ivory/35 leading-snug line-clamp-2 mt-0.5">{s.reason}</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
            {planMissing.length > 0 && (
              <div className="border-t border-ink-800/80 px-3.5 py-3 flex-shrink-0">
                <p className="text-[9px] font-mono uppercase tracking-wider text-ink-500 mb-1">
                  {planMissing.length} honest gap{planMissing.length === 1 ? '' : 's'}
                </p>
                <p className="text-[10px] text-ivory/40 leading-relaxed">
                  Required by the JD but not on your résumé — shown at the end.
                </p>
              </div>
            )}
          </aside>
        )}

        {/* Main column */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 py-8">

            {/* Planning */}
            {phase === 'planning' && (
              <div className="py-32 text-center">
                <Spinner size={44} />
                <p className="text-ivory text-base font-medium mt-4">Reading the job description…</p>
                <p className="text-ivory/40 text-sm mt-1.5">Deciding what belongs in this résumé</p>
                <p className="text-[11px] font-mono text-ink-500 mt-6">Reasoning models can take ~10–30s on the plan</p>
              </div>
            )}

            {/* Plan error */}
            {phase === 'error' && (
              <div className="rounded-2xl border border-crimson/30 bg-crimson/[0.07] p-5 max-w-xl mx-auto mt-16">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle size={17} className="text-crimson flex-shrink-0 mt-0.5" />
                  <p className="text-crimson/90 text-sm leading-relaxed flex-1">{planError}</p>
                </div>
                <button
                  onClick={onExit}
                  className="mt-4 px-3.5 py-2 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory transition-colors cursor-pointer"
                >
                  Back to builder
                </button>
              </div>
            )}

            {/* ── Stage 1: whole-section curation ── */}
            {phase === 'sections' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-6 max-w-2xl mx-auto">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-9 h-9 rounded-lg border border-gold/30 bg-gold/[0.08] flex items-center justify-center">
                      <Layers size={16} className="text-gold" />
                    </div>
                    <h2 className="font-display font-semibold text-ivory text-2xl">Which sections fit this role?</h2>
                  </div>
                  <p className="text-ivory/50 text-xs leading-relaxed">
                    Unchecked sections won&apos;t appear in the tailored résumé — your underlying
                    data is always kept. You decide.
                  </p>
                </div>

                {/* Compulsory — always on */}
                <div className="flex flex-wrap gap-2">
                  {['Personal', 'Education'].map((lbl) => (
                    <span key={lbl} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-jade/25 bg-jade/[0.06] text-xs text-jade">
                      <Lock size={11} /> {lbl} <span className="text-[9px] font-mono opacity-70">always kept</span>
                    </span>
                  ))}
                </div>

                <div className="space-y-2.5">
                  {sectionAdviceRaw.map((a) => {
                    const effective = keepSections[a.section] ?? a.keep;
                    const checked = effective !== false;
                    return (
                      <label
                        key={a.section}
                        className={`flex items-start gap-3 rounded-2xl border px-4 py-3.5 cursor-pointer transition-colors ${
                          checked ? 'border-ink-700/60 bg-ink-900/40 hover:border-ink-600' : 'border-crimson/25 bg-crimson/[0.05]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => setKeepSections((s) => ({ ...s, [a.section]: e.target.checked }))}
                          className="accent-gold mt-1 w-4 h-4"
                        />
                        <div className="min-w-0">
                          <p className={`text-sm font-medium ${checked ? 'text-ivory' : 'text-ivory-muted line-through'}`}>{a.label}</p>
                          {a.reason && (
                            <p className={`text-[11px] mt-0.5 leading-relaxed ${!a.keep ? 'text-gold/80' : 'text-ivory/45'}`}>
                              {!a.keep ? 'AI suggests dropping — ' : ''}{a.reason}
                            </p>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ── Stage 2: content curation ── */}
            {phase === 'content' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-8">

                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-9 h-9 rounded-lg border border-gold/30 bg-gold/[0.08] flex items-center justify-center">
                      <Layers size={16} className="text-gold" />
                    </div>
                    <h2 className="font-display font-semibold text-ivory text-2xl">Pick what survives</h2>
                  </div>
                  <p className="text-ivory/50 text-xs leading-relaxed max-w-2xl">
                    A targeted résumé shows only the best-fitting subset — 2–3 projects, the few
                    credentials that matter here. Your master keeps everything either way.
                  </p>
                </div>

                {/* Projects */}
                {projSteps.length > 0 && (
                  <Group
                    title="Projects"
                    counter={`${selProj.length} selected`}
                    hint={`${RESUME_RULES.PROJECTS_MIN}–${RESUME_RULES.PROJECTS_MAX} recommended${projSteps.length <= RESUME_RULES.PROJECTS_MAX ? '' : ' — pick the strongest fit'}${selProj.length < projectFloor ? ` · at least ${projectFloor} required` : ''}${selProj.length > RESUME_RULES.PROJECTS_MAX ? ` · max ${RESUME_RULES.PROJECTS_MAX}` : ''}`}
                    warn={selProj.length < projectFloor || selProj.length > RESUME_RULES.PROJECTS_MAX}
                  >
                    {sortForDisplay(projSteps).map((s) => (
                      <PickRow key={s.entry_id} step={s} checked={isSelected(s)} onToggle={() => toggleEntry(s)} />
                    ))}
                  </Group>
                )}

                {/* Certifications */}
                {certSteps.length > 0 && (
                  <Group
                    title="Certifications"
                    counter={`${selCert.length} / ${RESUME_RULES.CERTS_MAX}`}
                    hint={selCert.length > RESUME_RULES.CERTS_MAX ? `Max ${RESUME_RULES.CERTS_MAX} — deselect ${selCert.length - RESUME_RULES.CERTS_MAX}` : 'Only the ones a recruiter for THIS role cares about'}
                    warn={selCert.length > RESUME_RULES.CERTS_MAX}
                  >
                    <div className="relative mb-2">
                      <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                      <input
                        value={certQuery}
                        onChange={(e) => setCertQuery(e.target.value)}
                        placeholder={`Search ${certSteps.length} certifications…`}
                        className="input-base !py-2 !pl-8 !text-xs"
                      />
                    </div>
                    <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1">
                      {filteredCertSteps.map((s) => (
                        <PickRow key={s.entry_id} step={s} checked={isSelected(s)} onToggle={() => toggleEntry(s)} compact />
                      ))}
                    </div>
                    <button
                      onClick={() => setKeepEntries((m) => ({
                        ...m,
                        ...Object.fromEntries(certSteps.map((s) => [s.entry_id, !s.recommend_drop])),
                      }))}
                      className="mt-2 text-[11px] font-mono text-gold hover:text-gold-light transition-colors cursor-pointer"
                    >
                      ↺ apply the AI&apos;s shortlist
                    </button>
                  </Group>
                )}

                {/* Achievements */}
                {achSteps.length > 0 && (
                  <Group
                    title="Achievements"
                    counter={`${selAch.length} / ${RESUME_RULES.ACHIEVEMENTS_MAX}`}
                    hint={selAch.length > RESUME_RULES.ACHIEVEMENTS_MAX ? `Max ${RESUME_RULES.ACHIEVEMENTS_MAX}` : undefined}
                    warn={selAch.length > RESUME_RULES.ACHIEVEMENTS_MAX}
                  >
                    {sortForDisplay(achSteps).map((s) => (
                      <PickRow key={s.entry_id} step={s} checked={isSelected(s)} onToggle={() => toggleEntry(s)} compact />
                    ))}
                  </Group>
                )}

                {/* Extracurricular */}
                {extraSteps.length > 0 && (
                  <Group
                    title="Extracurricular Activities"
                    counter={`${selExtra.length} / ${RESUME_RULES.EXTRA_MAX}`}
                    hint={selExtra.length > RESUME_RULES.EXTRA_MAX ? `Max ${RESUME_RULES.EXTRA_MAX}` : undefined}
                    warn={selExtra.length > RESUME_RULES.EXTRA_MAX}
                  >
                    {sortForDisplay(extraSteps).map((s) => (
                      <PickRow key={s.entry_id} step={s} checked={isSelected(s)} onToggle={() => toggleEntry(s)} />
                    ))}
                  </Group>
                )}

                {/* Fixed-policy info cards */}
                <div className="grid sm:grid-cols-3 gap-2.5">
                  <InfoCard icon={<Lock size={13} className="text-jade" />} title="Experience — all kept">
                    All {expSteps.length} role{expSteps.length === 1 ? '' : 's'} stay; you&apos;ll polish their bullets next.
                  </InfoCard>
                  <InfoCard icon={<BookOpen size={13} className={sectionOn('publications') ? 'text-jade' : 'text-crimson'} />} title={`Publications — ${sectionOn('publications') ? 'kept' : 'dropped'}`}>
                    Follows your Stage-1 decision; individual papers aren&apos;t picked apart.
                  </InfoCard>
                  <InfoCard icon={<Sparkles size={13} className="text-gold" />} title="Skills — next stage">
                    Curated with you in the polish stage, including “do you know X?” questions.
                  </InfoCard>
                </div>
              </motion.div>
            )}

            {/* ── Stage 3: polish (one unit at a time) ── */}
            {phase === 'stepping' && step && (
              <motion.div key={`${step.kind}-${step.entry_id}-${i}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-6">

                {/* Step header */}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gold/70">
                      {isSkills ? 'skills' : step.kind}
                    </span>
                    {step.asks_readme && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-ink-500"><BookOpen size={10} /> README-grounded</span>
                    )}
                    {step.asks_related_work && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-ink-500"><FileText size={10} /> accepts related-work notes</span>
                    )}
                  </div>
                  <h2 className="font-display font-semibold text-ivory text-2xl mt-1">{step.label}</h2>
                  {isSkills && (
                    <p className="text-xs text-ivory/45 mt-1 leading-relaxed max-w-2xl">
                      Trim what doesn&apos;t serve this role and confirm any additions —
                      your master résumé keeps everything.
                    </p>
                  )}
                  {!isSkills && step.reason && (
                    <p className="text-xs text-ivory/45 mt-1 leading-relaxed max-w-2xl">{step.reason}</p>
                  )}
                </div>

                {/* Grounding source (README / related work) */}
                {(step.asks_readme || step.asks_related_work) && (
                  <GroundingBox
                    askLabel={askLabel}
                    value={sourceText[i] ?? ''}
                    onChange={(v) => setSourceText((s) => ({ ...s, [i]: v }))}
                  />
                )}

                {/* Fits-already nudge */}
                {!isSkills && !step.recommend_change && !hasProposal && !showSpinner && (
                  <div className="flex items-start gap-2 rounded-2xl border border-jade/25 bg-jade/[0.06] px-4 py-3 max-w-2xl">
                    <CheckCircle2 size={15} className="text-jade flex-shrink-0 mt-0.5" />
                    <p className="text-ivory/60 text-xs leading-relaxed">
                      This unit already fits the role — keep it as is, or tailor it anyway.
                    </p>
                  </div>
                )}

                {/* Explicit Generate */}
                {needsGenerate && !hasProposal && !showSpinner && !failed && (
                  <button
                    onClick={() => fetchProposal(i)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm rounded-xl bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer shadow-sm shadow-gold/25"
                  >
                    <Wand2 size={15} /> {sourceText[i]?.trim() ? `Generate using your ${askLabel || 'input'}` : 'Generate suggestion'}
                  </button>
                )}

                {showSpinner && (
                  <div className="py-24 text-center">
                    <Spinner size={36} />
                    <p className="text-ivory/60 text-sm mt-3">
                      {isSkills ? 'Curating your skill areas…' : 'Tailoring this section…'} reasoning models take ~10–30s
                    </p>
                  </div>
                )}

                {failed && (
                  <div className="rounded-2xl border border-crimson/30 bg-crimson/[0.07] p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle size={16} className="text-crimson flex-shrink-0 mt-0.5" />
                      <p className="text-crimson/90 text-xs leading-relaxed flex-1">{propError[i]}</p>
                    </div>
                    <button
                      onClick={() => fetchProposal(i)}
                      className="mt-3 flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer"
                    >
                      <RefreshCw size={12} /> Retry
                    </button>
                  </div>
                )}

                {/* ── Skills curation panel ── */}
                {isSkills && skillsResult && !showSpinner && (
                  <SkillsStage
                    key={`skills-${i}`}
                    categories={(data.skills ?? []).map((c) => ({ id: c.id, category: c.category, items: c.items }))}
                    proposal={skillsResult.proposal}
                    rationale={skillsResult.rationale}
                    initialEdits={drafts[i]?.skills}
                    onChange={(edits) => setDrafts((d) => ({ ...d, [i]: { ...d[i], skills: edits } }))}
                  />
                )}

                {/* ── Regular unit: numbered current + editable tailored ── */}
                {!isSkills && proposal && draft && !showSpinner && (
                  <>
                    {proposal.no_change_recommended && (
                      <div className="flex items-start gap-2 rounded-2xl border border-jade/25 bg-jade/[0.06] px-4 py-3">
                        <CheckCircle2 size={15} className="text-jade flex-shrink-0 mt-0.5" />
                        <p className="text-ivory/60 text-xs leading-relaxed">
                          This section already fits the role well — you can safely skip it.
                        </p>
                      </div>
                    )}

                    <div className="rounded-2xl border border-ink-700/60 bg-ink-900/40 p-5">
                      <p className="text-[10px] uppercase tracking-wider text-ink-500 mb-3 font-semibold">
                        Current{isBullets ? ' bullets' : ''}
                      </p>
                      {isBullets ? (
                        oldBullets(step).length ? (
                          <ol className="space-y-2">
                            {oldBullets(step).map((b, k) => (
                              <li key={k} className="flex items-start gap-2 text-xs text-ivory/55 leading-relaxed">
                                <span className="text-gold/70 font-mono flex-shrink-0">{k + 1}.</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ol>
                        ) : (
                          <p className="text-xs text-ivory-dim italic">No bullets yet</p>
                        )
                      ) : (
                        <p className="text-xs text-ivory/55 leading-relaxed whitespace-pre-wrap">
                          {step.kind === 'summary'
                            ? (data.personal.summary || <span className="italic text-ivory-dim">empty</span>)
                            : ''}
                        </p>
                      )}
                    </div>

                    <div className="rounded-2xl border border-gold/25 bg-gold/[0.04] p-5">
                      <p className="text-[10px] uppercase tracking-wider text-gold/70 mb-3 flex items-center gap-1.5 font-semibold">
                        <Sparkles size={11} /> Tailored — edit freely
                      </p>
                      {isBullets ? (
                        <div className="space-y-2">
                          <ReorderableBullets
                            bullets={draft.bullets ?? []}
                            onChange={setBullets}
                            className="space-y-2"
                            renderBullet={({ value, setValue, remove, canRemove, dragHandle }) => (
                              <div className="flex items-start gap-2">
                                {dragHandle}
                                <textarea
                                  value={value}
                                  onChange={(e) => setValue(e.target.value)}
                                  rows={3}
                                  className="input-base flex-1 !text-xs !leading-relaxed resize-y min-h-[64px] !py-2 !px-2.5"
                                />
                                {canRemove && (
                                  <button
                                    onClick={remove}
                                    className="mt-1.5 text-ivory-dim hover:text-crimson transition-colors flex-shrink-0 cursor-pointer"
                                    title="Remove bullet"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                )}
                              </div>
                            )}
                          />
                          <button
                            onClick={addBullet}
                            className="flex items-center gap-1 text-[11px] text-gold hover:text-gold-light transition-colors cursor-pointer"
                          >
                            <Plus size={12} /> Add bullet
                          </button>
                        </div>
                      ) : (
                        <>
                          <textarea
                            value={draft.text ?? ''}
                            onChange={(e) => setDraftText(e.target.value)}
                            rows={7}
                            className="input-base w-full !text-xs !leading-relaxed resize-y min-h-[140px]"
                          />
                          {step.kind === 'summary' && (
                            <p className={`text-[10px] font-mono mt-1.5 text-right ${
                              (draft.text ?? '').length > RESUME_RULES.SUMMARY_MAX_CHARS
                                ? 'text-gold' : 'text-ink-500'
                            }`}>
                              {(draft.text ?? '').length} / {RESUME_RULES.SUMMARY_MAX_CHARS} chars
                              · max {RESUME_RULES.SUMMARY_MAX_LINES} rendered lines
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    {proposal.rationale && (
                      <p className="text-xs text-ivory/55 leading-relaxed max-w-3xl">
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

                    {proposal.warnings.length > 0 && (
                      <ul className="space-y-1.5">
                        {proposal.warnings.map((w, k) => (
                          <li key={k} className="flex items-start gap-2 text-[11px] text-ivory/45 leading-relaxed">
                            <ShieldCheck size={12} className="text-jade/60 flex-shrink-0 mt-0.5" /><span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}

                {/* Refine (both kinds) */}
                {hasProposal && !showSpinner && (
                  <div className="border-t border-ink-700/50 pt-4">
                    <label className="text-[10px] uppercase tracking-wide text-ink-500 mb-1.5 block">
                      Want changes? Tell the AI
                    </label>
                    <div className="flex items-start gap-2 max-w-2xl">
                      <textarea
                        value={instruction[i] ?? ''}
                        onChange={(e) => setInstruction((s) => ({ ...s, [i]: e.target.value }))}
                        onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && !showSpinner) regenerate(); }}
                        rows={2}
                        placeholder={isSkills
                          ? 'e.g. don’t touch Languages · also ask me about Airflow'
                          : 'e.g. shorten bullet 2 · keep 1 & 3, rewrite the rest · emphasize leadership'}
                        className="input-base flex-1 !text-xs !leading-relaxed resize-y min-h-[48px]"
                      />
                      <button
                        onClick={regenerate}
                        disabled={showSpinner}
                        title="Regenerate with your comment"
                        className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs rounded-lg border border-gold/40 text-gold hover:bg-gold/10 transition-colors cursor-pointer disabled:opacity-50 flex-shrink-0"
                      >
                        <RefreshCw size={12} /> Regenerate
                      </button>
                    </div>
                    <p className="text-[10px] text-ivory/35 mt-1.5 leading-relaxed">
                      {isSkills
                        ? 'Your note steers the next curation pass — facts still come only from you.'
                        : 'Only what you ask changes — reference bullets by number. Facts and numbers are never invented.'}
                      {' '}(⌘/Ctrl+Enter)
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* ── Done ── */}
            {phase === 'done' && (
              <div className="max-w-2xl mx-auto py-10 space-y-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-jade/10 border border-jade/25 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={26} className="text-jade" />
                  </div>
                  <h2 className="font-display font-semibold text-ivory text-2xl">
                    {!committable
                      ? 'Nothing to tailor'
                      : `${acceptedCount} section${acceptedCount === 1 ? '' : 's'} polished${unselectedIds.size ? ` · ${unselectedIds.size} trimmed` : ''}`}
                  </h2>
                  <p className="text-ivory/50 text-sm mt-1.5">
                    {!committable
                      ? 'Add some content in the builder first, then tailor it to a job.'
                      : 'Apply to this résumé, or save it as a new branch — your master keeps everything.'}
                  </p>
                </div>

                {/* Page budget — the compiled count is the judge */}
                <div className={`rounded-2xl border p-5 ${
                  pagesOver ? 'border-gold/30 bg-gold/[0.05]' : 'border-ink-700/60 bg-ink-900/50'
                }`}>
                  <div className="flex items-center justify-between gap-3 flex-wrap mb-1">
                    <p className="text-[10px] uppercase tracking-wide text-ink-500 font-semibold">Page budget · max {RESUME_RULES.MAX_PAGES}</p>
                    <button
                      onClick={runRealCheck}
                      disabled={checkingPages}
                      className="text-[11px] font-mono text-gold hover:text-gold-light transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {checkingPages ? 'compiling…' : '↻ re-check'}
                    </button>
                  </div>

                  <p className="text-lg font-display font-semibold text-ivory">
                    {measured ? (
                      <>
                        <span className={pagesOver ? 'text-gold' : 'text-jade'}>
                          {realPages} page{(realPages as number) === 1 ? '' : 's'}
                        </span>
                        <span className="text-sm text-ivory/40 font-normal"> compiled</span>
                      </>
                    ) : measurePending ? (
                      <span className="inline-flex items-center gap-2 text-base text-ivory-muted">
                        <Spinner size={14} /> measuring with a real compile…
                      </span>
                    ) : (
                      <>
                        ≈ {estPages} page{estPages === 1 ? '' : 's'}
                        <span className="text-sm text-ivory/40 font-normal"> (estimate — compile check unavailable)</span>
                      </>
                    )}
                  </p>

                  {pagesError && <p className="text-[11px] text-crimson mt-1">{pagesError}</p>}

                  {pagesOver ? (
                    <>
                      <p className="text-xs text-gold/85 mt-2 leading-relaxed">
                        Over the ceiling. Trim the least relevant single items below — each removes
                        exactly one entry (never a whole section) and re-measures automatically:
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {trimCandidates.map((s) => (
                          <button
                            key={s.entry_id}
                            onClick={() => trim(s.entry_id)}
                            title={`Remove this one ${TRIM_LABEL[s.kind] ?? s.kind} from the tailored copy`}
                            className="px-2.5 py-1 rounded-lg text-[11px] bg-crimson/[0.07] border border-crimson/30 text-crimson hover:bg-crimson/[0.12] transition-colors cursor-pointer"
                          >
                            − {TRIM_LABEL[s.kind] ?? s.kind}: {truncate(s.label, 30)}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : measured ? (
                    <p className="text-[11px] text-jade/80 mt-2 leading-relaxed">
                      ✓ Within budget. One page is ideal for freshers/MNC applications — fewer strong items beat padding.
                    </p>
                  ) : !measurePending && (
                    <p className="text-[11px] text-ivory/40 mt-2 leading-relaxed">
                      Estimate looks fine — run the compile check above for the exact number.
                    </p>
                  )}
                </div>

                {planMissing.length > 0 && (
                  <div className="rounded-2xl border border-ink-700/60 bg-ink-900/50 p-5">
                    <p className="text-[10px] uppercase tracking-wide text-ink-500 mb-2 font-semibold">Honest gaps — required by the JD, not shown on your résumé</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {planMissing.map((k) => (
                        <span key={k} className="px-2 py-0.5 rounded-md text-[11px] bg-gold/10 text-gold border border-gold/25">{k}</span>
                      ))}
                    </div>
                    <p className="text-[11px] text-ivory/40 leading-relaxed">
                      We did <span className="text-ivory-muted font-medium">not</span> add these — inventing skills you don’t have is exactly what this tool refuses to do.
                    </p>
                  </div>
                )}

                <p className="flex items-start gap-2 text-xs text-ivory/45 leading-relaxed border-t border-ink-700/50 pt-4">
                  <ShieldCheck size={13} className="text-jade/70 flex-shrink-0 mt-0.5" />
                  <span>
                    Every number was checked against your résumé (and any notes you pasted); invented
                    numbers were stripped, additions required your explicit Yes, and you approved each change.
                  </span>
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── Footers per stage ── */}
      {phase === 'sections' && (
        <StageFooter
          left={<p className="text-[11px] text-ivory-dim">
            {Object.entries(keepSections).filter(([, v]) => v === false).length > 0
              ? `${Object.values(keepSections).filter((v) => v === false).length} section(s) will be dropped`
              : 'All sections kept'}
          </p>}
          right={
            <button
              onClick={() => (anySelectable ? setPhase('content') : enterStepping())}
              className="flex items-center gap-1.5 px-4 py-2 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer shadow-sm shadow-gold/25"
            >
              Continue <ArrowRight size={13} />
            </button>
          }
        />
      )}

      {phase === 'content' && (
        <StageFooter
          left={
            <button
              onClick={() => setPhase('sections')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory transition-colors cursor-pointer"
            >
              <ArrowLeft size={13} /> Back
            </button>
          }
          middle={
            <p className="text-[11px] text-ivory-dim">
              {selProj.length}/{projSteps.length} projects · {selCert.length}/{certSteps.length} certs · {selExtra.length}/{extraSteps.length} activities · {selAch.length}/{achSteps.length} achievements
            </p>
          }
          right={
            <div className="flex items-center gap-3">
              {!contentOk && (
                <p className="text-[11px] text-gold">
                  {selProj.length < projectFloor
                    ? `Keep at least ${projectFloor} project${projectFloor === 1 ? '' : 's'}`
                    : selProj.length > RESUME_RULES.PROJECTS_MAX
                      ? `Max ${RESUME_RULES.PROJECTS_MAX} projects`
                      : selCert.length > RESUME_RULES.CERTS_MAX
                        ? `Max ${RESUME_RULES.CERTS_MAX} certifications`
                        : selExtra.length > RESUME_RULES.EXTRA_MAX
                          ? `Max ${RESUME_RULES.EXTRA_MAX} activities`
                          : `Max ${RESUME_RULES.ACHIEVEMENTS_MAX} achievements`}
                </p>
              )}
              <button
                onClick={enterStepping}
                disabled={!contentOk}
                className="flex items-center gap-1.5 px-4 py-2 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer shadow-sm shadow-gold/25 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue to polish <ArrowRight size={13} />
              </button>
            </div>
          }
        />
      )}

      {phase === 'stepping' && (
        <StageFooter
          left={
            <button
              onClick={() => setI(Math.max(0, i - 1))}
              disabled={i === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ArrowLeft size={13} /> Back
            </button>
          }
          right={
            <div className="flex items-center gap-2">
              <button
                onClick={skip}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory transition-colors cursor-pointer"
              >
                <SkipForward size={12} /> Keep original
              </button>
              <button
                onClick={accept}
                disabled={!hasProposal || showSpinner}
                className="flex items-center gap-1.5 px-4 py-2 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer shadow-sm shadow-gold/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check size={13} /> {isSkills ? 'Apply' : i < queue.length - 1 ? 'Accept & next' : 'Accept & finish'}
                <ArrowRight size={12} />
              </button>
            </div>
          }
        />
      )}

      {phase === 'done' && (
        <footer className="border-t border-ink-800/80 bg-ink-900/70 backdrop-blur-md flex-shrink-0">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 py-3.5">
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
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer disabled:opacity-50"
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
                  onClick={onExit}
                  className="px-3.5 py-2 text-xs rounded-lg text-ivory-dim hover:text-ivory transition-colors cursor-pointer"
                >
                  Discard
                </button>
                {committable && (
                  <>
                    <button
                      onClick={() => { onApply(finalData, tailoredConfig); }}
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory hover:bg-ink-800/50 transition-colors cursor-pointer"
                    >
                      <PencilLine size={13} /> Apply to résumé (unsaved)
                      <ChevronRight size={11} className="opacity-50" />
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
        </footer>
      )}
    </div>
  );

  // ── Local helpers used only in the JSX above ────────────────────────────────

  function sortForDisplay(list: TransformStep[]): TransformStep[] {
    return list.slice().sort((a, b) => Number(isSelected(b)) - Number(isSelected(a)) || (a.rank ?? 10_000) - (b.rank ?? 10_000));
  }

  function toggleEntry(s: TransformStep) {
    setKeepEntries((m) => ({ ...m, [s.entry_id]: !isSelected(s) }));
  }
}

// ── Small presentational helpers ──────────────────────────────────────────────

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

function StageFooter({ left, middle, right }: {
  left?: React.ReactNode; middle?: React.ReactNode; right?: React.ReactNode;
}) {
  return (
    <footer className="flex items-center justify-between gap-3 px-6 lg:px-10 py-3.5 border-t border-ink-800/80 bg-ink-900/70 backdrop-blur-md flex-shrink-0">
      <div className="flex items-center gap-3 min-w-0">{left}</div>
      <div className="flex items-center gap-4 min-w-0">{middle}</div>
      <div className="flex items-center gap-2 flex-shrink-0">{right}</div>
    </footer>
  );
}

function Group({ title, counter, hint, warn, children }: {
  title: string; counter: string; hint?: string; warn?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 flex-wrap mb-2">
        <h3 className="font-display font-semibold text-ivory text-base">{title}</h3>
        <p className={`text-[11px] font-mono ${warn ? 'text-gold' : 'text-ivory-dim'}`}>
          {counter}{hint && <span className="text-ink-500 font-sans"> · {hint}</span>}
        </p>
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

/** One pick/drop row in the content stage (checkbox + label + AI reason). */
function PickRow({ step, checked, onToggle, compact }: {
  step: TransformStep; checked: boolean; onToggle: () => void; compact?: boolean;
}) {
  return (
    <label
      className={`flex items-start gap-3 rounded-xl border px-3.5 py-2.5 cursor-pointer transition-colors ${
        checked ? 'border-ink-700/60 bg-ink-900/40 hover:border-ink-600' : 'border-crimson/25 bg-crimson/[0.04]'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="accent-gold mt-0.5 w-4 h-4 flex-shrink-0"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`text-xs font-medium ${compact ? 'truncate' : ''} ${checked ? 'text-ivory' : 'text-ivory-muted line-through'}`}>
            {step.label}
          </p>
          {SELECTION_ONLY_KINDS.has(step.kind) && (
            <span className="text-[8px] font-mono px-1 py-px rounded bg-ink-700 text-ink-500 border border-ink-600">verbatim</span>
          )}
          {!checked && !step.recommend_drop && (
            <span className="text-[8px] font-mono px-1 py-px rounded bg-gold/10 text-gold border border-gold/25">your choice</span>
          )}
        </div>
        {!compact && step.reason && (
          <p className={`text-[11px] mt-0.5 leading-relaxed ${step.recommend_drop ? 'text-gold/75' : 'text-ivory/40'}`}>
            {step.recommend_drop ? 'AI suggests dropping — ' : ''}{step.reason}
          </p>
        )}
        {!compact && !step.recommend_drop && !step.reason && step.asks_readme && (
          <p className="text-[10px] text-ink-500 mt-0.5">README-grounded rewrite available in polish</p>
        )}
      </div>
    </label>
  );
}

function InfoCard({ icon, title, children }: {
  icon: React.ReactNode; title: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-ink-700/60 bg-ink-900/40 px-3.5 py-3">
      <p className="flex items-center gap-1.5 text-xs font-semibold text-ivory mb-1">{icon}{title}</p>
      <p className="text-[11px] text-ivory/40 leading-relaxed">{children}</p>
    </div>
  );
}

function GroundingBox({ askLabel, value, onChange }: {
  askLabel: string; value: string; onChange: (v: string) => void;
}) {
  const isReadme = askLabel === 'README';
  return (
    <div className="rounded-2xl border border-ink-700/60 bg-ink-900/50 p-4">
      <label className="text-[10px] uppercase tracking-wide text-ink-500 mb-1.5 block">
        {isReadme ? 'Project README' : 'Related work for this role'}{' '}
        <span className="normal-case tracking-normal text-ivory-dim">(optional)</span>
      </label>
      <p className="text-[11px] text-ivory/40 mb-2.5 leading-relaxed">
        {isReadme
          ? 'Paste your project’s README or notes — its facts and numbers become usable in the rewrite. Nothing else is invented.'
          : 'Did anything you did here match this JD? Add notes — their facts and numbers become usable in the rewrite.'}
      </p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder={isReadme ? 'Paste README / project notes…' : 'e.g. Built the REST API and cut p95 latency 30%…'}
        className="input-base w-full !text-xs !leading-relaxed resize-y min-h-[88px]"
      />
      {!!value.length && (
        <p className="text-right text-[10px] font-mono text-ink-500 mt-1">{value.length.toLocaleString()} chars</p>
      )}
    </div>
  );
}
