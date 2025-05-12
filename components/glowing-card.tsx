"use client"

import type React from "react"
import Link from "next/link"
import { GlowingEffect } from "@/components/ui/glowing-effect"

export function GlowingCard({
  children,
  className,
  href,
  experimentId,
  title,
  description,
}: {
  children?: React.ReactNode
  className?: string
  href: string
  experimentId: number
  title: string
  description: string
}) {
  return (
    <li className="min-h-[14rem] list-none">
      <Link href={href}>
        <div className="relative h-full rounded-2.5xl border border-neutral-800 p-2 md:rounded-3xl md:p-3">
          <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
          <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 bg-neutral-900 shadow-md">
            <div className="relative flex flex-1 flex-col justify-between gap-3">
              <div className="w-fit rounded-lg border border-blue-600 p-2">
                <span className="text-blue-400 font-bold">{experimentId}</span>
              </div>
              <div className="space-y-3">
                <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-white">
                  {title}
                </h3>
                <h2 className="font-sans text-sm/[1.125rem] md:text-base/[1.375rem] text-neutral-400">{description}</h2>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

