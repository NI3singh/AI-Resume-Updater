'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScanLine, X, Check, RefreshCw, AlertTriangle, CheckCircle2, ShieldCheck, Wand2 } from 'lucide-react';
import { FieldFix, ProofCategory } from '@/lib/proofread';

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
  aiOk: boolean;
  error: string;
  onApply: (fix: FieldFix) => void;
  onApplyAll: () => void;
  onRescan: () => void;
  onClose: () => void;
}

// Shown as a centered POP-UP after the scan finishes (the green sweep + badge
// play over the PDF during the scan itself — see ScanOverlay).
export default function ScanResults({ fixes, aiOk, error, onApply, onApplyAll, onRescan, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[260] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.18 }}
        className="card-glass w-full max-w-lg max-h-[85vh] flex flex-col !p-0 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-ink-700/60 flex-shrink-0">
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
                {error
                  ? 'Scan ran into a problem'
                  : fixes.length
                    ? `${fixes.length} issue${fixes.length === 1 ? '' : 's'} found · review & apply`
                    : 'All clear'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={onRescan}
              title="Re-scan"
              className="p-1.5 rounded-lg text-ivory-dim hover:text-ivory hover:bg-ink-800/60 transition-colors cursor-pointer"
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
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {error ? (
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
            <div className="py-12 text-center">
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
        {!error && fixes.length > 0 && (
          <div className="flex items-center justify-between gap-2 px-5 py-3.5 border-t border-ink-700/60 flex-shrink-0">
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
    </motion.div>
  );
}
