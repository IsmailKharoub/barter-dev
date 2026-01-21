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

  return <AdminDashboard />;
}

