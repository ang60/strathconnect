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
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  Award,
  Star,
  Users,
  MessageSquare,
  Edit,
  Trash2,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  Eye,
  Share2
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data
const goals = [
  {
    id: "1",
    title: "Leadership Development",
    description: "Develop essential leadership skills and strategic thinking capabilities",
    category: "Professional Growth",
    status: "in-progress",
    progress: 75,
    targetDate: "2024-06-30",
    milestones: [
      { id: "1", title: "Complete leadership course", completed: true, dueDate: "2024-01-15" },
      { id: "2", title: "Lead team project", completed: true, dueDate: "2024-02-15" },
      { id: "3", title: "Present to senior management", completed: false, dueDate: "2024-04-15" },
      { id: "4", title: "Mentor junior team members", completed: false, dueDate: "2024-06-15" }
    ],
    sharedWith: ["Sarah Muthoni", "David Kimani"],
    notes: "Focus on communication and decision-making skills"
  },
  {
    id: "2",
    title: "Technical Skills Enhancement",
    description: "Master advanced programming concepts and modern development practices",
    category: "Skills Development",
    status: "completed",
    progress: 100,
    targetDate: "2024-03-31",
    milestones: [
      { id: "1", title: "Learn React framework", completed: true, dueDate: "2024-01-31" },
      { id: "2", title: "Complete Node.js course", completed: true, dueDate: "2024-02-28" },
      { id: "3", title: "Build portfolio project", completed: true, dueDate: "2024-03-15" }
    ],
    sharedWith: ["Grace Wanjiku"],
    notes: "Successfully completed all technical objectives"
  },
  {
    id: "3",
    title: "Career Transition",
    description: "Successfully transition from technical role to product management",
    category: "Career Change",
    status: "planning",
    progress: 25,
    targetDate: "2024-12-31",
    milestones: [
      { id: "1", title: "Research target companies", completed: true, dueDate: "2024-01-31" },
      { id: "2", title: "Network with PM professionals", completed: false, dueDate: "2024-03-31" },
      { id: "3", title: "Complete PM certification", completed: false, dueDate: "2024-06-30" },
      { id: "4", title: "Apply for PM positions", completed: false, dueDate: "2024-09-30" }
    ],
    sharedWith: ["John Kamau"],
    notes: "Focus on building product thinking and business acumen"
  }
];

const sharedNotes = [
  {
    id: "1",
    goalId: "1",
    author: "Sarah Muthoni",
    content: "Great progress on the leadership course! I noticed you're particularly strong in strategic thinking.",
    timestamp: "2024-01-10T14:30:00",
    type: "feedback"
  },
  {
    id: "2",
    goalId: "1",
    author: "You",
    content: "Thank you! I'm working on improving my communication skills, especially in high-pressure situations.",
    timestamp: "2024-01-11T09:15:00",
    type: "update"
  },
  {
    id: "3",
    goalId: "2",
    author: "Grace Wanjiku",
    content: "The portfolio project looks excellent! The code quality and documentation are impressive.",
    timestamp: "2024-03-20T16:45:00",
    type: "feedback"
  }
];

