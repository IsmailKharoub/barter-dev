"use client";

import { motion } from "framer-motion";
import { FrameIcon } from "./frame-icon";

export type FrameType =
  | "problem"
  | "alternative"
  | "apply"
  | "evaluate"
  | "agree"
  | "deliver";

interface FrameProps {
  type: FrameType;
  title: string;
  description: string;
  isActive: boolean;
  index: number;
}

// Frame-specific accent colors for visual variety
const frameAccents: Record<FrameType, { gradient: string; glow: string }> = {
  problem: {
    gradient: "from-red-500/5 via-transparent to-transparent",
    glow: "rgba(239, 68, 68, 0.08)",
  },
  alternative: {
    gradient: "from-purple-500/5 via-transparent to-transparent",
    glow: "rgba(168, 85, 247, 0.08)",
  },
  apply: {
    gradient: "from-accent-primary/5 via-transparent to-transparent",
    glow: "rgba(245, 158, 11, 0.08)",
  },
  evaluate: {
    gradient: "from-amber-500/5 via-transparent to-transparent",
    glow: "rgba(245, 158, 11, 0.08)",
  },
  agree: {
    gradient: "from-emerald-500/5 via-transparent to-transparent",
    glow: "rgba(16, 185, 129, 0.08)",
  },
  deliver: {
    gradient: "from-blue-500/5 via-accent-primary/5 to-transparent",
    glow: "rgba(59, 130, 246, 0.08)",
  },
};

export function Frame({ type, title, description, isActive, index }: FrameProps) {
  const accent = frameAccents[type];

  return (
    <motion.div
      className="flex flex-col items-center text-center gap-6 md:gap-10 max-w-3xl mx-auto px-4"
      initial={{ opacity: 0 }}
      animate={{
        opacity: isActive ? 1 : 0,
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Step number badge */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, y: -10 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <span className="text-xs font-mono text-fg-muted tracking-widest uppercase">
          Step {index + 1} of 6
        </span>
      </motion.div>

      {/* Animated icon container */}
      <motion.div
        className="relative w-full max-w-md aspect-[4/3] flex items-center justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Background glow */}
        <div
          className={`absolute inset-0 bg-gradient-radial ${accent.gradient} rounded-3xl`}
          style={{
            background: `radial-gradient(ellipse at center, ${accent.glow} 0%, transparent 70%)`,
          }}
        />

        {/* Icon */}
        <FrameIcon type={type} isActive={isActive} />
      </motion.div>

      {/* Text content */}
      <motion.div
        className="space-y-3 md:space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-2xl md:text-4xl font-bold text-fg-primary tracking-tight">
          {title}
        </h3>
        <p className="text-base md:text-xl text-fg-secondary leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
}
