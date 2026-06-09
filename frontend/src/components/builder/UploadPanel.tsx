// src/components/builder/UploadPanel.tsx
'use client';

import { useCallback, useRef, useState, type DragEvent } from 'react';
import { motion } from 'framer-motion';
import {
  UploadCloud, FileText, CheckCircle2, Loader2, AlertTriangle,
  Sparkles, RefreshCw, X, Wand2,
} from 'lucide-react';
import { ResumeData } from '@/lib/types';
import { ApiError } from '@/lib/api';
import { extractText, parseResume, verifyResume, normalizeResume } from '@/lib/resumeImport';

interface UploadPanelProps {
  onImport: (data: ResumeData) => void;
}

type Stage = 'idle' | 'extracting' | 'parsing' | 'verifying' | 'review' | 'error';

const MAX_MB = 5;
const STEP_ORDER: Stage[] = ['extracting', 'parsing', 'verifying'];
const STEPS: { key: Stage; label: string; hint: string }[] = [
  { key: 'extracting', label: 'Extract text',    hint: 'Reading your document' },
  { key: 'parsing',    label: 'Parse fields',    hint: 'Mapping to resume sections' },
  { key: 'verifying',  label: 'Verify & refine', hint: 'Double-checking the result' },
];

const SECTION_LABELS: Record<string, string> = {
  personal: 'Personal', education: 'Education', skills: 'Skills',
  projects: 'Projects', experience: 'Experience', extracurricular: 'Extracurricular',
  achievements: 'Achievements', certifications: 'Certifications', publications: 'Publications',
};

function validate(f: File): string | null {
  const name = f.name.toLowerCase();
  if (!(name.endsWith('.pdf') || name.endsWith('.docx') || name.endsWith('.txt'))) {
    return 'Unsupported file type. Please upload a PDF, DOCX, or TXT file.';
  }
  if (f.size > MAX_MB * 1024 * 1024) return `File too large (max ${MAX_MB} MB).`;
  return null;
}

interface ReviewData {
  data: ResumeData;
  warnings: string[];
  sectionsFound: string[];
  missing: string[];
}

