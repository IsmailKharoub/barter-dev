"use client";

import { motion } from "framer-motion";
import type { AnimationProps } from "./types";

const routePoints = [
  { x: 14, y: 70 },
  { x: 24, y: 54 },
  { x: 40, y: 42 },
  { x: 58, y: 38 },
  { x: 74, y: 46 },
  { x: 88, y: 62 },
];

const storyPhases = [
  { label: "Find", tint: "#10B981", times: [0, 0.08, 0.22, 0.3] },
  { label: "Unlock", tint: "#F59E0B", times: [0.24, 0.32, 0.46, 0.54] },
  { label: "Ride", tint: "#FFFFFF", times: [0.5, 0.58, 0.72, 0.8] },
  { label: "Dock", tint: "#6366F1", times: [0.74, 0.82, 0.96, 1] },
];

function Backdrop() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-linear-to-br from-bg-secondary via-bg-secondary to-bg-tertiary/30" />
      <div className="absolute inset-0 opacity-30">
        <svg className="absolute inset-0 w-full h-full">
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`v-${i}`}
              x1={`${20 * i + 10}%`}
              y1="0"
              x2={`${20 * i + 10}%`}
              y2="100%"
              stroke="var(--fg-muted)"
              strokeWidth="0.6"
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
              strokeWidth="0.6"
            />
          ))}
        </svg>
      </div>

      {/* Soft vignette for contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.10),transparent_55%)]" />
    </div>
  );
}

function PulseDot({
  x,
  y,
  color,
  delay,
  size = 10,
}: {
  x: number;
  y: number;
  color: string;
  delay: number;
  size?: number;
}) {
  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: size, height: size, backgroundColor: color }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, delay }}
      />
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: size, height: size, border: `2px solid ${color}` }}
        animate={{ scale: [1, 2.4], opacity: [0.45, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, delay }}
      />
    </div>
  );
}

function RouteLayer({ isHovered }: { isHovered: boolean }) {
  const duration = isHovered ? 3.6 : 5.2;

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="mobilityRoute" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.7" />
          <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Base route */}
      <motion.path
        d="M14 70 C22 54, 36 46, 46 42 S72 34, 88 62"
        fill="none"
        stroke="rgba(255, 255, 255, 0.14)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Animated route highlight */}
      <motion.path
        d="M14 70 C22 54, 36 46, 46 42 S72 34, 88 62"
        fill="none"
        stroke="url(#mobilityRoute)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="14 86"
        animate={{ strokeDashoffset: [100, 0] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />

      {/* Start / end nodes */}
      <motion.circle
        cx="14"
        cy="70"
        r="4.2"
        fill="rgba(16, 185, 129, 0.18)"
        stroke="rgba(16, 185, 129, 0.75)"
        strokeWidth="1.8"
      />
      <motion.circle
        cx="88"
        cy="62"
        r="4.2"
        fill="rgba(99, 102, 241, 0.16)"
        stroke="rgba(99, 102, 241, 0.8)"
        strokeWidth="1.8"
      />

      {/* Vehicle dot */}
      <motion.circle
        r="3.4"
        fill="rgba(255, 255, 255, 0.95)"
        stroke="rgba(16, 185, 129, 0.35)"
        strokeWidth="2"
        animate={{
          cx: routePoints.map((point) => point.x),
          cy: routePoints.map((point) => point.y),
        }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function StoryBar({ isHovered }: { isHovered: boolean }) {
  const duration = isHovered ? 4.8 : 6.6;

  return (
    <div className="absolute start-4 end-4 bottom-4">
      <div className="relative rounded-xl border border-border-subtle bg-bg-primary/55 backdrop-blur-sm px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          {storyPhases.map((phase) => (
            <motion.div
              key={phase.label}
              className="flex-1"
              animate={{ opacity: [0.35, 1, 1, 0.35] }}
              transition={{ duration, repeat: Infinity, times: phase.times }}
            >
              <div className="flex items-center justify-center gap-2">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: phase.tint }}
                />
                <span className="text-[10px] font-semibold tracking-wider uppercase text-white/90">
                  {phase.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress sweep */}
        <motion.div
          className="absolute start-3 end-3 bottom-1 h-[2px] rounded-full bg-white/10 overflow-hidden"
          aria-hidden
        >
          <motion.div
            className="h-full w-1/3 rounded-full"
            style={{ background: "linear-gradient(90deg, rgba(16,185,129,0.9), rgba(255,255,255,0.9), rgba(99,102,241,0.9))" }}
            animate={{ x: ["-40%", "200%"] }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  );
}

function PhonePanel({ isHovered }: { isHovered: boolean }) {
  const duration = isHovered ? 4.8 : 6.6;

  return (
    <motion.div
      className="absolute end-4 top-4 w-[clamp(120px,34%,190px)] aspect-9/16 rounded-2xl bg-bg-primary border border-border-default shadow-xl overflow-hidden"
      initial={{ y: 14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 220, damping: 22 }}
    >
      <div className="h-full flex flex-col p-3 gap-2">
        <div className="flex items-center justify-between">
          <div className="h-1.5 w-10 rounded bg-fg-muted/25" />
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-4 rounded bg-fg-muted/20" />
            <div className="h-1.5 w-4 rounded bg-fg-muted/20" />
            <div className="h-1.5 w-4 rounded bg-fg-muted/20" />
          </div>
        </div>

        {/* Map preview */}
        <div className="relative flex-1 rounded-xl bg-bg-secondary border border-border-subtle overflow-hidden">
          <div className="absolute inset-0 opacity-25">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.25),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.25),transparent_60%)]" />
          </div>

          <div className="absolute inset-0">
            <RouteLayer isHovered={isHovered} />
          </div>

          {/* Phase label */}
          <motion.div
            className="absolute start-2 bottom-2 end-2 rounded-lg bg-bg-primary/55 border border-border-subtle px-2 py-1 backdrop-blur-sm"
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <motion.div
              className="text-[10px] font-semibold tracking-wide text-white/90"
              animate={{
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration, repeat: Infinity }}
            >
              Ride in progress
            </motion.div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="relative rounded-xl border border-emerald-400/30 bg-emerald-500/25 overflow-hidden"
          animate={isHovered ? { scale: [1, 1.03, 1] } : {}}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-white">
              Start ride
            </span>
            <motion.div
              className="w-8 h-3 rounded-full bg-white/10"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
          </div>
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.16) 50%, transparent 100%)",
            }}
            animate={{ x: ["-60%", "60%"] }}
            transition={{ duration: isHovered ? 1.8 : 2.6, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function MetricsChips({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      className="absolute start-4 top-10 flex flex-col gap-2"
      initial={{ x: -14, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.25 }}
    >
      {[
        { label: "ETA", value: "4m", color: "#FFFFFF" },
        { label: "Battery", value: "92%", color: "#6366F1" },
      ].map((stat, i) => (
        <motion.div
          key={stat.label}
          className="flex items-center gap-2 px-2.5 py-1.5 bg-bg-primary/55 rounded-xl border border-border-subtle backdrop-blur-sm"
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 + i * 0.12 }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }} />
          <span className="text-[10px] font-semibold tracking-wide text-white/70">
            {stat.label}
          </span>
          <motion.span
            className="text-[11px] font-bold"
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

function LegendMarkers() {
  return (
    <>
      {/* Avoid top-left area (category badge lives there) */}
      <PulseDot x={28} y={18} color="#10B981" delay={0} size={9} />
      <PulseDot x={58} y={22} color="#FFFFFF" delay={0.4} size={8} />
      <PulseDot x={70} y={74} color="#6366F1" delay={0.8} size={9} />
    </>
  );
}

export function MobilityAnimation({ isHovered = false }: AnimationProps) {
  return (
    <div className="w-full h-full relative overflow-hidden bg-bg-secondary">
      <Backdrop />

      {/* Safe-area content to avoid the card's external overlays */}
      <div className="absolute inset-0">
        <LegendMarkers />

        {/* Map route occupies the left/center; phone sits on the right */}
        <div className="absolute inset-0">
          <RouteLayer isHovered={isHovered} />
        </div>

        <MetricsChips isHovered={isHovered} />
        <PhonePanel isHovered={isHovered} />
        <StoryBar isHovered={isHovered} />
      </div>
    </div>
  );
}