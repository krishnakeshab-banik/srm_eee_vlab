"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Home, BookOpen, Settings, LogIn, FileQuestion, Users, Info, Zap, Cpu, Lightbulb, Bolt, Radio, Wifi } from "lucide-react"
import { motion, useAnimation, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { DigitalClock } from "@/components/digital-clock"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarDemo } from "@/components/sidebar-demo"
import { FloatingDock } from "@/components/ui/floating-dock"
import { CircuitAnimation } from "@/components/ui/circuit-animation"
import { RotatingCircuit } from "@/components/ui/rotating-circuit"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { AuroraBackground } from "@/components/aurora-background"
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect"
import { cn } from "@/lib/utils"

// Enhanced quizzes with icons and difficulty levels
const quizzes = [
  {
    id: 1,
    title: "Kirchhoff's Voltage Law Quiz",
    description: "Test your knowledge of voltage relationships in closed loop circuits",
    icon: <Zap className="h-8 w-8" />,
    difficulty: "Intermediate",
    color: "blue"
  },
  {
    id: 2,
    title: "Thevenin's Theorem Quiz",
    description: "Challenge yourself on circuit simplification techniques",
    icon: <Cpu className="h-8 w-8" />,
    difficulty: "Advanced",
    color: "purple"
  },
  { 
    id: 3, 
    title: "House Wiring Quiz", 
    description: "Verify your understanding of residential electrical systems",
    icon: <Lightbulb className="h-8 w-8" />,
    difficulty: "Beginner",
    color: "green"
  },
  { 
    id: 4, 
    title: "Fluorescent Lamp Wiring Quiz", 
    description: "Test your knowledge of fluorescent lighting systems",
    icon: <Bolt className="h-8 w-8" />,
    difficulty: "Intermediate",
    color: "yellow"
  },
  { 
    id: 5, 
    title: "Staircase Wiring Quiz", 
    description: "Challenge yourself on multi-way switching circuits",
    icon: <Radio className="h-8 w-8" />,
    difficulty: "Intermediate",
    color: "red"
  },
  { 
    id: 6, 
    title: "Full Wave Rectifier Quiz", 
    description: "Verify your understanding of AC to DC conversion",
    icon: <Wifi className="h-8 w-8" />,
    difficulty: "Advanced",
    color: "cyan"
  },
]

