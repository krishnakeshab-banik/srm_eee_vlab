"use client"
import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, BookOpen, Download, FileText, ChevronDown, ChevronUp, Layers } from "lucide-react"
import { FloatingDock } from "@/components/ui/floating-dock"
import { Home, Users, Info, Settings, LogIn, FileQuestion, Library } from "lucide-react"

// Mock Data - Ready for Admin Panel / API Integration
const lectureNotes = [
  {
    unit: "Unit 1: DC Circuits",
    description: "Fundamental concepts, Ohm's law, Kirchhoff's laws, Nodal and Mesh analysis.",
    materials: [
      { id: 1, title: "Introduction to Basic Electrical Variables", type: "Slides", size: "2.4 MB", date: "Aug 10" },
      { id: 2, type: "Notes", title: "KCL & KVL Complete Guide", size: "1.1 MB", date: "Aug 15" },
      { id: 3, type: "Worksheet", title: "Mesh & Nodal Analysis Problems", size: "800 KB", date: "Aug 20" },
    ]
  },
  {
    unit: "Unit 2: AC Circuits",
    description: "Sinusoidal steady-state analysis, phasors, impedance, power in AC circuits.",
    materials: [
      { id: 4, type: "Slides", title: "Phasor Representation & Complex Impedance", size: "3.2 MB", date: "Sep 02" },
      { id: 5, type: "Notes", title: "Real, Reactive, and Apparent Power", size: "1.5 MB", date: "Sep 10" },
      { id: 6, type: "Slides", title: "Resonance in RLC Circuits", size: "2.1 MB", date: "Sep 18" },
    ]
  },
  {
    unit: "Unit 3: Electrical Machines",
    description: "Principles of DC machines, Transformers, and Induction Motors.",
    materials: [
      { id: 7, type: "Slides", title: "Magnetic Circuits & Transformers", size: "4.5 MB", date: "Oct 05" },
      { id: 8, type: "Notes", title: "DC Motors: Construction & Working", size: "2.2 MB", date: "Oct 12" },
    ]
  },
  {
    unit: "Unit 4: Semiconductor Devices",
    description: "PN junction diodes, Zener diodes, BJT and FET transistors.",
    materials: [
      { id: 9, type: "Slides", title: "Diode Characteristics & Rectifiers", size: "3.8 MB", date: "Nov 01" },
      { id: 10, type: "Notes", title: "BJT Configurations (CB, CE, CC)", size: "1.9 MB", date: "Nov 15" },
    ]
  },
  {
    unit: "Unit 5: Digital Electronics",
    description: "Number systems, Logic gates, Boolean algebra, Combinational circuits.",
    materials: [
      { id: 11, type: "Slides", title: "Logic Gates & Truth Tables", size: "2.5 MB", date: "Nov 25" },
      { id: 12, type: "Notes", title: "Adders & Subtractors Design", size: "1.4 MB", date: "Dec 02" },
    ]
  }
]

export default function NotesPage() {
  const [expandedUnit, setExpandedUnit] = useState<string | null>("Unit 1: DC Circuits")

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

  const toggleUnit = (unit: string) => {
    if (expandedUnit === unit) {
      setExpandedUnit(null)
    } else {
      setExpandedUnit(unit)
    }
  }

  const getTypeColor = (type: string) => {
    switch(type) {
      case "Slides": return "bg-pink-500/10 text-pink-400 border-pink-500/20";
      case "Notes": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Worksheet": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default: return "bg-neutral-800 text-neutral-300 border-neutral-700";
    }
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-pink-500/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 pb-32">
        {/* Header */}
        <div className="mb-12">
          <Link href="/study-room" className="inline-flex items-center text-pink-400 hover:text-pink-300 mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Study Room
          </Link>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-400">
            Lecture Notes & Slides
          </h1>
          <p className="text-neutral-400 max-w-2xl text-lg">
            Access unit-wise presentations, handwritten notes, and practice worksheets provided by the faculty.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {lectureNotes.map((unitData, index) => (
            <motion.div
              key={unitData.unit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                expandedUnit === unitData.unit 
                  ? 'border-pink-500/50 bg-neutral-900/40 shadow-[0_0_15px_rgba(236,72,153,0.1)]' 
                  : 'border-neutral-800 bg-neutral-900/20 hover:border-neutral-700 hover:bg-neutral-900/30'
              }`}
            >
              {/* Accordion Header */}
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => toggleUnit(unitData.unit)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg transition-colors ${
                    expandedUnit === unitData.unit ? 'bg-pink-500/20 text-pink-400' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    <Layers className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold transition-colors ${
                      expandedUnit === unitData.unit ? 'text-white' : 'text-neutral-300'
                    }`}>
                      {unitData.unit}
                    </h2>
                    <p className="text-neutral-500 text-sm mt-1">{unitData.description}</p>
                  </div>
                </div>
                <div className={`p-2 rounded-full transition-transform duration-300 ${
                  expandedUnit === unitData.unit ? 'bg-pink-500/10 text-pink-400 rotate-180' : 'bg-transparent text-neutral-500'
                }`}>
                  <ChevronDown className="h-5 w-5" />
                </div>
              </button>

              {/* Accordion Content */}
              <AnimatePresence>
                {expandedUnit === unitData.unit && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-neutral-800/50">
                      <div className="flex flex-col gap-3 mt-4">
                        {unitData.materials.map((material) => (
                          <div 
                            key={material.id} 
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-black/40 border border-neutral-800 hover:border-pink-500/30 transition-colors group"
                          >
                            <div className="flex items-start sm:items-center gap-4 mb-3 sm:mb-0">
                              <div className="p-2 bg-neutral-900 rounded-md group-hover:bg-pink-500/10 group-hover:text-pink-400 transition-colors">
                                <FileText className="h-5 w-5 text-neutral-400 group-hover:text-pink-400 transition-colors" />
                              </div>
                              <div>
                                <h3 className="text-white font-medium group-hover:text-pink-100 transition-colors">{material.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${getTypeColor(material.type)} font-medium`}>
                                    {material.type}
                                  </span>
                                  <span className="text-neutral-500 text-xs">• {material.size}</span>
                                  <span className="text-neutral-500 text-xs">• Added {material.date}</span>
                                </div>
                              </div>
                            </div>
                            
                            <button 
                              onClick={() => alert(`Downloading ${material.title}...`)}
                              className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded-md bg-neutral-800 text-neutral-300 hover:bg-pink-500/20 hover:text-pink-300 transition-colors text-sm font-medium w-full sm:w-auto"
                            >
                              <Download className="h-4 w-4" /> Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
