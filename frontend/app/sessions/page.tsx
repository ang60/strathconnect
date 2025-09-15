"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  MessageSquare, 
  Video, 
  MapPin,
  CheckCircle,
  X,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Target,
  Star,
  TrendingUp,
  Play,
  Pause,
  Award
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data
const upcomingSessions = [
  {
    id: "1",
    title: "Leadership Development Session",
    mentor: "Sarah Muthoni",
    mentee: "David Kimani",
    date: "2024-01-20T10:00:00",
    duration: 60,
    type: "virtual",
    status: "confirmed",
    topic: "Strategic thinking and decision making",
    notes: "Focus on real-world case studies and practical applications"
  },
  {
    id: "2",
    title: "Career Planning Discussion",
    mentor: "Grace Wanjiku",
    mentee: "John Kamau",
    date: "2024-01-22T14:00:00",
    duration: 45,
    type: "in-person",
    status: "confirmed",
    topic: "Career transition strategies",
    notes: "Review current skills and identify growth opportunities"
  }
];

const completedSessions = [
  {
    id: "3",
    title: "Technical Skills Review",
    mentor: "Alice Wilson",
    mentee: "Mary Njeri",
    date: "2024-01-15T09:00:00",
    duration: 90,
    type: "virtual",
    status: "completed",
    topic: "Advanced programming concepts",
    notes: "Covered design patterns and best practices",
    rating: 5,
    feedback: "Excellent session with practical examples"
  },
  {
    id: "4",
    title: "Business Strategy Session",
    mentor: "Robert Ochieng",
    mentee: "Peter Mwangi",
    date: "2024-01-12T11:00:00",
    duration: 60,
    type: "in-person",
    status: "completed",
    topic: "Market analysis and competitive positioning",
    notes: "Analyzed current market trends and opportunities",
    rating: 4,
    feedback: "Very insightful discussion on market dynamics"
  }
];

const actionItems = [
  {
    id: "1",
    sessionId: "3",
    description: "Implement design patterns in current project",
    assignedTo: "Mary Njeri",
    dueDate: "2024-01-25",
    status: "pending"
  },
  {
    id: "2",
    sessionId: "3",
    description: "Review code documentation standards",
    assignedTo: "Alice Wilson",
    dueDate: "2024-01-22",
    status: "completed"
  },
  {
    id: "3",
    sessionId: "4",
    description: "Conduct competitor analysis report",
    assignedTo: "Peter Mwangi",
    dueDate: "2024-01-20",
    status: "in-progress"
  }
];

