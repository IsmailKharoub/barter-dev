"use client";

import { useState, useEffect, useMemo } from "react";
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
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Square,
  CheckSquare,
  X,
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

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
}

type SortField = "createdAt" | "name" | "email" | "status";
type SortOrder = "asc" | "desc";

const sortOptions: { value: SortField; label: string }[] = [
  { value: "createdAt", label: "Date" },
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "status", label: "Status" },
];

const pageSizeOptions = [10, 20, 50, 100];

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
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  // Sort & pagination state
  const [sortBy, setSortBy] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkUpdating, setBulkUpdating] = useState(false);

  const allSelected = applications.length > 0 && selectedIds.size === applications.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < applications.length;

  const fetchApplications = async (showLoader = true, resetPage = false) => {
    if (showLoader) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    // Reset to page 1 if filters changed
    const currentPage = resetPage ? 1 : page;
    if (resetPage) setPage(1);

    try {
      const params = new URLSearchParams();
      if (filter !== "all") params.append("status", filter);
      if (search) params.append("search", search);
      params.append("page", String(currentPage));
      params.append("pageSize", String(pageSize));
      params.append("sortBy", sortBy);
      params.append("sortOrder", sortOrder);

      const response = await fetch(`/api/admin/applications?${params}`);
      const data = await response.json();

      if (data.success) {
        setApplications(data.applications);
        setStats(data.stats);
        setPagination(data.pagination);
        // Clear selections when data changes
        setSelectedIds(new Set());
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

  // Reset to page 1 when filters change
  useEffect(() => {
    fetchApplications(true, true);
  }, [filter, search, sortBy, sortOrder, pageSize]);

  // Don't reset page when just changing page
  useEffect(() => {
    fetchApplications(false, false);
  }, [page]);

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(applications.map((app) => app._id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkStatusUpdate = async (newStatus: Application["status"]) => {
    if (selectedIds.size === 0) return;

    setBulkUpdating(true);
    try {
      const response = await fetch("/api/admin/applications/bulk", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids: Array.from(selectedIds),
          status: newStatus,
        }),
      });

      const data = await response.json();
      if (data.success) {
        await fetchApplications(false, false);
      } else {
        alert("Failed to update applications");
      }
    } catch (error) {
      console.error("Error bulk updating:", error);
      alert("Failed to update applications");
    } finally {
      setBulkUpdating(false);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

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
        <div className="flex flex-col gap-4 mb-6">
          {/* Search and Sort Row */}
          <div className="flex flex-col sm:flex-row gap-4">
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
            
            {/* Sort Controls */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortField)}
                className="px-4 py-3 bg-bg-secondary border border-border-subtle rounded-xl text-fg-primary appearance-none cursor-pointer focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/10 transition-all"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    Sort: {opt.label}
                  </option>
                ))}
              </select>
              <button
                onClick={toggleSortOrder}
                className="px-3 py-3 bg-bg-secondary border border-border-subtle rounded-xl text-fg-primary hover:border-white/30 transition-all flex items-center gap-2"
                title={sortOrder === "asc" ? "Ascending" : "Descending"}
              >
                {sortOrder === "asc" ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Status Filter Row */}
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

        {/* Bulk Selection Header */}
        {applications.length > 0 && (
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={toggleSelectAll}
              className="flex items-center gap-2 px-3 py-2 bg-bg-secondary border border-border-subtle rounded-lg text-fg-secondary hover:text-fg-primary hover:border-white/30 transition-all"
            >
              {allSelected ? (
                <CheckSquare className="w-4 h-4 text-amber-400" />
              ) : someSelected ? (
                <div className="w-4 h-4 border-2 border-amber-400 rounded bg-amber-400/20" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <span className="text-sm">
                {allSelected ? "Deselect All" : "Select All"}
              </span>
            </button>
            {pagination && (
              <p className="text-sm text-fg-muted">
                Showing {applications.length} of {pagination.totalCount} applications
              </p>
            )}
          </div>
        )}

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
              applications.map((app, index) => {
                const isSelected = selectedIds.has(app._id);
                return (
                  <motion.div
                    key={app._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.03 }}
                    className={`bg-bg-secondary border rounded-2xl p-6 hover:border-white/20 transition-all ${
                      isSelected ? "border-amber-400/50 bg-amber-400/5" : "border-border-subtle"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelect(app._id);
                        }}
                        className="mt-1 shrink-0"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-5 h-5 text-amber-400" />
                        ) : (
                          <Square className="w-5 h-5 text-fg-muted hover:text-fg-primary transition-colors" />
                        )}
                      </button>

                      {/* Content - clickable */}
                      <div
                        className="flex-1 min-w-0 cursor-pointer"
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
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-border-subtle">
            <div className="flex items-center gap-2">
              <span className="text-sm text-fg-muted">Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="px-3 py-1.5 bg-bg-secondary border border-border-subtle rounded-lg text-fg-primary text-sm focus:outline-none focus:border-white/50 transition-all"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-fg-muted">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setPage(1)}
                  disabled={pagination.currentPage === 1}
                  className="p-2 bg-bg-secondary border border-border-subtle rounded-lg text-fg-secondary hover:text-fg-primary hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={pagination.currentPage === 1}
                  className="p-2 bg-bg-secondary border border-border-subtle rounded-lg text-fg-secondary hover:text-fg-primary hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="p-2 bg-bg-secondary border border-border-subtle rounded-lg text-fg-secondary hover:text-fg-primary hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPage(pagination.totalPages)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="p-2 bg-bg-secondary border border-border-subtle rounded-lg text-fg-secondary hover:text-fg-primary hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Bulk Action Bar */}
      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
          >
            <div className="bg-bg-secondary border border-border-subtle rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-fg-primary font-medium">
                  {selectedIds.size} selected
                </span>
                <button
                  onClick={() => setSelectedIds(new Set())}
                  className="p-1 text-fg-muted hover:text-fg-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="h-6 w-px bg-border-subtle" />

              <div className="flex items-center gap-2">
                <span className="text-sm text-fg-muted">Set status:</span>
                {(["pending", "reviewing", "accepted", "rejected"] as const).map((status) => {
                  const config = statusConfig[status];
                  return (
                    <button
                      key={status}
                      onClick={() => handleBulkStatusUpdate(status)}
                      disabled={bulkUpdating}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 disabled:opacity-50 ${config.bg} ${config.border} ${config.color} border hover:brightness-110`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  );
                })}
              </div>

              {bulkUpdating && (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

