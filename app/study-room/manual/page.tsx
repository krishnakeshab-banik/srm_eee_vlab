"use client"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, BookMarked, Download, FileText, ChevronRight, File, BookOpen } from "lucide-react"
import { FloatingDock } from "@/components/ui/floating-dock"
import { Home, Users, Info, Settings, LogIn, FileQuestion, Library } from "lucide-react"

// Mock Data - Ready for Admin Panel / API Integration
const manualChapters = [
  { id: 1, title: "Lab Manual Cover & Index", pages: "1-5", size: "1.2 MB", type: "PDF" },
  { id: 2, title: "Exp 1: Verification of KCL and KVL", pages: "6-12", size: "850 KB", type: "PDF" },
  { id: 3, title: "Exp 2: Verification of Thevenin's Theorem", pages: "13-18", size: "920 KB", type: "PDF" },
  { id: 4, title: "Exp 3: Verification of Norton's Theorem", pages: "19-24", size: "880 KB", type: "PDF" },
  { id: 5, title: "Exp 4: V-I Characteristics of PN Junction Diode", pages: "25-31", size: "1.1 MB", type: "PDF" },
  { id: 6, title: "Exp 5: V-I Characteristics of Zener Diode", pages: "32-37", size: "950 KB", type: "PDF" },
  { id: 7, title: "Exp 6: Half Wave and Full Wave Rectifiers", pages: "38-45", size: "1.4 MB", type: "PDF" },
  { id: 8, title: "Exp 7: Verification of Logic Gates", pages: "46-52", size: "1.0 MB", type: "PDF" },
  { id: 9, title: "Exp 8: Implementation of Half/Full Adder", pages: "53-60", size: "1.3 MB", type: "PDF" },
]

export default function ManualPage() {
  const dockItems = [
    { title: "Home", icon: <Home className="h-full w-full text-neutral-300" />, href: "/" },
    { title: "Experiments", icon: <BookOpen className="h-full w-full text-neutral-300" />, href: "/experiments" },
    { title: "Study Room", icon: <Library className="h-full w-full text-neutral-300" />, href: "/study-room" },
    { title: "Quizzes", icon: <FileQuestion className="h-full w-full text-neutral-300" />, href: "/quizzes" },
    { title: "Team", icon: <Users className="h-full w-full text-neutral-300" />, href: "/team" },
    { title: "About", icon: <Info className="h-full w-full text-neutral-300" />, href: "/about" },
    { title: "Settings", icon: <Settings className="h-full w-full text-neutral-300" />, href: "/settings" },
    { title: "Sign Up", icon: <LogIn className="h-full w-full text-neutral-300" />, href: "/signup" },
  ]

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 pb-32">
        {/* Header */}
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Link href="/study-room" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Study Room
            </Link>
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
              Virtual Lab Manual
            </h1>
            <p className="text-neutral-400 max-w-2xl text-lg">
              Download the complete digital version of the SRM EEE Virtual Lab Manual, containing procedures, apparatus lists, and theory.
            </p>
          </div>
          
          <button 
            onClick={() => alert('Downloading Complete Lab Manual PDF (15MB)...')}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition-all w-full md:w-auto shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]"
          >
            <Download className="h-5 w-5" /> Download Full Manual
          </button>
        </div>

        {/* Chapters List */}
        <div className="bg-neutral-900/30 border border-neutral-800 rounded-2xl overflow-hidden">
          <div className="p-4 md:p-6 bg-neutral-900/50 border-b border-neutral-800 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <BookMarked className="mr-3 h-5 w-5 text-indigo-400" /> Chapters & Experiments
            </h2>
          </div>
          
          <div className="divide-y divide-neutral-800/60">
            {manualChapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-neutral-800/30 transition-colors group"
              >
                <div className="flex items-start gap-4 mb-4 md:mb-0">
                  <div className="p-2.5 bg-indigo-500/10 rounded-lg text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                    <File className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium group-hover:text-indigo-300 transition-colors">
                      {chapter.title}
                    </h3>
                    <p className="text-neutral-500 text-sm mt-1 flex items-center gap-2">
                      <span className="bg-neutral-800 px-2 py-0.5 rounded text-xs">Pages {chapter.pages}</span>
                      <span>• {chapter.size}</span>
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={() => alert(`Downloading ${chapter.title}...`)}
                  className="flex items-center justify-center md:justify-start gap-2 text-sm font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-lg transition-colors border border-neutral-700"
                >
                  <Download className="h-4 w-4 text-indigo-400" /> PDF
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <FloatingDock items={dockItems} className="w-auto" mobileClassName="w-auto" />
      </div>
    </div>
  )
}
