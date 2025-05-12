"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
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
} from "lucide-react"
import { Sidebar, SidebarBody, SidebarLink, SidebarProvider } from "@/components/ui/sidebar"

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
      icon: <Home className="h-5 w-5 shrink-0 text-white" />,
    },
    {
      label: "Experiments",
      href: "/#experiments",
      icon: <BookOpen className="h-5 w-5 shrink-0 text-white" />,
    },
    {
      label: "Quizzes",
      href: "/quizzes",
      icon: <FileQuestion className="h-5 w-5 shrink-0 text-white" />,
    },
    {
      label: "Team",
      href: "/team",
      icon: <Users className="h-5 w-5 shrink-0 text-white" />,
    },
    {
      label: "About",
      href: "/about",
      icon: <Info className="h-5 w-5 shrink-0 text-white" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5 shrink-0 text-white" />,
    },
    {
      label: "Sign Up",
      href: "/signup",
      icon: <LogIn className="h-5 w-5 shrink-0 text-white" />,
    },
  ]

  const experimentPageItems = [
    {
      label: "Home",
      href: "/",
      icon: <Home className="h-5 w-5 shrink-0 text-white" />,
    },
    {
      label: "Aim",
      href: `/experiments/${experimentId}#aim`,
      icon: <Target className="h-5 w-5 shrink-0 text-white" />,
    },
    {
      label: "Theory",
      href: `/experiments/${experimentId}#theory`,
      icon: <BookText className="h-5 w-5 shrink-0 text-white" />,
    },
    {
      label: "Procedure",
      href: `/experiments/${experimentId}#procedure`,
      icon: <ClipboardList className="h-5 w-5 shrink-0 text-white" />,
    },
    {
      label: "Simulation",
      href: `/experiments/${experimentId}#simulation`,
      icon: <Play className="h-5 w-5 shrink-0 text-white" />,
    },
    {
      label: "References",
      href: `/experiments/${experimentId}#references`,
      icon: <BookMarked className="h-5 w-5 shrink-0 text-white" />,
    },
    {
      label: "Team",
      href: "/team",
      icon: <Users className="h-5 w-5 shrink-0 text-white" />,
    },
    {
      label: "About",
      href: "/about",
      icon: <Info className="h-5 w-5 shrink-0 text-white" />,
    },
  ]

  const links = isExperimentPage ? experimentPageItems : homePageItems

  return (
    <div className="fixed left-0 top-0 z-40 h-screen">
      <SidebarProvider open={open} setOpen={setOpen} pathname={pathname}>
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "SRM EEE Virtual Lab",
                  href: "#",
                  icon: (
                    <div className="h-7 w-7 shrink-0 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      s
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

export const Logo = () => {
  return (
    <div className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white">
      <div className="h-10 w-auto bg-white text-blue-800 font-bold px-3 py-1 rounded">SRM EEE Virtual Lab</div>
    </div>
  )
}

export const LogoIcon = () => {
  return (
    <div className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white">
      <div className="h-8 w-8 bg-white text-blue-800 font-bold flex items-center justify-center rounded">s</div>
    </div>
  )
}

