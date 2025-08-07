"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  X
} from "lucide-react";

const navigation = [
  {
    title: "Main",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: <BarChart3 className="w-4 h-4" />,
        label: "Role-based dashboards"
      },
      {
        title: "Profile",
        href: "/profile",
        icon: <User className="w-4 h-4" />,
        label: "User profile management"
      }
    ]
  },
  {
    title: "Core Features",
    items: [
      {
        title: "Matching",
        href: "/matching",
        icon: <Users className="w-4 h-4" />,
        label: "Find mentors and mentees"
      },
      {
        title: "Programs",
        href: "/programs",
        icon: <Target className="w-4 h-4" />,
        label: "Program management"
      },
      {
        title: "Sessions",
        href: "/sessions",
        icon: <Calendar className="w-4 h-4" />,
        label: "Session scheduling"
      },
      {
        title: "Communication",
        href: "/communication",
        icon: <MessageSquare className="w-4 h-4" />,
        label: "Messaging and notifications"
      }
    ]
  },
  {
    title: "Progress & Feedback",
    items: [
      {
        title: "Goals",
        href: "/goals",
        icon: <Target className="w-4 h-4" />,
        label: "Goal tracking"
      },
      {
        title: "Feedback",
        href: "/feedback",
        icon: <Star className="w-4 h-4" />,
        label: "Surveys and feedback"
      },
      {
        title: "Gamification",
        href: "/gamification",
        icon: <Trophy className="w-4 h-4" />,
        label: "Badges and leaderboard"
      }
    ]
  },
  {
    title: "Administration",
    items: [
      {
        title: "Reports",
        href: "/reports",
        icon: <BarChart3 className="w-4 h-4" />,
        label: "Analytics and reports"
      },
      {
        title: "Admin",
        href: "/admin",
        icon: <Settings className="w-4 h-4" />,
        label: "System configuration"
      }
    ]
  }
];

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

  const handleCollapseToggle = () => {
    if (onCollapsedChange) {
      onCollapsedChange(!collapsed);
    }
  };

  return (
    <div className={cn("flex h-full", className)}>
      <div className={cn(
        "flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}>
        <div className="flex h-14 items-center border-b px-4">
          {!collapsed && (
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-bold">StrathConnect</span>
            </Link>
          )}
          {collapsed && (
            <Link href="/" className="flex items-center justify-center w-full">
              <Heart className="h-6 w-6 text-primary" />
            </Link>
          )}
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="ml-auto md:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <ScrollArea className="flex-1">
          <div className="space-y-4 p-4">
            {navigation.map((group) => (
              <div key={group.title} className="space-y-2">
                {!collapsed && (
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {group.title}
                  </h4>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link key={item.href} href={item.href} onClick={isMobile ? onClose : undefined}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start transition-colors",
                            collapsed ? "px-2" : "px-3"
                          )}
                        >
                          <div className="flex items-center space-x-3">
                            {item.icon}
                            {!collapsed && (
                              <div className="flex-1 text-left">
                                <div className="text-sm font-medium">{item.title}</div>
                                <div className="text-xs text-muted-foreground">{item.label}</div>
                              </div>
                            )}
                          </div>
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
          <div className="border-t p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCollapseToggle}
              className="w-full"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
              {!collapsed && <span className="ml-2">Collapse</span>}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
