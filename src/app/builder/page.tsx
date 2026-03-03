// src/app/builder/page.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Download, FileCode, Eye, Loader2,
  Zap, Copy, Check, Save, LogOut, CloudOff, Cloud,
  Undo2, RotateCcw,
} from 'lucide-react';
import { ResumeData, SectionConfig, BuilderMode, ActiveSection, ALL_SECTIONS } from '@/lib/types';
import { generateLatex } from '@/lib/latexTemplate';
import { compileToPDF, downloadBlob, downloadLatex } from '@/lib/pdfCompiler';
import FormPanel from '@/components/builder/FormPanel';
import UploadMode from '@/components/builder/UploadMode';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ResumeSwitcher from '@/components/builder/ResumeSwitcher';
import { useAuth } from '@/context/AuthContext';
import { useResumes } from '@/hooks/useResumes';

type PreviewTab = 'code' | 'preview';

const AUTOSAVE_DELAY = 2000;
const MAX_HISTORY    = 50;

// ── Snapshot stored in undo history ─────────────────────────────────────────
interface Snapshot {
  resumeData:    ResumeData;
  sectionConfig: SectionConfig[];
}

function BuilderContent() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading, signOut } = useAuth();
  const {
    resumes, activeResume, loading: resumesLoading, saveStatus,
    save, rename, forkFromMaster, restoreToMaster, deleteResume, switchTo,
  } = useResumes();

  useEffect(() => {
    if (!authLoading && !user) router.replace('/login');
  }, [user, authLoading]);

  const initialMode = searchParams.get('mode') === 'upload' ? 'upload' : 'manual';
  const [mode, setMode]                 = useState<BuilderMode>(initialMode);
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
  // undoStack holds past snapshots; undoIndex is current position in stack
  const undoStack  = useRef<Snapshot[]>([]);
  const undoIndex  = useRef<number>(-1);
  const skipPush   = useRef(false); // true when we're restoring from history
  const [undoCount, setUndoCount] = useState(0); // reactive counter for UI

  const pushHistory = useCallback((snapshot: Snapshot) => {
    if (skipPush.current) return;
    // Trim any "future" states that were undone
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
    // allow next real change to push
    setTimeout(() => { skipPush.current = false; }, 50);
  }, []);

  // ── Autosave ─────────────────────────────────────────────────────────────────
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDirty       = useRef(false);
  // lastSaved holds what's currently persisted in DB for this resume
  const lastSaved     = useRef<Snapshot | null>(null);

  const triggerAutosave = useCallback((data: ResumeData, config: SectionConfig[]) => {
    isDirty.current = true;
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      if (activeResume && isDirty.current) {
        save(activeResume.id, data, config);
        lastSaved.current = { resumeData: data, sectionConfig: config };
        isDirty.current = false;
      }
    }, AUTOSAVE_DELAY);
  }, [activeResume, save]);

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
    isDirty.current = false;
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
    triggerAutosave(data, sectionConfig);
  };

  const handleConfigChange = (config: SectionConfig[]) => {
    setSectionConfig(config);
    if (resumeData) {
      pushHistory({ resumeData, sectionConfig: config });
      triggerAutosave(resumeData, config);
    }
  };

  // ── Restore to last cloud-saved state (discard all unsaved changes) ──────────
  const handleRestoreCloud = useCallback(() => {
    if (!lastSaved.current) return;
    skipPush.current = true;
    setResumeData(lastSaved.current.resumeData);
    setSectionConfig(lastSaved.current.sectionConfig);
    undoStack.current = [lastSaved.current];
    undoIndex.current = 0;
    setUndoCount(0);
    isDirty.current = false;
    setTimeout(() => { skipPush.current = false; }, 50);
  }, []);

  // ── Manual save ──────────────────────────────────────────────────────────────
  const handleManualSave = () => {
    if (activeResume && resumeData) {
      save(activeResume.id, resumeData, sectionConfig);
      lastSaved.current = { resumeData, sectionConfig };
      isDirty.current = false;
    }
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

  const handleParsedResume = useCallback((data: ResumeData) => {
    setResumeData(data); setMode('manual'); setActiveSection('personal');
    pushHistory({ resumeData: data, sectionConfig });
    triggerAutosave(data, sectionConfig);
  }, [pushHistory, triggerAutosave, sectionConfig]);

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (authLoading || resumesLoading || !resumeData) {
    return (
      <div className="h-screen bg-ink-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={28} className="text-gold animate-spin mx-auto mb-3" />
          <p className="text-ivory-muted text-sm">Loading your resumes...</p>
        </div>
      </div>
    );
  }

  // ── Save status indicator ────────────────────────────────────────────────────
  const SaveIndicator = () => {
    if (saveStatus === 'saving') return (
      <span className="flex items-center gap-1.5 text-[10px] text-ivory-dim font-mono">
        <Loader2 size={10} className="animate-spin" /> Saving...
      </span>
    );
    if (saveStatus === 'saved') return (
      <span className="flex items-center gap-1.5 text-[10px] text-jade font-mono">
        <Cloud size={10} /> Saved
      </span>
    );
    if (saveStatus === 'error') return (
      <span className="flex items-center gap-1.5 text-[10px] text-crimson font-mono">
        <CloudOff size={10} /> Save failed
      </span>
    );
    return null;
  };

  const canUndo = undoCount > 0;

  return (
    <div className="h-screen bg-ink-950 flex flex-col overflow-hidden">
      {/* ── Top Bar ───────────────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-ink-800 bg-ink-900/80 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-3">

          {/* Back button — uses router.back() so it always goes to previous page */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-ivory-dim hover:text-ivory transition-colors text-xs"
          >
            <ArrowLeft size={14} />
            <span className="font-mono">Back</span>
          </button>

          <div className="w-px h-4 bg-ink-600" />

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border border-gold/40 flex items-center justify-center">
              <span className="text-gold text-[10px] font-mono font-bold">λ</span>
            </div>
            <span className="font-display text-xs text-ivory font-medium hidden sm:block">ResumeTeX</span>
          </div>

          {/* Resume Switcher */}
          <ResumeSwitcher
            resumes={resumes}
            activeResume={activeResume}
            onSwitch={switchTo}
            onFork={async (name) => { await forkFromMaster(name); }}
            onDelete={deleteResume}
            onRename={rename}
            onRestoreToMaster={(id) => restoreToMaster(id)}
          />

          {/* Mode toggle */}
          <div className="flex items-center bg-ink-800 rounded-lg p-0.5 border border-ink-700">
            {(['manual', 'upload'] as BuilderMode[]).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${mode === m ? 'bg-gold text-ink-950' : 'text-ivory-muted hover:text-ivory'}`}>
                {m === 'manual' ? 'Manual' : 'Upload'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SaveIndicator />
          <ThemeToggle />

          {/* ── Undo button ── */}
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            title={canUndo ? `Undo (${undoCount} step${undoCount !== 1 ? 's' : ''} available) · Ctrl+Z` : 'Nothing to undo'}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs border rounded-lg transition-all ${
              canUndo
                ? 'border-ink-600 text-ivory-muted hover:border-ivory/30 hover:text-ivory'
                : 'border-ink-700 text-ink-600 cursor-not-allowed'
            }`}
          >
            <Undo2 size={12} />
            {canUndo && <span className="font-mono text-[10px] text-ink-500">{undoCount}</span>}
          </button>

          {/* ── Restore to last cloud save ── */}
          <button
            onClick={handleRestoreCloud}
            title="Discard all unsaved changes and restore the last cloud-saved version"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-ink-600 text-ivory-muted rounded-lg hover:border-crimson/40 hover:text-crimson transition-all"
          >
            <RotateCcw size={12} />
            Rollback
          </button>

          {/* ── Manual save ── */}
          <button onClick={handleManualSave} disabled={saveStatus === 'saving'}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-ink-600 text-ivory-muted rounded-lg hover:border-ivory/30 hover:text-ivory transition-all disabled:opacity-50">
            <Save size={12} /> Save
          </button>

          <button onClick={() => downloadLatex(latexCode, `${resumeData.personal.name || 'resume'}.tex`)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-ink-600 text-ivory-muted rounded-lg hover:border-ivory/30 hover:text-ivory transition-all">
            <FileCode size={12} /> .tex
          </button>

          <button onClick={handleCompile} disabled={isCompiling}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gold/40 text-gold rounded-lg hover:bg-gold/10 transition-all disabled:opacity-50">
            {isCompiling ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />} Compile
          </button>

          <button onClick={handleDownloadPDF} disabled={isCompiling}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs bg-gold text-ink-950 font-semibold rounded-lg hover:bg-gold-light transition-all disabled:opacity-50">
            <Download size={12} /> PDF
          </button>

          <div className="w-px h-4 bg-ink-600" />
          <button onClick={signOut} title={`Sign out (${user?.email})`}
            className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-ink-500 hover:text-ivory-muted transition-colors">
            <LogOut size={13} />
          </button>
        </div>
      </header>

      {/* ── Main ──────────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[400px] flex-shrink-0 border-r border-ink-800 overflow-y-auto bg-ink-900">
          <AnimatePresence mode="wait">
            {mode === 'upload' ? (
              <motion.div key="upload" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="h-full">
                <UploadMode onParsed={handleParsedResume} />
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="h-full">
                <FormPanel
                  data={resumeData}
                  onChange={handleDataChange}
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                  sectionConfig={sectionConfig}
                  onSectionConfigChange={handleConfigChange}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col overflow-hidden bg-ink-950">
          <div className="flex items-center justify-between px-5 py-2 border-b border-ink-800 bg-ink-900/50 flex-shrink-0">
            <div className="flex items-center bg-ink-800 rounded-lg p-0.5 border border-ink-700">
              <button onClick={() => setPreviewTab('code')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${previewTab === 'code' ? 'bg-ink-600 text-ivory' : 'text-ivory-muted hover:text-ivory'}`}>
                <FileCode size={12} /> LaTeX Code
              </button>
              <button onClick={() => setPreviewTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${previewTab === 'preview' ? 'bg-ink-600 text-ivory' : 'text-ivory-muted hover:text-ivory'}`}>
                <Eye size={12} /> PDF Preview
              </button>
            </div>
            {previewTab === 'code' && (
              <button onClick={handleCopyLatex} className="flex items-center gap-1.5 text-xs text-ivory-dim hover:text-ivory transition-colors">
                {copied ? <Check size={12} className="text-jade" /> : <Copy size={12} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
            {compileError && <span className="text-xs text-crimson font-mono">{compileError}</span>}
          </div>

          <AnimatePresence mode="wait">
            {previewTab === 'code' ? (
              <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 overflow-auto p-5">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-right select-none">
                    {latexCode.split('\n').map((_, i) => (
                      <div key={i} className="text-[10px] font-mono text-ink-500 leading-[20px]">{i + 1}</div>
                    ))}
                  </div>
                  <div className="flex-1 overflow-x-auto">
                    <pre className="latex-code leading-5">
                      {latexCode.split('\n').map((line, i) => (
                        <div key={i} className={`hover:bg-ink-800/40 px-1 rounded ${
                          line.startsWith('%') ? 'text-ink-500' :
                          line.startsWith('\\section') ? 'text-gold' :
                          line.startsWith('\\') ? 'text-jade/90' : 'text-ivory-muted'
                        }`}>{line || ' '}</div>
                      ))}
                    </pre>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex-1 overflow-hidden flex items-center justify-center bg-ink-900">
                {pdfUrl ? (
                  <iframe src={pdfUrl} className="w-full h-full border-0" title="PDF Preview" />
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-ink-800 border border-ink-700 flex items-center justify-center mx-auto mb-4">
                      <Eye size={24} className="text-ivory-dim" />
                    </div>
                    <p className="text-ivory-muted text-sm font-medium">No preview yet</p>
                    <p className="text-ivory-dim text-xs mt-1 mb-5">Click Compile to generate PDF preview</p>
                    <button onClick={handleCompile} disabled={isCompiling}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gold text-ink-950 font-semibold text-sm rounded-xl hover:bg-gold-light mx-auto disabled:opacity-50">
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