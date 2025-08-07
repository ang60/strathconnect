"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Users, 
  Shield, 
  Settings, 
  Activity, 
  Trophy, 
  MessageSquare, 
  Target, 
  Calendar, 
  FileText, 
  Star, 
  BarChart3,
  User,
  Award,
  Heart
} from "lucide-react";

const features = [
  {
    title: "Landing Page",
    description: "Main marketing page with navigation to all features",
    path: "/",
    icon: <Heart className="w-6 h-6" />,
    status: "Complete"
  },
  {
    title: "Authentication",
    description: "Login, registration, and password reset flows",
    path: "/auth/login",
    icon: <Shield className="w-6 h-6" />,
    status: "Complete",
    subPages: [
      { name: "Login", path: "/auth/login" },
      { name: "Register", path: "/auth/register" },
      { name: "Forgot Password", path: "/auth/forgot-password" }
    ]
  },
  {
    title: "Dashboard",
    description: "Role-based dashboards for different user types",
    path: "/dashboard",
    icon: <BarChart3 className="w-6 h-6" />,
    status: "Complete"
  },
  {
    title: "User Profile",
    description: "Editable user profile with skills, goals, and experience",
    path: "/profile",
    icon: <User className="w-6 h-6" />,
    status: "Complete"
  },
  {
    title: "Matching & Recommendations",
    description: "Find mentors and mentees with compatibility scoring",
    path: "/matching",
    icon: <Users className="w-6 h-6" />,
    status: "Complete"
  },
  {
    title: "Program Management",
    description: "Create and manage mentorship programs",
    path: "/programs",
    icon: <Target className="w-6 h-6" />,
    status: "Complete",
    subPages: [
      { name: "Programs List", path: "/programs" },
      { name: "Create Program", path: "/programs/create" }
    ]
  },
  {
    title: "Session Scheduling",
    description: "Calendar view and session management",
    path: "/sessions",
    icon: <Calendar className="w-6 h-6" />,
    status: "Complete"
  },
  {
    title: "Communication",
    description: "In-app messaging and notifications",
    path: "/communication",
    icon: <MessageSquare className="w-6 h-6" />,
    status: "Complete"
  },
  {
    title: "Goals & Progress",
    description: "Goal tracking and progress visualization",
    path: "/goals",
    icon: <Target className="w-6 h-6" />,
    status: "Complete"
  },
  {
    title: "Feedback & Surveys",
    description: "Session feedback and program surveys",
    path: "/feedback",
    icon: <Star className="w-6 h-6" />,
    status: "Complete"
  },
  {
    title: "Reports & Analytics",
    description: "Admin analytics and custom reports",
    path: "/reports",
    icon: <BarChart3 className="w-6 h-6" />,
    status: "Complete"
  },
  {
    title: "Admin Configuration",
    description: "User management, roles, settings, and system logs",
    path: "/admin",
    icon: <Settings className="w-6 h-6" />,
    status: "Complete"
  },
  {
    title: "Gamification",
    description: "Badges, leaderboard, and points tracking",
    path: "/gamification",
    icon: <Trophy className="w-6 h-6" />,
    status: "Complete"
  }
];

export default function NavigationPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">StrathConnect Platform</h1>
        <p className="text-xl text-muted-foreground">
          Complete Mentorship & Coaching Platform Navigation
        </p>
        <Badge variant="outline" className="text-lg px-4 py-2">
          All Features Implemented ✅
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.path} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    {feature.status}
                  </Badge>
                </div>
              </div>
              <CardDescription className="text-sm">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href={feature.path}>
                <Button className="w-full">
                  View {feature.title}
                </Button>
              </Link>
              
              {feature.subPages && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Sub-pages:</p>
                  <div className="flex flex-wrap gap-1">
                    {feature.subPages.map((subPage) => (
                      <Link key={subPage.path} href={subPage.path}>
                        <Button variant="outline" size="sm">
                          {subPage.name}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>Platform Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">13</div>
              <div className="text-sm text-muted-foreground">Main Features</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">6</div>
              <div className="text-sm text-muted-foreground">User Roles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">20+</div>
              <div className="text-sm text-muted-foreground">UI Components</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">100%</div>
              <div className="text-sm text-muted-foreground">Responsive</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