export default function SessionsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sessionData, setSessionData] = useState({
    title: "",
    mentor: "",
    mentee: "",
    date: "",
    time: "",
    duration: "",
    type: "",
    topic: "",
    notes: "",
    isVirtual: false
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "cancelled":
        return "bg-white text-gray-800 dark:bg-gray-900/20 dark:text-white";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "virtual" ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        />
      );
    }
    return stars;
  };

  const handleCreateSession = () => {
    // Simulate API call
    console.log("Creating session:", sessionData);
    setShowCreateModal(false);
    // Reset form
    setSessionData({
      title: "",
      mentor: "",
      mentee: "",
      date: "",
      time: "",
      duration: "",
      type: "",
      topic: "",
      notes: "",
      isVirtual: false
    });
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Session Scheduling & Tracking</h1>
            <p className="text-muted-foreground">
              Manage your mentorship sessions and track progress
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setShowCreateModal(true)} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Schedule Session</span>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <CalendarIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Total Sessions</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Play className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Upcoming</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Completed</p>
                  <p className="text-2xl font-bold">148</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Avg Rating</p>
                  <p className="text-2xl font-bold">4.8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upcoming" className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Upcoming</span>
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Completed</span>
                </TabsTrigger>
                <TabsTrigger value="action-items" className="flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>Action Items</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className={getStatusColor(session.status)}>
                              {session.status}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center space-x-1">
                              {getTypeIcon(session.type)}
                              <span>{session.type}</span>
                            </Badge>
                          </div>
                          <CardTitle className="text-lg">{session.title}</CardTitle>
                          <CardDescription>
                            {session.topic}
                          </CardDescription>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Mentor:</span>
                            <span className="font-medium">{session.mentor}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Mentee:</span>
                            <span className="font-medium">{session.mentee}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Date:</span>
                            <span className="font-medium">
                              {new Date(session.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Duration:</span>
                            <span className="font-medium">{session.duration} min</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Session Notes</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {session.notes}
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <Button className="flex-1">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Send Reminder
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-white hover:text-gray-300">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {completedSessions.map((session) => (
                  <Card key={session.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className={getStatusColor(session.status)}>
                              {session.status}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center space-x-1">
                              {getTypeIcon(session.type)}
                              <span>{session.type}</span>
                            </Badge>
                            <div className="flex items-center space-x-1">
                              {renderStars(session.rating)}
                            </div>
                          </div>
                          <CardTitle className="text-lg">{session.title}</CardTitle>
                          <CardDescription>
                            {session.topic}
                          </CardDescription>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Mentor:</span>
                            <span className="font-medium">{session.mentor}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Mentee:</span>
                            <span className="font-medium">{session.mentee}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Date:</span>
                            <span className="font-medium">
                              {new Date(session.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Duration:</span>
                            <span className="font-medium">{session.duration} min</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Session Notes</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {session.notes}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Feedback</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {session.feedback}
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" className="flex-1">
                          <Target className="w-4 h-4 mr-2" />
                          View Action Items
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="action-items" className="space-y-4">
                {actionItems.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Due: {new Date(item.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="font-medium">{item.description}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Assigned to: {item.assignedTo}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Calendar Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Calendar</CardTitle>
                <CardDescription>
                  View and schedule sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Overview</CardTitle>
                <CardDescription>
                  Your session completion progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Monthly Goal</span>
                    <span>12/15 sessions</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Weekly Progress</span>
                    <span>3/4 sessions</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Success Rate</span>
                    <span className="text-sm font-bold text-green-600">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Session Creation Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule New Session</DialogTitle>
            <DialogDescription>
              Create a new mentorship session with all the necessary details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Session Title</Label>
                <Input
                  id="title"
                  placeholder="Enter session title"
                  value={sessionData.title}
                  onChange={(e) => setSessionData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Session Type</Label>
                <Select value={sessionData.type} onValueChange={(value) => setSessionData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select session type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mentorship">Mentorship</SelectItem>
                    <SelectItem value="coaching">Coaching</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mentor">Mentor</Label>
                <Select value={sessionData.mentor} onValueChange={(value) => setSessionData(prev => ({ ...prev, mentor: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mentor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah-muthoni">Sarah Muthoni</SelectItem>
                    <SelectItem value="grace-wanjiku">Grace Wanjiku</SelectItem>
                    <SelectItem value="alice-wilson">Alice Wilson</SelectItem>
                    <SelectItem value="robert-ochieng">Robert Ochieng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mentee">Mentee</Label>
                <Select value={sessionData.mentee} onValueChange={(value) => setSessionData(prev => ({ ...prev, mentee: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mentee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="david-kimani">David Kimani</SelectItem>
                    <SelectItem value="john-kamau">John Kamau</SelectItem>
                    <SelectItem value="mary-njeri">Mary Njeri</SelectItem>
                    <SelectItem value="peter-mwangi">Peter Mwangi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={sessionData.date}
                  onChange={(e) => setSessionData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={sessionData.time}
                  onChange={(e) => setSessionData(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select value={sessionData.duration} onValueChange={(value) => setSessionData(prev => ({ ...prev, duration: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Session Topic</Label>
              <Input
                id="topic"
                placeholder="What will this session focus on?"
                value={sessionData.topic}
                onChange={(e) => setSessionData(prev => ({ ...prev, topic: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Additional notes or agenda items"
                value={sessionData.notes}
                onChange={(e) => setSessionData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isVirtual"
                checked={sessionData.isVirtual}
                onCheckedChange={(checked) => setSessionData(prev => ({ ...prev, isVirtual: checked as boolean }))}
              />
              <Label htmlFor="isVirtual">Virtual/Online Session</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateSession}>
                Schedule Session
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
