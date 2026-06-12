"use client"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Search, Filter, Download, FileText, Calendar, BookOpen, Clock } from "lucide-react"
import { FloatingDock } from "@/components/ui/floating-dock"
import { Home, Users, Info, Settings, LogIn, FileQuestion, Library } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock Data - Ready for Admin Panel / API Integration
const pyqData = [
  { id: 1, year: "2023", semester: "Odd", type: "Cycle Test 1", subject: "Basic Electrical Engineering", unit: "Unit 1 & 2", size: "1.2 MB", date: "Aug 2023" },
  { id: 2, year: "2023", semester: "Odd", type: "Cycle Test 2", subject: "Basic Electrical Engineering", unit: "Unit 3 & 4", size: "1.5 MB", date: "Oct 2023" },
  { id: 3, year: "2023", semester: "Odd", type: "End Semester", subject: "Basic Electrical Engineering", unit: "All Units", size: "2.8 MB", date: "Dec 2023" },
  { id: 4, year: "2022", semester: "Odd", type: "Cycle Test 1", subject: "Basic Electrical Engineering", unit: "Unit 1 & 2", size: "1.1 MB", date: "Aug 2022" },
  { id: 5, year: "2022", semester: "Odd", type: "Cycle Test 2", subject: "Basic Electrical Engineering", unit: "Unit 3 & 4", size: "1.4 MB", date: "Oct 2022" },
  { id: 6, year: "2022", semester: "Odd", type: "End Semester", subject: "Basic Electrical Engineering", unit: "All Units", size: "3.1 MB", date: "Dec 2022" },
]

export default function PYQsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPYQs = pyqData.filter(pyq => 
    pyq.year.includes(searchTerm) || pyq.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 pb-32">
        {/* Header */}
        <div className="mb-10">
          <Link href="/study-room" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Study Room
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                Previous Year Question Papers
              </h1>
              <p className="text-neutral-400 max-w-2xl text-lg">
                Access a comprehensive archive of cycle test and end-semester question papers to prepare effectively for your exams.
              </p>
            </div>
            
            {/* Search and Filter */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-neutral-500" />
                </div>
                <Input
                  type="text"
                  placeholder="Search year or exam..."
                  className="pl-10 bg-neutral-900/50 border-neutral-800 text-white w-full focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="p-2.5 bg-neutral-900/50 border border-neutral-800 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* List of PYQs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPYQs.map((pyq, index) => (
            <motion.div
              key={pyq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 hover:bg-neutral-900/80 hover:border-blue-500/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                  <FileText className="h-6 w-6" />
                </div>
                <span className="px-3 py-1 bg-neutral-800 text-xs font-medium rounded-full text-neutral-300">
                  {pyq.year}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {pyq.type}
              </h3>
              <p className="text-neutral-400 text-sm mb-4">
                {pyq.subject}
              </p>
              
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-center text-sm text-neutral-500">
                  <BookOpen className="h-4 w-4 mr-2" /> {pyq.unit}
                </div>
                <div className="flex items-center text-sm text-neutral-500">
                  <Calendar className="h-4 w-4 mr-2" /> {pyq.date}
                </div>
              </div>
              
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-mono">{pyq.size}</span>
                <button 
                  className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 bg-blue-500/10 px-4 py-2 rounded-lg hover:bg-blue-500/20 transition-colors"
                  onClick={() => alert(`Downloading ${pyq.year} ${pyq.type}...`)}
                >
                  <Download className="h-4 w-4" /> Download PDF
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredPYQs.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex p-4 bg-neutral-900 rounded-full mb-4">
              <Search className="h-8 w-8 text-neutral-500" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No question papers found</h3>
            <p className="text-neutral-400">Try adjusting your search terms</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <FloatingDock items={dockItems} className="w-auto" mobileClassName="w-auto" />
      </div>
    </div>
  )
}
