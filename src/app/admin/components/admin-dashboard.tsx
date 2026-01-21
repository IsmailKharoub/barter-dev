"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  LogOut,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Users,
  BarChart3,
  RefreshCw,
} from "lucide-react";

interface Application {
  _id: string;
  name: string;
  email: string;
  projectType: string;
  projectDescription: string;
  timeline: string;
  tradeType: string;
  tradeDescription: string;
  website?: string;
  additionalInfo?: string;
  status: "pending" | "reviewing" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
  notes?: Array<{ text: string; createdAt: string }>;
}

interface Stats {
  total: number;
  pending: number;
  reviewing: number;
  accepted: number;
  rejected: number;
}

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
  },
  reviewing: {
    label: "Reviewing",
    icon: Eye,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  accepted: {
    label: "Accepted",
    icon: CheckCircle,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
  },
};

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchApplications = async (showLoader = true) => {
    if (showLoader) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    try {
      const params = new URLSearchParams();
      if (filter !== "all") params.append("status", filter);
      if (search) params.append("search", search);

      const response = await fetch(`/api/admin/applications?${params}`);
      const data = await response.json();

      if (data.success) {
        setApplications(data.applications);
        setStats(data.stats);
      } else if (response.status === 401) {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [filter, search]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-fg-muted">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="border-b border-border-subtle bg-bg-secondary/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-fg-primary">Admin Dashboard</h1>
              <p className="text-sm text-fg-muted mt-1">
                Manage barter applications and pipeline
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => fetchApplications(false)}
                disabled={refreshing}
                className="px-4 py-2 bg-bg-tertiary border border-border-subtle rounded-lg text-fg-primary hover:border-white/30 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-bg-tertiary border border-border-subtle rounded-lg text-fg-primary hover:border-red-500/50 hover:text-red-400 transition-all flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <StatCard
              label="Total"
              value={stats.total}
              icon={Users}
              color="text-fg-primary"
            />
            <StatCard
              label="Pending"
              value={stats.pending}
              icon={Clock}
              color="text-yellow-400"
            />
            <StatCard
              label="Reviewing"
              value={stats.reviewing}
              icon={Eye}
              color="text-blue-400"
            />
            <StatCard
              label="Accepted"
              value={stats.accepted}
              icon={CheckCircle}
              color="text-green-400"
            />
            <StatCard
              label="Rejected"
              value={stats.rejected}
              icon={XCircle}
              color="text-red-400"
            />
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-fg-muted" />
            <input
              type="text"
              placeholder="Search by name, email, project type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-bg-secondary border border-border-subtle rounded-xl text-fg-primary placeholder:text-fg-muted/50 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/10 transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {["all", "pending", "reviewing", "accepted", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                  filter === status
                    ? "bg-white text-black"
                    : "bg-bg-secondary border border-border-subtle text-fg-secondary hover:text-fg-primary hover:border-white/30"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {applications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-bg-secondary border border-border-subtle rounded-2xl p-12 text-center"
              >
                <AlertCircle className="w-12 h-12 text-fg-muted mx-auto mb-4" />
                <h3 className="text-lg font-medium text-fg-primary mb-2">
                  No applications found
                </h3>
                <p className="text-fg-muted">
                  {search || filter !== "all"
                    ? "Try adjusting your filters"
                    : "Applications will appear here when submitted"}
                </p>
              </motion.div>
            ) : (
              applications.map((app, index) => (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-bg-secondary border border-border-subtle rounded-2xl p-6 hover:border-white/20 transition-all cursor-pointer"
                  onClick={() => router.push(`/admin/applications/${app._id}`)}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-fg-primary truncate">
                          {app.name}
                        </h3>
                        <StatusBadge status={app.status} />
                      </div>
                      <p className="text-fg-muted text-sm truncate">{app.email}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-fg-muted">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-fg-muted/60">
                        {new Date(app.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-fg-muted mb-1">Project Type</p>
                      <p className="text-sm text-fg-primary font-medium">
                        {formatLabel(app.projectType)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-fg-muted mb-1">Trade Type</p>
                      <p className="text-sm text-fg-primary font-medium">
                        {formatLabel(app.tradeType)}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-fg-secondary line-clamp-2">
                    {app.projectDescription}
                  </p>

                  {app.notes && app.notes.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border-subtle">
                      <p className="text-xs text-fg-muted">
                        {app.notes.length} note{app.notes.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: any;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-bg-secondary border border-border-subtle rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-fg-muted uppercase tracking-wider">{label}</p>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: Application["status"] }) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${config.bg} ${config.border} ${config.color} border`}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

function formatLabel(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

