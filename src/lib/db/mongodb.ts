import { MongoClient, Db, ObjectId } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase() {
  if (db) {
    console.log("[MongoDB] Using existing connection");
    return db;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("[MongoDB] ❌ MONGODB_URI not set!");
    throw new Error("MONGODB_URI environment variable is not set");
  }

  console.log("[MongoDB] Connecting to database...");
  console.log("[MongoDB] URI prefix:", uri.substring(0, 30) + "...");
  
  try {
    client = new MongoClient(uri);
    console.log("[MongoDB] MongoClient created, connecting...");
    await client.connect();
    console.log("[MongoDB] Client connected, selecting database...");
    
    db = client.db("barter-dev");
    console.log("[MongoDB] ✅ Connected successfully to barter-dev database");
    
    return db;
  } catch (error) {
    console.error("[MongoDB] ❌ Connection failed:");
    console.error("[MongoDB] Error:", error instanceof Error ? error.message : String(error));
    console.error("[MongoDB] Stack:", error instanceof Error ? error.stack : "no stack");
    throw error;
  }
}

export interface Application {
  _id?: ObjectId;
  projectType: string;
  projectDescription: string;
  timeline: string;
  tradeType: string;
  tradeDescription: string;
  estimatedValue: number;
  name: string;
  email: string;
  website?: string | null;
  additionalInfo?: string | null;
  ipAddress: string;
  userAgent: string;
  referrer?: string | null;
  status: "pending" | "reviewing" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

export async function createApplication(data: Omit<Application, "_id" | "status" | "createdAt" | "updatedAt">) {
  const database = await connectToDatabase();
  const applications = database.collection<Application>("applications");
  
  const now = new Date();
  const application: Omit<Application, "_id"> = {
    ...data,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };
  
  const result = await applications.insertOne(application as Application);
  console.log("[MongoDB] Application created:", result.insertedId.toString());
  
  return result.insertedId.toString();
}

export async function getRecentApplicationsByEmail(email: string, hours: number = 24): Promise<number> {
  const database = await connectToDatabase();
  const applications = database.collection<Application>("applications");
  
  const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
  
  const count = await applications.countDocuments({
    email,
    createdAt: { $gte: cutoffTime },
  });
  
  return count;
}

export async function getApplicationById(id: string) {
  const database = await connectToDatabase();
  const applications = database.collection<Application>("applications");
  
  return await applications.findOne({ _id: new ObjectId(id) });
}

export async function getAllApplications(limit: number = 100) {
  const database = await connectToDatabase();
  const applications = database.collection<Application>("applications");
  
  return await applications
    .find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
}

export async function updateApplicationStatus(
  id: string,
  status: Application["status"]
) {
  const database = await connectToDatabase();
  const applications = database.collection<Application>("applications");
  
  const result = await applications.updateOne(
    { _id: new ObjectId(id) },
    { 
      $set: { 
        status,
        updatedAt: new Date(),
      } 
    }
  );
  
  return result.modifiedCount > 0;
}

// Initialize indexes for better query performance
export async function initializeIndexes() {
  const database = await connectToDatabase();
  const applications = database.collection<Application>("applications");
  
  await applications.createIndex({ email: 1, createdAt: -1 });
  await applications.createIndex({ status: 1, createdAt: -1 });
  await applications.createIndex({ createdAt: -1 });
  
  console.log("[MongoDB] Indexes created");
}

