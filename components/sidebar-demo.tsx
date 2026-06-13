"use client"
import { useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { Sidebar, SidebarBody, SidebarLink, SidebarProvider } from "@/components/ui/sidebar"
import { Home, BookOpen, FileQuestion, User, Settings, LogOut, Library } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function SidebarDemo() {
  const { data: session } = useSession()
  const user = session?.user
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
      label: "Study Room",
      href: "/study-room",
      icon: <Library className="h-5 w-5 shrink-0 text-neutral-300" />,
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
            <div className="space-y-3 border-t border-white/10 pt-3">
              {user?.email ? (
                <div className="rounded-xl border border-white/8 bg-white/5 px-3 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {(user.name || user.email || "S").charAt(0).toUpperCase()}
                    </div>
                    {open && (
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">{user.name || "SRM Student"}</p>
                        <p className="truncate text-xs text-neutral-400">{user.department || user.email}</p>
                      </div>
                    )}
                  </div>
                  {open && (
                    <button
                      onClick={() => signOut({ callbackUrl: "/signin" })}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-300 transition-colors hover:bg-red-500/20"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Logout
                    </button>
                  )}
                </div>
              ) : (
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
              )}
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

