// src/components/builder/sections/PersonalInfo.tsx
'use client';

import { ResumeData } from '@/lib/types';

interface Props { data: ResumeData; onChange: (d: ResumeData) => void; }

const Field = ({ label, value, onChange, placeholder, type = 'text', hint }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; hint?: string;
}) => (
  <div className="mb-4">
    <label className="text-[10px] font-semibold uppercase tracking-wider text-ivory-muted mb-1.5 block">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="input-base"
    />
    {hint && <p className="text-[10px] text-ivory-muted mt-1 font-mono">{hint}</p>}
  </div>
);

export default function PersonalInfoSection({ data, onChange }: Props) {
  const update = (key: keyof typeof data.personal, value: string) => {
    onChange({ ...data, personal: { ...data.personal, [key]: value } });
  };

  return (
    <div>
      <div className="section-label">Personal Information</div>
      <Field label="Full Name" value={data.personal.name} onChange={(v) => update('name', v)} placeholder="Alex Johnson" />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Email" value={data.personal.email} onChange={(v) => update('email', v)} placeholder="alex@email.com" type="email" />
        <Field label="Phone" value={data.personal.phone} onChange={(v) => update('phone', v)} placeholder="+1 555 0192" />
      </div>
      <Field label="Location" value={data.personal.location} onChange={(v) => update('location', v)} placeholder="San Francisco, CA" />
      <div className="h-px bg-ink-700 my-4" />
      <div className="section-label">Online Presence</div>
      <Field label="LinkedIn Username" value={data.personal.linkedin} onChange={(v) => update('linkedin', v)} placeholder="alexjohnson" hint="linkedin.com/in/alexjohnson" />
      <Field label="GitHub Username" value={data.personal.github} onChange={(v) => update('github', v)} placeholder="alexjohnson" hint="github.com/alexjohnson" />
      <Field label="Portfolio / Website" value={data.personal.website} onChange={(v) => update('website', v)} placeholder="https://alexjohnson.dev" type="url" />
    </div>
  );
}
