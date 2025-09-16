"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Shield, 
  Settings, 
  FileText, 
  Activity, 
  Users, 
  UserPlus, 
  Edit, 
  Save, 
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Plus,
  BarChart3,
  Target,
  Calendar,
  MessageSquare,
  Award,
  UserCheck
} from "lucide-react";
import { toast } from "sonner";

// Mock data
const users = [
  {
    id: "1",
    name: "Alice Wilson",
    email: "alice.wilson@strathmore.edu",
    role: "Admin",
    department: "Business Administration",
    status: "active",
    lastLogin: "2024-01-15T10:30:00"
  },
  {
    id: "2",
    name: "Robert Ochieng",
    email: "robert.ochieng@strathmore.edu",
    role: "Coordinator",
    department: "Finance",
    status: "active",
    lastLogin: "2024-01-14T15:45:00"
  }
];

const roles = [
  {
    name: "Admin",
    description: "Full system access and control",
    permissions: ["read", "write", "delete", "admin", "manage_users", "manage_programs"],
    userCount: 3
  },
  {
    name: "Coordinator",
    description: "Program and user management",
    permissions: ["read", "write", "manage_users", "manage_programs"],
    userCount: 8
  }
];

const systemLogs = [
  {
    id: "1",
    timestamp: "2024-01-15T14:30:00",
    level: "info",
    user: "Alice Wilson",
    action: "User login",
    details: "Successful login from IP 192.168.1.100"
  },
  {
    id: "2",
    timestamp: "2024-01-15T14:25:00",
    level: "warning",
    user: "Robert Ochieng",
    action: "Failed login attempt",
    details: "Invalid password for user robert.ochieng"
  }
];

