"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Loader({ externalProgress = null }) {
  const [internalProgress, setInternalProgress] = useState(0)
  const [phase, setPhase] = useState(0)

  // Use external progress if provided, otherwise use internal progress
  const progress = externalProgress !== null ? externalProgress : internalProgress

  // Simulate progress with multiple phases - only if no external progress is provided
  useEffect(() => {
    if (externalProgress === null) {
      const interval = setInterval(() => {
        setInternalProgress((prev) => {
          const newProgress = prev + 0.5

          // Update loading phases
          if (newProgress > 33 && phase === 0) {
            setPhase(1)
          } else if (newProgress > 66 && phase === 1) {
            setPhase(2)
          } else if (newProgress >= 100) {
            // Reset to create infinite loop for demo purposes
            setPhase(0)
            return 0
          }

          return newProgress
        })
      }, 30)

      return () => clearInterval(interval)
    }
  }, [phase, externalProgress])

  // Update phases based on external progress if provided
  useEffect(() => {
    if (externalProgress !== null) {
      if (externalProgress > 33 && phase === 0) {
        setPhase(1)
      } else if (externalProgress > 66 && phase === 1) {
        setPhase(2)
      }
    }
  }, [externalProgress, phase])

  const loadingTexts = ["Initializing Portfolio", "Loading Assets", "Preparing Experience"]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-background/80">
      <motion.div className="flex flex-col items-center gap-12 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Main animated logo */}
        <div className="relative w-32 h-32">
          {/* Pulsing background glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Rotating outer ring */}
          <motion.div
            className="absolute inset-0 border-4 border-primary/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Counter-rotating middle ring */}
          <motion.div
            className="absolute inset-2 border-4 border-primary/40 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Spinning gradient arc */}
          <motion.div
            className="absolute inset-0 border-4 border-t-primary border-r-primary/70 border-b-transparent border-l-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Orbiting dots */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              animate={{
                x: Math.cos((i * (Math.PI * 2)) / 3) * 60,
                y: Math.sin((i * (Math.PI * 2)) / 3) * 60,
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
              style={{
                top: "50%",
                left: "50%",
                marginLeft: "-4px",
                marginTop: "-4px",
              }}
            />
          ))}

          {/* Center logo */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "backOut" }}
          >
            <motion.div
              className="w-full h-full bg-background rounded-md flex items-center justify-center shadow-lg"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <motion.div
                className="text-2xl font-bold text-primary"
                animate={{
                  opacity: [0.7, 1, 0.7],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                J
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Loading text with phase transitions */}
        <motion.div
          className="text-center"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={phase}
              className="text-xl font-medium text-primary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {loadingTexts[phase]}
            </motion.p>
          </AnimatePresence>

          <motion.p
            className="text-sm text-muted-foreground mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.floor(progress)}% Complete
          </motion.p>
        </motion.div>

        {/* Fancy progress bar */}
        <div className="w-64 relative">
          {/* Background track */}
          <motion.div
            className="h-1.5 bg-muted rounded-full overflow-hidden"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 0.8 }}
          />

          {/* Progress fill */}
          <motion.div
            className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-primary/80 via-primary to-primary/80 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ type: "spring" }}
          />

          {/* Animated glow effect */}
          <motion.div
            className="absolute top-0 left-0 h-1.5 w-20 bg-primary/40 rounded-full blur-sm"
            animate={{
              x: ["-100%", "400%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Progress indicator dot */}
          <motion.div
            className="absolute top-0 w-3 h-3 bg-primary rounded-full shadow-md shadow-primary/30 -translate-y-1/4"
            style={{ left: `${progress}%` }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              initial={{
                x: Math.random() * 100 + "%",
                y: "120%",
                opacity: 0.3 + Math.random() * 0.7,
                scale: 0.5 + Math.random() * 1.5,
              }}
              animate={{
                y: "-20%",
                opacity: [0.3, 0.7, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

