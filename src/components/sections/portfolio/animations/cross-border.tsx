"use client";

import { motion } from "framer-motion";
import type { AnimationProps } from "./types";

const routePoints = [
  { x: 18, y: 60 },
  { x: 30, y: 48 },
  { x: 44, y: 40 },
  { x: 58, y: 38 },
  { x: 72, y: 42 },
  { x: 84, y: 46 },
];

function Backdrop() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-linear-to-br from-bg-secondary via-bg-secondary to-bg-tertiary/35" />
      <div className="absolute inset-0 opacity-35">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Longitudes */}
          {[20, 40, 60, 80].map((x) => (
            <path
              key={`lon-${x}`}
              d={`M ${x} 8 C ${x - 6} 28, ${x - 6} 72, ${x} 92 C ${x + 6} 72, ${x + 6} 28, ${x} 8`}
              fill="none"
              stroke="var(--fg-muted)"
              strokeWidth="0.45"
              opacity="0.55"
            />
          ))}
          {/* Latitudes */}
          {[26, 44, 62, 80].map((y) => (
            <path
              key={`lat-${y}`}
              d={`M 10 ${y} C 30 ${y - 5}, 70 ${y + 5}, 90 ${y}`}
              fill="none"
              stroke="var(--fg-muted)"
              strokeWidth="0.45"
              opacity="0.45"
            />
          ))}
          {/* Dot field */}
          {Array.from({ length: 30 }).map((_, i) => (
            <circle
              key={`dot-${i}`}
              cx={(i * 13) % 100}
              cy={(i * 23 + 12) % 100}
              r="0.65"
              fill="var(--fg-muted)"
              opacity="0.4"
            />
          ))}
        </svg>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_60%,rgba(16,185,129,0.14),transparent_55%),radial-gradient(circle_at_78%_45%,rgba(59,130,246,0.12),transparent_55%)]" />
    </div>
  );
}

function RouteArc({ isHovered }: { isHovered: boolean }) {
  const duration = isHovered ? 2.6 : 3.8;

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="cbRoute" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Base arc */}
      <path
        d="M18 60 C30 44, 52 34, 84 46"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="3.1"
        strokeLinecap="round"
      />

      {/* Highlight sweep */}
      <motion.path
        d="M18 60 C30 44, 52 34, 84 46"
        fill="none"
        stroke="url(#cbRoute)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="14 90"
        animate={{ strokeDashoffset: [100, 0] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />

      {/* Moving packet */}
      <motion.circle
        r="3.2"
        fill="rgba(255,255,255,0.92)"
        stroke="rgba(16,185,129,0.35)"
        strokeWidth="2"
        animate={{
          cx: routePoints.map((p) => p.x),
          cy: routePoints.map((p) => p.y),
        }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Endpoints */}
      <circle cx="18" cy="60" r="4.2" fill="rgba(16,185,129,0.14)" stroke="rgba(16,185,129,0.75)" strokeWidth="1.7" />
      <circle cx="84" cy="46" r="4.2" fill="rgba(59,130,246,0.13)" stroke="rgba(59,130,246,0.75)" strokeWidth="1.7" />
    </svg>
  );
}

function TransferCard({
  label,
  currency,
  amount,
  tint,
  align,
  delay,
}: {
  label: string;
  currency: string;
  amount: string;
  tint: string;
  align: "left" | "right";
  delay: number;
}) {
  const isRight = align === "right";

  return (
    <motion.div
      className="w-[clamp(124px,38%,230px)] rounded-2xl border border-border-subtle bg-bg-primary/55 backdrop-blur-sm p-3 shadow-lg"
      initial={{ y: 10, opacity: 0, x: isRight ? 12 : -12 }}
      animate={{ y: 0, opacity: 1, x: 0 }}
      transition={{ delay, type: "spring", stiffness: 220, damping: 22 }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="text-[10px] font-semibold tracking-wider uppercase text-white/70">
          {label}
        </div>
        <div className="h-1.5 w-10 rounded bg-white/10" />
      </div>

      <div className="mt-2 flex items-center gap-2">
        <div
          className="w-9 h-9 rounded-xl border flex items-center justify-center font-bold"
          style={{ borderColor: `${tint}55`, backgroundColor: `${tint}18`, color: tint }}
        >
          {currency.slice(0, 1)}
        </div>
        <div className="min-w-0">
          <div className="text-[12px] font-bold text-white leading-none">{currency}</div>
          <div className="text-[11px] font-semibold text-white/80">{amount}</div>
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="h-2 rounded bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded"
            style={{ background: `linear-gradient(90deg, ${tint}80, rgba(255,255,255,0.35))` }}
            animate={{ x: ["-35%", "0%"] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="h-2 rounded bg-white/8 w-[82%]" />
      </div>
    </motion.div>
  );
}

function Pipeline({ isHovered }: { isHovered: boolean }) {
  const duration = isHovered ? 1.2 : 1.6;

  return (
    <motion.div
      className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.25 }}
    >
      {[
        { label: "FX", value: "1.0832", tint: "#FFFFFF" },
        { label: "Compliance", value: "Approved", tint: "#10B981" },
      ].map((chip, i) => (
        <motion.div
          key={chip.label}
          className="px-3 py-1.5 rounded-xl border border-border-subtle bg-bg-primary/55 backdrop-blur-sm shadow-md"
          animate={isHovered ? { y: [0, -2, 0] } : {}}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.15 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chip.tint }} />
            <div className="text-[10px] font-semibold tracking-wider uppercase text-white/80">
              {chip.label}
            </div>
            <motion.div
              className="text-[10px] font-bold"
              style={{ color: chip.tint }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration, repeat: Infinity, delay: i * 0.25 }}
            >
              {chip.value}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function StatusPill({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full border border-border-subtle bg-bg-primary/55 backdrop-blur-sm"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.35 }}
    >
      <div className="flex items-center gap-2">
        <motion.div
          className="w-2 h-2 rounded-full bg-success"
          animate={{ scale: [1, 1.2, 1], opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <span className="text-[10px] font-semibold tracking-wider uppercase text-white/80">
          {isHovered ? "Settling" : "Ready"}
        </span>
        <span className="text-[10px] font-bold text-success">{"< 2s"}</span>
      </div>
    </motion.div>
  );
}

export function CrossBorderAnimation({ isHovered = false }: AnimationProps) {
  return (
    <div className="w-full h-full relative overflow-hidden bg-bg-secondary">
      <Backdrop />

      {/* Keep content away from the top-left (portfolio badge) */}
      <div className="absolute inset-0 px-4 pt-10 pb-10">
        <RouteArc isHovered={isHovered} />

        <div className="relative z-10 h-full flex items-center justify-between">
          <TransferCard
            label="Send"
            currency="USD"
            amount="$24,500"
            tint="#10B981"
            align="left"
            delay={0.1}
          />

          <TransferCard
            label="Receive"
            currency="EUR"
            amount="€22,640"
            tint="#3B82F6"
            align="right"
            delay={0.18}
          />
        </div>

        <Pipeline isHovered={isHovered} />
        <StatusPill isHovered={isHovered} />
      </div>
    </div>
  );
}

