// src/app/login/page.tsx
'use client';

import { useState, useEffect, FormEvent, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { ApiError } from '@/lib/api';
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck,
  User, AlertCircle, CheckCircle2, GitBranch, Sparkles, FileCheck2,
} from 'lucide-react';
import Logo, { LogoMark } from '@/components/ui/Logo';
import { Spinner, PageLoader } from '@/components/ui/Spinner';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Mirrors the backend rules: pydantic EmailStr + password min_length=6.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PASSWORD_MIN = 6;

function emailError(value: string): string {
  if (!value.trim()) return 'Email is required.';
  if (!EMAIL_RE.test(value.trim())) return 'That doesn’t look like a valid email address.';
  return '';
}

function passwordError(value: string, mode: 'login' | 'signup'): string {
  if (!value) return 'Password is required.';
  if (mode === 'signup' && value.length < PASSWORD_MIN) {
    return `Use at least ${PASSWORD_MIN} characters.`;
  }
  return '';
}

/** 0–4 heuristic, only shown on signup. */
function passwordStrength(value: string): { score: number; label: string } {
  if (!value) return { score: 0, label: '' };
  let score = 0;
  if (value.length >= PASSWORD_MIN) score++;
  if (value.length >= 10) score++;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
  if (/\d/.test(value) || /[^a-zA-Z0-9]/.test(value)) score++;
  const label =
    value.length < PASSWORD_MIN ? 'Too short'
    : score <= 2 ? 'Okay'
    : score === 3 ? 'Good'
    : 'Strong';
  return { score, label };
}

const STRENGTH_COLORS = ['#E05A5A', '#E05A5A', '#C9A84C', '#DFC070', '#3AAFA9'];

