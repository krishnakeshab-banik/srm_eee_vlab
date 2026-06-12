"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import {
  Home,
  BookOpen,
  FileQuestion,
  Settings,
  LogIn,
  Target,
  BookText,
  ClipboardList,
  Play,
  BookMarked,
  Users,
  Info,
  Zap,
} from "lucide-react"
import { Sidebar, SidebarBody, SidebarLink, SidebarProvider } from "@/components/ui/sidebar"
import { motion } from "framer-motion"

export function DynamicSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Check if we're on an experiment page
  const isExperimentPage = pathname.startsWith("/experiments/") && pathname !== "/experiments"
  const experimentId = isExperimentPage ? pathname.split("/").pop() : null

  // Define sidebar items based on context
  const homePageItems = [
    {
      label: "Home",
      href: "/",
      icon: <Home className="h-5 w-5 shrink-0 text-blue-300" />,
    },
    {
      label: "Experiments",
      href: "/experiments",
      icon: <BookOpen className="h-5 w-5 shrink-0 text-blue-300" />,
    },
    {
      label: "Study Room",
      href: "/study-room",
      icon: <BookMarked className="h-5 w-5 shrink-0 text-purple-300" />,
    },
    {
      label: "Quizzes",
      href: "/quizzes",
      icon: <FileQuestion className="h-5 w-5 shrink-0 text-blue-300" />,
    },
    {
      label: "Team",
      href: "/team",
      icon: <Users className="h-5 w-5 shrink-0 text-blue-300" />,
    },
    {
      label: "About",
      href: "/about",
      icon: <Info className="h-5 w-5 shrink-0 text-blue-300" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5 shrink-0 text-blue-300" />,
    },
    {
      label: "Sign Up",
      href: "/signup",
      icon: <LogIn className="h-5 w-5 shrink-0 text-blue-300" />,
    },
  ]

  const experimentPageItems = [
    {
      label: "Home",
      href: "/",
      icon: <Home className="h-5 w-5 shrink-0 text-blue-300" />,
    },
    {
      label: "Aim",
      href: `/experiments/${experimentId}#aim`,
      icon: <Target className="h-5 w-5 shrink-0 text-blue-300" />,
    },
    {
      label: "Theory",
      href: `/experiments/${experimentId}#theory`,
      icon: <BookText className="h-5 w-5 shrink-0 text-blue-300" />,
    },
    {
      label: "Procedure",
      href: `/experiments/${experimentId}#procedure`,
      icon: <ClipboardList className="h-5 w-5 shrink-0 text-blue-300" />,
    },
    {
      label: "Simulation",
      href: `/experiments/${experimentId}#simulation`,
      icon: <Play className="h-5 w-5 shrink-0 text-blue-300" />,
    },
    {
      label: "References",
      href: `/experiments/${experimentId}#references`,
      icon: <BookMarked className="h-5 w-5 shrink-0 text-blue-300" />,
    },
    {
      label: "Team",
      href: "/team",
      icon: <Users className="h-5 w-5 shrink-0 text-blue-300" />,
    },
    {
      label: "About",
      href: "/about",
      icon: <Info className="h-5 w-5 shrink-0 text-blue-300" />,
    },
  ]

  const links = isExperimentPage ? experimentPageItems : homePageItems

  return (
    <div className="fixed left-0 top-0 z-40 h-screen">
      <SidebarProvider open={open} setOpen={setOpen} pathname={pathname}>
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {open ? <SidebarLogo /> : <SidebarLogoIcon />}
              <div className="mt-8 flex flex-col gap-1">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div className="border-t border-white/10 pt-3">
              <SidebarLink
                link={{
                  label: "SRM EEE Virtual Lab",
                  href: "/",
                  icon: (
                    <div className="h-7 w-7 shrink-0 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
      </SidebarProvider>
    </div>
  )
}

export const SidebarLogo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative z-20 flex items-center gap-2.5 py-2"
    >
      {/* Circuit icon */}
      <div className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
        <Zap className="h-5 w-5 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-white font-bold text-sm leading-tight">SRM EEE</span>
        <span className="text-blue-400 text-xs font-medium leading-tight">Virtual Lab</span>
      </div>
    </motion.div>
  )
}

export const SidebarLogoIcon = () => {
  return (
    <div className="relative z-20 flex items-center py-2">
      <div className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
        <Zap className="h-5 w-5 text-white" />
      </div>
    </div>
  )
}

// Backward-compat exports
export const Logo = SidebarLogo
export const LogoIcon = SidebarLogoIcon
