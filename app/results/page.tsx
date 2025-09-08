"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Download, ArrowLeft, Share2, BookOpen, TrendingUp, Award, Target, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data for analytics
const strengthsData = [
  { name: "Logical Thinking", value: 92, color: "#8B5CF6" },
  { name: "Problem Solving", value: 88, color: "#06B6D4" },
  { name: "Creativity", value: 75, color: "#F59E0B" },
  { name: "Communication", value: 82, color: "#EF4444" },
  { name: "Leadership", value: 70, color: "#10B981" },
]

const interestAlignmentData = [
  { name: "Science", value: 85, color: "#8B5CF6" },
  { name: "Technology", value: 92, color: "#06B6D4" },
  { name: "Mathematics", value: 88, color: "#F59E0B" },
  { name: "Research", value: 78, color: "#EF4444" },
]

const careerPathsData = [
  { name: "Engineering", compatibility: 94, salary: "8-15 LPA", growth: "+18%" },
  { name: "Data Science", compatibility: 89, salary: "10-20 LPA", growth: "+25%" },
  { name: "Research", compatibility: 82, salary: "6-12 LPA", growth: "+12%" },
  { name: "Teaching", compatibility: 75, salary: "4-8 LPA", growth: "+8%" },
]

const collegeRecommendations = [
  { name: "NIT Srinagar", course: "Computer Science", cutoff: "95%", fees: "₹1.5L/year" },
  { name: "University of Kashmir", course: "Mathematics", cutoff: "85%", fees: "₹50K/year" },
  { name: "IIIT Jammu", course: "Information Technology", cutoff: "92%", fees: "₹2L/year" },
]

const monthlyProgressData = [
  { month: "Jan", interest: 65, skills: 60, alignment: 55 },
  { month: "Feb", interest: 70, skills: 65, alignment: 62 },
  { month: "Mar", interest: 75, skills: 72, alignment: 68 },
  { month: "Apr", interest: 82, skills: 78, alignment: 75 },
  { month: "May", interest: 88, skills: 85, alignment: 82 },
  { month: "Jun", interest: 92, skills: 90, alignment: 88 },
]

export default function ResultsPage() {
  const [quizResults, setQuizResults] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const resultsData = localStorage.getItem("quizResults")

    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      const demoUser = {
        id: "demo-user",
        name: "Demo Student",
        email: "demo@example.com",
        grade: "10",
        language: "English",
      }
      setUser(demoUser)
      localStorage.setItem("user", JSON.stringify(demoUser))
    }

    if (resultsData) {
      setQuizResults(JSON.parse(resultsData))
    } else {
      const demoResults = {
        type: "stream",
        topChoice: {
          stream: "Science Stream",
          field: "Perfect for analytical minds",
          score: 9.2,
        },
        completedAt: new Date().toISOString(),
      }
      setQuizResults(demoResults)
      localStorage.setItem("quizResults", JSON.stringify(demoResults))
    }
  }, [router])

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert("PDF download functionality would be implemented here")
  }

  if (!user || !quizResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
        <div className="text-white">Loading results...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>

        {/* Decorative leaves */}
        <div className="absolute top-20 left-32 w-16 h-16 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-full blur-xl transform rotate-45"></div>
        <div className="absolute bottom-32 right-40 w-12 h-12 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full blur-lg transform -rotate-12"></div>
        <div className="absolute top-1/3 right-16 w-20 h-20 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-full blur-xl transform rotate-12"></div>
        <div className="absolute bottom-1/4 left-20 w-14 h-14 bg-gradient-to-br from-green-500/30 to-teal-500/30 rounded-full blur-lg transform rotate-45"></div>

        {/* Stars */}
        <div className="absolute top-20 left-20 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Career Analysis Results</h1>
              <p className="text-blue-200">
                Personalized recommendations for {user.name} - Class {user.grade}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleDownloadPDF}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF for Parents
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Share Results
            </Button>
          </div>
        </div>

        {/* Top Recommendation Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    Recommended {quizResults.type === "stream" ? "Stream" : "Degree"}
                  </h2>
                  <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {quizResults.topChoice?.stream || quizResults.topChoice?.degree}
                  </p>
                  <p className="text-blue-200 mt-1">
                    {quizResults.topChoice?.field || "Perfect match for your interests and abilities"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-green-400 mb-1">
                  {Math.round((quizResults.topChoice?.score || 8) * 10)}%
                </div>
                <p className="text-blue-200">Compatibility Match</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Strengths Analysis */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5" />
                Strengths Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={strengthsData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" stroke="rgba(255,255,255,0.7)" />
                  <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.7)" width={80} />
                  <Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Interest Alignment */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Interest Alignment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={interestAlignmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {interestAlignmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {interestAlignmentData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-blue-200 text-sm">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress Tracking */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Progress Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monthlyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                  <YAxis stroke="rgba(255,255,255,0.7)" />
                  <Line type="monotone" dataKey="interest" stroke="#8B5CF6" strokeWidth={3} />
                  <Line type="monotone" dataKey="skills" stroke="#06B6D4" strokeWidth={3} />
                  <Line type="monotone" dataKey="alignment" stroke="#F59E0B" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Recommendations */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Career Paths */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Top Career Paths
                <Badge className="bg-purple-500/20 text-purple-200">Recommended</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {careerPathsData.map((career, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold">{career.name}</h4>
                    <Badge className="bg-green-500/20 text-green-200">{career.compatibility}% match</Badge>
                  </div>
                  <Progress value={career.compatibility} className="mb-3 h-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Salary: {career.salary}</span>
                    <span className="text-green-400">Growth: {career.growth}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* College Recommendations */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                College Recommendations
                <Badge className="bg-cyan-500/20 text-cyan-200">J&K Colleges</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {collegeRecommendations.map((college, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-white font-semibold">{college.name}</h4>
                      <p className="text-blue-200 text-sm">{college.course}</p>
                    </div>
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex justify-between text-sm mt-3">
                    <span className="text-blue-200">Cutoff: {college.cutoff}</span>
                    <span className="text-green-400">Fees: {college.fees}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-3 border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    View Details
                  </Button>
                </div>
              ))}
              <Link href="/colleges">
                <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                  Explore All Colleges
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/quiz">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              Retake Quiz
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
