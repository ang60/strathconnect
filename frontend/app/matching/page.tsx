"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Search, 
  Filter, 
  Star, 
  MessageSquare, 
  Calendar, 
  MapPin, 
  Target,
  Award,
  Clock,
  CheckCircle,
  X,
  Heart,
  UserCheck,
  TrendingUp
} from "lucide-react";

// Mock data
const suggestedMatches = [
  {
    id: "1",
    name: "Sarah Muthoni",
    role: "Software Engineer",
    company: "TechCorp Kenya",
    avatar: "/avatars/sarah.jpg",
    matchScore: 95,
    skills: ["JavaScript", "React", "Node.js", "Leadership"],
    goals: ["Career advancement", "Technical leadership"],
    location: "Nairobi, Kenya",
    experience: "5 years",
    availability: "Weekends",
    bio: "Passionate software engineer looking to mentor junior developers and share industry insights."
  },
  {
    id: "2",
    name: "David Kimani",
    role: "Product Manager",
    company: "Innovate Solutions",
    avatar: "/avatars/david.jpg",
    matchScore: 88,
    skills: ["Product Strategy", "Agile", "User Research", "Team Leadership"],
    goals: ["Product leadership", "Startup mentoring"],
    location: "Nairobi, Kenya",
    experience: "7 years",
    availability: "Evenings",
    bio: "Experienced product manager with a track record of launching successful products and building high-performing teams."
  },
  {
    id: "3",
    name: "Grace Wanjiku",
    role: "Marketing Director",
    company: "Brand Kenya",
    avatar: "/avatars/grace.jpg",
    matchScore: 82,
    skills: ["Digital Marketing", "Brand Strategy", "Team Management", "Analytics"],
    goals: ["Executive leadership", "Brand building"],
    location: "Nairobi, Kenya",
    experience: "10 years",
    availability: "Weekdays",
    bio: "Marketing professional with extensive experience in brand development and digital marketing strategies."
  }
];

const availableMentors = [
  {
    id: "1",
    name: "John Kamau",
    role: "Senior Software Engineer",
    company: "Google",
    avatar: "/avatars/john.jpg",
    rating: 4.9,
    reviews: 24,
    skills: ["Python", "Machine Learning", "System Design", "Leadership"],
    experience: "8 years",
    location: "Nairobi, Kenya",
    availability: "Flexible",
    hourlyRate: "$50",
    bio: "Senior software engineer with expertise in machine learning and system architecture. Passionate about mentoring."
  },
  {
    id: "2",
    name: "Mary Njeri",
    role: "Business Strategy Consultant",
    company: "McKinsey & Company",
    avatar: "/avatars/mary.jpg",
    rating: 4.8,
    reviews: 18,
    skills: ["Strategy", "Business Development", "Consulting", "Leadership"],
    experience: "12 years",
    location: "Nairobi, Kenya",
    availability: "Weekends",
    hourlyRate: "$75",
    bio: "Experienced business consultant helping companies develop and execute strategic initiatives."
  }
];

const myRequests = [
  {
    id: "1",
    mentorName: "Sarah Muthoni",
    status: "pending",
    requestDate: "2024-01-15",
    message: "I'm interested in learning more about software engineering best practices and career development."
  },
  {
    id: "2",
    mentorName: "David Kimani",
    status: "accepted",
    requestDate: "2024-01-10",
    message: "Looking forward to learning about product management and leadership skills."
  }
];

export default function MatchingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const renderStars = (score: number) => {
    const stars = [];
    const fullStars = Math.floor(score / 20);
    const hasHalfStar = score % 20 >= 10;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Matching & Recommendations</h1>
            <p className="text-muted-foreground">
              Find the perfect mentor or mentee based on your goals and preferences
            </p>
          </div>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>Smart Matching</span>
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Total Matches</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Active Requests</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Sessions Held</p>
                  <p className="text-2xl font-bold">156</p>
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

        <Tabs defaultValue="suggested" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="suggested" className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Suggested Matches</span>
            </TabsTrigger>
            <TabsTrigger value="mentors" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Available Mentors</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>My Requests</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="suggested" className="space-y-6">
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
                        placeholder="Search mentors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Skills</label>
                    <Select value={skillFilter} onValueChange={setSkillFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All skills" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All skills</SelectItem>
                        <SelectItem value="leadership">Leadership</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All locations</SelectItem>
                        <SelectItem value="nairobi">Nairobi</SelectItem>
                        <SelectItem value="mombasa">Mombasa</SelectItem>
                        <SelectItem value="kisumu">Kisumu</SelectItem>
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

            {/* Suggested Matches */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {suggestedMatches.map((match) => (
                <Card key={match.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={match.avatar} alt={match.name} />
                          <AvatarFallback>
                            {match.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{match.name}</CardTitle>
                          <CardDescription>{match.role} at {match.company}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>{match.matchScore}%</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Match Score</p>
                      <Progress value={match.matchScore} className="h-2" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{match.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{match.experience} experience</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Available: {match.availability}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {match.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {match.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{match.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {match.bio}
                    </p>

                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Request Match
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mentors" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {availableMentors.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={mentor.avatar} alt={mentor.name} />
                          <AvatarFallback>
                            {mentor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{mentor.name}</CardTitle>
                          <CardDescription>{mentor.role} at {mentor.company}</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          {renderStars(mentor.rating * 20)}
                        </div>
                        <p className="text-sm text-muted-foreground">{mentor.rating} ({mentor.reviews} reviews)</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Experience:</span>
                        <span className="font-medium">{mentor.experience}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{mentor.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Rate:</span>
                        <span className="font-medium">{mentor.hourlyRate}/hr</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Availability:</span>
                        <span className="font-medium">{mentor.availability}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Expertise</p>
                      <div className="flex flex-wrap gap-1">
                        {mentor.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {mentor.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{mentor.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {mentor.bio}
                    </p>

                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Request Session
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Match Requests</CardTitle>
                <CardDescription>
                  Track the status of your mentorship requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            request.status === 'accepted' ? 'bg-green-500' : 'bg-yellow-500'
                          }`} />
                          <div>
                            <h4 className="font-semibold">{request.mentorName}</h4>
                            <p className="text-sm text-muted-foreground">
                              Requested on {new Date(request.requestDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant={request.status === 'accepted' ? 'default' : 'secondary'}>
                          {request.status === 'accepted' ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {request.message}
                      </p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                        {request.status === 'pending' && (
                          <Button variant="outline" size="sm" className="text-white hover:text-gray-300">
                            <X className="w-4 h-4 mr-2" />
                            Cancel Request
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

