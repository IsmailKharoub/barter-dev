"use client";

import { motion } from "framer-motion";
import type { AnimationProps } from "./types";

const scooters = [
  { x: 15, y: 25, status: "available" },
  { x: 55, y: 15, status: "available" },
  { x: 75, y: 55, status: "in-use" },
  { x: 25, y: 65, status: "available" },
  { x: 45, y: 45, status: "low-battery" },
];

function MapGrid() {
  return (
    <div className="absolute inset-4">
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`v-${i}`}
            x1={`${20 * i + 10}%`}
            y1="0"
            x2={`${20 * i + 10}%`}
            y2="100%"
            stroke="var(--fg-muted)"
            strokeWidth="0.5"
          />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={`${25 * i + 12.5}%`}
            x2="100%"
            y2={`${25 * i + 12.5}%`}
            stroke="var(--fg-muted)"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      {/* Street blocks */}
      <motion.div
        className="absolute top-[20%] left-[10%] w-[25%] h-[30%] rounded bg-bg-tertiary/40 border border-border-subtle/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />
      <motion.div
        className="absolute top-[60%] left-[35%] w-[20%] h-[25%] rounded bg-bg-tertiary/40 border border-border-subtle/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />
      <motion.div
        className="absolute top-[10%] right-[15%] w-[22%] h-[35%] rounded bg-bg-tertiary/40 border border-border-subtle/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      />
    </div>
  );
}

function ScooterMarker({ 
  x, 
  y, 
  status, 
  index,
  isHovered 
}: { 
  x: number; 
  y: number; 
  status: string;
  index: number;
  isHovered: boolean;
}) {
  const statusColors = {
    "available": "#10B981",
    "in-use": "#F59E0B",
    "low-battery": "#EF4444",
  };
  const color = statusColors[status as keyof typeof statusColors];

  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        x: isHovered && status === "in-use" ? [0, 8, 12, 8, 0] : 0,
        y: isHovered && status === "in-use" ? [0, -4, 0, 4, 0] : 0,
      }}
      transition={{ 
        scale: { delay: index * 0.1, type: "spring" },
        x: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {/* Pulse for available scooters */}
      {status === "available" && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ scale: [1, 2], opacity: [0.4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      
      {/* Scooter icon */}
      <motion.div
        className="relative w-6 h-6 rounded-full flex items-center justify-center border-2 shadow-lg"
        style={{ 
          backgroundColor: `${color}30`,
          borderColor: color,
        }}
        whileHover={{ scale: 1.2 }}
      >
        <span className="text-[10px]">🛴</span>
      </motion.div>
      
      {/* Status indicator */}
      <motion.div
        className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-bg-primary"
        style={{ backgroundColor: color }}
        animate={status === "low-battery" ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </motion.div>
  );
}

function PhoneUnlock({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      className="absolute right-3 bottom-3 w-12 h-20 rounded-lg bg-bg-primary border border-border-default shadow-xl overflow-hidden"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      {/* Phone screen */}
      <div className="h-full flex flex-col p-1.5 gap-1">
        {/* Status bar */}
        <div className="flex justify-between items-center px-0.5">
          <div className="w-3 h-1 bg-fg-muted/30 rounded" />
          <div className="flex gap-0.5">
            <div className="w-1 h-1 bg-success rounded-full" />
          </div>
        </div>

        {/* Scooter card */}
        <motion.div
          className="flex-1 bg-bg-secondary rounded p-1 flex flex-col items-center justify-center gap-1"
          animate={isHovered ? { borderColor: ["rgba(16,185,129,0.3)", "rgba(16,185,129,0.8)", "rgba(16,185,129,0.3)"] } : {}}
          style={{ border: "1px solid rgba(16,185,129,0.3)" }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-sm">🛴</span>
          
          {/* QR/Unlock indicator */}
          <motion.div
            className="w-5 h-5 rounded border-2 border-dashed border-fg-muted/40 flex items-center justify-center"
            animate={isHovered ? { borderColor: "#10B981", borderStyle: "solid" } : {}}
          >
            <motion.div
              className="w-2 h-2 rounded-sm bg-success"
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ delay: 0.3 }}
            />
          </motion.div>
          
          <motion.div
            className="text-[6px] font-mono text-success font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            UNLOCKED
          </motion.div>
        </motion.div>

        {/* Bottom button */}
        <motion.div
          className="h-3 rounded-sm flex items-center justify-center"
          style={{ backgroundColor: isHovered ? "#10B981" : "rgba(16,185,129,0.3)" }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-[5px] font-bold text-white">
            {isHovered ? "RIDE" : "SCAN"}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function FleetStats({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      className="absolute left-3 bottom-3 flex flex-col gap-1"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      {[
        { label: "Active", value: "847", color: "#10B981" },
        { label: "In Use", value: "312", color: "#F59E0B" },
      ].map((stat, i) => (
        <motion.div
          key={stat.label}
          className="flex items-center gap-1.5 px-2 py-1 bg-bg-tertiary/80 rounded border border-border-subtle backdrop-blur-sm"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.9 + i * 0.1 }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stat.color }} />
          <span className="text-[8px] font-mono text-fg-muted">{stat.label}</span>
          <motion.span
            className="text-[9px] font-mono font-bold"
            style={{ color: stat.color }}
            animate={isHovered ? { opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          >
            {stat.value}
          </motion.span>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function MobilityAnimation({ isHovered = false }: AnimationProps) {
  return (
    <div className="w-full h-full relative overflow-hidden bg-bg-secondary/50">
      {/* Map background */}
      <MapGrid />

      {/* Scooter markers */}
      {scooters.map((scooter, i) => (
        <ScooterMarker
          key={i}
          x={scooter.x}
          y={scooter.y}
          status={scooter.status}
          index={i}
          isHovered={isHovered}
        />
      ))}

      {/* Phone unlock UI */}
      <PhoneUnlock isHovered={isHovered} />

      {/* Fleet stats */}
      <FleetStats isHovered={isHovered} />
    </div>
  );
}

