"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  User,
  FileText,
  Brain,
  GraduationCap,
  Briefcase,
  CheckCircle,
  Clock,
  ArrowRight,
  Target,
  BookOpen,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const journeySteps = [
  {
    id: 1,
    title: "Student Registration",
    description: "Create your profile with basic information, academic details, and personal preferences",
    icon: User,
    status: "completed",
    details: ["Personal information setup", "Academic background entry", "Interest preferences", "Goal setting"],
  },
  {
    id: 2,
    title: "Career Assessment Quiz",
    description: "Take our comprehensive quiz to identify your strengths, interests, and career aptitude",
    icon: FileText,
    status: "completed",
    details: ["Aptitude assessment", "Interest evaluation", "Personality analysis", "Skill identification"],
  },
  {
    id: 3,
    title: "AI Analysis & Processing",
    description: "Our AI analyzes your responses and generates personalized career recommendations",
    icon: Brain,
    status: "completed",
    details: ["Data processing", "Pattern recognition", "Compatibility matching", "Recommendation generation"],
  },
  {
    id: 4,
    title: "College Exploration",
    description: "Discover colleges and universities that match your career goals and academic profile",
    icon: GraduationCap,
    status: "in-progress",
    details: ["College database search", "Admission requirements", "Course compatibility", "Application guidance"],
  },
  {
    id: 5,
    title: "Career Path Planning",
    description: "Develop a comprehensive roadmap for your future career with milestone tracking",
    icon: Briefcase,
    status: "pending",
    details: ["Career roadmap creation", "Skill development plan", "Timeline establishment", "Progress monitoring"],
  },
]

const additionalFeatures = [
  {
    title: "Personalized Roadmap",
    description: "Get a customized career journey tailored to your unique profile and goals",
    icon: Target,
  },
  {
    title: "Continuous Learning",
    description: "Access resources and recommendations for skill development and growth",
    icon: BookOpen,
  },
  {
    title: "Progress Tracking",
    description: "Monitor your advancement through various career milestones and achievements",
    icon: TrendingUp,
  },
]

export default function FlowJourneyPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/auth/login")
    }
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
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

        {/* Connecting lines background */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
              <stop offset="50%" stopColor="rgba(6, 182, 212, 0.3)" />
              <stop offset="100%" stopColor="rgba(245, 158, 11, 0.3)" />
            </linearGradient>
          </defs>
          <path
            d="M 200 200 Q 400 150 600 200 T 1000 200 Q 1200 250 1400 200"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
          />
          <path
            d="M 300 400 Q 500 350 700 400 T 1100 400 Q 1300 450 1500 400"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
          />
        </svg>

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
              <h1 className="text-4xl font-bold text-white mb-2">Career Journey Flow</h1>
              <p className="text-blue-200">Your personalized roadmap to career success</p>
            </div>
          </div>
          <Badge className="bg-green-500/20 text-green-200 px-4 py-2">Journey in Progress</Badge>
        </div>

        {/* Journey Overview */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to Your Career Journey, {user.name}!</h2>
              <p className="text-blue-200 text-lg">
                Follow this step-by-step process to discover and plan your ideal career path
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {additionalFeatures.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                  <p className="text-blue-200 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Journey Steps */}
        <div className="space-y-6">
          {journeySteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connecting Line */}
              {index < journeySteps.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-purple-500 to-blue-500 opacity-50"></div>
              )}

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Step Icon */}
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.status === "completed"
                          ? "bg-green-500/20 border-2 border-green-400"
                          : step.status === "in-progress"
                            ? "bg-blue-500/20 border-2 border-blue-400"
                            : "bg-gray-500/20 border-2 border-gray-400"
                      }`}
                    >
                      {step.status === "completed" ? (
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      ) : step.status === "in-progress" ? (
                        <Clock className="w-8 h-8 text-blue-400" />
                      ) : (
                        <step.icon className="w-8 h-8 text-gray-400" />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                          <p className="text-blue-200">{step.description}</p>
                        </div>
                        <Badge
                          className={
                            step.status === "completed"
                              ? "bg-green-500/20 text-green-200"
                              : step.status === "in-progress"
                                ? "bg-blue-500/20 text-blue-200"
                                : "bg-gray-500/20 text-gray-200"
                          }
                        >
                          {step.status === "completed"
                            ? "Completed"
                            : step.status === "in-progress"
                              ? "In Progress"
                              : "Pending"}
                        </Badge>
                      </div>

                      {/* Step Details */}
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <span className="text-blue-200 text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {step.status === "completed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-400/20 text-green-200 hover:bg-green-500/20 bg-transparent"
                          >
                            View Results
                          </Button>
                        )}
                        {step.status === "in-progress" && (
                          <Link href={step.id === 4 ? "/colleges" : "/dashboard"}>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                              Continue
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        )}
                        {step.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled
                            className="border-gray-400/20 text-gray-300 bg-transparent opacity-50"
                          >
                            Coming Soon
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Next Steps */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready for the Next Step?</h3>
            <p className="text-blue-200 mb-6">
              Continue your career journey by exploring colleges that match your profile and interests.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/colleges">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Explore Colleges
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/results">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Review Results
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
