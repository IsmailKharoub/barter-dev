import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth/admin";
import { LogsViewer } from "./logs-viewer";

export const metadata = {
  title: "Logs - Admin Panel",
  description: "View application and system logs",
};

export default async function LogsPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  return <LogsViewer />;
}