/* ── Field — labelled input row with icon, trailing slot and inline error ── */
function Field({
  id, label, icon, error, valid, trailing, children,
}: {
  id: string;
  label: string;
  icon: ReactNode;
  error?: string;
  valid?: boolean;
  trailing?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[10px] text-ivory-dim uppercase tracking-widest mb-1.5 block font-semibold">
        {label}
      </label>
      <div
        className="input-base flex items-center gap-2.5 !py-0 !px-0 overflow-hidden"
        style={error ? { borderColor: 'rgba(224,90,90,0.55)', boxShadow: '0 0 0 3px rgba(224,90,90,0.10)' } : undefined}
      >
        <span className="flex items-center pl-3.5 flex-shrink-0 text-ink-500">{icon}</span>
        {children}
        {valid && !error && (
          <span className="flex items-center pr-3.5 flex-shrink-0">
            <CheckCircle2 size={14} className="text-jade/80" />
          </span>
        )}
        {trailing}
      </div>
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 6 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="flex items-start gap-1.5 text-[11px] text-crimson leading-snug overflow-hidden"
            role="alert"
          >
            <AlertCircle size={12} className="mt-px flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass =
  'flex-1 bg-transparent border-none outline-none py-2.5 text-sm text-ivory placeholder:text-ivory-dim min-w-0';

const BRAND_POINTS = [
  { icon: FileCheck2, text: 'Pixel-perfect PDFs, typeset with real LaTeX.' },
  { icon: GitBranch, text: 'One master resume, tailored branches per job.' },
  { icon: Sparkles, text: 'AI that rephrases your story — never invents it.' },
] as const;

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, signIn, signUp } = useAuth();

  const [mode, setMode]             = useState<'login' | 'signup'>('login');
  const [name, setName]             = useState('');
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [touched, setTouched]       = useState({ email: false, password: false });
  const [capsLock, setCapsLock]     = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (!loading && user) router.replace('/');
  }, [user, loading, router]);

  const emailErr = touched.email ? emailError(email) : '';
  const passErr  = touched.password ? passwordError(password, mode) : '';
  const strength = passwordStrength(password);

  const switchMode = (m: 'login' | 'signup') => {
    setMode(m);
    setServerError('');
    setTouched({ email: false, password: false });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (emailError(email) || passwordError(password, mode)) return;

    setSubmitting(true);
    setServerError('');
    try {
      if (mode === 'signup') {
        await signUp(email.trim(), password, name.trim() || undefined);
      } else {
        await signIn(email.trim(), password);
      }
      router.replace('/');
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setServerError('Incorrect email or password.');
      } else if (err instanceof ApiError && err.status === 409) {
        setServerError('An account with this email already exists. Please log in instead.');
        setMode('login');
      } else if (err instanceof ApiError && err.status === 422) {
        // Backend-side validation (shouldn't be reachable past the inline checks).
        setServerError('Please double-check your email address and password.');
      } else if (err instanceof ApiError && err.status >= 500) {
        setServerError(err.message || 'Could not reach the server. Is the backend running on port 8000?');
      } else if (err instanceof ApiError) {
        setServerError(err.message);
      } else {
        setServerError('Something went wrong. Is the backend running?');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PageLoader label="Checking your session…" />;

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-gold/25 selection:text-ivory">
      {/* Atmosphere: orbs + radial wash + faint grid + giant lambda */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb w-[520px] h-[520px] bg-gold/[0.07] -top-28 -left-32" />
        <div className="orb w-[420px] h-[420px] bg-jade/[0.045] -bottom-24 -right-28" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(50% 50% at 50% 45%, rgba(201,168,76,0.07), transparent 70%)',
        }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 60% 55% at 50% 45%, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 55% at 50% 45%, black, transparent 75%)',
        }} />
        <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-serif italic text-gold/[0.04] leading-none select-none" style={{ fontSize: '24rem' }}>λ</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative z-10 w-full max-w-4xl"
      >
        {/* The folio: brand panel + form panel in one frame */}
        <div className="grid lg:grid-cols-[1.05fr_1fr] rounded-2xl overflow-hidden border border-gold/15 shadow-[0_8px_60px_rgba(0,0,0,0.5)]">

          {/* ── Left: brand panel (self-contained dark, like the logo badge) ── */}
          <div
            className="relative hidden lg:flex flex-col justify-between p-10 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #14141B 0%, #0A0A0E 100%)' }}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gold/[0.06] blur-3xl" />
              <span className="absolute -bottom-16 -left-6 font-serif italic text-gold/[0.05] leading-none select-none" style={{ fontSize: '15rem' }}>λ</span>
            </div>

            <div className="relative">
              <Logo size={34} />
              <h2 className="font-serif text-[28px] leading-snug font-semibold tracking-tight mt-9 text-balance" style={{ color: '#F5F0E8' }}>
                Your career,<br />
                <span className="text-shimmer">beautifully typeset.</span>
              </h2>
            </div>

            {/* Typeset vignette — a resume mid-compile */}
            <div className="relative my-8 rounded-xl border border-gold/[0.14] bg-black/30 px-5 py-4 font-mono text-[11px] leading-[1.9]">
              <span className="text-gold/60">\documentclass</span><span className="text-ivory/40">{'{'}</span><span className="text-jade/70">career</span><span className="text-ivory/40">{'}'}</span>
              <br />
              <span className="text-gold/60">\begin</span><span className="text-ivory/40">{'{'}</span><span className="text-jade/70">document</span><span className="text-ivory/40">{'}'}</span>
              <br />
              <span className="pl-4 inline-block text-ivory/55">\section{'{'}<span className="text-ivory/80">Experience</span>{'}'}</span>
              <br />
              <span className="pl-4 inline-block text-ivory/35">% tailored for every job you chase</span>
              <br />
              <span className="text-gold/60">\end</span><span className="text-ivory/40">{'{'}</span><span className="text-jade/70">document</span><span className="text-ivory/40">{'}'}</span>
              <span className="ml-1 inline-block w-[7px] h-[13px] align-middle bg-gold/70 animate-pulse" />
            </div>

            <ul className="relative flex flex-col gap-3.5">
              {BRAND_POINTS.map(({ icon: Icon, text }, i) => (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.12, ease: EASE }}
                  className="flex items-center gap-3 text-[13px]"
                  style={{ color: '#C8C2B4' }}
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg border border-gold/20 bg-gold/[0.07] flex-shrink-0">
                    <Icon size={13} className="text-gold" />
                  </span>
                  {text}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ── Right: form panel ── */}
          <div className="card-glass !rounded-none !border-0 p-7 sm:p-9 flex flex-col justify-center">
            {/* Compact header (logo shows here on small screens only) */}
            <div className="text-center mb-7">
              <div className="relative inline-flex lg:hidden items-center justify-center mb-4">
                <div className="absolute w-14 h-14 rounded-full bg-gold/12 blur-xl" />
                <LogoMark size={48} className="relative" />
              </div>
              <h1 className="font-serif text-[26px] font-semibold text-ivory tracking-tight text-balance">
                {mode === 'login' ? 'Welcome back.' : 'Create your account.'}
              </h1>
              <p className="text-ivory/50 text-[13px] mt-1.5">
                {mode === 'login' ? 'Log in to keep building your resume.' : 'Start crafting your perfectly typeset resume.'}
              </p>
            </div>

            {/* Mode toggle — animated pill */}
            <div className="flex items-center bg-ink-900/60 rounded-xl p-1 border border-ink-700/60 mb-6">
              {(['login', 'signup'] as const).map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => switchMode(m)}
                  className={`relative flex-1 py-2 text-xs font-semibold rounded-lg transition-colors duration-200 cursor-pointer ${
                    mode === m ? 'text-ink-950' : 'text-ivory-muted hover:text-ivory'
                  }`}
                >
                  {mode === m && (
                    <motion.span
                      layoutId="mode-pill"
                      transition={{ duration: 0.3, ease: EASE }}
                      className="absolute inset-0 rounded-lg bg-gold shadow-md shadow-gold/20"
                    />
                  )}
                  <span className="relative">{m === 'login' ? 'Log In' : 'Sign Up'}</span>
                </button>
              ))}
            </div>

            <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name — signup only, optional */}
              <AnimatePresence initial={false}>
                {mode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <Field id="auth-name" label="Name · optional" icon={<User size={14} />}>
                      <input
                        id="auth-name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="How should we greet you?"
                        maxLength={120}
                        className={`${inputClass} pr-3.5`}
                        style={{ boxShadow: 'none' }}
                      />
                    </Field>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email */}
              <Field
                id="auth-email"
                label="Email"
                icon={<Mail size={14} />}
                error={emailErr}
                valid={touched.email && !!email && !emailError(email)}
              >
                <input
                  id="auth-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, email: true }))}
                  placeholder="you@example.com"
                  className={`${inputClass} pr-3.5`}
                  style={{ boxShadow: 'none' }}
                  aria-invalid={!!emailErr}
                />
              </Field>

              {/* Password */}
              <Field
                id="auth-password"
                label="Password"
                icon={<Lock size={14} />}
                error={passErr}
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="flex items-center pr-3.5 flex-shrink-0 text-ink-500 hover:text-ivory-muted transition-colors cursor-pointer"
                    tabIndex={-1}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                  >
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                }
              >
                <input
                  id="auth-password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, password: true }))}
                  onKeyUp={e => setCapsLock(e.getModifierState?.('CapsLock') ?? false)}
                  placeholder={mode === 'signup' ? `At least ${PASSWORD_MIN} characters` : '••••••••'}
                  className={inputClass}
                  style={{ boxShadow: 'none' }}
                  aria-invalid={!!passErr}
                />
              </Field>

              {/* Caps lock hint */}
              <AnimatePresence initial={false}>
                {capsLock && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-1.5 text-[11px] text-gold/80 -mt-2 overflow-hidden"
                  >
                    <AlertCircle size={12} className="flex-shrink-0" />
                    Caps Lock is on.
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Strength meter — signup only */}
              <AnimatePresence initial={false}>
                {mode === 'signup' && password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="-mt-1.5 overflow-hidden"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1 flex-1">
                        {[1, 2, 3, 4].map(step => (
                          <span
                            key={step}
                            className="h-[3px] flex-1 rounded-full transition-colors duration-300"
                            style={{
                              background: strength.score >= step ? STRENGTH_COLORS[strength.score] : 'var(--ink-600)',
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-semibold tracking-wide flex-shrink-0" style={{ color: STRENGTH_COLORS[strength.score] }}>
                        {strength.label}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Server error */}
              <AnimatePresence initial={false}>
                {serverError && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-crimson bg-crimson/10 border border-crimson/20 rounded-xl px-3.5 py-2.5 leading-relaxed overflow-hidden"
                    role="alert"
                  >
                    {serverError}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button type="submit" disabled={submitting} className="btn-primary w-full mt-1">
                {submitting && <Spinner size={14} tone="current" />}
                {mode === 'login' ? 'Log In' : 'Create Account'}
                {!submitting && <ArrowRight size={14} />}
              </button>

              {/* Switch mode */}
              <p className="text-center text-xs text-ivory-dim pt-0.5">
                {mode === 'login' ? (
                  <>Don&apos;t have an account?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode('signup')}
                      className="text-gold hover:text-gold-light transition-colors font-semibold cursor-pointer"
                    >
                      Sign up free
                    </button>
                  </>
                ) : (
                  <>Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode('login')}
                      className="text-gold hover:text-gold-light transition-colors font-semibold cursor-pointer"
                    >
                      Log in
                    </button>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>

        {/* Security note */}
        <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-ink-500 mt-6">
          <ShieldCheck size={11} className="text-jade/60" />
          Your resumes are stored securely on your own database.
        </p>

        {/* Back to home */}
        <p className="text-center mt-3">
          <button
            onClick={() => router.push('/')}
            className="text-[11px] text-ivory-dim hover:text-ivory-muted transition-colors cursor-pointer"
          >
            ← Back to home
          </button>
        </p>
      </motion.div>
    </div>
  );
}
