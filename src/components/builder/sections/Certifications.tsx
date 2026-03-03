// src/components/builder/sections/Certifications.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { ResumeData, CertificationItem } from '@/lib/types';

interface Props { data: ResumeData; onChange: (d: ResumeData) => void; }

const newItem = (): CertificationItem => ({ id: `cert_${Date.now()}`, text: '', credentialUrl: '' });

export default function CertificationsSection({ data, onChange }: Props) {
  const add = () => onChange({ ...data, certifications: [...data.certifications, newItem()] });

  const remove = (id: string) =>
    onChange({ ...data, certifications: data.certifications.filter(c => c.id !== id) });

  const update = (id: string, patch: Partial<CertificationItem>) =>
    onChange({ ...data, certifications: data.certifications.map(c => c.id === id ? { ...c, ...patch } : c) });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="section-label mb-0">Certifications</div>
        <button onClick={add} className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors font-medium">
          <Plus size={13} /> Add Certification
        </button>
      </div>

      <p className="text-xs text-ivory-muted mb-4 leading-relaxed">
        Each item is a bullet. Add an optional credential URL to show a [View Credential] link.
      </p>

      {data.certifications.length === 0 && (
        <div className="border border-dashed border-ink-600 rounded-xl p-8 text-center">
          <p className="text-ivory-muted text-xs mb-3">No certifications yet</p>
          <button onClick={add} className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors">
            <Plus size={12} /> Add certification
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {data.certifications.map((item, idx) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              className="border border-ink-700 rounded-xl p-3 bg-ink-800">
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-1">
                  <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Certification Text *</label>
                  <input className="input-base text-[11px]" value={item.text}
                    onChange={e => update(item.id, { text: e.target.value })}
                    placeholder={`e.g. Passed Google Analytics Certification.`} />
                </div>
                <button onClick={() => remove(item.id)}
                  className="mt-5 p-1 text-ivory-muted hover:text-crimson transition-colors flex-shrink-0">
                  <Trash2 size={12} />
                </button>
              </div>
              <div>
                <label className="text-[10px] text-ivory-muted uppercase tracking-wider mb-1 block">Credential URL (optional)</label>
                <input className="input-base text-[11px]" value={item.credentialUrl}
                  onChange={e => update(item.id, { credentialUrl: e.target.value })}
                  placeholder="https://skillshop.credential.net/..." />
                <p className="text-[9px] font-mono text-ink-500 mt-1">Leave blank to omit [View Credential] link</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
