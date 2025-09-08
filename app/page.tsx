import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 z-0"></div>

      <div className="absolute inset-0 overflow-hidden z-10">
        {/* Primary gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/30 to-pink-500/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-cyan-500/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-500/30 to-blue-500/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Additional floating geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-2xl animate-pulse"></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-br from-green-400/20 to-teal-500/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Enhanced star field */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse shadow-lg shadow-white/50"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-cyan-300 rounded-full animate-pulse delay-1000 shadow-sm shadow-cyan-300/50"></div>
        <div className="absolute top-60 left-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse delay-500 shadow-sm shadow-purple-300/50"></div>
        <div className="absolute bottom-40 right-20 w-1 h-1 bg-pink-300 rounded-full animate-pulse delay-700 shadow-sm shadow-pink-300/50"></div>
        <div className="absolute top-32 right-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-pulse delay-300 shadow-sm shadow-yellow-300/50"></div>
        <div className="absolute bottom-60 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-1200 shadow-lg shadow-blue-300/50"></div>

        {/* Animated connecting lines */}
        <div className="absolute top-1/3 left-1/2 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse"></div>
        <div className="absolute top-2/3 right-1/3 w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse delay-500"></div>
      </div>

      <header className="relative z-20 flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30 animate-pulse-glow p-1">
            <img
              src="/jk-govt-logo.jpg"
              alt="Government of Jammu & Kashmir Logo"
              className="w-full h-full object-contain rounded-md"
            />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl drop-shadow-lg">Government of Jammu & Kashmir</h1>
            <p className="text-blue-100 text-sm drop-shadow-md">Department of Education</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-white/50 text-white hover:bg-slate-700 bg-slate-800 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-white/20 drop-shadow-md"
          >
            हिंदी
          </Button>
          <Button
            variant="outline"
            className="border-white/50 text-white hover:bg-slate-700 bg-slate-800 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-white/20 drop-shadow-md"
          >
            اردو
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance animate-fade-in drop-shadow-2xl">
            Career Guidance
            <span className="block text-cyan-300 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text animate-gradient-x">
              Portal
            </span>
          </h1>

          <p
            className="text-2xl md:text-3xl text-blue-100 mb-4 font-medium animate-fade-in-up drop-shadow-lg"
            style={{ animationDelay: "0.2s" }}
          >
            Guiding Your Future
          </p>

          {/* Description */}
          <p
            className="text-lg text-blue-100 mb-12 max-w-2xl mx-auto text-balance leading-relaxed animate-fade-in-up drop-shadow-md"
            style={{ animationDelay: "0.4s" }}
          >
            Discover your potential with AI-powered career recommendations tailored for students of Jammu & Kashmir.
            Take our comprehensive quiz and unlock personalized guidance for your academic and professional journey.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Link href="/auth/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-700 hover:from-purple-800 hover:via-blue-800 hover:to-cyan-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 animate-pulse-glow drop-shadow-lg"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                variant="outline"
                size="lg"
                className="border-white/50 text-white hover:bg-slate-700 px-8 py-4 text-lg font-semibold rounded-xl bg-slate-800 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-white/20 transform hover:scale-105 drop-shadow-md"
              >
                Login
              </Button>
            </Link>
          </div>

          <div
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <Card className="bg-white/20 backdrop-blur-md border-white/40 p-6 text-white hover:bg-white/25 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 group">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-200 transition-colors">
                AI-Powered Quiz
              </h3>
              <p className="text-blue-100 group-hover:text-blue-50 transition-colors">
                Comprehensive assessment to identify your interests and strengths
              </p>
            </Card>

            <Card className="bg-white/20 backdrop-blur-md border-white/40 p-6 text-white hover:bg-white/25 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-4 mx-auto shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-200 transition-colors">
                Career Recommendations
              </h3>
              <p className="text-blue-100 group-hover:text-blue-50 transition-colors">
                Personalized stream and degree suggestions based on your profile
              </p>
            </Card>

            <Card className="bg-white/20 backdrop-blur-md border-white/40 p-6 text-white hover:bg-white/25 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20 group">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center mb-4 mx-auto shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-200 transition-colors">
                College Directory
              </h3>
              <p className="text-blue-100 group-hover:text-blue-50 transition-colors">
                Complete database of colleges and universities in J&K with admission details
              </p>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 text-center py-8 text-blue-100 drop-shadow-md">
        <p>&copy; 2024 Government of Jammu & Kashmir. All rights reserved.</p>
      </footer>
    </div>
  )
}
