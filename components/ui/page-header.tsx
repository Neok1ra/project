"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface PageHeaderProps {
  title: string
  subtitle?: string
  showBackButton?: boolean
  backHref?: string
  children?: React.ReactNode
}

export function PageHeader({
  title,
  subtitle,
  showBackButton = true,
  backHref = "/dashboard",
  children,
}: PageHeaderProps) {
  return (
    <div className="relative z-10">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/30 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-500/30 to-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-32 w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-xl transform rotate-45 animate-float"></div>
        <div
          className="absolute bottom-32 right-40 w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-lg transform -rotate-12 animate-float"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-1/3 right-16 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-xl transform rotate-12 animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Enhanced stars */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse shadow-lg shadow-white/50"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-cyan-300 rounded-full animate-pulse delay-1000 shadow-sm shadow-cyan-300/50"></div>
        <div className="absolute top-60 left-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse delay-500 shadow-sm shadow-purple-300/50"></div>
        <div className="absolute bottom-40 right-20 w-1 h-1 bg-pink-300 rounded-full animate-pulse delay-700 shadow-sm shadow-pink-300/50"></div>
        <div className="absolute top-32 right-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-pulse delay-300 shadow-sm shadow-yellow-300/50"></div>
        <div className="absolute bottom-60 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-1200 shadow-lg shadow-blue-300/50"></div>
      </div>

      {/* Official Header */}
      <div className="relative z-20 flex items-center justify-between p-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Link href={backHref}>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          )}

          <div className="flex items-center gap-4">
            {/* Official J&K Government Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/jk-govt-logo.jpg"
                  alt="Government of Jammu & Kashmir"
                  width={48}
                  height={48}
                  className="rounded-lg shadow-lg shadow-orange-500/30 animate-pulse-glow"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-lg blur-sm"></div>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg drop-shadow-lg">Government of Jammu & Kashmir</h1>
                <p className="text-blue-100 text-sm drop-shadow-md">Department of Education - Career Guidance Portal</p>
              </div>
            </div>
          </div>
        </div>

        {children && <div className="flex gap-3">{children}</div>}
      </div>

      {/* Page Title Section */}
      <div className="relative z-20 p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance animate-fade-in drop-shadow-2xl bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-blue-200 animate-fade-in-up drop-shadow-lg" style={{ animationDelay: "0.2s" }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
