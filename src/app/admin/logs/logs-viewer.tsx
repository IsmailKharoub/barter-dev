"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Filter, AlertCircle, Info, AlertTriangle, Bug, ChevronDown, ChevronUp } from "lucide-react";

interface LogEntry {
  _id: string;
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  context: string;
  message: string;
  data?: Record<string, any>;
  requestId?: string;
  ipAddress?: string;
  userAgent?: string;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

const levelColors = {
  info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  warn: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  error: "bg-red-500/10 text-red-400 border-red-500/20",
  debug: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

const levelIcons = {
  info: Info,
  warn: AlertTriangle,
  error: AlertCircle,
  debug: Bug,
};

export function LogsViewer() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());
  
  // Filters
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [contextFilter, setContextFilter] = useState<string>("all");
  const [hoursFilter, setHoursFilter] = useState<number>(24);
  const [limitFilter, setLimitFilter] = useState<number>(100);

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      if (levelFilter !== "all") params.append("level", levelFilter);
      if (contextFilter !== "all") params.append("context", contextFilter);
      params.append("hours", hoursFilter.toString());
      params.append("limit", limitFilter.toString());

      const response = await fetch(`/api/admin/logs?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch logs");
      }

      const result = await response.json();
      setLogs(result.logs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch logs");
      console.error("Error fetching logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [levelFilter, contextFilter, hoursFilter, limitFilter]);

  const toggleExpanded = (logId: string) => {
    const newExpanded = new Set(expandedLogs);
    if (newExpanded.has(logId)) {
      newExpanded.delete(logId);
    } else {
      newExpanded.add(logId);
    }
    setExpandedLogs(newExpanded);
  };

  const contexts = [...new Set(logs.map(log => log.context))];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">System Logs</h1>
          <p className="text-stone-400">
            Monitor application errors, warnings, and important events
          </p>
        </div>

        {/* Filters */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-stone-400" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-stone-400 mb-2">
                Level
              </label>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Levels</option>
                <option value="error">Errors</option>
                <option value="warn">Warnings</option>
                <option value="info">Info</option>
                <option value="debug">Debug</option>
              </select>
            </div>

            {/* Context Filter */}
            <div>
              <label className="block text-sm font-medium text-stone-400 mb-2">
                Context
              </label>
              <select
                value={contextFilter}
                onChange={(e) => setContextFilter(e.target.value)}
                className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Contexts</option>
                {contexts.map((context) => (
                  <option key={context} value={context}>
                    {context}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Range */}
            <div>
              <label className="block text-sm font-medium text-stone-400 mb-2">
                Time Range
              </label>
              <select
                value={hoursFilter}
                onChange={(e) => setHoursFilter(Number(e.target.value))}
                className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value={1}>Last Hour</option>
                <option value={6}>Last 6 Hours</option>
                <option value={24}>Last 24 Hours</option>
                <option value={72}>Last 3 Days</option>
                <option value={168}>Last Week</option>
              </select>
            </div>

            {/* Limit */}
            <div>
              <label className="block text-sm font-medium text-stone-400 mb-2">
                Limit
              </label>
              <select
                value={limitFilter}
                onChange={(e) => setLimitFilter(Number(e.target.value))}
                className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value={50}>50 logs</option>
                <option value={100}>100 logs</option>
                <option value={200}>200 logs</option>
                <option value={500}>500 logs</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              onClick={fetchLogs}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-stone-400 mb-2" />
            <p className="text-stone-400">Loading logs...</p>
          </div>
        )}

        {/* Logs List */}
        {!loading && logs.length === 0 && (
          <div className="text-center py-12 bg-stone-900 border border-stone-800 rounded-lg">
            <p className="text-stone-400">No logs found for the selected filters</p>
          </div>
        )}

        {!loading && logs.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <p className="text-stone-400">
                Showing {logs.length} log{logs.length !== 1 ? "s" : ""}
              </p>
            </div>

            {logs.map((log) => {
              const Icon = levelIcons[log.level];
              const isExpanded = expandedLogs.has(log._id);

              return (
                <div
                  key={log._id}
                  className={`bg-stone-900 border rounded-lg overflow-hidden ${levelColors[log.level]}`}
                >
                  <div
                    className="p-4 cursor-pointer hover:bg-stone-800/50 transition-colors"
                    onClick={() => toggleExpanded(log._id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-stone-500">
                              {new Date(log.timestamp).toLocaleString()}
                            </span>
                            <span className="text-xs font-mono px-2 py-0.5 bg-stone-800 rounded">
                              {log.context}
                            </span>
                            {log.requestId && (
                              <span className="text-xs font-mono text-stone-500">
                                {log.requestId}
                              </span>
                            )}
                          </div>
                          
                          <p className="font-medium">{log.message}</p>
                          
                          {log.error && (
                            <div className="mt-2 text-sm text-red-400">
                              <span className="font-mono">{log.error.name}: {log.error.message}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-stone-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-stone-400 flex-shrink-0" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-stone-800 p-4 bg-stone-950/50">
                      {/* Request Details */}
                      {(log.ipAddress || log.userAgent) && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-stone-400 mb-2">Request Info</h4>
                          {log.ipAddress && (
                            <p className="text-sm font-mono text-stone-300">IP: {log.ipAddress}</p>
                          )}
                          {log.userAgent && (
                            <p className="text-sm font-mono text-stone-300 truncate">UA: {log.userAgent}</p>
                          )}
                        </div>
                      )}

                      {/* Data */}
                      {log.data && Object.keys(log.data).length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-stone-400 mb-2">Data</h4>
                          <pre className="text-xs font-mono bg-stone-900 p-3 rounded border border-stone-800 overflow-x-auto">
                            {JSON.stringify(log.data, null, 2)}
                          </pre>
                        </div>
                      )}

                      {/* Stack Trace */}
                      {log.error?.stack && (
                        <div>
                          <h4 className="text-sm font-semibold text-stone-400 mb-2">Stack Trace</h4>
                          <pre className="text-xs font-mono bg-stone-900 p-3 rounded border border-stone-800 overflow-x-auto whitespace-pre-wrap">
                            {log.error.stack}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

