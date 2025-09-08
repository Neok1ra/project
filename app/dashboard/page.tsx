"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  User,
  BookOpen,
  TrendingUp,
  Target,
  Award,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Search,
  Bell,
  Star,
  Brain,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const interestData = [
  { name: "Science", value: 85, color: "#8B5CF6" },
  { name: "Math", value: 92, color: "#06B6D4" },
  { name: "Tech", value: 78, color: "#F59E0B" },
  { name: "Arts", value: 65, color: "#EF4444" },
  { name: "Commerce", value: 70, color: "#10B981" },
]

const careerAlignmentData = [
  { month: "Jan", engineering: 65, medical: 45, commerce: 30, arts: 25 },
  { month: "Feb", engineering: 70, medical: 50, commerce: 35, arts: 30 },
  { month: "Mar", engineering: 75, medical: 55, commerce: 40, arts: 35 },
  { month: "Apr", engineering: 80, medical: 60, commerce: 45, arts: 40 },
  { month: "May", engineering: 85, medical: 65, commerce: 50, arts: 45 },
  { month: "Jun", engineering: 90, medical: 70, commerce: 55, arts: 50 },
]

const skillDistribution = [
  { name: "Analytical", value: 35, color: "#8B5CF6" },
  { name: "Creative", value: 25, color: "#06B6D4" },
  { name: "Technical", value: 30, color: "#F59E0B" },
  { name: "Social", value: 10, color: "#EF4444" },
]

const suggestedStreams = [
  {
    title: "Science Stream",
    description: "Perfect match based on your math and science aptitude",
    match: 92,
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    icon: "🔬",
  },
  {
    title: "Engineering",
    description: "High compatibility with your technical interests",
    match: 88,
    subjects: ["JEE Preparation", "Advanced Math", "Physics"],
    icon: "⚙️",
  },
  {
    title: "Medical Sciences",
    description: "Good fit for your analytical thinking",
    match: 75,
    subjects: ["Biology", "Chemistry", "NEET Prep"],
    icon: "🏥",
  },
]

