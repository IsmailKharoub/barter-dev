import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth/admin";
import AdminDashboard from "./components/admin-dashboard";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard - Barter",
  description: "Manage barter applications and pipeline",
};

export default async function AdminPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <>
      {/* Quick Link to Logs */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/admin/logs"
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-stone-950 px-4 py-3 rounded-lg shadow-lg transition-colors font-medium"
        >
          <FileText className="w-5 h-5" />
          View Logs
        </Link>
      </div>
      
      <AdminDashboard />
    </>
  );
}

