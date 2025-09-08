import { type NextRequest, NextResponse } from "next/server"
import { getTokenFromRequest, verifyToken } from "@/lib/auth"

// Quiz scoring logic
function calculateRecommendations(answers: Record<number, string>, grade: string) {
  const scores = {
    science: 0,
    commerce: 0,
    arts: 0,
    engineering: 0,
    medical: 0,
  }

  // Score based on answers
  Object.values(answers).forEach((answer) => {
    switch (answer) {
      case "science":
      case "experiments":
      case "engineering":
      case "logical":
      case "innovation":
      case "technical":
      case "programming":
      case "technology":
      case "jee":
        scores.science += 2
        scores.engineering += 2
        break
      case "math":
      case "calculations":
      case "systematic":
        scores.science += 1
        scores.engineering += 1
        scores.commerce += 1
        break
      case "medical":
      case "helping":
      case "clinical":
      case "research":
      case "healthcare":
      case "neet":
        scores.science += 1
        scores.medical += 2
        break
      case "business":
      case "commerce":
      case "success":
      case "corporate":
      case "management":
      case "economy":
      case "cat":
        scores.commerce += 2
        break
      case "creative":
      case "arts":
      case "languages":
      case "expression":
      case "academic":
      case "communication":
      case "society":
      case "other":
        scores.arts += 2
        break
      case "social":
      case "collaborative":
        scores.arts += 1
        scores.commerce += 1
        break
    }
  })

  if (grade === "10") {
    // Recommend streams for Class 10
    const streamRecommendations = [
      { stream: "Science", score: scores.science, subjects: ["Physics", "Chemistry", "Mathematics", "Biology"] },
      {
        stream: "Commerce",
        score: scores.commerce,
        subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
      },
      { stream: "Arts", score: scores.arts, subjects: ["History", "Political Science", "Psychology", "English"] },
    ].sort((a, b) => b.score - a.score)

    return {
      type: "stream",
      recommendations: streamRecommendations,
      topChoice: streamRecommendations[0],
    }
  } else {
    // Recommend degrees for Class 12
    const degreeRecommendations = [
      { degree: "B.Tech/B.E. (Engineering)", score: scores.engineering, field: "Engineering & Technology" },
      { degree: "MBBS/BDS (Medical)", score: scores.medical, field: "Medical Sciences" },
      { degree: "B.Com/BBA (Commerce)", score: scores.commerce, field: "Business & Finance" },
      { degree: "BA/B.Sc (Arts & Sciences)", score: scores.arts, field: "Arts & Humanities" },
    ].sort((a, b) => b.score - a.score)

    return {
      type: "degree",
      recommendations: degreeRecommendations,
      topChoice: degreeRecommendations[0],
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    const { answers, grade } = await request.json()

    if (!answers || !grade) {
      return NextResponse.json({ message: "Answers and grade are required" }, { status: 400 })
    }

    try {
      const aiAnalysisResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/ai/analyze-responses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: decoded.userId,
            responses: answers,
            userProfile: {
              class: grade,
              language: "English",
              location: "Jammu & Kashmir",
            },
          }),
        },
      )

      const aiData = await aiAnalysisResponse.json()

      if (aiData.success) {
        return NextResponse.json({
          message: "Quiz completed successfully",
          results: {
            type: "ai_analysis",
            analysis: aiData.analysis,
            completedAt: new Date().toISOString(),
            userId: decoded.userId,
            generatedBy: aiData.generatedBy,
          },
        })
      }
    } catch (aiError) {
      console.log("[v0] AI analysis failed, using fallback scoring:", aiError)
    }

    const results = calculateRecommendations(answers, grade)

    console.log(`Quiz completed by user ${decoded.userId}:`, results)

    return NextResponse.json({
      message: "Quiz completed successfully",
      results: {
        ...results,
        completedAt: new Date().toISOString(),
        userId: decoded.userId,
      },
    })
  } catch (error) {
    console.error("Quiz processing error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
