import React from "react";
import { Theme, display, mono, serif } from "./style";
import { LogoMark } from "./Logo";

// A faithful, simplified mock of the ResumeTeX builder, themed dark or light.
// Fixed 1500x820 design size; scale it from the parent.
export const APP_W = 1500;
export const APP_H = 820;

const MODES = ["Manual", "Upload", "Transform", "Cover Letter"];
const SECTIONS = ["Personal", "Education", "Projects", "Experience", "Technical Skills", "Achievements"];

const Pill: React.FC<{ label: string; active: boolean; t: Theme }> = ({ label, active, t }) => (
  <div
    style={{
      fontFamily: display,
      fontSize: 13,
      fontWeight: 600,
      padding: "5px 11px",
      borderRadius: 7,
      color: active ? t.gold : t.dim,
      background: active ? "rgba(201,168,76,0.14)" : "transparent",
    }}
  >
    {label}
  </div>
);

const Field: React.FC<{ label: string; value: string; t: Theme }> = ({ label, value, t }) => (
  <div style={{ marginTop: 14 }}>
    <div style={{ fontFamily: display, fontSize: 9.5, letterSpacing: "0.14em", color: t.dim, marginBottom: 6 }}>
      {label}
    </div>
    <div
      style={{
        height: 34,
        borderRadius: 8,
        background: t.panel2,
        border: `1px solid ${t.line}`,
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        fontFamily: display,
        fontSize: 13,
        color: t.muted,
      }}
    >
      {value}
    </div>
  </div>
);

const PaperSection: React.FC<{ title: string; t: Theme; children: React.ReactNode }> = ({ title, t, children }) => (
  <div style={{ marginTop: 18 }}>
    <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 15, color: t.paperInk }}>{title}</div>
    <div style={{ height: 1.5, background: "rgba(0,0,0,0.18)", margin: "4px 0 8px" }} />
    {children}
  </div>
);

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: "flex", gap: 7, marginBottom: 5, alignItems: "flex-start" }}>
    <span style={{ color: "#C9A84C", fontSize: 11, marginTop: 1 }}>▸</span>
    <span style={{ flex: 1 }}>{children}</span>
  </div>
);

