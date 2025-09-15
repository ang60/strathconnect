"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/lib/auth-context";
import { 
  Users, 
  Shield, 
  Settings, 
  Trophy, 
  MessageSquare, 
  Target, 
  Calendar, 
  Star, 
  BarChart3,
  User,
  Heart,
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
  X,
  Zap,
  Brain,
  Rocket,
  Sparkles
} from "lucide-react";

// Navigation configuration without JSX elements (to avoid SSR issues)
const getNavigationConfig = (userRole: string) => {
  const baseNavigation = [
    {
      title: "Main",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard",
          iconName: "Brain",
          roles: ["admin", "coordinator", "mentor", "mentee", "faculty", "student"]
        },
        {
          title: "Profile",
          href: "/profile",
          iconName: "User",
          roles: ["admin", "coordinator", "mentor", "mentee", "faculty", "student"]
        }
      ]
    },
    {
      title: "Core Features",
      items: [
        {
          title: "Matching",
          href: "/matching",
          iconName: "Zap",
          roles: ["admin", "coordinator", "mentor", "mentee", "faculty", "student"]
        },
        {
          title: "Programs",
          href: "/programs",
          iconName: "Rocket",
          roles: ["admin", "coordinator", "mentor", "faculty"]
        },
        {
          title: "Sessions",
          href: "/sessions",
          iconName: "Calendar",
          roles: ["admin", "coordinator", "mentor", "mentee", "faculty", "student"]
        },
        {
          title: "Communication",
          href: "/communication",
          iconName: "MessageSquare",
          roles: ["admin", "coordinator", "mentor", "mentee", "faculty", "student"]
        }
      ]
    },
    {
      title: "Progress & Feedback",
      items: [
        {
          title: "Goals",
          href: "/goals",
          iconName: "Target",
          roles: ["admin", "coordinator", "mentor", "mentee", "faculty", "student"]
        },
        {
          title: "Feedback",
          href: "/feedback",
          iconName: "Star",
          roles: ["admin", "coordinator", "mentor", "mentee", "faculty", "student"]
        },
        {
          title: "Gamification",
          href: "/gamification",
          iconName: "Trophy",
          roles: ["admin", "coordinator", "mentor", "mentee", "faculty", "student"]
        }
      ]
    },
    {
      title: "Administration",
      items: [
        {
          title: "Reports",
          href: "/reports",
          iconName: "BarChart3",
          roles: ["admin", "coordinator", "faculty"]
        },
        {
          title: "Admin",
          href: "/admin",
          iconName: "Settings",
          roles: ["admin"]
        }
      ]
    }
  ];

  // Filter navigation based on user role
  return baseNavigation.map(group => ({
    ...group,
    items: group.items.filter(item => 
      !item.roles || item.roles.includes(userRole?.toLowerCase())
    )
  })).filter(group => group.items.length > 0); // Only show groups that have visible items
};

// Icon mapping
const iconMap = {
  Brain,
  User,
  Zap,
  Rocket,
  Calendar,
  MessageSquare,
  Target,
  Star,
  Trophy,
  BarChart3,
  Settings,
};

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export function Sidebar({ 
  className, 
  collapsed = false, 
  onCollapsedChange,
  onClose,
  isMobile = false 
}: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  
  // Get filtered navigation based on user role
  const navigationConfig = getNavigationConfig(user?.role || 'student');
  
  // Convert config to navigation with JSX icons
  const navigation = navigationConfig.map(group => ({
    ...group,
    items: group.items.map(item => ({
      ...item,
      icon: React.createElement(
        iconMap[item.iconName as keyof typeof iconMap] || User, 
        { className: "w-4 h-4" }
      )
    }))
  }));

  const handleCollapseToggle = () => {
    if (onCollapsedChange) {
      onCollapsedChange(!collapsed);
    }
  };

  return (
    <div className={cn("flex h-full", className)}>
      <div className={cn(
        "flex flex-col transition-all duration-500 ease-in-out relative overflow-hidden",
        collapsed ? "w-16" : "w-72"
      )}>
        {/* Blue Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-slate-900/20 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/5 to-cyan-500/5" />
        
        {/* Animated Border */}
        <div className="absolute inset-0 border border-gradient-to-r from-blue-500/30 via-cyan-500/30 to-blue-600/30 rounded-r-2xl" />
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 animate-pulse" />
        
        {/* Header */}
        <div className="relative flex h-14 items-center px-3 border-b border-white/10">
          {!collapsed && (
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  StrathConnect
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  STRATHMORE BUSINESS SCHOOL
                </span>
              </div>
            </Link>
          )}
          {collapsed && (
            <Link href="/" className="flex items-center justify-center w-full group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
            </Link>
          )}
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="ml-auto md:hidden hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <ScrollArea className="flex-1 relative">
          <div className="space-y-3 p-3">
            {navigation.map((group, groupIndex) => (
              <div key={group.title} className="space-y-2">
                {!collapsed && (
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      {group.title}
                    </h4>
                  </div>
                )}
                <div className="space-y-0.5">
                  {group.items.map((item, itemIndex) => {
                    const isActive = pathname === item.href;
                    const delay = groupIndex * 100 + itemIndex * 50;
                    return (
                      <Link 
                        key={item.href} 
                        href={item.href} 
                        onClick={isMobile ? onClose : undefined}
                        className="block"
                        style={{ animationDelay: `${delay}ms` }}
                      >
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start transition-all duration-300 ease-out group relative overflow-hidden",
                            collapsed ? "px-2 h-10" : "px-3 h-11",
                            isActive && "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/30 shadow-lg shadow-blue-500/10"
                          )}
                        >
                          {/* Hover Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Active Indicator */}
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r-full" />
                          )}
                          
                          <div className="relative flex items-center space-x-2 z-10">
                            <div className={cn(
                              "transition-all duration-300",
                              isActive ? "text-blue-400 drop-shadow-lg" : "text-muted-foreground group-hover:text-blue-300"
                            )}>
                              {item.icon}
                            </div>
                            {!collapsed && (
                              <div className="flex-1 text-left">
                                <div className={cn(
                                  "text-sm font-medium transition-colors",
                                  isActive ? "text-white" : "text-foreground group-hover:text-white"
                                )}>
                                  {item.title}
                                </div>
                                <div className="text-xs text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                                  {item.label}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Shimmer Effect */}
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out shimmer opacity-30" />
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {!isMobile && (
          <div className="relative border-t border-white/10 p-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCollapseToggle}
              className="w-full hover:bg-white/10 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-center space-x-2 z-10">
                {collapsed ? (
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-300 transition-colors" />
                ) : (
                  <>
                    <ChevronLeft className="h-4 w-4 text-muted-foreground group-hover:text-blue-300 transition-colors" />
                    <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">Collapse</span>
                  </>
                )}
              </div>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
