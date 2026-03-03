// src/app/builder/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, FileCode, Eye, Loader2, Zap, Copy, Check } from 'lucide-react';
import { ResumeData, defaultResumeData, BuilderMode, ActiveSection, SectionConfig, ALL_SECTIONS } from '@/lib/types';
import { generateLatex } from '@/lib/latexTemplate';
import { compileToPDF, downloadBlob, downloadLatex } from '@/lib/pdfCompiler';
import FormPanel from '@/components/builder/FormPanel';
import UploadMode from '@/components/builder/UploadMode';
import ThemeToggle from '@/components/ui/ThemeToggle';

type PreviewTab = 'code' | 'preview';

function BuilderContent() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'upload' ? 'upload' : 'manual';

  const [mode, setMode] = useState<BuilderMode>(initialMode);
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [activeSection, setActiveSection] = useState<ActiveSection>('personal');
  const [sectionConfig, setSectionConfig] = useState<SectionConfig[]>(ALL_SECTIONS);
  const [latexCode, setLatexCode] = useState('');
  const [previewTab, setPreviewTab] = useState<PreviewTab>('code');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileError, setCompileError] = useState('');
  const [copied, setCopied] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  // Regenerate LaTeX whenever data OR section config changes
  useEffect(() => {
    const code = generateLatex(resumeData, sectionConfig);
    setLatexCode(code);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl('');
    }
  }, [resumeData, sectionConfig]);

  const handleCompile = async () => {
    setIsCompiling(true);
    setCompileError('');
    try {
      const blob = await compileToPDF(latexCode);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setPreviewTab('preview');
    } catch (err) {
      setCompileError(err instanceof Error ? err.message : 'Compilation failed');
    } finally {
      setIsCompiling(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (pdfUrl) {
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = `${resumeData.personal.name || 'resume'}.pdf`;
      a.click();
    } else {
      setIsCompiling(true);
      try {
        const blob = await compileToPDF(latexCode);
        downloadBlob(blob, `${resumeData.personal.name || 'resume'}.pdf`);
      } catch (err) {
        setCompileError(err instanceof Error ? err.message : 'Compilation failed');
      } finally {
        setIsCompiling(false);
      }
    }
  };

  const handleCopyLatex = () => {
    navigator.clipboard.writeText(latexCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleParsedResume = useCallback((data: ResumeData) => {
    setResumeData(data);
    setMode('manual');
    setActiveSection('personal');
  }, []);

  const wordCount = resumeData.personal.name ? [
    resumeData.personal.name,
    ...resumeData.experience.map(e => e.role),
    ...resumeData.education.map(e => e.institution),
  ].filter(Boolean).length : 0;

  return (
    <div className="h-screen bg-ink-950 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-ink-800 bg-ink-900/80 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-ivory-muted hover:text-ivory transition-colors text-xs">
            <ArrowLeft size={14} />
            <span className="font-mono">Home</span>
          </Link>
          <div className="w-px h-4 bg-ink-600" />
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border border-gold/40 flex items-center justify-center">
              <span className="text-gold text-[10px] font-mono font-bold">λ</span>
            </div>
            <span className="font-display text-xs text-ivory font-medium">ResumeTeX Builder</span>
          </div>
          <div className="flex items-center bg-ink-800 rounded-lg p-0.5 border border-ink-700 ml-2">
            {(['manual', 'upload'] as BuilderMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 capitalize ${
                  mode === m ? 'bg-gold text-ink-950' : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                {m === 'manual' ? 'Manual' : 'Upload Resume'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {wordCount > 0 && (
            <span className="text-[10px] font-mono text-ivory-muted bg-ink-800 px-2 py-1 rounded">
              {wordCount} fields filled
            </span>
          )}
          <ThemeToggle />
          <button
            onClick={() => downloadLatex(latexCode, `${resumeData.personal.name || 'resume'}.tex`)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-ink-600 text-ivory-muted rounded-lg hover:border-ivory/30 hover:text-ivory transition-all"
          >
            <FileCode size={12} />
            .tex
          </button>
          <button
            onClick={handleCompile}
            disabled={isCompiling}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gold/40 text-gold rounded-lg hover:bg-gold/10 transition-all disabled:opacity-50"
          >
            {isCompiling ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />}
            Compile
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={isCompiling}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs bg-gold text-ink-950 font-semibold rounded-lg hover:bg-gold-light transition-all disabled:opacity-50"
          >
            <Download size={12} />
            PDF
          </button>
        </div>
      </header>

      {/* Main Layout */}
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
                  onChange={setResumeData}
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                  sectionConfig={sectionConfig}
                  onSectionConfigChange={setSectionConfig}
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
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${previewTab === 'code' ? 'bg-ink-600 text-ivory' : 'text-ivory-muted hover:text-ivory'}`}>
                <FileCode size={12} /> LaTeX Code
              </button>
              <button onClick={() => setPreviewTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${previewTab === 'preview' ? 'bg-ink-600 text-ivory' : 'text-ivory-muted hover:text-ivory'}`}>
                <Eye size={12} /> PDF Preview
              </button>
            </div>
            {previewTab === 'code' && (
              <button onClick={handleCopyLatex} className="flex items-center gap-1.5 text-xs text-ivory-muted hover:text-ivory transition-colors">
                {copied ? <Check size={12} className="text-jade" /> : <Copy size={12} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
            {compileError && <span className="text-xs text-crimson font-mono">{compileError}</span>}
          </div>

          <AnimatePresence mode="wait">
            {previewTab === 'code' ? (
              <motion.div key="code-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 overflow-auto p-5">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-right select-none">
                    {latexCode.split('\n').map((_, i) => (
                      <div key={i} className="text-[10px] font-mono text-ivory-muted leading-[20px]">{i + 1}</div>
                    ))}
                  </div>
                  <div className="flex-1 overflow-x-auto">
                    <pre className="latex-code leading-5">
                      {latexCode.split('\n').map((line, i) => (
                        <div key={i} className={`hover:bg-ink-800/40 px-1 rounded ${
                          line.startsWith('%') ? 'text-ivory-muted' :
                          line.startsWith('\\section') ? 'text-gold' :
                          line.startsWith('\\') ? 'text-jade/90' :
                          'text-ivory-muted'
                        }`}>
                          {line || ' '}
                        </div>
                      ))}
                    </pre>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="preview-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex-1 overflow-hidden flex items-center justify-center bg-ink-900">
                {pdfUrl ? (
                  <iframe src={pdfUrl} className="w-full h-full border-0" title="PDF Preview" />
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-ink-800 border border-ink-700 flex items-center justify-center mx-auto mb-4">
                      <Eye size={24} className="text-ivory-muted" />
                    </div>
                    <p className="text-ivory-muted text-sm font-medium">No preview yet</p>
                    <p className="text-ivory-muted text-xs mt-1 mb-5">Click Compile to generate PDF preview</p>
                    <button onClick={handleCompile} disabled={isCompiling}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gold text-ink-950 font-semibold text-sm rounded-xl hover:bg-gold-light transition-all mx-auto disabled:opacity-50">
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