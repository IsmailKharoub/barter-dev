import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth/admin";
import { LogsViewer } from "./logs-viewer";

export const metadata = {
  title: "Logs - Admin Panel",
  description: "View application and system logs",
};

export default async function LogsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-session");

  if (!token) {
    redirect("/admin/login");
  }

  // Verify session is valid
  const session = await verifySession({ cookies: () => cookieStore } as any);
  
  if (!session) {
    redirect("/admin/login");
  }

  return <LogsViewer />;
}

