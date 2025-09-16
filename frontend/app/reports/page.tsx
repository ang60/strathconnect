"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Download, 
  Filter, 
  Calendar, 
  Target, 
  MessageSquare, 
  Star, 
  FileText,
  PieChart,
  Activity,
  Award,
  Clock,
  UserCheck,
  UserX,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { toast } from "sonner";

// Mock data for analytics
const userEngagementData = {
  totalUsers: 1247,
  activeUsers: 892,
  newUsers: 156,
  churnRate: 8.5,
  avgSessionDuration: 45,
  sessionFrequency: 3.2
};

const programMetrics = {
  totalPrograms: 24,
  activePrograms: 18,
  completedPrograms: 6,
  avgCompletionRate: 87,
  avgSatisfaction: 4.6,
  totalParticipants: 892
};

const coachingStats = {
  totalCoaches: 89,
  totalCoachees: 234,
  activeCoachingRelationships: 156,
  avgCoachingDuration: 6.2,
  successRate: 92,
  avgRating: 4.7
};

const monthlyData = [
  { month: "Jan", users: 120, sessions: 89, programs: 12, satisfaction: 4.2 },
  { month: "Feb", users: 145, sessions: 112, programs: 15, satisfaction: 4.3 },
  { month: "Mar", users: 167, sessions: 134, programs: 18, satisfaction: 4.4 },
  { month: "Apr", users: 189, sessions: 156, programs: 20, satisfaction: 4.5 },
  { month: "May", users: 212, sessions: 178, programs: 22, satisfaction: 4.6 },
  { month: "Jun", users: 234, sessions: 201, programs: 24, satisfaction: 4.7 }
];

const roleDistribution = [
  { role: "Coachees", count: 234, percentage: 45 },
  { role: "Coaches", count: 89, percentage: 17 },
  { role: "Coaches", count: 67, percentage: 13 },
  { role: "Coachees", count: 98, percentage: 19 },
  { role: "Coordinators", count: 23, percentage: 4 },
  { role: "Admins", count: 8, percentage: 2 }
];

