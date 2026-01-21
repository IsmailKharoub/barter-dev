"use client";

import { motion } from "framer-motion";
import type { AnimationProps } from "./types";

const dataInputs = [
  { label: "Weather", color: "#3B82F6", delay: 0 },
  { label: "Soil", color: "#10B981", delay: 0.1 },
  { label: "Yield", color: "#FFFFFF", delay: 0.2 },
  { label: "Market", color: "#8B5CF6", delay: 0.3 },
];

function DataStream({ label, color, delay, isHovered }: { 
  label: string; 
  color: string; 
  delay: number;
  isHovered: boolean;
}) {
  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      <span className="text-[9px] font-mono text-fg-muted uppercase tracking-wider w-12 text-right">
        {label}
      </span>
      <div className="relative flex items-center">
        {/* Data stream line */}
        <motion.div
          className="h-[2px] rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: isHovered ? 40 : 24 }}
          transition={{ delay: delay + 0.2, duration: 0.4 }}
        />
        {/* Flowing particles */}
        {isHovered && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ backgroundColor: color, left: 0 }}
                animate={{ x: [0, 40], opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "linear",
                }}
              />
            ))}
          </>
        )}
        {/* Endpoint dot */}
        <motion.div
          className="w-2 h-2 rounded-full ml-1"
          style={{ backgroundColor: color }}
          animate={isHovered ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.6, repeat: Infinity, delay: delay * 0.5 }}
        />
      </div>
    </motion.div>
  );
}

function MLModel({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-accent-primary/20 blur-lg"
        animate={isHovered ? { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Main model box */}
      <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-accent-primary/30 to-accent-secondary/20 border border-accent-primary/40 flex flex-col items-center justify-center gap-1 backdrop-blur-sm">
        {/* Neural network dots */}
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-accent-primary/60"
              animate={isHovered ? { 
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.2, 0.8] 
              } : {}}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
        
        <span className="text-xs font-mono text-accent-primary font-bold">ML</span>
        
        <div className="flex gap-1">
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-accent-primary/60"
              animate={isHovered ? { 
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.2, 0.8] 
              } : {}}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 + i * 0.15 }}
            />
          ))}
        </div>
      </div>

      {/* Processing ring */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-accent-primary/30"
        animate={isHovered ? { 
          scale: [1, 1.15, 1], 
          opacity: [0.5, 0, 0.5] 
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.div>
  );
}

function RiskOutput({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="flex flex-col items-start gap-2">
      {/* Risk Score Header */}
      <motion.div
        className="text-[8px] font-mono text-fg-muted uppercase tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Risk Score
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="relative w-20 h-4 bg-bg-tertiary rounded-full overflow-hidden border border-border-subtle"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9 }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-success via-success to-accent-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "78%" }}
          transition={{ delay: 1.1, duration: 1, ease: "easeOut" }}
        />
        {/* Shimmer effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-y-0 w-4 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: [-20, 80] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.div>

      {/* Score display */}
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-lg font-mono text-success font-bold">78%</span>
        <motion.div
          className="flex items-center gap-1 px-2 py-0.5 bg-success/20 rounded-full"
          animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          <span className="text-[10px] font-mono text-success font-medium">APPROVED</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function AgriMLAnimation({ isHovered = false }: AnimationProps) {
  return (
    <div className="w-full h-full p-5 flex items-center justify-center gap-4 overflow-hidden">
      {/* Data inputs */}
      <div className="flex flex-col gap-2">
        {dataInputs.map((input) => (
          <DataStream
            key={input.label}
            label={input.label}
            color={input.color}
            delay={input.delay}
            isHovered={isHovered}
          />
        ))}
      </div>

      {/* ML Model */}
      <MLModel isHovered={isHovered} />

      {/* Output */}
      <RiskOutput isHovered={isHovered} />
    </div>
  );
}

