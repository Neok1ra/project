import { type NextRequest, NextResponse } from "next/server"
import { createToken } from "@/lib/auth"

// Mock user database - in production, use a real database
const users = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@demo.com",
    password: "demo123",
    grade: "10",
    school: "Government High School Srinagar",
    district: "srinagar",
    interests: ["Science", "Technology", "Mathematics"],
    quizCompleted: true,
    recommendedStream: "Science",
    strengths: ["Analytical Thinking", "Problem Solving", "Mathematics"],
  },
  {
    id: 2,
    name: "Priya Kumari",
    email: "priya@demo.com",
    password: "demo123",
    grade: "12",
    school: "Government Girls Higher Secondary School",
    district: "jammu",
    interests: ["Business", "Economics", "Communication"],
    quizCompleted: true,
    recommendedStream: "Commerce",
    strengths: ["Leadership", "Communication", "Business Acumen"],
  },
  {
    id: 3,
    name: "Rohit Singh",
    email: "rohit@demo.com",
    password: "demo123",
    grade: "12",
    school: "Government Higher Secondary School Baramulla",
    district: "baramulla",
    interests: ["Literature", "History", "Social Work"],
    quizCompleted: true,
    recommendedStream: "Arts",
    strengths: ["Creative Writing", "Critical Thinking", "Social Awareness"],
  },
  {
    id: 4,
    name: "Fatima Khan",
    email: "fatima@demo.com",
    password: "demo123",
    grade: "10",
    school: "Government High School Anantnag",
    district: "anantnag",
    interests: ["Medicine", "Biology", "Helping Others"],
    quizCompleted: false,
    recommendedStream: null,
    strengths: [],
  },
  {
    id: 5,
    name: "Arjun Gupta",
    email: "arjun@demo.com",
    password: "demo123",
    grade: "12",
    school: "Government Higher Secondary School Udhampur",
    district: "udhampur",
    interests: ["Engineering", "Physics", "Innovation"],
    quizCompleted: true,
    recommendedStream: "Science",
    strengths: ["Technical Skills", "Innovation", "Physics"],
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = users.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    if (password !== user.password) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    const token = createToken(user.id, user.email)

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user

    const response = NextResponse.json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    })

    // Set the token as a secure cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
