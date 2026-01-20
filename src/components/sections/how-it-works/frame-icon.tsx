"use client";

import { motion } from "framer-motion";

interface FrameIconProps {
  type: "problem" | "alternative" | "apply" | "evaluate" | "agree" | "deliver";
  className?: string;
}

const icons: Record<FrameIconProps["type"], React.ReactNode> = {
  problem: (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <motion.rect
        x="20"
        y="20"
        width="60"
        height="40"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.text
        x="50"
        y="45"
        textAnchor="middle"
        fill="currentColor"
        fontSize="14"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        $15,000
      </motion.text>
      <motion.path
        d="M25 70 L75 30"
        stroke="#ef4444"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
    </svg>
  ),
  alternative: (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      {/* Camera icon */}
      <motion.circle cx="25" cy="35" r="12" stroke="currentColor" strokeWidth="2" />
      <motion.rect x="18" y="28" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      {/* Legal scale */}
      <motion.path d="M75 25 L75 50 M65 30 L85 30 M60 35 L70 35 M80 35 L90 35" stroke="currentColor" strokeWidth="2" />
      {/* Handshake */}
      <motion.path d="M20 70 Q35 60 50 70 Q65 80 80 70" stroke="currentColor" strokeWidth="2" fill="none" />
      {/* Box */}
      <motion.rect x="60" y="55" width="20" height="20" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  apply: (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <motion.rect
        x="20"
        y="15"
        width="60"
        height="70"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      {[30, 45, 60].map((y, i) => (
        <motion.rect
          key={y}
          x="28"
          y={y}
          width="44"
          height="8"
          rx="2"
          fill="currentColor"
          opacity={0.3}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6 + i * 0.2, duration: 0.4 }}
        />
      ))}
    </svg>
  ),
  evaluate: (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <motion.path
        d="M50 20 L50 80"
        stroke="currentColor"
        strokeWidth="2"
      />
      <motion.path
        d="M30 35 L70 35"
        stroke="currentColor"
        strokeWidth="3"
        initial={{ rotate: -10 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transformOrigin: "50px 35px" }}
      />
      <motion.circle cx="30" cy="50" r="15" stroke="currentColor" strokeWidth="2" />
      <motion.circle cx="70" cy="50" r="15" stroke="currentColor" strokeWidth="2" />
      <motion.text x="30" y="54" textAnchor="middle" fill="currentColor" fontSize="10">DEV</motion.text>
      <motion.text x="70" y="54" textAnchor="middle" fill="currentColor" fontSize="10">YOU</motion.text>
    </svg>
  ),
  agree: (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <motion.rect
        x="20"
        y="15"
        width="60"
        height="70"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M30 ${35 + i * 15} L40 ${40 + i * 15} L48 ${30 + i * 15}`}
          stroke="#22d3ee"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.3 + i * 0.3, duration: 0.4 }}
        />
      ))}
    </svg>
  ),
  deliver: (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <motion.line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1" opacity={0.3} />
      {/* Code side */}
      <motion.text x="25" y="30" textAnchor="middle" fill="currentColor" fontSize="8">&lt;/&gt;</motion.text>
      <motion.rect x="10" y="40" width="30" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
      {/* Trade side */}
      <motion.circle cx="75" cy="50" r="15" stroke="currentColor" strokeWidth="2" />
      <motion.path
        d="M70 50 L75 55 L82 45"
        stroke="#22d3ee"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
    </svg>
  ),
};

export function FrameIcon({ type, className }: FrameIconProps) {
  return (
    <div className={`text-accent-primary ${className}`}>
      {icons[type]}
    </div>
  );
}

