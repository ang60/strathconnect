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
      localStorage.removeItem('accessToken');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the API call fails, clear local state
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    }
  };

  const refreshUser = async () => {
    try {
      const userData = await apiService.getCurrentUser();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error('Failed to refresh user:', error);
      // If refresh fails, clear user data and token
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      throw error; // Re-throw to let caller handle it
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
          // If this fails (e.g., token expired), we'll gracefully fall back to stored data
          try {
            await refreshUser();
          } catch (refreshError) {
            console.log('Unable to refresh user data, keeping stored user data:', refreshError.message);
            // Keep the stored user data and let the user continue
            // They can logout manually if needed
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Only clear localStorage if there's a critical error
        // Don't clear on token expiration
        if (!error.message?.includes('Invalid or expired token')) {
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
          setUser(null);
        }
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
