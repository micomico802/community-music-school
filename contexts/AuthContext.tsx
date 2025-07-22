
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { User, UserRole } from '../types';
import { dummyUsers } from '../data/dummyData';

interface AuthContextType {
  user: User | null;
  login: (email: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem('music-school-user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback((email: string): boolean => {
    setIsLoading(true);
    const foundUser = dummyUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('music-school-user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('music-school-user');
  }, []);

  const value = useMemo(() => ({ user, login, logout, isLoading }), [user, login, logout, isLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