export default function UploadPanel({ onImport }: UploadPanelProps) {
  const [stage, setStage]       = useState<Stage>('idle');
  const [file, setFile]         = useState<File | null>(null);
  const [error, setError]       = useState('');
  const [failedAt, setFailedAt] = useState<Stage | null>(null);
  const [result, setResult]     = useState<ReviewData | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = useCallback(async (f: File) => {
    setError(''); setResult(null); setFailedAt(null);
    let failed: Stage = 'extracting';
    try {
      setStage('extracting'); failed = 'extracting';
      const text = await extractText(f);
      setStage('parsing'); failed = 'parsing';
      const parsed = await parseResume(text);
      setStage('verifying'); failed = 'verifying';
      const verified = await verifyResume(text, parsed);
      const data = normalizeResume(verified.data);
      setResult({
        data,
        warnings: verified.warnings ?? [],
        sectionsFound: verified.summary?.sections_found ?? [],
        missing: verified.summary?.missing ?? [],
      });
      setStage('review');
    } catch (err) {
      setFailedAt(failed);
      console.error('Resume import failed:', err);
      const friendly =
        failed === 'extracting' ? "We couldn't read that file. Try a different PDF, DOCX, or TXT."
        : failed === 'parsing'  ? "The AI couldn't read this resume right now. Please try again, or fill it in Manual mode."
        : "We couldn't finish checking the imported data. Please try again.";
      // Surface clear, actionable client errors (bad file / too large / no text / AI not configured);
      // hide raw server/LLM internals behind the friendly message.
      const showRaw = err instanceof ApiError && [400, 413, 422, 503].includes(err.status);
      setError(showRaw ? err.message : friendly);
      setStage('error');
    }
  }, []);

  const accept = useCallback((f: File | undefined | null) => {
    if (!f) return;
    setFile(f);
    const problem = validate(f);
    if (problem) { setError(problem); setFailedAt('extracting'); setStage('error'); return; }
    run(f);
  }, [run]);

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setDragging(false);
    accept(e.dataTransfer.files?.[0]);
  };

  const reset = () => {
    setStage('idle'); setFile(null); setError(''); setResult(null); setFailedAt(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const busy = stage === 'extracting' || stage === 'parsing' || stage === 'verifying';
  const currentIndex = STEP_ORDER.indexOf(stage);
  const canRetry = !!file && !validate(file);

  const stepStatus = (key: Stage): 'pending' | 'active' | 'done' | 'error' => {
    if (stage === 'error') {
      if (key === failedAt) return 'error';
      return STEP_ORDER.indexOf(key) < STEP_ORDER.indexOf(failedAt ?? 'extracting') ? 'done' : 'pending';
    }
    if (stage === 'review') return 'done';
    if (currentIndex === -1) return 'pending';
    const i = STEP_ORDER.indexOf(key);
    if (i < currentIndex) return 'done';
    if (i === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="p-4 space-y-4">
      {/* Heading */}
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-lg border border-gold/30 bg-gold/[0.08] flex items-center justify-center flex-shrink-0">
          <Sparkles size={15} className="text-gold" />
        </div>
        <div>
          <h2 className="font-display font-bold text-ivory text-sm">Import from a file</h2>
          <p className="text-ivory/50 text-xs mt-0.5 leading-relaxed">
            Upload an existing resume and AI fills the fields for you. You review before it replaces your current content.
          </p>
        </div>
      </div>

      {/* Dropzone (idle only) */}
      {stage === 'idle' && (
        <Dropzone
          dragging={dragging}
          setDragging={setDragging}
          onDrop={onDrop}
          onPick={() => inputRef.current?.click()}
        />
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        className="hidden"
        onChange={(e) => accept(e.target.files?.[0])}
      />

      {/* File chip */}
      {file && stage !== 'idle' && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-ink-800/50 border border-ink-700/60">
          <FileText size={14} className="text-gold flex-shrink-0" />
          <span className="text-ivory-muted text-xs truncate flex-1">{file.name}</span>
          {!busy && (
            <button
              onClick={reset}
              title="Choose another file"
              className="text-ink-500 hover:text-ivory transition-colors cursor-pointer"
            >
              <X size={13} />
            </button>
          )}
        </div>
      )}

      {/* Stepper */}
      {(busy || stage === 'review' || stage === 'error') && (
        <div className="space-y-1.5">
          {STEPS.map((s) => {
            const st = stepStatus(s.key);
            return (
              <div
                key={s.key}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-ink-800/60 bg-ink-900/40"
              >
                <span className="flex-shrink-0">
                  {st === 'done'    && <CheckCircle2 size={15} className="text-jade" />}
                  {st === 'active'  && <Loader2 size={15} className="text-gold animate-spin" />}
                  {st === 'error'   && <AlertTriangle size={15} className="text-crimson" />}
                  {st === 'pending' && <span className="block w-[15px] h-[15px] rounded-full border border-ink-600" />}
                </span>
                <div className="min-w-0">
                  <p className={`text-xs font-medium ${
                    st === 'done'   ? 'text-ivory-muted' :
                    st === 'active' ? 'text-ivory' :
                    st === 'error'  ? 'text-crimson' :
                    'text-ink-500'
                  }`}>{s.label}</p>
                  {st === 'active' && <p className="text-[10px] text-ivory/40">{s.hint}</p>}
                </div>
              </div>
            );
          })}
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
              onClick={() => (canRetry && file ? run(file) : reset())}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer"
            >
              <RefreshCw size={12} /> {canRetry ? 'Retry' : 'Choose file'}
            </button>
            {file && (
              <button
                onClick={reset}
                className="px-3 py-1.5 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory transition-colors cursor-pointer"
              >
                Start over
              </button>
            )}
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
            <h3 className="font-display font-semibold text-ivory text-sm">Ready to import</h3>
          </div>

          {/* Sections found */}
          <div>
            <p className="text-[10px] uppercase tracking-wide text-ink-500 mb-1.5">Sections detected</p>
            {result.sectionsFound.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {result.sectionsFound.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-md text-[11px] bg-jade/10 text-jade border border-jade/20">
                    {SECTION_LABELS[s] ?? s}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-ivory/40 text-xs">No sections detected — the file may not be a resume.</p>
            )}
          </div>

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

          <p className="text-[11px] text-ivory/40 leading-relaxed border-t border-ink-700/50 pt-2.5">
            This replaces the current resume&apos;s content. Nothing is saved until you click{' '}
            <span className="text-ivory-muted font-medium">Save</span>, and you can{' '}
            <span className="text-ivory-muted font-medium">Undo</span> /{' '}
            <span className="text-ivory-muted font-medium">Revert</span>.
          </p>

          <div className="flex items-center gap-2 pt-0.5">
            <button
              onClick={() => onImport(result.data)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer shadow-sm shadow-gold/25"
            >
              <Wand2 size={13} /> Fill &amp; compile
            </button>
            <button
              onClick={reset}
              className="px-3 py-2 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory hover:bg-ink-800/50 transition-colors cursor-pointer"
            >
              Discard
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ── Dropzone ─────────────────────────────────────────────────────────────────
function Dropzone({ dragging, setDragging, onDrop, onPick }: {
  dragging: boolean;
  setDragging: (v: boolean) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onPick: () => void;
}) {
  return (
    <div
      onClick={onPick}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
      onDrop={onDrop}
      className={`group cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 px-5 py-10 text-center ${
        dragging ? 'border-gold/60 bg-gold/[0.06]' : 'border-ink-700 hover:border-gold/40 hover:bg-ink-800/30'
      }`}
    >
      <div className={`w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center border transition-colors ${
        dragging ? 'border-gold/40 bg-gold/10' : 'border-ink-700 bg-ink-800/60 group-hover:border-gold/30'
      }`}>
        <UploadCloud size={22} className={dragging ? 'text-gold' : 'text-ivory-dim group-hover:text-gold'} />
      </div>
      <p className="text-ivory text-sm font-medium">{dragging ? 'Drop to upload' : 'Drop your resume here'}</p>
      <p className="text-ivory/40 text-xs mt-1">or <span className="text-gold">browse files</span></p>
      <p className="text-ink-500 text-[10px] mt-3 font-mono">PDF · DOCX · TXT — up to {MAX_MB} MB</p>
    </div>
  );
}
