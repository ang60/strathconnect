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
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar 
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
        />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64">
            <Sidebar 
              isMobile={true}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          showMenuButton={true}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
