"""FastAPI application entrypoint."""

from contextlib import asynccontextmanager
from fastapi.responses import HTMLResponse

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import init_db
from .routers import auth, resumes, tools


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


@app.get("/", response_class=HTMLResponse, tags=["meta"])
def home():
    return r"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ResumeTeX — Backend Running</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500;1,600;1,700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">

    <style>
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
        --bg:        #0b0906;
        --gold:      #c9a84c;
        --gold-dim:  rgba(201,168,76,0.12);
        --gold-line: rgba(201,168,76,0.22);
        --text:      #f0ebe0;
        --muted:     rgba(240,235,224,0.42);
        --dim:       rgba(240,235,224,0.18);
        --sym:       rgba(201,168,76,0.07);
        }

        html, body {
        height: 100%;
        }

        body {
        background: var(--bg);
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'DM Sans', system-ui, sans-serif;
        color: var(--text);
        overflow: hidden;
        position: relative;
        }

        /* ─── Scattered LaTeX symbol background ─── */
        .symbols {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
        font-family: 'Cormorant Garamond', 'Georgia', serif;
        font-style: italic;
        }

        .s {
        position: absolute;
        color: var(--gold);
        opacity: 0.075;
        user-select: none;
        line-height: 1;
        white-space: nowrap;
        }

        /* ─── Subtle vignette ─── */
        .vignette {
        position: fixed;
        inset: 0;
        z-index: 1;
        background: radial-gradient(ellipse 75% 70% at 50% 50%,
            transparent 30%,
            rgba(11,9,6,0.65) 100%);
        pointer-events: none;
        }

        /* ─── Main wrapper ─── */
        .wrap {
        position: relative;
        z-index: 10;
        width: 100%;
        max-width: 620px;
        padding: 0 28px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        }

        /* ─── Logo ─── */
        .logo {
        display: inline-flex;
        align-items: center;
        gap: 11px;
        margin-bottom: 44px;
        text-decoration: none;
        user-select: none;
        }

        .logo-mark {
        width: 36px;
        height: 36px;
        background: var(--gold);
        border-radius: 8px;
        display: grid;
        place-items: center;
        font-family: 'Cormorant Garamond', serif;
        font-weight: 700;
        font-size: 1.2rem;
        color: #0b0906;
        flex-shrink: 0;
        letter-spacing: 0;
        }

        .logo-name {
        font-family: 'DM Sans', sans-serif;
        font-size: 1.05rem;
        font-weight: 600;
        color: var(--text);
        letter-spacing: -0.01em;
        }

        .logo-name .gold { color: var(--gold); }

        .logo-name sub {
        font-size: 0.6em;
        font-style: italic;
        vertical-align: -0.3em;
        color: var(--gold);
        }

        /* ─── Status badge ─── */
        .badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: var(--gold-dim);
        border: 1px solid var(--gold-line);
        color: var(--gold);
        padding: 5px 14px;
        border-radius: 999px;
        font-size: 0.7rem;
        font-weight: 500;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin-bottom: 30px;
        }

        .pulse {
        width: 6px;
        height: 6px;
        background: var(--gold);
        border-radius: 50%;
        animation: pulse 2.2s ease-in-out infinite;
        }

        @keyframes pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.45); opacity: 1; }
        55%       { box-shadow: 0 0 0 6px rgba(201,168,76,0); opacity: 0.8; }
        }

        /* ─── Heading ─── */
        h1 {
        font-family: 'Cormorant Garamond', serif;
        font-size: clamp(2.8rem, 6.5vw, 4rem);
        font-weight: 700;
        line-height: 1.14;
        letter-spacing: -0.025em;
        color: var(--text);
        margin-bottom: 22px;
        }

        h1 em {
        font-style: italic;
        color: var(--gold);
        font-weight: 600;
        }

        /* ─── Subtitle ─── */
        .subtitle {
        font-size: 1rem;
        font-weight: 300;
        color: var(--muted);
        line-height: 1.8;
        max-width: 400px;
        margin: 0 auto 40px;
        }

        .subtitle strong {
        color: rgba(240,235,224,0.68);
        font-weight: 500;
        }

        /* ─── Thin rule ─── */
        .rule {
        width: 100%;
        max-width: 300px;
        height: 1px;
        background: linear-gradient(90deg,
            transparent,
            var(--gold-line),
            var(--gold-line),
            transparent);
        margin: 0 auto 40px;
        }

        /* ─── Actions ─── */
        .actions {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 52px;
        }

        .btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        text-decoration: none;
        border-radius: 8px;
        font-family: 'DM Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        padding: 12px 22px;
        transition: transform 0.18s ease, box-shadow 0.18s ease,
                    background 0.18s ease, border-color 0.18s ease, color 0.18s ease;
        letter-spacing: 0.005em;
        }

        /* Gold filled */
        .btn-primary {
        background: var(--gold);
        color: #0b0906;
        border: 1px solid var(--gold);
        }
        .btn-primary:hover {
        background: #d4b660;
        border-color: #d4b660;
        transform: translateY(-2px);
        box-shadow: 0 8px 22px rgba(201,168,76,0.28);
        }
        .btn-primary .arr { transition: transform 0.18s ease; }
        .btn-primary:hover .arr { transform: translateX(3px); }

        /* Ghost */
        .btn-ghost {
        background: transparent;
        color: var(--muted);
        border: 1px solid rgba(240,235,224,0.1);
        }
        .btn-ghost:hover {
        border-color: var(--gold-line);
        color: var(--gold);
        transform: translateY(-2px);
        }

        /* ─── Footer note ─── */
        .note {
        font-size: 0.76rem;
        font-weight: 300;
        color: var(--dim);
        line-height: 1.7;
        max-width: 360px;
        }

        .note a {
        color: rgba(201,168,76,0.5);
        text-decoration: none;
        transition: color 0.15s;
        }
        .note a:hover { color: var(--gold); }

        /* ─── Stagger fade-up ─── */
        @keyframes rise {
        from { opacity: 0; transform: translateY(12px); }
        to   { opacity: 1; transform: translateY(0); }
        }

        .logo     { animation: rise 0.55s ease both 0.05s; }
        .badge    { animation: rise 0.55s ease both 0.15s; }
        h1        { animation: rise 0.55s ease both 0.25s; }
        .subtitle { animation: rise 0.55s ease both 0.35s; }
        .rule     { animation: rise 0.55s ease both 0.40s; }
        .actions  { animation: rise 0.55s ease both 0.46s; }
        .note     { animation: rise 0.55s ease both 0.54s; }

        /* ─── Responsive ─── */
        @media (max-width: 480px) {
        h1 { font-size: 2.4rem; }
        .actions { flex-direction: column; align-items: stretch; width: 100%; max-width: 280px; }
        .btn { justify-content: center; }
        }

        @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { animation: none !important; transition: none !important; }
        }
    </style>
    </head>
    <body>

    <!-- ░░ LaTeX background symbols ░░ -->
    <div class="symbols" aria-hidden="true">
        <!-- top row -->
        <span class="s" style="font-size:1.5rem;  top: 4%;  left: 3%;">φ</span>
        <span class="s" style="font-size:1rem;    top: 9%;  left:13%;">\sum</span>
        <span class="s" style="font-size:2rem;    top: 3%;  left:28%;">∫</span>
        <span class="s" style="font-size:0.9rem;  top: 6%;  left:44%;">\section{}</span>
        <span class="s" style="font-size:1.7rem;  top:13%;  left:64%;">α</span>
        <span class="s" style="font-size:0.9rem;  top: 5%;  left:79%;">\textbf</span>
        <span class="s" style="font-size:2rem;    top: 2%;  left:90%;">Ω</span>
        <!-- middle-left -->
        <span class="s" style="font-size:1.4rem;  top:22%;  left: 1%;">√</span>
        <span class="s" style="font-size:0.85rem; top:30%;  left: 8%;">\frac{}{}</span>
        <span class="s" style="font-size:2.2rem;  top:42%;  left: 2%;">β</span>
        <span class="s" style="font-size:0.85rem; top:53%;  left: 5%;">\item</span>
        <span class="s" style="font-size:2.8rem;  top:66%;  left: 4%;">Σ</span>
        <span class="s" style="font-size:0.9rem;  top:74%;  left:14%;">\end{document}</span>
        <!-- middle-right -->
        <span class="s" style="font-size:2.5rem;  top:24%;  left:90%;">θ</span>
        <span class="s" style="font-size:0.9rem;  top:35%;  left:93%;">\begin{}</span>
        <span class="s" style="font-size:2.4rem;  top:51%;  left:91%;">μ</span>
        <span class="s" style="font-size:1rem;    top:62%;  left:88%;">\section</span>
        <span class="s" style="font-size:1.6rem;  top:74%;  left:81%;">λ</span>
        <span class="s" style="font-size:1.8rem;  top:82%;  left:91%;">π</span>
        <!-- bottom row -->
        <span class="s" style="font-size:0.85rem; top:87%;  left:28%;">\documentclass{}</span>
        <span class="s" style="font-size:2.6rem;  top:83%;  left:52%;">∇</span>
        <span class="s" style="font-size:1.8rem;  top:91%;  left:68%;">Ω</span>
        <span class="s" style="font-size:0.9rem;  top:79%;  left:44%;">\usepackage{}</span>
        <!-- scattered mid -->
        <span class="s" style="font-size:1.3rem;  top:38%;  left:97%;">(</span>
        <span class="s" style="font-size:1.8rem;  top:44%;  left:95%;">)</span>
        <span class="s" style="font-size:1.1rem;  top:57%;  left:72%;">\LaTeX</span>
    </div>

    <div class="vignette"></div>

    <!-- ░░ Content ░░ -->
    <div class="wrap">

        <!-- Logo -->
        <a class="logo" href="#" aria-label="ResumeTeX home">
        <div class="logo-mark">λ</div>
        <span class="logo-name">Resume<span class="gold">T<sub>E</sub>X</span></span>
        </a>

        <!-- Status -->
        <div class="badge">
        <span class="pulse"></span>
        Backend Online
        </div>

        <!-- Heading -->
        <h1>Thank you for<br><em>stopping by.</em></h1>

        <!-- Body copy -->
        <p class="subtitle">
        The backend is live and running smoothly.
        <strong>Click below to open the frontend</strong> and start building
        your perfectly typeset résumé — and if you enjoy the project,
        a ⭐ on GitHub would mean a lot.
        </p>

        <!-- Thin gold rule -->
        <div class="rule"></div>

        <!-- CTAs -->
        <div class="actions">
        <a class="btn btn-primary" href="https://resumetex-frontend.onrender.com/" target="_blank" rel="noopener">
            Open Frontend
            <svg class="arr" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </a>
        <a class="btn btn-ghost" href="https://github.com/NI3singh/AI-Resume-Updater" target="_blank" rel="noopener">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                    0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
                    -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
                    .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
                    -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0
                    1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82
                    1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01
                    1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            Star on GitHub
        </a>
        </div>

        <!-- Footer note -->
        <p class="note">
        First visit? Render's free tier may take ~30 s to wake the frontend up.
        Sit tight — it's worth it.
        </p>

    </div>

    </body>
    </html>
    """

@app.get("/health", tags=["meta"])
def health():
    return {
        "status": "ok"}