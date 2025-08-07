"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Users, 
  Target, 
  Calendar, 
  MessageSquare, 
  Star, 
  Trophy, 
  Settings 
} from "lucide-react";

export default function DemoLayoutPage() {
  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your mentorship programs.
            </p>
          </div>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>Mentor</span>
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mentees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                +1 new this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +4 this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                +12 unread
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>
                Your latest mentorship activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Session with Sarah Muthoni</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <Badge variant="secondary">Completed</Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Goal achieved: Leadership skills</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                  <Badge variant="default">Achieved</Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New message from David Kimani</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                  <Badge variant="outline">Unread</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Recent Achievements</span>
              </CardTitle>
              <CardDescription>
                Your latest badges and accomplishments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Mentor Master</p>
                    <p className="text-xs text-muted-foreground">Completed 10 sessions</p>
                  </div>
                  <Badge variant="secondary">+200 pts</Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Feedback Champion</p>
                    <p className="text-xs text-muted-foreground">Provided 5 feedback forms</p>
                  </div>
                  <Badge variant="secondary">+100 pts</Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">First Session</p>
                    <p className="text-xs text-muted-foreground">Completed first mentorship</p>
                  </div>
                  <Badge variant="secondary">+50 pts</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Session
              </Button>
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline">
                <Target className="w-4 h-4 mr-2" />
                Set Goal
              </Button>
              <Button variant="outline">
                <Star className="w-4 h-4 mr-2" />
                Give Feedback
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
