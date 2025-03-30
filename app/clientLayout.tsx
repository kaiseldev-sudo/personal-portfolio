"use client"

import { useState, useEffect } from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Loader from "@/components/Loader"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        // Cap at 100%
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsComplete(true)
          return 100
        }
        // Increase by 2% each interval
        return prev + 2
      })
    }, 50)

    return () => clearInterval(progressInterval)
  }, [])

  // Handle the pause after reaching 100%
  useEffect(() => {
    if (isComplete) {
      // Add a 1.5 second pause at 100% before showing content
      const pauseTimer = setTimeout(() => {
        setIsLoading(false)
      }, 1500)

      return () => clearTimeout(pauseTimer)
    }
  }, [isComplete])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          {isLoading ? <Loader externalProgress={progress} /> : children}
        </ThemeProvider>
      </body>
    </html>
  )
}

