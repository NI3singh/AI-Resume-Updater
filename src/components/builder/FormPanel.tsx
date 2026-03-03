// src/components/builder/FormPanel.tsx
'use client';

import { useState, useRef } from 'react';
import { Reorder, motion, AnimatePresence } from 'framer-motion';
import {
  User, Briefcase, GraduationCap, Code2, FolderGit2,
  Trophy, Award, BookOpen, Activity,
  GripVertical, Pencil, Trash2, Plus, Check, X, RotateCcw,
} from 'lucide-react';
import { ResumeData, ActiveSection, SectionConfig, ALL_SECTIONS } from '@/lib/types';
import PersonalInfoSection    from './sections/PersonalInfo';
import EducationSection       from './sections/Education';
import SkillsSection          from './sections/Skills';
import ProjectsSection        from './sections/Projects';
import ExperienceSection      from './sections/Experience';
import ExtracurricularSection from './sections/Extracurricular';
import AchievementsSection    from './sections/Achievements';
import CertificationsSection  from './sections/Certifications';
import PublicationsSection    from './sections/Publications';

interface FormPanelProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  activeSection: ActiveSection;
  onSectionChange: (s: ActiveSection) => void;
  sectionConfig: SectionConfig[];
  onSectionConfigChange: (config: SectionConfig[]) => void;
}

const SECTION_ICONS: Record<string, React.ElementType> = {
  personal:        User,
  education:       GraduationCap,
  skills:          Code2,
  projects:        FolderGit2,
  experience:      Briefcase,
  extracurricular: Activity,
  achievements:    Trophy,
  certifications:  Award,
  publications:    BookOpen,
};

const getCompleteness = (data: ResumeData, id: ActiveSection): number => {
  switch (id) {
    case 'personal':       return Math.round((Object.values(data.personal).filter(Boolean).length / 7) * 100);
    case 'education':      return data.education.length > 0 ? 100 : 0;
    case 'skills':         return data.skills.length > 0 ? 100 : 0;
    case 'projects':       return data.projects.length > 0 ? 100 : 0;
    case 'experience':     return data.experience.length > 0 ? 100 : 0;
    case 'extracurricular':return data.extracurricular.length > 0 ? 100 : 0;
    case 'achievements':   return data.achievements.length > 0 ? 100 : 0;
    case 'certifications': return data.certifications.length > 0 ? 100 : 0;
    case 'publications':   return data.publications.length > 0 ? 100 : 0;
    default: return 0;
  }
};

// ── Single reorderable section row ──────────────────────────────────────────
function SectionRow({
  section, isActive, data,
  onSelect, onDelete, onRename,
}: {
  section: SectionConfig;
  isActive: boolean;
  data: ResumeData;
  onSelect: () => void;
  onDelete: () => void;
  onRename: (label: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft]     = useState(section.label);
  const inputRef = useRef<HTMLInputElement>(null);
  const Icon = SECTION_ICONS[section.id] || Code2;
  const pct  = getCompleteness(data, section.id);

  const startEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDraft(section.label);
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const commitEdit = () => {
    const trimmed = draft.trim();
    if (trimmed) onRename(trimmed);
    setEditing(false);
  };

  const cancelEdit = () => {
    setDraft(section.label);
    setEditing(false);
  };

  return (
    <Reorder.Item
      value={section}
      dragListener={!editing}
      className={`group flex items-center gap-1.5 px-2 py-2 rounded-lg border transition-all duration-150 cursor-pointer select-none ${
        isActive
          ? 'bg-gold/10 border-gold/30'
          : 'hover:bg-ink-700/60 border-transparent'
      }`}
      whileDrag={{ scale: 1.02, boxShadow: '0 4px 20px rgba(0,0,0,0.4)', zIndex: 50 }}
    >
      {/* Drag handle */}
      <div className="flex-shrink-0 cursor-grab active:cursor-grabbing p-0.5 text-ivory-muted hover:text-ivory transition-colors">
        <GripVertical size={13} />
      </div>

      {/* Icon + Label */}
      <div className="flex items-center gap-2 flex-1 min-w-0" onClick={onSelect}>
        <Icon size={13} className={isActive ? 'text-gold flex-shrink-0' : 'text-ivory-muted flex-shrink-0 group-hover:text-ivory'} />

        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') commitEdit(); if (e.key === 'Escape') cancelEdit(); }}
            onBlur={commitEdit}
            onClick={e => e.stopPropagation()}
            className="flex-1 min-w-0 bg-ink-700 border border-gold/40 rounded px-1.5 py-0.5 text-xs text-ivory focus:outline-none focus:ring-1 focus:ring-gold/40"
          />
        ) : (
          <span className={`text-xs font-medium truncate ${isActive ? 'text-ivory' : 'text-ivory-muted group-hover:text-ivory'}`}>
            {section.label}
          </span>
        )}
      </div>

      {/* Right side — completion dot + action buttons */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {/* Completion dot — hidden when hovering to show action buttons */}
        {!editing && (
          <div className="group-hover:hidden flex items-center">
            {pct === 100 && <div className="w-1.5 h-1.5 rounded-full bg-jade" />}
            {pct > 0 && pct < 100 && <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />}
          </div>
        )}

        {/* Action buttons — shown on hover or while editing */}
        {editing ? (
          <div className="flex items-center gap-0.5">
            <button onMouseDown={e => { e.preventDefault(); commitEdit(); }}
              className="p-1 text-jade hover:text-jade transition-colors">
              <Check size={11} />
            </button>
            <button onMouseDown={e => { e.preventDefault(); cancelEdit(); }}
              className="p-1 text-crimson/70 hover:text-crimson transition-colors">
              <X size={11} />
            </button>
          </div>
        ) : (
          <div className="hidden group-hover:flex items-center gap-0.5">
            <button onClick={startEdit}
              className="p-1 text-ivory-muted hover:text-ivory transition-colors"
              title="Rename section">
              <Pencil size={11} />
            </button>
            <button onClick={e => { e.stopPropagation(); onDelete(); }}
              className="p-1 text-ivory-muted hover:text-crimson transition-colors"
              title="Remove section from resume">
              <Trash2 size={11} />
            </button>
          </div>
        )}
      </div>
    </Reorder.Item>
  );
}

