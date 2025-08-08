"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { 
  Target, 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  Users, 
  Clock,
  MapPin,
  Star,
  TrendingUp,
  Award,
  BookOpen,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  CheckCircle,
  Play,
  Pause,
  GraduationCap,
  Building2,
  Zap
} from "lucide-react";

// Mock data
const programs = [
  {
    id: "1",
    name: "Leadership Development Program",
    type: "Mentorship",
    status: "active",
    description: "Comprehensive leadership development program for emerging leaders",
    participants: 45,
    maxParticipants: 50,
    duration: "6 months",
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    location: "Nairobi",
    tags: ["Leadership", "Management", "Strategy"],
    phases: [
      { name: "Foundation", startDate: "2024-01-15", endDate: "2024-02-15", status: "completed" },
      { name: "Development", startDate: "2024-02-16", endDate: "2024-04-15", status: "active" },
      { name: "Application", startDate: "2024-04-16", endDate: "2024-06-15", status: "upcoming" },
      { name: "Graduation", startDate: "2024-06-16", endDate: "2024-07-15", status: "upcoming" }
    ],
    coordinator: {
      name: "Sarah Muthoni",
      avatar: "/avatars/sarah.jpg",
      email: "sarah.muthoni@strathmore.edu"
    }
  },
  {
    id: "2",
    name: "Career Transition Coaching",
    type: "Coaching",
    status: "active",
    description: "Supporting professionals in career transitions and new role adaptation",
    participants: 28,
    maxParticipants: 30,
    duration: "3 months",
    startDate: "2024-02-01",
    endDate: "2024-05-01",
    location: "Virtual",
    tags: ["Career", "Transition", "Coaching"],
    phases: [
      { name: "Assessment", startDate: "2024-02-01", endDate: "2024-02-15", status: "completed" },
      { name: "Planning", startDate: "2024-02-16", endDate: "2024-03-15", status: "active" },
      { name: "Execution", startDate: "2024-03-16", endDate: "2024-04-15", status: "upcoming" },
      { name: "Follow-up", startDate: "2024-04-16", endDate: "2024-05-01", status: "upcoming" }
    ],
    coordinator: {
      name: "David Kimani",
      avatar: "/avatars/david.jpg",
      email: "david.kimani@strathmore.edu"
    }
  },
  {
    id: "3",
    name: "Entrepreneurship Accelerator",
    type: "Mentorship",
    status: "upcoming",
    description: "Intensive program for startup founders and entrepreneurs",
    participants: 0,
    maxParticipants: 20,
    duration: "4 months",
    startDate: "2024-03-01",
    endDate: "2024-07-01",
    location: "Nairobi",
    tags: ["Entrepreneurship", "Startup", "Innovation"],
    phases: [
      { name: "Ideation", startDate: "2024-03-01", endDate: "2024-03-31", status: "upcoming" },
      { name: "Validation", startDate: "2024-04-01", endDate: "2024-04-30", status: "upcoming" },
      { name: "Launch", startDate: "2024-05-01", endDate: "2024-06-15", status: "upcoming" },
      { name: "Scale", startDate: "2024-06-16", endDate: "2024-07-01", status: "upcoming" }
    ],
    coordinator: {
      name: "Grace Wanjiku",
      avatar: "/avatars/grace.jpg",
      email: "grace.wanjiku@strathmore.edu"
    }
  }
];

export default function ProgramsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getPhaseStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "active":
        return "bg-blue-500";
      case "upcoming":
        return "bg-gray-300";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Program Management</h1>
            <p className="text-muted-foreground">
              Create, manage, and track mentorship and coaching programs
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              className="flex items-center space-x-2"
              onClick={() => router.push('/programs/create')}
            >
              <Plus className="w-4 h-4" />
              <span>Create Program</span>
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
                  <p className="text-sm font-medium">Total Programs</p>
                  <p className="text-2xl font-bold">12</p>
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
                  <p className="text-sm font-medium">Active Programs</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Total Participants</p>
                  <p className="text-2xl font-bold">324</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Success Rate</p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Programs List</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center space-x-2">
              <CalendarIcon className="w-4 h-4" />
              <span>Calendar View</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search programs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All types</SelectItem>
                        <SelectItem value="mentorship">Mentorship</SelectItem>
                        <SelectItem value="coaching">Coaching</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
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

            {/* Programs Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <Card key={program.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className={getStatusColor(program.status)}>
                            {program.status}
                          </Badge>
                          <Badge variant="secondary">
                            {program.type}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{program.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {program.description}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Participants:</span>
                        <span className="font-medium">{program.participants}/{program.maxParticipants}</span>
                      </div>
                      <Progress value={(program.participants / program.maxParticipants) * 100} className="h-2" />
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{program.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{program.location}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Tags</p>
                      <div className="flex flex-wrap gap-1">
                        {program.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Program Phases</p>
                      <div className="space-y-2">
                        {program.phases.map((phase, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getPhaseStatusColor(phase.status)}`} />
                            <span className="text-xs flex-1">{phase.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(phase.startDate).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 pt-2 border-t">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={program.coordinator.avatar} alt={program.coordinator.name} />
                        <AvatarFallback>
                          {program.coordinator.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{program.coordinator.name}</p>
                        <p className="text-xs text-muted-foreground">Coordinator</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1"
                        onClick={() => router.push(`/programs/${program.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => router.push(`/programs/${program.id}/edit`)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Calendar</CardTitle>
                <CardDescription>
                  View program phases and important dates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Upcoming Events</h3>
                    <div className="space-y-3">
                      {programs.flatMap(program => 
                        program.phases
                          .filter(phase => new Date(phase.startDate) > new Date())
                          .slice(0, 3)
                          .map((phase, index) => (
                            <div key={`${program.id}-${index}`} className="flex items-center space-x-3 p-3 border rounded-lg">
                              <div className={`w-3 h-3 rounded-full ${getPhaseStatusColor(phase.status)}`} />
                              <div className="flex-1">
                                <p className="text-sm font-medium">{phase.name}</p>
                                <p className="text-xs text-muted-foreground">{program.name}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">
                                  {new Date(phase.startDate).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(phase.endDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
