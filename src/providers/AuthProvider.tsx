import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User } from '@/types';

type AuthContextValue = {
  user: User | null;
  login: (name: string, role: User['role']) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem('rf_user');
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = (name: string, role: User['role']) => {
    const u: User = {
      id: 'u_' + Date.now(),
      name,
      email: name.toLowerCase().replace(/\s+/g, '.') + '@example.com',
      role,
      twoFAEnabled: role === 'admin',
    };
    setUser(u);
    localStorage.setItem('rf_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rf_user');
  };

  const value = useMemo(() => ({ user, login, logout, isAuthenticated: !!user }), [user]);
  if (loading) return null;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthProvider;
