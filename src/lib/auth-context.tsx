import { AxiosError } from 'axios';
import { createContext, useContext, useState } from 'react';

import { loginRequest } from '@/services/auth.service';
import type { OAuthErrorResponse } from '@/services/types/auth-errors';

type LoginResult = {
  success: boolean;
  error?: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

  async function login(email: string, password: string): Promise<LoginResult> {
    setIsLoading(true);

    try {
      const token = await loginRequest(email, password);

      localStorage.setItem('access_token', token.access_token);
      setIsAuthenticated(true);

      return { success: true };
    } catch (err) {
      const error = err as AxiosError<OAuthErrorResponse>;

      const message = error.response?.data?.error ?? 'Erro inesperado ao realizar login';

      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
