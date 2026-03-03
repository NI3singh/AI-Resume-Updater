// src/hooks/useResumes.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ResumeData, SectionConfig, defaultResumeData, ALL_SECTIONS } from '@/lib/types';
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
  const supabase = createClient();

  const [resumes, setResumes]             = useState<ResumeRecord[]>([]);
  const [activeResume, setActiveResume]   = useState<ResumeRecord | null>(null);
  const [loading, setLoading]             = useState(true);
  const [saveStatus, setSaveStatus]       = useState<SaveStatus>('idle');

  // ── Fetch all resumes for user ─────────────────────────────────────────────
  const fetchResumes = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', user.id)
      .order('is_master', { ascending: false }) // master first
      .order('created_at', { ascending: true });

    if (error) { console.error('fetchResumes:', error); return; }
    return data as ResumeRecord[];
  }, [user]);

  // ── On mount: fetch or create master ──────────────────────────────────────
  useEffect(() => {
    if (!user) return;

    (async () => {
      setLoading(true);
      let data = await fetchResumes();
      if (!data) { setLoading(false); return; }

      // If user has no master resume yet, create one from defaultResumeData
      if (!data.find(r => r.is_master)) {
        const { data: created, error } = await supabase
          .from('resumes')
          .insert({
            user_id:        user.id,
            name:           'Master Resume',
            is_master:      true,
            resume_data:    defaultResumeData,
            section_config: ALL_SECTIONS,
          })
          .select()
          .single();

        if (error) { console.error('create master:', error); setLoading(false); return; }
        data = [created as ResumeRecord, ...data];
      }

      setResumes(data);
      // Open master by default
      setActiveResume(data.find(r => r.is_master) ?? data[0]);
      setLoading(false);
    })();
  }, [user]);

  // ── Save (update) a resume ─────────────────────────────────────────────────
  const save = useCallback(async (
    id: string,
    resumeData: ResumeData,
    sectionConfig: SectionConfig[]
  ) => {
    setSaveStatus('saving');
    const { error } = await supabase
      .from('resumes')
      .update({ resume_data: resumeData, section_config: sectionConfig })
      .eq('id', id);

    if (error) { console.error('save:', error); setSaveStatus('error'); return; }

    setResumes(prev => prev.map(r =>
      r.id === id ? { ...r, resume_data: resumeData, section_config: sectionConfig } : r
    ));
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  }, []);

  // ── Rename a resume ────────────────────────────────────────────────────────
  const rename = useCallback(async (id: string, name: string) => {
    const { error } = await supabase.from('resumes').update({ name }).eq('id', id);
    if (error) { console.error('rename:', error); return; }
    setResumes(prev => prev.map(r => r.id === id ? { ...r, name } : r));
    setActiveResume(prev => prev?.id === id ? { ...prev, name } : prev);
  }, []);

  // ── Fork from master (create a new version) ────────────────────────────────
  const forkFromMaster = useCallback(async (versionName: string) => {
    if (!user) return null;
    const master = resumes.find(r => r.is_master);
    if (!master) return null;

    const { data, error } = await supabase
      .from('resumes')
      .insert({
        user_id:        user.id,
        name:           versionName,
        is_master:      false,
        resume_data:    master.resume_data,
        section_config: master.section_config,
      })
      .select()
      .single();

    if (error) { console.error('fork:', error); return null; }

    const newRecord = data as ResumeRecord;
    setResumes(prev => [...prev, newRecord]);
    setActiveResume(newRecord);
    return newRecord;
  }, [user, resumes]);

  // ── Restore this version to match master ──────────────────────────────────
  const restoreToMaster = useCallback(async (id: string) => {
    const master = resumes.find(r => r.is_master);
    if (!master) return;
    await save(id, master.resume_data, master.section_config);
    setActiveResume(prev =>
      prev?.id === id
        ? { ...prev, resume_data: master.resume_data, section_config: master.section_config }
        : prev
    );
  }, [resumes, save]);

  // ── Delete a version (master cannot be deleted) ───────────────────────────
  const deleteResume = useCallback(async (id: string) => {
    const target = resumes.find(r => r.id === id);
    if (!target || target.is_master) return;

    const { error } = await supabase.from('resumes').delete().eq('id', id);
    if (error) { console.error('delete:', error); return; }

    const remaining = resumes.filter(r => r.id !== id);
    setResumes(remaining);

    // If we deleted the active one, switch to master
    if (activeResume?.id === id) {
      setActiveResume(remaining.find(r => r.is_master) ?? remaining[0]);
    }
  }, [resumes, activeResume]);

  // ── Switch active resume ───────────────────────────────────────────────────
  const switchTo = useCallback((id: string) => {
    const found = resumes.find(r => r.id === id);
    if (found) setActiveResume(found);
  }, [resumes]);

  return {
    resumes, activeResume, loading, saveStatus,
    save, rename, forkFromMaster, restoreToMaster, deleteResume, switchTo,
  };
}