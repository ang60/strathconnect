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
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  X, 
  Plus,
  Award,
  Briefcase,
  GraduationCap,
  Target,
  Star,
  Linkedin,
  Globe,
  Camera
} from "lucide-react";

// Mock user data
const currentUser = {
  name: "Alice Wilson",
  email: "alice.wilson@strathmore.edu",
  role: "Mentor",
  department: "Business Administration",
  avatar: "/avatars/alice.jpg",
  phone: "+254 700 123 456",
  location: "Nairobi, Kenya",
  bio: "Experienced business professional with over 8 years in strategic management and leadership development. Passionate about mentoring young professionals and helping them achieve their career goals.",
  joinDate: "2023-01-15",
  skills: ["Leadership", "Strategic Planning", "Team Management", "Business Development", "Mentoring"],
  goals: ["Expand mentorship network", "Publish leadership articles", "Develop coaching certification"],
  experience: [
    {
      id: "1",
      title: "Senior Manager",
      company: "TechCorp Kenya",
      duration: "2020 - Present",
      description: "Leading strategic initiatives and managing cross-functional teams."
    },
    {
      id: "2",
      title: "Business Analyst",
      company: "Innovate Solutions",
      duration: "2018 - 2020",
      description: "Analyzed business processes and implemented improvement strategies."
    }
  ],
  education: [
    {
      id: "1",
      degree: "MBA in Business Administration",
      school: "Strathmore Business School",
      year: "2018",
      description: "Specialized in Strategic Management"
    },
    {
      id: "2",
      degree: "Bachelor of Commerce",
      school: "University of Nairobi",
      year: "2015",
      description: "Major in Finance and Accounting"
    }
  ],
  achievements: [
    {
      id: "1",
      title: "Top Mentor Award",
      year: "2023",
      description: "Recognized for outstanding mentorship contributions"
    },
    {
      id: "2",
      title: "Leadership Excellence",
      year: "2022",
      description: "Awarded for exceptional team leadership"
    }
  ]
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newGoal, setNewGoal] = useState("");

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      // Add skill logic
      setNewSkill("");
    }
  };

  const addGoal = () => {
    if (newGoal.trim()) {
      // Add goal logic
      setNewGoal("");
    }
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">
              Manage your profile information and preferences
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="flex items-center space-x-2">
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader className="text-center">
                <div className="relative mx-auto w-32 h-32 mb-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback className="text-2xl">
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="sm" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0">
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <CardTitle className="text-xl">{currentUser.name}</CardTitle>
                <CardDescription className="text-base">{currentUser.email}</CardDescription>
                <div className="flex flex-wrap gap-2 justify-center mt-3">
                  <Badge variant="secondary">{currentUser.role}</Badge>
                  <Badge variant="outline">{currentUser.department}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{currentUser.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{currentUser.location}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Member since {new Date(currentUser.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Social Links</h4>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <Globe className="w-4 h-4" />
                      <span>Website</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Basic Info</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>Skills & Goals</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Experience</span>
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>Achievements</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Update your personal and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input 
                          defaultValue={currentUser.name} 
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input 
                          defaultValue={currentUser.email} 
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone</label>
                        <Input 
                          defaultValue={currentUser.phone} 
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input 
                          defaultValue={currentUser.location} 
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bio</label>
                      <Textarea 
                        defaultValue={currentUser.bio} 
                        rows={4}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Expertise</CardTitle>
                    <CardDescription>
                      Showcase your professional skills and areas of expertise
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {currentUser.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {skill}
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-2 h-auto p-0 text-muted-foreground hover:text-destructive"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          )}
                        </Badge>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add a skill..."
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                        />
                        <Button onClick={addSkill} size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Goals & Objectives</CardTitle>
                    <CardDescription>
                      Define your professional goals and objectives
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {currentUser.goals.map((goal, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <Target className="w-4 h-4 text-blue-600" />
                          <span className="flex-1">{goal}</span>
                          {isEditing && (
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add a goal..."
                          value={newGoal}
                          onChange={(e) => setNewGoal(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                        />
                        <Button onClick={addGoal} size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Work Experience</span>
                      {isEditing && (
                        <Button size="sm" className="flex items-center space-x-2">
                          <Plus className="w-4 h-4" />
                          <span>Add Experience</span>
                        </Button>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Your professional work history and achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentUser.experience.map((exp) => (
                      <div key={exp.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{exp.title}</h4>
                            <p className="text-sm text-muted-foreground">{exp.company}</p>
                            <p className="text-sm text-muted-foreground">{exp.duration}</p>
                          </div>
                          {isEditing && (
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{exp.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Education</span>
                      {isEditing && (
                        <Button size="sm" className="flex items-center space-x-2">
                          <Plus className="w-4 h-4" />
                          <span>Add Education</span>
                        </Button>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Your academic background and qualifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentUser.education.map((edu) => (
                      <div key={edu.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{edu.degree}</h4>
                            <p className="text-sm text-muted-foreground">{edu.school}</p>
                            <p className="text-sm text-muted-foreground">{edu.year}</p>
                          </div>
                          {isEditing && (
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{edu.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Achievements & Awards</span>
                      {isEditing && (
                        <Button size="sm" className="flex items-center space-x-2">
                          <Plus className="w-4 h-4" />
                          <span>Add Achievement</span>
                        </Button>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Recognition and accomplishments in your career
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentUser.achievements.map((achievement) => (
                      <div key={achievement.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                              <Award className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{achievement.title}</h4>
                              <p className="text-sm text-muted-foreground">{achievement.year}</p>
                            </div>
                          </div>
                          {isEditing && (
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

