// src/app/builder/page.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Download, FileCode, Eye, Loader2,
  Zap, Copy, Check, Save, LogOut, CloudOff, Cloud,
  Undo2, RotateCcw, AlertTriangle,
} from 'lucide-react';
import { ResumeData, SectionConfig, ActiveSection, ALL_SECTIONS } from '@/lib/types';
import { generateLatex } from '@/lib/latexTemplate';
import { compileToPDF, downloadBlob, downloadLatex } from '@/lib/pdfCompiler';
import FormPanel from '@/components/builder/FormPanel';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ResumeSwitcher from '@/components/builder/ResumeSwitcher';
import { useAuth } from '@/context/AuthContext';
import { useResumes } from '@/hooks/useResumes';

type PreviewTab = 'code' | 'preview';

const MAX_HISTORY = 50;

// ── Snapshot stored in undo history ─────────────────────────────────────────
interface Snapshot {
  resumeData:    ResumeData;
  sectionConfig: SectionConfig[];
}

function BuilderContent() {
  const router       = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const {
    resumes, activeResume, loading: resumesLoading, saveStatus,
    save, rename, forkFromMaster, restoreToMaster, deleteResume, switchTo,
  } = useResumes();

  useEffect(() => {
    if (!authLoading && !user) router.replace('/login');
  }, [user, authLoading]);

  const [activeSection, setActiveSection] = useState<ActiveSection>('personal');
  const [latexCode, setLatexCode]       = useState('');
  const [previewTab, setPreviewTab]     = useState<PreviewTab>('code');
  const [isCompiling, setIsCompiling]   = useState(false);
  const [compileError, setCompileError] = useState('');
  const [copied, setCopied]             = useState(false);
  const [pdfUrl, setPdfUrl]             = useState('');

  const [resumeData, setResumeData]       = useState<ResumeData | null>(null);
  const [sectionConfig, setSectionConfig] = useState<SectionConfig[]>(ALL_SECTIONS);

  // ── Undo history ────────────────────────────────────────────────────────────
  const undoStack  = useRef<Snapshot[]>([]);
  const undoIndex  = useRef<number>(-1);
  const skipPush   = useRef(false);
  const [undoCount, setUndoCount] = useState(0);

  const pushHistory = useCallback((snapshot: Snapshot) => {
    if (skipPush.current) return;
    undoStack.current = undoStack.current.slice(0, undoIndex.current + 1);
    undoStack.current.push(snapshot);
    if (undoStack.current.length > MAX_HISTORY) undoStack.current.shift();
    undoIndex.current = undoStack.current.length - 1;
    setUndoCount(undoIndex.current);
  }, []);

  const handleUndo = useCallback(() => {
    if (undoIndex.current <= 0) return;
    undoIndex.current -= 1;
    const snap = undoStack.current[undoIndex.current];
    skipPush.current = true;
    setResumeData(snap.resumeData);
    setSectionConfig(snap.sectionConfig);
    setUndoCount(undoIndex.current);
    setTimeout(() => { skipPush.current = false; }, 50);
  }, []);

  // ── Manual save / unsaved-changes tracking (no autosave) ────────────────────
  // lastSaved holds the most recent persisted snapshot; Revert restores to it.
  const lastSaved = useRef<Snapshot | null>(null);
  const [hasUnsaved, setHasUnsaved] = useState(false);

  // Confirmation dialog shown before Save / Revert / Regenerate act.
  const [confirmDialog, setConfirmDialog] = useState<null | {
    title: string;
    message: string;
    confirmLabel: string;
    tone: 'gold' | 'crimson';
    onConfirm: () => void;
  }>(null);

  // ── Load active resume ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!activeResume) return;
    const snap: Snapshot = {
      resumeData:    activeResume.resume_data,
      sectionConfig: activeResume.section_config?.length ? activeResume.section_config : ALL_SECTIONS,
    };
    skipPush.current = true;
    setResumeData(snap.resumeData);
    setSectionConfig(snap.sectionConfig);
    lastSaved.current  = snap;
    undoStack.current  = [snap];
    undoIndex.current  = 0;
    setUndoCount(0);
    setHasUnsaved(false);
    setTimeout(() => { skipPush.current = false; }, 50);
  }, [activeResume?.id]);

  // ── Regenerate LaTeX ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!resumeData) return;
    setLatexCode(generateLatex(resumeData, sectionConfig));
    if (pdfUrl) { URL.revokeObjectURL(pdfUrl); setPdfUrl(''); }
  }, [resumeData, sectionConfig]);

  // ── Keyboard shortcut Ctrl/Cmd+Z ────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleUndo]);

  // ── Data change handlers ─────────────────────────────────────────────────────
  const handleDataChange = (data: ResumeData) => {
    setResumeData(data);
    pushHistory({ resumeData: data, sectionConfig });
    setHasUnsaved(true);
  };

  const handleConfigChange = (config: SectionConfig[]) => {
    setSectionConfig(config);
    if (resumeData) {
      pushHistory({ resumeData, sectionConfig: config });
      setHasUnsaved(true);
    }
  };

  // ── Revert to the last saved version (discard unsaved edits) ────────────────
  const doRevert = useCallback(() => {
    if (!lastSaved.current) return;
    skipPush.current = true;
    setResumeData(lastSaved.current.resumeData);
    setSectionConfig(lastSaved.current.sectionConfig);
    undoStack.current = [lastSaved.current];
    undoIndex.current = 0;
    setUndoCount(0);
    setHasUnsaved(false);
    setTimeout(() => { skipPush.current = false; }, 50);
  }, []);

  const requestRevert = () => {
    if (!hasUnsaved) return; // nothing to discard
    setConfirmDialog({
      title: 'Revert to last saved version?',
      message: `This discards your unsaved changes to "${activeResume?.name ?? 'this resume'}" and restores the last saved version.`,
      confirmLabel: 'Revert',
      tone: 'crimson',
      onConfirm: () => { doRevert(); setConfirmDialog(null); },
    });
  };

  // ── Manual save (with confirmation) ─────────────────────────────────────────
  const doSave = useCallback(() => {
    if (activeResume && resumeData) {
      save(activeResume.id, resumeData, sectionConfig);
      lastSaved.current = { resumeData, sectionConfig };
      setHasUnsaved(false);
    }
  }, [activeResume, resumeData, sectionConfig, save]);

  const requestSave = () => {
    if (!activeResume || !resumeData) return;
    setConfirmDialog({
      title: 'Save changes?',
      message: `This overwrites "${activeResume.name}" with your current content.`,
      confirmLabel: 'Save',
      tone: 'gold',
      onConfirm: () => { doSave(); setConfirmDialog(null); },
    });
  };

  // ── Compile / Download ───────────────────────────────────────────────────────
  const handleCompile = async () => {
    setIsCompiling(true); setCompileError('');
    try {
      const blob = await compileToPDF(latexCode);
      setPdfUrl(URL.createObjectURL(blob));
      setPreviewTab('preview');
    } catch (err) {
      setCompileError(err instanceof Error ? err.message : 'Compilation failed');
    } finally { setIsCompiling(false); }
  };

  const handleDownloadPDF = async () => {
    const filename = `${resumeData?.personal.name || 'resume'} - ${activeResume?.name || 'resume'}.pdf`;
    if (pdfUrl) {
      const a = document.createElement('a'); a.href = pdfUrl; a.download = filename; a.click();
    } else {
      setIsCompiling(true);
      try { downloadBlob(await compileToPDF(latexCode), filename); }
      catch (err) { setCompileError(err instanceof Error ? err.message : 'Compilation failed'); }
      finally { setIsCompiling(false); }
    }
  };

  const handleCopyLatex = () => {
    navigator.clipboard.writeText(latexCode);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (authLoading || resumesLoading || !resumeData) {
    return (
      <div className="h-screen bg-ink-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto mb-5 w-12 h-12">
            <div className="absolute inset-0 rounded-full bg-gold/10 animate-ping" />
            <div className="relative w-12 h-12 rounded-2xl border border-gold/30 bg-gold/[0.08] flex items-center justify-center">
              <span className="text-gold text-xl font-mono font-bold">λ</span>
            </div>
          </div>
          <Loader2 size={18} className="text-gold animate-spin mx-auto mb-3 opacity-60" />
          <p className="text-ivory/50 text-sm">Loading your resumes...</p>
        </div>
      </div>
    );
  }

  // ── Save status indicator ────────────────────────────────────────────────────
  const SaveIndicator = () => {
    if (saveStatus === 'saving') return (
      <AnimatePresence mode="wait">
        <motion.span
          key="saving"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-1.5 text-[10px] text-ivory-dim font-mono"
        >
          <Loader2 size={10} className="animate-spin" /> Saving...
        </motion.span>
      </AnimatePresence>
    );
    if (saveStatus === 'saved') return (
      <AnimatePresence mode="wait">
        <motion.span
          key="saved"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-1.5 text-[10px] text-jade font-mono"
        >
          <Cloud size={10} /> Saved
        </motion.span>
      </AnimatePresence>
    );
    if (saveStatus === 'error') return (
      <AnimatePresence mode="wait">
        <motion.span
          key="error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-1.5 text-[10px] text-crimson font-mono"
        >
          <CloudOff size={10} /> Save failed
        </motion.span>
      </AnimatePresence>
    );
    if (hasUnsaved) return (
      <span className="flex items-center gap-1.5 text-[10px] text-gold/80 font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-gold/80" /> Unsaved
      </span>
    );
    return null;
  };

  const canUndo = undoCount > 0;

  return (
    <div className="h-screen bg-ink-950 flex flex-col overflow-hidden">
      <header className="relative z-[100] flex items-center justify-between px-3 py-2 border-b border-ink-800/80 bg-ink-900/90 backdrop-blur-md flex-shrink-0 gap-1.5 overflow-hidden min-h-[44px]">

        {/* ── Left cluster ── */}
        <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
          {/* Back */}
          <button
            onClick={() => router.back()}
            title="Back"
            className="flex items-center gap-1 text-ivory-dim hover:text-ivory transition-colors text-xs cursor-pointer px-2 py-1.5 rounded-lg hover:bg-ink-800/60 flex-shrink-0"
          >
            <ArrowLeft size={13} />
            <span className="hidden lg:block font-mono">Back</span>
          </button>

          <div className="w-px h-4 bg-ink-700/80 flex-shrink-0 hidden md:block" />

          {/* Logo */}
          <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
            <div className="w-5 h-5 rounded-md border border-gold/40 bg-gold/8 flex items-center justify-center">
              <span className="text-gold text-[10px] font-mono font-bold">λ</span>
            </div>
            <span className="font-display font-bold text-xs text-ivory hidden lg:block">ResumeTeX</span>
          </div>

          <div className="w-px h-4 bg-ink-700/80 flex-shrink-0 hidden md:block" />

          {/* Resume Switcher — always visible */}
          <div className="flex-shrink-0 min-w-0">
            <ResumeSwitcher
              resumes={resumes}
              activeResume={activeResume}
              onSwitch={switchTo}
              onFork={async (name) => { await forkFromMaster(name); }}
              onDelete={deleteResume}
              onRename={rename}
              onRestoreToMaster={(id) => restoreToMaster(id)}
            />
          </div>

        </div>

        {/* ── Right cluster ── */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Save status — only on larger screens */}
          <span className="hidden lg:flex">
            <SaveIndicator />
          </span>

          <ThemeToggle />

          <div className="w-px h-4 bg-ink-700/80 hidden sm:block" />

          {/* Undo */}
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            title={canUndo ? `Undo (${undoCount} step${undoCount !== 1 ? 's' : ''}) · Ctrl+Z` : 'Nothing to undo'}
            className={`flex items-center gap-1 px-2 py-1.5 text-xs rounded-lg transition-all duration-200 ${
              canUndo
                ? 'border border-ink-600/80 text-ivory-muted hover:border-ivory/25 hover:text-ivory hover:bg-ink-800/50 cursor-pointer'
                : 'border border-ink-700 text-ink-500 cursor-not-allowed opacity-40'
            }`}
          >
            <Undo2 size={12} />
            {canUndo && <span className="font-mono text-[10px] text-ink-500">{undoCount}</span>}
          </button>

          {/* Revert — discard unsaved changes, restore last saved version */}
          <button
            onClick={requestRevert}
            disabled={!hasUnsaved}
            title="Revert to last saved version (discard unsaved changes)"
            className={`flex items-center gap-1 px-2 py-1.5 text-xs border rounded-lg transition-all duration-200 ${
              !hasUnsaved
                ? 'border-ink-700 text-ink-500 cursor-not-allowed opacity-40'
                : 'border-ink-600/80 text-ivory-muted hover:border-crimson/40 hover:text-crimson cursor-pointer'
            }`}
          >
            <RotateCcw size={12} />
            <span className="hidden lg:block">Revert</span>
          </button>

          {/* Save — icon only below lg */}
          <button
            onClick={requestSave}
            disabled={saveStatus === 'saving'}
            title="Save changes"
            className={`relative flex items-center gap-1 px-2 py-1.5 text-xs border rounded-lg transition-all duration-200 disabled:opacity-50 cursor-pointer ${
              hasUnsaved
                ? 'border-gold/50 text-gold hover:bg-gold/10'
                : 'border-ink-600/80 text-ivory-muted hover:border-ivory/25 hover:text-ivory'
            }`}
          >
            <Save size={12} />
            <span className="hidden lg:block">Save</span>
            {hasUnsaved && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gold shadow-sm shadow-gold/40" />}
          </button>

          {/* Download .tex — icon only below lg */}
          <button
            onClick={() => downloadLatex(latexCode, `${resumeData.personal.name || 'resume'}.tex`)}
            title="Download LaTeX source"
            className="flex items-center gap-1 px-2 py-1.5 text-xs border border-ink-600/80 text-ivory-muted rounded-lg hover:border-ivory/25 hover:text-ivory transition-all duration-200 cursor-pointer"
          >
            <FileCode size={12} />
            <span className="hidden lg:block">.tex</span>
          </button>

          <div className="w-px h-4 bg-ink-700/80 hidden sm:block" />

          {/* Compile */}
          <button
            onClick={handleCompile}
            disabled={isCompiling}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs border border-gold/40 text-gold rounded-lg hover:bg-gold/10 hover:border-gold/60 transition-all duration-200 disabled:opacity-50 cursor-pointer"
          >
            {isCompiling ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />}
            <span className="hidden sm:block">Compile</span>
          </button>

          {/* Download PDF — always labeled (primary CTA) */}
          <button
            onClick={handleDownloadPDF}
            disabled={isCompiling}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-gold text-ink-950 font-semibold rounded-lg hover:bg-gold-light transition-all duration-200 disabled:opacity-50 shadow-sm shadow-gold/25 cursor-pointer"
          >
            <Download size={12} />
            PDF
          </button>

          <div className="w-px h-4 bg-ink-700/80 hidden sm:block" />

          {/* Sign out */}
          <button
            onClick={signOut}
            title={`Sign out (${user?.email})`}
            className="flex items-center px-1.5 py-1.5 text-xs text-ink-500 hover:text-ivory-muted transition-colors cursor-pointer rounded-lg hover:bg-ink-800/50"
          >
            <LogOut size={13} />
          </button>
        </div>
      </header>

      {/* ── Main ──────────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel — Form */}
        <div className="w-[400px] flex-shrink-0 border-r border-ink-800/60 overflow-y-auto bg-ink-900/60">
          <FormPanel
            data={resumeData}
            onChange={handleDataChange}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            sectionConfig={sectionConfig}
            onSectionConfigChange={handleConfigChange}
          />
        </div>

        {/* Right Panel — Preview */}
        <div className="flex-1 flex flex-col overflow-hidden bg-ink-950">
          {/* Preview tab bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-ink-800/60 bg-ink-900/40 flex-shrink-0">
            <div className="flex items-center gap-1 bg-ink-800/60 rounded-lg p-0.5 border border-ink-700/50">
              <button
                onClick={() => setPreviewTab('code')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 cursor-pointer ${
                  previewTab === 'code'
                    ? 'bg-ink-700 text-ivory shadow-sm'
                    : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                <FileCode size={12} />
                LaTeX Code
              </button>
              <button
                onClick={() => setPreviewTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 cursor-pointer ${
                  previewTab === 'preview'
                    ? 'bg-ink-700 text-ivory shadow-sm'
                    : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                <Eye size={12} />
                PDF Preview
              </button>
            </div>

            <div className="flex items-center gap-3">
              {compileError && (
                <span className="text-[10px] text-crimson font-mono bg-crimson/10 border border-crimson/20 px-2 py-1 rounded-md truncate max-w-xs">
                  {compileError}
                </span>
              )}
              {previewTab === 'code' && (
                <button
                  onClick={handleCopyLatex}
                  className="flex items-center gap-1 text-xs text-ivory-dim hover:text-ivory transition-colors cursor-pointer"
                >
                  {copied ? <Check size={12} className="text-jade" /> : <Copy size={12} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {previewTab === 'code' ? (
              <motion.div
                key="code"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 overflow-auto p-5"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-right select-none pt-px">
                    {latexCode.split('\n').map((_, i) => (
                      <div key={i} className="text-[10px] font-mono text-ink-500/70 leading-5">{i + 1}</div>
                    ))}
                  </div>
                  <div className="flex-1 overflow-x-auto">
                    <pre className="latex-code leading-5">
                      {latexCode.split('\n').map((line, i) => (
                        <div
                          key={i}
                          className={`hover:bg-ink-800/30 px-1 rounded transition-colors ${
                            line.startsWith('%')        ? 'text-ink-500' :
                            line.startsWith('\\section') ? 'text-gold' :
                            line.startsWith('\\')       ? 'text-jade/90' :
                            'text-ivory-muted'
                          }`}
                        >
                          {line || ' '}
                        </div>
                      ))}
                    </pre>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 overflow-hidden flex items-center justify-center bg-ink-900/40"
              >
                {pdfUrl ? (
                  <iframe src={pdfUrl} className="w-full h-full border-0" title="PDF Preview" />
                ) : (
                  <div className="text-center px-6">
                    <div className="w-16 h-16 rounded-2xl bg-ink-800 border border-ink-700 flex items-center justify-center mx-auto mb-4 shadow-md">
                      <Eye size={22} className="text-ivory-dim" />
                    </div>
                    <p className="text-ivory/70 text-sm font-semibold mb-1">No preview yet</p>
                    <p className="text-ivory/40 text-xs mb-6">Click Compile to generate your PDF preview</p>
                    <button
                      onClick={handleCompile}
                      disabled={isCompiling}
                      className="btn-primary mx-auto disabled:opacity-50"
                    >
                      {isCompiling ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
                      {isCompiling ? 'Compiling...' : 'Compile Now'}
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Confirmation dialog (Save / Revert / Regenerate) ─────────────────── */}
      <AnimatePresence>
        {confirmDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setConfirmDialog(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.15 }}
              className="card-glass w-full max-w-sm"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start gap-3 mb-5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                  confirmDialog.tone === 'crimson'
                    ? 'bg-crimson/10 border-crimson/30 text-crimson'
                    : 'bg-gold/10 border-gold/30 text-gold'
                }`}>
                  <AlertTriangle size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-ivory text-sm">{confirmDialog.title}</h3>
                  <p className="text-ivory/60 text-xs mt-1 leading-relaxed">{confirmDialog.message}</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setConfirmDialog(null)}
                  className="px-3 py-1.5 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory hover:bg-ink-800/50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDialog.onConfirm}
                  className={`px-3 py-1.5 text-xs rounded-lg font-semibold cursor-pointer transition-colors ${
                    confirmDialog.tone === 'crimson'
                      ? 'bg-crimson text-white hover:bg-crimson/90'
                      : 'bg-gold text-ink-950 hover:bg-gold-light'
                  }`}
                >
                  {confirmDialog.confirmLabel}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-ink-950 flex items-center justify-center">
        <Loader2 size={24} className="text-gold animate-spin" />
      </div>
    }>
      <BuilderContent />
    </Suspense>
  );
}