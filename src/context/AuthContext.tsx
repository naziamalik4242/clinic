'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'OPERATOR';
  clinicId: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, token: string, userProfile: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Local storage check for persistence session
    const savedUser = localStorage.getItem('aura_user');
    const token = localStorage.getItem('aura_token');
    
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, token: string, userProfile: User) => {
    localStorage.setItem('aura_token', token);
    localStorage.setItem('aura_user', JSON.stringify(userProfile));
    setUser(userProfile);
  };

  const logout = () => {
    localStorage.removeItem('aura_token');
    localStorage.removeItem('aura_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be wrapped inside an AuthProvider structure.');
  }
  return context;
}