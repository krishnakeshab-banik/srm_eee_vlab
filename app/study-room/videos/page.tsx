"use client"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, PlayCircle, BookOpen, Video, Clock, Search, ExternalLink } from "lucide-react"
import { FloatingDock } from "@/components/ui/floating-dock"
import { Home, Users, Info, Settings, LogIn, FileQuestion, Library } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock Data - Ready for Admin Panel / API Integration
const videos = [
  { id: 1, expNumber: "Exp 1", title: "Verification of KCL and KVL", duration: "12:45", views: "1.2k", thumbnail: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&q=80", url: "#" },
  { id: 2, expNumber: "Exp 2", title: "Verification of Thevenin's Theorem", duration: "15:20", views: "950", thumbnail: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&q=80", url: "#" },
  { id: 3, expNumber: "Exp 3", title: "Verification of Norton's Theorem", duration: "14:10", views: "840", thumbnail: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500&q=80", url: "#" },
  { id: 4, expNumber: "Exp 4", title: "V-I Characteristics of PN Junction Diode", duration: "18:30", views: "2.1k", thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&q=80", url: "#" },
  { id: 5, expNumber: "Exp 5", title: "V-I Characteristics of Zener Diode", duration: "16:15", views: "1.5k", thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80", url: "#" },
  { id: 6, expNumber: "Exp 6", title: "Half Wave and Full Wave Rectifiers", duration: "22:05", views: "3.4k", thumbnail: "https://images.unsplash.com/photo-1504610926078-a1611febcad3?w=500&q=80", url: "#" },
  { id: 7, expNumber: "Exp 7", title: "Verification of Logic Gates", duration: "10:50", views: "4.2k", thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80", url: "#" },
  { id: 8, expNumber: "Exp 8", title: "Implementation of Half/Full Adder", duration: "19:40", views: "2.8k", thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80", url: "#" },
]

export default function VideosPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    video.expNumber.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="min-h-screen bg-black text-white selection:bg-red-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 pb-32">
        {/* Header */}
        <div className="mb-12">
          <Link href="/study-room" className="inline-flex items-center text-red-400 hover:text-red-300 mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Study Room
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-rose-400">
                Video Tutorials
              </h1>
              <p className="text-neutral-400 max-w-2xl text-lg">
                Visual learning made easy. Watch complete breakdowns, circuit building, and calculations for every lab experiment.
              </p>
            </div>
            
            <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-neutral-500" />
              </div>
              <Input
                type="text"
                placeholder="Search videos..."
                className="pl-10 bg-neutral-900/50 border-neutral-800 text-white w-full focus:ring-red-500 focus:border-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group cursor-pointer"
              onClick={() => alert(`Playing ${video.title}...`)}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border border-neutral-800 group-hover:border-red-500/50 transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-red-500 text-white rounded-full p-3 shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                    <PlayCircle className="h-8 w-8" />
                  </div>
                </div>
                
                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {video.duration}
                </div>
              </div>
              
              {/* Info */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                    {video.expNumber}
                  </span>
                  <span className="text-xs text-neutral-500">• {video.views} views</span>
                </div>
                <h3 className="text-white font-medium group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                  {video.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredVideos.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex p-4 bg-neutral-900 rounded-full mb-4">
              <Video className="h-8 w-8 text-neutral-500" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No videos found</h3>
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
