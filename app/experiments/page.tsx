"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Home, BookOpen, Settings, LogIn, FileQuestion, Users, Info, Search, Zap, Lightbulb, Cpu, ChevronRight } from "lucide-react"
import { FloatingDock } from "@/components/ui/floating-dock"
import { GlowingCard } from "@/components/glowing-card"
import { DigitalClock } from "@/components/digital-clock"
import { DynamicSidebar } from "@/components/dynamic-sidebar"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import { Button } from "@/components/ui/moving-border"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ElectronicsBackground } from "@/components/ui/circuit-animation"

// Updated experiments with more detailed information and categories
const experiments = [
  { 
    id: 1, 
    title: "Kirchhoff's Voltage Law", 
    description: "Understand the relationship between voltages in a closed loop circuit",
    category: "Circuit Analysis",
    difficulty: "Beginner",
    duration: "45 min",
    embedId: "hNWAhAfShmV",
    icon: <Zap className="h-5 w-5 text-yellow-400" />
  },
  { 
    id: 2, 
    title: "Thevenin's Theorem", 
    description: "Learn about equivalent circuit simplification techniques",
    category: "Circuit Analysis",
    difficulty: "Intermediate",
    duration: "60 min",
    embedId: "lAusQJ3m4bF",
    icon: <Zap className="h-5 w-5 text-yellow-400" />
  },
  { 
    id: 3, 
    title: "House Wiring", 
    description: "Explore residential electrical wiring systems and safety",
    category: "Electrical Installation",
    difficulty: "Intermediate",
    duration: "90 min",
    embedId: "2rTQ63Z8SdD",
    icon: <Lightbulb className="h-5 w-5 text-yellow-400" />
  },
  { 
    id: 4, 
    title: "Fluorescent Lamp Wiring", 
    description: "Study the wiring and operation of fluorescent lighting systems",
    category: "Electrical Installation",
    difficulty: "Intermediate",
    duration: "60 min",
    embedId: "hnFoQc772H0",
    icon: <Lightbulb className="h-5 w-5 text-yellow-400" />
  },
  { 
    id: 5, 
    title: "Staircase Wiring", 
    description: "Understand multi-way switching for staircase lighting control",
    category: "Electrical Installation",
    difficulty: "Advanced",
    duration: "75 min",
    embedId: "94YWeHFB9oN",
    icon: <Lightbulb className="h-5 w-5 text-yellow-400" />
  },
  { 
    id: 6, 
    title: "Full Wave Rectifier", 
    description: "Learn about AC to DC conversion using full wave rectification",
    category: "Power Electronics",
    difficulty: "Intermediate",
    duration: "60 min",
    embedId: "jbRQbeSnAzj",
    icon: <Cpu className="h-5 w-5 text-blue-400" />
  },
  { 
    id: 7, 
    title: "Op-Amps", 
    description: "Explore operational amplifiers and their circuits",
    category: "Electronics",
    difficulty: "Intermediate",
    duration: "75 min",
    embedId: "",
    icon: <Cpu className="h-5 w-5 text-blue-400" />
  },
  { 
    id: 8, 
    title: "Digital Logic", 
    description: "Study basic logic gates and digital circuits",
    category: "Digital Electronics",
    difficulty: "Beginner",
    duration: "60 min",
    embedId: "",
    icon: <Cpu className="h-5 w-5 text-blue-400" />
  },
]

// Group experiments by category
const categories = [...new Set(experiments.map(exp => exp.category))];
const experimentsByCategory = categories.reduce((acc, category) => {
  acc[category] = experiments.filter(exp => exp.category === category);
  return acc;
}, {});

