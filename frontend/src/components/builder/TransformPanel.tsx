// src/components/builder/TransformPanel.tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target, CheckCircle2, AlertTriangle, RefreshCw, Wand2,
  GitFork, PencilLine, ShieldCheck, X, Check,
} from 'lucide-react';
import { ResumeData } from '@/lib/types';
import { ApiError } from '@/lib/api';
import { clearGateToken, gateCheckUnlocked } from '@/lib/gate';
import { transformResume, JD_MAX_CHARS } from '@/lib/resumeTransform';
import { normalizeResume } from '@/lib/resumeImport';
import GateUnlock from '@/components/builder/GateUnlock';
import { Spinner } from '@/components/ui/Spinner';

interface TransformPanelProps {
  data: ResumeData | null;
  /** Whether the current resume has tailorable content (computed by the page). */
  hasContent: boolean;
  /** Apply the tailored data to the current resume (unsaved + undoable). */
  onApply: (data: ResumeData) => void;
  /** Save the tailored data as a new resume branch; resolves false on failure. */
  onSaveBranch: (name: string, data: ResumeData) => Promise<boolean>;
}

type Stage = 'idle' | 'working' | 'review' | 'error';

interface ReviewData {
  data: ResumeData;
  changes: string[];
  covered: string[];
  missing: string[];
  warnings: string[];
}

// Reassurance lines rotated while the (slow, reasoning) model works.
const WORKING_HINTS = [
  'Reading the job description…',
  'Matching it against your experience…',
  'Rewording bullets — nothing new is invented…',
  'Reordering sections for this role…',
  'Reasoning models take a moment — usually 10–30 seconds…',
];

