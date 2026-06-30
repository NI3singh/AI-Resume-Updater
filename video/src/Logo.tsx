import React from "react";

// The real ResumeTeX LogoMark (frontend/src/app/icon.svg), with an optional
// lambda stroke "draw-on" controlled by `draw` (0..1). `uid` keeps gradient ids
// unique when more than one logo is on screen at once (e.g. the day/night flip).
export const LogoMark: React.FC<{ size?: number; draw?: number; uid?: string }> = ({
  size = 48,
  draw = 1,
  uid = "lm",
}) => {
  const bg = `${uid}-bg`;
  const gold = `${uid}-gold`;
  const glow = `${uid}-glow`;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <stop stopColor="#C9A84C" stopOpacity="0.25" />
          <stop offset="1" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="1.5" y="1.5" width="45" height="45" rx="12.5" fill={`url(#${bg})`} />
      <rect x="1.5" y="1.5" width="45" height="45" rx="12.5" stroke={`url(#${gold})`} strokeOpacity="0.85" strokeWidth="1.5" />
      <circle cx="24" cy="19" r="16" fill={`url(#${glow})`} />
      <g transform="translate(8.9 5.1) scale(1.25)">
        <path
          d="M7 5.1c2-.7 3.5.2 4.4 2.2L17.4 19.6M13.3 11.6c-1.5 2.9-3.6 5.6-6.5 8"
          stroke={`url(#${gold})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - Math.max(0, Math.min(1, draw))}
        />
      </g>
      <path d="M13 35.5h16.5" stroke={`url(#${gold})`} strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="33.2" cy="35.5" r="1.6" fill={`url(#${gold})`} />
    </svg>
  );
};

// "Resume" + gold "TEX" wordmark, matching the app's lockup.
export const Wordmark: React.FC<{ fontFamily: string; size?: number; color?: string; tex?: string }> = ({
  fontFamily,
  size = 64,
  color = "#F5F0E8",
  tex = "#C9A84C",
}) => {
  return (
    <span style={{ fontFamily, fontWeight: 800, fontSize: size, letterSpacing: "-0.02em", color, lineHeight: 1 }}>
      Resume
      <span style={{ color: tex }}>
        T
        <span style={{ display: "inline-block", transform: "translateY(0.18em)", fontSize: "0.82em" }}>E</span>
        X
      </span>
    </span>
  );
};
