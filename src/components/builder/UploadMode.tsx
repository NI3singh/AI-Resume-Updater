// src/components/builder/UploadMode.tsx
'use client';

import { useState, useRef, DragEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Loader2, CheckCircle, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { ResumeData } from '@/lib/types';
import { extractTextFromFile, parseResumeWithAI } from '@/lib/resumeParser';

interface UploadModeProps {
  onParsed: (data: ResumeData) => void;
}

type UploadState = 'idle' | 'dragging' | 'extracting' | 'parsing' | 'done' | 'error';

export default function UploadMode({ onParsed }: UploadModeProps) {
  const [state, setState] = useState<UploadState>('idle');
  const [fileName, setFileName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file) return;
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!allowed.includes(file.type)) {
      setErrorMsg('Please upload a PDF, DOCX, or TXT file');
      setState('error');
      return;
    }

    setFileName(file.name);
    setState('extracting');
    setProgress(20);

    try {
      const text = await extractTextFromFile(file);
      setProgress(50);
      setState('parsing');

      const data = await parseResumeWithAI(text);
      setProgress(100);
      setState('done');

      setTimeout(() => {
        onParsed(data);
      }, 1000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to process file');
      setState('error');
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setState('idle');
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const reset = () => {
    setState('idle');
    setFileName('');
    setErrorMsg('');
    setProgress(0);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="p-5 h-full flex flex-col">
      <div className="section-label">Upload Resume</div>
      <p className="text-xs text-ivory-muted mb-5 leading-relaxed">
        Upload your existing PDF or DOCX resume. AI will extract all information and map it to the template fields automatically.
      </p>

      <AnimatePresence mode="wait">
        {state === 'idle' || state === 'dragging' ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`dropzone ${state === 'dragging' ? 'drag-over' : ''} rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer min-h-[240px] transition-all`}
            onDragOver={(e) => { e.preventDefault(); setState('dragging'); }}
            onDragLeave={() => setState('idle')}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
          >
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="w-14 h-14 rounded-2xl bg-ink-800 border border-ink-600 flex items-center justify-center mb-4 group-hover:border-gold/30">
              <Upload size={22} className={state === 'dragging' ? 'text-gold' : 'text-ivory-muted'} />
            </div>
            <p className="text-ivory text-sm font-medium mb-1 text-center">
              {state === 'dragging' ? 'Drop it here!' : 'Drag & drop your resume'}
            </p>
            <p className="text-ivory-muted text-xs text-center">or click to browse</p>
            <div className="flex items-center gap-2 mt-5">
              {['PDF', 'DOCX', 'TXT'].map(fmt => (
                <span key={fmt} className="px-2 py-0.5 text-[10px] font-mono rounded border border-ink-600 text-ivory-muted">
                  {fmt}
                </span>
              ))}
            </div>
          </motion.div>
        ) : state === 'extracting' || state === 'parsing' ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[240px] gap-4"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                {state === 'extracting'
                  ? <FileText size={24} className="text-gold" />
                  : <Sparkles size={24} className="text-gold animate-pulse" />
                }
              </div>
              <Loader2 size={48} className="absolute inset-0 m-auto text-gold/20 animate-spin" style={{ width: 56, height: 56, top: -4, left: -4 }} />
            </div>
            <div className="text-center">
              <p className="text-ivory text-sm font-medium mb-1">
                {state === 'extracting' ? 'Extracting text...' : 'AI is parsing resume...'}
              </p>
              <p className="text-ivory-muted text-xs">{fileName}</p>
            </div>
            {/* Progress bar */}
            <div className="w-full max-w-[200px] h-1 bg-ink-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <p className="text-[10px] font-mono text-ivory-muted">
              {state === 'extracting' ? 'Reading file content' : 'Mapping fields to template'}
            </p>
          </motion.div>
        ) : state === 'done' ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-[240px] gap-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-jade/10 border border-jade/30 flex items-center justify-center">
              <CheckCircle size={28} className="text-jade" />
            </div>
            <div className="text-center">
              <p className="text-ivory text-sm font-medium mb-1">Extracted Successfully!</p>
              <p className="text-ivory-muted text-xs">Switching to editor...</p>
            </div>
            <div className="flex items-center gap-1.5 text-jade text-xs font-mono">
              <ArrowRight size={12} />
              Opening form editor
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[240px] gap-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-crimson/10 border border-crimson/30 flex items-center justify-center">
              <AlertCircle size={28} className="text-crimson" />
            </div>
            <div className="text-center">
              <p className="text-ivory text-sm font-medium mb-1">Something went wrong</p>
              <p className="text-ivory-muted text-xs max-w-[220px] text-center">{errorMsg}</p>
            </div>
            <button
              onClick={reset}
              className="px-4 py-2 text-xs border border-ink-600 text-ivory-muted rounded-lg hover:border-ivory/30 hover:text-ivory transition-all"
            >
              Try again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* How it works */}
      <div className="mt-6 pt-5 border-t border-ink-700">
        <div className="section-label mb-3">How AI Extraction Works</div>
        {[
          ['1', 'Your file text is extracted (PDF/DOCX)'],
          ['2', 'Claude AI reads and structures the data'],
          ['3', 'All fields are mapped to your template'],
          ['4', 'Review & edit before compiling'],
        ].map(([n, text]) => (
          <div key={n} className="flex items-start gap-3 mb-2.5">
            <span className="w-4 h-4 rounded text-[9px] font-mono bg-ink-700 flex items-center justify-center text-gold flex-shrink-0 mt-0.5">{n}</span>
            <p className="text-xs text-ivory-muted">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
