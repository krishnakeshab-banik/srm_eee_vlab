import { MongoClient, Db } from "mongodb"
import fs from "fs/promises"
import path from "path"

const options = {
  tls: true,
  // Allow invalid TLS certificates in non-production environments
  // to work around OpenSSL compatibility issues on some platforms
  tlsAllowInvalidCertificates: process.env.NODE_ENV !== "production",
}

function getMongoUri(): string | null {
  const uri = process.env.MONGODB_URI?.trim()
  return uri || null
}

export function isMongoConfigured(): boolean {
  return Boolean(getMongoUri())
}

let client: MongoClient
let clientPromise: Promise<MongoClient> | null = null

// Use global cache in development to preserve connection across HMR reloads
interface GlobalWithMongo {
  _mongoClientPromise?: Promise<MongoClient>
  _mongoClient?: MongoClient
}

const globalWithMongo = global as typeof globalThis & GlobalWithMongo

async function seedDatabaseIfNeeded(db: Db) {
  const collectionsToSeed = [
    { name: "academic_resources", file: "academic_resources.json" },
    { name: "admins", file: "admins.json" },
    { name: "books", file: "books.json" },
    { name: "experiments", file: "experiments.json" },
    { name: "formulas", file: "formulas.json" },
    { name: "manuals", file: "manual.json" },
    { name: "notes", file: "notes.json" },
    { name: "pyqs", file: "pyqs.json" },
    { name: "schedules", file: "schedules.json" },
    { name: "videos", file: "videos.json" },
    { name: "quizzes", file: "quizzes.json" },
  ]

  for (const col of collectionsToSeed) {
    try {
      const collection = db.collection(col.name)
      const count = await collection.countDocuments()
      if (count === 0) {
        console.log(`Collection "${col.name}" is empty. Seeding data from "${col.file}"...`)
        const filePath = path.join(process.cwd(), "lib", "data", col.file)
        
        try {
          const content = await fs.readFile(filePath, "utf-8")
          const parsed = JSON.parse(content)

          if (Array.isArray(parsed) && parsed.length > 0) {
            let documents = parsed
            if (col.name === "admins" && typeof parsed[0] === "string") {
              documents = parsed.map(email => ({ email: String(email).trim().toLowerCase() }))
            }
            await collection.insertMany(documents)
            console.log(`Successfully seeded ${parsed.length} items into "${col.name}".`)
          } else {
            console.log(`No items or invalid format in "${col.file}", skipping seed.`)
          }
        } catch (fileError: any) {
          if (fileError.code === "ENOENT") {
            console.log(`Local file "${col.file}" not found, skipping seeding.`)
          } else {
            throw fileError;
          }
        }
      }
    } catch (err) {
      console.error(`Error seeding collection "${col.name}":`, err)
    }
  }
}

export async function connectToDatabase() {
  const uri = getMongoUri()
  if (!uri) {
    throw new Error("MONGODB_NOT_CONFIGURED")
  }

  if (process.env.NODE_ENV === "development") {
    if (!globalWithMongo._mongoClientPromise) {
      console.log("Connecting to MongoDB Atlas (development)...")
      client = new MongoClient(uri, options)
      globalWithMongo._mongoClient = client
      
      const p = client.connect()
      // Catch rejection to prevent unhandled promise rejection process crash
      p.catch((err) => {
        console.error("MongoDB background connection error (handled):", err.message || err)
        // Reset cached promise so next request can retry connection
        globalWithMongo._mongoClientPromise = undefined
      })
      globalWithMongo._mongoClientPromise = p
    }
    clientPromise = globalWithMongo._mongoClientPromise
  } else {
    if (!clientPromise) {
      console.log("Connecting to MongoDB Atlas (production)...")
      client = new MongoClient(uri, options)
      const p = client.connect()
      // Catch rejection to prevent unhandled promise rejection process crash
      p.catch((err) => {
        console.error("MongoDB background connection error (handled):", err.message || err)
        clientPromise = null
      })
      clientPromise = p
    }
  }

  try {
    const connectedClient = await clientPromise
    const db = connectedClient.db()
    await seedDatabaseIfNeeded(db)
    return { client: connectedClient, db }
  } catch (error: any) {
    console.error("Database connection failed in connectToDatabase:", error.message || error)
    throw error
  }
}

// Export a dummy promise for compatibility if anything expects default import
const defaultExportPromise = Promise.resolve({} as MongoClient)
export default defaultExportPromise