const careerPaths = [
  {
    title: "Software Engineer",
    company: "Tech Industry",
    salary: "₹8-15 LPA",
    growth: "+15%",
    match: 94,
    icon: "💻",
  },
  {
    title: "Data Scientist",
    company: "Analytics Firms",
    salary: "₹10-20 LPA",
    growth: "+22%",
    match: 89,
    icon: "📊",
  },
  {
    title: "Research Scientist",
    company: "R&D Organizations",
    salary: "₹6-12 LPA",
    growth: "+12%",
    match: 82,
    icon: "🔬",
  },
]

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      // Provide demo user data if no user is logged in for better UX
      setUser({
        name: "Arjun Sharma",
        grade: "12th",
        district: "Srinagar",
        email: "arjun.sharma@example.com",
      })
    }
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="text-center z-10">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl font-semibold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Loading Dashboard...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/30 to-pink-500/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-cyan-500/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-500/30 to-blue-500/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Enhanced decorative elements */}
        <div className="absolute top-20 left-10 w-16 h-16 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full text-purple-300 animate-float">
            <path d="M20,50 Q50,10 80,50 Q50,90 20,50" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-32 right-16 w-20 h-20 opacity-15">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-cyan-300 animate-float"
            style={{ animationDelay: "1.5s" }}
          >
            <path d="M30,20 Q70,30 80,70 Q40,80 30,20" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute top-1/3 right-8 w-12 h-12 opacity-25">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-pink-300 animate-float"
            style={{ animationDelay: "0.5s" }}
          >
            <path d="M50,10 Q80,30 70,60 Q50,90 30,60 Q20,30 50,10" fill="currentColor" />
          </svg>
        </div>

        {/* Enhanced star field with more stars */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white rounded-full animate-pulse`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          ></div>
        ))}
      </div>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <div className="w-80 bg-black/30 backdrop-blur-xl border-r border-white/20 min-h-screen p-6 shadow-2xl">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30 animate-pulse-glow p-1">
              <img
                src="/jk-govt-logo.jpg"
                alt="Government of Jammu & Kashmir Logo"
                className="w-full h-full object-contain rounded-md"
              />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Career Guidance
              </h1>
              <p className="text-blue-200 text-xs">Government of J&K</p>
            </div>
          </div>

          <Card className="bg-white/15 backdrop-blur-md border-white/30 mb-6 hover:bg-white/20 transition-all duration-300 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-12 h-12 ring-2 ring-purple-400/50">
                  <AvatarImage src="/jk-govt-logo.jpg" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                    {user.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-white font-semibold">{user.name}</h3>
                  <p className="text-blue-200 text-sm">Class {user.grade} Student</p>
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-purple-200 text-xs mt-1 border-purple-400/30"
                  >
                    {user.district}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-200">Profile Completion</span>
                  <span className="text-white font-semibold">85%</span>
                </div>
                <Progress value={85} className="h-2 bg-white/20" />
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <nav className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-white bg-gradient-to-r from-purple-600/30 to-blue-600/30 hover:from-purple-600/40 hover:to-blue-600/40 border border-purple-400/30"
            >
              <TrendingUp className="w-4 h-4 mr-3" />
              Dashboard
            </Button>
            <Link href="/quiz">
              <Button
                variant="ghost"
                className="w-full justify-start text-blue-200 hover:text-white hover:bg-white/15 transition-all duration-300"
              >
                <BookOpen className="w-4 h-4 mr-3" />
                Take Quiz
              </Button>
            </Link>
            <Link href="/colleges">
              <Button
                variant="ghost"
                className="w-full justify-start text-blue-200 hover:text-white hover:bg-white/15 transition-all duration-300"
              >
                <Users className="w-4 h-4 mr-3" />
                Colleges
              </Button>
            </Link>
            <Link href="/results">
              <Button
                variant="ghost"
                className="w-full justify-start text-blue-200 hover:text-white hover:bg-white/15 transition-all duration-300"
              >
                <Target className="w-4 h-4 mr-3" />
                Results
              </Button>
            </Link>
            <Link href="/profile">
              <Button
                variant="ghost"
                className="w-full justify-start text-blue-200 hover:text-white hover:bg-white/15 transition-all duration-300"
              >
                <User className="w-4 h-4 mr-3" />
                Profile
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start text-blue-200 hover:text-white hover:bg-white/15 transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4 mr-3" />
              Support
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-blue-200 hover:text-white hover:bg-white/15 transition-all duration-300"
            >
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Button>
          </nav>

          {/* Logout Button */}
          <div className="mt-auto pt-6">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-red-300 hover:text-red-200 hover:bg-red-500/20 transition-all duration-300"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                Welcome back, {user.name.split(" ")[0]}! ✨
              </h1>
              <p className="text-blue-200">Here's your personalized career guidance dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/15 bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/15 bg-white/10 backdrop-blur-sm p-2 transition-all duration-300"
              >
                <Bell className="w-4 h-4" />
              </Button>
              <Link href="/profile">
                <Button className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Award className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/15 backdrop-blur-xl border-white/30 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">Quiz Score</p>
                    <p className="text-2xl font-bold text-white">92%</p>
                  </div>
                  <Brain className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/15 backdrop-blur-xl border-white/30 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">Career Match</p>
                    <p className="text-2xl font-bold text-white">94%</p>
                  </div>
                  <Target className="w-8 h-8 text-cyan-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/15 backdrop-blur-xl border-white/30 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">Colleges</p>
                    <p className="text-2xl font-bold text-white">156</p>
                  </div>
                  <Users className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/15 backdrop-blur-xl border-white/30 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">Rank</p>
                    <p className="text-2xl font-bold text-white">#27</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Interest Alignment Chart */}
            <Card className="bg-white/15 backdrop-blur-xl border-white/30 hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                    Interest Alignment
                  </span>
                  <Badge className="bg-gradient-to-r from-cyan-500/40 to-blue-500/40 text-cyan-100 border-cyan-300/50 shadow-lg shadow-cyan-500/30 animate-pulse-glow">
                    Top 15% ⭐
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={interestData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.8)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.8)" fontSize={12} />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]} className="animate-pulse">
                      {interestData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {interestData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
                      <div className="w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: item.color }}></div>
                      <span className="text-blue-200 text-xs font-medium">{item.name}</span>
                      <span className="text-white text-xs font-bold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/15 backdrop-blur-xl border-white/30 hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    Skill Distribution
                  </span>
                  <Badge className="bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-purple-100 border-purple-300/50 shadow-lg shadow-purple-500/30 animate-pulse-glow">
                    Balanced ⚖️
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={skillDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={8}
                      dataKey="value"
                      className="drop-shadow-lg"
                    >
                      {skillDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(255,255,255,0.2)" strokeWidth={2} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {skillDistribution.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors"
                    >
                      <div
                        className="w-4 h-4 rounded-full shadow-lg animate-pulse"
                        style={{ backgroundColor: skill.color }}
                      ></div>
                      <div className="flex-1">
                        <span className="text-blue-200 text-sm font-medium block">{skill.name}</span>
                        <span className="text-white text-xs font-bold">{skill.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Career Alignment Chart */}
            <Card className="bg-white/15 backdrop-blur-xl border-white/30 hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span className="bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                    Career Growth
                  </span>
                  <Badge className="bg-gradient-to-r from-green-500/40 to-emerald-500/40 text-green-100 border-green-300/50 shadow-lg shadow-green-500/30 animate-pulse-glow">
                    +22% 📈
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={careerAlignmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.8)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.8)" fontSize={12} />
                    <Line
                      type="monotone"
                      dataKey="engineering"
                      stroke="#8B5CF6"
                      strokeWidth={4}
                      dot={{ fill: "#8B5CF6", strokeWidth: 3, r: 6, className: "animate-pulse" }}
                      activeDot={{ r: 8, stroke: "#8B5CF6", strokeWidth: 2, fill: "#fff" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="medical"
                      stroke="#06B6D4"
                      strokeWidth={4}
                      dot={{ fill: "#06B6D4", strokeWidth: 3, r: 6, className: "animate-pulse" }}
                      activeDot={{ r: 8, stroke: "#06B6D4", strokeWidth: 2, fill: "#fff" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="commerce"
                      stroke="#F59E0B"
                      strokeWidth={4}
                      dot={{ fill: "#F59E0B", strokeWidth: 3, r: 6, className: "animate-pulse" }}
                      activeDot={{ r: 8, stroke: "#F59E0B", strokeWidth: 2, fill: "#fff" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500 shadow-lg"></div>
                    <span className="text-blue-200 text-xs">Engineering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-lg"></div>
                    <span className="text-blue-200 text-xs">Medical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg"></div>
                    <span className="text-blue-200 text-xs">Commerce</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Suggested Streams */}
            <Card className="bg-white/15 backdrop-blur-xl border-white/30 hover:bg-white/20 transition-all duration-300 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Suggested Streams
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-200 hover:text-white hover:bg-white/15 transition-all duration-300"
                  >
                    View All
                  </Button>
                </CardTitle>
                <p className="text-blue-200 text-sm">Based on your interests and aptitude</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestedStreams.map((stream, index) => (
                  <div
                    key={index}
                    className="bg-white/10 rounded-lg p-4 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                          {stream.icon}
                        </span>
                        <div>
                          <h4 className="text-white font-semibold group-hover:text-blue-200 transition-colors">
                            {stream.title}
                          </h4>
                          <p className="text-blue-200 text-sm">{stream.description}</p>
                        </div>
                      </div>
                      <Badge className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-200 border-green-400/30">
                        {stream.match}% match
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {stream.subjects.map((subject, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="border-white/30 text-blue-200 text-xs hover:bg-white/10 transition-colors"
                        >
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Suggested Career Paths */}
            <Card className="bg-white/15 backdrop-blur-xl border-white/30 hover:bg-white/20 transition-all duration-300 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    Suggested Career Paths
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-200 hover:text-white hover:bg-white/15 transition-all duration-300"
                  >
                    Explore
                  </Button>
                </CardTitle>
                <p className="text-blue-200 text-sm">Top career recommendations for you</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {careerPaths.map((career, index) => (
                  <div
                    key={index}
                    className="bg-white/10 rounded-lg p-4 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                          {career.icon}
                        </span>
                        <div>
                          <h4 className="text-white font-semibold group-hover:text-purple-200 transition-colors">
                            {career.title}
                          </h4>
                          <p className="text-blue-200 text-sm">{career.company}</p>
                        </div>
                      </div>
                      <Badge className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 border-purple-400/30">
                        {career.match}% fit
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-4">
                        <span className="text-green-400 font-semibold">{career.salary}</span>
                        <span className="text-blue-200 text-sm">Growth: {career.growth}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/15 bg-white/10 backdrop-blur-sm transition-all duration-300"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
