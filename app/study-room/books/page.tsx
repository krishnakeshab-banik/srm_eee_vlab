"use client"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Book, Download, Eye, BookOpen, Library as LibraryIcon, Search } from "lucide-react"
import { FloatingDock } from "@/components/ui/floating-dock"
import { Home, Users, Info, Settings, LogIn, FileQuestion, Library } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock Data - Ready for Admin Panel / API Integration
const books = [
  { id: 1, title: "Fundamentals of Electric Circuits", author: "Charles K. Alexander, Matthew N.O. Sadiku", edition: "6th Edition", type: "Primary Textbook", size: "15.4 MB", color: "from-blue-600 to-indigo-800" },
  { id: 2, title: "Electronic Devices and Circuit Theory", author: "Robert L. Boylestad, Louis Nashelsky", edition: "11th Edition", type: "Primary Textbook", size: "22.1 MB", color: "from-emerald-600 to-teal-800" },
  { id: 3, title: "Digital Design: With an Introduction to the Verilog HDL", author: "M. Morris Mano, Michael D. Ciletti", edition: "5th Edition", type: "Reference Book", size: "18.3 MB", color: "from-purple-600 to-fuchsia-800" },
  { id: 4, title: "Electrical Machinery", author: "P.S. Bimbhra", edition: "7th Edition", type: "Reference Book", size: "12.8 MB", color: "from-orange-600 to-red-800" },
  { id: 5, title: "Basic Electrical Engineering", author: "V.K. Mehta, Rohit Mehta", edition: "Revised Edition", type: "Reference Book", size: "20.5 MB", color: "from-cyan-600 to-blue-800" },
  { id: 6, title: "Op-Amps and Linear Integrated Circuits", author: "Ramakant A. Gayakwad", edition: "4th Edition", type: "Reference Book", size: "14.2 MB", color: "from-rose-600 to-pink-800" },
]

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="min-h-screen bg-black text-white selection:bg-amber-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 pb-32">
        {/* Header */}
        <div className="mb-12">
          <Link href="/study-room" className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Study Room
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">
                Digital Library
              </h1>
              <p className="text-neutral-400 max-w-2xl text-lg">
                Access recommended textbooks and reference materials for your coursework. Read online or download for offline studying.
              </p>
            </div>
            
            <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-neutral-500" />
              </div>
              <Input
                type="text"
                placeholder="Search title or author..."
                className="pl-10 bg-neutral-900/50 border-neutral-800 text-white w-full focus:ring-amber-500 focus:border-amber-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Library Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group flex flex-col h-full bg-neutral-900/20 border border-neutral-800/60 rounded-2xl overflow-hidden hover:border-amber-500/30 hover:bg-neutral-900/50 transition-all"
            >
              {/* Book Cover Mockup */}
              <div className={`h-48 w-full bg-gradient-to-br ${book.color} flex flex-col items-center justify-center p-6 text-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/30 border-r border-white/10 shadow-[2px_0_10px_rgba(0,0,0,0.5)] z-10"></div>
                <Book className="h-12 w-12 text-white/80 mb-3 z-10 drop-shadow-md" />
                <h3 className="text-white font-bold text-lg leading-tight z-10 drop-shadow-md px-4">{book.title}</h3>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              </div>
              
              {/* Book Details */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium text-amber-500/80 bg-amber-500/10 px-2 py-1 rounded-md">
                    {book.type}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">
                    {book.size}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold text-white mb-2 mt-3 group-hover:text-amber-400 transition-colors line-clamp-2">
                  {book.title}
                </h4>
                <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                  By {book.author}
                </p>
                <p className="text-neutral-500 text-sm mb-6 flex-grow">
                  {book.edition}
                </p>
                
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-800/60 mt-auto">
                  <button 
                    onClick={() => alert(`Opening ${book.title}...`)}
                    className="flex items-center justify-center gap-2 text-sm font-medium text-white hover:text-amber-400 bg-neutral-800 hover:bg-neutral-700 py-2.5 rounded-lg transition-colors"
                  >
                    <Eye className="h-4 w-4" /> Read
                  </button>
                  <button 
                    onClick={() => alert(`Downloading ${book.title}...`)}
                    className="flex items-center justify-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 py-2.5 rounded-lg transition-colors"
                  >
                    <Download className="h-4 w-4" /> PDF
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredBooks.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex p-4 bg-neutral-900 rounded-full mb-4">
              <Search className="h-8 w-8 text-neutral-500" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No books found</h3>
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
