// src/components/ui/AmbientGlyphs.tsx
'use client';

import { useEffect, useRef } from 'react';

// Light-golden LaTeX / typesetting glyphs that drift slowly in the background.
const GLYPHS = [
  'λ', 'Σ', '∫', 'π', 'α', 'β', 'θ', '∞', '∂', '√', '∇', 'Ω', 'φ', 'μ',
  '\\LaTeX', '\\textbf', '\\section', '\\item', '\\frac', '\\sum', '\\begin', '\\\\', '{ }', '$', '#',
];
const COLORS = ['#B8902F', '#9A7826', '#A8842C', '#8A6E22'];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;   // current velocity
  bvx: number; bvy: number; // base drift it springs back to
  char: string;
  size: number;
  alpha: number;
  rot: number; rotV: number;
  color: string;
  mono: boolean;
}

/**
 * Ambient background layer: slowly drifting golden LaTeX glyphs with a
 * mouse-repel interaction. Rendered to a fixed, click-through canvas behind
 * the page content. Pauses when the tab is hidden and honors reduced-motion.
 */
export default function AmbientGlyphs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    let w = 0, h = 0;
    let particles: Particle[] = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999, active: false };
    const RADIUS = 150; // px around the cursor that pushes glyphs away

    const makeParticles = () => {
      const count = Math.min(110, Math.max(40, Math.round((w * h) / 20000)));
      particles = Array.from({ length: count }, () => {
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const mono = /[\\{}#$]/.test(char);          // LaTeX commands → monospace
        const bvx = rand(-0.12, 0.12);
        const bvy = rand(-0.18, -0.04);              // gentle upward drift
        return {
          x: rand(0, w), y: rand(0, h),
          vx: bvx, vy: bvy, bvx, bvy,
          char,
          size: mono ? rand(11, 19) : rand(20, 44),
          alpha: rand(0.12, 0.28),                   // deeper gold, kept visible
          rot: rand(-0.35, 0.35), rotV: rand(-0.0006, 0.0006),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          mono,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeParticles();
    };

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        if (animate) {
          // Mouse repel
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < RADIUS && dist > 0) {
              const force = (1 - dist / RADIUS) * 0.7;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
          }
          // Spring back toward the base drift, then move
          p.vx += (p.bvx - p.vx) * 0.05;
          p.vy += (p.bvy - p.vy) * 0.05;
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.rotV;

          // Wrap around the edges
          const m = 64;
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
        ctx.font = `${p.size}px ${p.mono ? "'JetBrains Mono', monospace" : "'Fraunces', Georgia, serif"}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      }
    };

    const loop = () => {
      draw(true);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; };
    const onLeave = () => { mouse.active = false; };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    if (reduce) {
      draw(false); // single static frame
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
