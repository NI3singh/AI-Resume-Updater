// src/components/ui/ThemeToggle.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      className="relative w-14 h-7 rounded-full border transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 overflow-hidden"
      style={{
        background: isLight
          ? 'linear-gradient(135deg, #e8f4fd 0%, #f0e8d4 100%)'
          : 'linear-gradient(135deg, #0E0E12 0%, #1E1E28 100%)',
        borderColor: isLight ? 'rgba(201,168,76,0.3)' : 'rgba(201,168,76,0.2)',
      }}
    >
      {/* Stars (dark mode) */}
      {!isLight && (
        <>
          <span className="absolute top-1.5 left-2 w-0.5 h-0.5 rounded-full bg-ivory/60" />
          <span className="absolute top-3 left-3.5 w-0.5 h-0.5 rounded-full bg-ivory/40" />
          <span className="absolute top-2 left-1 w-px h-px rounded-full bg-ivory/50" />
        </>
      )}

      {/* Sun rays (light mode) */}
      {isLight && (
        <div className="absolute inset-0 flex items-center justify-start pl-1.5">
          {[...Array(4)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="absolute w-px h-2 rounded-full bg-gold/40"
              style={{
                transformOrigin: '50% 200%',
                rotate: `${i * 45}deg`,
                left: 10,
                top: 7,
              }}
            />
          ))}
        </div>
      )}

      {/* Sliding thumb */}
      <motion.div
        layout
        animate={{ x: isLight ? 30 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute top-1 w-5 h-5 rounded-full shadow-md flex items-center justify-center"
        style={{
          background: isLight
            ? 'linear-gradient(135deg, #F5C842 0%, #E8A020 100%)'
            : 'linear-gradient(135deg, #d0d8f0 0%, #b0bbd8 100%)',
          boxShadow: isLight
            ? '0 0 8px rgba(245,200,66,0.6), 0 1px 3px rgba(0,0,0,0.2)'
            : '0 0 6px rgba(176,187,216,0.4), 0 1px 3px rgba(0,0,0,0.5)',
        }}
      >
        <AnimatePresence mode="wait">
          {isLight ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={10} className="text-amber-700" strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={10} className="text-ink-800" strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
