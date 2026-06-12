"use client"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calculator, BookOpen, Zap, Activity, Cpu, Download } from "lucide-react"
import { FloatingDock } from "@/components/ui/floating-dock"
import { Home, Users, Info, Settings, LogIn, FileQuestion, Library } from "lucide-react"

// Mock Data - Ready for Admin Panel / API Integration
const formulas = [
  {
    category: "DC Circuits",
    icon: <Zap className="h-5 w-5 text-yellow-400" />,
    color: "from-yellow-500/20 to-orange-500/5",
    border: "border-yellow-500/20",
    items: [
      { id: 1, name: "Ohm's Law", formula: "V = I × R", description: "Voltage equals current multiplied by resistance." },
      { id: 2, name: "Power Equation", formula: "P = V × I = I²R = V²/R", description: "Electrical power consumed by a resistor." },
      { id: 3, name: "Kirchhoff's Current Law (KCL)", formula: "Σ I_in = Σ I_out", description: "The sum of currents entering a node equals the sum leaving." },
      { id: 4, name: "Kirchhoff's Voltage Law (KVL)", formula: "Σ V_drop = Σ V_rise", description: "The directed sum of potential differences around any closed loop is zero." },
    ]
  },
  {
    category: "AC Circuits",
    icon: <Activity className="h-5 w-5 text-blue-400" />,
    color: "from-blue-500/20 to-cyan-500/5",
    border: "border-blue-500/20",
    items: [
      { id: 5, name: "RMS Voltage", formula: "V_rms = V_peak / √2", description: "Root mean square voltage for a pure sine wave." },
      { id: 6, name: "Impedance (RLC Series)", formula: "Z = √(R² + (X_L - X_C)²)", description: "Total opposition to alternating current." },
      { id: 7, name: "Resonant Frequency", formula: "f_r = 1 / (2π√(LC))", description: "Frequency at which inductive reactance equals capacitive reactance." },
      { id: 8, name: "Power Factor", formula: "PF = cos(θ) = R / Z", description: "Ratio of real power to apparent power." },
    ]
  },
  {
    category: "Digital Electronics",
    icon: <Cpu className="h-5 w-5 text-purple-400" />,
    color: "from-purple-500/20 to-pink-500/5",
    border: "border-purple-500/20",
    items: [
      { id: 9, name: "De Morgan's First Theorem", formula: "not(A + B) = not(A) · not(B)", description: "The NOR of two variables is equal to the AND of their inverses." },
      { id: 10, name: "De Morgan's Second Theorem", formula: "not(A · B) = not(A) + not(B)", description: "The NAND of two variables is equal to the OR of their inverses." },
      { id: 11, name: "Boolean Identity (OR)", formula: "A + 1 = 1, A + 0 = A", description: "Basic OR logic identities." },
      { id: 12, name: "Boolean Identity (AND)", formula: "A · 1 = A, A · 0 = 0", description: "Basic AND logic identities." },
    ]
  }
]

export default function FormulaSheetPage() {
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
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 pb-32">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Link href="/study-room" className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Study Room
            </Link>
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
              Formula Cheat Sheet
            </h1>
            <p className="text-neutral-400 max-w-2xl text-lg">
              A quick-reference guide for all essential Electrical and Electronics Engineering equations.
            </p>
          </div>
          <button 
            onClick={() => alert('Downloading complete PDF cheat sheet...')}
            className="flex items-center gap-2 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border border-yellow-500/30 px-6 py-3 rounded-lg font-medium transition-all w-fit"
          >
            <Download className="h-5 w-5" /> Download Full PDF
          </button>
        </div>

        {/* Categories */}
        <div className="space-y-16">
          {formulas.map((category, catIndex) => (
            <div key={catIndex} className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} border ${category.border}`}>
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{category.category}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                    className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-6 hover:bg-neutral-900/80 transition-all flex flex-col h-full group"
                  >
                    <h3 className="text-neutral-300 font-medium mb-4 text-sm uppercase tracking-wider">{item.name}</h3>
                    
                    <div className="flex-grow flex items-center justify-center py-6 bg-black/40 rounded-xl border border-neutral-800/50 mb-4 group-hover:border-neutral-700 transition-colors">
                      <span className="text-xl font-mono text-white tracking-wider text-center px-4">
                        {item.formula}
                      </span>
                    </div>
                    
                    <p className="text-neutral-500 text-sm">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <FloatingDock items={dockItems} className="w-auto" mobileClassName="w-auto" />
      </div>
    </div>
  )
}
