// src/app/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ApiError } from '@/lib/api';
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router   = useRouter();
  const { user, loading, signIn, signUp } = useAuth();

  const [mode, setMode]             = useState<'login' | 'signup'>('login');
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState('');
  const [success, setSuccess]       = useState('');

  useEffect(() => {
    if (!loading && user) router.replace('/');
  }, [user, loading]);

  const handleSubmit = async () => {
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setSubmitting(true); setError(''); setSuccess('');

    try {
      if (mode === 'signup') {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      router.replace('/');
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        // Account already exists — nudge the user to log in instead.
        setError('An account with this email already exists. Please log in instead.');
        setMode('login');
      } else if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Something went wrong. Is the backend running?');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="h-screen bg-ink-950 flex items-center justify-center">
      <Loader2 size={24} className="text-gold animate-spin" />
    </div>
  );

  return (
    <div className="h-screen bg-ink-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-gold/[0.06] -top-24 -left-32" />
        <div className="orb w-[400px] h-[400px] bg-jade/[0.045] -bottom-20 -right-24" />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo + heading */}
        <div className="text-center mb-8">
          {/* Logo mark with glow ring */}
          <div className="relative inline-flex items-center justify-center mb-5">
            <div className="absolute w-16 h-16 rounded-full bg-gold/10 blur-xl" />
            <div className="relative w-14 h-14 rounded-2xl border border-gold/35 bg-gold/[0.08] flex items-center justify-center shadow-lg shadow-gold/10">
              <span className="text-gold text-2xl font-mono font-bold">λ</span>
            </div>
          </div>
          <h1 className="font-display text-2xl font-bold text-ivory tracking-tight">ResumeTeX Builder</h1>
          <p className="text-ivory/50 text-sm mt-1.5">Craft your perfect LaTeX resume</p>
        </div>

        {/* Card */}
        <div className="card-glass">
          {/* Mode toggle */}
          <div className="flex items-center bg-ink-900/60 rounded-xl p-1 border border-ink-700/60 mb-6">
            {(['login', 'signup'] as const).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); setSuccess(''); }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  mode === m
                    ? 'bg-gold text-ink-950 shadow-md shadow-gold/20'
                    : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                {m === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="text-[10px] text-ivory-dim uppercase tracking-widest mb-1.5 block font-semibold">
                Email
              </label>
              <div className="input-base flex items-center gap-2.5 !py-0 !px-0 overflow-hidden">
                <span className="flex items-center pl-3.5 flex-shrink-0">
                  <Mail size={14} className="text-ink-500" />
                </span>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent border-none outline-none py-2.5 pr-3.5 text-sm text-ivory placeholder:text-ivory-dim min-w-0"
                  style={{ boxShadow: 'none' }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="text-[10px] text-ivory-dim uppercase tracking-widest mb-1.5 block font-semibold">
                Password
              </label>
              <div className="input-base flex items-center gap-2.5 !py-0 !px-0 overflow-hidden">
                <span className="flex items-center pl-3.5 flex-shrink-0">
                  <Lock size={14} className="text-ink-500" />
                </span>
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent border-none outline-none py-2.5 text-sm text-ivory placeholder:text-ivory-dim min-w-0"
                  style={{ boxShadow: 'none' }}
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="flex items-center pr-3.5 flex-shrink-0 text-ink-500 hover:text-ivory-muted transition-colors cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-crimson bg-crimson/10 border border-crimson/20 rounded-xl px-3.5 py-2.5 leading-relaxed">
                {error}
              </p>
            )}
            {/* Success */}
            {success && (
              <p className="text-xs text-jade bg-jade/10 border border-jade/20 rounded-xl px-3.5 py-2.5 leading-relaxed">
                {success}
              </p>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary w-full mt-1"
            >
              {submitting && <Loader2 size={14} className="animate-spin" />}
              {mode === 'login' ? 'Log In' : 'Create Account'}
              {!submitting && <ArrowRight size={14} />}
            </button>

            {/* Switch mode */}
            <p className="text-center text-xs text-ivory-dim pt-0.5">
              {mode === 'login' ? (
                <>Don&apos;t have an account?{' '}
                  <button
                    onClick={() => { setMode('signup'); setError(''); setSuccess(''); }}
                    className="text-gold hover:text-gold-light transition-colors font-semibold cursor-pointer"
                  >
                    Sign up free
                  </button>
                </>
              ) : (
                <>Already have an account?{' '}
                  <button
                    onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                    className="text-gold hover:text-gold-light transition-colors font-semibold cursor-pointer"
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Security note */}
        <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-ink-500 mt-5">
          <ShieldCheck size={11} className="text-jade/60" />
          Your resumes are stored securely in the cloud.
        </p>
      </div>
    </div>
  );
}