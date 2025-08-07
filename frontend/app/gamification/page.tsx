"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Trophy, 
  Award, 
  Star, 
  Target, 
  Users, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  Clock,
  Zap,
  Crown,
  Medal,
  Gift,
  Flame,
  Heart,
  BookOpen,
  MessageSquare,
  Activity
} from "lucide-react";
import { toast } from "sonner";

// Mock data for badges
const badges = [
  {
    id: "1",
    name: "First Session",
    description: "Completed your first mentorship session",
    icon: "🎯",
    category: "achievement",
    rarity: "common",
    unlocked: true,
    unlockedDate: "2024-01-10T10:00:00",
    points: 50
  },
  {
    id: "2",
    name: "Mentor Master",
    description: "Completed 10 mentorship sessions",
    icon: "👑",
    category: "achievement",
    rarity: "rare",
    unlocked: true,
    unlockedDate: "2024-01-15T14:30:00",
    points: 200
  },
  {
    id: "3",
    name: "Feedback Champion",
    description: "Provided feedback for 5 sessions",
    icon: "⭐",
    category: "engagement",
    rarity: "uncommon",
    unlocked: true,
    unlockedDate: "2024-01-12T16:45:00",
    points: 100
  },
  {
    id: "4",
    name: "Goal Crusher",
    description: "Achieved 3 personal goals",
    icon: "🎯",
    category: "achievement",
    rarity: "rare",
    unlocked: false,
    points: 150
  },
  {
    id: "5",
    name: "Early Bird",
    description: "Attended 5 morning sessions",
    icon: "🌅",
    category: "participation",
    rarity: "common",
    unlocked: false,
    points: 75
  },
  {
    id: "6",
    name: "Communication Pro",
    description: "Sent 20 messages in the platform",
    icon: "💬",
    category: "engagement",
    rarity: "uncommon",
    unlocked: false,
    points: 125
  }
];

// Mock data for leaderboard
const leaderboardData = [
  {
    id: "1",
    name: "Alice Wilson",
    avatar: "/avatars/alice.jpg",
    role: "Mentor",
    department: "Business Administration",
    points: 2840,
    level: 8,
    badges: 12,
    sessions: 45,
    rank: 1,
    change: "+2"
  },
  {
    id: "2",
    name: "Robert Ochieng",
    avatar: "/avatars/robert.jpg",
    role: "Mentee",
    department: "Finance",
    points: 2650,
    level: 7,
    badges: 10,
    sessions: 38,
    rank: 2,
    change: "+1"
  },
  {
    id: "3",
    name: "Sarah Muthoni",
    avatar: "/avatars/sarah.jpg",
    role: "Mentor",
    department: "Marketing",
    points: 2420,
    level: 7,
    badges: 9,
    sessions: 42,
    rank: 3,
    change: "-1"
  },
  {
    id: "4",
    name: "David Kimani",
    avatar: "/avatars/david.jpg",
    role: "Mentee",
    department: "IT",
    points: 2180,
    level: 6,
    badges: 8,
    sessions: 35,
    rank: 4,
    change: "+3"
  },
  {
    id: "5",
    name: "Grace Wanjiku",
    avatar: "/avatars/grace.jpg",
    role: "Coach",
    department: "HR",
    points: 1950,
    level: 6,
    badges: 7,
    sessions: 28,
    rank: 5,
    change: "-2"
  }
];

// Mock data for current user stats
const userStats = {
  currentPoints: 1840,
  totalPoints: 2840,
  level: 6,
  levelProgress: 75,
  nextLevelPoints: 2000,
  badges: 8,
  totalBadges: 24,
  sessions: 32,
  rank: 8,
  streak: 12,
  achievements: [
    { name: "First Session", date: "2024-01-10" },
    { name: "Feedback Champion", date: "2024-01-12" },
    { name: "Mentor Master", date: "2024-01-15" }
  ]
};

// Mock data for challenges
const challenges = [
  {
    id: "1",
    title: "Weekly Goal Setter",
    description: "Set and achieve 3 goals this week",
    points: 100,
    progress: 2,
    target: 3,
    deadline: "2024-01-21T23:59:59",
    status: "in-progress"
  },
  {
    id: "2",
    title: "Feedback Provider",
    description: "Provide feedback for 5 sessions",
    points: 150,
    progress: 5,
    target: 5,
    deadline: "2024-01-25T23:59:59",
    status: "completed"
  },
  {
    id: "3",
    title: "Early Bird Challenge",
    description: "Attend 3 morning sessions",
    points: 75,
    progress: 1,
    target: 3,
    deadline: "2024-01-28T23:59:59",
    status: "in-progress"
  }
];

