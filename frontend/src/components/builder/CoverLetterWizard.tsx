// src/components/builder/CoverLetterWizard.tsx
'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  X, RefreshCw, Download, FileSignature, AlertTriangle, ShieldCheck, Plus, Trash2,
} from 'lucide-react';
import { ResumeData } from '@/lib/types';
import { ApiError } from '@/lib/api';
import { generateCoverLetter, renderCoverLetter, CoverLetterContent } from '@/lib/coverLetter';
import { downloadBlob, resumeFileBase } from '@/lib/pdfCompiler';
import { Spinner } from '@/components/ui/Spinner';
import ReorderableBullets from '@/components/builder/ReorderableBullets';

interface Props {
  data: ResumeData;
  jobDescription: string;
  company: string;
  jobTitle: string;
  onClose: () => void;
}

type Phase = 'generating' | 'review' | 'error';

// Render **bold** and __underline__ spans as JSX (mirrors the DOCX renderer).
function renderRich(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|__[^_]+__)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const s = m[0];
    if (s.startsWith('**')) out.push(<strong key={k++}>{s.slice(2, -2)}</strong>);
    else out.push(<u key={k++}>{s.slice(2, -2)}</u>);
    last = m.index + s.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** A paper-like preview that approximates the downloaded letter. */
function CoverLetterPreview({ content, name }: { content: CoverLetterContent; name: string }) {
  const bullets = content.bullets.filter((b) => b.trim());
  const closing = content.closing.filter((c) => c.trim());
  return (
    <div
      className="rounded-lg bg-white text-black px-7 py-6 shadow-inner"
      style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '12px', lineHeight: 1.55 }}
    >
      <div style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '0.01em' }}>{name || 'Your Name'}</div>
      {content.headerTitle.trim() && <div style={{ marginTop: '2px' }}>{content.headerTitle}</div>}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.25)', margin: '12px 0' }} />
      <p style={{ fontWeight: 700, marginBottom: '10px' }}>{renderRich(content.salutation)}</p>
      {content.opening.trim() && <p style={{ marginBottom: '10px' }}>{renderRich(content.opening)}</p>}
      {content.bridge.trim() && <p style={{ marginBottom: '6px' }}>{renderRich(content.bridge)}</p>}
      {bullets.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          {bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
              <span>-</span>
              <span>{renderRich(b)}</span>
            </div>
          ))}
        </div>
      )}
      {closing.map((c, i) => (
        <p key={i} style={{ marginBottom: '10px' }}>{renderRich(c)}</p>
      ))}
      <div style={{ textAlign: 'right', marginTop: '18px' }}>
        <div>{renderRich(content.signoff)}</div>
        {name && <div style={{ fontWeight: 700 }}>{name}</div>}
        <div style={{ fontFamily: "'Courgette', cursive", textDecoration: 'underline', fontSize: '17px', marginTop: '2px' }}>
          {content.signatureName.trim() || name}
        </div>
      </div>
    </div>
  );
}

