// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { api, ApiError } from '@/lib/api';

export interface AppUser {
  id: string;
  email: string;
  display_name: string | null;
  github_username: string | null;
}

export interface ProfilePatch {
  display_name?: string;
  github_username?: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (patch: ProfilePatch) => Promise<AppUser>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateProfile: async () => { throw new Error('AuthProvider is not mounted'); },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Bootstrap the session from the auth cookie on first load.
  useEffect(() => {
    (async () => {
      try {
        setUser(await api<AppUser>('/auth/me'));
      } catch (err) {
        // 401 simply means "not logged in" — anything else is worth logging.
        if (!(err instanceof ApiError) || err.status !== 401) {
          console.error('auth bootstrap:', err);
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setUser(await api<AppUser>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }));
  }, []);

  const signUp = useCallback(async (email: string, password: string, displayName?: string) => {
    setUser(await api<AppUser>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, display_name: displayName }),
    }));
  }, []);

  const signOut = useCallback(async () => {
    // Optimistic: flip the UI immediately; server-side session revocation is
    // best-effort in the background (the cookie is HttpOnly — only the backend
    // can clear it, but the UI shouldn't freeze waiting on that round-trip).
    setUser(null);
    try {
      await api('/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('logout:', err);
    }
  }, []);

  const updateProfile = useCallback(async (patch: ProfilePatch) => {
    const updated = await api<AppUser>('/auth/me', {
      method: 'PATCH',
      body: JSON.stringify(patch),
    });
    setUser(updated);
    return updated;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
