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
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  Send, 
  Search, 
  Filter, 
  Bell, 
  Users,
  MoreHorizontal,
  Paperclip,
  Smile,
  Phone,
  Video,
  Mail,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  Volume2,
  VolumeX,
  Settings,
  Plus
} from "lucide-react";

// Mock data
const conversations = [
  {
    id: "1",
    name: "Sarah Muthoni",
    avatar: "/avatars/sarah.jpg",
    lastMessage: "Thank you for the guidance on the project!",
    timestamp: "2 min ago",
    unread: 2,
    online: true,
    role: "Coachee"
  },
  {
    id: "2",
    name: "David Kimani",
    avatar: "/avatars/david.jpg",
    lastMessage: "When is our next session scheduled?",
    timestamp: "1 hour ago",
    unread: 0,
    online: false,
    role: "Coach"
  },
  {
    id: "3",
    name: "Grace Wanjiku",
    avatar: "/avatars/grace.jpg",
    lastMessage: "I've completed the assigned tasks.",
    timestamp: "3 hours ago",
    unread: 1,
    online: true,
    role: "Coachee"
  }
];

const messages = [
  {
    id: "1",
    sender: "Sarah Muthoni",
    avatar: "/avatars/sarah.jpg",
    content: "Hi! I have some questions about the leadership project we discussed.",
    timestamp: "10:30 AM",
    isOwn: false
  },
  {
    id: "2",
    sender: "You",
    avatar: "/avatars/alice.jpg",
    content: "Of course! I'm here to help. What specific aspects would you like to discuss?",
    timestamp: "10:32 AM",
    isOwn: true
  },
  {
    id: "3",
    sender: "Sarah Muthoni",
    avatar: "/avatars/sarah.jpg",
    content: "I'm struggling with team motivation strategies. Any tips?",
    timestamp: "10:35 AM",
    isOwn: false
  },
  {
    id: "4",
    sender: "You",
    avatar: "/avatars/alice.jpg",
    content: "Great question! Here are some effective strategies:\n\n1. Regular check-ins\n2. Recognition programs\n3. Clear goal setting\n4. Professional development opportunities\n\nWould you like to schedule a session to dive deeper?",
    timestamp: "10:38 AM",
    isOwn: true
  }
];

const notifications = [
  {
    id: "1",
    title: "New Session Request",
    message: "David Kimani requested a session for tomorrow",
    timestamp: "5 min ago",
    type: "session",
    read: false
  },
  {
    id: "2",
    title: "Goal Achievement",
    message: "Congratulations! You've completed 5 sessions this month",
    timestamp: "1 hour ago",
    type: "achievement",
    read: false
  },
  {
    id: "3",
    title: "Program Update",
    message: "Leadership Development Program has new content available",
    timestamp: "3 hours ago",
    type: "program",
    read: true
  },
  {
    id: "4",
    title: "Feedback Received",
    message: "Sarah Muthoni left you 5-star feedback",
    timestamp: "1 day ago",
    type: "feedback",
    read: true
  }
];

// const broadcasts = [
//   {
//     id: "1",
//     title: "System Maintenance",
//     message: "Scheduled maintenance on Sunday, 2-4 AM. Services may be temporarily unavailable.",
//     timestamp: "2 hours ago",
//     priority: "medium"
//   },
//   {
//     id: "2",
//     title: "New Feature Launch",
//     message: "Video calling feature is now available for all premium users!",
//     timestamp: "1 day ago",
//     priority: "high"
//   }
// ];

export default function CommunicationPage() {
  const [selectedConversation, setSelectedConversation] = useState("1");
  const [messageText, setMessageText] = useState("");
  const [notificationFilter, setNotificationFilter] = useState("all");

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "session":
        return <MessageSquare className="w-4 h-4" />;
      case "achievement":
        return <Star className="w-4 h-4" />;
      case "program":
        return <TrendingUp className="w-4 h-4" />;
      case "feedback":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-white text-gray-800 dark:bg-gray-900/20 dark:text-white";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Communication & Notifications</h1>
            <p className="text-muted-foreground">
              Stay connected with coaches, coachees, and stay updated with notifications
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Total Messages</p>
                  <p className="text-2xl font-bold">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Active Chats</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <Bell className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Unread Notifications</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="messages" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="messages" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            {/* <TabsTrigger value="broadcasts" className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4" />
              <span>Broadcasts</span>
            </TabsTrigger> */}
          </TabsList>

          <TabsContent value="messages" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Conversations List */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Conversations</span>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search conversations..."
                        className="pl-10"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[600px]">
                      <div className="space-y-1">
                        {conversations.map((conversation) => (
                          <div
                            key={conversation.id}
                            className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                              selectedConversation === conversation.id ? "bg-muted" : ""
                            }`}
                            onClick={() => setSelectedConversation(conversation.id)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={conversation.avatar} alt={conversation.name} />
                                  <AvatarFallback>
                                    {conversation.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                {conversation.online && (
                                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium truncate">{conversation.name}</p>
                                  <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                                </div>
                                <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {conversation.role}
                                  </Badge>
                                  {conversation.unread > 0 && (
                                    <Badge variant="default" className="text-xs">
                                      {conversation.unread}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Chat Area */}
              <div className="lg:col-span-2">
                <Card className="h-[700px] flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="/avatars/sarah.jpg" alt="Sarah Muthoni" />
                          <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">Sarah Muthoni</CardTitle>
                          <CardDescription>Mentee • Online</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-[500px] p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                          >
                            <div className={`flex items-end space-x-2 max-w-[70%] ${message.isOwn ? "flex-row-reverse space-x-reverse" : ""}`}>
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={message.avatar} alt={message.sender} />
                                <AvatarFallback>
                                  {message.sender.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className={`rounded-lg p-3 ${
                                message.isOwn 
                                  ? "bg-blue-600 text-white" 
                                  : "bg-muted"
                              }`}>
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                <p className={`text-xs mt-1 ${
                                  message.isOwn ? "text-blue-100" : "text-muted-foreground"
                                }`}>
                                  {message.timestamp}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <div className="p-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Smile className="w-4 h-4" />
                      </Button>
                      <Input
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="flex-1"
                        onKeyPress={(e) => e.key === 'Enter' && setMessageText("")}
                      />
                      <Button>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Notifications</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select value={notificationFilter} onValueChange={setNotificationFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All notifications</SelectItem>
                        <SelectItem value="session">Session requests</SelectItem>
                        <SelectItem value="achievement">Achievements</SelectItem>
                        <SelectItem value="program">Program updates</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      Mark all as read
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start space-x-3 p-3 rounded-lg border ${
                        !notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        !notification.read ? "bg-blue-100 dark:bg-blue-900/40" : "bg-muted"
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{notification.title}</p>
                          <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* <TabsContent value="broadcasts" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>System Broadcasts</CardTitle>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Send Broadcast
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {broadcasts.map((broadcast) => (
                    <Card key={broadcast.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-semibold">{broadcast.title}</h4>
                              <Badge variant="outline" className={getPriorityColor(broadcast.priority)}>
                                {broadcast.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{broadcast.message}</p>
                            <p className="text-xs text-muted-foreground">{broadcast.timestamp}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}
        </Tabs>
      </div>
    </MainLayout>
  );
}
