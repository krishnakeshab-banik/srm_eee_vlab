"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function DigitalClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")
    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <motion.div
      className="fixed top-4 right-4 z-50 font-mono text-neutral-700 text-sm bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-neutral-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {formatTime(time)}
    </motion.div>
  )
}

