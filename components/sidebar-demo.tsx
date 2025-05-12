"use client"
import { useState } from "react"
import { Sidebar, SidebarBody, SidebarLink, SidebarProvider } from "@/components/ui/sidebar"
import { Home, BookOpen, FileQuestion, User, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function SidebarDemo() {
  const links = [
    {
      label: "Home",
      href: "/",
      icon: <Home className="h-5 w-5 shrink-0 text-neutral-300" />,
    },
    {
      label: "Experiments",
      href: "/#experiments",
      icon: <BookOpen className="h-5 w-5 shrink-0 text-neutral-300" />,
    },
    {
      label: "Quizzes",
      href: "/quizzes",
      icon: <FileQuestion className="h-5 w-5 shrink-0 text-neutral-300" />,
    },
    {
      label: "About",
      href: "#about",
      icon: <User className="h-5 w-5 shrink-0 text-neutral-300" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5 shrink-0 text-neutral-300" />,
    },
    {
      label: "Sign Up",
      href: "/signup",
      icon: <LogOut className="h-5 w-5 shrink-0 text-neutral-300" />,
    },
  ]

  const [open, setOpen] = useState(false)

  return (
    <div className={cn("h-screen")}>
      <SidebarProvider open={open} setOpen={setOpen}>
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
                  label: "Student",
                  href: "#",
                  icon: (
                    <div className="h-7 w-7 shrink-0 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      S
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
    <Link href="/" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-blue-500" />
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium whitespace-pre text-white">
        SRM Lab
      </motion.span>
    </Link>
  )
}

export const LogoIcon = () => {
  return (
    <Link href="/" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-blue-500" />
    </Link>
  )
}

