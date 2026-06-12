"use client"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar as CalendarIcon, Clock, BookOpen, AlertCircle, CheckCircle2, ChevronRight, FileText } from "lucide-react"
import { FloatingDock } from "@/components/ui/floating-dock"
import { Home, Users, Info, Settings, LogIn, FileQuestion, Library } from "lucide-react"

// Mock Data - Ready for Admin Panel / API Integration
const scheduleData = [
  { id: 1, title: "Cycle Test 1", date: "August 24, 2024", time: "10:00 AM - 11:30 AM", syllabus: "Unit 1 & 2 (DC Circuits & AC Circuits)", status: "Completed", type: "Exam" },
  { id: 2, title: "Assignment 1 Deadline", date: "September 15, 2024", time: "11:59 PM", syllabus: "Unit 1 & 2 Problems", status: "Completed", type: "Submission" },
  { id: 3, title: "Cycle Test 2", date: "October 20, 2024", time: "10:00 AM - 11:30 AM", syllabus: "Unit 3 & 4 (Machines & Semiconductors)", status: "Upcoming", type: "Exam" },
  { id: 4, title: "Model Lab Exam", date: "November 05, 2024", time: "09:00 AM - 12:00 PM", syllabus: "All 12 Lab Experiments", status: "Upcoming", type: "Lab" },
  { id: 5, title: "End Semester Exam", date: "December 12, 2024", time: "09:30 AM - 12:30 PM", syllabus: "Complete Syllabus (Units 1-5)", status: "Upcoming", type: "Exam" },
]

export default function SchedulesPage() {
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

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Completed": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "Upcoming": return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      default: return "text-neutral-400 bg-neutral-800 border-neutral-700";
    }
  }

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "Exam": return <FileText className="h-5 w-5 text-blue-400" />;
      case "Submission": return <AlertCircle className="h-5 w-5 text-purple-400" />;
      case "Lab": return <Clock className="h-5 w-5 text-cyan-400" />;
      default: return <CalendarIcon className="h-5 w-5 text-neutral-400" />;
    }
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 pb-32">
        {/* Header */}
        <div className="mb-12">
          <Link href="/study-room" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Study Room
          </Link>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
            CT & Exam Schedules
          </h1>
          <p className="text-neutral-400 max-w-2xl text-lg">
            Stay on top of your academic deadlines. Track upcoming Cycle Tests, assignment submissions, and End Semester exams for 26EEE1001T.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-neutral-800 ml-3 md:ml-6 space-y-12">
          {scheduleData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-10"
            >
              {/* Timeline dot */}
              <div className={`absolute -left-[11px] top-1.5 h-5 w-5 rounded-full border-4 border-black ${item.status === 'Completed' ? 'bg-emerald-500' : 'bg-neutral-600'}`}></div>
              
              <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 hover:bg-neutral-900/80 hover:border-emerald-500/30 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-800 rounded-lg">
                      {getTypeIcon(item.type)}
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}>
                    {item.status === 'Completed' && <CheckCircle2 className="inline h-3 w-3 mr-1" />}
                    {item.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-neutral-400">
                    <CalendarIcon className="h-4 w-4 mr-2 text-emerald-500/70" />
                    <span className="text-sm">{item.date}</span>
                  </div>
                  <div className="flex items-center text-neutral-400">
                    <Clock className="h-4 w-4 mr-2 text-emerald-500/70" />
                    <span className="text-sm">{item.time}</span>
                  </div>
                </div>
                
                <div className="bg-black/50 rounded-lg p-4 border border-neutral-800/50">
                  <h4 className="text-sm font-medium text-neutral-300 mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" /> Syllabus Coverage
                  </h4>
                  <p className="text-neutral-400 text-sm">{item.syllabus}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <FloatingDock items={dockItems} className="w-auto" mobileClassName="w-auto" />
      </div>
    </div>
  )
}
