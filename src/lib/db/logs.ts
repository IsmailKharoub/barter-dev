/**
 * MongoDB logging system
 * Stores logs in MongoDB for long-term analysis and debugging
 */

import { connectToDatabase } from "./mongodb";

export interface LogEntry {
  timestamp: Date;
  level: "info" | "warn" | "error" | "debug";
  context: string;
  message: string;
  data?: Record<string, unknown>;
  requestId?: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

/**
 * Save a log entry to MongoDB
 * Runs async without blocking the main thread
 */
export async function saveLogToDatabase(logEntry: LogEntry): Promise<void> {
  try {
    const database = await connectToDatabase();
    const logs = database.collection<LogEntry>("logs");
    
    // Insert without waiting for confirmation (fire and forget)
    logs.insertOne(logEntry).catch(err => {
      console.error("[LogDB] Failed to save log to database:", err);
    });
  } catch (error) {
    // Don't throw - logging should never break the main app
    console.error("[LogDB] Error connecting to save log:", error);
  }
}

/**
 * Create indexes for efficient log querying
 */
export async function initializeLogIndexes(): Promise<void> {
  try {
    const database = await connectToDatabase();
    const logs = database.collection<LogEntry>("logs");
    
    // Index for timestamp-based queries
    await logs.createIndex({ timestamp: -1 });
    
    // Index for level filtering
    await logs.createIndex({ level: 1, timestamp: -1 });
    
    // Index for context filtering
    await logs.createIndex({ context: 1, timestamp: -1 });
    
    // Index for request tracking
    await logs.createIndex({ requestId: 1 });
    
    // TTL index - auto-delete logs older than 90 days
    await logs.createIndex(
      { timestamp: 1 },
      { expireAfterSeconds: 90 * 24 * 60 * 60 }
    );
    
    console.log("[LogDB] Log indexes created successfully");
  } catch (error) {
    console.error("[LogDB] Failed to create log indexes:", error);
  }
}

/**
 * Query logs from MongoDB
 */
export async function queryLogs(options: {
  level?: "info" | "warn" | "error" | "debug";
  context?: string;
  startDate?: Date;
  endDate?: Date;
  requestId?: string;
  limit?: number;
}) {
  const database = await connectToDatabase();
  const logs = database.collection<LogEntry>("logs");
  
  const filter: Record<string, unknown> = {};
  
  if (options.level) {
    filter.level = options.level;
  }
  
  if (options.context) {
    filter.context = options.context;
  }
  
  if (options.requestId) {
    filter.requestId = options.requestId;
  }
  
  if (options.startDate || options.endDate) {
    filter.timestamp = {};
    if (options.startDate) {
      (filter.timestamp as Record<string, unknown>).$gte = options.startDate;
    }
    if (options.endDate) {
      (filter.timestamp as Record<string, unknown>).$lte = options.endDate;
    }
  }
  
  return logs
    .find(filter)
    .sort({ timestamp: -1 })
    .limit(options.limit || 100)
    .toArray();
}

