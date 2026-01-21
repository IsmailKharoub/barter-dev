"use client";

import { motion } from "framer-motion";
import type { AnimationProps } from "./types";

const lanes = [
  { key: "lane-0", label: "Lane A", tint: "#10B981", status: "verified" as const, baseY: 28 },
  { key: "lane-1", label: "Lane B", tint: "#10B981", status: "verified" as const, baseY: 48 },
  { key: "lane-2", label: "Lane C", tint: "#EF4444", status: "flagged" as const, baseY: 68 },
];

function Backdrop() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-linear-to-br from-bg-secondary via-bg-secondary to-bg-tertiary/35" />
      <div className="absolute inset-0 opacity-35">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Road-like dashed guides */}
          {[28, 48, 68].map((y) => (
            <path
              key={`guide-${y}`}
              d={`M 6 ${y} H 94`}
              fill="none"
              stroke="var(--fg-muted)"
              strokeWidth="0.9"
              strokeDasharray="3 6"
              opacity="0.35"
            />
          ))}
          {/* Subtle grid */}
          {[18, 32, 46, 60, 74, 88].map((x) => (
            <line
              key={`v-${x}`}
              x1={x}
              y1="10"
              x2={x}
              y2="92"
              stroke="var(--fg-muted)"
              strokeWidth="0.35"
              opacity="0.25"
            />
          ))}
        </svg>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_60%,rgba(16,185,129,0.10),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(239,68,68,0.12),transparent_55%)]" />
    </div>
  );
}

function Lane({
  y,
  tint,
  status,
  isHovered,
  delay,
  shouldAnimate,
}: {
  y: number;
  tint: string;
  status: "verified" | "flagged";
  isHovered: boolean;
  delay: number;
  shouldAnimate: boolean;
}) {
  const travel = isHovered ? 72 : 60;
  const duration = isHovered ? 3.0 : 4.1;
  const isFlagged = status === "flagged";

  return (
    <div className="absolute start-4 end-[38%]" style={{ top: `${y}%` }}>
      {/* Lane bar */}
      <motion.div
        className="relative h-4 rounded-full border border-border-subtle bg-bg-primary/35 backdrop-blur-sm overflow-hidden"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, type: "spring", stiffness: 240, damping: 22 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: isFlagged
              ? "linear-gradient(90deg, rgba(239,68,68,0.18), rgba(239,68,68,0.05))"
              : "linear-gradient(90deg, rgba(16,185,129,0.18), rgba(16,185,129,0.05))",
          }}
          animate={shouldAnimate ? { opacity: [0.55, 0.9, 0.55] } : undefined}
          transition={shouldAnimate ? { duration: 2.4, repeat: Infinity } : undefined}
        />

        {/* Moving vehicle block */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-8 w-10 rounded-xl border shadow-lg"
          style={{
            left: "6%",
            borderColor: `${tint}55`,
            backgroundColor: `${tint}18`,
          }}
          animate={
            shouldAnimate
              ? {
                  x: [0, `${travel}%`, `${travel}%`],
                  scale: isHovered ? [1, 1.04, 1] : [1, 1.02, 1],
                }
              : undefined
          }
          transition={
            shouldAnimate
              ? {
                  duration,
                  repeat: Infinity,
                  repeatDelay: 0.4,
                  delay: delay * 0.4,
                  ease: "easeInOut",
                }
              : undefined
          }
        >
          <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.16),transparent_60%)]" />
          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/25" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/25" />
        </motion.div>

        {/* Endpoint */}
        <div className="absolute end-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-white/15 bg-white/5" />
      </motion.div>
    </div>
  );
}

