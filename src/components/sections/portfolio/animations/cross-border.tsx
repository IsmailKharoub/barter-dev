"use client";

import { motion } from "framer-motion";
import type { AnimationProps } from "./types";

const sourceCurrencies = [
  { symbol: "$", name: "USD", color: "#10B981" },
  { symbol: "€", name: "EUR", color: "#3B82F6" },
];

const destCurrencies = [
  { symbol: "£", name: "GBP", color: "#8B5CF6" },
  { symbol: "¥", name: "JPY", color: "#FFFFFF" },
];

function CurrencyNode({ 
  symbol, 
  color, 
  delay, 
  side,
  isHovered 
}: { 
  symbol: string; 
  color: string; 
  delay: number;
  side: "source" | "dest";
  isHovered: boolean;
}) {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 300 }}
    >
      {/* Pulse ring */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ borderColor: color, borderWidth: 2 }}
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
      
      <motion.div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 backdrop-blur-sm"
        style={{ 
          backgroundColor: `${color}20`,
          borderColor: `${color}60`,
          color: color
        }}
        animate={isHovered ? { 
          boxShadow: [`0 0 0 0 ${color}00`, `0 0 20px 4px ${color}30`, `0 0 0 0 ${color}00`]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {symbol}
      </motion.div>
    </motion.div>
  );
}

function ConnectionPath({ isHovered }: { isHovered: boolean }) {
  return (
    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      
      {/* Connection paths */}
      {[0, 1].map((i) => (
        <motion.path
          key={`path-${i}`}
          d={`M 60 ${50 + i * 60} Q 150 ${80 - i * 20} 150 80 Q 150 ${80 + i * 20} 240 ${50 + i * 60}`}
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
        />
      ))}

      {/* Flowing particles along paths */}
      {isHovered && [0, 1, 2].map((i) => (
        <motion.circle
          key={`particle-${i}`}
          r="3"
          fill="#FFFFFF"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            cx: [60, 150, 240],
            cy: [80, 80, 80],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "linear",
          }}
        />
      ))}
    </svg>
  );
}

function AIAgentNode({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      className="relative z-10"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
    >
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-[-8px] rounded-2xl border border-accent-primary/30"
        animate={isHovered ? { rotate: 360 } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-accent-primary"
            style={{
              top: i === 0 ? -3 : i === 2 ? "calc(100% - 3px)" : "50%",
              left: i === 3 ? -3 : i === 1 ? "calc(100% - 3px)" : "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </motion.div>

      {/* Main AI box */}
      <motion.div
        className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-accent-primary/40 to-success/20 border border-accent-primary/50 flex flex-col items-center justify-center backdrop-blur-sm"
        animate={isHovered ? { 
          boxShadow: ["0 0 0 0 rgba(245,158,11,0)", "0 0 30px 10px rgba(245,158,11,0.2)", "0 0 0 0 rgba(245,158,11,0)"]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* AI icon */}
        <motion.div
          className="text-[10px] font-mono text-accent-primary font-bold"
          animate={isHovered ? { opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          AI
        </motion.div>
        <motion.div
          className="text-[7px] font-mono text-fg-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          AGENT
        </motion.div>
        
        {/* Processing dots */}
        <div className="absolute bottom-1 flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-success"
              animate={isHovered ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.5 }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatusBadge({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 bg-bg-tertiary/80 rounded-full border border-border-subtle backdrop-blur-sm"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      <motion.div
        className="w-2 h-2 rounded-full bg-success"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <span className="text-[9px] font-mono text-fg-secondary uppercase tracking-wider">
        {isHovered ? "Processing" : "Ready"}
      </span>
      {isHovered && (
        <motion.span
          className="text-[9px] font-mono text-success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          $24.5K
        </motion.span>
      )}
    </motion.div>
  );
}

export function CrossBorderAnimation({ isHovered = false }: AnimationProps) {
  return (
    <div className="w-full h-full p-4 relative overflow-hidden">
      {/* Connection paths */}
      <ConnectionPath isHovered={isHovered} />

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center justify-between px-2">
        {/* Source currencies */}
        <div className="flex flex-col gap-3">
          {sourceCurrencies.map((curr, i) => (
            <CurrencyNode
              key={curr.name}
              symbol={curr.symbol}
              color={curr.color}
              delay={i * 0.15}
              side="source"
              isHovered={isHovered}
            />
          ))}
        </div>

        {/* AI Agent */}
        <AIAgentNode isHovered={isHovered} />

        {/* Destination currencies */}
        <div className="flex flex-col gap-3">
          {destCurrencies.map((curr, i) => (
            <CurrencyNode
              key={curr.name}
              symbol={curr.symbol}
              color={curr.color}
              delay={0.3 + i * 0.15}
              side="dest"
              isHovered={isHovered}
            />
          ))}
        </div>
      </div>

      {/* Status */}
      <StatusBadge isHovered={isHovered} />
    </div>
  );
}

