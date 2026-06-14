import { NextResponse } from "next/server"
import { auth } from "@/app/api/auth/[...nextauth]/route"
import { connectToDatabase } from "@/lib/mongodb"
import fs from "fs/promises"
import path from "path"

const SEED_COLLECTIONS = [
  { name: "experiments", file: "experiments.json" },
  { name: "quizzes", file: "quizzes.json" },
  { name: "books", file: "books.json" },
  { name: "notes", file: "notes.json" },
  { name: "videos", file: "videos.json" },
  { name: "manuals", file: "manual.json" },
  { name: "formulas", file: "formulas.json" },
  { name: "schedules", file: "schedules.json" },
  { name: "pyqs", file: "pyqs.json" },
  { name: "academic_resources", file: "academic_resources.json" },
]

export async function POST(request: Request) {
  const session = await auth()

  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const force = searchParams.get("force") === "true"

  const results: Record<string, string> = {}

  let db
  try {
    const connection = await connectToDatabase()
    db = connection.db
  } catch (dbError) {
    return NextResponse.json({ error: "Database offline. Cannot seed." }, { status: 503 })
  }

  for (const col of SEED_COLLECTIONS) {
    try {
      const collection = db.collection(col.name)
      const count = await collection.countDocuments()

      if (count > 0 && !force) {
        results[col.name] = `skipped (${count} documents already exist)`
        continue
      }

      const filePath = path.join(process.cwd(), "lib", "data", col.file)
      let content: string
      try {
        content = await fs.readFile(filePath, "utf-8")
      } catch {
        results[col.name] = `skipped (data file not found: ${col.file})`
        continue
      }

      const parsed = JSON.parse(content)
      if (!Array.isArray(parsed) || parsed.length === 0) {
        results[col.name] = "skipped (empty or invalid data file)"
        continue
      }

      if (force && count > 0) {
        await collection.deleteMany({})
      }

      let documents = parsed
      if (col.name === "admins" && typeof parsed[0] === "string") {
        documents = parsed.map((email: string) => ({ email: String(email).trim().toLowerCase() }))
      }

      await collection.insertMany(documents)
      results[col.name] = `seeded ${documents.length} documents`
    } catch (err: any) {
      results[col.name] = `error: ${err.message}`
    }
  }

  return NextResponse.json({ message: "Seed completed", results })
}

export async function GET() {
  const session = await auth()

  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 })
  }

  let db
  try {
    const connection = await connectToDatabase()
    db = connection.db
  } catch (dbError) {
    return NextResponse.json({ error: "Database offline." }, { status: 503 })
  }

  const counts: Record<string, number> = {}
  for (const col of SEED_COLLECTIONS) {
    try {
      counts[col.name] = await db.collection(col.name).countDocuments()
    } catch {
      counts[col.name] = -1
    }
  }

  return NextResponse.json({ collections: counts })
}
