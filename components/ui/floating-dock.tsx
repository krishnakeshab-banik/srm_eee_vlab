"use client"
import { cn } from "@/lib/utils"
import type React from "react"

import { AnimatePresence, type MotionValue, motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { useRef, useState } from "react"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[]
  desktopClassName?: string
  mobileClassName?: string
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  )
}

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[]
  className?: string
}) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div layoutId="nav" className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2">
            {items.map((item, idx) => {
              const isActive = pathname === item.href || 
                (item.href !== '/' && pathname?.startsWith(item.href));
              
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    transition: {
                      delay: idx * 0.05,
                    },
                  }}
                  transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                >
                  <Link
                    href={item.href}
                    key={item.title}
                    className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200",
                      isActive 
                        ? "bg-blue-500 dark:bg-blue-600 shadow-lg shadow-blue-500/30 scale-110" 
                        : "bg-gray-50 dark:bg-neutral-900"
                    )}
                  >
                    <div className={cn(
                      "h-4 w-4",
                      isActive ? "text-white" : ""
                    )}>
                      {item.icon}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center"
      >
        <Menu className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  )
}

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[]
  className?: string
}) => {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY)
  const pathname = usePathname()
  
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      className={cn(
        "mx-auto hidden md:flex h-12 gap-2 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900/90 backdrop-blur-sm px-3 pb-2",
        className,
      )}
    >
      {items.map((item) => {
        const isActive = pathname === item.href || 
          (item.href !== '/' && pathname?.startsWith(item.href));
        
        return (
          <IconContainer 
            mouseX={mouseX} 
            key={item.title} 
            isActive={isActive}
            {...item} 
          />
        );
      })}
    </motion.div>
  )
}

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  isActive,
}: {
  mouseX: MotionValue
  title: string
  icon: React.ReactNode
  href: string
  isActive?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }

    return val - bounds.x - bounds.width / 2
  })

  const widthTransform = useTransform(distance, [-100, 0, 100], [35, 60, 35])
  const heightTransform = useTransform(distance, [-100, 0, 100], [35, 60, 35])

  const widthTransformIcon = useTransform(distance, [-100, 0, 100], [18, 30, 18])
  const heightTransformIcon = useTransform(distance, [-100, 0, 100], [18, 30, 18])

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  const [hovered, setHovered] = useState(false)

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "aspect-square rounded-full flex items-center justify-center relative transition-all duration-300",
          isActive 
            ? "bg-blue-500 dark:bg-blue-600 shadow-lg shadow-blue-500/30 ring-2 ring-blue-400 dark:ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-black" 
            : "bg-gray-200 dark:bg-neutral-800"
        )}
      >
        <AnimatePresence>
          {hovered && !isActive && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div 
          style={{ width: widthIcon, height: heightIcon }} 
          className={cn(
            "flex items-center justify-center",
            isActive ? "text-white" : ""
          )}
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  )
}

