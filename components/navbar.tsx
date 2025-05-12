"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const isHomePage = pathname === "/"

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled || !isHomePage ? "bg-background/95 backdrop-blur-sm border-b" : "bg-transparent border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-center">
        <div className="absolute left-4 md:left-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className={cn("font-bold text-xl", isHomePage && !isScrolled ? "text-white" : "text-foreground")}>
              EEE Learning
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="/" isActive={pathname === "/"} isHomePage={isHomePage} isScrolled={isScrolled}>
            Home
          </NavLink>
          <NavLink
            href="/experiments"
            isActive={pathname.startsWith("/experiments")}
            isHomePage={isHomePage}
            isScrolled={isScrolled}
          >
            Experiments
          </NavLink>
          <NavLink href="#" isActive={false} isHomePage={isHomePage} isScrolled={isScrolled}>
            About
          </NavLink>
          <NavLink href="#" isActive={false} isHomePage={isHomePage} isScrolled={isScrolled}>
            Contact
          </NavLink>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className={cn("md:hidden absolute right-4", isHomePage && !isScrolled ? "text-white hover:bg-white/10" : "")}
          onClick={toggleMenu}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">EEE Learning</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="container grid gap-6 py-8">
            <Link href="/" className="flex items-center text-lg font-medium" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/experiments" className="flex items-center text-lg font-medium" onClick={toggleMenu}>
              Experiments
            </Link>
            <Link href="#" className="flex items-center text-lg font-medium" onClick={toggleMenu}>
              About
            </Link>
            <Link href="#" className="flex items-center text-lg font-medium" onClick={toggleMenu}>
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

function NavLink({ href, children, isActive, isHomePage, isScrolled }) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors",
        isActive
          ? isHomePage && !isScrolled
            ? "text-white"
            : "text-foreground"
          : isHomePage && !isScrolled
            ? "text-white/80 hover:text-white"
            : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </Link>
  )
}

