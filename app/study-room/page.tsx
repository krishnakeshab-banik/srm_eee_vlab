"use client"
import Link from "next/link"
import {
  BookOpen, Calendar, Bot, GraduationCap, Library, FileText,
  ArrowRight, Zap, FlaskConical, Calculator, Video, BookMarked,
  Brain, Lightbulb, Clock, Star, TrendingUp, BarChart2,
  Wifi, Award, ChevronRight
} from "lucide-react"
import { motion } from "framer-motion"
import { DigitalClock } from "@/components/digital-clock"
import { DynamicSidebar } from "@/components/dynamic-sidebar"

const featuredTools = [
  {
    title: "MyAI Lab Assistant",
    description: "Ask any EEE concept — get instant explanations, solve circuit problems, generate practice questions, and get step-by-step help.",
    icon: <Bot className="h-10 w-10 text-violet-400" />,
    href: "/study-room/ai-assistant",
    color: "from-violet-900/30 to-purple-900/10",
    border: "border-violet-500/30 hover:border-violet-400/60",
    badge: "AI Powered",
    badgeColor: "bg-violet-500/20 text-violet-300",
  },
  {
    title: "Virtual Lab Experiments",
    description: "Perform all 12 interactive lab experiments virtually with real-time simulations, truth tables, oscilloscopes, and circuit builders.",
    icon: <FlaskConical className="h-10 w-10 text-cyan-400" />,
    href: "/experiments",
    color: "from-cyan-900/30 to-blue-900/10",
    border: "border-cyan-500/30 hover:border-cyan-400/60",
    badge: "12 Labs",
    badgeColor: "bg-cyan-500/20 text-cyan-300",
  },
  {
    title: "Practice Quizzes",
    description: "Test yourself with topic-wise MCQ quizzes for all 12 experiments. Instant feedback and explanations for every answer.",
    icon: <Brain className="h-10 w-10 text-green-400" />,
    href: "/quizzes",
    color: "from-green-900/30 to-emerald-900/10",
    border: "border-green-500/30 hover:border-green-400/60",
    badge: "12 Quizzes",
    badgeColor: "bg-green-500/20 text-green-300",
  },
]

const academicTools = [
  {
    title: "EEE PYQs",
    description: "Previous year question papers with solutions for all semesters. Filter by year, unit, and topic.",
    icon: <FileText className="h-7 w-7 text-blue-400" />,
    href: "/study-room/pyqs",
    color: "bg-blue-500/8 border-blue-500/20 hover:bg-blue-500/15 hover:border-blue-500/40",
    tag: "View Papers"
  },
  {
    title: "CT Schedules",
    description: "Cycle Test dates, syllabus coverage, and important exam deadlines for 26EEE1001T.",
    icon: <Calendar className="h-7 w-7 text-emerald-400" />,
    href: "/study-room/schedules",
    color: "bg-emerald-500/8 border-emerald-500/20 hover:bg-emerald-500/15 hover:border-emerald-500/40",
    tag: "View Schedule"
  },
  {
    title: "Formula Cheat Sheet",
    description: "Quick-reference formulas for KVL, KCL, Thevenin, diode equations, logic gates, and more.",
    icon: <Calculator className="h-7 w-7 text-yellow-400" />,
    href: "/study-room/formula-sheet",
    color: "bg-yellow-500/8 border-yellow-500/20 hover:bg-yellow-500/15 hover:border-yellow-500/40",
    tag: "View Formulas"
  },
  {
    title: "Reference Books",
    description: "Digital library of recommended textbooks and reference materials for 26EEE1001T.",
    icon: <Library className="h-7 w-7 text-amber-400" />,
    href: "/study-room/books",
    color: "bg-amber-500/8 border-amber-500/20 hover:bg-amber-500/15 hover:border-amber-500/40",
    tag: "Browse Library"
  },
  {
    title: "Lecture Notes & Slides",
    description: "Unit-wise lecture notes, slides, and study materials. Download PDFs for offline study.",
    icon: <BookOpen className="h-7 w-7 text-pink-400" />,
    href: "/study-room/notes",
    color: "bg-pink-500/8 border-pink-500/20 hover:bg-pink-500/15 hover:border-pink-500/40",
    tag: "View Notes"
  },
  {
    title: "Video Tutorials",
    description: "Curated YouTube playlists for every experiment — from theory to practical demonstration.",
    icon: <Video className="h-7 w-7 text-red-400" />,
    href: "/study-room/videos",
    color: "bg-red-500/8 border-red-500/20 hover:bg-red-500/15 hover:border-red-500/40",
    tag: "Watch Videos"
  },
  {
    title: "Lab Manual",
    description: "Complete digital version of the SRM EEE Virtual Lab Manual with all procedures, apparatus, and circuits.",
    icon: <BookMarked className="h-7 w-7 text-indigo-400" />,
    href: "/study-room/manual",
    color: "bg-indigo-500/8 border-indigo-500/20 hover:bg-indigo-500/15 hover:border-indigo-500/40",
    tag: "Read Manual"
  },
  {
    title: "Component Guide",
    description: "Learn about every component used in the lab — resistors, diodes, op-amps, logic ICs, and more.",
    icon: <Lightbulb className="h-7 w-7 text-orange-400" />,
    href: "/study-room/components",
    color: "bg-orange-500/8 border-orange-500/20 hover:bg-orange-500/15 hover:border-orange-500/40",
    tag: "Interactive"
  },
]

