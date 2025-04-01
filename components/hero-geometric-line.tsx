"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function GeometricLine() {
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

    // Grid configuration
    const gridSpacing = 80 // Space between grid lines

    // Calculate grid lines
    const calculateGridLines = () => {
      const horizontalLines = []
      const verticalLines = []

      // Calculate horizontal lines
      for (let y = gridSpacing; y < canvas.height; y += gridSpacing) {
        horizontalLines.push({ startX: 0, startY: y, endX: canvas.width, endY: y })
      }

      // Calculate vertical lines
      for (let x = gridSpacing; x < canvas.width; x += gridSpacing) {
        verticalLines.push({ startX: x, startY: 0, endX: x, endY: canvas.height })
      }

      return { horizontalLines, verticalLines }
    }

    const { horizontalLines, verticalLines } = calculateGridLines()

    // Create particles for the flowing lights with trails
    const particles: {
      x: number
      y: number
      speed: number
      progress: number
      size: number
      isHorizontal: boolean
      lineIndex: number
      trail: { x: number; y: number; age: number }[]
      trailLength: number
      color: string
      brightness: number
    }[] = []

    const particleCount = 30 // Increased number of particles
    const maxTrailLength = 500 // Maximum number of points in a trail

    // Color palettes based on theme
    const getLightThemeColor = () => {
      const colors = [
        "rgba(65, 105, 225, 1)", // Royal blue
        "rgba(70, 130, 180, 1)", // Steel blue
        "rgba(0, 191, 255, 1)", // Deep sky blue
        "rgba(30, 144, 255, 1)", // Dodger blue
        "rgba(0, 128, 255, 1)", // Bright blue
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    const getDarkThemeColor = () => {
      const colors = [
        "rgba(100, 149, 237, 1)", // Cornflower blue
        "rgba(135, 206, 250, 1)", // Light sky blue
        "rgba(0, 191, 255, 1)", // Deep sky blue
        "rgba(127, 255, 212, 1)", // Aquamarine
        "rgba(173, 216, 230, 1)", // Light blue
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const isHorizontal = Math.random() > 0.5
      const lines = isHorizontal ? horizontalLines : verticalLines
      const lineIndex = Math.floor(Math.random() * lines.length)
      const trailLength = 10 + Math.floor(Math.random() * maxTrailLength)
      const color = resolvedTheme === "dark" ? getDarkThemeColor() : getLightThemeColor()
      const brightness = 0.5 + Math.random() * 0.5 // Random brightness between 0.5 and 1

      particles.push({
        x: 0,
        y: 0,
        speed: 0.2 + Math.random() * 0.4, // Random speed
        progress: Math.random(), // Random starting position
        size: 1.5 + Math.random() * 2, // Random size
        isHorizontal,
        lineIndex,
        trail: [],
        trailLength,
        color,
        brightness,
      })
    }

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw the grid lines
      ctx.beginPath()

      // Set line style based on theme
      ctx.strokeStyle = resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.07)" : "rgba(0, 0, 0, 0.05)"
      ctx.lineWidth = 1

      // Draw horizontal lines
      horizontalLines.forEach((line) => {
        ctx.moveTo(line.startX, line.startY)
        ctx.lineTo(line.endX, line.endY)
      })

      // Draw vertical lines
      verticalLines.forEach((line) => {
        ctx.moveTo(line.startX, line.startY)
        ctx.lineTo(line.endX, line.endY)
      })

      ctx.stroke()

      // Update and draw particles with trails
      particles.forEach((particle) => {
        // Update particle position
        const prevX = particle.x
        const prevY = particle.y

        particle.progress += particle.speed / 1000
        if (particle.progress > 1) {
          particle.progress = 0
          particle.trail = [] // Clear trail when resetting

          // Randomly change line when particle resets
          if (Math.random() > 0.7) {
            particle.isHorizontal = Math.random() > 0.5
            const lines = particle.isHorizontal ? horizontalLines : verticalLines
            if (lines.length > 0) {
              particle.lineIndex = Math.floor(Math.random() * lines.length)
            }
            // Randomly change color and brightness
            particle.color = resolvedTheme === "dark" ? getDarkThemeColor() : getLightThemeColor()
            particle.brightness = 0.5 + Math.random() * 0.5
          }
        }

        // Get current line
        const lines = particle.isHorizontal ? horizontalLines : verticalLines
        if (lines.length === 0 || particle.lineIndex >= lines.length) return

        const line = lines[particle.lineIndex]

        // Calculate position on the line
        if (particle.isHorizontal) {
          particle.x = line.startX + (line.endX - line.startX) * particle.progress
          particle.y = line.startY
        } else {
          particle.x = line.startX
          particle.y = line.startY + (line.endY - line.startY) * particle.progress
        }

        // Only add to trail if position has changed significantly
        if (Math.abs(particle.x - prevX) > 0.1 || Math.abs(particle.y - prevY) > 0.1) {
          // Add current position to trail
          particle.trail.unshift({ x: particle.x, y: particle.y, age: 0 })

          // Limit trail length
          if (particle.trail.length > particle.trailLength) {
            particle.trail.pop()
          }
        }

        // Age all trail points
        particle.trail.forEach((point) => {
          point.age += 1
        })

        // Draw trail
        if (particle.trail.length > 1) {
          for (let i = 0; i < particle.trail.length - 1; i++) {
            const point = particle.trail[i]
            const nextPoint = particle.trail[i + 1]

            // Calculate opacity based on age
            const maxAge = particle.trailLength * 2
            const opacity = Math.max(0, 1 - point.age / maxAge) * particle.brightness

            // Draw line segment with gradient
            const gradient = ctx.createLinearGradient(point.x, point.y, nextPoint.x, nextPoint.y)

            // Extract RGB values from the color string
            const colorMatch = particle.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
            if (colorMatch) {
              const [_, r, g, b] = colorMatch.map(Number)
              gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`)
              gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${opacity * 0.7})`)
            }

            ctx.beginPath()
            ctx.moveTo(point.x, point.y)
            ctx.lineTo(nextPoint.x, nextPoint.y)
            ctx.lineWidth = particle.size * (1 - i / particle.trail.length) * 1.5
            ctx.strokeStyle = gradient
            ctx.lineCap = "round"
            ctx.stroke()
          }
        }

        // Draw the particle (head of the trail)
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3)

        // Extract RGB values from the color string
        const colorMatch = particle.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
        if (colorMatch) {
          const [_, r, g, b] = colorMatch.map(Number)
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${particle.brightness})`)
          gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${particle.brightness * 0.5})`)
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [resolvedTheme])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true" />
  )
}

