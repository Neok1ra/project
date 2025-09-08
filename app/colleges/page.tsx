"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Globe,
  GraduationCap,
  Users,
  Star,
  ArrowLeft,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock college data for J&K
const collegesData = [
  {
    id: 1,
    name: "National Institute of Technology Srinagar",
    shortName: "NIT Srinagar",
    location: "Srinagar, Jammu & Kashmir",
    type: "Government",
    category: "Engineering",
    established: 1960,
    rating: 4.2,
    courses: [
      "Computer Science & Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
      "Electronics & Communication",
    ],
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
    facilities: ["Hostel", "Library", "Labs", "Sports", "WiFi"],
  },
  {
    id: 2,
    name: "University of Kashmir",
    shortName: "KU",
    location: "Srinagar, Jammu & Kashmir",
    type: "Government",
    category: "University",
    established: 1948,
    rating: 4.0,
    courses: [
      "Bachelor of Science (B.Sc)",
      "Bachelor of Arts (B.A)",
      "Bachelor of Commerce (B.Com)",
      "Master of Science (M.Sc)",
      "Master of Arts (M.A)",
    ],
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
    facilities: ["Central Library", "Hostels", "Medical Center", "Sports Complex"],
  },
  {
    id: 3,
    name: "Indian Institute of Information Technology Jammu",
    shortName: "IIIT Jammu",
    location: "Jammu, Jammu & Kashmir",
    type: "Government",
    category: "Engineering",
    established: 2016,
    rating: 4.1,
    courses: ["Computer Science & Engineering", "Information Technology", "Electronics & Communication"],
    fees: "₹2L - ₹2.5L per year",
    admissionDates: {
      application: "March 1 - April 15, 2024",
      exam: "JEE Main",
      counseling: "June - July 2024",
    },
    contact: {
      phone: "+91-191-2570832",
      email: "office@iiitjammu.ac.in",
      website: "https://www.iiitjammu.ac.in",
    },
    cutoff: "JEE Main Rank: 8,000 - 25,000",
    facilities: ["Modern Labs", "Hostel", "Library", "Cafeteria", "WiFi"],
  },
  {
    id: 4,
    name: "Government Medical College Srinagar",
    shortName: "GMC Srinagar",
    location: "Srinagar, Jammu & Kashmir",
    type: "Government",
    category: "Medical",
    established: 1959,
    rating: 4.3,
    courses: ["MBBS", "MD", "MS", "Diploma Courses"],
    fees: "₹50K - ₹1L per year",
    admissionDates: {
      application: "May 1 - June 30, 2024",
      exam: "NEET",
      counseling: "August - September 2024",
    },
    contact: {
      phone: "+91-194-2503204",
      email: "principal@gmcsrinagar.edu.in",
      website: "https://www.gmcsrinagar.edu.in",
    },
    cutoff: "NEET Score: 550+ (General Category)",
    facilities: ["Hospital", "Library", "Hostels", "Research Labs", "Auditorium"],
  },
  {
    id: 5,
    name: "Jammu University",
    shortName: "JU",
    location: "Jammu, Jammu & Kashmir",
    type: "Government",
    category: "University",
    established: 1969,
    rating: 3.9,
    courses: ["Engineering", "Management", "Arts & Humanities", "Science", "Commerce", "Law", "Education"],
    fees: "₹30K - ₹1L per year",
    admissionDates: {
      application: "April 15 - June 1, 2024",
      exam: "JU Entrance Test",
      counseling: "July - August 2024",
    },
    contact: {
      phone: "+91-191-2435248",
      email: "registrar@jammuuniversity.ac.in",
      website: "https://www.jammuuniversity.ac.in",
    },
    cutoff: "Merit based on entrance test",
    facilities: ["Multiple Campuses", "Library", "Sports", "Hostels", "Cafeteria"],
  },
  {
    id: 6,
    name: "Shri Mata Vaishno Devi University",
    shortName: "SMVDU",
    location: "Katra, Jammu & Kashmir",
    type: "Government",
    category: "University",
    established: 1999,
    rating: 4.0,
    courses: [
      "Computer Science & Engineering",
      "Electronics & Communication",
      "Mechanical Engineering",
      "Management Studies",
      "Architecture",
    ],
    fees: "₹1L - ₹1.5L per year",
    admissionDates: {
      application: "March 20 - May 10, 2024",
      exam: "JEE Main / University Test",
      counseling: "June - July 2024",
    },
    contact: {
      phone: "+91-1991-285535",
      email: "info@smvdu.ac.in",
      website: "https://www.smvdu.ac.in",
    },
    cutoff: "JEE Main Rank: 20,000 - 60,000",
    facilities: ["Modern Campus", "Hostels", "Library", "Labs", "Sports Complex"],
  },
]