const departmentStats = [
  { department: "Business Administration", users: 234, programs: 8, satisfaction: 4.6 },
  { department: "Finance", users: 189, programs: 6, satisfaction: 4.5 },
  { department: "Marketing", users: 156, programs: 5, satisfaction: 4.4 },
  { department: "IT", users: 123, programs: 4, satisfaction: 4.7 },
  { department: "HR", users: 98, programs: 3, satisfaction: 4.3 }
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [reportType, setReportType] = useState("user-engagement");

  const handleExport = (format: "pdf" | "excel") => {
    toast.success(`${format.toUpperCase()} report export started`);
    // Placeholder for actual export functionality
  };

  const handleGenerateReport = () => {
    toast.success("Custom report generated successfully");
    // Placeholder for actual report generation
  };

  const toggleDepartment = (department: string) => {
    setSelectedDepartments(prev => 
      prev.includes(department) 
        ? prev.filter(d => d !== department)
        : [...prev, department]
    );
  };

  const toggleRole = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const getGrowthIndicator = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(growth).toFixed(1),
      isPositive: growth > 0,
      icon: growth > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />
    };
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights and analytics for platform performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => handleExport("excel")}>
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
          <Button variant="outline" onClick={() => handleExport("pdf")}>
            <FileText className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>User Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="programs" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Program Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Custom Reports</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userEngagementData.totalUsers.toLocaleString()}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  {getGrowthIndicator(userEngagementData.totalUsers, 1100).icon}
                  <span className={getGrowthIndicator(userEngagementData.totalUsers, 1100).isPositive ? "text-green-600" : "text-white"}>
                    +{getGrowthIndicator(userEngagementData.totalUsers, 1100).value}%
                  </span>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{programMetrics.activePrograms}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  {getGrowthIndicator(programMetrics.activePrograms, 15).icon}
                  <span className={getGrowthIndicator(programMetrics.activePrograms, 15).isPositive ? "text-green-600" : "text-white"}>
                    +{getGrowthIndicator(programMetrics.activePrograms, 15).value}%
                  </span>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Coaching Relationships</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{coachingStats.activeCoachingRelationships}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  {getGrowthIndicator(coachingStats.activeCoachingRelationships, 142).icon}
                  <span className={getGrowthIndicator(mentorshipStats.activeMentorships, 142).isPositive ? "text-green-600" : "text-white"}>
                    +{getGrowthIndicator(coachingStats.activeCoachingRelationships, 142).value}%
                  </span>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Satisfaction</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{coachingStats.avgRating}/5</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  {getGrowthIndicator(coachingStats.avgRating * 100, 450).icon}
                  <span className={getGrowthIndicator(mentorshipStats.avgRating * 100, 450).isPositive ? "text-green-600" : "text-white"}>
                    +{getGrowthIndicator(coachingStats.avgRating * 100, 450).value}%
                  </span>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Growth Trends</CardTitle>
                <CardDescription>User growth and engagement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Monthly trends chart would be displayed here</p>
                    <p className="text-sm text-muted-foreground">Integration with charting library required</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Role Distribution</CardTitle>
                <CardDescription>Breakdown of users by role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roleDistribution.map((item) => (
                    <div key={item.role} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">{item.role}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{item.count}</span>
                        <span className="text-sm text-muted-foreground">({item.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Program satisfaction and participation by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStats.map((dept) => (
                  <div key={dept.department} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{dept.department}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        <span>{dept.users} users</span>
                        <span>{dept.programs} programs</span>
                        <span className="flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>{dept.satisfaction}/5</span>
                        </span>
                      </div>
                    </div>
                    <Progress value={dept.satisfaction * 20} className="w-24" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userEngagementData.activeUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {((userEngagementData.activeUsers / userEngagementData.totalUsers) * 100).toFixed(1)}% of total users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userEngagementData.newUsers}</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
                <UserX className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userEngagementData.churnRate}%</div>
                <p className="text-xs text-muted-foreground">
                  Monthly churn rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Session Duration</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userEngagementData.avgSessionDuration} min</div>
                <p className="text-xs text-muted-foreground">
                  Per session
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Session Frequency</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userEngagementData.sessionFrequency}</div>
                <p className="text-xs text-muted-foreground">
                  Sessions per user per month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Score</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.7/10</div>
                <p className="text-xs text-muted-foreground">
                  Overall engagement
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Activity Timeline</CardTitle>
              <CardDescription>Daily active users over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">User activity timeline chart would be displayed here</p>
                  <p className="text-sm text-muted-foreground">Integration with charting library required</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Programs</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{programMetrics.totalPrograms}</div>
                <p className="text-xs text-muted-foreground">
                  All time
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{programMetrics.avgCompletionRate}%</div>
                <p className="text-xs text-muted-foreground">
                  Average across all programs
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Satisfaction</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{programMetrics.avgSatisfaction}/5</div>
                <p className="text-xs text-muted-foreground">
                  Program satisfaction
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{programMetrics.totalParticipants}</div>
                <p className="text-xs text-muted-foreground">
                  Across all programs
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Coaching Success</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{coachingStats.successRate}%</div>
                <p className="text-xs text-muted-foreground">
                  Successful coaching relationships
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{coachingStats.avgCoachingDuration} months</div>
                <p className="text-xs text-muted-foreground">
                  Per coaching relationship
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Program Performance Overview</CardTitle>
              <CardDescription>Program metrics and success indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <PieChart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Program performance chart would be displayed here</p>
                  <p className="text-sm text-muted-foreground">Integration with charting library required</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Custom Report Generator</span>
              </CardTitle>
              <CardDescription>
                Generate custom reports with specific filters and date ranges
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="reportType">Report Type</Label>
                    <Select value={reportType} onValueChange={setReportType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user-engagement">User Engagement</SelectItem>
                        <SelectItem value="program-performance">Program Performance</SelectItem>
                        <SelectItem value="coaching-analytics">Coaching Analytics</SelectItem>
                        <SelectItem value="department-stats">Department Statistics</SelectItem>
                        <SelectItem value="satisfaction-survey">Satisfaction Survey Results</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Date Range</Label>
                    <div className="flex space-x-2 mt-2">
                      <Input
                        type="date"
                        placeholder="From"
                        value={dateRange.from?.toISOString().split('T')[0] || ''}
                        onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value ? new Date(e.target.value) : undefined }))}
                      />
                      <Input
                        type="date"
                        placeholder="To"
                        value={dateRange.to?.toISOString().split('T')[0] || ''}
                        onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value ? new Date(e.target.value) : undefined }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Departments</Label>
                    <div className="mt-2 space-y-2">
                      {["Business Administration", "Finance", "Marketing", "IT", "HR"].map((dept) => (
                        <div key={dept} className="flex items-center space-x-2">
                          <Checkbox
                            id={dept}
                            checked={selectedDepartments.includes(dept)}
                            onCheckedChange={() => toggleDepartment(dept)}
                          />
                          <Label htmlFor={dept}>{dept}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>User Roles</Label>
                    <div className="mt-2 space-y-2">
                      {["Coachees", "Coaches", "Mentors", "Mentees", "Coordinators", "Admins"].map((role) => (
                        <div key={role} className="flex items-center space-x-2">
                          <Checkbox
                            id={role}
                            checked={selectedRoles.includes(role)}
                            onCheckedChange={() => toggleRole(role)}
                          />
                          <Label htmlFor={role}>{role}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button onClick={() => handleGenerateReport()}>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline" onClick={() => handleExport("excel")}>
                    <Download className="w-4 h-4 mr-2" />
                    Export Excel
                  </Button>
                  <Button variant="outline" onClick={() => handleExport("pdf")}>
                    <FileText className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
                <Badge variant="secondary">
                  {selectedDepartments.length + selectedRoles.length} filters applied
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Reports</CardTitle>
                <CardDescription>Pre-configured report templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start" onClick={() => handleExport("excel")}>
                  <Users className="w-4 h-4 mr-2" />
                  Monthly User Report
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => handleExport("excel")}>
                  <Target className="w-4 h-4 mr-2" />
                  Program Performance Report
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => handleExport("excel")}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Coaching Success Report
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => handleExport("excel")}>
                  <Star className="w-4 h-4 mr-2" />
                  Satisfaction Survey Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report History</CardTitle>
                <CardDescription>Recently generated reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">User Engagement Report</p>
                    <p className="text-sm text-muted-foreground">Generated 2 hours ago</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Program Analytics Report</p>
                    <p className="text-sm text-muted-foreground">Generated 1 day ago</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Department Performance Report</p>
                    <p className="text-sm text-muted-foreground">Generated 3 days ago</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
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
