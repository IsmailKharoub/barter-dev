import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - Barter",
  description: "Manage barter applications and pipeline",
  robots: "noindex, nofollow", // Prevent search engines from indexing admin pages
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