export const AppMock: React.FC<{ t: Theme; uid: string }> = ({ t, uid }) => {
  const isLight = t.paper === "#FFFFFF" && t.ivory === "#1A1714";
  return (
    <div
      style={{
        width: APP_W,
        height: APP_H,
        background: t.bg,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: display,
      }}
    >
      {/* Header */}
      <div
        style={{
          height: 56,
          flexShrink: 0,
          borderBottom: `1px solid ${t.line}`,
          background: t.panel,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 12,
        }}
      >
        <LogoMark size={26} uid={`${uid}-hdr`} />
        <span style={{ fontFamily: display, fontWeight: 700, fontSize: 15, color: t.ivory }}>ResumeTeX</span>
        <div style={{ width: 1, height: 18, background: t.line, margin: "0 4px" }} />
        <div style={{ display: "flex", gap: 4 }}>
          {MODES.map((m) => (
            <Pill key={m} label={m} active={m === "Manual"} t={t} />
          ))}
        </div>
        <div style={{ flex: 1 }} />
        {/* theme toggle */}
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            border: `1px solid ${t.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: t.gold,
            fontSize: 15,
          }}
        >
          {isLight ? "☀" : "☾"}
        </div>
        <div
          style={{
            fontFamily: display,
            fontSize: 13,
            fontWeight: 600,
            padding: "6px 12px",
            borderRadius: 8,
            border: `1px solid ${t.line}`,
            color: t.muted,
          }}
        >
          Save
        </div>
        <div
          style={{
            fontFamily: display,
            fontSize: 13,
            fontWeight: 700,
            padding: "6px 14px",
            borderRadius: 8,
            background: t.gold,
            color: isLight ? "#FFFFFF" : "#08080A",
          }}
        >
          PDF
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Left form panel */}
        <div style={{ width: 340, flexShrink: 0, borderRight: `1px solid ${t.line}`, background: t.panel, padding: 16, overflow: "hidden" }}>
          <div style={{ fontFamily: display, fontSize: 10, letterSpacing: "0.16em", color: t.dim, marginBottom: 10 }}>
            SECTIONS
          </div>
          {SECTIONS.map((s, i) => (
            <div
              key={s}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 10px",
                marginBottom: 5,
                borderRadius: 9,
                background: i === 0 ? "rgba(201,168,76,0.10)" : "transparent",
                border: i === 0 ? `1px solid ${t.gold}55` : `1px solid transparent`,
              }}
            >
              <span style={{ color: t.dim, fontSize: 12, letterSpacing: "-2px" }}>⋮⋮</span>
              <span style={{ fontFamily: display, fontSize: 13.5, fontWeight: 600, color: i === 0 ? t.gold : t.muted, flex: 1 }}>{s}</span>
              {i !== 0 && <span style={{ width: 6, height: 6, borderRadius: 6, background: t.jade }} />}
            </div>
          ))}
          <div style={{ height: 1, background: t.line, margin: "16px 0" }} />
          <div style={{ fontFamily: display, fontSize: 10, letterSpacing: "0.16em", color: t.dim }}>
            PERSONAL INFORMATION
          </div>
          <Field label="FULL NAME" value="Singh Nitin Rakesh" t={t} />
          <Field label="EMAIL" value="ni3.singh.r@gmail.com" t={t} />
        </div>

        {/* Right preview */}
        <div style={{ flex: 1, background: t.bg, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div
            style={{
              height: 40,
              flexShrink: 0,
              borderBottom: `1px solid ${t.line}`,
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", gap: 4, background: t.panel2, borderRadius: 7, padding: 3 }}>
              <span style={{ fontFamily: display, fontSize: 11, fontWeight: 600, color: t.dim, padding: "4px 9px" }}>LaTeX Code</span>
              <span style={{ fontFamily: display, fontSize: 11, fontWeight: 600, color: t.ivory, background: t.panel, borderRadius: 5, padding: "4px 9px" }}>
                PDF Preview
              </span>
            </div>
            <div style={{ flex: 1 }} />
            <span style={{ fontFamily: mono, fontSize: 11, color: "#34d399" }}>⌁ Scan</span>
            <span style={{ fontFamily: mono, fontSize: 11, color: t.dim }}>↧ Download</span>
          </div>
          {/* paper */}
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "26px 0", minHeight: 0 }}>
            <div
              style={{
                width: 540,
                background: t.paper,
                color: t.paperInk,
                boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
                padding: "26px 34px",
                borderRadius: 2,
                fontFamily: serif,
                fontSize: 11.5,
                lineHeight: 1.4,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 23, letterSpacing: "0.04em" }}>SINGH NITIN RAKESH</div>
                <div style={{ fontSize: 11, color: "#444", marginTop: 3 }}>
                  Surat, India · +91 70418 08600 · ni3.singh.r@gmail.com
                </div>
                <div style={{ fontSize: 11, color: "#1d4ed8", marginTop: 1 }}>linkedin.com/in/nitinsinghr · github.com/NI3singh</div>
              </div>

              <PaperSection title="Experience" t={t}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 700 }}>AI Engineer · ELaunch Solution</span>
                  <span style={{ color: "#555" }}>2024 – Present</span>
                </div>
                <div style={{ marginTop: 4 }}>
                  <Bullet>Built an LLM résumé pipeline with FastAPI &amp; Next.js, serving live PDF compiles.</Bullet>
                  <Bullet>Designed an anti-fabrication guard that grounds every AI rewrite in source facts.</Bullet>
                </div>
              </PaperSection>

              <PaperSection title="Projects" t={t}>
                <div style={{ fontWeight: 700 }}>Solana Market Analysis | Python, Pandas</div>
                <div style={{ marginTop: 4 }}>
                  <Bullet>Cleaned 1,300+ days of financial records into a reproducible pipeline.</Bullet>
                </div>
              </PaperSection>

              <PaperSection title="Education" t={t}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 700 }}>B.Tech, Artificial Intelligence &amp; Data Science</span>
                  <span style={{ color: "#555" }}>CGPA 8.7</span>
                </div>
              </PaperSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
