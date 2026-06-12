"use client"
import { AnimatedAIChat } from "@/components/ui/animated-ai-chat"
import { DynamicSidebar } from "@/components/dynamic-sidebar"
import { DigitalClock } from "@/components/digital-clock"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-blue-500/30 selection:text-blue-200">
      <DynamicSidebar />
      <DigitalClock />

      <main className="pl-14 md:pl-16 h-screen flex flex-col relative">
        <div className="absolute top-6 left-20 md:left-24 z-50">
          <Link href="/study-room" className="inline-flex items-center text-sm text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Study Room
          </Link>
        </div>
        
        {/* The Animated AI Chat component */}
        <div className="flex-1 flex w-full">
            <AnimatedAIChat />
        </div>
      </main>
    </div>
  )
}
