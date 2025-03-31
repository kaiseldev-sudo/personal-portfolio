"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function SkillsGeometricBackground() {
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

    // Center point
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Calculate distance from center (normalized 0-1)
    const getDistanceFromCenter = (x, y) => {
      const dx = x - centerX
      const dy = y - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)
      return Math.min(distance / maxDistance, 1)
    }

    // Create nodes for network effect
    const nodes = []
    const nodeCount = 40 // Increased node count
    const connectionDistance = 150

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

    // Initialize nodes with position bias toward center
    for (let i = 0; i < nodeCount; i++) {
      // Determine if this will be a central node (30% chance)
      const isCentralNode = Math.random() < 0.3

      // Position nodes with bias toward center for central nodes
      let x, y
      if (isCentralNode) {
        // Central nodes are positioned closer to center
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * (canvas.width / 4)
        x = centerX + Math.cos(angle) * distance
        y = centerY + Math.sin(angle) * distance
      } else {
        // Other nodes can be anywhere
        x = Math.random() * canvas.width
        y = Math.random() * canvas.height
      }

      const distFromCenter = getDistanceFromCenter(x, y)
      const centralityFactor = 1 - distFromCenter

      // Adjust properties based on distance from center
      const radius = 1.5 + Math.random() * 3 + centralityFactor * 2
      const color = resolvedTheme === "dark" ? getDarkThemeColor() : getLightThemeColor()
      const brightness = 0.3 + Math.random() * 0.3 + centralityFactor * 0.4
      const speed = (0.1 + Math.random() * 0.3) * (1 + centralityFactor * 0.5)

      nodes.push({
        x,
        y,
        radius,
        color,
        brightness,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        trail: [],
        trailLength: 5 + Math.floor(Math.random() * 10) + Math.floor(centralityFactor * 15),
        isCentralNode,
      })
    }

    // Draw radial gradient background
    const drawRadialGradient = () => {
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width / 1.5)

      if (resolvedTheme === "dark") {
        gradient.addColorStop(0, "rgba(30, 41, 59, 0.4)")
        gradient.addColorStop(0.5, "rgba(30, 41, 59, 0.2)")
        gradient.addColorStop(1, "rgba(30, 41, 59, 0)")
      } else {
        gradient.addColorStop(0, "rgba(219, 234, 254, 0.3)")
        gradient.addColorStop(0.5, "rgba(219, 234, 254, 0.15)")
        gradient.addColorStop(1, "rgba(219, 234, 254, 0)")
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw radial gradient background
      drawRadialGradient()

      // Draw background pattern - diagonal lines
      ctx.beginPath()
      ctx.strokeStyle = resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)"
      ctx.lineWidth = 1

      // Draw diagonal lines
      const spacing = 50
      const diagonalCount = Math.ceil((canvas.width + canvas.height) / spacing)

      // Top-left to bottom-right diagonals
      for (let i = 0; i < diagonalCount; i++) {
        const startX = i * spacing - canvas.height
        const startY = 0
        const endX = startX + canvas.height
        const endY = canvas.height

        if (startX < canvas.width && endX > 0) {
          ctx.moveTo(Math.max(0, startX), startX < 0 ? -startX : 0)
          ctx.lineTo(
            Math.min(endX, canvas.width),
            endX > canvas.width ? canvas.height - (endX - canvas.width) : canvas.height,
          )
        }
      }

      // Top-right to bottom-left diagonals
      for (let i = 0; i < diagonalCount; i++) {
        const startX = i * spacing
        const startY = 0
        const endX = startX - canvas.height
        const endY = canvas.height

        if (startX > 0 && endX < canvas.width) {
          ctx.moveTo(Math.min(startX, canvas.width), startX > canvas.width ? startX - canvas.width : 0)
          ctx.lineTo(Math.max(0, endX), endX < 0 ? canvas.height + endX : canvas.height)
        }
      }

      ctx.stroke()

      // Draw connections between nodes first (so they appear behind nodes)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        const nodeDistFromCenter = getDistanceFromCenter(node.x, node.y)

        for (let j = i + 1; j < nodes.length; j++) {
          const otherNode = nodes[j]

          const dx = otherNode.x - node.x
          const dy = otherNode.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            // Calculate connection opacity based on:
            // 1. Distance between nodes
            // 2. Distance from center
            const distanceFactor = 1 - distance / connectionDistance
            const centerFactor = (1 - nodeDistFromCenter) * 0.8
            const opacity = distanceFactor * (0.1 + centerFactor * 0.3)

            // Create gradient for connection
            const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y)

            if (resolvedTheme === "dark") {
              gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * node.brightness})`)
              gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity * otherNode.brightness})`)
            } else {
              gradient.addColorStop(0, `rgba(0, 0, 0, ${opacity * node.brightness})`)
              gradient.addColorStop(1, `rgba(0, 0, 0, ${opacity * otherNode.brightness})`)
            }

            ctx.beginPath()
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5 + centerFactor * 0.5
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.stroke()
          }
        }
      }

      // Update and draw nodes
      nodes.forEach((node) => {
        // Update position
        const prevX = node.x
        const prevY = node.y

        node.x += node.vx
        node.y += node.vy

        // Calculate distance from center
        const distFromCenter = getDistanceFromCenter(node.x, node.y)
        const centralityFactor = 1 - distFromCenter

        // Adjust velocity based on distance from center for central nodes
        if (node.isCentralNode && distFromCenter > 0.3) {
          // Add a slight attraction to the center
          const dx = centerX - node.x
          const dy = centerY - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          node.vx += (dx / distance) * 0.01
          node.vy += (dy / distance) * 0.01
        }

        // Bounce off edges
        if (node.x < node.radius || node.x > canvas.width - node.radius) {
          node.vx = -node.vx
          node.x = node.x < node.radius ? node.radius : canvas.width - node.radius
        }

        if (node.y < node.radius || node.y > canvas.height - node.radius) {
          node.vy = -node.vy
          node.y = node.y < node.radius ? node.radius : canvas.height - node.radius
        }

        // Add to trail
        if (Math.abs(node.x - prevX) > 0.1 || Math.abs(node.y - prevY) > 0.1) {
          node.trail.unshift({ x: node.x, y: node.y, age: 0 })

          if (node.trail.length > node.trailLength) {
            node.trail.pop()
          }
        }

        // Age trail points
        node.trail.forEach((point) => {
          point.age += 1
        })

        // Draw trail
        if (node.trail.length > 1) {
          for (let i = 0; i < node.trail.length - 1; i++) {
            const point = node.trail[i]
            const nextPoint = node.trail[i + 1]

            const maxAge = node.trailLength * 2
            const opacity = Math.max(0, 1 - point.age / maxAge) * node.brightness * (1 - distFromCenter * 0.7)

            // Extract RGB values from the color string
            const colorMatch = node.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
            if (colorMatch) {
              const [_, r, g, b] = colorMatch.map(Number)

              const gradient = ctx.createLinearGradient(point.x, point.y, nextPoint.x, nextPoint.y)
              gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`)
              gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${opacity * 0.5})`)

              ctx.beginPath()
              ctx.strokeStyle = gradient
              ctx.lineWidth = node.radius * 0.8 * (1 - i / node.trail.length)
              ctx.moveTo(point.x, point.y)
              ctx.lineTo(nextPoint.x, nextPoint.y)
              ctx.stroke()
            }
          }
        }

        // Draw node
        ctx.beginPath()
        const colorMatch = node.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
        if (colorMatch) {
          const [_, r, g, b] = colorMatch.map(Number)
          const adjustedBrightness = node.brightness * (1 - distFromCenter * 0.5)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${adjustedBrightness})`
        } else {
          ctx.fillStyle = node.color
        }

        // Draw glow for central nodes
        if (centralityFactor > 0.6) {
          const glowRadius = node.radius * (1 + centralityFactor)
          const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius * 3)

          if (colorMatch) {
            const [_, r, g, b] = colorMatch.map(Number)
            glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${centralityFactor * 0.5})`)
            glowGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${centralityFactor * 0.2})`)
            glowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          }

          ctx.beginPath()
          ctx.fillStyle = glowGradient
          ctx.arc(node.x, node.y, glowRadius * 3, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * (1 + centralityFactor * 0.5), 0, Math.PI * 2)
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

