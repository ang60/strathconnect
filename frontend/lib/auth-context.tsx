"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiService, LoginRequest, LoginResponse } from './api';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  department: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (credentials: LoginRequest) => {
    try {
      const response: LoginResponse = await apiService.login(credentials);
      setUser(response.user);
      
      // Store user data in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the API call fails, clear local state
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  const refreshUser = async () => {
    try {
      const userData = await apiService.getCurrentUser();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to refresh user:', error);
      // If refresh fails, clear user data
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if user data exists in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          
          // Try to refresh the user data from the server
          await refreshUser();
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
