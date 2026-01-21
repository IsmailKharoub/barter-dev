"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Camera,
  Scale,
  Handshake,
  Package,
  FileText,
  CheckCircle2,
  Code2,
  Sparkles,
} from "lucide-react";

interface FrameIconProps {
  type: "problem" | "alternative" | "apply" | "evaluate" | "agree" | "deliver";
  isActive: boolean;
}

// ============================================
// FRAME 1: THE PROBLEM - Clean Price Display
// ============================================
function ProblemIcon({ isActive }: { isActive: boolean }) {
  const prices = [
    { amount: "$15,000", label: "Simple Website" },
    { amount: "$35,000", label: "Web Application" },
    { amount: "$50,000", label: "E-Commerce" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Subtle red glow */}
      <motion.div
        className="absolute w-64 h-64 bg-red-500/8 rounded-full blur-[80px]"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      />

      <div className="relative flex flex-col items-center gap-4">
        {/* Agency invoice mockup */}
        <motion.div
          className="relative bg-bg-tertiary/60 backdrop-blur-sm border border-border-default rounded-2xl p-6 w-72"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={isActive ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border-subtle">
            <span className="text-xs font-mono text-fg-muted uppercase tracking-wider">Agency Quote</span>
            <span className="text-[10px] text-red-400 font-medium">INVOICE #2847</span>
          </div>

          {/* Price rows */}
          <div className="space-y-3">
            {prices.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -10 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
              >
                <span className="text-sm text-fg-secondary">{item.label}</span>
                <span className="text-sm font-mono text-fg-primary">{item.amount}</span>
              </motion.div>
            ))}
          </div>

          {/* Total */}
          <motion.div
            className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <span className="text-sm font-semibold text-fg-primary">Starting at</span>
            <span className="text-xl font-bold font-mono text-red-400">$15,000+</span>
          </motion.div>

          {/* Strike through overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.9, duration: 0.3 }}
          >
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <motion.line
                x1="10%"
                y1="90%"
                x2="90%"
                y2="10%"
                stroke="#ef4444"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ delay: 1, duration: 0.4, ease: "easeOut" }}
              />
            </svg>
          </motion.div>

          {/* "Too expensive" badge */}
          <motion.div
            className="absolute -top-3 -end-3 bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg"
            initial={{ scale: 0, rotate: -12 }}
            animate={isActive ? { scale: 1, rotate: -12 } : { scale: 0, rotate: -12 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 400, damping: 15 }}
          >
            TOO EXPENSIVE
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================
// FRAME 2: THE ALTERNATIVE - Icons Reassemble
// ============================================
function AlternativeIcon({ isActive }: { isActive: boolean }) {
  const iconData = [
    { Icon: Camera, delay: 0.1, x: -50, y: -40, color: "#a855f7" },
    { Icon: Scale, delay: 0.25, x: 50, y: -40, color: "#3b82f6" },
    { Icon: Handshake, delay: 0.4, x: -50, y: 40, color: "#10b981" },
    { Icon: Package, delay: 0.55, x: 50, y: 40, color: "#f59e0b" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central glow */}
      <motion.div
        className="absolute w-32 h-32 bg-accent-primary/20 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={isActive ? { opacity: 1, scale: 1.5 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      {/* Particle dust effect */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent-primary/60 rounded-full"
              style={{
                left: "50%",
                top: "50%",
              }}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: Math.cos((i * Math.PI * 2) / 12) * 80,
                y: Math.sin((i * Math.PI * 2) / 12) * 80,
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 1.2,
                delay: i * 0.05,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Icons that form from center */}
      <div className="relative w-48 h-48">
        {iconData.map(({ Icon, delay, x, y, color }, i) => (
          <motion.div
            key={i}
            className="absolute rounded-2xl p-4 backdrop-blur-sm"
            style={{
              left: "50%",
              top: "50%",
              backgroundColor: `${color}15`,
              border: `1px solid ${color}30`,
              boxShadow: `0 0 30px ${color}20`,
            }}
            initial={{ 
              opacity: 0, 
              x: 0, 
              y: 0, 
              scale: 0,
              rotate: -180,
            }}
            animate={isActive ? {
              opacity: 1,
              x: x - 24,
              y: y - 24,
              scale: 1,
              rotate: 0,
            } : {
              opacity: 0,
              x: 0,
              y: 0,
              scale: 0,
              rotate: -180,
            }}
            transition={{
              duration: 0.7,
              delay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <Icon size={32} style={{ color }} />
          </motion.div>
        ))}

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 192 192">
          {[
            "M50 50 L96 96",
            "M142 50 L96 96",
            "M50 142 L96 96",
            "M142 142 L96 96",
          ].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="var(--accent-primary)"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

// ============================================
// FRAME 3: YOU APPLY - Form Slides & Fills
// ============================================
function ApplyIcon({ isActive }: { isActive: boolean }) {
  const [typingIndex, setTypingIndex] = useState(0);
  const placeholderTexts = ["Website redesign", "Mobile app", "E-commerce store"];

  useEffect(() => {
    if (!isActive) {
      setTypingIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setTypingIndex((prev) => (prev + 1) % (placeholderTexts[0].length + 5));
    }, 100);

    return () => clearInterval(interval);
  }, [isActive]);

  const displayText = placeholderTexts[0].slice(0, Math.max(0, typingIndex));

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="absolute w-48 h-48 bg-accent-primary/10 rounded-3xl blur-3xl"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Form card */}
      <motion.div
        className="relative bg-bg-tertiary/80 backdrop-blur-xl border border-border-default rounded-2xl p-5 w-64 shadow-2xl"
        initial={{ x: 200, opacity: 0, rotateY: -30 }}
        animate={isActive ? { x: 0, opacity: 1, rotateY: 0 } : { x: 200, opacity: 0, rotateY: -30 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ perspective: "1000px" }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border-subtle">
          <FileText size={18} className="text-accent-primary" />
          <span className="text-sm font-medium text-fg-primary">Apply for Trade</span>
        </div>

        {/* Form fields */}
        <div className="space-y-3">
          {/* Field 1 - Project type */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <div className="text-[10px] text-fg-muted mb-1">What are you building?</div>
            <div className="h-8 bg-bg-secondary rounded-lg border border-border-subtle flex items-center px-3 overflow-hidden">
              <span className="text-xs text-fg-primary font-mono">{displayText}</span>
              <motion.span
                className="w-0.5 h-4 bg-accent-primary ml-0.5"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Field 2 - Trade offer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <div className="text-[10px] text-fg-muted mb-1">Your offer</div>
            <motion.div 
              className="h-8 bg-bg-secondary rounded-lg border border-border-subtle flex items-center px-3"
              animate={isActive ? {
                borderColor: ["rgba(250,248,245,0.1)", "rgba(245,158,11,0.3)", "rgba(250,248,245,0.1)"]
              } : {}}
              transition={{ delay: 1, duration: 1.5 }}
            >
              <span className="text-xs text-fg-secondary">Photography services</span>
            </motion.div>
          </motion.div>

          {/* Field 3 - Value */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <div className="text-[10px] text-fg-muted mb-1">Estimated value</div>
            <div className="h-8 bg-bg-secondary rounded-lg border border-border-subtle flex items-center px-3">
              <span className="text-xs text-accent-primary font-mono">$5,000</span>
            </div>
          </motion.div>
        </div>

        {/* Submit button */}
        <motion.div
          className="mt-4 h-9 bg-accent-primary rounded-lg flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          <span className="text-xs font-semibold text-bg-primary">Submit Application →</span>
        </motion.div>

        {/* 5 minute badge */}
        <motion.div
          className="absolute -top-2 -right-2 bg-success text-bg-primary text-[10px] font-bold px-2 py-1 rounded-full"
          initial={{ scale: 0, rotate: -20 }}
          animate={isActive ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -20 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 400, damping: 15 }}
        >
          5 min
        </motion.div>
      </motion.div>
    </div>
  );
}

// ============================================
// FRAME 4: I EVALUATE - Balance Scales
// ============================================
function EvaluateIcon({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient glow */}
      <motion.div
        className="absolute w-64 h-64 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)" }}
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      />

      <svg viewBox="0 0 280 200" className="w-full h-full max-w-[320px]">
        {/* Center pole */}
        <motion.line
          x1="140"
          y1="30"
          x2="140"
          y2="170"
          stroke="currentColor"
          strokeWidth="3"
          className="text-fg-muted"
          initial={{ pathLength: 0 }}
          animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Base */}
        <motion.path
          d="M100 170 L180 170 L160 180 L120 180 Z"
          fill="currentColor"
          className="text-fg-muted"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        />

        {/* Balance beam */}
        <motion.g
          style={{ transformOrigin: "140px 50px" }}
          initial={{ rotate: -15 }}
          animate={isActive ? { rotate: [15, -10, 5, -2, 0] } : { rotate: -15 }}
          transition={{ delay: 0.5, duration: 2, ease: "easeOut" }}
        >
          {/* Beam */}
          <rect x="40" y="45" width="200" height="10" rx="5" fill="currentColor" className="text-fg-secondary" />
          
          {/* Left chain */}
          <motion.line
            x1="60"
            y1="55"
            x2="60"
            y2="100"
            stroke="currentColor"
            strokeWidth="2"
            className="text-fg-muted"
          />
          
          {/* Right chain */}
          <motion.line
            x1="220"
            y1="55"
            x2="220"
            y2="100"
            stroke="currentColor"
            strokeWidth="2"
            className="text-fg-muted"
          />

          {/* Left pan - DEV WORK */}
          <g>
            <ellipse cx="60" cy="105" rx="40" ry="12" fill="currentColor" className="text-fg-secondary" fillOpacity="0.3" />
            <motion.g
              initial={{ opacity: 0, y: -10 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <rect x="40" y="75" width="40" height="25" rx="4" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="60" y="91" textAnchor="middle" fontSize="10" fill="#3b82f6" fontWeight="600">&lt;/&gt;</text>
            </motion.g>
            <text x="60" y="135" textAnchor="middle" fontSize="10" fill="currentColor" className="fill-fg-muted">DEV WORK</text>
          </g>

          {/* Right pan - YOUR TRADE */}
          <g>
            <ellipse cx="220" cy="105" rx="40" ry="12" fill="currentColor" className="text-fg-secondary" fillOpacity="0.3" />
            <motion.g
              initial={{ opacity: 0, y: -10 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              <rect x="200" y="75" width="40" height="25" rx="4" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
              <Camera x="210" y="78" width="20" height="20" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
            </motion.g>
            <text x="220" y="135" textAnchor="middle" fontSize="10" fill="currentColor" className="fill-fg-muted">YOUR TRADE</text>
          </g>
        </motion.g>

        {/* Equilibrium indicator */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: 2.2, duration: 0.4 }}
        >
          <circle cx="140" cy="30" r="12" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
          <motion.path
            d="M134 30 L138 34 L146 26"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ delay: 2.4, duration: 0.3 }}
          />
        </motion.g>
      </svg>
    </div>
  );
}

// ============================================
// FRAME 5: WE AGREE - Contract Unfolds
// ============================================
function AgreeIcon({ isActive }: { isActive: boolean }) {
  const checkpoints = [
    { y: 52, label: "Scope defined", delay: 1.0 },
    { y: 80, label: "Milestones set", delay: 1.4 },
    { y: 108, label: "Terms agreed", delay: 1.8 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Success glow */}
      <motion.div
        className="absolute w-48 h-48 bg-success/10 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      />

      <svg viewBox="0 0 240 180" className="w-full h-full max-w-[280px]">
        {/* Document unfolding */}
        <motion.g
          initial={{ scaleY: 0.1, opacity: 0 }}
          animate={isActive ? { scaleY: 1, opacity: 1 } : { scaleY: 0.1, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: "120px 20px" }}
        >
          {/* Document background */}
          <rect
            x="60"
            y="20"
            width="120"
            height="140"
            rx="8"
            fill="var(--bg-tertiary)"
            stroke="var(--border-default)"
            strokeWidth="2"
          />

          {/* Header decoration */}
          <rect x="60" y="20" width="120" height="24" rx="8" fill="var(--accent-primary)" fillOpacity="0.1" />
          <text x="120" y="36" textAnchor="middle" fontSize="10" fill="var(--accent-primary)" fontWeight="600">
            TRADE AGREEMENT
          </text>

          {/* Checkmark items */}
          {checkpoints.map((cp, i) => (
            <g key={i}>
              {/* Line text */}
              <motion.rect
                x="100"
                y={cp.y}
                width="70"
                height="6"
                rx="3"
                fill="var(--fg-muted)"
                fillOpacity="0.3"
                initial={{ scaleX: 0 }}
                animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: cp.delay - 0.3, duration: 0.3 }}
                style={{ transformOrigin: "100px 0" }}
              />

              {/* Checkbox */}
              <rect
                x="72"
                y={cp.y - 4}
                width="18"
                height="18"
                rx="4"
                fill="none"
                stroke="var(--success)"
                strokeWidth="2"
              />

              {/* Checkmark */}
              <motion.path
                d={`M76 ${cp.y + 5} L80 ${cp.y + 9} L86 ${cp.y + 1}`}
                stroke="var(--success)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ delay: cp.delay, duration: 0.3 }}
              />
            </g>
          ))}

          {/* Signature line */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 2.2, duration: 0.4 }}
          >
            <line x1="75" y1="145" x2="165" y2="145" stroke="var(--fg-muted)" strokeWidth="1" />
            <motion.path
              d="M90 142 Q105 130 120 142 Q135 154 150 142"
              stroke="var(--accent-primary)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ delay: 2.4, duration: 0.5 }}
            />
          </motion.g>
        </motion.g>

        {/* Seal / stamp effect */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ delay: 2.6, type: "spring", stiffness: 300, damping: 20 }}
          style={{ transformOrigin: "190px 130px" }}
        >
          <circle cx="190" cy="130" r="22" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="2" />
          <CheckCircle2 x="178" y="118" width="24" height="24" stroke="var(--success)" strokeWidth="2" />
        </motion.g>
      </svg>
    </div>
  );
}

