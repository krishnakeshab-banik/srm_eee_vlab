"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { DigitalClock } from "@/components/digital-clock"
import { SidebarDemo } from "@/components/sidebar-demo"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate form data
      if (!formData.firstname || !formData.lastname || !formData.email || !formData.password) {
        throw new Error("All fields are required")
      }

      if (formData.password.length < 8) {
        throw new Error("Password must be at least 8 characters long")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success
      toast.success("Account created successfully! Redirecting to login...")

      // Redirect to home page after successful signup
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-black text-white overflow-x-hidden">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 z-40 h-screen">
        <SidebarDemo />
      </div>

      <DigitalClock />

      <div className="relative z-10 w-full max-w-md mx-auto p-6 mt-24 ml-0 md:ml-16">
        <Link
          href="/"
          className="absolute top-4 left-4 text-blue-400 flex items-center gap-1 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-black p-4 md:rounded-2xl md:p-8 dark:bg-black">
          <h2 className="text-xl font-bold text-neutral-200">Join SRM Lab</h2>
          <p className="mt-2 max-w-sm text-sm text-neutral-300">Create your account to access all experiments</p>

          <form className="my-8" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  placeholder="John"
                  type="text"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  placeholder="Doe"
                  type="text"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="john@example.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-8">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
              />
              <p className="text-xs text-neutral-500 mt-1">Password must be at least 8 characters long</p>
            </LabelInputContainer>

            <button
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-blue-600 to-blue-700 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-blue-700 dark:to-blue-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-70"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign up →"}
              <BottomGradient />
            </button>

            <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

            <div className="flex flex-col space-y-4">
              <button
                className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-zinc-900 px-4 font-medium text-white dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
                type="button"
                disabled={isLoading}
              >
                <svg
                  className="h-4 w-4 text-neutral-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span className="text-sm text-neutral-300">GitHub</span>
                <BottomGradient />
              </button>
              <button
                className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-zinc-900 px-4 font-medium text-white dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
                type="button"
                disabled={isLoading}
              >
                <svg className="h-4 w-4 text-neutral-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  />
                </svg>
                <span className="text-sm text-neutral-300">Google</span>
                <BottomGradient />
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-neutral-500">
              Already have an account?{" "}
              <Link href="/signin" className="text-blue-400 hover:text-blue-300">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
}

