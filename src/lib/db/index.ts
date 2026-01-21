import { createClient } from "@libsql/client";

// Create database client
// In production, use Turso: TURSO_DATABASE_URL and TURSO_AUTH_TOKEN
// In development, use local SQLite file
const isProduction = process.env.NODE_ENV === "production";

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Initialize database schema
export async function initDb() {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'pending',
        
        -- Project details
        project_type TEXT NOT NULL,
        project_description TEXT NOT NULL,
        timeline TEXT NOT NULL,
        
        -- Trade details
        trade_type TEXT NOT NULL,
        trade_description TEXT NOT NULL,
        estimated_value INTEGER NOT NULL,
        
        -- Contact details
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        website TEXT,
        additional_info TEXT,
        
        -- Metadata
        ip_address TEXT,
        user_agent TEXT,
        referrer TEXT
      )
    `);
    
    // Create index on email for quick lookups
    await db.execute(`
      CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email)
    `);
    
    // Create index on status for filtering
    await db.execute(`
      CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status)
    `);
    
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
}

// Application status types
export type ApplicationStatus = "pending" | "reviewing" | "accepted" | "rejected" | "completed";

// Application record type
export interface ApplicationRecord {
  id: number;
  created_at: string;
  updated_at: string;
  status: ApplicationStatus;
  project_type: string;
  project_description: string;
  timeline: string;
  trade_type: string;
  trade_description: string;
  estimated_value: number;
  name: string;
  email: string;
  website: string | null;
  additional_info: string | null;
  ip_address: string | null;
  user_agent: string | null;
  referrer: string | null;
}

// Insert a new application
export async function createApplication(data: Omit<ApplicationRecord, "id" | "created_at" | "updated_at" | "status">) {
  const result = await db.execute({
    sql: `
      INSERT INTO applications (
        project_type, project_description, timeline,
        trade_type, trade_description, estimated_value,
        name, email, website, additional_info,
        ip_address, user_agent, referrer
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      data.project_type,
      data.project_description,
      data.timeline,
      data.trade_type,
      data.trade_description,
      data.estimated_value,
      data.name,
      data.email,
      data.website,
      data.additional_info,
      data.ip_address,
      data.user_agent,
      data.referrer,
    ],
  });
  
  return result.lastInsertRowid;
}

// Get application by ID
export async function getApplication(id: number): Promise<ApplicationRecord | null> {
  const result = await db.execute({
    sql: "SELECT * FROM applications WHERE id = ?",
    args: [id],
  });
  
  return result.rows[0] as unknown as ApplicationRecord | null;
}

// Get recent applications (for rate limiting checks)
export async function getRecentApplicationsByEmail(email: string, hours: number = 24): Promise<number> {
  const result = await db.execute({
    sql: `
      SELECT COUNT(*) as count FROM applications 
      WHERE email = ? AND created_at > datetime('now', '-' || ? || ' hours')
    `,
    args: [email, hours],
  });
  
  return Number(result.rows[0]?.count ?? 0);
}