export default function CoverLetterWizard({ data, jobDescription, company, jobTitle, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [phase, setPhase] = useState<Phase>('generating');
  const [errorMsg, setErrorMsg] = useState('');
  const [content, setContent] = useState<CoverLetterContent | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [missing, setMissing] = useState<string[]>([]);
  const [name, setName] = useState(data.personal.name.trim());
  const [instruction, setInstruction] = useState('');
  const [regenerating, setRegenerating] = useState(false);
  const [downloading, setDownloading] = useState<'' | 'docx' | 'pdf'>('');
  const [downloadError, setDownloadError] = useState('');
  const [view, setView] = useState<'edit' | 'preview'>('edit');

  // Load the Courgette signature font so the preview shows the cursive signature.
  useEffect(() => {
    const id = 'courgette-font';
    if (typeof document !== 'undefined' && !document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Courgette&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const run = useCallback(async (refine: string) => {
    const res = await generateCoverLetter({ jobDescription, company, jobTitle, resumeData: data, instruction: refine });
    setContent(res.content);
    setWarnings(res.warnings ?? []);
    setMissing(res.missing_keywords ?? []);
    setName((n) => n || res.content.signatureName || data.personal.name);
    setPhase('review');
  }, [jobDescription, company, jobTitle, data]);

  // Initial generation on mount.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await run('');
      } catch (err) {
        if (cancelled) return;
        setErrorMsg(err instanceof ApiError ? err.message : 'Could not generate the cover letter. Please try again.');
        setPhase('error');
      }
    })();
    return () => { cancelled = true; };
  }, [run]);

  // Esc to close.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const patch = (p: Partial<CoverLetterContent>) => setContent((c) => (c ? { ...c, ...p } : c));

  const regenerate = async () => {
    if (regenerating) return;
    setRegenerating(true); setDownloadError('');
    try {
      await run(instruction.trim());
    } catch (err) {
      setWarnings([err instanceof ApiError ? err.message : 'Could not regenerate. Please try again.']);
    } finally {
      setRegenerating(false);
    }
  };

  const download = async (fmt: 'docx' | 'pdf') => {
    if (!content || downloading) return;
    setDownloading(fmt); setDownloadError('');
    try {
      const finalName = name.trim() || data.personal.name.trim();
      const blob = await renderCoverLetter(
        { ...content, signatureName: content.signatureName.trim() || finalName },
        fmt, finalName,
      );
      const base = resumeFileBase(finalName, `Cover Letter ${company || jobTitle}`.trim());
      downloadBlob(blob, `${base}.${fmt}`);
    } catch (err) {
      setDownloadError(err instanceof ApiError ? err.message : 'Download failed. Please try again.');
    } finally {
      setDownloading('');
    }
  };

  if (!mounted) return null;

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
        className="card-glass w-full max-w-2xl max-h-[92vh] flex flex-col !p-0 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-ink-700/60 flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg border border-gold/30 bg-gold/[0.08] flex items-center justify-center flex-shrink-0">
              <FileSignature size={15} className="text-gold" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display font-bold text-ivory text-sm truncate">
                Cover letter{company ? ` — ${company}` : ''}
              </h2>
              <p className="text-ivory/45 text-[11px] truncate">
                Your template · tailored to the job · edit then download
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {phase === 'generating' && (
            <div className="py-16 text-center">
              <Spinner size={40} />
              <p className="text-ivory text-sm font-medium mt-3">Writing your cover letter…</p>
              <p className="text-ivory/40 text-xs mt-1">Reading the JD + your résumé — reasoning models take ~10–30s</p>
            </div>
          )}

          {phase === 'error' && (
            <div className="rounded-lg border border-crimson/30 bg-crimson/[0.07] p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle size={15} className="text-crimson flex-shrink-0 mt-0.5" />
                <p className="text-crimson/90 text-xs leading-relaxed flex-1">{errorMsg}</p>
              </div>
              <button
                onClick={() => { setPhase('generating'); run('').catch((err) => { setErrorMsg(err instanceof ApiError ? err.message : 'Could not generate. Please try again.'); setPhase('error'); }); }}
                className="mt-3 px-3 py-1.5 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer"
              >
                Try again
              </button>
            </div>
          )}

          {phase === 'review' && content && (
            <div className="space-y-3">
              {/* Edit / Preview toggle */}
              <div className="flex items-center gap-1 bg-ink-800/60 rounded-lg p-0.5 border border-ink-700/50 w-max">
                <button
                  onClick={() => setView('edit')}
                  className={`px-3 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${view === 'edit' ? 'bg-ink-700 text-ivory shadow-sm' : 'text-ivory-muted hover:text-ivory'}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setView('preview')}
                  className={`px-3 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${view === 'preview' ? 'bg-ink-700 text-ivory shadow-sm' : 'text-ivory-muted hover:text-ivory'}`}
                >
                  Preview
                </button>
              </div>

              {view === 'preview' ? (
                <CoverLetterPreview content={content} name={name.trim() || data.personal.name} />
              ) : (
              <>
              <p className="text-[10px] text-ivory/40 leading-relaxed">
                Wrap a word in <span className="font-mono text-gold/80">**double asterisks**</span> for <strong>bold</strong> or
                {' '}<span className="font-mono text-gold/80">__double underscores__</span> for <u>underline</u>. Everything here is editable.
              </p>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] uppercase tracking-wide text-ink-500 mb-1 block">Your name (header &amp; signature)</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="input-base !text-xs !py-2" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wide text-ink-500 mb-1 block">Header tagline</label>
                  <input value={content.headerTitle} onChange={(e) => patch({ headerTitle: e.target.value })} className="input-base !text-xs !py-2" placeholder="e.g. AI Developer and Data Analyst" />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wide text-ink-500 mb-1 block">Salutation</label>
                <input value={content.salutation} onChange={(e) => patch({ salutation: e.target.value })} className="input-base !text-xs !py-2" />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wide text-ink-500 mb-1 block">Opening</label>
                <textarea value={content.opening} onChange={(e) => patch({ opening: e.target.value })} rows={3} className="input-base w-full !text-[11px] !leading-relaxed resize-y min-h-[60px]" />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wide text-ink-500 mb-1 block">Bridge</label>
                <textarea value={content.bridge} onChange={(e) => patch({ bridge: e.target.value })} rows={2} className="input-base w-full !text-[11px] !leading-relaxed resize-y min-h-[44px]" />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wide text-ink-500 mb-1.5 block">Key points (bold lead-in, résumé-grounded)</label>
                <ReorderableBullets
                  bullets={content.bullets}
                  onChange={(bullets) => patch({ bullets })}
                  className="space-y-1.5"
                  renderBullet={({ value, setValue, remove, canRemove, dragHandle }) => (
                    <div className="flex items-start gap-1.5">
                      {dragHandle}
                      <textarea value={value} onChange={(e) => setValue(e.target.value)} rows={2} className="input-base flex-1 !text-[11px] !leading-relaxed resize-y min-h-[44px] !py-1.5 !px-2" />
                      {canRemove && (
                        <button onClick={remove} className="mt-1.5 text-ivory-dim hover:text-crimson transition-colors flex-shrink-0 cursor-pointer" title="Remove point"><Trash2 size={12} /></button>
                      )}
                    </div>
                  )}
                />
                <button onClick={() => patch({ bullets: [...content.bullets, ''] })} className="mt-1.5 flex items-center gap-1 text-[10px] text-gold hover:text-gold-light transition-colors cursor-pointer">
                  <Plus size={11} /> Add point
                </button>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wide text-ink-500 mb-1.5 block">Closing paragraphs</label>
                <ReorderableBullets
                  bullets={content.closing}
                  onChange={(closing) => patch({ closing })}
                  className="space-y-1.5"
                  renderBullet={({ value, setValue, remove, canRemove, dragHandle }) => (
                    <div className="flex items-start gap-1.5">
                      {dragHandle}
                      <textarea value={value} onChange={(e) => setValue(e.target.value)} rows={2} className="input-base flex-1 !text-[11px] !leading-relaxed resize-y min-h-[44px] !py-1.5 !px-2" />
                      {canRemove && (
                        <button onClick={remove} className="mt-1.5 text-ivory-dim hover:text-crimson transition-colors flex-shrink-0 cursor-pointer" title="Remove paragraph"><Trash2 size={12} /></button>
                      )}
                    </div>
                  )}
                />
                <button onClick={() => patch({ closing: [...content.closing, ''] })} className="mt-1.5 flex items-center gap-1 text-[10px] text-gold hover:text-gold-light transition-colors cursor-pointer">
                  <Plus size={11} /> Add paragraph
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] uppercase tracking-wide text-ink-500 mb-1 block">Sign-off</label>
                  <input value={content.signoff} onChange={(e) => patch({ signoff: e.target.value })} className="input-base !text-xs !py-2" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wide text-ink-500 mb-1 block">Signature (cursive)</label>
                  <input value={content.signatureName} onChange={(e) => patch({ signatureName: e.target.value })} className="input-base !text-xs !py-2" placeholder={name} />
                </div>
              </div>

              {warnings.length > 0 && (
                <ul className="space-y-1">
                  {warnings.map((w, k) => (
                    <li key={k} className="flex items-start gap-1.5 text-[10px] text-ivory/50 leading-relaxed">
                      <ShieldCheck size={11} className="text-gold/70 flex-shrink-0 mt-0.5" /><span>{w}</span>
                    </li>
                  ))}
                </ul>
              )}

              {missing.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-ink-500 mb-1.5">Honest gaps — in the JD, not on your résumé (not claimed)</p>
                  <div className="flex flex-wrap gap-1.5">
                    {missing.map((k) => (
                      <span key={k} className="px-2 py-0.5 rounded-md text-[10px] bg-gold/10 text-gold border border-gold/25">{k}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Refine */}
              <div className="border-t border-ink-700/50 pt-3">
                <label className="text-[10px] uppercase tracking-wide text-ink-500 mb-1.5 block">Tweak with a comment</label>
                <div className="flex items-start gap-2">
                  <textarea
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && !regenerating) regenerate(); }}
                    rows={2}
                    placeholder="e.g. emphasize leadership · make it warmer · mention the Solana project more"
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
                  Grounded in your résumé — facts and numbers are never invented. (⌘/Ctrl+Enter)
                </p>
              </div>
              </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {phase === 'review' && content && (
          <div className="flex items-center justify-between gap-2 px-5 py-3.5 border-t border-ink-700/60 flex-shrink-0">
            <p className="text-[11px] text-crimson truncate min-w-0">{downloadError}</p>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => download('docx')}
                disabled={!!downloading || regenerating}
                className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory hover:bg-ink-800/50 transition-colors cursor-pointer disabled:opacity-50"
              >
                {downloading === 'docx' ? <Spinner size={13} tone="current" /> : <Download size={13} />} DOCX
              </button>
              <button
                onClick={() => download('pdf')}
                disabled={!!downloading || regenerating}
                className="flex items-center gap-1.5 px-4 py-2 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer shadow-sm shadow-gold/25 disabled:opacity-50"
              >
                {downloading === 'pdf' ? <Spinner size={13} tone="current" /> : <Download size={13} />} PDF
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  return createPortal(overlay, document.body);
}
