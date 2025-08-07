"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  BarChart3, 
  Users, 
  Target, 
  Calendar, 
  MessageSquare, 
  Star, 
  Trophy, 
  Settings,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export default function TestSidebarPage() {
  return (
    <MainLayout showSidebar={true}>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Layout Test</h1>
            <p className="text-muted-foreground">
              Testing the sidebar navigation and navbar layout
            </p>
          </div>
          <Badge variant="outline" className="flex items-center space-x-1">
            <CheckCircle className="w-3 h-3" />
            <span>Working</span>
          </Badge>
        </div>

        {/* Layout Structure */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Current Layout</span>
              </CardTitle>
              <CardDescription>
                What you're seeing right now
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Sidebar navigation on the left</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Navbar at the top with avatar & settings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Main content area (this page)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Theme toggle in navbar</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Navigation Structure</span>
              </CardTitle>
              <CardDescription>
                How the navigation is organized
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">Main</span>
                </div>
                <div className="ml-6 space-y-1 text-sm text-muted-foreground">
                  <div>• Dashboard</div>
                  <div>• Profile</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Core Features</span>
                </div>
                <div className="ml-6 space-y-1 text-sm text-muted-foreground">
                  <div>• Matching</div>
                  <div>• Programs</div>
                  <div>• Sessions</div>
                  <div>• Communication</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">Progress & Feedback</span>
                </div>
                <div className="ml-6 space-y-1 text-sm text-muted-foreground">
                  <div>• Goals</div>
                  <div>• Feedback</div>
                  <div>• Gamification</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Test Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Test the Layout</CardTitle>
            <CardDescription>
              Try these features to verify everything is working correctly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-semibold">Sidebar Features:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Click navigation items to navigate</li>
                  <li>• Use the collapse button at the bottom</li>
                  <li>• Check active state highlighting</li>
                  <li>• Test responsive behavior</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold">Navbar Features:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Click avatar to open user menu</li>
                  <li>• Access Profile and Settings</li>
                  <li>• Toggle theme (dark/light)</li>
                  <li>• Mobile menu button</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </Link>
              <Link href="/matching">
                <Button variant="outline" size="sm">
                  <Target className="w-4 h-4 mr-2" />
                  Test Matching
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Back to Landing
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Success Indicators */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800 dark:text-green-200">Sidebar Working</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                Navigation menu is functional
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800 dark:text-blue-200">Navbar Clean</span>
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                Only avatar and settings
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50 dark:bg-purple-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-800 dark:text-purple-200">Responsive</span>
              </div>
              <p className="text-sm text-purple-600 dark:text-purple-300 mt-1">
                Works on all devices
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