// Custom animated circuit component for the quiz page
const ElectronFlow = () => {
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(0)
  
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
      <svg
        viewBox="0 0 1000 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          ref={pathRef}
          d="M100,300 C150,200 250,150 350,200 S500,300 600,250 S800,150 900,300"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
          }}
        />
        
        <motion.circle
          cx="0"
          cy="0"
          r="4"
          fill="#60A5FA"
          animate={{
            cx: [100, 350, 600, 900],
            cy: [300, 200, 250, 300],
            scale: [1, 1.5, 1, 1.5],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            times: [0, 0.3, 0.6, 1],
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="4s"
            repeatCount="indefinite"
          />
        </motion.circle>
        
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#93C5FD" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// Animated quiz card component
const AnimatedQuizCard = ({ quiz, index }: { quiz: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })
  
  // Get color classes based on quiz color
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string, border: string, text: string, hover: string }> = {
      blue: { 
        bg: "from-blue-900/20 to-blue-900/5", 
        border: "hover:border-blue-500/50", 
        text: "text-blue-400",
        hover: "group-hover:bg-blue-900/30"
      },
      purple: { 
        bg: "from-purple-900/20 to-purple-900/5", 
        border: "hover:border-purple-500/50", 
        text: "text-purple-400",
        hover: "group-hover:bg-purple-900/30"
      },
      green: { 
        bg: "from-green-900/20 to-green-900/5", 
        border: "hover:border-green-500/50", 
        text: "text-green-400",
        hover: "group-hover:bg-green-900/30"
      },
      yellow: { 
        bg: "from-yellow-900/20 to-yellow-900/5", 
        border: "hover:border-yellow-500/50", 
        text: "text-yellow-400",
        hover: "group-hover:bg-yellow-900/30"
      },
      red: { 
        bg: "from-red-900/20 to-red-900/5", 
        border: "hover:border-red-500/50", 
        text: "text-red-400",
        hover: "group-hover:bg-red-900/30"
      },
      cyan: { 
        bg: "from-cyan-900/20 to-cyan-900/5", 
        border: "hover:border-cyan-500/50", 
        text: "text-cyan-400",
        hover: "group-hover:bg-cyan-900/30"
      }
    }
    
    return colorMap[color] || colorMap.blue
  }
  
  const colorClasses = getColorClasses(quiz.color)
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/quizzes/${quiz.id}`} className="group block h-full">
        <div className="relative h-full rounded-2xl border border-neutral-800 p-2 overflow-hidden">
          <GlowingEffect spread={40} glow={isHovered} disabled={false} proximity={64} inactiveZone={0.01} />
          <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 bg-neutral-900/80 backdrop-blur-sm shadow-md">
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30 transition-opacity duration-300", colorClasses.hover)}></div>
            
            <div className="relative flex flex-1 flex-col justify-between gap-3">
              <div className="flex items-start justify-between">
                <div className={cn("p-3 rounded-lg bg-gradient-to-br", colorClasses.bg)}>
                  {quiz.icon}
                </div>
                <div className={cn("text-sm font-medium px-3 py-1 rounded-full border", colorClasses.text, "border-neutral-800")}>
                  {quiz.difficulty}
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <h3 className="text-xl font-bold text-white">{quiz.title}</h3>
                <p className="text-sm text-neutral-400">{quiz.description}</p>
              </div>
              
              <div className={cn("mt-4 text-sm font-medium flex items-center", colorClasses.text)}>
                <span>Start Quiz</span>
                <motion.div
                  animate={isHovered ? { x: 5 } : { x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-2"
                >
                  →
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// Animated circuit path for the hero section
const CircuitPath = () => {
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(0)
  
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <svg
        viewBox="0 0 1000 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <motion.path
          ref={pathRef}
          d="M0,150 H200 L250,100 H350 L400,150 H600 L650,100 H750 L800,150 H1000"
          stroke="url(#circuitGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Circuit nodes */}
        <motion.circle cx="200" cy="150" r="5" fill="#60A5FA" 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.2 }}
        />
        <motion.circle cx="400" cy="150" r="5" fill="#60A5FA" 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.2 }}
        />
        <motion.circle cx="600" cy="150" r="5" fill="#60A5FA" 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, duration: 0.2 }}
        />
        <motion.circle cx="800" cy="150" r="5" fill="#60A5FA" 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.6, duration: 0.2 }}
        />
        
        {/* Resistor */}
        <motion.path
          d="M250,100 L260,80 L270,120 L280,80 L290,120 L300,80 L310,120 L320,80 L330,120 L340,100"
          stroke="#60A5FA"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />
        
        {/* Capacitor */}
        <motion.path
          d="M650,100 V80 M650,120 V100 M750,100 V80 M750,120 V100"
          stroke="#60A5FA"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        />
        
        {/* Electron animation */}
        <motion.circle
          cx="0"
          cy="150"
          r="3"
          fill="#fff"
          animate={{
            cx: [0, 1000],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            times: [0, 0.1, 0.9, 1],
            repeat: Infinity,
            repeatType: "loop",
            delay: 2
          }}
        />
        
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default function QuizzesPage() {
  // Navigation items for the floating dock
  const dockItems = [
    { title: "Home", icon: <Home className="h-full w-full text-neutral-300" />, href: "/" },
    { title: "Experiments", icon: <BookOpen className="h-full w-full text-neutral-300" />, href: "/experiments" },
    { title: "Quizzes", icon: <FileQuestion className="h-full w-full text-neutral-300" />, href: "/quizzes" },
    { title: "Team", icon: <Users className="h-full w-full text-neutral-300" />, href: "/team" },
    { title: "About", icon: <Info className="h-full w-full text-neutral-300" />, href: "/about" },
    { title: "Settings", icon: <Settings className="h-full w-full text-neutral-300" />, href: "/settings" },
    { title: "Sign Up", icon: <LogIn className="h-full w-full text-neutral-300" />, href: "/signup" },
  ];

  // For the scroll-triggered animations
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.3], [0.2, 1.2])
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.3], [0.15, 1.2])
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.3], [0.1, 1.2])
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.3], [0.05, 1.2])
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.3], [0, 1.2])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" ref={containerRef}>
      {/* Sidebar */}
      <div className="fixed left-0 top-0 z-40 h-screen">
        <SidebarDemo />
      </div>
      
      {/* Centered navigation at the top */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <FloatingDock items={dockItems} className="w-auto" mobileClassName="w-auto" />
      </div>

      <DigitalClock />
      
      {/* Rotating circuit animation */}
      <RotatingCircuit />

      {/* Hero Section with Aurora Background */}
      <AuroraBackground className="h-[50vh] flex items-center justify-center mb-16 relative">
        <CircuitPath />
        <div className="text-center z-10 px-4 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            EEE Quizzes
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-neutral-200 max-w-3xl mx-auto"
          >
            Test your knowledge with our interactive electrical and electronics engineering quizzes
          </motion.p>
        </div>
      </AuroraBackground>

      {/* Gemini Effect Section */}
      <div className="h-[40vh] mb-24 relative">
        <GoogleGeminiEffect
          pathLengths={[pathLengthFirst, pathLengthSecond, pathLengthThird, pathLengthFourth, pathLengthFifth]}
          title="Master Electrical Concepts"
          description="Challenge yourself with our comprehensive quiz collection"
        />
      </div>

      <div className="container mx-auto px-4 pb-24 ml-16 md:ml-24 lg:ml-32 relative">
        {/* Background circuit animation */}
        <CircuitAnimation />
        
        <div className="mb-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-white inline-block relative">
              Available Quizzes
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-blue-500"></span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Select a quiz below to test your knowledge and improve your understanding of electrical engineering concepts
            </p>
          </motion.div>
        </div>

        {/* Enhanced quiz cards with animations */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto relative z-10">
          {quizzes.map((quiz, index) => (
            <AnimatedQuizCard key={quiz.id} quiz={quiz} index={index} />
          ))}
        </div>
        
        {/* Electron flow animation in background */}
        <ElectronFlow />
      </div>
    </div>
  )
}

