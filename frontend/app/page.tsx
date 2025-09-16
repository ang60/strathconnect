import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Users, 
  GraduationCap, 
  Target, 
  Award, 
  ArrowRight, 
  Star,
  CheckCircle,
  BookOpen,
  MessageSquare,
  Calendar,
  BarChart3,
  Shield,
  Heart,
  ChevronDown,
  Play,
  ExternalLink,
  Zap,
  Globe,
  Building2,
  UserCheck,
  TrendingUp,
  Lightbulb,
  Clock
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              StrathConnect
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Features
              </Link>
              <Link href="#programs" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Programs
              </Link>
              <Link href="#about" className="text-sm font-medium hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link href="#testimonials" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Success Stories
              </Link>
              <Link href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Start</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            <Star className="w-3 h-3 mr-1" />
            Strathmore Business School
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
            Coaching & Mentorship Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect with experienced coaches, mentors, and peers. Accelerate your growth and achieve your professional goals with personalized guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/register">
              <Button size="lg" className="text-lg px-8">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="lg" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Coaches</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2,000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Students Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose StrathConnect?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our comprehensive platform provides everything you need for successful coaching and mentorship relationships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Smart Matching</CardTitle>
                <CardDescription>
                  AI-powered algorithm matches you with the perfect coach based on your goals, skills, and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Personalized recommendations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Compatibility scoring
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Multiple coach options
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Flexible Scheduling</CardTitle>
                <CardDescription>
                  Easy session scheduling with calendar integration and automated reminders.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Google/Outlook integration
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Automated reminders
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Virtual & in-person options
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Goal Tracking</CardTitle>
                <CardDescription>
                  Set, track, and achieve your goals with progress visualization and milestone celebrations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Progress dashboards
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Milestone tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Achievement badges
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Communication Hub</CardTitle>
                <CardDescription>
                  Stay connected with in-app messaging, video calls, and shared resources.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Real-time messaging
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    File sharing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Video conferencing
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Analytics & Insights</CardTitle>
                <CardDescription>
                  Track your progress with detailed analytics and performance insights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Progress reports
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Performance metrics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Growth tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Gamification</CardTitle>
                <CardDescription>
                  Stay motivated with badges, leaderboards, and achievement rewards.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Achievement badges
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Leaderboards
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Reward system
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Programs</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose from our diverse range of coaching and mentorship programs designed for different career stages and goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">Popular</Badge>
                <CardTitle className="flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                  Leadership Development
                </CardTitle>
                <CardDescription>
                  Develop essential leadership skills through personalized coaching and mentorship.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span>6-12 months</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2 text-gray-500" />
                    <span>1:1 coaching</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Certification included</span>
                  </div>
                </div>
                <Link href="/auth/register" className="mt-4 inline-block">
                  <Button className="w-full">Learn More</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                  Career Transition
                </CardTitle>
                <CardDescription>
                  Navigate career changes with expert guidance and strategic planning.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span>3-6 months</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Group + 1:1</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Network access</span>
                  </div>
                </div>
                <Link href="/auth/register" className="mt-4 inline-block">
                  <Button className="w-full">Learn More</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-green-600" />
                  Entrepreneurship
                </CardTitle>
                <CardDescription>
                  Launch and scale your business with experienced entrepreneur coaches.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span>6-18 months</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2 text-gray-500" />
                    <span>1:1 + workshops</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Funding guidance</span>
                  </div>
                </div>
                <Link href="/auth/register" className="mt-4 inline-block">
                  <Button className="w-full">Learn More</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">About StrathConnect</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                StrathConnect is Strathmore Business School's premier coaching and mentorship platform, designed to bridge the gap between academic excellence and real-world success.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Innovation</h3>
                    <p className="text-gray-600 dark:text-gray-400">Cutting-edge technology meets proven coaching methodologies.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Excellence</h3>
                    <p className="text-gray-600 dark:text-gray-400">Curated network of industry leaders and successful professionals.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Global Reach</h3>
                    <p className="text-gray-600 dark:text-gray-400">Connect with coaches and coachees from around the world.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg mb-6">
                  To empower the next generation of business leaders through meaningful coaching relationships and innovative learning experiences.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">10+</div>
                    <div className="text-sm opacity-90">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">50+</div>
                    <div className="text-sm opacity-90">Industries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hear from our community members about their transformative experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-3">
                    <span className="font-semibold text-blue-600">SM</span>
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Muthoni</div>
                    <div className="text-sm text-gray-500">Software Engineer</div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  "StrathConnect helped me transition from academia to tech. My coach provided invaluable guidance on industry best practices and career development."
                </p>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mr-3">
                    <span className="font-semibold text-green-600">DK</span>
                  </div>
                  <div>
                    <div className="font-semibold">David Kimani</div>
                    <div className="text-sm text-gray-500">Startup Founder</div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  "The entrepreneurship program gave me the confidence and skills to launch my startup. The coach network is incredible!"
                </p>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-3">
                    <span className="font-semibold text-blue-600">GW</span>
                  </div>
                  <div>
                    <div className="font-semibold">Grace Wanjiku</div>
                    <div className="text-sm text-gray-500">Marketing Manager</div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  "The leadership development program transformed my approach to team management. I've been promoted twice since starting!"
                </p>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students and professionals who have transformed their careers through StrathConnect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">StrathConnect</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering the next generation of business leaders through meaningful coaching relationships.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Globe className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#programs" className="hover:text-white transition-colors">Programs</Link></li>
                <li><Link href="/auth/register" className="hover:text-white transition-colors">Get Started</Link></li>
                <li><Link href="/auth/login" className="hover:text-white transition-colors">Sign In</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Strathmore Business School</li>
                <li>Nairobi, Kenya</li>
                <li>info@strathconnect.edu</li>
                <li>+254 700 000 000</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StrathConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
