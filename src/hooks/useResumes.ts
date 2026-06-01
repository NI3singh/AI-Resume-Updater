// src/hooks/useResumes.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { api, ApiError } from '@/lib/api';
import { ResumeData, SectionConfig } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

export interface ResumeRecord {
  id: string;
  user_id: string;
  name: string;
  is_master: boolean;
  resume_data: ResumeData;
  section_config: SectionConfig[];
  created_at: string;
  updated_at: string;
}

interface ResumesResponse {
  resumes: ResumeRecord[];
}

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export function useResumes() {
  const { user } = useAuth();

  const [resumes, setResumes]         = useState<ResumeRecord[]>([]);
  const [activeResume, setActiveResume] = useState<ResumeRecord | null>(null);
  const [loading, setLoading]         = useState(true);
  const [saveStatus, setSaveStatus]   = useState<SaveStatus>('idle');

  // ── Load all resumes (master + versions) for the signed-in user ──────────────
  useEffect(() => {
    if (!user) {
      setResumes([]);
      setActiveResume(null);
      setLoading(false);
      setSaveStatus('idle');
      return;
    }

    let cancelled = false;
    setLoading(true);
    setSaveStatus('idle');

    api<ResumesResponse>('/resumes')
      .then((res) => {
        if (cancelled) return;
        const records = res.resumes;
        setResumes(records);
        setActiveResume(records.find((r) => r.is_master) ?? records[0] ?? null);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('fetchResumes:', err instanceof ApiError ? err.message : err);
        setResumes([]);
        setActiveResume(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [user?.id]);

  // ── Helper: replace a record everywhere it lives in state ────────────────────
  const applyRecord = useCallback((updated: ResumeRecord) => {
    setResumes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    setActiveResume((prev) => (prev?.id === updated.id ? updated : prev));
  }, []);

  const save = useCallback(async (
    id: string,
    resumeData: ResumeData,
    sectionConfig: SectionConfig[]
  ) => {
    if (!user) return;

    setSaveStatus('saving');
    try {
      const updated = await api<ResumeRecord>(`/resumes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ resume_data: resumeData, section_config: sectionConfig }),
      });
      applyRecord(updated);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      console.error('save:', err instanceof ApiError ? err.message : err);
      setSaveStatus('error');
    }
  }, [user, applyRecord]);

  const rename = useCallback(async (id: string, name: string) => {
    if (!user) return;
    try {
      const updated = await api<ResumeRecord>(`/resumes/${id}/name`, {
        method: 'PATCH',
        body: JSON.stringify({ name }),
      });
      applyRecord(updated);
    } catch (err) {
      console.error('rename:', err instanceof ApiError ? err.message : err);
    }
  }, [user, applyRecord]);

  const forkFromMaster = useCallback(async (versionName: string) => {
    if (!user) return null;
    try {
      const created = await api<ResumeRecord>('/resumes/fork', {
        method: 'POST',
        body: JSON.stringify({ name: versionName }),
      });
      setResumes((prev) => [...prev, created]);
      setActiveResume(created);
      return created;
    } catch (err) {
      console.error('fork:', err instanceof ApiError ? err.message : err);
      return null;
    }
  }, [user]);

  const restoreToMaster = useCallback(async (id: string) => {
    if (!user) return;
    try {
      const updated = await api<ResumeRecord>(`/resumes/${id}/restore-from-master`, {
        method: 'POST',
      });
      applyRecord(updated);
    } catch (err) {
      console.error('restore:', err instanceof ApiError ? err.message : err);
    }
  }, [user, applyRecord]);

  const deleteResume = useCallback(async (id: string) => {
    if (!user) return;

    const target = resumes.find((r) => r.id === id);
    if (!target || target.is_master) return;

    try {
      await api(`/resumes/${id}`, { method: 'DELETE' });
      const remaining = resumes.filter((r) => r.id !== id);
      setResumes(remaining);
      if (activeResume?.id === id) {
        setActiveResume(remaining.find((r) => r.is_master) ?? remaining[0] ?? null);
      }
    } catch (err) {
      console.error('delete:', err instanceof ApiError ? err.message : err);
    }
  }, [user, resumes, activeResume]);

  const switchTo = useCallback((id: string) => {
    const found = resumes.find((r) => r.id === id);
    if (found) setActiveResume(found);
  }, [resumes]);

  return {
    resumes,
    activeResume,
    loading,
    saveStatus,
    save,
    rename,
    forkFromMaster,
    restoreToMaster,
    deleteResume,
    switchTo,
  };
}
