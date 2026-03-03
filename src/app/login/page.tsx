// src/app/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router   = useRouter();
  const { user, loading } = useAuth();
  const supabase = createClient();

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

    if (mode === 'signup') {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        // Supabase explicit error (e.g. weak password, invalid email)
        setError(error.message);
      } else if (data.user && data.user.identities && data.user.identities.length === 0) {
        // Supabase silently "succeeds" for existing emails when email confirmation is ON
        // but returns an empty identities array — this means the email is already registered
        setError('An account with this email already exists. Please log in instead.');
        setMode('login');
      } else {
        setSuccess('Account created! Check your email to confirm, then log in.');
        setMode('login');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else router.replace('/');   // ← go to landing, not builder
    }
    setSubmitting(false);
  };

  if (loading) return (
    <div className="h-screen bg-ink-950 flex items-center justify-center">
      <Loader2 size={24} className="text-gold animate-spin" />
    </div>
  );

  return (
    <div className="h-screen bg-ink-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-gold/30 bg-gold/5 mb-4">
            <span className="text-gold text-xl font-mono font-bold">λ</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-ivory">ResumeTeX Builder</h1>
          <p className="text-ivory-muted text-sm mt-1">Craft your perfect LaTeX resume</p>
        </div>

        <div className="bg-ink-900 border border-ink-700 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center bg-ink-800 rounded-lg p-0.5 border border-ink-700 mb-6">
            {(['login', 'signup'] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); setSuccess(''); }}
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${mode === m ? 'bg-gold text-ink-950' : 'text-ivory-muted hover:text-ivory'}`}>
                {m === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] text-ivory-dim uppercase tracking-wider mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" style={{ top: '50%' }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  placeholder="you@example.com" className="input-base pl-8 w-full" style={{ paddingLeft: '32px' }} />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-ivory-dim uppercase tracking-wider mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" style={{ top: '50%' }} />
                <input type={showPass ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  placeholder="••••••••" className="input-base pl-8 pr-8 w-full" style={{ paddingLeft: '32px', paddingRight: '32px' }} />
                <button onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ivory-muted" style={{ top: '50%' }} >
                  {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>
            </div>

            {error   && <p className="text-xs text-crimson bg-crimson/10 border border-crimson/20 rounded-lg px-3 py-2">{error}</p>}
            {success && <p className="text-xs text-jade  bg-jade/10  border border-jade/20  rounded-lg px-3 py-2">{success}</p>}

            <button onClick={handleSubmit} disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-gold text-ink-950 font-semibold text-sm rounded-xl hover:bg-gold-light transition-all disabled:opacity-60 mt-1">
              {submitting && <Loader2 size={14} className="animate-spin" />}
              {mode === 'login' ? 'Log In' : 'Create Account'}
            </button>

            {/* Switch mode helper */}
            <p className="text-center text-xs text-ivory-dim pt-1">
              {mode === 'login' ? (
                <>Don't have an account?{' '}
                  <button onClick={() => { setMode('signup'); setError(''); setSuccess(''); }}
                    className="text-gold hover:text-gold-light transition-colors font-medium">
                    Sign up free
                  </button>
                </>
              ) : (
                <>Already have an account?{' '}
                  <button onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                    className="text-gold hover:text-gold-light transition-colors font-medium">
                    Log in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        <p className="text-center text-[11px] text-ink-500 mt-4">
          Your resumes are stored securely in the cloud.
        </p>
      </div>
    </div>
  );
}