export default function ExperimentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredExperiments, setFilteredExperiments] = useState(experiments);
  const heroRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState("all");

  // No need for scroll progress tracking with our new animation

  // Filter experiments based on search term and active category
  useEffect(() => {
    let filtered = experiments;
    
    if (searchTerm) {
      filtered = filtered.filter(exp => 
        exp.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeCategory !== "all") {
      filtered = filtered.filter(exp => exp.category === activeCategory);
    }
    
    setFilteredExperiments(filtered);
  }, [searchTerm, activeCategory]);

  // Handle tab change
  const handleTabChange = (value) => {
    setSelectedTab(value);
    setActiveCategory(value === "all" ? "all" : value);
  };

  const dockItems = [
    { title: "Home", icon: <Home className="h-full w-full text-neutral-300" />, href: "/" },
    { title: "Experiments", icon: <BookOpen className="h-full w-full text-neutral-300" />, href: "/experiments" },
    { title: "Quizzes", icon: <FileQuestion className="h-full w-full text-neutral-300" />, href: "/quizzes" },
    { title: "Team", icon: <Users className="h-full w-full text-neutral-300" />, href: "/team" },
    { title: "About", icon: <Info className="h-full w-full text-neutral-300" />, href: "/about" },
    { title: "Settings", icon: <Settings className="h-full w-full text-neutral-300" />, href: "/settings" },
    { title: "Sign Up", icon: <LogIn className="h-full w-full text-neutral-300" />, href: "/signup" },
  ];

  const typewriterWords = [
    {
      text: "Explore",
    },
    {
      text: "interactive",
      className: "text-blue-400",
    },
    {
      text: "electrical",
    },
    {
      text: "engineering",
    },
    {
      text: "experiments",
      className: "text-blue-400",
    },
  ];

  return (
    <div className="flex flex-col bg-black text-white min-h-screen overflow-x-hidden">
      {/* Dynamic Sidebar */}
      <DynamicSidebar />

      {/* Centered navigation at the top */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <FloatingDock items={dockItems} className="w-auto" mobileClassName="w-auto" />
      </div>

      {/* Digital Clock */}
      <DigitalClock />

      {/* Hero Section with Electronics Animation */}
      <div ref={heroRef} className="h-[70vh] w-full bg-black relative pt-20 overflow-hidden">
        {/* Electronics-themed background animation */}
        <ElectronicsBackground />
        
        <div className="absolute top-4 left-20 md:left-48 z-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center"
          >
            <div className="h-10 bg-white text-blue-800 font-bold px-3 py-1 rounded">SRM EEE</div>
          </motion.div>
        </div>

        <div className="mt-32 mb-4 max-w-4xl mx-auto px-4 relative z-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-center text-white leading-tight"
          >
            Electrical & Electronics Experiments
          </motion.h1>

          <div className="flex justify-center mt-2">
            <TypewriterEffectSmooth words={typewriterWords} />
          </div>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-md mx-auto mt-8 px-4 relative z-20"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search experiments..."
              className="pl-10 bg-neutral-900 border-neutral-700 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>
      </div>

      {/* Experiments Section */}
      <div className="w-full py-16 bg-black">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-blue-900/30 px-3 py-1 text-sm text-blue-300">
                Interactive Learning
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
                Hands-on Electrical Engineering Experiments
              </h2>
              <p className="max-w-[900px] text-neutral-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform offers interactive experiments to help you understand complex electrical and electronic
                concepts in an engaging way.
              </p>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs 
            defaultValue="all" 
            value={selectedTab}
            onValueChange={handleTabChange}
            className="w-full mb-8"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-neutral-900 rounded-xl p-1">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-blue-900 data-[state=active]:text-white rounded-lg transition-all"
              >
                All
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:bg-blue-900 data-[state=active]:text-white rounded-lg transition-all"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                  {filteredExperiments.map((experiment) => (
                    <motion.div
                      key={experiment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: experiment.id * 0.1 }}
                    >
                      <GlowingCard
                        href={`/experiments/${experiment.id}`}
                        experimentId={experiment.id}
                        title={experiment.title}
                        description={experiment.description}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-6">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                    {experimentsByCategory[category].map((experiment) => (
                      <motion.div
                        key={experiment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: experiment.id * 0.1 }}
                      >
                        <GlowingCard
                          href={`/experiments/${experiment.id}`}
                          experimentId={experiment.id}
                          title={experiment.title}
                          description={experiment.description}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Featured Experiment Section */}
      <div className="w-full py-16 bg-gradient-to-b from-black to-blue-950">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-blue-900/30 px-3 py-1 text-sm text-blue-300">
                  Featured Experiment
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
                  Kirchhoff's Voltage Law
                </h2>
                <p className="text-neutral-300">
                  Understand the fundamental principle that governs voltage relationships in closed loop circuits. 
                  This interactive experiment allows you to build and analyze circuits while verifying KVL in real-time.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-blue-900/50 flex items-center justify-center">
                      <ChevronRight className="h-4 w-4 text-blue-300" />
                    </div>
                    <span className="text-neutral-300">Interactive circuit building</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-blue-900/50 flex items-center justify-center">
                      <ChevronRight className="h-4 w-4 text-blue-300" />
                    </div>
                    <span className="text-neutral-300">Real-time measurements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-blue-900/50 flex items-center justify-center">
                      <ChevronRight className="h-4 w-4 text-blue-300" />
                    </div>
                    <span className="text-neutral-300">Guided step-by-step procedure</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Button
                    as={Link}
                    href="/experiments/1"
                    className="bg-black border-blue-500 text-white"
                    containerClassName="w-auto"
                  >
                    Try This Experiment
                  </Button>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1 relative"
            >
              <div className="aspect-video rounded-xl overflow-hidden border-2 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent z-10"></div>
                <iframe 
                  src="https://www.tinkercad.com/embed/hNWAhAfShmV" 
                  width="100%" 
                  height="100%" 
                  className="rounded-xl"
                  title="Kirchhoff's Voltage Law"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="w-full py-16 bg-blue-950">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">8+</div>
              <div className="text-neutral-300">Interactive Experiments</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">4</div>
              <div className="text-neutral-300">Categories</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-neutral-300">Interactive Learning</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-neutral-300">Access Anytime</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-12 bg-black border-t border-neutral-800">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-xl font-bold text-white">SRM EEE Virtual Lab</div>
              <div className="text-neutral-400 mt-1">Interactive Electrical Engineering Experiments</div>
            </div>
            <div className="flex gap-6">
              {dockItems.map((item, index) => (
                <Link 
                  key={index} 
                  href={item.href}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-neutral-500">
            © {new Date().getFullYear()} SRM Institute of Science and Technology. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

