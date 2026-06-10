// src/components/ui/Logo.tsx
'use client';

import { useId } from 'react';

/**
 * The λ glyph, drawn as a path (24×24 design space) so it renders identically
 * everywhere — favicon, logo, spinner — without depending on webfont loading.
 * Two calligraphic strokes: entry-hook + long diagonal, and the curved leg.
 * Shared with <Spinner /> so the loading state is unmistakably the brand.
 */
export const LAMBDA_PATH =
  'M7 5.1c2-.7 3.5.2 4.4 2.2L17.4 19.6M13.3 11.6c-1.5 2.9-3.6 5.6-6.5 8';

interface LogoMarkProps {
  /** Rendered size in px (the mark is square). */
  size?: number;
  className?: string;
  title?: string;
}

/**
 * The mark: an ink badge with a gold hairline, the λ set above a typeset
 * baseline rule that ends in a period — a line of type, mid-compile.
 * Self-contained (always dark inside), so it works on both themes.
 */
export function LogoMark({ size = 32, className = '', title }: LogoMarkProps) {
  // useId can contain ':' which breaks url(#...) references — strip it.
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const bg = `lm-bg-${uid}`;
  const gold = `lm-gold-${uid}`;
  const glow = `lm-glow-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#20202B" />
          <stop offset="1" stopColor="#0A0A0E" />
        </linearGradient>
        <linearGradient id={gold} x1="10" y1="6" x2="38" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E8CC7E" />
          <stop offset="0.5" stopColor="#C9A84C" />
          <stop offset="1" stopColor="#9A7826" />
        </linearGradient>
        <radialGradient id={glow} cx="24" cy="19" r="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C9A84C" stopOpacity="0.2" />
          <stop offset="1" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Badge — fill-only shapes need stroke="none": globals.css sets
          `svg { stroke: currentColor }` (for Lucide icons) and that inherits
          into any shape without its own stroke, drawing white outlines. */}
      <rect x="1.5" y="1.5" width="45" height="45" rx="12.5" fill={`url(#${bg})`} stroke="none" />
      <rect
        x="1.5" y="1.5" width="45" height="45" rx="12.5"
        fill="none" stroke={`url(#${gold})`} strokeOpacity="0.85" strokeWidth="1.5"
      />
      <circle cx="24" cy="19" r="16" fill={`url(#${glow})`} stroke="none" />

      {/* λ */}
      <g transform="translate(8.9 5.1) scale(1.25)">
        <path d={LAMBDA_PATH} fill="none" stroke={`url(#${gold})`} strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Typeset baseline + end period */}
      <path d="M13 35.5h16.5" fill="none" stroke={`url(#${gold})`} strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="33.2" cy="35.5" r="1.6" fill={`url(#${gold})`} stroke="none" />
    </svg>
  );
}

interface LogoProps {
  /** Mark size in px; the wordmark scales with it. */
  size?: number;
  /** Hide the wordmark to show only the mark. */
  wordmark?: boolean;
  className?: string;
}

/**
 * Full lockup: mark + "ResumeTeX" with the genuine TeX treatment —
 * the E dropped below the baseline, as in the TeX logo itself.
 * "Resume" follows the theme (ivory/ink); "TeX" stays gold.
 */
export default function Logo({ size = 30, wordmark = true, className = '' }: LogoProps) {
  const fontSize = Math.round(size * 0.62);
  return (
    <span className={`inline-flex items-center gap-2 select-none ${className}`}>
      <LogoMark size={size} />
      {wordmark && (
        <span
          className="font-display font-bold tracking-tight leading-none whitespace-nowrap"
          style={{ fontSize, color: 'var(--ivory)' }}
        >
          Resume
          <span className="text-gold">
            T
            <span
              className="inline-block"
              style={{ transform: 'translateY(0.18em)', fontSize: '0.82em' }}
            >
              E
            </span>
            X
          </span>
        </span>
      )}
    </span>
  );
}