export default function GamificationPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-gray-100 text-gray-800";
      case "uncommon": return "bg-green-100 text-green-800";
      case "rare": return "bg-blue-100 text-blue-800";
      case "epic": return "bg-purple-100 text-purple-800";
      case "legendary": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "common": return "🥉";
      case "uncommon": return "🥈";
      case "rare": return "🥇";
      case "epic": return "💎";
      case "legendary": return "👑";
      default: return "🥉";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const filteredBadges = badges.filter(badge => 
    selectedCategory === "all" || badge.category === selectedCategory
  );

  const unlockedBadges = badges.filter(badge => badge.unlocked);
  const lockedBadges = badges.filter(badge => !badge.unlocked);

  const handleClaimReward = (challengeId: string) => {
    toast.success("Reward claimed successfully! +150 points");
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gamification Center</h1>
          <p className="text-muted-foreground">
            Track your progress, earn badges, and compete on the leaderboard
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Trophy className="w-3 h-3" />
            <span>Level {userStats.level}</span>
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Trophy className="w-4 h-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="badges" className="flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span>Badges</span>
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Leaderboard</span>
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Challenges</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Points Tracker Widget */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Points</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +{userStats.currentPoints} this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Level</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.level}</div>
                <div className="flex items-center space-x-2 mt-2">
                  <Progress value={userStats.levelProgress} className="flex-1" />
                  <span className="text-xs text-muted-foreground">{userStats.levelProgress}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {userStats.nextLevelPoints - userStats.totalPoints} points to next level
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.badges}/{userStats.totalBadges}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((userStats.badges / userStats.totalBadges) * 100)}% completion
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">#{userStats.rank}</div>
                <p className="text-xs text-muted-foreground">
                  Top {Math.round((userStats.rank / leaderboardData.length) * 100)}% of users
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Streak and Recent Achievements */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span>Current Streak</span>
                </CardTitle>
                <CardDescription>
                  Keep the momentum going!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500">{userStats.streak}</div>
                  <p className="text-sm text-muted-foreground">days active</p>
                  <div className="flex justify-center space-x-1 mt-4">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < Math.min(userStats.streak, 7) 
                            ? "bg-orange-500" 
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Recent Achievements</span>
                </CardTitle>
                <CardDescription>
                  Your latest accomplishments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userStats.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{achievement.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Badges Collection</h2>
              <p className="text-muted-foreground">
                Earn badges by completing various activities and achievements
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {unlockedBadges.length}/{badges.length} Unlocked
              </Badge>
            </div>
          </div>

          {/* Badge Categories */}
          <div className="flex items-center space-x-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            <Button
              variant={selectedCategory === "achievement" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("achievement")}
            >
              Achievements
            </Button>
            <Button
              variant={selectedCategory === "engagement" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("engagement")}
            >
              Engagement
            </Button>
            <Button
              variant={selectedCategory === "participation" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("participation")}
            >
              Participation
            </Button>
          </div>

          {/* Badges Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBadges.map((badge) => (
              <Card key={badge.id} className={`relative ${!badge.unlocked ? 'opacity-60' : ''}`}>
                <CardHeader className="text-center pb-4">
                  <div className="relative mx-auto w-16 h-16 mb-4">
                    <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl">
                      {badge.icon}
                    </div>
                    {badge.unlocked && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg">{badge.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {badge.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <Badge className={getRarityColor(badge.rarity)}>
                      {getRarityIcon(badge.rarity)} {badge.rarity}
                    </Badge>
                    <Badge variant="outline">
                      +{badge.points} pts
                    </Badge>
                  </div>
                  {badge.unlocked ? (
                    <div className="text-xs text-muted-foreground">
                      Unlocked {new Date(badge.unlockedDate).toLocaleDateString()}
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">
                      Locked - Keep participating to unlock!
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Leaderboard</h2>
              <p className="text-muted-foreground">
                Compete with other users and climb the rankings
              </p>
            </div>
            <Badge variant="outline">
              Updated every hour
            </Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>
                Users ranked by total points earned
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboardData.map((user, index) => (
                  <div key={user.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getRankIcon(user.rank)}
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{user.name}</h3>
                        <Badge variant="outline">{user.role}</Badge>
                        <Badge variant="secondary">{user.department}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>Level {user.level}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Award className="w-3 h-3" />
                          <span>{user.badges} badges</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{user.sessions} sessions</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{user.points.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">points</div>
                      <Badge 
                        variant={user.change.startsWith('+') ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {user.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Active Challenges</h2>
              <p className="text-muted-foreground">
                Complete challenges to earn bonus points and rewards
              </p>
            </div>
            <Badge variant="outline">
              {challenges.filter(c => c.status === "completed").length}/{challenges.length} Completed
            </Badge>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <Badge 
                      variant={challenge.status === "completed" ? "default" : "secondary"}
                    >
                      {challenge.status === "completed" ? "Completed" : "Active"}
                    </Badge>
                  </div>
                  <CardDescription>
                    {challenge.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {challenge.progress}/{challenge.target}
                    </span>
                  </div>
                  <Progress 
                    value={(challenge.progress / challenge.target) * 100} 
                    className="h-2"
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">+{challenge.points} points</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>
                        {new Date(challenge.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {challenge.status === "completed" ? (
                    <Button 
                      className="w-full" 
                      onClick={() => handleClaimReward(challenge.id)}
                    >
                      <Gift className="w-4 h-4 mr-2" />
                      Claim Reward
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      disabled
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      In Progress
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Weekly Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Performance</CardTitle>
              <CardDescription>
                Your activity and progress this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{userStats.sessions}</div>
                  <div className="text-sm text-muted-foreground">Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{userStats.badges}</div>
                  <div className="text-sm text-muted-foreground">Badges</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{userStats.streak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{userStats.currentPoints}</div>
                  <div className="text-sm text-muted-foreground">Points Earned</div>
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
