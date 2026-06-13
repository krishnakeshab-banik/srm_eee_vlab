"use client"

import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { 
  Home, 
  BookOpen, 
  Settings, 
  LogIn, 
  FileQuestion, 
  Users, 
  Info, 
  Library, 
  User, 
  Mail, 
  Hash, 
  Building, 
  Calendar, 
  LayoutGrid, 
  Layers, 
  Phone, 
  GraduationCap, 
  Shield 
} from "lucide-react"
import { DigitalClock } from "@/components/digital-clock"
import { DynamicSidebar } from "@/components/dynamic-sidebar"
import { FloatingDock } from "@/components/ui/floating-dock"
import { SrmAccessGate } from "@/components/srm-access-gate"
import { StudentProfileSummary } from "@/components/student-profile-summary"

export default function ProfilePage() {
  const { data: session } = useSession()
  const user = session?.user

  const dockItems = [
    { title: "Home", icon: <Home className="h-full w-full text-neutral-300" />, href: "/" },
    { title: "Experiments", icon: <BookOpen className="h-full w-full text-neutral-300" />, href: "/experiments" },
    { title: "Study Room", icon: <Library className="h-full w-full text-neutral-300" />, href: "/study-room" },
    { title: "Quizzes", icon: <FileQuestion className="h-full w-full text-neutral-300" />, href: "/quizzes" },
    { title: "Team", icon: <Users className="h-full w-full text-neutral-300" />, href: "/team" },
    { title: "About", icon: <Info className="h-full w-full text-neutral-300" />, href: "/about" },
    { title: "Profile", icon: <User className="h-full w-full text-neutral-300" />, href: "/profile" },
    { title: "Settings", icon: <Settings className="h-full w-full text-neutral-300" />, href: "/settings" },
    { title: "Sign Up", icon: <LogIn className="h-full w-full text-neutral-300" />, href: "/signup" },
  ]

  const profileDetails = [
    { label: "Full Name", value: user?.name, icon: <User className="h-5 w-5 text-blue-400" /> },
    { label: "SRM Email Address", value: user?.email, icon: <Mail className="h-5 w-5 text-purple-400" /> },
    { label: "Registration Number", value: user?.registrationNumber, icon: <Hash className="h-5 w-5 text-pink-400" /> },
    { label: "Department", value: user?.department, icon: <Building className="h-5 w-5 text-emerald-400" /> },
    { label: "Semester", value: user?.semester, icon: <Calendar className="h-5 w-5 text-amber-400" /> },
    { label: "Section", value: user?.section, icon: <LayoutGrid className="h-5 w-5 text-cyan-400" /> },
    { label: "Academic Batch", value: user?.batch, icon: <Layers className="h-5 w-5 text-yellow-400" /> },
    { label: "Mobile Number", value: user?.mobile, icon: <Phone className="h-5 w-5 text-indigo-400" /> },
    { label: "Program / Degree", value: user?.program, icon: <GraduationCap className="h-5 w-5 text-rose-400" /> },
    { label: "Portal Access Role", value: user?.role === "admin" ? "Administrator" : "Student", icon: <Shield className="h-5 w-5 text-red-400" /> },
  ].filter(item => item.value)

  return (
    <SrmAccessGate
      title="SRM profile access"
      description="Profile details are available only to signed-in SRM users."
    >
      <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200">
        {/* Sidebar and Navigation */}
        <DynamicSidebar />
        
        {/* Floating Top Nav */}
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <FloatingDock items={dockItems} className="w-auto" mobileClassName="w-auto" />
        </div>

        {/* Brand Header */}
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

        <DigitalClock />

        <div className="w-full max-w-6xl mx-auto px-4 py-8 pt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Header Title */}
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
                My Profile
              </h1>
              <p className="text-neutral-400 mt-2">
                Manage your credentials and view profile information scraped in real time from SRM Academia.
              </p>
            </div>

            {/* Profile Overview Card */}
            <StudentProfileSummary />

            {/* Detailed Grid Card */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-xl p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-bold border-b border-neutral-800 pb-4">
                Detailed Profile Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profileDetails.map((detail, idx) => (
                  <motion.div
                    key={detail.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-4 p-4 rounded-xl border border-neutral-800 bg-neutral-950/40 hover:border-neutral-700/60 hover:bg-neutral-950/80 transition-all duration-300"
                  >
                    <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                      {detail.icon}
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                        {detail.label}
                      </p>
                      <p className="text-base font-semibold text-neutral-200">
                        {detail.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SrmAccessGate>
  )
}
