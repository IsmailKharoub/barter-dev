"use client";

import { motion } from "framer-motion";
import type { AnimationProps } from "./types";

const trucks = [
  { id: "TRK-001", route: 0, status: "verified" },
  { id: "TRK-002", route: 1, status: "verified" },
  { id: "TRK-003", route: 2, status: "flagged" },
];

function Truck({ 
  route, 
  status, 
  isHovered 
}: { 
  route: number; 
  status: string;
  isHovered: boolean;
}) {
  const yPosition = 20 + route * 35;
  const isFlagged = status === "flagged";
  
  return (
    <motion.div
      className="absolute flex items-center"
      style={{ top: `${yPosition}%`, left: 0 }}
      initial={{ x: -20 }}
      animate={{ 
        x: isHovered ? [0, 70, 70] : [0, 50, 50],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatDelay: route * 0.5,
        ease: "easeInOut",
      }}
    >
      {/* Truck */}
      <motion.div className="relative">
        <span className="text-lg">🚛</span>
        
        {/* Status indicator */}
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full border border-bg-primary"
          style={{ backgroundColor: isFlagged ? "#EF4444" : "#10B981" }}
          animate={isFlagged ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Trail */}
      <motion.div
        className="absolute right-full h-[2px] w-8"
        style={{ 
          background: isFlagged 
            ? "linear-gradient(90deg, transparent, #EF4444)" 
            : "linear-gradient(90deg, transparent, #10B981)" 
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.div>
  );
}

function RouteLines() {
  return (
    <svg className="absolute left-0 top-0 w-1/2 h-full opacity-30">
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1="0"
          y1={`${25 + i * 35}%`}
          x2="100%"
          y2={`${25 + i * 35}%`}
          stroke="var(--fg-muted)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}
    </svg>
  );
}

function DocumentPanel({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      className="absolute right-3 top-3 w-24 bg-bg-tertiary/90 rounded-lg border border-border-subtle overflow-hidden backdrop-blur-sm"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {/* Header */}
      <div className="px-2 py-1.5 border-b border-border-subtle flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-success" />
        <span className="text-[8px] font-mono text-fg-muted uppercase">Certificates</span>
      </div>

      {/* Document list */}
      <div className="p-2 space-y-1.5">
        {["DEL-2847", "DEL-2848", "DEL-2849"].map((id, i) => (
          <motion.div
            key={id}
            className="flex items-center gap-1.5 p-1.5 bg-bg-secondary rounded border border-border-subtle"
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            {/* Document icon */}
            <motion.div
              className="w-4 h-5 bg-bg-primary rounded-sm border border-border-subtle flex flex-col items-center justify-center gap-0.5"
              animate={isHovered && i === 0 ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {[0, 1, 2].map((line) => (
                <div key={line} className="w-2 h-0.5 bg-fg-muted/30 rounded" />
              ))}
            </motion.div>

            {/* Document info */}
            <div className="flex-1 min-w-0">
              <div className="text-[7px] font-mono text-fg-secondary truncate">{id}</div>
              <div className="flex items-center gap-1">
                <motion.div
                  className="w-1 h-1 rounded-full bg-success"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
                <span className="text-[6px] font-mono text-success">SIGNED</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function FraudAlert({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      className="absolute right-3 bottom-3 w-24"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <motion.div
        className="bg-red-500/10 rounded-lg border border-red-500/30 p-2 backdrop-blur-sm"
        animate={isHovered ? { 
          borderColor: ["rgba(239,68,68,0.3)", "rgba(239,68,68,0.8)", "rgba(239,68,68,0.3)"],
          boxShadow: ["0 0 0 0 rgba(239,68,68,0)", "0 0 20px 4px rgba(239,68,68,0.2)", "0 0 0 0 rgba(239,68,68,0)"]
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {/* Alert header */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <motion.div
            className="w-2 h-2 rounded-full bg-red-500"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          <span className="text-[8px] font-mono text-red-400 font-bold uppercase">Fraud Alert</span>
        </div>

        {/* Alert details */}
        <div className="space-y-1 text-[7px] font-mono text-red-300/80">
          <div className="flex justify-between">
            <span>Vehicle:</span>
            <span className="text-red-400">TRK-003</span>
          </div>
          <div className="flex justify-between">
            <span>Issue:</span>
            <span className="text-red-400">GPS Mismatch</span>
          </div>
          <div className="flex justify-between">
            <span>Cert:</span>
            <span className="text-red-400">DEL-2850</span>
          </div>
        </div>

        {/* Action button */}
        <motion.div
          className="mt-2 py-1 bg-red-500/20 rounded text-center"
          animate={isHovered ? { backgroundColor: ["rgba(239,68,68,0.2)", "rgba(239,68,68,0.4)", "rgba(239,68,68,0.2)"] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <span className="text-[7px] font-mono text-red-400 font-bold">INVESTIGATE</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function StatusBar({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      className="absolute left-3 bottom-3 flex flex-col gap-1"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      {[
        { label: "Verified", count: "2,847", color: "#10B981" },
        { label: "Flagged", count: "12", color: "#EF4444" },
      ].map((item, i) => (
        <div
          key={item.label}
          className="flex items-center gap-1.5 px-2 py-1 bg-bg-tertiary/80 rounded border border-border-subtle backdrop-blur-sm"
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
          <span className="text-[8px] font-mono text-fg-muted">{item.label}</span>
          <motion.span
            className="text-[9px] font-mono font-bold"
            style={{ color: item.color }}
            animate={isHovered && i === 1 ? { opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            {item.count}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
}

export function FleetAnimation({ isHovered = false }: AnimationProps) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Route lines */}
      <RouteLines />

      {/* Trucks */}
      {trucks.map((truck, i) => (
        <Truck
          key={truck.id}
          route={truck.route}
          status={truck.status}
          isHovered={isHovered}
        />
      ))}

      {/* Document panel */}
      <DocumentPanel isHovered={isHovered} />

      {/* Fraud alert */}
      <FraudAlert isHovered={isHovered} />

      {/* Status bar */}
      <StatusBar isHovered={isHovered} />
    </div>
  );
}