const stats = [
  { value: "12", label: "Experiments", icon: <FlaskConical className="h-5 w-5" />, color: "text-cyan-400" },
  { value: "12", label: "Quizzes", icon: <Brain className="h-5 w-5" />, color: "text-green-400" },
  { value: "AI", label: "Assistant", icon: <Bot className="h-5 w-5" />, color: "text-violet-400" },
  { value: "24/7", label: "Access", icon: <Wifi className="h-5 w-5" />, color: "text-blue-400" },
]

export default function StudyRoomPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-blue-500/30 selection:text-blue-200">
      <DynamicSidebar />
      <DigitalClock />

      <main className="pl-14 md:pl-16 pt-20 pb-20 min-h-screen">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-neutral-500 mb-8 pt-4">
            <Link href="/" className="hover:text-neutral-300 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-neutral-300">Study Room</span>
          </div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4">
              <BookMarked className="h-3.5 w-3.5" />
              26EEE1001T — All Study Resources
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
              Study Room
            </h1>
            <p className="text-white/50 text-lg max-w-2xl">
              Everything you need to ace your EEE lab — AI assistance, virtual experiments, quizzes, notes, and more.
            </p>
          </motion.div>

          {/* Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12"
          >
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-3 bg-white/3 border border-white/8 rounded-xl px-4 py-3">
                <div className={`${s.color} opacity-80`}>{s.icon}</div>
                <div>
                  <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-neutral-500">{s.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Featured Tools (Big Cards) */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              Featured Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featuredTools.map((tool, i) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link href={tool.href} className="block h-full group">
                    <div className={`h-full rounded-2xl border ${tool.border} bg-gradient-to-br ${tool.color} p-6 transition-all duration-300 flex flex-col backdrop-blur-sm`}>
                      <div className="flex items-start justify-between mb-5">
                        <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                          {tool.icon}
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tool.badgeColor}`}>
                          {tool.badge}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed mb-6 flex-grow">
                        {tool.description}
                      </p>
                      <div className="flex items-center text-sm font-semibold text-white/60 group-hover:text-white transition-colors">
                        Open <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Academic Resources (Smaller Cards) */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Academic Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {academicTools.map((tool, i) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.3 }}
                >
                  <Link href={tool.href} className="block h-full group">
                    <div className={`h-full rounded-xl border ${tool.color} p-5 transition-all duration-300 flex flex-col`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2 rounded-lg bg-white/5">
                          {tool.icon}
                        </div>
                        <span className="text-xs text-neutral-500 bg-neutral-800/60 px-2 py-0.5 rounded-full">
                          {tool.tag}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-white mb-1.5 group-hover:text-white/90 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-white/35 text-xs leading-relaxed flex-grow">
                        {tool.description}
                      </p>
                      <div className="mt-4 flex items-center text-xs font-medium text-white/30 group-hover:text-white/70 transition-colors">
                        Explore <ArrowRight className="ml-1.5 w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tip Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 flex flex-col md:flex-row items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-blue-500/10 shrink-0">
              <Award className="h-7 w-7 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">Pro Tip: Use the AI Assistant before your lab session</h3>
              <p className="text-neutral-400 text-sm">Ask the AI to explain the theory and predict the expected results before you do the actual experiment. It drastically improves your understanding and lab report quality!</p>
            </div>
            <Link href="/study-room/ai-assistant" className="shrink-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
              <Bot className="h-4 w-4" />
              Try AI Assistant
            </Link>
          </motion.div>

        </div>
      </main>
    </div>
  )
}
