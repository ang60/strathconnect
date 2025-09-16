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
  MessageSquare, 
  Star, 
  TrendingUp, 
  BarChart3, 
  Users,
  CheckCircle,
  Clock,
  Award,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Filter,
  Search,
  Download,
  Eye,
  Edit,
  MoreHorizontal
} from "lucide-react";

// Mock data
const sessionFeedback = [
  {
    id: "1",
    sessionTitle: "Leadership Development Session",
    mentor: "Sarah Muthoni",
    mentee: "David Kimani",
    date: "2024-01-15",
    rating: 5,
    feedback: "Excellent session! The mentor provided valuable insights on strategic thinking and decision-making. The practical examples were very helpful.",
    categories: {
      communication: 5,
      knowledge: 5,
      engagement: 4,
      value: 5
    },
    actionItems: ["Implement strategic planning framework", "Practice decision-making scenarios"],
    status: "completed"
  },
  {
    id: "2",
    sessionTitle: "Technical Skills Review",
    mentor: "Grace Wanjiku",
    mentee: "John Kamau",
    date: "2024-01-12",
    rating: 4,
    feedback: "Good session overall. The mentor is knowledgeable but could provide more hands-on exercises.",
    categories: {
      communication: 4,
      knowledge: 5,
      engagement: 3,
      value: 4
    },
    actionItems: ["Review code documentation", "Practice debugging techniques"],
    status: "completed"
  }
];

const programSurveys = [
  {
    id: "1",
    programName: "Leadership Development Program",
    participant: "Alice Wilson",
    date: "2024-01-10",
    overallRating: 4.5,
    questions: [
      { question: "How satisfied are you with the program content?", rating: 5 },
      { question: "How effective was the mentorship?", rating: 4 },
      { question: "Would you recommend this program?", rating: 5 },
      { question: "How well did the program meet your goals?", rating: 4 }
    ],
    comments: "The program exceeded my expectations. The mentorship component was particularly valuable.",
    status: "completed"
  },
  {
    id: "2",
    programName: "Career Transition Coaching",
    participant: "Peter Mwangi",
    date: "2024-01-08",
    overallRating: 4.0,
    questions: [
      { question: "How satisfied are you with the program content?", rating: 4 },
      { question: "How effective was the coaching?", rating: 4 },
      { question: "Would you recommend this program?", rating: 4 },
      { question: "How well did the program meet your goals?", rating: 4 }
    ],
    comments: "Good program with practical advice. Could use more networking opportunities.",
    status: "completed"
  }
];

const npsData = {
  score: 8.2,
  totalResponses: 156,
  breakdown: {
    promoters: 89,
    passives: 45,
    detractors: 22
  },
  comments: [
    "Excellent platform for professional development",
    "Great mentorship opportunities",
    "Could improve the mobile experience",
    "Very helpful for career growth"
  ]
};

