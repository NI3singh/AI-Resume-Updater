// src/components/ui/Spinner.tsx
'use client';

import { useId } from 'react';
import { LAMBDA_PATH, LogoMark } from './Logo';

/**
 * The one loading indicator for the whole app, in three tiers:
 *
 *   <Spinner size={14} />                       — inside buttons / status chips
 *   <Spinner size={40} label="Compiling…" />    — panel-level waits (λ core appears at ≥36px)
 *   <PageLoader label="Loading your resumes…"/> — full-screen route/auth/data loads
 *
 * Design: a gold arc orbiting a quiet track (the track uses --ink-600 so it
 * adapts to light/dark). From 36px up, the brand λ pulses at the center —
 * the same glyph as the logo, so waiting still looks like ResumeTeX.
 * Reduced-motion users get a slowed spin rather than a frozen one.
 */

const SPIN = 'animate-spin motion-reduce:[animation-duration:2.5s]';

interface SpinnerProps {
  /** Diameter in px. */
  size?: number;
  className?: string;
  /** Optional caption rendered under the spinner. */
  label?: string;
  /**
   * 'gold' (default) — brand gold arc, for dark/neutral surfaces.
   * 'current' — arc follows the text color; use inside gold surfaces
   * (e.g. .btn-primary) where a gold arc would be invisible.
   */
  tone?: 'gold' | 'current';
}

export function Spinner({ size = 16, className = '', label, tone = 'gold' }: SpinnerProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const arcId = `sp-arc-${uid}`;
  const showCore = size >= 36;
  const onCurrent = tone === 'current';

  const ring = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${SPIN} ${!showCore && !label ? className : ''}`}
      aria-hidden="true"
    >
      {!onCurrent && (
        <defs>
          <linearGradient id={arcId} x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E8CC7E" />
            <stop offset="1" stopColor="#C9A84C" />
          </linearGradient>
        </defs>
      )}
      {/* track — theme-aware */}
      <circle
        cx="12" cy="12" r="9.5" fill="none"
        stroke={onCurrent ? 'currentColor' : 'var(--ink-600)'}
        strokeOpacity={onCurrent ? 0.25 : 0.55}
        strokeWidth="2.5"
      />
      {/* arc */}
      <circle
        cx="12" cy="12" r="9.5" fill="none"
        stroke={onCurrent ? 'currentColor' : `url(#${arcId})`} strokeWidth="2.5"
        strokeLinecap="round" strokeDasharray="16 44"
      />
    </svg>
  );

  // Tiny inline use (buttons, chips): just the ring, no wrapper.
  if (!showCore && !label) return ring;

  return (
    <span
      role="status"
      aria-label={label ?? 'Loading'}
      className={`inline-flex flex-col items-center gap-2.5 ${className}`}
    >
      <span className="relative inline-flex" style={{ width: size, height: size }}>
        {ring}
        {showCore && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 h-full w-full animate-pulse"
            aria-hidden="true"
          >
            <path
              d={LAMBDA_PATH}
              fill="none"
              stroke="#C9A84C"
              strokeWidth="2.4"
              strokeLinecap="round"
              transform="translate(4.9 4.8) scale(0.585)"
            />
          </svg>
        )}
      </span>
      {label && (
        <span className="text-xs" style={{ color: 'var(--ivory-dim)' }}>
          {label}
        </span>
      )}
    </span>
  );
}

interface PageLoaderProps {
  label?: string;
  className?: string;
}

/**
 * Full-screen brand loader: the badge with a gold arc orbiting it.
 * Replaces every full-page Loader2 screen (auth bootstrap, resume fetch,
 * Suspense fallbacks).
 */
export function PageLoader({ label = 'Loading…', className = '' }: PageLoaderProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={`min-h-screen w-full bg-ink-950 flex items-center justify-center ${className}`}
    >
      <div className="text-center">
        <div className="relative mx-auto mb-5" style={{ width: 84, height: 84 }}>
          {/* soft brand glow */}
          <span className="absolute inset-3 rounded-2xl bg-gold/10 blur-md" />
          {/* orbiting arc */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 h-full w-full animate-[spin_1.4s_linear_infinite] motion-reduce:[animation-duration:3s]"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="11" stroke="var(--ink-600)" strokeOpacity="0.5" strokeWidth="0.8" />
            <circle
              cx="12" cy="12" r="11"
              stroke="#C9A84C" strokeWidth="0.9"
              strokeLinecap="round" strokeDasharray="18 51.1"
            />
          </svg>
          {/* the badge, steady at the center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <LogoMark size={46} />
          </div>
        </div>
        <p className="text-sm" style={{ color: 'var(--ivory-dim)' }}>{label}</p>
      </div>
    </div>
  );
}
