"""FastAPI application entrypoint."""

from contextlib import asynccontextmanager
from fastapi.responses import HTMLResponse

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import init_db
from .routers import auth, github, resumes, tools


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create extensions + tables on startup (idempotent).
    init_db()
    yield


app = FastAPI(title="AI Resume Updater API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(resumes.router)
app.include_router(tools.router)
app.include_router(github.router)


# ── Landing page ─────────────────────────────────────────────────────────────
# A self-contained mirror of the real ResumeTeX frontend theme (frontend/src):
#   - cool-ink palette (--ink-950 #08080A … --ivory #F5F0E8) from globals.css
#   - Fraunces display serif + Plus Jakarta Sans wordmark + DM Sans body
#   - the genuine SVG <LogoMark> (ink badge, gold hairline, λ path, baseline+dot)
#   - the live canvas AmbientGlyphs background (drifting LaTeX glyphs, mouse-repel)
#   - gold "shimmer" accent text, orbs, grid mesh, floaty λ watermark, grain
# Kept dependency-free (one CDN font link) so it ships with the backend.
_LANDING_HTML = r"""<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ResumeTeX — Backend Live</title>
<meta name="description" content="The ResumeTeX backend is live. Open the frontend to build a perfectly typeset LaTeX resume.">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='12' fill='%230E0E12'/%3E%3Crect x='1.5' y='1.5' width='45' height='45' rx='12.5' fill='none' stroke='%23C9A84C' stroke-opacity='0.85' stroke-width='1.5'/%3E%3Cg transform='translate(8.9 5.1) scale(1.25)'%3E%3Cpath d='M7 5.1c2-.7 3.5.2 4.4 2.2L17.4 19.6M13.3 11.6c-1.5 2.9-3.6 5.6-6.5 8' fill='none' stroke='%23C9A84C' stroke-width='2.5' stroke-linecap='round'/%3E%3C/g%3E%3Cpath d='M13 35.5h16.5' fill='none' stroke='%23C9A84C' stroke-opacity='0.45' stroke-width='1.6' stroke-linecap='round'/%3E%3Ccircle cx='33.2' cy='35.5' r='1.6' fill='%23C9A84C'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500;1,9..144,600&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">

<style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
    --ink-950:    #08080A;
    --ink-900:    #0E0E12;
    --ink-800:    #16161C;
    --ink-700:    #1E1E28;
    --ink-600:    #2A2A38;
    --ink-500:    #9696B8;
    --ivory:      #F5F0E8;
    --ivory-muted:#C8C2B4;
    --ivory-dim:  #8A8578;
    --gold:       #C9A84C;
    --gold-light: #DFC070;
    --gold-dark:  #A07830;
    --jade:       #3AAFA9;
    }

    html { scroll-behavior: smooth; }
    html, body { overflow-x: hidden; }

    body {
    min-height: 100vh;
    background: var(--ink-950);
    color: var(--ivory);
    font-family: 'DM Sans', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 48px 24px;
    }

    /* ── Live drifting LaTeX-glyph canvas (ports AmbientGlyphs) ── */
    #glyphs {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    }

    /* ── Atmosphere: orbs + mesh + grid + watermark ── */
    .atmosphere {
    position: fixed;
    inset: 0;
    z-index: 1;
    overflow: hidden;
    pointer-events: none;
    }

    .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(72px);
    will-change: transform;
    }
    .orb-gold {
    width: 680px; height: 680px;
    background: rgba(201,168,76,0.07);
    top: -180px; left: -200px;
    }
    .orb-jade {
    width: 520px; height: 520px;
    background: rgba(58,175,169,0.05);
    bottom: -140px; right: -160px;
    }

    .mesh {
    position: absolute; inset: 0;
    background: radial-gradient(60% 50% at 50% 42%, rgba(201,168,76,0.08), transparent 70%);
    }

    .grid {
    position: absolute; inset: 0;
    opacity: 0.03;
    background-image:
        linear-gradient(#C9A84C 1px, transparent 1px),
        linear-gradient(90deg, #C9A84C 1px, transparent 1px);
    background-size: 72px 72px;
    -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent 75%);
    mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent 75%);
    }

    .watermark {
    position: absolute;
    top: 4rem; right: -2rem;
    font-family: 'Fraunces', Georgia, serif;
    font-style: italic;
    font-weight: 600;
    line-height: 1;
    color: rgba(201,168,76,0.05);
    font-size: clamp(13rem, 30vw, 26rem);
    user-select: none;
    animation: floaty 7s ease-in-out infinite;
    }

    /* ── Soft center backdrop so glyphs never fight the text ── */
    .backdrop {
    position: fixed; inset: 0;
    z-index: 2;
    pointer-events: none;
    background: radial-gradient(ellipse 52% 48% at 50% 50%, rgba(8,8,10,0.62), transparent 72%);
    }

    /* ── Grain overlay (mirrors .grain::before) ── */
    .grain::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 100;
    pointer-events: none;
    opacity: 0.4;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    }

    /* ── Content ── */
    .wrap {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 640px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    }

    /* ── Logo lockup ── */
    .logo {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 40px;
    text-decoration: none;
    user-select: none;
    }
    .logo svg { display: block; }
    .logo-name {
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    font-weight: 700;
    font-size: 1.55rem;
    letter-spacing: -0.02em;
    line-height: 1;
    color: var(--ivory);
    white-space: nowrap;
    }
    .logo-name .tex { color: var(--gold); }
    .logo-name .tex .e {
    display: inline-block;
    transform: translateY(0.18em);
    font-size: 0.82em;
    }

    /* ── Status badge ── */
    .badge {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid rgba(201,168,76,0.25);
    background: rgba(201,168,76,0.07);
    color: var(--gold);
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 30px;
    }
    .ping { position: relative; display: inline-flex; height: 7px; width: 7px; }
    .ping .wave {
    position: absolute; inset: 0;
    border-radius: 999px;
    background: var(--gold);
    opacity: 0.75;
    animation: ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    .ping .dot {
    position: relative;
    display: inline-flex;
    height: 7px; width: 7px;
    border-radius: 999px;
    background: var(--gold);
    }

    /* ── Heading ── */
    h1 {
    font-family: 'Fraunces', Georgia, serif;
    font-optical-sizing: auto;
    font-weight: 600;
    font-size: clamp(2.9rem, 7vw, 5rem);
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--ivory);
    text-wrap: balance;
    margin-bottom: 22px;
    }
    h1 .shimmer {
    font-style: italic;
    font-weight: 500;
    background: linear-gradient(90deg, #C9A84C 0%, #F5F0E8 40%, #DFC070 60%, #C9A84C 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    animation: shimmer 4s linear infinite;
    }

    /* ── Subtitle ── */
    .subtitle {
    font-size: 1.0625rem;
    font-weight: 400;
    color: rgba(245,240,232,0.65);
    line-height: 1.7;
    max-width: 440px;
    margin: 0 auto 38px;
    text-wrap: balance;
    }
    .subtitle strong { color: var(--ivory); font-weight: 600; }

    /* ── Hairline gold rule ── */
    .rule {
    width: 100%;
    max-width: 280px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent);
    margin: 0 auto 38px;
    }

    /* ── Actions ── */
    .actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 48px;
    }
    .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    border-radius: 12px;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 12px 24px;
    cursor: pointer;
    transition: transform .2s ease, background .2s ease, border-color .2s ease,
                color .2s ease, box-shadow .2s ease;
    }
    .btn-primary {
    background: var(--gold);
    color: var(--ink-950);
    border: 1px solid var(--gold);
    box-shadow: 0 2px 12px rgba(201,168,76,0.25);
    }
    .btn-primary:hover {
    background: var(--gold-light);
    border-color: var(--gold-light);
    transform: translateY(-2px);
    box-shadow: 0 6px 22px rgba(201,168,76,0.4);
    }
    .btn-primary .arr { transition: transform .2s ease; }
    .btn-primary:hover .arr { transform: translateX(3px); }
    .btn-ghost {
    background: transparent;
    color: var(--ivory-muted);
    border: 1px solid var(--ink-600);
    }
    .btn-ghost:hover {
    border-color: rgba(201,168,76,0.3);
    color: var(--ivory);
    background: rgba(201,168,76,0.06);
    transform: translateY(-2px);
    }

    /* ── Footer note ── */
    .note {
    font-size: 0.78rem;
    font-weight: 300;
    color: var(--ivory-dim);
    line-height: 1.7;
    max-width: 380px;
    }
    .note code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    color: rgba(201,168,76,0.7);
    }

    /* ── Entrance stagger ── */
    @keyframes rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
    .logo     { animation: rise .6s ease both .05s; }
    .badge    { animation: rise .6s ease both .14s; }
    h1        { animation: rise .6s ease both .22s; }
    .subtitle { animation: rise .6s ease both .32s; }
    .rule     { animation: rise .6s ease both .40s; }
    .actions  { animation: rise .6s ease both .46s; }
    .note     { animation: rise .6s ease both .54s; }

    @keyframes shimmer { from { background-position: -200% center; } to { background-position: 200% center; } }
    @keyframes ping    { 75%, 100% { transform: scale(2.4); opacity: 0; } }
    @keyframes floaty  { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

    @media (max-width: 768px) { .watermark { display: none; } }
    @media (max-width: 480px) {
    .actions { flex-direction: column; align-items: stretch; width: 100%; max-width: 300px; }
    .btn { justify-content: center; }
    }

    @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
    }
    /* ─── Animated inline star ─── */
    .star-anim {
    display: inline-block;
    vertical-align: -0.18em;
    width: 1.05em;
    height: 1.05em;
    animation: star-spin 3.5s ease-in-out infinite;
    filter: drop-shadow(0 0 3px rgba(201,168,76,0.6));
    }

    @keyframes star-spin {
    0%   { transform: scale(1)    rotate(0deg);   filter: drop-shadow(0 0 2px rgba(201,168,76,0.5)); }
    25%  { transform: scale(1.4)  rotate(72deg);  filter: drop-shadow(0 0 9px rgba(223,192,112,0.9)); }
    50%  { transform: scale(1)    rotate(144deg); filter: drop-shadow(0 0 2px rgba(201,168,76,0.5)); }
    75%  { transform: scale(1.4)  rotate(216deg); filter: drop-shadow(0 0 9px rgba(223,192,112,0.9)); }
    100% { transform: scale(1)    rotate(360deg); filter: drop-shadow(0 0 2px rgba(201,168,76,0.5)); }
    }
</style>
</head>
<body class="grain">

  <!-- Live drifting LaTeX glyphs -->
  <canvas id="glyphs" aria-hidden="true"></canvas>

  <!-- Static atmosphere -->
  <div class="atmosphere" aria-hidden="true">
    <div class="orb orb-gold"></div>
    <div class="orb orb-jade"></div>
    <div class="mesh"></div>
    <div class="grid"></div>
    <div class="watermark">&#955;</div>
  </div>
  <div class="backdrop" aria-hidden="true"></div>

  <!-- Content -->
  <main class="wrap">

    <!-- Logo: the genuine ResumeTeX mark -->
    <a class="logo" href="https://resumetex-frontend.onrender.com/" aria-label="ResumeTeX home">
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="lm-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stop-color="#20202B"/>
            <stop offset="1" stop-color="#0A0A0E"/>
          </linearGradient>
          <linearGradient id="lm-gold" x1="10" y1="6" x2="38" y2="42" gradientUnits="userSpaceOnUse">
            <stop stop-color="#E8CC7E"/>
            <stop offset="0.5" stop-color="#C9A84C"/>
            <stop offset="1" stop-color="#9A7826"/>
          </linearGradient>
          <radialGradient id="lm-glow" cx="24" cy="19" r="16" gradientUnits="userSpaceOnUse">
            <stop stop-color="#C9A84C" stop-opacity="0.2"/>
            <stop offset="1" stop-color="#C9A84C" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect x="1.5" y="1.5" width="45" height="45" rx="12.5" fill="url(#lm-bg)" stroke="none"/>
        <rect x="1.5" y="1.5" width="45" height="45" rx="12.5" fill="none" stroke="url(#lm-gold)" stroke-opacity="0.85" stroke-width="1.5"/>
        <circle cx="24" cy="19" r="16" fill="url(#lm-glow)" stroke="none"/>
        <g transform="translate(8.9 5.1) scale(1.25)">
          <path d="M7 5.1c2-.7 3.5.2 4.4 2.2L17.4 19.6M13.3 11.6c-1.5 2.9-3.6 5.6-6.5 8" fill="none" stroke="url(#lm-gold)" stroke-width="2.5" stroke-linecap="round"/>
        </g>
        <path d="M13 35.5h16.5" fill="none" stroke="url(#lm-gold)" stroke-opacity="0.45" stroke-width="1.6" stroke-linecap="round"/>
        <circle cx="33.2" cy="35.5" r="1.6" fill="url(#lm-gold)" stroke="none"/>
      </svg>
      <span class="logo-name">Resume<span class="tex">T<span class="e">E</span>X</span></span>
    </a>

    <!-- Status -->
    <div class="badge">
      <span class="ping"><span class="wave"></span><span class="dot"></span></span>
      Backend Online
    </div>

    <!-- Heading -->
    <h1>Thank you for<br><span class="shimmer">stopping by.</span></h1>

    <!-- Body copy -->
    <p class="subtitle">
      The backend is live and running smoothly.
      <strong>Open the frontend to start building</strong> your perfectly
      typeset r&eacute;sum&eacute; &mdash; and if the project helps you,
      a <svg class="star-anim" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="star">
        <defs>
            <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#E8CC7E"/>
            <stop offset="50%" stop-color="#C9A84C"/>
            <stop offset="100%" stop-color="#9A7826"/>
            </linearGradient>
        </defs>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#sg)"/>
        </svg> on GitHub would mean a lot.
    </p>

    <div class="rule"></div>

    <!-- CTAs -->
    <div class="actions">
      <a class="btn btn-primary" href="https://resumetex-frontend.onrender.com/" target="_blank" rel="noopener">
        Open Frontend
        <svg class="arr" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <a class="btn btn-ghost" href="https://github.com/NI3singh/AI-Resume-Updater" target="_blank" rel="noopener">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" stroke="none" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        Star on GitHub
      </a>
    </div>

    <!-- Footer note -->
    <p class="note">
      First visit? Render's free tier may take <code>~30s</code> to wake the
      frontend &mdash; sit tight, it's worth it.
    </p>

  </main>

  <script>
  (function () {
    var canvas = document.getElementById('glyphs');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    // LaTeX / typesetting glyphs that drift slowly in the background.
    var GLYPHS = ['λ','Σ','∫','π','α','β','θ','∞','∂','√','∇','Ω','φ','μ','\\LaTeX','\\textbf','\\section','\\item','\\frac','\\sum','\\begin','\\\\','{ }','$','#'];
    var COLORS = ['#B8902F', '#9A7826', '#A8842C', '#8A6E22'];
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var rand = function (a, b) { return a + Math.random() * (b - a); };

    var w = 0, h = 0, particles = [], raf = 0;
    var mouse = { x: -9999, y: -9999, active: false };
    var RADIUS = 150; // px around the cursor that pushes glyphs away

    function makeParticles() {
      var count = Math.min(110, Math.max(40, Math.round((w * h) / 20000)));
      particles = [];
      for (var i = 0; i < count; i++) {
        var char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        var mono = /[\\{}#$]/.test(char);          // LaTeX commands -> monospace
        var bvx = rand(-0.12, 0.12);
        var bvy = rand(-0.18, -0.04);              // gentle upward drift
        particles.push({
          x: rand(0, w), y: rand(0, h),
          vx: bvx, vy: bvy, bvx: bvx, bvy: bvy,
          char: char,
          size: mono ? rand(11, 19) : rand(20, 44),
          alpha: rand(0.12, 0.28),
          rot: rand(-0.35, 0.35), rotV: rand(-0.0006, 0.0006),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          mono: mono
        });
      }
    }

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeParticles();
    }

    function draw(animate) {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        if (animate) {
          if (mouse.active) {                       // mouse repel
            var dx = p.x - mouse.x, dy = p.y - mouse.y;
            var dist = Math.hypot(dx, dy);
            if (dist < RADIUS && dist > 0) {
              var force = (1 - dist / RADIUS) * 0.7;
              p.vx += (dx / dist) * force; p.vy += (dy / dist) * force;
            }
          }
          p.vx += (p.bvx - p.vx) * 0.05;            // spring back to base drift
          p.vy += (p.bvy - p.vy) * 0.05;
          p.x += p.vx; p.y += p.vy; p.rot += p.rotV;
          var m = 64;                               // wrap around edges
          if (p.x < -m) p.x = w + m; else if (p.x > w + m) p.x = -m;
          if (p.y < -m) p.y = h + m; else if (p.y > h + m) p.y = -m;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = 'rgba(184,144,47,0.4)';
        ctx.shadowBlur = 6;
        ctx.font = p.size + 'px ' + (p.mono ? "'JetBrains Mono', monospace" : "'Fraunces', Georgia, serif");
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      }
    }

    function loop() { draw(true); raf = requestAnimationFrame(loop); }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; });
    document.addEventListener('mouseleave', function () { mouse.active = false; });
    document.addEventListener('visibilitychange', function () {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(loop);
    });

    resize();
    if (reduce) { draw(false); }                    // single static frame
    else { raf = requestAnimationFrame(loop); }

    // Redraw once webfonts arrive so glyphs use Fraunces / JetBrains, not the fallback.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { if (reduce) draw(false); });
    }
  })();
  </script>

</body>
</html>
"""


@app.get("/", response_class=HTMLResponse, tags=["meta"])
def home():
    return _LANDING_HTML


@app.get("/health", tags=["meta"])
def health():
    return {
        "status": "ok"}
