// src/hooks/useMaster.ts
// Reads the user's Master résumé (the canonical superset) and writes
// project/certification additions into it. Each mutation re-fetches the master
// first (to limit races with the builder) then PATCHes /resumes/{id}. Adding an
// entry also ensures its section is present in section_config so it renders.

'use client';

import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import {
  ResumeData, ProjectEntry, CertificationItem, SectionConfig,
} from '@/lib/types';

interface ResumeRecord {
  id: string;
  name: string;
  is_master: boolean;
  resume_data: ResumeData;
  section_config: SectionConfig[];
  created_at: string;
  updated_at: string;
}

const rid = (prefix: string): string =>
  `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;

const ensureSection = (cfg: SectionConfig[], id: string, label: string): SectionConfig[] =>
  cfg.some((s) => s.id === id) ? cfg : [...cfg, { id, label }];

export function useMaster() {
  const { user } = useAuth();
  const [master, setMaster] = useState<ResumeRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const reload = useCallback(async () => {
    if (!user) { setMaster(null); setLoading(false); return; }
    setLoading(true);
    try {
      const all = await api<ResumeRecord[]>('/resumes');
      setMaster(all.find((r) => r.is_master) ?? null);
    } catch (err) {
      console.error('useMaster load:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { reload(); }, [reload]);

  // Re-fetch the master, derive the next (resume_data, section_config), PATCH it.
  const patchRecord = useCallback(async (
    mutate: (rec: ResumeRecord) => { resume_data: ResumeData; section_config: SectionConfig[] },
  ): Promise<ResumeRecord> => {
    setSaving(true);
    try {
      const all = await api<ResumeRecord[]>('/resumes');
      const m = all.find((r) => r.is_master);
      if (!m) throw new Error('No master resume found.');
      const { resume_data, section_config } = mutate(m);
      const updated = await api<ResumeRecord>(`/resumes/${m.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ resume_data, section_config }),
      });
      setMaster(updated);
      return updated;
    } finally {
      setSaving(false);
    }
  }, []);

  const addProject = useCallback((p: Omit<ProjectEntry, 'id'>) =>
    patchRecord((m) => ({
      resume_data: { ...m.resume_data, projects: [...(m.resume_data.projects ?? []), { ...p, id: rid('proj') }] },
      section_config: ensureSection(m.section_config, 'projects', 'Projects'),
    })), [patchRecord]);

  const removeProjectByUrl = useCallback((githubUrl: string) =>
    patchRecord((m) => ({
      resume_data: { ...m.resume_data, projects: (m.resume_data.projects ?? []).filter((p) => p.githubUrl !== githubUrl) },
      section_config: m.section_config,
    })), [patchRecord]);

  const addCertification = useCallback((text: string, credentialUrl: string) =>
    patchRecord((m) => ({
      resume_data: {
        ...m.resume_data,
        certifications: [...(m.resume_data.certifications ?? []), { id: rid('cert'), text, credentialUrl } as CertificationItem],
      },
      section_config: ensureSection(m.section_config, 'certifications', 'Certifications'),
    })), [patchRecord]);

  const removeCertification = useCallback((id: string) =>
    patchRecord((m) => ({
      resume_data: { ...m.resume_data, certifications: (m.resume_data.certifications ?? []).filter((c) => c.id !== id) },
      section_config: m.section_config,
    })), [patchRecord]);

  const removeProjectById = useCallback((id: string) =>
    patchRecord((m) => ({
      resume_data: { ...m.resume_data, projects: (m.resume_data.projects ?? []).filter((p) => p.id !== id) },
      section_config: m.section_config,
    })), [patchRecord]);

  return {
    master, loading, saving, reload,
    addProject, removeProjectByUrl, removeProjectById,
    addCertification, removeCertification,
  };
}
