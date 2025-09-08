import { type NextRequest, NextResponse } from "next/server"
import { getTokenFromRequest, verifyToken } from "@/lib/auth"

// Mock college data - in production, this would come from a database
const collegesData = [
  {
    id: 1,
    name: "National Institute of Technology Srinagar",
    location: "Srinagar, J&K",
    type: "Government",
    category: "Engineering",
    courses: ["Computer Science", "Electrical Engineering", "Mechanical Engineering"],
    fees: "₹1.5L - ₹2L per year",
    admissionDates: {
      application: "March 15 - April 30, 2024",
      exam: "JEE Main",
      counseling: "June - July 2024",
    },
    contact: {
      phone: "+91-194-2420475",
      email: "registrar@nitsri.net",
      website: "https://www.nitsri.net",
    },
    cutoff: "JEE Main Rank: 15,000 - 45,000",
    rating: 4.2,
  },
  {
    id: 2,
    name: "University of Kashmir",
    location: "Srinagar, J&K",
    type: "Government",
    category: "University",
    courses: ["B.Sc", "B.A", "B.Com", "M.Sc", "M.A"],
    fees: "₹25K - ₹75K per year",
    admissionDates: {
      application: "May 1 - June 15, 2024",
      exam: "University Entrance Test",
      counseling: "July - August 2024",
    },
    contact: {
      phone: "+91-194-2414049",
      email: "info@kashmiruniversity.net",
      website: "https://www.kashmiruniversity.net",
    },
    cutoff: "Merit based on 12th marks",
    rating: 4.0,
  },
  // Add more colleges as needed
]

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const location = searchParams.get("location")
    const type = searchParams.get("type")

    let filteredColleges = collegesData

    // Apply filters
    if (category && category !== "all") {
      filteredColleges = filteredColleges.filter((college) => college.category.toLowerCase() === category.toLowerCase())
    }

    if (location && location !== "all") {
      filteredColleges = filteredColleges.filter((college) =>
        college.location.toLowerCase().includes(location.toLowerCase()),
      )
    }

    if (type && type !== "all") {
      filteredColleges = filteredColleges.filter((college) => college.type.toLowerCase() === type.toLowerCase())
    }

    return NextResponse.json({
      message: "Colleges fetched successfully",
      colleges: filteredColleges,
      total: filteredColleges.length,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Colleges fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
