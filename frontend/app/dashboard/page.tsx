"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthGuard } from "@/components/auth-guard";
import { useAuth } from "@/lib/auth-context";
import { 
  Users, 
  Target, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  Activity,
  BarChart3,
  Star,
  Award,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Mock dashboard data
const dashboardData = {
  stats: {
    totalSessions: 45,
    activeCoachees: 8,
    completedGoals: 24,
    messages: 156
  },
  recentActivity: [
    {
      id: "1",
      type: "session",
      title: "Session with Sarah Muthoni",
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: "2",
      type: "goal",
      title: "Goal achieved: Leadership skills",
      time: "1 day ago",
      status: "achieved"
    },
    {
      id: "3",
      type: "message",
      title: "New message from David Kimani",
      time: "3 days ago",
      status: "unread"
    }
  ],
  upcomingSessions: [
    {
      id: "1",
      coachee: "Grace Wanjiku",
      topic: "Career Planning",
      date: "2024-01-20T10:00:00",
      duration: 60
    },
    {
      id: "2",
      coachee: "John Kamau",
      topic: "Leadership Development",
      date: "2024-01-22T14:00:00",
      duration: 45
    }
  ]
};

function DashboardContent() {
  const { user } = useAuth();

  return (
    <MainLayout showSidebar={true}>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! Here&apos;s what&apos;s happening with your coaching programs.
            </p>
          </div>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{user?.role}</span>
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.stats.totalSessions}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Coachees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.stats.activeCoachees}</div>
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
              <div className="text-2xl font-bold">{dashboardData.stats.completedGoals}</div>
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
              <div className="text-2xl font-bold">{dashboardData.stats.messages}</div>
              <p className="text-xs text-muted-foreground">
                +12 unread
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity and Upcoming Sessions */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>
                Your latest coaching activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'session' ? 'bg-blue-100' :
                      activity.type === 'goal' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      {activity.type === 'session' && <Calendar className="w-4 h-4 text-blue-600" />}
                      {activity.type === 'goal' && <Target className="w-4 h-4 text-green-600" />}
                      {activity.type === 'message' && <MessageSquare className="w-4 h-4 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Upcoming Sessions</span>
              </CardTitle>
              <CardDescription>
                Your scheduled coaching sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>
                        {session.coachee.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{session.coachee}</p>
                      <p className="text-xs text-muted-foreground">{session.topic}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(session.date).toLocaleDateString()} • {session.duration}min
                      </p>
                    </div>
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      Upcoming
                    </Badge>
                  </div>
                ))}
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
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                <Calendar className="w-4 h-4" />
                <span>Schedule Session</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-input bg-background rounded-md hover:bg-accent transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span>Send Message</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-input bg-background rounded-md hover:bg-accent transition-colors">
                <Target className="w-4 h-4" />
                <span>Set Goal</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-input bg-background rounded-md hover:bg-accent transition-colors">
                <Star className="w-4 h-4" />
                <span>Give Feedback</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