function DocsPanel({ isHovered, shouldAnimate }: { isHovered: boolean; shouldAnimate: boolean }) {
  return (
    <motion.div
      className="absolute end-4 top-10 w-[clamp(140px,34%,230px)] rounded-2xl border border-border-subtle bg-bg-primary/55 backdrop-blur-sm p-3 shadow-xl"
      initial={{ x: 14, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 220, damping: 22 }}
    >
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-semibold tracking-wider uppercase text-white/75">
          Documents
        </div>
        <motion.div
          className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5"
          animate={shouldAnimate && isHovered ? { opacity: [0.7, 1, 0.7] } : {}}
          transition={shouldAnimate ? { duration: 1.2, repeat: Infinity } : undefined}
        >
          <span className="text-[10px] font-bold text-success">Verified</span>
        </motion.div>
      </div>

      <div className="mt-3 space-y-2">
        {[
          { label: "eBOL", ok: true },
          { label: "COA", ok: true },
          { label: "GPS Proof", ok: false },
        ].map((row, i) => (
          <motion.div
            key={row.label}
            className="flex items-center justify-between rounded-xl border border-border-subtle bg-bg-secondary/40 px-2.5 py-2"
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.32 + i * 0.08 }}
          >
            <span className="text-[11px] font-semibold text-white/75">{row.label}</span>
            <motion.div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: row.ok ? "#10B981" : "#EF4444" }}
              animate={shouldAnimate && !row.ok && isHovered ? { opacity: [1, 0.4, 1] } : {}}
              transition={shouldAnimate ? { duration: 0.7, repeat: Infinity } : undefined}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function AlertChip({ isHovered, shouldAnimate }: { isHovered: boolean; shouldAnimate: boolean }) {
  return (
    <motion.div
      className="absolute start-4 top-10"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.25 }}
    >
      <motion.div
        className="inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1.5 backdrop-blur-sm"
        animate={
          shouldAnimate && isHovered
            ? { borderColor: ["rgba(239,68,68,0.25)", "rgba(239,68,68,0.6)", "rgba(239,68,68,0.25)"] }
            : {}
        }
        transition={shouldAnimate ? { duration: 1.4, repeat: Infinity } : undefined}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-red-500"
          animate={shouldAnimate ? { opacity: [1, 0.45, 1] } : undefined}
          transition={shouldAnimate ? { duration: 0.7, repeat: Infinity } : undefined}
        />
        <span className="text-[10px] font-semibold tracking-wider uppercase text-red-200">
          Flag: GPS mismatch
        </span>
      </motion.div>
    </motion.div>
  );
}

function StatusPill({ isHovered, shouldAnimate }: { isHovered: boolean; shouldAnimate: boolean }) {
  return (
    <motion.div
      className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-border-subtle bg-bg-primary/55 backdrop-blur-sm px-3 py-1.5"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.35 }}
    >
      <div className="flex items-center gap-2">
        <motion.div
          className="w-2 h-2 rounded-full bg-success"
          animate={shouldAnimate ? { scale: [1, 1.2, 1], opacity: [0.65, 1, 0.65] } : undefined}
          transition={shouldAnimate ? { duration: 1.2, repeat: Infinity } : undefined}
        />
        <span className="text-[10px] font-semibold tracking-wider uppercase text-white/80">
          {isHovered ? "Live tracking" : "Monitoring"}
        </span>
        <span className="text-[10px] font-bold text-success">Verified</span>
        <span className="text-[10px] font-bold text-red-300">12 flagged</span>
      </div>
    </motion.div>
  );
}

export function FleetAnimation({ isHovered = false, shouldAnimate = true }: AnimationProps) {
  return (
    <div className="w-full h-full relative overflow-hidden bg-bg-secondary">
      <Backdrop />

      {/* Safe padding: avoid top-left badge and bottom fade */}
      <div className="absolute inset-0 pt-10 pb-10">
        <AlertChip isHovered={isHovered} shouldAnimate={shouldAnimate} />

        {/* Lanes + moving vehicles */}
        {lanes.map((lane, i) => (
          <Lane
            key={lane.key}
            y={lane.baseY}
            tint={lane.tint}
            status={lane.status}
            isHovered={isHovered}
            delay={0.12 + i * 0.08}
            shouldAnimate={shouldAnimate}
          />
        ))}

        <DocsPanel isHovered={isHovered} shouldAnimate={shouldAnimate} />
        <StatusPill isHovered={isHovered} shouldAnimate={shouldAnimate} />
      </div>
    </div>
  );
}

