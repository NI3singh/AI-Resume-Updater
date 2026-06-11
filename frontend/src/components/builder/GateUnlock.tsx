// src/components/builder/GateUnlock.tsx
// The unlock card shown inside the Transform panel while AI tailoring is
// locked. Walks the Gated Access flow: sign in -> do the action -> email a
// one-time code -> redeem it. In demo mode every step works locally (simulated
// sign-in, an "I did it" switch, and a demo inbox holding the code).

'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Check, Inbox, KeyRound, Lock, LogIn, MailCheck, RefreshCw } from 'lucide-react';
import {
  GateError,
  GateSession,
  gateDemoInboxCode,
  gateDemoPerformAction,
  gateDemoSignIn,
  gateLoginUrl,
  gateRedeem,
  gateSession,
  gateVerify,
} from '@/lib/gate';
import { Spinner } from '@/components/ui/Spinner';

interface GateUnlockProps {
  /** Set when a previously-granted unlock expired — explains the re-lock. */
  expired?: boolean;
  onUnlocked: () => void;
}

type Busy = 'signin' | 'action' | 'verify' | 'inbox' | 'redeem' | null;

export default function GateUnlock({ expired, onUnlocked }: GateUnlockProps) {
  const [session, setSession]   = useState<GateSession | null>(null);
  const [loading, setLoading]   = useState(true);
  const [busy, setBusy]         = useState<Busy>(null);
  const [error, setError]       = useState('');
  const [notice, setNotice]     = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode]         = useState('');

  const refresh = useCallback(async () => {
    setError('');
    try {
      setSession(await gateSession());
    } catch (err) {
      setError(
        err instanceof GateError && err.status === 503
          ? err.message
          : "Couldn't reach the unlock service — is the backend running?",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const run = async (kind: Busy, fn: () => Promise<void>) => {
    if (busy) return;
    setBusy(kind); setError(''); setNotice('');
    try {
      await fn();
    } catch (err) {
      console.error('Gate step failed:', err);
      setError(err instanceof GateError ? err.message : 'Something went wrong — please try again.');
    } finally {
      setBusy(null);
    }
  };

  const signIn = () => run('signin', async () => {
    if (session?.demo_mode) {
      await gateDemoSignIn();
      await refresh();
    } else {
      window.open(gateLoginUrl(), '_blank', 'noopener');
      setNotice('Finish signing in on the new tab, then come back and press Refresh.');
    }
  });

  const simulateAction = () => run('action', async () => {
    await gateDemoPerformAction();
    await refresh();
  });

  const requestCode = () => run('verify', async () => {
    const res = await gateVerify();
    if (!res.verified) {
      setNotice(`We couldn't confirm it yet — ${session?.action ?? 'do the action'} first, then try again.`);
      return;
    }
    setCodeSent(true);
  });

  const fillFromInbox = () => run('inbox', async () => {
    const found = await gateDemoInboxCode();
    if (found) setCode(found);
    else setNotice('No code in the demo inbox yet — request one first.');
  });

  const unlock = () => run('redeem', async () => {
    await gateRedeem(code.trim());
    onUnlocked();
  });

  const authenticated = !!session?.authenticated;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-ink-700/60 bg-ink-800/40 p-4 space-y-3"
    >
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-lg border border-gold/30 bg-gold/[0.08] flex items-center justify-center flex-shrink-0">
          <Lock size={14} className="text-gold" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-ivory text-sm">
            {expired ? 'Your unlock expired' : 'Unlock AI tailoring'}
          </h3>
          <p className="text-ivory/50 text-xs mt-0.5 leading-relaxed">
            {session?.action ? (
              <>One quick step — <span className="text-ivory-muted">{session.action}</span> — and we&apos;ll email you an access code.</>
            ) : (
              'Complete one quick step and we’ll email you an access code.'
            )}
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-crimson/30 bg-crimson/[0.07] px-3 py-2">
          <AlertTriangle size={13} className="text-crimson flex-shrink-0 mt-0.5" />
          <p className="text-crimson/90 text-xs leading-relaxed">{error}</p>
        </div>
      )}
      {notice && !error && (
        <div className="flex items-start gap-2 rounded-lg border border-gold/25 bg-gold/[0.06] px-3 py-2">
          <AlertTriangle size={13} className="text-gold flex-shrink-0 mt-0.5" />
          <p className="text-ivory/60 text-xs leading-relaxed">{notice}</p>
        </div>
      )}

      {loading ? (
        <div className="py-4 text-center"><Spinner size={24} /></div>
      ) : !authenticated ? (
        /* Step 1 — sign in */
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={signIn}
            disabled={busy !== null}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer shadow-sm shadow-gold/25 disabled:opacity-50"
          >
            {busy === 'signin' ? <Spinner size={12} tone="current" /> : <LogIn size={13} />}
            {session?.demo_mode ? 'Sign in (demo)' : 'Sign in with GitHub'}
          </button>
          {!session?.demo_mode && (
            <button
              onClick={refresh}
              disabled={busy !== null}
              className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={12} /> Refresh
            </button>
          )}
        </div>
      ) : !codeSent ? (
        /* Step 2 — do the action, then request the code */
        <div className="space-y-2.5">
          <p className="flex items-center gap-1.5 text-[11px] text-ivory/50">
            <Check size={12} className="text-jade" />
            Signed in as <span className="text-ivory-muted font-medium">{session?.username}</span>
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {session?.demo_mode && !session?.action_done && (
              <button
                onClick={simulateAction}
                disabled={busy !== null}
                className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg border border-ink-600/80 text-ivory-muted hover:text-ivory transition-colors cursor-pointer disabled:opacity-50"
              >
                {busy === 'action' ? <Spinner size={12} tone="current" /> : <Check size={13} />}
                I did the action (demo)
              </button>
            )}
            <button
              onClick={requestCode}
              disabled={busy !== null}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer shadow-sm shadow-gold/25 disabled:opacity-50"
            >
              {busy === 'verify' ? <Spinner size={12} tone="current" /> : <MailCheck size={13} />}
              I did it — email my code
            </button>
          </div>
        </div>
      ) : (
        /* Step 3 — redeem the code */
        <div className="space-y-2">
          <label htmlFor="gate-code" className="text-[10px] text-ivory-dim uppercase tracking-widest block font-semibold">
            Access code {session?.demo_mode ? '(demo inbox below)' : '(check your email)'}
          </label>
          <div className="flex items-center gap-2">
            <input
              id="gate-code"
              type="text"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === 'Enter' && code.trim() && unlock()}
              disabled={busy !== null}
              maxLength={12}
              placeholder="e.g. 7XK2MQ4P"
              autoFocus
              className="input-base !px-3 !py-2 !text-xs font-mono tracking-widest flex-1 disabled:opacity-60"
            />
            <button
              onClick={unlock}
              disabled={!code.trim() || busy !== null}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-lg bg-gold text-ink-950 font-semibold hover:bg-gold-light transition-colors cursor-pointer disabled:opacity-50"
            >
              {busy === 'redeem' ? <Spinner size={12} tone="current" /> : <KeyRound size={13} />}
              Unlock
            </button>
          </div>
          {session?.demo_mode && (
            <button
              onClick={fillFromInbox}
              disabled={busy !== null}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] rounded-lg text-ivory-dim hover:text-ivory transition-colors cursor-pointer disabled:opacity-50"
            >
              {busy === 'inbox' ? <Spinner size={11} tone="current" /> : <Inbox size={12} />}
              Fill from demo inbox
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}
