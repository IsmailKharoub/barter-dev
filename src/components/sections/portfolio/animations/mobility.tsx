"use client";

import { motion } from "framer-motion";
import type { AnimationProps } from "./types";

const routePoints = [
  { x: 12, y: 72 },
  { x: 26, y: 52 },
  { x: 42, y: 32 },
  { x: 64, y: 30 },
  { x: 78, y: 45 },
  { x: 90, y: 66 },
];

const storySteps = [
  { label: "Locate", color: "text-white", times: [0, 0.06, 0.22, 0.28] },
  { label: "Unlock", color: "text-gray-300", times: [0.24, 0.3, 0.46, 0.52] },
  { label: "Ride", color: "text-white", times: [0.5, 0.56, 0.72, 0.78] },
  { label: "Charge", color: "text-gray-400", times: [0.76, 0.82, 0.96, 1] },
];

function MapBackdrop() {
  return (
    <div className="absolute inset-4">
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

      <motion.div
        className="absolute top-[16%] left-[8%] w-[28%] h-[26%] rounded bg-bg-tertiary/40 border border-border-subtle/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />
      <motion.div
        className="absolute top-[58%] left-[32%] w-[24%] h-[26%] rounded bg-bg-tertiary/40 border border-border-subtle/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />
      <motion.div
        className="absolute top-[12%] right-[12%] w-[24%] h-[34%] rounded bg-bg-tertiary/40 border border-border-subtle/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      />
      <motion.div
        className="absolute bottom-[14%] right-[8%] w-[20%] h-[20%] rounded bg-bg-tertiary/30 border border-border-subtle/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
    </div>
  );
}

function DemandPulse({
  x,
  y,
  color,
  delay,
}: {
  x: number;
  y: number;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute w-3 h-3 rounded-full"
      style={{ left: `${x}%`, top: `${y}%`, backgroundColor: color }}
      animate={{ scale: [1, 2.8], opacity: [0.6, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, delay }}
    />
  );
}

function RouteLayer({ isHovered }: { isHovered: boolean }) {
  const duration = isHovered ? 5 : 7;

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
      <motion.path
        d="M12 72 C22 52, 36 40, 50 34 S78 34, 90 66"
        fill="none"
        stroke="rgba(245, 158, 11, 0.5)"
        strokeWidth="1.2"
        strokeDasharray="4 6"
        initial={{ strokeDashoffset: 40 }}
        animate={{ strokeDashoffset: [40, 0] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M12 72 C22 52, 36 40, 50 34 S78 34, 90 66"
        fill="none"
        stroke="rgba(16, 185, 129, 0.6)"
        strokeWidth="1.8"
        strokeDasharray="16 80"
        animate={{ strokeDashoffset: [96, 0] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle
        r="2.6"
        fill="rgba(16, 185, 129, 0.9)"
        stroke="rgba(16, 185, 129, 0.3)"
        strokeWidth="2"
        animate={{
          cx: routePoints.map((point) => point.x),
          cy: routePoints.map((point) => point.y),
        }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="12"
        cy="72"
        r="5"
        fill="rgba(16, 185, 129, 0.15)"
        animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
      <motion.circle
        cx="90"
        cy="66"
        r="5"
        fill="rgba(99, 102, 241, 0.2)"
        animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 0.6 }}
      />
    </svg>
  );
}

function StoryRibbon() {
  return (
    <div className="absolute top-3 left-3 flex items-center gap-1.5">
      {storySteps.map((step) => (
        <motion.div
          key={step.label}
          className={`px-2 py-0.5 rounded-full border border-border-subtle bg-bg-primary/70 text-[9px] font-mono uppercase tracking-wide ${step.color}`}
          animate={{ opacity: [0, 1, 1, 0], y: [4, 0, 0, -4] }}
          transition={{ duration: 8, repeat: Infinity, times: step.times }}
        >
          {step.label}
        </motion.div>
      ))}
    </div>
  );
}

function PhonePanel({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      className="absolute right-3 top-10 w-14 h-24 rounded-xl bg-bg-primary border border-border-default shadow-xl overflow-hidden"
      initial={{ x: 24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="h-full flex flex-col p-2 gap-1">
        <div className="flex justify-between items-center">
          <div className="w-4 h-1 bg-fg-muted/30 rounded" />
          <div className="w-1.5 h-1.5 bg-success rounded-full" />
        </div>
        <div className="flex-1 rounded-lg bg-bg-secondary border border-border-subtle p-1.5 flex flex-col gap-1">
          <motion.div
            className="h-2 rounded bg-white/30"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="h-2 rounded bg-gray-400/30"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
          <motion.div
            className="h-2 rounded bg-white/25"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
          <div className="mt-auto text-[7px] font-mono text-fg-muted">
            ETA 04:12
          </div>
        </div>
        <motion.div
          className="h-3 rounded bg-success/70 flex items-center justify-center"
          animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <span className="text-[6px] font-bold text-white">START RIDE</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function OpsPanel({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      className="absolute left-3 bottom-3 flex flex-col gap-1.5"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      {[
        { label: "Trips/hr", value: "128", color: "#10B981" },
        { label: "Utilization", value: "74%", color: "#FFFFFF" },
        { label: "Battery", value: "92%", color: "#6366F1" },
      ].map((stat, i) => (
        <motion.div
          key={stat.label}
          className="flex items-center gap-2 px-2 py-1 bg-bg-tertiary/80 rounded border border-border-subtle backdrop-blur-sm"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.1 }}
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

function ChargingDock() {
  return (
    <motion.div
      className="absolute right-3 bottom-3 w-20 h-10 rounded-lg bg-bg-tertiary/70 border border-border-subtle px-2 py-1"
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      <div className="text-[7px] font-mono text-fg-muted">Dock 12</div>
      <div className="mt-1 flex items-end gap-1 h-4">
        {[40, 60, 80, 100].map((fill, i) => (
          <motion.div
            key={fill}
            className="w-2 rounded-sm bg-white/50"
            style={{ height: `${fill}%` }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function MobilityAnimation({ isHovered = false }: AnimationProps) {
  return (
    <div className="w-full h-full relative overflow-hidden bg-bg-secondary/50">
      <MapBackdrop />

      <DemandPulse x={18} y={20} color="#10B981" delay={0} />
      <DemandPulse x={72} y={18} color="#06B6D4" delay={0.4} />
      <DemandPulse x={64} y={72} color="#6366F1" delay={0.8} />

      <RouteLayer isHovered={isHovered} />
      <StoryRibbon />
      <PhonePanel isHovered={isHovered} />
      <OpsPanel isHovered={isHovered} />
      <ChargingDock />
    </div>
  );
}

