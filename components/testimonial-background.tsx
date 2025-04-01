"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function TestimonialBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Draw background pattern
    const drawPattern = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set pattern style based on theme
      const patternColor = resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)"

      ctx.strokeStyle = patternColor
      ctx.lineWidth = 1

      // Draw circles
      const circleCount = 20
      const maxRadius = Math.max(canvas.width, canvas.height) * 0.4

      for (let i = 0; i < circleCount; i++) {
        const radius = maxRadius * (i / circleCount)
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw radial lines
      const lineCount = 24
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      for (let i = 0; i < lineCount; i++) {
        const angle = (i / lineCount) * Math.PI * 2
        const endX = centerX + Math.cos(angle) * maxRadius
        const endY = centerY + Math.sin(angle) * maxRadius

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(endX, endY)
        ctx.stroke()
      }
    }

    drawPattern()

    // Redraw on theme change
    const observer = new MutationObserver(() => {
      drawPattern()
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      observer.disconnect()
    }
  }, [resolvedTheme])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true" />
  )
}