export default function GoalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [goalData, setGoalData] = useState({
    title: "",
    description: "",
    category: "",
    targetDate: "",
    status: "planning",
    milestones: [] as Array<{
      title: string;
      dueDate: string;
      completed: false;
    }>,
    sharedWith: [] as string[],
    notes: ""
  });
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    dueDate: ""
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "planning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "paused":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-white";
  };

  const addMilestone = () => {
    if (newMilestone.title.trim() && newMilestone.dueDate) {
      setGoalData(prev => ({
        ...prev,
        milestones: [...prev.milestones, { 
          title: newMilestone.title.trim(), 
          dueDate: newMilestone.dueDate,
          completed: false 
        }]
      }));
      setNewMilestone({ title: "", dueDate: "" });
    }
  };

  const removeMilestone = (index: number) => {
    setGoalData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  const handleCreateGoal = () => {
    // Simulate API call
    console.log("Creating goal:", goalData);
    setShowCreateModal(false);
    // Reset form
    setGoalData({
      title: "",
      description: "",
      category: "",
      targetDate: "",
      status: "planning",
      milestones: [],
      sharedWith: [],
      notes: ""
    });
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Goals & Progress</h1>
            <p className="text-muted-foreground">
              Set, track, and achieve your personal and professional goals
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setShowCreateModal(true)} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create Goal</span>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Total Goals</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Completed</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Avg Progress</p>
                  <p className="text-2xl font-bold">67%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <Award className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Achievements</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="goals" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="goals" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>My Goals</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Progress</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Shared Notes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="goals" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search goals..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Actions</label>
                    <Button variant="outline" className="w-full">
                      <Filter className="w-4 h-4 mr-2" />
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Goals Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {goals.map((goal) => (
                <Card key={goal.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className={getStatusColor(goal.status)}>
                            {goal.status}
                          </Badge>
                          <Badge variant="secondary">
                            {goal.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {goal.description}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Target Date:</span>
                        <span className="font-medium">
                          {new Date(goal.targetDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Milestones:</span>
                        <span className="font-medium">
                          {goal.milestones.filter(m => m.completed).length}/{goal.milestones.length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Shared with:</span>
                        <span className="font-medium">{goal.sharedWith.length} people</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Recent Milestones</p>
                      <div className="space-y-2">
                        {goal.milestones.slice(0, 2).map((milestone) => (
                          <div key={milestone.id} className="flex items-center space-x-2">
                            {milestone.completed ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Clock className="w-4 h-4 text-muted-foreground" />
                            )}
                            <span className={`text-sm ${milestone.completed ? "line-through text-muted-foreground" : ""}`}>
                              {milestone.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Progress Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Progress Overview</CardTitle>
                  <CardDescription>
                    Your goal completion trends and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">This Month</span>
                      <div className="flex items-center space-x-1">
                        <ArrowUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">+15%</span>
                      </div>
                    </div>
                    <Progress value={65} className="h-3" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">This Quarter</span>
                      <div className="flex items-center space-x-1">
                        <ArrowUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">+28%</span>
                      </div>
                    </div>
                    <Progress value={78} className="h-3" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">This Year</span>
                      <div className="flex items-center space-x-1">
                        <ArrowUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">+42%</span>
                      </div>
                    </div>
                    <Progress value={85} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              {/* Achievement Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Achievement Stats</CardTitle>
                  <CardDescription>
                    Your recent accomplishments and milestones
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-sm text-muted-foreground">Goals Created</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">8</div>
                      <div className="text-sm text-muted-foreground">Goals Completed</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">24</div>
                      <div className="text-sm text-muted-foreground">Milestones Hit</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">156</div>
                      <div className="text-sm text-muted-foreground">Days Active</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shared Notes & Feedback</CardTitle>
                <CardDescription>
                  Notes and feedback shared with your mentors and mentees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sharedNotes.map((note) => (
                    <div key={note.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            note.type === 'feedback' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-blue-100 dark:bg-blue-900/20'
                          }`}>
                            {note.type === 'feedback' ? (
                              <Star className="w-4 h-4 text-green-600" />
                            ) : (
                              <MessageSquare className="w-4 h-4 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{note.author}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(note.timestamp).toLocaleDateString()} at {new Date(note.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {note.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {note.content}
                      </p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Reply
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Goal Creation Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Goal</DialogTitle>
            <DialogDescription>
              Set a new personal or professional goal with milestones and tracking.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  placeholder="Enter goal title"
                  value={goalData.title}
                  onChange={(e) => setGoalData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={goalData.category} onValueChange={(value) => setGoalData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Professional Growth">Professional Growth</SelectItem>
                    <SelectItem value="Skills Development">Skills Development</SelectItem>
                    <SelectItem value="Career Change">Career Change</SelectItem>
                    <SelectItem value="Personal Development">Personal Development</SelectItem>
                    <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                    <SelectItem value="Financial Goals">Financial Goals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your goal and what you want to achieve"
                value={goalData.description}
                onChange={(e) => setGoalData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="targetDate">Target Date</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={goalData.targetDate}
                  onChange={(e) => setGoalData(prev => ({ ...prev, targetDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={goalData.status} onValueChange={(value) => setGoalData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Milestones</Label>
                <Button onClick={addMilestone} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Milestone
                </Button>
              </div>
              
              <div className="space-y-3">
                {goalData.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{milestone.title}</p>
                      <p className="text-sm text-muted-foreground">Due: {milestone.dueDate}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeMilestone(index)}
                      className="text-white hover:text-gray-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="milestoneTitle">Milestone Title</Label>
                  <Input
                    id="milestoneTitle"
                    placeholder="Enter milestone title"
                    value={newMilestone.title}
                    onChange={(e) => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="milestoneDate">Due Date</Label>
                  <Input
                    id="milestoneDate"
                    type="date"
                    value={newMilestone.dueDate}
                    onChange={(e) => setNewMilestone(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Additional notes or context for this goal"
                value={goalData.notes}
                onChange={(e) => setGoalData(prev => ({ ...prev, notes: e.target.value }))}
                rows={2}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateGoal}>
                Create Goal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
