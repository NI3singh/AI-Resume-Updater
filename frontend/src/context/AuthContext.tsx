// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { api, ApiError } from '@/lib/api';

export interface AppUser {
  id: string;
  email: string;
  display_name: string | null;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
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
    try {
      await api('/auth/logout', { method: 'POST' });
    } finally {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
