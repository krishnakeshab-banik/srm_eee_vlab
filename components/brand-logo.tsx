"use client"

import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type BrandLogoProps = {
  className?: string
  compact?: boolean
}

export function BrandLogo({ className, compact = false }: BrandLogoProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-xl border border-neutral-200/20 bg-white px-2.5 py-1.5 shadow-sm",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-lg border border-dashed border-blue-300/50 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700",
          compact ? "h-8 w-8" : "h-9 w-9"
        )}
      >
        <ImageIcon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      </div>
      {!compact && (
        <div className="hidden sm:flex flex-col leading-tight">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-700/70">
            Logo
          </span>
          <span className="text-xs font-bold text-blue-900">Your Institute</span>
        </div>
      )}
    </div>
  )
}
