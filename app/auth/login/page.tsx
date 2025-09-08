"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const demoUsers = [
    { name: "Aarav Sharma", email: "aarav@demo.com", grade: "10th", stream: "Science Interest" },
    { name: "Priya Kumari", email: "priya@demo.com", grade: "12th", stream: "Commerce" },
    { name: "Rohit Singh", email: "rohit@demo.com", grade: "12th", stream: "Arts" },
    { name: "Fatima Khan", email: "fatima@demo.com", grade: "10th", stream: "New User" },
    { name: "Arjun Gupta", email: "arjun@demo.com", grade: "12th", stream: "Science" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        router.push("/dashboard")
      } else {
        setError(data.message || "Login failed")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithDemoUser = (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword("demo123")
    // Auto-submit after setting credentials
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 relative overflow-hidden flex items-center justify-center p-4">
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

      {/* Header */}
      <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center p-1">
            <img
              src="/jk-govt-logo.jpg"
              alt="Government of Jammu & Kashmir Logo"
              className="w-full h-full object-contain rounded-md"
            />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Career Guidance Portal</h1>
            <p className="text-slate-300 text-xs">Government of J&K</p>
          </div>
        </Link>
      </div>

      <div className="flex gap-6 w-full max-w-6xl">
        <Card className="w-full max-w-sm bg-slate-900/90 backdrop-blur-sm border-slate-700/50 relative z-10">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-white">Demo Users</CardTitle>
            <CardDescription className="text-slate-300">Click to login instantly for presentation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoUsers.map((user, index) => (
              <Button
                key={index}
                onClick={() => loginWithDemoUser(user.email)}
                variant="outline"
                className="w-full bg-slate-800/80 border-slate-600/50 text-white hover:bg-slate-700/80 hover:border-slate-500/50 text-left justify-start p-4 h-auto"
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium text-white">{user.name}</span>
                  <span className="text-xs text-slate-300">
                    {user.grade} • {user.stream}
                  </span>
                </div>
              </Button>
            ))}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-300">Password: demo123</p>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full max-w-md bg-slate-900/90 backdrop-blur-sm border-slate-700/50 relative z-10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-slate-300">
              Sign in to access your career guidance dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-800/80 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-purple-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-slate-800/80 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-purple-400"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>

              <div className="text-center">
                <p className="text-slate-300 text-sm">
                  Don't have an account?{" "}
                  <Link href="/auth/register" className="text-cyan-400 hover:text-cyan-300 font-medium">
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