const emailTemplates = [
  {
    id: "1",
    name: "Welcome Email",
    subject: "Welcome to StrathConnect",
    category: "onboarding",
    lastModified: "2024-01-10T10:00:00",
    isActive: true
  },
  {
    id: "2",
    name: "Session Reminder",
    subject: "Upcoming Session Reminder",
    category: "notifications",
    lastModified: "2024-01-12T14:30:00",
    isActive: true
  }
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [logLevel, setLogLevel] = useState("all");
  const [settings, setSettings] = useState({
    maxParticipants: 50,
    sessionDuration: 60,
    autoApproval: false,
    requireFeedback: true,
    allowRescheduling: true,
    maxReschedules: 2
  });

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "",
    department: ""
  });

  const [templateForm, setTemplateForm] = useState({
    name: "",
    subject: "",
    content: "",
    category: ""
  });
  const [pendingUsers, setPendingUsers] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@strathmore.edu",
      department: "Computer Science",
      createdAt: "2024-01-15T10:30:00",
      status: "pending"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@strathmore.edu",
      department: "Business Administration",
      createdAt: "2024-01-14T15:45:00",
      status: "pending"
    }
  ]);
  const [selectedRole, setSelectedRole] = useState("");

  const handleSaveUser = () => {
    if (!userForm.name || !userForm.email || !userForm.role) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("User saved successfully");
    setUserForm({ name: "", email: "", role: "", department: "" });
  };

  const handleSaveTemplate = () => {
    if (!templateForm.name || !templateForm.subject || !templateForm.content) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Email template saved successfully");
    setTemplateForm({ name: "", subject: "", content: "", category: "" });
  };

  const handleSaveSettings = () => {
    toast.success("Program settings saved successfully");
  };

  const handleAssignRole = (userId: string, role: string) => {
    // In a real app, this would call the API
    setPendingUsers(prev => prev.filter(user => user.id !== userId));
    toast.success(`Role ${role} assigned successfully`);
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "error": return "bg-white text-gray-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      case "info": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLogs = systemLogs.filter(log => 
    logLevel === "all" || log.level === logLevel
  );

  return (
    <MainLayout showSidebar={true}>
      <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Oversight Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor platform statistics, user engagement, and system health
          </p>
        </div>
        <Badge variant="outline" className="flex items-center space-x-1">
          <Shield className="w-3 h-3" />
          <span>Admin Oversight</span>
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Platform Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>User Oversight</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>System Health</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Configuration</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Reports</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Matching Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Matching Outcomes</span>
                </CardTitle>
                <CardDescription>Coach-coachee matching statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Success Rate</span>
                  <span className="font-semibold text-green-600">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Pending Matches</span>
                  <span className="font-semibold text-yellow-600">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Rejected Matches</span>
                  <span className="font-semibold text-white">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Matches</span>
                  <span className="font-semibold text-blue-600">156</span>
                </div>
              </CardContent>
            </Card>

            {/* Goal Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Goal Statistics</span>
                </CardTitle>
                <CardDescription>Goal creation and progress tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Goals Created</span>
                  <span className="font-semibold">342</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">In Progress</span>
                  <span className="font-semibold text-blue-600">198</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <span className="font-semibold text-green-600">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Progress</span>
                  <span className="font-semibold">68%</span>
                </div>
              </CardContent>
            </Card>

            {/* Session Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Session Analytics</span>
                </CardTitle>
                <CardDescription>Session attendance and frequency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Attendance Rate</span>
                  <span className="font-semibold text-green-600">92%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Sessions/Week</span>
                  <span className="font-semibold">3.2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Cancellations</span>
                  <span className="font-semibold text-white">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">No Shows</span>
                  <span className="font-semibold text-orange-600">8</span>
                </div>
              </CardContent>
            </Card>

            {/* Messaging Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Messaging Stats</span>
                </CardTitle>
                <CardDescription>Communication engagement metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Users</span>
                  <span className="font-semibold text-green-600">234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Response Time</span>
                  <span className="font-semibold">2.3h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Messages/Day</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Engagement Rate</span>
                  <span className="font-semibold text-blue-600">78%</span>
                </div>
              </CardContent>
            </Card>

            {/* Program Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Program Statistics</span>
                </CardTitle>
                <CardDescription>Program performance and satisfaction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Programs</span>
                  <span className="font-semibold text-green-600">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Completion Rate</span>
                  <span className="font-semibold text-blue-600">84%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Satisfaction Score</span>
                  <span className="font-semibold text-green-600">4.6/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Participants</span>
                  <span className="font-semibold">456</span>
                </div>
              </CardContent>
            </Card>

            {/* Participation Levels */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserCheck className="w-5 h-5" />
                  <span>Participation Levels</span>
                </CardTitle>
                <CardDescription>User engagement by role</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Coaches</span>
                  <span className="font-semibold text-blue-600">45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Coachees</span>
                  <span className="font-semibold text-green-600">123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Faculty Members</span>
                  <span className="font-semibold text-purple-600">28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Active</span>
                  <span className="font-semibold">196</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Export Users
                </Button>
              <Button variant="outline">
                <Activity className="w-4 h-4 mr-2" />
                Engagement Report
                    </Button>
                  </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Overview ({filteredUsers.length})</CardTitle>
              <CardDescription>
                Monitor user engagement and account status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>
                          {user.status}
                        </Badge>
                        <Badge variant="outline">{user.role}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <span>{user.department}</span>
                        <span>Last login: {new Date(user.lastLogin).toLocaleDateString()}</span>
                        <span className="text-green-600">Engagement: High</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" title="View Details">
                        <Activity className="w-4 h-4" />
                      </Button>
                      {user.status === "active" ? (
                        <Button variant="ghost" size="sm" title="Suspend Account">
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm" title="Reactivate Account">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                    </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>System Health</span>
                </CardTitle>
                <CardDescription>Monitor system performance and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Server Status</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Database Status</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">Connected</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">API Response Time</span>
                  <span className="font-semibold text-green-600">45ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="font-semibold">99.9%</span>
                </div>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Usage Statistics</span>
                </CardTitle>
                <CardDescription>Platform usage and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Daily Active Users</span>
                  <span className="font-semibold text-blue-600">234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Weekly Active Users</span>
                  <span className="font-semibold text-green-600">1,456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Monthly Active Users</span>
                  <span className="font-semibold text-purple-600">3,892</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Registered</span>
                  <span className="font-semibold">4,567</span>
                </div>
              </CardContent>
            </Card>

            {/* Error Logs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Recent Errors</span>
                </CardTitle>
                <CardDescription>System errors and failed operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Failed Logins (24h)</span>
                  <span className="font-semibold text-white">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">API Errors (24h)</span>
                  <span className="font-semibold text-orange-600">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Database Errors</span>
                  <span className="font-semibold text-green-600">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Suspicious Activity</span>
                  <span className="font-semibold text-green-600">0</span>
          </div>
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card>
                <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="w-5 h-5" />
                  <span>Security Status</span>
                      </CardTitle>
                <CardDescription>Security monitoring and compliance</CardDescription>
                </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">SSL Certificate</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">Valid</Badge>
                      </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Password Policy</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">Enforced</Badge>
                    </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">2FA Adoption</span>
                  <span className="font-semibold text-blue-600">78%</span>
                    </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Security Scan</span>
                  <span className="font-semibold">2 hours ago</span>
                  </div>
                </CardContent>
              </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>
                  Configure authentication and system settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                  <div>
                      <Label>Google OAuth</Label>
                      <p className="text-sm text-muted-foreground">Enable Google authentication</p>
                  </div>
                    <Switch
                      checked={true}
                      onCheckedChange={() => {}}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Password Policy</Label>
                      <p className="text-sm text-muted-foreground">Enforce strong passwords</p>
                    </div>
                    <Switch
                      checked={true}
                      onCheckedChange={() => {}}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                    </div>
                    <Switch
                      checked={true}
                      onCheckedChange={() => {}}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Account Lockout</Label>
                      <p className="text-sm text-muted-foreground">Lock accounts after failed attempts</p>
                    </div>
                    <Switch
                      checked={true}
                      onCheckedChange={() => {}}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={30}
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={5}
                      readOnly
                    />
                  </div>
                </div>
                <Button onClick={handleSaveSettings} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Configuration
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Departments & Categories</CardTitle>
                <CardDescription>
                  Manage departments and system categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Departments</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Business Administration</span>
                        <Badge variant="outline">45 users</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Computer Science</span>
                        <Badge variant="outline">32 users</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Finance</span>
                        <Badge variant="outline">28 users</Badge>
                          </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Marketing</span>
                        <Badge variant="outline">19 users</Badge>
                        </div>
                      </div>
                    </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Program Categories</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Career Development</span>
                        <Badge variant="outline">8 programs</Badge>
                        </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Leadership</span>
                        <Badge variant="outline">5 programs</Badge>
                        </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Technical Skills</span>
                        <Badge variant="outline">6 programs</Badge>
                            </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Personal Growth</span>
                        <Badge variant="outline">4 programs</Badge>
                        </div>
                        </div>
                      </div>
                  
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Department/Category
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Platform Reports</h2>
              <p className="text-sm text-muted-foreground">
                Generate and export comprehensive platform reports
              </p>
            </div>
            <div className="flex items-center space-x-2">
            <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Export All Data
              </Button>
              <Button>
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Report
            </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
                <CardTitle>Available Reports</CardTitle>
                <CardDescription>Select a report type to generate</CardDescription>
            </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <h4 className="font-medium">User Engagement Report</h4>
                      <p className="text-sm text-muted-foreground">Active users, login frequency, session participation</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <FileText className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <h4 className="font-medium">Matching Success Report</h4>
                      <p className="text-sm text-muted-foreground">Coach-coachee matching outcomes and success rates</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <FileText className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <h4 className="font-medium">Program Performance Report</h4>
                      <p className="text-sm text-muted-foreground">Program completion rates, satisfaction scores</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <FileText className="w-4 h-4" />
                    </Button>
                      </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <h4 className="font-medium">Goal Achievement Report</h4>
                      <p className="text-sm text-muted-foreground">Goal completion rates, progress tracking</p>
                      </div>
                    <Button variant="ghost" size="sm">
                      <FileText className="w-4 h-4" />
                    </Button>
                    </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle>Report History</CardTitle>
                <CardDescription>Previously generated reports</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Monthly Engagement Report</h4>
                      <p className="text-sm text-muted-foreground">Generated on Jan 15, 2024</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <FileText className="w-4 h-4" />
                    </Button>
                        </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                      <h4 className="font-medium">Q4 Program Performance</h4>
                      <p className="text-sm text-muted-foreground">Generated on Jan 10, 2024</p>
                        </div>
                    <Button variant="ghost" size="sm">
                      <FileText className="w-4 h-4" />
                    </Button>
                      </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">User Activity Summary</h4>
                      <p className="text-sm text-muted-foreground">Generated on Jan 5, 2024</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <FileText className="w-4 h-4" />
                      </Button>
                    </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </MainLayout>
  );
}
