// src/hooks/useResumes.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { ResumeData, SectionConfig } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

export interface ResumeRecord {
  id: string;
  name: string;
  is_master: boolean;
  resume_data: ResumeData;
  section_config: SectionConfig[];
  created_at: string;
  updated_at: string;
}

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export function useResumes() {
  const { user } = useAuth();

  const [resumes, setResumes]           = useState<ResumeRecord[]>([]);
  const [activeResume, setActiveResume] = useState<ResumeRecord | null>(null);
  const [loading, setLoading]           = useState(true);
  const [saveStatus, setSaveStatus]     = useState<SaveStatus>('idle');

  // ── Load the user's resumes ────────────────────────────────────────────────
  // The master is created server-side at signup, so the client only fetches.
  useEffect(() => {
    if (!user) {
      setResumes([]);
      setActiveResume(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await api<ResumeRecord[]>('/resumes');
        if (cancelled) return;
        setResumes(data);
        setActiveResume(data.find(r => r.is_master) ?? data[0] ?? null);
      } catch (err) {
        if (!cancelled) console.error('fetchResumes:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [user]);

  // ── Save (update) a resume ─────────────────────────────────────────────────
  const save = useCallback(async (
    id: string,
    resumeData: ResumeData,
    sectionConfig: SectionConfig[],
  ) => {
    setSaveStatus('saving');
    try {
      const updated = await api<ResumeRecord>(`/resumes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ resume_data: resumeData, section_config: sectionConfig }),
      });
      setResumes(prev => prev.map(r =>
        r.id === id
          ? { ...r, resume_data: updated.resume_data, section_config: updated.section_config, updated_at: updated.updated_at }
          : r
      ));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      console.error('save:', err);
      setSaveStatus('error');
    }
  }, []);

  // ── Rename a resume ────────────────────────────────────────────────────────
  const rename = useCallback(async (id: string, name: string) => {
    try {
      const updated = await api<ResumeRecord>(`/resumes/${id}/name`, {
        method: 'PATCH',
        body: JSON.stringify({ name }),
      });
      setResumes(prev => prev.map(r => r.id === id ? { ...r, name: updated.name } : r));
      setActiveResume(prev => prev?.id === id ? { ...prev, name: updated.name } : prev);
    } catch (err) {
      console.error('rename:', err);
    }
  }, []);

  // ── Fork from master (create a new version) ────────────────────────────────
  const forkFromMaster = useCallback(async (versionName: string): Promise<ResumeRecord | null> => {
    try {
      const created = await api<ResumeRecord>('/resumes/fork', {
        method: 'POST',
        body: JSON.stringify({ name: versionName }),
      });
      setResumes(prev => [...prev, created]);
      setActiveResume(created);
      return created;
    } catch (err) {
      console.error('fork:', err);
      return null;
    }
  }, []);

  // ── Restore this version to match master ───────────────────────────────────
  const restoreToMaster = useCallback(async (id: string) => {
    try {
      const updated = await api<ResumeRecord>(`/resumes/${id}/restore-from-master`, {
        method: 'POST',
      });
      setResumes(prev => prev.map(r =>
        r.id === id
          ? { ...r, resume_data: updated.resume_data, section_config: updated.section_config, updated_at: updated.updated_at }
          : r
      ));
      setActiveResume(prev =>
        prev?.id === id
          ? { ...prev, resume_data: updated.resume_data, section_config: updated.section_config }
          : prev
      );
    } catch (err) {
      console.error('restore:', err);
    }
  }, []);

  // ── Delete a version (master cannot be deleted) ────────────────────────────
  const deleteResume = useCallback(async (id: string) => {
    const target = resumes.find(r => r.id === id);
    if (!target || target.is_master) return;

    try {
      await api(`/resumes/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('delete:', err);
      return;
    }

    const remaining = resumes.filter(r => r.id !== id);
    setResumes(remaining);
    if (activeResume?.id === id) {
      setActiveResume(remaining.find(r => r.is_master) ?? remaining[0] ?? null);
    }
  }, [resumes, activeResume]);

  // ── Switch active resume (local only) ──────────────────────────────────────
  const switchTo = useCallback((id: string) => {
    const found = resumes.find(r => r.id === id);
    if (found) setActiveResume(found);
  }, [resumes]);

  return {
    resumes, activeResume, loading, saveStatus,
    save, rename, forkFromMaster, restoreToMaster, deleteResume, switchTo,
  };
}
