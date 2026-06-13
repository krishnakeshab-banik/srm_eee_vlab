"use client"

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { LogOut } from "lucide-react"

type StudentProfileSummaryProps = {
  compact?: boolean
}

export function StudentProfileSummary({ compact = false }: StudentProfileSummaryProps) {
  const { data: session } = useSession()
  const user = session?.user

  if (!user?.email) {
    return null
  }

  const details = [
    { label: "Name", value: user.name },
    { label: "Registration Number", value: user.registrationNumber },
    { label: "Department", value: user.department },
    { label: "Semester", value: user.semester },
    { label: "Section", value: user.section },
    { label: "Batch", value: user.batch },
    { label: "Mobile", value: user.mobile },
    { label: "Program", value: user.program },
  ].filter((item) => item.value)

  return (
    <div className={`rounded-2xl border border-blue-500/20 bg-blue-500/5 ${compact ? "p-4" : "p-6"}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/80">Academia Profile</p>
          <h2 className={`${compact ? "text-lg" : "text-2xl"} font-semibold text-white`}>
            {user.name || "SRM Student"}
          </h2>
          <p className="text-sm text-neutral-400">{user.email}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/signin" })}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-300 transition-colors hover:bg-red-500/20"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>

      <div className={`mt-4 grid gap-3 ${compact ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"}`}>
        {details.map((detail) => (
          <div key={detail.label} className="rounded-xl border border-white/8 bg-black/20 px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">{detail.label}</p>
            <p className="mt-1 text-sm font-medium text-neutral-100">{detail.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