// ============================================
// FRAME 6: WE DELIVER - Split Screen Complete
// ============================================
function DeliverIcon({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Dual glows */}
      <motion.div
        className="absolute left-1/4 w-32 h-32 bg-blue-500/15 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
      <motion.div
        className="absolute right-1/4 w-32 h-32 bg-accent-primary/15 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      />

      <div className="flex gap-4 items-stretch">
        {/* Left: Code Building */}
        <motion.div
          className="relative w-32 bg-bg-tertiary/80 backdrop-blur border border-border-default rounded-xl overflow-hidden"
          initial={{ x: -50, opacity: 0 }}
          animate={isActive ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-bg-secondary/50">
            <div className="w-2 h-2 rounded-full bg-red-500/70" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
            <div className="w-2 h-2 rounded-full bg-green-500/70" />
          </div>

          {/* Code lines */}
          <div className="p-3 font-mono text-[9px] space-y-1">
            {[
              { code: "<App>", color: "#3b82f6", delay: 0.8 },
              { code: "  <Header/>", color: "#a855f7", delay: 1.0 },
              { code: "  <Hero/>", color: "#a855f7", delay: 1.2 },
              { code: "  <Features/>", color: "#a855f7", delay: 1.4 },
              { code: "</App>", color: "#3b82f6", delay: 1.6 },
            ].map((line, i) => (
              <motion.div
                key={i}
                className="whitespace-pre"
                style={{ color: line.color }}
                initial={{ opacity: 0, x: -10 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: line.delay, duration: 0.3 }}
              >
                {line.code}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-bg-secondary">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: "0%" }}
              animate={isActive ? { width: "100%" } : { width: "0%" }}
              transition={{ delay: 0.8, duration: 1.2 }}
            />
          </div>

          {/* Label */}
          <div className="absolute -bottom-6 left-0 right-0 text-center text-[10px] text-fg-muted flex items-center justify-center gap-1">
            <Code2 size={12} className="text-blue-500" />
            I Build
          </div>
        </motion.div>

        {/* Center divider with checkmarks */}
        <div className="flex flex-col items-center justify-center gap-2">
          <motion.div
            className="w-px h-8 bg-border-default"
            initial={{ scaleY: 0 }}
            animate={isActive ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ delay: 1.5, duration: 0.3 }}
          />
          <motion.div
            className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={isActive ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 1.8, type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isActive ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 2, type: "spring", stiffness: 400, damping: 15 }}
            >
              <CheckCircle2 size={20} className="text-success" />
            </motion.div>
          </motion.div>
          <motion.div
            className="w-px h-8 bg-border-default"
            initial={{ scaleY: 0 }}
            animate={isActive ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ delay: 1.5, duration: 0.3 }}
          />
        </div>

        {/* Right: Trade Delivered */}
        <motion.div
          className="relative w-32 bg-bg-tertiary/80 backdrop-blur border border-border-default rounded-xl overflow-hidden"
          initial={{ x: 50, opacity: 0 }}
          animate={isActive ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Image gallery effect */}
          <div className="p-3 space-y-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-8 rounded-lg bg-gradient-to-br from-accent-primary/20 to-accent-secondary/10 border border-accent-primary/20 flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ delay: 1 + i * 0.2, duration: 0.4 }}
              >
                <Camera size={14} className="text-accent-primary" />
              </motion.div>
            ))}
          </div>

          {/* Delivered badge */}
          <motion.div
            className="absolute top-2 right-2 bg-success text-bg-primary text-[8px] font-bold px-1.5 py-0.5 rounded"
            initial={{ scale: 0 }}
            animate={isActive ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 1.8, type: "spring", stiffness: 400, damping: 15 }}
          >
            ✓
          </motion.div>

          {/* Label */}
          <div className="absolute -bottom-6 left-0 right-0 text-center text-[10px] text-fg-muted flex items-center justify-center gap-1">
            <Sparkles size={12} className="text-accent-primary" />
            You Deliver
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================
// MAIN EXPORT
// ============================================
const iconComponents: Record<FrameIconProps["type"], React.FC<{ isActive: boolean }>> = {
  problem: ProblemIcon,
  alternative: AlternativeIcon,
  apply: ApplyIcon,
  evaluate: EvaluateIcon,
  agree: AgreeIcon,
  deliver: DeliverIcon,
};

export function FrameIcon({ type, isActive }: FrameIconProps) {
  const IconComponent = iconComponents[type];
  return (
    <div className="w-full h-full min-h-[200px] md:min-h-[280px]">
      <IconComponent isActive={isActive} />
    </div>
  );
}
