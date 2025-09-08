"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/ui/page-header"
import { useRouter } from "next/navigation"
import { ArrowLeft, Sparkles, RotateCcw } from "lucide-react"

// Quiz questions for different grades
const class10Questions = [
  {
    id: 1,
    question: "Which subject do you find most interesting?",
    options: [
      { value: "science", label: "Science (Physics, Chemistry, Biology)" },
      { value: "math", label: "Mathematics" },
      { value: "social", label: "Social Studies" },
      { value: "languages", label: "Languages and Literature" },
    ],
  },
  {
    id: 2,
    question: "What type of activities do you enjoy most?",
    options: [
      { value: "experiments", label: "Conducting experiments and research" },
      { value: "calculations", label: "Solving mathematical problems" },
      { value: "creative", label: "Creative writing and arts" },
      { value: "business", label: "Business and entrepreneurship" },
    ],
  },
  {
    id: 3,
    question: "Which career field excites you the most?",
    options: [
      { value: "engineering", label: "Engineering and Technology" },
      { value: "medical", label: "Medical and Healthcare" },
      { value: "commerce", label: "Business and Finance" },
      { value: "arts", label: "Arts and Humanities" },
    ],
  },
  {
    id: 4,
    question: "How do you prefer to solve problems?",
    options: [
      { value: "logical", label: "Using logical reasoning and analysis" },
      { value: "creative", label: "Through creative and innovative thinking" },
      { value: "systematic", label: "Following systematic procedures" },
      { value: "collaborative", label: "Working with others and discussing" },
    ],
  },
  {
    id: 5,
    question: "What motivates you the most?",
    options: [
      { value: "innovation", label: "Creating new technologies and innovations" },
      { value: "helping", label: "Helping people and making a difference" },
      { value: "success", label: "Financial success and business growth" },
      { value: "expression", label: "Self-expression and creativity" },
    ],
  },
]

const class12Questions = [
  {
    id: 1,
    question: "Which field aligns best with your current stream?",
    options: [
      { value: "engineering", label: "Engineering (B.Tech/B.E.)" },
      { value: "medical", label: "Medical Sciences (MBBS/BDS)" },
      { value: "commerce", label: "Commerce (B.Com/BBA)" },
      { value: "arts", label: "Arts & Humanities (BA/B.Sc)" },
    ],
  },
  {
    id: 2,
    question: "What type of work environment do you prefer?",
    options: [
      { value: "technical", label: "Technical labs and research facilities" },
      { value: "clinical", label: "Hospitals and healthcare settings" },
      { value: "corporate", label: "Corporate offices and business centers" },
      { value: "academic", label: "Educational institutions and libraries" },
    ],
  },
  {
    id: 3,
    question: "Which skills do you want to develop further?",
    options: [
      { value: "programming", label: "Programming and software development" },
      { value: "research", label: "Research and analytical skills" },
      { value: "management", label: "Management and leadership" },
      { value: "communication", label: "Communication and presentation" },
    ],
  },
  {
    id: 4,
    question: "What type of impact do you want to make?",
    options: [
      { value: "technology", label: "Advance technology and innovation" },
      { value: "healthcare", label: "Improve healthcare and save lives" },
      { value: "economy", label: "Drive economic growth and business" },
      { value: "society", label: "Contribute to social and cultural development" },
    ],
  },
  {
    id: 5,
    question: "Which entrance exam are you most interested in?",
    options: [
      { value: "jee", label: "JEE (Joint Entrance Examination)" },
      { value: "neet", label: "NEET (National Eligibility Entrance Test)" },
      { value: "cat", label: "CAT (Common Admission Test)" },
      { value: "other", label: "Other university entrance exams" },
    ],
  },
]

