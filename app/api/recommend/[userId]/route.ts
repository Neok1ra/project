import { type NextRequest, NextResponse } from "next/server"
import { getTokenFromRequest, verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    // In a real app, fetch user's quiz results and generate recommendations
    const userId = params.userId

    // Mock recommendation data
    const recommendations = {
      streams: [
        {
          name: "Science Stream",
          compatibility: 92,
          subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
          careers: ["Engineering", "Medical", "Research"],
        },
        {
          name: "Commerce Stream",
          compatibility: 78,
          subjects: ["Accountancy", "Business Studies", "Economics"],
          careers: ["Business", "Finance", "Management"],
        },
        {
          name: "Arts Stream",
          compatibility: 65,
          subjects: ["History", "Political Science", "Psychology"],
          careers: ["Teaching", "Civil Services", "Journalism"],
        },
      ],
      colleges: [
        {
          name: "NIT Srinagar",
          location: "Srinagar, J&K",
          courses: ["Computer Science", "Electrical Engineering", "Mechanical Engineering"],
          cutoff: "95%",
          fees: "₹1.5L/year",
        },
        {
          name: "University of Kashmir",
          location: "Srinagar, J&K",
          courses: ["Mathematics", "Physics", "Chemistry", "Biology"],
          cutoff: "85%",
          fees: "₹50K/year",
        },
      ],
    }

    return NextResponse.json({
      message: "Recommendations generated successfully",
      userId: Number.parseInt(userId),
      recommendations,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Recommendation generation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
