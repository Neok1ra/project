import { type NextRequest, NextResponse } from "next/server"
import { createToken } from "@/lib/auth"

// Mock user database - in production, use a real database
const users = [
  {
    id: 1,
    name: "Test Student",
    email: "student@test.com",
    password: "password", // Simplified password for demo
    grade: "12",
    school: "Government Higher Secondary School",
    district: "srinagar",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, grade, school, district } = await request.json()

    if (!name || !email || !password || !grade || !school || !district) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ message: "User already exists with this email" }, { status: 409 })
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password, // Store plain password for demo (not recommended for production)
      grade,
      school,
      district,
    }

    users.push(newUser)

    const token = createToken(newUser.id, newUser.email)

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      message: "Registration successful",
      token,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