// ── Main FormPanel ───────────────────────────────────────────────────────────
export default function FormPanel({
  data, onChange,
  activeSection, onSectionChange,
  sectionConfig, onSectionConfigChange,
}: FormPanelProps) {
  const [showAddMenu, setShowAddMenu] = useState(false);

  // Sections not currently in config (available to re-add)
  const removedSections = ALL_SECTIONS.filter(
    s => !sectionConfig.find(c => c.id === s.id)
  );

  const handleDelete = (id: SectionConfig['id']) => {
    onSectionConfigChange(sectionConfig.filter(s => s.id !== id));
    // If the deleted section was active, fall back to personal
    if (activeSection === id) onSectionChange('personal');
  };

  const handleRename = (id: SectionConfig['id'], label: string) => {
    onSectionConfigChange(sectionConfig.map(s => s.id === id ? { ...s, label } : s));
  };

  const handleAdd = (section: SectionConfig) => {
    onSectionConfigChange([...sectionConfig, section]);
    setShowAddMenu(false);
  };

  const handleRestore = () => {
    onSectionConfigChange(ALL_SECTIONS);
    setShowAddMenu(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Section Nav */}
      <div className="px-3 pt-4 pb-0 flex-shrink-0">
        <div className="section-label mb-2">Sections</div>

        {/* Personal — fixed, not reorderable */}
        <button
          onClick={() => onSectionChange('personal')}
          className={`w-full flex items-center justify-between px-2 py-2 rounded-lg border mb-0.5 transition-all duration-150 ${
            activeSection === 'personal'
              ? 'bg-gold/10 border-gold/30'
              : 'hover:bg-ink-700/60 border-transparent'
          }`}
        >
          <div className="flex items-center gap-2">
            <User size={13} className={activeSection === 'personal' ? 'text-gold' : 'text-ivory-muted'} />
            <span className={`text-xs font-medium ${activeSection === 'personal' ? 'text-ivory' : 'text-ivory-muted'}`}>
              Personal
            </span>
          </div>
          <div className="flex items-center gap-1">
            {getCompleteness(data, 'personal') === 100 && <div className="w-1.5 h-1.5 rounded-full bg-jade" />}
            {getCompleteness(data, 'personal') > 0 && getCompleteness(data, 'personal') < 100 && <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />}
            <span className="text-[9px] font-mono text-ivory-muted ml-1">fixed</span>
          </div>
        </button>

        {/* Reorderable body sections */}
        <Reorder.Group
          axis="y"
          values={sectionConfig}
          onReorder={onSectionConfigChange}
          className="flex flex-col gap-0.5"
        >
          {sectionConfig.map(section => (
            <SectionRow
              key={section.id}
              section={section}
              isActive={activeSection === section.id}
              data={data}
              onSelect={() => onSectionChange(section.id)}
              onDelete={() => handleDelete(section.id)}
              onRename={(label) => handleRename(section.id, label)}
            />
          ))}
        </Reorder.Group>

        {/* Add removed sections back */}
        <div className="relative mt-1.5">
          {removedSections.length > 0 && (
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="w-full flex items-center gap-1.5 px-2 py-1.5 text-[10px] text-ivory-muted hover:text-ivory border border-dashed border-ink-600 hover:border-ink-500 rounded-lg transition-all"
            >
              <Plus size={10} />
              Add removed section back
            </button>
          )}

          <AnimatePresence>
            {showAddMenu && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 top-full mt-1 bg-ink-800 border border-ink-600 rounded-xl shadow-xl overflow-hidden z-50"
              >
                {removedSections.map(s => {
                  const Icon = SECTION_ICONS[s.id] || Code2;
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleAdd(s)}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-ink-700 transition-colors text-left"
                    >
                      <Icon size={13} className="text-ivory-muted flex-shrink-0" />
                      <span className="text-xs text-ivory-muted">{s.label}</span>
                    </button>
                  );
                })}
                {/* Restore all */}
                <div className="border-t border-ink-700">
                  <button
                    onClick={handleRestore}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-ink-700 transition-colors"
                  >
                    <RotateCcw size={11} className="text-gold flex-shrink-0" />
                    <span className="text-xs text-gold">Restore all sections</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-px bg-ink-700 my-3" />
      </div>

      {/* Section Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeSection === 'personal'        && <PersonalInfoSection    data={data} onChange={onChange} />}
            {activeSection === 'education'       && <EducationSection       data={data} onChange={onChange} />}
            {activeSection === 'skills'          && <SkillsSection          data={data} onChange={onChange} />}
            {activeSection === 'projects'        && <ProjectsSection        data={data} onChange={onChange} />}
            {activeSection === 'experience'      && <ExperienceSection      data={data} onChange={onChange} />}
            {activeSection === 'extracurricular' && <ExtracurricularSection data={data} onChange={onChange} />}
            {activeSection === 'achievements'    && <AchievementsSection    data={data} onChange={onChange} />}
            {activeSection === 'certifications'  && <CertificationsSection  data={data} onChange={onChange} />}
            {activeSection === 'publications'    && <PublicationsSection    data={data} onChange={onChange} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}