export default function QuizPage() {
  const [user, setUser] = useState<any>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [aiQuestions, setAiQuestions] = useState<any[]>([])
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false)
  const [useAI, setUseAI] = useState(true)
  const router = useRouter()

  const questions = aiQuestions.length > 0 ? aiQuestions : user?.grade === "10" ? class10Questions : class12Questions
  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      if (useAI) {
        generateAIQuestions(parsedUser)
      }
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
  }, [router, useAI])

  const generateAIQuestions = async (userProfile: any) => {
    setIsGeneratingQuestions(true)
    try {
      const response = await fetch("/api/ai/generate-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: userProfile.id,
          userProfile: {
            class: userProfile.grade,
            language: userProfile.language || "English",
            location: "Jammu & Kashmir",
          },
          previousAnswers: answers,
        }),
      })

      const data = await response.json()

      if (data.success && data.questions) {
        const transformedQuestions = data.questions.map((q: any, index: number) => ({
          id: index + 1,
          question: q.question,
          options: q.options.map((opt: any) => ({
            value: opt.id.toLowerCase(),
            label: opt.text,
            weight: opt.weight,
          })),
        }))

        setAiQuestions(transformedQuestions)
        console.log("[v0] AI Questions generated:", transformedQuestions)
      } else {
        console.log("[v0] AI generation failed, using static questions")
        setUseAI(false)
      }
    } catch (error) {
      console.error("[v0] Error generating AI questions:", error)
      setUseAI(false)
    } finally {
      setIsGeneratingQuestions(false)
    }
  }

  const regenerateQuestions = async () => {
    if (!user) return

    setIsGeneratingQuestions(true)
    try {
      const response = await fetch("/api/ai/generate-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: user.id,
          userProfile: {
            class: user.grade,
            language: user.language || "English",
            location: "Jammu & Kashmir",
          },
          previousAnswers: answers,
        }),
      })

      const data = await response.json()

      if (data.success && data.questions) {
        const transformedQuestions = data.questions.map((q: any, index: number) => ({
          id: index + 1,
          question: q.question,
          options: q.options.map((opt: any) => ({
            value: opt.id.toLowerCase(),
            label: opt.text,
            weight: opt.weight,
          })),
        }))

        setAiQuestions(transformedQuestions)
        setCurrentQuestion(0)
        setAnswers({})
      }
    } catch (error) {
      console.error("[v0] Error regenerating questions:", error)
    } finally {
      setIsGeneratingQuestions(false)
    }
  }

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      handleSubmitQuiz()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmitQuiz = async () => {
    setIsLoading(true)

    try {
      const analysisResponse = await fetch("/api/ai/analyze-responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: user.id,
          responses: answers,
          userProfile: {
            class: user.grade,
            language: user.language || "English",
            location: "Jammu & Kashmir",
          },
        }),
      })

      const analysisData = await analysisResponse.json()

      if (analysisData.success) {
        localStorage.setItem(
          "quizResults",
          JSON.stringify({
            type: "ai_analysis",
            analysis: analysisData.analysis,
            completedAt: new Date().toISOString(),
            userId: user.id,
            generatedBy: analysisData.generatedBy,
          }),
        )
        router.push("/results")
      } else {
        const response = await fetch("/api/quiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            answers,
            grade: user.grade,
          }),
        })

        const data = await response.json()
        if (response.ok) {
          localStorage.setItem("quizResults", JSON.stringify(data.results))
          router.push("/results")
        }
      }
    } catch (error) {
      console.error("Quiz submission error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (isGeneratingQuestions && aiQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 relative overflow-hidden">
        <PageHeader
          title="AI Quiz Generation"
          subtitle="Creating personalized questions for your career assessment"
          showBackButton={false}
        />

        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl shadow-purple-500/20">
            <CardContent className="p-8 text-center">
              <div className="relative mb-6">
                <Sparkles className="w-16 h-16 text-purple-400 mx-auto animate-spin" />
                <div className="absolute inset-0 w-16 h-16 mx-auto bg-purple-400/20 rounded-full blur-xl animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                Generating Personalized Questions
              </h3>
              <p className="text-blue-200 text-lg leading-relaxed">
                AI is creating questions tailored specifically for your grade level and interests...
              </p>
              <div className="mt-6">
                <Progress value={75} className="h-2 bg-white/20" />
                <p className="text-blue-300 text-sm mt-2">Almost ready...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentQuestionData = questions[currentQuestion]
  const currentAnswer = answers[currentQuestionData?.id]
  const canProceed = currentAnswer !== undefined

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 relative overflow-hidden">
      {/* Enhanced main content area */}
      <div className="relative z-10 flex items-center justify-center min-h-[70vh] p-4">
        <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-md border-white/20 shadow-2xl shadow-purple-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-lg blur-sm"></div>

          <div className="relative z-10">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <CardTitle className="text-4xl font-bold text-white drop-shadow-lg">Quiz</CardTitle>
                {useAI && aiQuestions.length > 0 && (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/30 to-blue-500/30 px-3 py-2 rounded-full backdrop-blur-sm border border-purple-400/30">
                    <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />
                    <span className="text-purple-200 text-sm font-semibold">AI Powered</span>
                  </div>
                )}
              </div>

              <p className="text-blue-200 text-lg mb-6 leading-relaxed">
                {useAI && aiQuestions.length > 0
                  ? "Personalized questions created specifically for your profile"
                  : "Discover your ideal career path through our comprehensive assessment"}
              </p>

              {useAI && aiQuestions.length > 0 && currentQuestion === 0 && (
                <Button
                  onClick={regenerateQuestions}
                  disabled={isGeneratingQuestions}
                  variant="outline"
                  size="sm"
                  className="mt-2 border-purple-400/50 text-purple-300 hover:bg-purple-500/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {isGeneratingQuestions ? "Regenerating..." : "Get New Questions"}
                </Button>
              )}

              <div className="flex justify-center gap-3 mt-8">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-500 ${
                      index <= currentQuestion
                        ? "bg-gradient-to-r from-purple-400 to-blue-400 shadow-lg shadow-purple-400/50"
                        : "bg-white/20 hover:bg-white/30"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-6">
                <Progress value={progress} className="h-3 bg-white/20 rounded-full overflow-hidden" />
                <p className="text-blue-200 text-sm mt-3 font-medium">
                  Question {currentQuestion + 1} of {questions.length} • {Math.round(progress)}% Complete
                </p>
              </div>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <div className="mb-8">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-blue-500/30">
                    <span className="text-white font-bold text-sm">{currentQuestion + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white leading-relaxed text-balance">
                    {currentQuestionData.question}
                  </h3>
                </div>

                <RadioGroup value={currentAnswer} onValueChange={handleAnswerChange} className="space-y-5">
                  {currentQuestionData.options.map((option, index) => (
                    <div
                      key={option.value}
                      className="group flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/10"
                    >
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-blue-500/30 transition-colors">
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                          className="border-blue-400 text-blue-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                        />
                      </div>
                      <Label
                        htmlFor={option.value}
                        className="text-white text-lg leading-relaxed cursor-pointer flex-1 group-hover:text-blue-200 transition-colors font-medium"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex justify-between items-center">
                <Button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm disabled:opacity-50 transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!canProceed || isLoading}
                  className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : currentQuestion === questions.length - 1 ? (
                    "Complete Quiz"
                  ) : (
                    "Next Question"
                  )}
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  )
}
