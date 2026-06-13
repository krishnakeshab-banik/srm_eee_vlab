import { NextResponse } from "next/server"
import { auth } from "@/app/api/auth/[...nextauth]/route"
import fs from "fs/promises"
import path from "path"

export async function POST(request: Request) {
  const session = await auth()
  
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Create unique sanitized filename
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const filename = `${timestamp}-${sanitizedName}`

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads")
    await fs.mkdir(uploadDir, { recursive: true })

    // Save file
    const filePath = path.join(uploadDir, filename)
    await fs.writeFile(filePath, buffer)

    // Calculate file size formatted nicely
    const bytes = buffer.length
    let sizeStr = `${(bytes / 1024).toFixed(1)} KB`
    if (bytes > 1024 * 1024) {
      sizeStr = `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }

    const fileUrl = `/uploads/${filename}`

    return NextResponse.json({
      url: fileUrl,
      name: file.name,
      size: sizeStr,
      message: "File uploaded successfully",
    }, { status: 201 })

  } catch (error) {
    console.error("Failed to upload file:", error)
    return NextResponse.json({ error: "File upload failed" }, { status: 500 })
  }
}
