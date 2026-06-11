// src/lib/gate.ts
// Client for the Gated Access module mounted at /gate on the backend.
// Flow: sign in -> do the action -> get a one-time code by email -> redeem it
// for a JWT. That JWT unlocks AI tailoring: /tools/transform requires it in an
// X-Gate-Token header and answers 403 GATE_LOCKED without it.
//
// The gate has its own session cookie (set on /auth/callback) and its own
// error shape: { "error": "..." } instead of FastAPI's { "detail": "..." } —
// hence the dedicated fetch helper instead of api().

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? '/backend-api').replace(/\/$/, '');
const TOKEN_KEY = 'resumetex.gateToken';

export interface GateSession {
  authenticated: boolean;
  username?: string;
  email?: string | null;
  /** Human-readable action label, e.g. "Follow @NI3singh on GitHub". */
  action: string;
  action_done?: boolean;
  verified?: boolean;
  demo_mode: boolean;
}

export class GateError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'GateError';
    this.status = status;
  }
}

async function gateFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}/gate${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers ?? {}),
    },
  });
  const raw = await res.text();
  let payload: unknown = null;
  if (raw) {
    try { payload = JSON.parse(raw); } catch { /* non-JSON (redirect page etc.) */ }
  }
  if (!res.ok) {
    const message =
      payload && typeof payload === 'object' && 'error' in payload
        ? String((payload as { error: unknown }).error)
        : 'Request failed';
    throw new GateError(res.status, message);
  }
  return payload as T;
}

// ---------------------------------------------------------------------------
// Access-token storage (localStorage — per browser, survives reloads).
// ---------------------------------------------------------------------------

/** The stored gate token, or null when absent/expired/malformed. */
export function getGateToken(): string | null {
  if (typeof window === 'undefined') return null;
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (!token) return null;
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const claims = JSON.parse(atob(payload)) as { exp?: number };
    // 30s of slack so a token doesn't expire mid-request.
    if (typeof claims.exp === 'number' && claims.exp * 1000 > Date.now() + 30_000) {
      return token;
    }
  } catch { /* malformed -> treat as absent */ }
  window.localStorage.removeItem(TOKEN_KEY);
  return null;
}

export function clearGateToken(): void {
  if (typeof window !== 'undefined') window.localStorage.removeItem(TOKEN_KEY);
}

/**
 * Server-checked unlock state. The local expiry check alone isn't enough —
 * the server's signing secret may have rotated (e.g. demo -> live), which
 * invalidates stored tokens before they expire. /api/me verifies the token
 * with the current secret; a 401 means the token is dead, so drop it.
 */
export async function gateCheckUnlocked(): Promise<boolean> {
  const token = getGateToken();
  if (!token) return false;
  try {
    await gateFetch('/api/me', { headers: { Authorization: `Bearer ${token}` } });
    return true;
  } catch (err) {
    if (err instanceof GateError && err.status === 401) clearGateToken();
    // Other failures (backend down, gate unconfigured): keep the token but
    // report locked — transform wouldn't work either, and the unlock card
    // explains what's wrong.
    return false;
  }
}

// ---------------------------------------------------------------------------
// The four flow steps.
// ---------------------------------------------------------------------------

export function gateSession(): Promise<GateSession> {
  return gateFetch<GateSession>('/api/session');
}

/**
 * Demo sign-in completes entirely in the background: /auth/login 302s to the
 * root-relative /auth/callback (proxied back to the gate by next.config.js),
 * which sets the gate's session cookie along the redirect chain.
 */
export async function gateDemoSignIn(): Promise<void> {
  await fetch(`${API_URL}/gate/auth/login`, { credentials: 'include' });
}

/** Real (GitHub) sign-in must leave the page — open this URL in a new tab. */
export function gateLoginUrl(): string {
  return `${API_URL}/gate/auth/login`;
}

/** Demo only: flip the "I did the action" switch the manual verifier checks. */
export function gateDemoPerformAction(): Promise<{ ok: boolean }> {
  return gateFetch<{ ok: boolean }>('/dev/perform-action', { method: 'POST' });
}

/** Check the action; on success the gate emails a one-time code. */
export function gateVerify(): Promise<{ verified: boolean; code_sent: boolean }> {
  return gateFetch<{ verified: boolean; code_sent: boolean }>('/api/verify', { method: 'POST' });
}

/** Exchange the emailed code for an access token (stored on success). */
export async function gateRedeem(code: string): Promise<string> {
  const res = await gateFetch<{ access: boolean; token: string }>('/api/redeem', {
    method: 'POST',
    body: JSON.stringify({ code }),
  });
  window.localStorage.setItem(TOKEN_KEY, res.token);
  return res.token;
}

/** Demo only: fish the newest one-time code out of the captured demo inbox. */
export async function gateDemoInboxCode(): Promise<string | null> {
  const res = await gateFetch<{ messages: Array<{ text?: string }> }>('/dev/inbox');
  for (const message of res.messages ?? []) {
    // Codes use an unambiguous alphabet (no 0/O/1/I/L), 8 chars.
    const match = message.text?.match(/\b[A-HJKMNP-Z2-9]{8}\b/);
    if (match) return match[0];
  }
  return null;
}
