import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { DARK, LIGHT, Theme, serif, display, mono } from "./style";
import { LogoMark, Wordmark } from "./Logo";
import { AppMock } from "./AppMock";

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease } as const;

// Fade a scene in at the start and out near the end (local frame).
const useSceneOpacity = (total: number, inF = 16, outF = 18) => {
  const f = useCurrentFrame();
  const a = interpolate(f, [0, inF], [0, 1], clamp);
  const b = interpolate(f, [total - outF, total], [1, 0], clamp);
  return a * b;
};

// ── Persistent ambient background (ink + orbs + grid + drifting glyphs) ───────
const GLYPHS = [
  { c: "λ", x: 8, y: 20, s: 70, sp: 0.06, o: 0.06 },
  { c: "∑", x: 84, y: 65, s: 90, sp: 0.05, o: 0.05 },
  { c: "∫", x: 22, y: 78, s: 64, sp: 0.07, o: 0.05 },
  { c: "π", x: 70, y: 18, s: 56, sp: 0.08, o: 0.06 },
  { c: "\\textbf", x: 46, y: 88, s: 26, sp: 0.05, o: 0.05 },
  { c: "\\section", x: 60, y: 40, s: 24, sp: 0.06, o: 0.045 },
  { c: "θ", x: 90, y: 30, s: 52, sp: 0.06, o: 0.05 },
  { c: "∞", x: 14, y: 50, s: 60, sp: 0.05, o: 0.045 },
];

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: DARK.bg }}>
      <div style={{ position: "absolute", width: 1000, height: 1000, left: -260, top: -320, borderRadius: "50%", background: "rgba(201,168,76,0.08)", filter: "blur(130px)" }} />
      <div style={{ position: "absolute", width: 760, height: 760, right: -220, bottom: -260, borderRadius: "50%", background: "rgba(58,175,169,0.06)", filter: "blur(130px)" }} />
      <AbsoluteFill
        style={{
          backgroundImage: "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)",
          backgroundSize: "76px 76px",
          opacity: 0.035,
          maskImage: "radial-gradient(ellipse 72% 62% at 50% 45%, black, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 72% 62% at 50% 45%, black, transparent 78%)",
        }}
      />
      {GLYPHS.map((g, i) => {
        const y = ((g.y + (frame * g.sp)) % 120) - 10; // slow downward drift, wraps
        const isMono = g.c.startsWith("\\");
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${g.x}%`,
              top: `${y}%`,
              fontFamily: isMono ? mono : serif,
              fontStyle: isMono ? "normal" : "italic",
              fontSize: g.s,
              color: "#B8902F",
              opacity: g.o,
            }}
          >
            {g.c}
          </span>
        );
      })}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 58% 54% at 50% 50%, transparent 38%, rgba(8,8,10,0.6))" }} />
    </AbsoluteFill>
  );
};

// ── Browser chrome ────────────────────────────────────────────────────────────
const Dot: React.FC<{ c: string }> = ({ c }) => (
  <div style={{ width: 12, height: 12, borderRadius: 12, background: c }} />
);

const BrowserFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 50px 130px rgba(0,0,0,0.65)", border: "1px solid #2A2A36" }}>
    <div style={{ height: 36, background: "#16161C", display: "flex", alignItems: "center", padding: "0 16px", gap: 8 }}>
      <Dot c="#ff5f57" />
      <Dot c="#febc2e" />
      <Dot c="#28c840" />
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <div style={{ background: "#0E0E12", color: "#8A8578", fontFamily: mono, fontSize: 12, padding: "4px 18px", borderRadius: 7 }}>
          resumetex.app/builder
        </div>
      </div>
    </div>
    {children}
  </div>
);

const Caption: React.FC<{ text: string; opacity: number }> = ({ text, opacity }) => (
  <div style={{ position: "absolute", bottom: 56, width: "100%", textAlign: "center", opacity, padding: "0 80px" }}>
    <span style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 500, fontSize: 36, color: "#F5F0E8", textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}>
      {text}
    </span>
  </div>
);

// ── Feature icons ─────────────────────────────────────────────────────────────
const Icon: React.FC<{ name: string; color: string; size?: number }> = ({ name, color, size = 26 }) => {
  const s = { stroke: color, strokeWidth: 2, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {name === "manual" && <path d="M3 21l3.5-1L20 6.5 17.5 4 4 17.5 3 21z" {...s} />}
      {name === "upload" && (
        <g {...s}>
          <path d="M12 15V4" />
          <path d="M7 9l5-5 5 5" />
          <path d="M5 19h14" />
        </g>
      )}
      {name === "transform" && (
        <g {...s}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
        </g>
      )}
      {name === "scan" && (
        <g {...s}>
          <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8" />
          <path d="M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8" />
          <path d="M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16" />
          <path d="M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
          <path d="M4 12h16" />
        </g>
      )}
      {name === "cover" && (
        <g {...s}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 8h6M9 12h6M9 16h3" />
        </g>
      )}
      {name === "github" && (
        <path
          d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.3 6.9 9.6.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.300-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.8 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3.8 0 1.7.1 2.5.3 1.9-1.3 2.7-1 2.7-1 .5 1.5.2 2.5.1 2.8.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 4.9.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5 4-1.3 6.9-5.1 6.9-9.6C22 6.6 17.5 2 12 2z"
          fill={color}
          stroke="none"
        />
      )}
    </svg>
  );
};

// ── Scene 1: Intro ────────────────────────────────────────────────────────────
const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const op = useSceneOpacity(150);
  const pop = spring({ frame: f - 4, fps, config: { damping: 200, mass: 0.8 } });
  const draw = interpolate(f, [8, 50], [0, 1], clamp);
  const wordIn = interpolate(f, [30, 58], [0, 1], clamp);
  const tagIn = interpolate(f, [52, 80], [0, 1], clamp);
  const ruleW = interpolate(f, [64, 96], [0, 320], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: op }}>
      <div style={{ transform: `scale(${0.82 + 0.18 * pop})`, opacity: pop, filter: "drop-shadow(0 18px 50px rgba(201,168,76,0.25))" }}>
        <LogoMark size={132} draw={draw} uid="intro" />
      </div>
      <div style={{ marginTop: 34, opacity: wordIn, transform: `translateY(${(1 - wordIn) * 18}px)` }}>
        <Wordmark fontFamily={display} size={78} />
      </div>
      <div style={{ marginTop: 18, opacity: tagIn, transform: `translateY(${(1 - tagIn) * 14}px)` }}>
        <span style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 500, fontSize: 32, color: "#C8C2B4" }}>
          Your résumé, perfectly typeset.
        </span>
      </div>
      <div style={{ marginTop: 26, width: ruleW, height: 1.5, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />
    </AbsoluteFill>
  );
};

// ── Scene 2: Showcase (the builder) ──────────────────────────────────────────
const Showcase: React.FC = () => {
  const f = useCurrentFrame();
  const op = useSceneOpacity(240);
  const rise = interpolate(f, [0, 32], [70, 0], clamp);
  const inScale = interpolate(f, [0, 32], [0.96, 1], clamp);
  const ken = interpolate(f, [0, 240], [1, 1.05]);
  const capIn = interpolate(f, [22, 48], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: op }}>
      <div style={{ transform: `translateY(${rise}px) scale(${0.9 * inScale * ken})` }}>
        <BrowserFrame>
          <AppMock t={DARK} uid="show" />
        </BrowserFrame>
      </div>
      <Caption text="Build a LaTeX résumé in your browser — zero LaTeX needed." opacity={capIn} />
    </AbsoluteFill>
  );
};

// ── Scene 3: Day / Night ─────────────────────────────────────────────────────
const DayNight: React.FC = () => {
  const f = useCurrentFrame();
  const op = useSceneOpacity(240);
  const inScale = interpolate(f, [0, 26], [0.96, 1], clamp);
  // Cross-fade dark -> light (clip-path wipes get dropped by headless Chrome).
  const lightOp = interpolate(f, [66, 150], [0, 1], clamp);
  const capIn = interpolate(f, [16, 42], [0, 1], clamp);
  const frame = (t: Theme, uid: string) => (
    <div style={{ transform: `scale(${0.9 * inScale})` }}>
      <BrowserFrame>
        <AppMock t={t} uid={uid} />
      </BrowserFrame>
    </div>
  );
  // Toggle chip that flips ☾ -> ☀ as the theme crosses over.
  const toggled = lightOp > 0.5;
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>{frame(DARK, "dn-d")}</AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: lightOp }}>
        {frame(LIGHT, "dn-l")}
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", pointerEvents: "none" }}>
        <div
          style={{
            marginTop: 96,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 18px",
            borderRadius: 999,
            background: "rgba(8,8,10,0.7)",
            border: "1px solid rgba(201,168,76,0.4)",
            backdropFilter: "blur(6px)",
            opacity: interpolate(f, [40, 60], [0, 1], clamp) * interpolate(f, [170, 196], [1, 0], clamp),
          }}
        >
          <span style={{ fontSize: 22, color: toggled ? "#DFC070" : "#8A8578" }}>☾</span>
          <div style={{ width: 44, height: 22, borderRadius: 999, background: "rgba(201,168,76,0.25)", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: 2,
                left: interpolate(lightOp, [0, 1], [2, 24]),
                width: 18,
                height: 18,
                borderRadius: 999,
                background: "#C9A84C",
              }}
            />
          </div>
          <span style={{ fontSize: 22, color: toggled ? "#DFC070" : "#8A8578" }}>☀</span>
        </div>
      </AbsoluteFill>
      <Caption text="Dark or light — switch with a single toggle." opacity={capIn} />
    </AbsoluteFill>
  );
};

// ── Scene 4: Features ─────────────────────────────────────────────────────────
const FEATURES = [
  { icon: "manual", title: "Manual builder", desc: "Live LaTeX, custom sections, drag-to-reorder.", color: "#C9A84C" },
  { icon: "upload", title: "AI import", desc: "Drop a PDF/DOCX — it becomes a résumé.", color: "#3AAFA9" },
  { icon: "transform", title: "Tailor to a JD", desc: "Surgical, no-fabrication rewrites.", color: "#C9A84C" },
  { icon: "scan", title: "Résumé scan", desc: "Spelling, grammar & symbol fixes.", color: "#34d399" },
  { icon: "cover", title: "Cover letters", desc: "One click, in your own template.", color: "#C9A84C" },
  { icon: "github", title: "GitHub projects", desc: "Code-aware bullets from your repos.", color: "#3AAFA9" },
];

const FeatureCard: React.FC<{ i: number; icon: string; title: string; desc: string; color: string }> = ({ i, icon, title, desc, color }) => {
  const f = useCurrentFrame();
  const delay = 22 + i * 9;
  const a = interpolate(f, [delay, delay + 24], [0, 1], clamp);
  const y = interpolate(f, [delay, delay + 24], [28, 0], clamp);
  return (
    <div
      style={{
        width: 452,
        opacity: a,
        transform: `translateY(${y}px)`,
        background: "rgba(22,22,28,0.7)",
        border: "1px solid #23232E",
        borderRadius: 18,
        padding: "26px 28px",
        display: "flex",
        gap: 18,
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          flexShrink: 0,
          borderRadius: 13,
          background: "rgba(201,168,76,0.10)",
          border: `1px solid ${color}55`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name={icon} color={color} size={26} />
      </div>
      <div>
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 24, color: "#F5F0E8" }}>{title}</div>
        <div style={{ fontFamily: display, fontSize: 16, color: "#8A8578", marginTop: 4, lineHeight: 1.4 }}>{desc}</div>
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const f = useCurrentFrame();
  const op = useSceneOpacity(360);
  const head = interpolate(f, [0, 24], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: op }}>
      <div style={{ textAlign: "center", marginBottom: 44, opacity: head, transform: `translateY(${(1 - head) * 16}px)` }}>
        <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 54, color: "#F5F0E8" }}>
          Built for the whole job hunt
        </div>
        <div style={{ fontFamily: display, fontSize: 20, color: "#8A8578", marginTop: 8 }}>
          From a blank page to a tailored application — résumé, scan, and cover letter.
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 24, justifyContent: "center" }}>
        {FEATURES.map((ft, i) => (
          <FeatureCard key={ft.title} i={i} {...ft} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 5: Outro ────────────────────────────────────────────────────────────
const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const op = useSceneOpacity(210, 18, 22);
  const pop = spring({ frame: f - 2, fps, config: { damping: 200 } });
  const a1 = interpolate(f, [22, 48], [0, 1], clamp);
  const a2 = interpolate(f, [40, 66], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: op }}>
      <div style={{ transform: `scale(${0.85 + 0.15 * pop})`, opacity: pop, filter: "drop-shadow(0 18px 50px rgba(201,168,76,0.25))" }}>
        <LogoMark size={104} uid="outro" />
      </div>
      <div style={{ marginTop: 28, opacity: a1, transform: `translateY(${(1 - a1) * 14}px)` }}>
        <Wordmark fontFamily={display} size={64} />
      </div>
      <div style={{ marginTop: 14, opacity: a1 }}>
        <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 28, color: "#C8C2B4" }}>Your résumé, perfectly typeset.</span>
      </div>
      <div
        style={{
          marginTop: 34,
          opacity: a2,
          transform: `translateY(${(1 - a2) * 12}px)`,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 22px",
          borderRadius: 12,
          border: "1px solid rgba(201,168,76,0.4)",
          background: "rgba(201,168,76,0.08)",
        }}
      >
        <Icon name="github" color="#C9A84C" size={22} />
        <span style={{ fontFamily: mono, fontSize: 19, color: "#DFC070" }}>github.com/NI3singh/AI-Resume-Updater</span>
      </div>
    </AbsoluteFill>
  );
};

// ── Main composition ──────────────────────────────────────────────────────────
export const WebsiteTour: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: DARK.bg }}>
      <Background />
      <Sequence durationInFrames={150}>
        <Intro />
      </Sequence>
      <Sequence from={150} durationInFrames={240}>
        <Showcase />
      </Sequence>
      <Sequence from={390} durationInFrames={240}>
        <DayNight />
      </Sequence>
      <Sequence from={630} durationInFrames={360}>
        <Features />
      </Sequence>
      <Sequence from={990} durationInFrames={210}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
