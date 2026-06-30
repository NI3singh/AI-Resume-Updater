'use client';

import { motion } from 'framer-motion';

// A QR-scanner-style green line that sweeps up and down. Rendered INSIDE the PDF
// preview container (which must be `relative`) so it only covers the résumé, not
// the page. Purely cosmetic (pointer-events-none) — the real analysis runs on the
// résumé data while this plays.
export default function ScanOverlay({ label = 'Scanning résumé…' }: { label?: string }) {
  return (
    <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
      {/* faint green wash */}
      <div className="absolute inset-0" style={{ background: 'rgba(52,211,153,0.05)' }} />

      {/* the sweeping line + glow */}
      <motion.div
        className="absolute inset-x-0"
        initial={{ top: '0%' }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="absolute inset-x-0 -translate-y-1/2 h-28"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(52,211,153,0.16), transparent)' }}
        />
        <div
          className="absolute inset-x-0 -translate-y-1/2 h-[2px]"
          style={{ background: '#34d399', boxShadow: '0 0 16px 4px rgba(52,211,153,0.55)' }}
        />
      </motion.div>

      {/* status chip */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2">
        <span
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium backdrop-blur-sm"
          style={{ color: '#6ee7b7', background: 'rgba(8,8,10,0.85)', border: '1px solid rgba(52,211,153,0.4)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#34d399' }} />
          {label}
        </span>
      </div>
    </div>
  );
}