export default function TransformPanel({ data, hasContent, onApply, onSaveBranch }: TransformPanelProps) {
  const [stage, setStage]         = useState<Stage>('idle');
  const [jd, setJd]               = useState('');
  const [jobTitle, setJobTitle]   = useState('');
  const [company, setCompany]     = useState('');
  const [error, setError]         = useState('');
  const [result, setResult]       = useState<ReviewData | null>(null);
  const [hintIndex, setHintIndex] = useState(0);

  // Gated Access: tailoring is locked until the user holds a gate token that
  // the SERVER accepts (a stored token can outlive a secret rotation).
  // null = check in flight (avoids flashing the wrong state).
  const [unlocked, setUnlocked]       = useState<boolean | null>(null);
  const [gateExpired, setGateExpired] = useState(false);

  useEffect(() => {
    let active = true;
    gateCheckUnlocked().then(ok => { if (active) setUnlocked(ok); });
    return () => { active = false; };
  }, []);

  // Branch-save sub-state (inside review).
  const [naming, setNaming]             = useState(false);
  const [branchName, setBranchName]     = useState('');
  const [savingBranch, setSavingBranch] = useState(false);
  const [branchError, setBranchError]   = useState('');

  useEffect(() => {
    if (stage !== 'working') return;
    setHintIndex(0);
    const t = setInterval(() => setHintIndex(i => (i + 1) % WORKING_HINTS.length), 4000);
    return () => clearInterval(t);
  }, [stage]);

  const run = useCallback(async () => {
    if (!data || !jd.trim()) return;
    setStage('working'); setError(''); setResult(null);
    try {
      const res = await transformResume(jd.trim(), jobTitle.trim(), company.trim(), data);
      setResult({
        data: normalizeResume(res.data),
        changes: res.changes ?? [],
        covered: res.match?.covered_keywords ?? [],
        missing: res.match?.missing_keywords ?? [],
        warnings: res.warnings ?? [],
      });
      setNaming(false);
      setBranchError('');
      setStage('review');
    } catch (err) {
      console.error('Resume transform failed:', err);
      // Gate token missing/expired server-side — re-lock and show the unlock flow.
      if (err instanceof ApiError && err.status === 403 && err.message.includes('GATE_LOCKED')) {
        clearGateToken();
        setGateExpired(true);
        setUnlocked(false);
        setStage('idle');
        return;
      }
      // Clear, actionable statuses (empty resume / AI not configured) show as-is;
      // raw server/LLM internals hide behind the friendly message.
      const showRaw = err instanceof ApiError && [400, 503].includes(err.status);
      setError(
        showRaw && err instanceof ApiError
          ? err.message
          : "The AI couldn't tailor your resume right now. Please try again.",
      );
      setStage('error');
    }
  }, [data, jd, jobTitle, company]);

  const suggestedName = `${jobTitle.trim() || 'Tailored'}${company.trim() ? ` — ${company.trim()}` : ''}`;

  const startNaming = () => {
    setBranchName(suggestedName);
    setBranchError('');
    setNaming(true);
  };

  const confirmBranch = async () => {
    if (!result || !branchName.trim() || savingBranch) return;
    setSavingBranch(true);
    setBranchError('');
    const ok = await onSaveBranch(branchName.trim(), result.data);
    setSavingBranch(false);
    if (!ok) setBranchError("Couldn't create the branch — please try again.");
  };

  const discard = () => {
    setStage('idle'); setResult(null); setError(''); setNaming(false);
  };

  const working = stage === 'working';

  return (
    <div className="p-4 space-y-4">
      {/* Heading */}
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-lg border border-gold/30 bg-gold/[0.08] flex items-center justify-center flex-shrink-0">
          <Target size={15} className="text-gold" />
        </div>
        <div>
          <h2 className="font-display font-bold text-ivory text-sm">Tailor for a job</h2>
          <p className="text-ivory/50 text-xs mt-0.5 leading-relaxed">
            Paste a job description and AI re-tunes this resume for it — rephrasing and
            reordering what&apos;s already there. It never invents skills or experience.
          </p>
        </div>
      </div>

      {/* Checking whether tailoring is already unlocked */}
      {unlocked === null && (
        <div className="py-6 text-center"><Spinner size={24} /></div>
      )}

      {/* Locked: walk the Gated Access unlock flow before showing the form */}
      {unlocked === false && (
        <GateUnlock
          expired={gateExpired}
          onUnlocked={() => { setUnlocked(true); setGateExpired(false); }}
        />
      )}

      {/* Form (idle / working — kept visible, disabled while working) */}
      {unlocked === true && (stage === 'idle' || working) && (
        <div className="space-y-3">
          {!hasContent && (
            <div className="flex items-start gap-2 rounded-lg border border-gold/25 bg-gold/[0.06] px-3 py-2.5">
              <AlertTriangle size={13} className="text-gold flex-shrink-0 mt-0.5" />
              <p className="text-ivory/60 text-xs leading-relaxed">
                Your resume is empty — add some content in Manual mode first, so there&apos;s
                something to tailor.
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="tf-title" className="text-[10px] text-ivory-dim uppercase tracking-widest mb-1 block font-semibold">
                Job title <span className="normal-case tracking-normal font-normal">(optional)</span>
              </label>
              <input
                id="tf-title"
                type="text"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                disabled={working}
                placeholder="e.g. Data Analyst"
                className="input-base !px-3 !py-2 !text-xs disabled:opacity-60"
              />
            </div>
            <div>
              <label htmlFor="tf-company" className="text-[10px] text-ivory-dim uppercase tracking-widest mb-1 block font-semibold">
                Company <span className="normal-case tracking-normal font-normal">(optional)</span>
              </label>
              <input
                id="tf-company"
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                disabled={working}
                placeholder="e.g. Google"
                className="input-base !px-3 !py-2 !text-xs disabled:opacity-60"
              />
            </div>
          </div>

          <div>
            <label htmlFor="tf-jd" className="text-[10px] text-ivory-dim uppercase tracking-widest mb-1 block font-semibold">
              Job description
            </label>
            <textarea
              id="tf-jd"
              value={jd}
              onChange={e => setJd(e.target.value)}
              disabled={working}
              maxLength={JD_MAX_CHARS}
              rows={9}
              placeholder="Paste the full job description here — responsibilities, requirements, skills…"
              className="input-base !text-xs !leading-relaxed resize-y min-h-[120px] disabled:opacity-60"
            />
            <p className="text-right text-[10px] text-ink-500 mt-1 font-mono">
              {jd.length.toLocaleString()} / {JD_MAX_CHARS.toLocaleString()}
            </p>
          </div>

          {working ? (
            <div className="rounded-xl border border-ink-700/60 bg-ink-800/40 px-4 py-6 text-center">
              <Spinner size={40} />
              <p className="text-ivory text-sm font-medium mt-3">Tailoring your resume…</p>
              <p className="text-ivory/40 text-xs mt-1 min-h-[16px]">{WORKING_HINTS[hintIndex]}</p>
            </div>
          ) : (
            <button
              onClick={run}
              disabled={!jd.trim() || !hasContent}
              className="w-full flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer shadow-sm shadow-gold/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wand2 size={13} /> Transform for this job
            </button>
          )}
        </div>
      )}

      {/* Error */}
      {stage === 'error' && (
        <div className="rounded-lg border border-crimson/30 bg-crimson/[0.07] p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle size={14} className="text-crimson flex-shrink-0 mt-0.5" />
            <p className="text-crimson/90 text-xs leading-relaxed flex-1">{error}</p>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={run}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer"
            >
              <RefreshCw size={12} /> Retry
            </button>
            <button
              onClick={() => setStage('idle')}
              className="px-3 py-1.5 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory transition-colors cursor-pointer"
            >
              Edit inputs
            </button>
          </div>
        </div>
      )}

      {/* Review */}
      {stage === 'review' && result && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-ink-700/60 bg-ink-800/40 p-4 space-y-3"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-jade" />
            <h3 className="font-display font-semibold text-ivory text-sm">
              Tailored{jobTitle.trim() ? ` for ${jobTitle.trim()}` : ''} — review before applying
            </h3>
          </div>

          {/* What changed */}
          {result.changes.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-wide text-ink-500 mb-1.5">What changed</p>
              <ul className="space-y-1">
                {result.changes.slice(0, 8).map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-ivory/60 leading-relaxed">
                    <span className="text-gold mt-0.5">•</span><span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Matched keywords */}
          {result.covered.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-wide text-ink-500 mb-1.5">Matched from the JD</p>
              <div className="flex flex-wrap gap-1.5">
                {result.covered.map((k) => (
                  <span key={k} className="px-2 py-0.5 rounded-md text-[11px] bg-jade/10 text-jade border border-jade/20">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Honest gaps */}
          {result.missing.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-wide text-ink-500 mb-1.5">Honest gaps</p>
              <div className="flex flex-wrap gap-1.5">
                {result.missing.map((k) => (
                  <span key={k} className="px-2 py-0.5 rounded-md text-[11px] bg-gold/10 text-gold border border-gold/25">
                    {k}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-ivory/40 mt-1.5 leading-relaxed">
                Required by the JD but not in your resume — we did <span className="text-ivory-muted font-medium">not</span> add these.
              </p>
            </div>
          )}

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-wide text-ink-500 mb-1.5">Heads up</p>
              <ul className="space-y-1">
                {result.warnings.slice(0, 6).map((w, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-ivory/60 leading-relaxed">
                    <span className="text-gold mt-0.5">•</span><span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="flex items-start gap-1.5 text-[11px] text-ivory/40 leading-relaxed border-t border-ink-700/50 pt-2.5">
            <ShieldCheck size={12} className="text-jade/70 flex-shrink-0 mt-0.5" />
            <span>
              Facts are protected: names, dates, employers, numbers, and links were restored
              from your original wherever the AI strayed.
            </span>
          </p>

          {/* Branch naming (revealed by "Save as new branch") */}
          {naming ? (
            <div className="space-y-2">
              <label htmlFor="tf-branch" className="text-[10px] text-ivory-dim uppercase tracking-widest block font-semibold">
                New branch name
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="tf-branch"
                  type="text"
                  value={branchName}
                  onChange={e => setBranchName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && confirmBranch()}
                  disabled={savingBranch}
                  maxLength={200}
                  autoFocus
                  className="input-base !px-3 !py-2 !text-xs flex-1 disabled:opacity-60"
                />
                <button
                  onClick={confirmBranch}
                  disabled={!branchName.trim() || savingBranch}
                  title="Create branch"
                  className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer disabled:opacity-50"
                >
                  {savingBranch ? <Spinner size={12} tone="current" /> : <Check size={13} />}
                  Create
                </button>
                <button
                  onClick={() => setNaming(false)}
                  disabled={savingBranch}
                  title="Cancel"
                  className="p-2 rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory transition-colors cursor-pointer disabled:opacity-50"
                >
                  <X size={13} />
                </button>
              </div>
              {branchError && <p className="text-[11px] text-crimson">{branchError}</p>}
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <button
                onClick={startNaming}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer shadow-sm shadow-gold/25"
              >
                <GitFork size={13} /> Save as new branch
              </button>
              <button
                onClick={() => onApply(result.data)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory hover:bg-ink-800/50 transition-colors cursor-pointer"
              >
                <PencilLine size={13} /> Apply here (unsaved)
              </button>
              <button
                onClick={discard}
                className="px-3 py-2 text-xs rounded-lg text-ivory-dim hover:text-ivory transition-colors cursor-pointer"
              >
                Discard
              </button>
            </div>
          )}

          {!naming && (
            <p className="text-[11px] text-ivory/40 leading-relaxed">
              <span className="text-ivory-muted font-medium">Save as new branch</span> keeps this
              resume untouched. <span className="text-ivory-muted font-medium">Apply here</span> fills
              the editor — nothing is saved until you click Save, and Undo / Revert work.
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
