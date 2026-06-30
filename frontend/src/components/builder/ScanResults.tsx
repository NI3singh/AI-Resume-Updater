'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScanLine, X, Check, RefreshCw, AlertTriangle, CheckCircle2, ShieldCheck, Wand2 } from 'lucide-react';
import { FieldFix, ProofCategory } from '@/lib/proofread';
import { Spinner } from '@/components/ui/Spinner';

// Dot colour per issue category.
const CAT_DOT: Record<ProofCategory, string> = {
  spelling: 'bg-gold',
  grammar: 'bg-gold',
  punctuation: 'bg-jade',
  symbol: 'bg-crimson',
  formatting: 'bg-jade',
};

interface Props {
  fixes: FieldFix[];
  scanning: boolean;
  aiOk: boolean;
  error: string;
  onApply: (fix: FieldFix) => void;
  onApplyAll: () => void;
  onRescan: () => void;
  onClose: () => void;
}

export default function ScanResults({ fixes, scanning, aiOk, error, onApply, onApplyAll, onRescan, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ x: 48, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 48, opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="fixed top-0 right-0 bottom-0 z-[260] w-full max-w-md flex flex-col bg-ink-900 border-l border-ink-700/70 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-ink-700/60 flex-shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)' }}
          >
            <ScanLine size={15} style={{ color: '#34d399' }} />
          </div>
          <div className="min-w-0">
            <h2 className="font-display font-bold text-ivory text-sm">Résumé scan</h2>
            <p className="text-ivory/45 text-[11px] truncate">
              {scanning ? 'Checking spelling, grammar & symbols…' : `${fixes.length} issue${fixes.length === 1 ? '' : 's'} found`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={onRescan}
            disabled={scanning}
            title="Re-scan"
            className="p-1.5 rounded-lg text-ivory-dim hover:text-ivory hover:bg-ink-800/60 transition-colors disabled:opacity-40 cursor-pointer"
          >
            <RefreshCw size={14} />
          </button>
          <button
            onClick={onClose}
            title="Close"
            className="p-1.5 rounded-lg text-ivory-dim hover:text-ivory hover:bg-ink-800/60 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {scanning ? (
          <div className="py-16 text-center">
            <Spinner size={32} />
            <p className="text-ivory/60 text-xs mt-3">Scanning your résumé…</p>
            <p className="text-ivory/35 text-[11px] mt-1">Reasoning models take ~10–30s</p>
          </div>
        ) : error ? (
          <div className="rounded-lg border border-crimson/30 bg-crimson/[0.07] p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle size={14} className="text-crimson mt-0.5 flex-shrink-0" />
              <p className="text-crimson/90 text-xs leading-relaxed flex-1">{error}</p>
            </div>
            <button
              onClick={onRescan}
              className="mt-2.5 px-3 py-1.5 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer"
            >
              Try again
            </button>
          </div>
        ) : fixes.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-jade/10 border border-jade/25 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 size={22} className="text-jade" />
            </div>
            <p className="text-ivory text-sm font-semibold">No issues found</p>
            <p className="text-ivory/45 text-xs mt-1">Your résumé looks clean — nice work.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {!aiOk && (
              <div className="flex items-start gap-2 rounded-lg border border-gold/25 bg-gold/[0.06] px-3 py-2">
                <AlertTriangle size={13} className="text-gold mt-0.5 flex-shrink-0" />
                <p className="text-ivory/60 text-[11px] leading-relaxed">
                  AI spell-check is unavailable right now — showing format &amp; symbol checks only.
                </p>
              </div>
            )}
            {fixes.map((f) => (
              <div key={f.locId} className="rounded-xl border border-ink-700/60 bg-ink-800/30 p-3">
                <p className="text-[10px] uppercase tracking-wide text-ink-500 mb-1.5">{f.label}</p>
                <ul className="space-y-1 mb-2">
                  {f.issues.map((it, k) => (
                    <li key={k} className="flex items-start gap-1.5 text-[11px] leading-relaxed">
                      <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${CAT_DOT[it.category] ?? 'bg-ink-500'}`} />
                      <span className="text-ivory/70">
                        <span className="text-ivory/40 capitalize">{it.category}: </span>
                        {it.message}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-jade/80 bg-ink-900/50 rounded-md px-2 py-1.5 leading-relaxed border border-ink-700/40 line-clamp-3">
                  {f.corrected}
                </p>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => onApply(f)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer"
                  >
                    <Check size={12} /> Apply fix
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {!scanning && !error && fixes.length > 0 && (
        <div className="flex items-center justify-between gap-2 px-4 py-3 border-t border-ink-700/60 flex-shrink-0">
          <p className="flex items-center gap-1.5 text-[10px] text-ivory/40">
            <ShieldCheck size={11} className="text-jade/60 flex-shrink-0" /> Numbers never change · undo with Ctrl+Z
          </p>
          <button
            onClick={onApplyAll}
            className="flex items-center gap-1.5 px-4 py-2 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer shadow-sm shadow-gold/25"
          >
            <Wand2 size={13} /> Apply all ({fixes.length})
          </button>
        </div>
      )}
    </motion.div>
  );
}