export default function FeedbackPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

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

  const getNPSColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-white";
  };

  const calculateNPS = () => {
    const { promoters, detractors, totalResponses } = npsData.breakdown;
    return Math.round(((promoters - detractors) / totalResponses) * 100);
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Feedback & Surveys</h1>
            <p className="text-muted-foreground">
              Collect, analyze, and act on feedback to improve mentorship quality
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Total Feedback</p>
                  <p className="text-2xl font-bold">247</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Avg Rating</p>
                  <p className="text-2xl font-bold">4.6</p>
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
                  <p className="text-sm font-medium">NPS Score</p>
                  <p className="text-2xl font-bold">+43</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Response Rate</p>
                  <p className="text-2xl font-bold">87%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="session" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="session" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Session Feedback</span>
            </TabsTrigger>
            <TabsTrigger value="surveys" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Program Surveys</span>
            </TabsTrigger>
            <TabsTrigger value="nps" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>NPS Score</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="session" className="space-y-6">
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
                        placeholder="Search feedback..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Rating</label>
                    <Select value={ratingFilter} onValueChange={setRatingFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All ratings" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All ratings</SelectItem>
                        <SelectItem value="5">5 stars</SelectItem>
                        <SelectItem value="4">4+ stars</SelectItem>
                        <SelectItem value="3">3+ stars</SelectItem>
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

            {/* Session Feedback List */}
            <div className="space-y-4">
              {sessionFeedback.map((feedback) => (
                <Card key={feedback.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            {feedback.status}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            {renderStars(feedback.rating)}
                            <span className="text-sm font-medium ml-1">{feedback.rating}/5</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{feedback.sessionTitle}</CardTitle>
                        <CardDescription>
                          {feedback.mentor} → {feedback.mentee} • {new Date(feedback.date).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Feedback</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feedback.feedback}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Category Ratings</p>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(feedback.categories).map(([category, rating]) => (
                          <div key={category} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{category}</span>
                            <div className="flex items-center space-x-1">
                              {renderStars(rating)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Action Items</p>
                      <div className="space-y-1">
                        {feedback.actionItems.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
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

          <TabsContent value="surveys" className="space-y-6">
            <div className="space-y-4">
              {programSurveys.map((survey) => (
                <Card key={survey.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                            {survey.status}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            {renderStars(survey.overallRating)}
                            <span className="text-sm font-medium ml-1">{survey.overallRating}/5</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{survey.programName}</CardTitle>
                        <CardDescription>
                          {survey.participant} • {new Date(survey.date).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Survey Responses</p>
                      <div className="space-y-3">
                        {survey.questions.map((question, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{question.question}</span>
                              <div className="flex items-center space-x-1">
                                {renderStars(question.rating)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Comments</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {survey.comments}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View Full Survey
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nps" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* NPS Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>NPS Overview</CardTitle>
                  <CardDescription>
                    Net Promoter Score and breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getNPSColor(npsData.score)}`}>
                      {npsData.score}
                    </div>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Promoters (9-10)</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={(npsData.breakdown.promoters / npsData.totalResponses) * 100} className="w-20" />
                        <span className="text-sm font-medium">{npsData.breakdown.promoters}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Passives (7-8)</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={(npsData.breakdown.passives / npsData.totalResponses) * 100} className="w-20" />
                        <span className="text-sm font-medium">{npsData.breakdown.passives}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Detractors (0-6)</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={(npsData.breakdown.detractors / npsData.totalResponses) * 100} className="w-20" />
                        <span className="text-sm font-medium">{npsData.breakdown.detractors}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">+{calculateNPS()}</div>
                    <p className="text-sm text-muted-foreground">Net Promoter Score</p>
                  </div>
                </CardContent>
              </Card>

              {/* NPS Comments */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Comments</CardTitle>
                  <CardDescription>
                    What users are saying about the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {npsData.comments.map((comment, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-start space-x-2">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="w-4 h-4 text-green-500" />
                          </div>
                          <p className="text-sm">{comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Feedback Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Feedback Trends</CardTitle>
                  <CardDescription>
                    Monthly feedback volume and ratings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">This Month</span>
                      <span className="text-sm font-medium">+12%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Last Month</span>
                      <span className="text-sm font-medium">+8%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">3 Months Ago</span>
                      <span className="text-sm font-medium">+5%</span>
                    </div>
                    <Progress value={55} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Rating Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Rating Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of feedback ratings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">5 Stars</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={65} className="w-20" />
                        <span className="text-sm font-medium">65%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">4 Stars</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={25} className="w-20" />
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">3 Stars</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={8} className="w-20" />
                        <span className="text-sm font-medium">8%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">2 Stars</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={2} className="w-20" />
                        <span className="text-sm font-medium">2%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Response Rate */}
              <Card>
                <CardHeader>
                  <CardTitle>Response Rate</CardTitle>
                  <CardDescription>
                    Feedback completion rates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">87%</div>
                      <p className="text-sm text-muted-foreground">Overall Response Rate</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Session Feedback</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Program Surveys</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">NPS Surveys</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
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
