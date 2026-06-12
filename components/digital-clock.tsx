"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function DigitalClock() {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")
    return `${hours}:${minutes}:${seconds}`
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  if (!time) return null

  return (
    <motion.div
      className="fixed top-3 right-4 z-50 font-mono text-xs flex flex-col items-end gap-0.5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-blue-500/20 shadow-lg">
        <span className="text-blue-300 font-semibold tracking-widest text-sm">{formatTime(time)}</span>
      </div>
      <div className="text-neutral-600 text-[10px] px-1">{formatDate(time)}</div>
    </motion.div>
  )
}
