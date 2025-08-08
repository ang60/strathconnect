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
  Plus
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
      case "error": return "bg-red-100 text-red-800";
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
          <h1 className="text-3xl font-bold tracking-tight">Admin Configuration</h1>
          <p className="text-muted-foreground">
            Manage users, roles, settings, and system configuration
          </p>
        </div>
        <Badge variant="outline" className="flex items-center space-x-1">
          <Shield className="w-3 h-3" />
          <span>Admin Access</span>
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>User Management</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Role Management</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Program Settings</span>
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>System Logs</span>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Pending Users</span>
          </TabsTrigger>
        </TabsList>

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
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account with appropriate permissions
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userForm.name}
                      onChange={(e) => setUserForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userForm.email}
                      onChange={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select value={userForm.role} onValueChange={(value) => setUserForm(prev => ({ ...prev, role: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Coordinator">Coordinator</SelectItem>
                        <SelectItem value="Mentor">Mentor</SelectItem>
                        <SelectItem value="Mentee">Mentee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={userForm.department}
                      onChange={(e) => setUserForm(prev => ({ ...prev, department: e.target.value }))}
                      placeholder="Enter department"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSaveUser}>
                      <Save className="w-4 h-4 mr-2" />
                      Save User
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
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
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Role Management</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Role
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {roles.map((role) => (
              <Card key={role.name}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="w-5 h-5" />
                        <span>{role.name}</span>
                      </CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{role.userCount} users</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Permissions</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {role.permissions.map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {permission.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="w-4 h-4 mr-2" />
                        View Users
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Program Settings</CardTitle>
                <CardDescription>
                  Configure program behavior and limits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxParticipants">Max Participants</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      value={settings.maxParticipants}
                      onChange={(e) => setSettings(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sessionDuration">Session Duration (min)</Label>
                    <Input
                      id="sessionDuration"
                      type="number"
                      value={settings.sessionDuration}
                      onChange={(e) => setSettings(prev => ({ ...prev, sessionDuration: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-approval</Label>
                      <p className="text-sm text-muted-foreground">Automatically approve new users</p>
                    </div>
                    <Switch
                      checked={settings.autoApproval}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoApproval: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require feedback</Label>
                      <p className="text-sm text-muted-foreground">Mandatory session feedback</p>
                    </div>
                    <Switch
                      checked={settings.requireFeedback}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, requireFeedback: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow rescheduling</Label>
                      <p className="text-sm text-muted-foreground">Users can reschedule sessions</p>
                    </div>
                    <Switch
                      checked={settings.allowRescheduling}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, allowRescheduling: checked }))}
                    />
                  </div>
                </div>
                <Button onClick={handleSaveSettings} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>
                  Manage email templates for notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emailTemplates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-semibold">{template.name}</h3>
                            <p className="text-sm text-muted-foreground">{template.subject}</p>
                          </div>
                          <Badge variant="outline">{template.category}</Badge>
                          <Badge variant={template.isActive ? "default" : "secondary"}>
                            {template.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Template
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create Email Template</DialogTitle>
                        <DialogDescription>
                          Create a new email template with rich text editor
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="templateName">Template Name</Label>
                          <Input
                            id="templateName"
                            value={templateForm.name}
                            onChange={(e) => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter template name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="templateSubject">Subject Line</Label>
                          <Input
                            id="templateSubject"
                            value={templateForm.subject}
                            onChange={(e) => setTemplateForm(prev => ({ ...prev, subject: e.target.value }))}
                            placeholder="Enter email subject"
                          />
                        </div>
                        <div>
                          <Label htmlFor="templateContent">Email Content</Label>
                          <div className="border rounded-lg p-4 mt-2">
                            <div className="flex items-center space-x-2 mb-4 border-b pb-2">
                              <Button variant="ghost" size="sm">
                                <strong>B</strong>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <em>I</em>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <u>U</u>
                              </Button>
                              <Separator orientation="vertical" className="h-6" />
                              <Button variant="ghost" size="sm">Link</Button>
                            </div>
                            <Textarea
                              id="templateContent"
                              value={templateForm.content}
                              onChange={(e) => setTemplateForm(prev => ({ ...prev, content: e.target.value }))}
                              placeholder="Enter email content with HTML support..."
                              rows={8}
                              className="border-0 p-0 resize-none"
                            />
                          </div>
                                                     <p className="text-sm text-muted-foreground mt-2">
                             Use HTML tags for formatting. Available variables: {"{user_name}"}, {"{program_name}"}
                           </p>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline">Cancel</Button>
                          <Button onClick={handleSaveTemplate}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Template
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <div className="flex items-center justify-between">
            <Select value={logLevel} onValueChange={setLogLevel}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              Export Logs
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>
                Monitor system activity and user actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      {log.level === "error" && <AlertTriangle className="w-5 h-5 text-red-500" />}
                      {log.level === "warning" && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                      {log.level === "info" && <CheckCircle className="w-5 h-5 text-blue-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <Badge className={getLogLevelColor(log.level)}>
                          {log.level.toUpperCase()}
                        </Badge>
                        <span className="font-medium">{log.action}</span>
                        <span className="text-sm text-muted-foreground">by {log.user}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(log.timestamp).toLocaleString()}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Pending User Approvals</h2>
              <p className="text-sm text-muted-foreground">
                Review and assign roles to new users
              </p>
            </div>
            <Badge variant="outline" className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{pendingUsers.length} Pending</span>
            </Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Users Awaiting Role Assignment</CardTitle>
              <CardDescription>
                New users who have registered and are waiting for role assignment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Department: {user.department} • Registered: {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Select value={selectedRole} onValueChange={setSelectedRole}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mentor">Mentor</SelectItem>
                          <SelectItem value="mentee">Mentee</SelectItem>
                          <SelectItem value="coordinator">Coordinator</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={() => handleAssignRole(user.id, selectedRole)}
                        disabled={!selectedRole}
                        size="sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Assign Role
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {pendingUsers.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No pending users</h3>
                    <p className="text-muted-foreground">All users have been assigned roles</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </MainLayout>
  );
}