export default function CollegesPage() {
  const [user, setUser] = useState<any>(null)
  const [colleges, setColleges] = useState(collegesData)
  const [filteredColleges, setFilteredColleges] = useState(collegesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
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
  }, [router])

  useEffect(() => {
    let filtered = colleges

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (college) =>
          college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          college.courses.some((course) => course.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((college) => college.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    // Location filter
    if (selectedLocation !== "all") {
      filtered = filtered.filter((college) => college.location.toLowerCase().includes(selectedLocation.toLowerCase()))
    }

    // Type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((college) => college.type.toLowerCase() === selectedType.toLowerCase())
    }

    setFilteredColleges(filtered)
  }, [searchTerm, selectedCategory, selectedLocation, selectedType, colleges])

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
              <h1 className="text-4xl font-bold text-white mb-2">College Directory</h1>
              <p className="text-blue-200">Explore colleges and universities in Jammu & Kashmir</p>
            </div>
          </div>
          <Badge className="bg-green-500/20 text-green-200 px-4 py-2">{filteredColleges.length} Colleges Found</Badge>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4" />
                <Input
                  placeholder="Search colleges or courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="university">University</SelectItem>
                </SelectContent>
              </Select>

              {/* Location Filter */}
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="srinagar">Srinagar</SelectItem>
                  <SelectItem value="jammu">Jammu</SelectItem>
                  <SelectItem value="katra">Katra</SelectItem>
                </SelectContent>
              </Select>

              {/* Type Filter */}
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Colleges Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredColleges.map((college) => (
            <Card
              key={college.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-xl mb-2">{college.name}</CardTitle>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-blue-300" />
                        <span className="text-blue-200 text-sm">{college.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-white text-sm">{college.rating}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-purple-500/20 text-purple-200">{college.category}</Badge>
                      <Badge className="bg-blue-500/20 text-blue-200">{college.type}</Badge>
                      <Badge className="bg-green-500/20 text-green-200">Est. {college.established}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Courses */}
                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Courses Offered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {college.courses.slice(0, 3).map((course, index) => (
                      <Badge key={index} variant="outline" className="border-white/20 text-blue-200 text-xs">
                        {course}
                      </Badge>
                    ))}
                    {college.courses.length > 3 && (
                      <Badge variant="outline" className="border-white/20 text-blue-200 text-xs">
                        +{college.courses.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Fees and Cutoff */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-blue-200 text-sm font-medium">Annual Fees</h5>
                    <p className="text-white font-semibold">{college.fees}</p>
                  </div>
                  <div>
                    <h5 className="text-blue-200 text-sm font-medium">Cutoff</h5>
                    <p className="text-white font-semibold text-sm">{college.cutoff}</p>
                  </div>
                </div>

                {/* Admission Dates */}
                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Admission Timeline
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-200">Application:</span>
                      <span className="text-white">{college.admissionDates.application}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Entrance:</span>
                      <span className="text-white">{college.admissionDates.exam}</span>
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <h4 className="text-white font-semibold mb-2">Facilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {college.facilities.map((facility, index) => (
                      <Badge key={index} variant="outline" className="border-white/20 text-blue-200 text-xs">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contact and Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent p-2"
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent p-2"
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent p-2"
                    >
                      <Globe className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      Apply Now
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredColleges.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center py-12">
            <CardContent>
              <Users className="w-16 h-16 text-blue-300 mx-auto mb-4" />
              <h3 className="text-white text-xl font-semibold mb-2">No Colleges Found</h3>
              <p className="text-blue-200 mb-4">Try adjusting your search criteria or filters</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedLocation("all")
                  setSelectedType("all")
                }}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
