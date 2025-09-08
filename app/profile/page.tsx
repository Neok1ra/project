"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  User,
  Mail,
  MapPin,
  School,
  Calendar,
  Settings,
  ArrowLeft,
  Save,
  Edit3,
  LogOut,
  Globe,
  Bell,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [language, setLanguage] = useState("english")
  const [notifications, setNotifications] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    district: "",
    grade: "",
    interests: "",
    careerGoals: "",
  })
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
        school: parsedUser.school || "",
        district: parsedUser.district || "",
        grade: parsedUser.grade || "",
        interests: parsedUser.interests || "",
        careerGoals: parsedUser.careerGoals || "",
      })
    } else {
      router.push("/auth/login")
    }
  }, [router])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Update user data in localStorage
    const updatedUser = { ...user, ...formData }
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setUser(updatedUser)
    setIsEditing(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("quizResults")
    router.push("/")
  }

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
              <h1 className="text-4xl font-bold text-white mb-2">Profile Settings</h1>
              <p className="text-blue-200">Manage your account information and preferences</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-400/20 text-red-300 hover:bg-red-500/20 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="/jk-govt-logo.jpg" />
                <AvatarFallback className="bg-purple-600 text-white text-2xl">
                  {user.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-white text-xl">{user.name}</CardTitle>
              <p className="text-blue-200">Class {user.grade} Student</p>
              <div className="flex justify-center gap-2 mt-3">
                <Badge className="bg-purple-500/20 text-purple-200">{user.district}</Badge>
                <Badge className="bg-blue-500/20 text-blue-200">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-blue-200">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-blue-200">
                <School className="w-4 h-4" />
                <span className="text-sm">{user.school}</span>
              </div>
              <div className="flex items-center gap-3 text-blue-200">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{user.district}, J&K</span>
              </div>
              <div className="flex items-center gap-3 text-blue-200">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Joined December 2024</span>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!isEditing}
                  className="bg-white/10 border-white/20 text-white disabled:opacity-70"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  className="bg-white/10 border-white/20 text-white disabled:opacity-70"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter phone number"
                  className="bg-white/10 border-white/20 text-white disabled:opacity-70 placeholder:text-blue-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade" className="text-white">
                    Grade
                  </Label>
                  <Select
                    value={formData.grade}
                    onValueChange={(value) => handleInputChange("grade", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white disabled:opacity-70">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">Class 10</SelectItem>
                      <SelectItem value="12">Class 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district" className="text-white">
                    District
                  </Label>
                  <Select
                    value={formData.district}
                    onValueChange={(value) => handleInputChange("district", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white disabled:opacity-70">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="srinagar">Srinagar</SelectItem>
                      <SelectItem value="jammu">Jammu</SelectItem>
                      <SelectItem value="anantnag">Anantnag</SelectItem>
                      <SelectItem value="baramulla">Baramulla</SelectItem>
                      <SelectItem value="kupwara">Kupwara</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="school" className="text-white">
                  School Name
                </Label>
                <Input
                  id="school"
                  value={formData.school}
                  onChange={(e) => handleInputChange("school", e.target.value)}
                  disabled={!isEditing}
                  className="bg-white/10 border-white/20 text-white disabled:opacity-70"
                />
              </div>

              {isEditing && (
                <Button
                  onClick={handleSave}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Preferences & Settings */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Preferences & Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Language Settings */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Language Preference
                </h4>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                    <SelectItem value="urdu">اردو (Urdu)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notification Settings */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notifications
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200 text-sm">Email Notifications</span>
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200 text-sm">Career Updates</span>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200 text-sm">College Alerts</span>
                    <Switch checked={true} />
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200 text-sm">Profile Visibility</span>
                    <Switch checked={false} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200 text-sm">Share Progress</span>
                    <Switch checked={true} />
                  </div>
                </div>
              </div>

              {/* Career Interests */}
              <div className="space-y-2">
                <Label htmlFor="interests" className="text-white">
                  Career Interests
                </Label>
                <Input
                  id="interests"
                  value={formData.interests}
                  onChange={(e) => handleInputChange("interests", e.target.value)}
                  disabled={!isEditing}
                  placeholder="e.g., Technology, Medicine, Arts"
                  className="bg-white/10 border-white/20 text-white disabled:opacity-70 placeholder:text-blue-300"
                />
              </div>

              {/* Career Goals */}
              <div className="space-y-2">
                <Label htmlFor="careerGoals" className="text-white">
                  Career Goals
                </Label>
                <Input
                  id="careerGoals"
                  value={formData.careerGoals}
                  onChange={(e) => handleInputChange("careerGoals", e.target.value)}
                  disabled={!isEditing}
                  placeholder="e.g., Software Engineer, Doctor"
                  className="bg-white/10 border-white/20 text-white disabled:opacity-70 placeholder:text-blue-300"
                />
              </div>

              {/* Quick Actions */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <Link href="/flow-journey">
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    View Career Journey
                  </Button>
                </Link>
                <Link href="/results">
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    View Quiz Results
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
