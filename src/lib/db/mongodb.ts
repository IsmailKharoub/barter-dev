import { MongoClient, Db, ObjectId } from "mongodb";
import { dbLogger } from "@/lib/logger";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase() {
  if (db) {
    console.log("[MongoDB] Using existing connection");
    return db;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    dbLogger.error("MONGODB_URI not set", new Error("Missing environment variable"));
    console.error("[MongoDB] ❌ MONGODB_URI not set!");
    throw new Error("MONGODB_URI environment variable is not set");
  }

  dbLogger.info("Connecting to database");
  console.log("[MongoDB] Connecting to database...");
  console.log("[MongoDB] URI prefix:", uri.substring(0, 30) + "...");
  
  try {
    client = new MongoClient(uri);
    console.log("[MongoDB] MongoClient created, connecting...");
    await client.connect();
    console.log("[MongoDB] Client connected, selecting database...");
    
    db = client.db("barter-dev");
    dbLogger.info("Connected successfully to database");
    console.log("[MongoDB] ✅ Connected successfully to barter-dev database");
    
    return db;
  } catch (error) {
    console.error("[MongoDB] ❌ Connection failed:");
    console.error("[MongoDB] Error:", error instanceof Error ? error.message : String(error));
    console.error("[MongoDB] Stack:", error instanceof Error ? error.stack : "no stack");
    throw error;
  }
}

export interface ApplicationNote {
  text: string;
  createdAt: Date;
}

export interface Application {
  _id?: ObjectId;
  projectType: string;
  projectDescription: string;
  timeline: string;
  tradeType: string;
  tradeDescription: string;
  name: string;
  email: string;
  website?: string | null;
  additionalInfo?: string | null;
  ipAddress: string;
  userAgent: string;
  referrer?: string | null;
  status: "pending" | "reviewing" | "accepted" | "rejected";
  notes?: ApplicationNote[];
  createdAt: Date;
  updatedAt: Date;
}

export async function createApplication(data: Omit<Application, "_id" | "status" | "createdAt" | "updatedAt">) {
  try {
    dbLogger.info("Creating application", {
      email: data.email,
      projectType: data.projectType,
      tradeType: data.tradeType,
    });

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
    const applicationId = result.insertedId.toString();
    
    dbLogger.info("Application created successfully", {
      applicationId,
      email: data.email,
    });
    
    console.log("[MongoDB] Application created:", applicationId);
    
    return applicationId;
  } catch (error) {
    dbLogger.error("Failed to create application", error, {
      email: data.email,
      projectType: data.projectType,
    });
    throw error;
  }
}

export async function getRecentApplicationsByEmail(email: string, hours: number = 24): Promise<number> {
  try {
    const database = await connectToDatabase();
    const applications = database.collection<Application>("applications");
    
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    const count = await applications.countDocuments({
      email,
      createdAt: { $gte: cutoffTime },
    });
    
    if (count > 0) {
      dbLogger.info("Rate limit check", {
        email,
        count,
        hours,
      });
    }
    
    return count;
  } catch (error) {
    dbLogger.error("Failed to check rate limit", error, { email, hours });
    throw error;
  }
}

export async function getApplicationById(id: string) {
  const database = await connectToDatabase();
  const applications = database.collection<Application>("applications");
  
  return await applications.findOne({ _id: new ObjectId(id) });
}

export async function getAllApplications(
  limit: number = 100,
  status?: string | null,
  search?: string | null
) {
  const database = await connectToDatabase();
  const applications = database.collection<Application>("applications");
  
  // Build query
  const query: Record<string, unknown> = {};
  
  if (status && status !== "all") {
    query.status = status;
  }
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { projectType: { $regex: search, $options: "i" } },
      { tradeType: { $regex: search, $options: "i" } },
    ];
  }
  
  return await applications
    .find(query)
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

// Delete application
export async function deleteApplication(id: string) {
  const database = await connectToDatabase();
  const applications = database.collection<Application>("applications");
  
  const result = await applications.deleteOne({ _id: new ObjectId(id) });
  
  console.log("[MongoDB] Application deleted:", id);
  return result.deletedCount > 0;
}

// Get application statistics
export async function getApplicationStats() {
  const database = await connectToDatabase();
  const applications = database.collection<Application>("applications");
  
  const [total, pending, reviewing, accepted, rejected] = await Promise.all([
    applications.countDocuments(),
    applications.countDocuments({ status: "pending" }),
    applications.countDocuments({ status: "reviewing" }),
    applications.countDocuments({ status: "accepted" }),
    applications.countDocuments({ status: "rejected" }),
  ]);
  
  return {
    total,
    pending,
    reviewing,
    accepted,
    rejected,
  };
}

// Add note to application
export async function addApplicationNote(id: string, noteText: string) {
  const database = await connectToDatabase();
  const applications = database.collection<Application>("applications");
  
  const note: ApplicationNote = {
    text: noteText,
    createdAt: new Date(),
  };
  
  const result = await applications.updateOne(
    { _id: new ObjectId(id) },
    { 
      $push: { notes: note },
      $set: { updatedAt: new Date() },
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

