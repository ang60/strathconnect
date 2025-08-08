"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Redirect to login if not authenticated
        router.push('/auth/login');
        return;
      }

      if (requiredRole && user.role !== requiredRole) {
        // Redirect to dashboard if user doesn't have required role
        router.push('/dashboard');
        return;
      }
    }
  }, [user, isLoading, requiredRole, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render children if not authenticated or doesn't have required role
  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
}
