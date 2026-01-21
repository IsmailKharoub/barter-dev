import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth/admin";
import ApplicationDetail from "./application-detail";

export const metadata = {
  title: "Application Details - Admin",
  description: "View and manage application details",
};

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  const { id } = await params;

  return <ApplicationDetail applicationId={id} />;
}

