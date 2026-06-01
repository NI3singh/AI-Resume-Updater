// src/lib/api.ts
// Thin fetch wrapper around the FastAPI backend.
// Auth is cookie-based, so every request sends credentials. Non-2xx responses
// throw an ApiError carrying the HTTP status + server-provided detail message.

// Same-origin proxy path (see next.config.js rewrites). Keeps the auth cookie
// first-party. Can be overridden with NEXT_PUBLIC_API_URL for other setups.
const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? '/backend-api').replace(/\/$/, '');

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function buildInit(options: RequestInit): RequestInit {
  const isForm = typeof FormData !== 'undefined' && options.body instanceof FormData;
  const hasBody = options.body !== undefined && options.body !== null;
  return {
    ...options,
    credentials: 'include',
    headers: {
      // Let the browser set the multipart boundary for FormData bodies.
      ...(hasBody && !isForm ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers ?? {}),
    },
  };
}

async function errorFrom(res: Response): Promise<ApiError> {
  let payload: unknown = null;
  const raw = await res.text();
  if (raw) {
    try { payload = JSON.parse(raw); } catch { payload = raw; }
  }
  const detail =
    payload && typeof payload === 'object' && 'detail' in payload
      ? (payload as { detail: unknown }).detail
      : payload;
  const message = typeof detail === 'string' ? detail : res.statusText || 'Request failed';
  return new ApiError(res.status, message);
}

export async function api<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, buildInit(options));
  if (res.status === 204) return undefined as T;
  if (!res.ok) throw await errorFrom(res);

  const raw = await res.text();
  if (!raw) return undefined as T;
  try { return JSON.parse(raw) as T; } catch { return raw as unknown as T; }
}

// Like api(), but returns the raw response body as a Blob (e.g. compiled PDF).
export async function apiBlob(path: string, options: RequestInit = {}): Promise<Blob> {
  const res = await fetch(`${API_URL}${path}`, buildInit(options));
  if (!res.ok) throw await errorFrom(res);
  return res.blob();
}
