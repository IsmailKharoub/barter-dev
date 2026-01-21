"use client";

import { motion } from "framer-motion";
import type { AnimationProps } from "./types";

const patients = [
  { id: "P-001", name: "Patient A", status: "completed", time: "09:15" },
  { id: "P-002", name: "Patient B", status: "current", time: "09:45" },
  { id: "P-003", name: "Patient C", status: "waiting", time: "10:15" },
  { id: "P-004", name: "Patient D", status: "waiting", time: "10:45" },
];

function PatientQueueItem({ 
  patient, 
  index, 
  isHovered 
}: { 
  patient: typeof patients[0]; 
  index: number;
  isHovered: boolean;
}) {
  const statusColors = {
    completed: { bg: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.4)", dot: "#10B981" },
    current: { bg: "rgba(255,255,255,0.1)", border: "rgba(255,255,255,0.5)", dot: "#FFFFFF" },
    waiting: { bg: "rgba(120,113,108,0.1)", border: "rgba(120,113,108,0.3)", dot: "#78716C" },
  };
  const colors = statusColors[patient.status as keyof typeof statusColors];

  return (
    <motion.div
      className="flex items-center gap-2 p-2 rounded-lg border"
      style={{ backgroundColor: colors.bg, borderColor: colors.border }}
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.12 }}
    >
      {/* Status dot */}
      <motion.div
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: colors.dot }}
        animate={patient.status === "current" ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      />

      {/* Patient info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-mono text-fg-secondary">{patient.id}</span>
          <span className="text-[8px] font-mono text-fg-muted">{patient.time}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-bg-tertiary flex items-center justify-center">
            <span className="text-[8px]">👤</span>
          </div>
          <span className="text-[8px] text-fg-muted truncate">{patient.name}</span>
        </div>
      </div>

      {/* Status badge */}
      {patient.status === "completed" && (
        <motion.div
          className="text-[7px] font-mono text-success px-1.5 py-0.5 bg-success/20 rounded"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.12 + 0.3, type: "spring" }}
        >
          ✓
        </motion.div>
      )}
      {patient.status === "current" && (
        <motion.div
          className="text-[7px] font-mono text-accent-primary px-1.5 py-0.5 bg-accent-primary/20 rounded"
          animate={isHovered ? { opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          NOW
        </motion.div>
      )}
    </motion.div>
  );
}

function QueuePanel({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      className="absolute left-3 top-3 bottom-3 w-32 bg-bg-tertiary/90 rounded-xl border border-border-subtle overflow-hidden backdrop-blur-sm"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header */}
      <div className="p-2 border-b border-border-subtle">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-mono text-fg-secondary uppercase tracking-wider">Queue</span>
          <motion.div
            className="px-1.5 py-0.5 bg-accent-primary/20 rounded text-[8px] font-mono text-accent-primary"
            animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            4
          </motion.div>
        </div>
        <div className="h-1 bg-bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-success to-accent-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "25%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>
      </div>

      {/* Patient list */}
      <div className="p-2 space-y-1.5 overflow-y-auto max-h-[calc(100%-44px)]">
        {patients.map((patient, i) => (
          <PatientQueueItem
            key={patient.id}
            patient={patient}
            index={i}
            isHovered={isHovered}
          />
        ))}
      </div>
    </motion.div>
  );
}

function ConnectionStatus({ isHovered }: { isHovered: boolean }) {
  const isOnline = isHovered;
  
  return (
    <motion.div
      className="absolute right-3 top-3 w-20"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="bg-bg-tertiary/90 rounded-lg border border-border-subtle p-2 backdrop-blur-sm">
        {/* Connection indicator */}
        <div className="flex items-center gap-1.5 mb-2">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: isOnline ? "#FFFFFF" : "#666666" }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: isOnline ? 2 : 0.8, repeat: Infinity }}
          />
          <span className="text-[8px] font-mono text-fg-muted uppercase">
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>

        {/* Data indicator */}
        <div className="flex items-center gap-1 text-[7px] font-mono text-fg-muted">
          <span>📊</span>
          <span>Records:</span>
          <motion.span
            className="text-fg-secondary"
            animate={isHovered ? {} : { opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            247
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

function SyncAnimation({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      className="absolute right-3 bottom-3 w-20"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <motion.div
        className="bg-bg-tertiary/90 rounded-lg border border-border-subtle p-3 backdrop-blur-sm flex flex-col items-center"
        animate={isHovered ? { borderColor: ["rgba(250,248,245,0.1)", "rgba(16,185,129,0.5)", "rgba(250,248,245,0.1)"] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Sync icon */}
        <motion.div
          className="w-8 h-8 rounded-full border-2 border-accent-primary/40 border-t-accent-primary flex items-center justify-center mb-2"
          animate={isHovered ? { rotate: 360 } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <motion.span
            className="text-[10px]"
            animate={isHovered ? { scale: [1, 0.8, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            ☁️
          </motion.span>
        </motion.div>

        {/* Salesforce badge */}
        <div className="flex items-center gap-1 px-2 py-1 bg-[#00A1E0]/10 rounded border border-[#00A1E0]/30">
          <span className="text-[8px] font-bold text-[#00A1E0]">SF</span>
        </div>

        {/* Sync status */}
        <motion.div
          className="mt-1.5 text-[7px] font-mono"
          style={{ color: isHovered ? "#10B981" : "#78716C" }}
        >
          {isHovered ? "Syncing..." : "Pending"}
        </motion.div>

        {/* Progress bar */}
        {isHovered && (
          <motion.div
            className="w-full h-0.5 bg-bg-secondary rounded-full overflow-hidden mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="h-full bg-success rounded-full"
              initial={{ width: 0 }}
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

function MobileClinicBadge() {
  return (
    <motion.div
      className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 bg-bg-tertiary/80 rounded-full border border-border-subtle backdrop-blur-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <span className="text-sm">🏥</span>
      <span className="text-[9px] font-mono text-fg-secondary">Mobile Clinic</span>
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-success"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}

export function MedicalAnimation({ isHovered = false }: AnimationProps) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Mobile clinic badge */}
      <MobileClinicBadge />

      {/* Queue panel */}
      <QueuePanel isHovered={isHovered} />

      {/* Connection status */}
      <ConnectionStatus isHovered={isHovered} />

      {/* Sync animation */}
      <SyncAnimation isHovered={isHovered} />
    </div>
  );
}

