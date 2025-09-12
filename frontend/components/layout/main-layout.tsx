"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function MainLayout({ children, showSidebar = true }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // If showSidebar is false, render just the content without sidebar/navbar
  if (!showSidebar) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="flex h-screen relative overflow-hidden">
      {/* Blue Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block relative z-10">
        <Sidebar 
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
        />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-72">
            <Sidebar 
              isMobile={true}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden relative z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          <Navbar 
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            showMenuButton={true}
          />
        </div>
        <main className="flex-1 overflow-auto relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
