"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
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

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FrameData {
  id: string;
  title: string;
  description: string;
}

interface ScrollAnimationProps {
  frames: FrameData[];
}

// ============================================
// FRAME 1: PRICE TAG SHATTERS
// ============================================
function PriceTagShatter({ progress }: { progress: number }) {
  const shatterStart = 0.3;
  const shatterProgress = Math.max(0, Math.min(1, (progress - shatterStart) / 0.4));
  
  const pieces = [
    { x: -80, y: -60, rotate: -45, scale: 0.3 },
    { x: 60, y: -80, rotate: 30, scale: 0.25 },
    { x: -90, y: 50, rotate: -60, scale: 0.35 },
    { x: 70, y: 70, rotate: 45, scale: 0.28 },
    { x: -30, y: -90, rotate: -20, scale: 0.22 },
    { x: 40, y: 90, rotate: 55, scale: 0.3 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Red warning glow */}
      <motion.div
        className="absolute w-64 h-64 rounded-full blur-[80px]"
        style={{
          background: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)",
          opacity: 1 - shatterProgress,
        }}
      />

      {/* Main price tag - shatters on scroll */}
      <div
        className="relative"
        style={{
          transform: `scale(${1 - shatterProgress * 0.3})`,
          opacity: 1 - shatterProgress,
        }}
      >
        <div className="bg-bg-tertiary/80 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6 w-72 shadow-2xl shadow-red-500/10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border-subtle">
            <span className="text-xs font-mono text-fg-muted uppercase tracking-wider">Agency Quote</span>
            <span className="text-[10px] text-red-400 font-medium">INVOICE #2847</span>
          </div>

          {/* Price rows */}
          <div className="space-y-3">
            {[
              { label: "Simple Website", amount: "$15,000" },
              { label: "Web Application", amount: "$35,000" },
              { label: "E-Commerce", amount: "$50,000" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-fg-secondary">{item.label}</span>
                <span className="text-sm font-mono text-fg-primary">{item.amount}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
            <span className="text-sm font-semibold text-fg-primary">Starting at</span>
            <span className="text-xl font-bold font-mono text-red-400">$15,000+</span>
          </div>
        </div>

        {/* Strike through - animated with scroll */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <line
            x1="10%"
            y1="90%"
            x2={`${10 + progress * 80}%`}
            y2={`${90 - progress * 80}%`}
            stroke="#ef4444"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Shattered pieces */}
      {pieces.map((piece, i) => (
        <div
          key={i}
          className="absolute w-12 h-12 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg border border-red-500/30"
          style={{
            transform: `translate(${piece.x * shatterProgress}px, ${piece.y * shatterProgress}px) rotate(${piece.rotate * shatterProgress}deg) scale(${piece.scale + shatterProgress * 0.5})`,
            opacity: shatterProgress * 0.8,
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// FRAME 2: PIECES MORPH INTO ICONS
// ============================================
function PiecesMorph({ progress }: { progress: number }) {
  const icons = [
    { Icon: Camera, color: "#a855f7", x: -60, y: -50 },
    { Icon: Scale, color: "#3b82f6", x: 60, y: -50 },
    { Icon: Handshake, color: "#10b981", x: -60, y: 50 },
    { Icon: Package, color: "#f59e0b", x: 60, y: 50 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central energy glow */}
      <motion.div
        className="absolute w-40 h-40 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(245,158,11,${0.2 * progress}) 0%, transparent 70%)`,
        }}
      />

      {/* Particle burst from center */}
      {[...Array(16)].map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const distance = 100 * progress;
        return (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-accent-primary/60 rounded-full"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`,
              opacity: progress > 0.2 ? Math.max(0, 1 - (progress - 0.2) * 2) : 0,
            }}
          />
        );
      })}

      {/* Icons emerging from center */}
      <div className="relative w-64 h-64">
        {icons.map(({ Icon, color, x, y }, i) => {
          const delay = i * 0.1;
          const iconProgress = Math.max(0, Math.min(1, (progress - delay) / 0.7));
          
          return (
            <div
              key={i}
              className="absolute rounded-2xl p-4 backdrop-blur-sm transition-shadow"
              style={{
                left: "50%",
                top: "50%",
                backgroundColor: `${color}15`,
                border: `1px solid ${color}40`,
                boxShadow: iconProgress > 0.5 ? `0 0 40px ${color}30` : "none",
                transform: `translate(${x * iconProgress - 28}px, ${y * iconProgress - 28}px) scale(${iconProgress}) rotate(${(1 - iconProgress) * -180}deg)`,
                opacity: iconProgress,
              }}
            >
              <Icon size={32} style={{ color }} />
            </div>
          );
        })}

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
          {[
            "M68 68 L128 128",
            "M188 68 L128 128",
            "M68 188 L128 128",
            "M188 188 L128 128",
          ].map((d, i) => (
            <path
              key={i}
              d={d}
              stroke="var(--accent-primary)"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
              opacity={0.3 * progress}
              strokeDashoffset={100 * (1 - progress)}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

// ============================================
// FRAME 3: APPLICATION FORM AUTO-FILLS
// ============================================
function FormAutoFill({ progress }: { progress: number }) {
  const projectText = "E-commerce store";
  const offerText = "Photography services";
  
  const slideProgress = Math.min(1, progress * 2);
  const field1Progress = Math.max(0, Math.min(1, (progress - 0.3) * 3));
  const field2Progress = Math.max(0, Math.min(1, (progress - 0.5) * 3));
  const field3Progress = Math.max(0, Math.min(1, (progress - 0.7) * 3));
  const buttonProgress = Math.max(0, Math.min(1, (progress - 0.85) * 6));

  const typedProject = projectText.slice(0, Math.floor(field1Progress * projectText.length));
  const typedOffer = offerText.slice(0, Math.floor(field2Progress * offerText.length));

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="absolute w-48 h-48 bg-accent-primary/10 rounded-3xl blur-3xl"
        style={{ opacity: slideProgress }}
      />

      {/* Form card */}
      <div
        className="relative bg-bg-tertiary/80 backdrop-blur-xl border border-border-default rounded-2xl p-6 w-72 shadow-2xl"
        style={{
          transform: `translateX(${(1 - slideProgress) * 200}px) perspective(1000px) rotateY(${(1 - slideProgress) * -20}deg)`,
          opacity: slideProgress,
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-border-subtle">
          <FileText size={20} className="text-accent-primary" />
          <span className="text-base font-medium text-fg-primary">Apply for Trade</span>
        </div>

        {/* Form fields */}
        <div className="space-y-4">
          {/* Field 1 - Project type */}
          <div style={{ opacity: 0.3 + field1Progress * 0.7 }}>
            <div className="text-xs text-fg-muted mb-1.5">What are you building?</div>
            <div 
              className="h-10 bg-bg-secondary rounded-lg border px-3 flex items-center overflow-hidden transition-colors"
              style={{ borderColor: field1Progress > 0.5 ? "rgba(245,158,11,0.3)" : "var(--border-subtle)" }}
            >
              <span className="text-sm text-fg-primary font-mono">{typedProject}</span>
              {field1Progress > 0 && field1Progress < 1 && (
                <span className="w-0.5 h-5 bg-accent-primary ml-0.5 animate-pulse" />
              )}
            </div>
          </div>

          {/* Field 2 - Trade offer */}
          <div style={{ opacity: 0.3 + field2Progress * 0.7 }}>
            <div className="text-xs text-fg-muted mb-1.5">Your offer</div>
            <div 
              className="h-10 bg-bg-secondary rounded-lg border px-3 flex items-center transition-colors"
              style={{ borderColor: field2Progress > 0.5 ? "rgba(245,158,11,0.3)" : "var(--border-subtle)" }}
            >
              <span className="text-sm text-fg-secondary">{typedOffer}</span>
              {field2Progress > 0 && field2Progress < 1 && (
                <span className="w-0.5 h-5 bg-accent-primary ml-0.5 animate-pulse" />
              )}
            </div>
          </div>

          {/* Field 3 - Value */}
          <div style={{ opacity: 0.3 + field3Progress * 0.7 }}>
            <div className="text-xs text-fg-muted mb-1.5">Estimated value</div>
            <div className="h-10 bg-bg-secondary rounded-lg border border-border-subtle px-3 flex items-center">
              <span 
                className="text-sm font-mono transition-colors"
                style={{ color: field3Progress > 0.5 ? "#f59e0b" : "var(--fg-secondary)" }}
              >
                ${Math.floor(field3Progress * 8000).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div
          className="mt-5 h-11 bg-accent-primary rounded-lg flex items-center justify-center cursor-pointer transition-transform"
          style={{ 
            opacity: 0.5 + buttonProgress * 0.5,
            transform: `scale(${0.95 + buttonProgress * 0.05})`,
          }}
        >
          <span className="text-sm font-semibold text-bg-primary">Submit Application →</span>
        </div>

        {/* 5 minute badge */}
        <div
          className="absolute -top-3 -right-3 bg-success text-bg-primary text-xs font-bold px-2.5 py-1 rounded-full"
          style={{
            transform: `scale(${buttonProgress}) rotate(${(1 - buttonProgress) * -20}deg)`,
            opacity: buttonProgress,
          }}
        >
          5 min
        </div>
      </div>
    </div>
  );
}

// ============================================
// FRAME 4: SCALES BALANCE WITH PHYSICS
// ============================================
function ScalesBalance({ progress }: { progress: number }) {
  // Physics-based easing for balance
  const tiltAngle = progress < 0.3 
    ? 15 
    : progress < 0.5 
      ? 15 - (progress - 0.3) * 75 // -15 to +15 swing
      : progress < 0.7
        ? -7.5 + (progress - 0.5) * 50
        : progress < 0.85
          ? 2.5 - (progress - 0.7) * 20
          : 0;

  const showBalance = progress > 0.9;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient glow */}
      <motion.div
        className="absolute w-64 h-64 rounded-full blur-3xl"
        style={{ 
          background: `radial-gradient(circle, rgba(245,158,11,${0.15 * progress}) 0%, transparent 70%)` 
        }}
      />

      <svg viewBox="0 0 280 200" className="w-full h-full max-w-[320px]">
        {/* Center pole */}
        <line
          x1="140"
          y1="30"
          x2="140"
          y2="170"
          stroke="currentColor"
          strokeWidth="3"
          className="text-fg-muted"
          strokeDasharray={150}
          strokeDashoffset={150 * (1 - Math.min(1, progress * 2))}
        />

        {/* Base */}
        <path
          d="M100 170 L180 170 L160 180 L120 180 Z"
          fill="currentColor"
          className="text-fg-muted"
          opacity={0.5 * progress}
        />

        {/* Balance beam */}
        <g
          style={{ 
            transform: `rotate(${tiltAngle}deg)`,
            transformOrigin: "140px 50px",
            transition: "transform 0.1s ease-out"
          }}
        >
          {/* Beam */}
          <rect x="40" y="45" width="200" height="10" rx="5" fill="currentColor" className="text-fg-secondary" />
          
          {/* Left chain */}
          <line x1="60" y1="55" x2="60" y2="100" stroke="currentColor" strokeWidth="2" className="text-fg-muted" />
          
          {/* Right chain */}
          <line x1="220" y1="55" x2="220" y2="100" stroke="currentColor" strokeWidth="2" className="text-fg-muted" />

          {/* Left pan - DEV WORK */}
          <g>
            <ellipse cx="60" cy="105" rx="40" ry="12" fill="currentColor" className="text-fg-secondary" fillOpacity="0.3" />
            <g style={{ opacity: progress > 0.3 ? 1 : 0, transition: "opacity 0.3s" }}>
              <rect x="40" y="75" width="40" height="25" rx="4" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="60" y="91" textAnchor="middle" fontSize="10" fill="#3b82f6" fontWeight="600">&lt;/&gt;</text>
            </g>
            <text x="60" y="135" textAnchor="middle" fontSize="10" fill="currentColor" className="fill-fg-muted">DEV WORK</text>
          </g>

          {/* Right pan - YOUR TRADE */}
          <g>
            <ellipse cx="220" cy="105" rx="40" ry="12" fill="currentColor" className="text-fg-secondary" fillOpacity="0.3" />
            <g style={{ opacity: progress > 0.4 ? 1 : 0, transition: "opacity 0.3s" }}>
              <rect x="200" y="75" width="40" height="25" rx="4" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
              <Camera x="210" y="78" width="20" height="20" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
            </g>
            <text x="220" y="135" textAnchor="middle" fontSize="10" fill="currentColor" className="fill-fg-muted">YOUR TRADE</text>
          </g>
        </g>

        {/* Equilibrium indicator */}
        <g style={{ opacity: showBalance ? 1 : 0, transform: `scale(${showBalance ? 1 : 0})`, transformOrigin: "140px 30px", transition: "all 0.4s ease-out" }}>
          <circle cx="140" cy="30" r="12" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
          <path
            d="M134 30 L138 34 L146 26"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}

// ============================================
// FRAME 5: CONTRACT UNFOLDS
// ============================================
function ContractUnfold({ progress }: { progress: number }) {
  const unfoldProgress = Math.min(1, progress * 1.5);
  const checkmarks = [
    { y: 52, delay: 0.4 },
    { y: 80, delay: 0.55 },
    { y: 108, delay: 0.7 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Success glow */}
      <motion.div
        className="absolute w-48 h-48 bg-success/10 rounded-full blur-3xl"
        style={{ opacity: progress > 0.6 ? (progress - 0.6) * 2.5 : 0 }}
      />

      <svg viewBox="0 0 240 180" className="w-full h-full max-w-[280px]">
        {/* Document unfolding */}
        <g style={{ transform: `scaleY(${unfoldProgress})`, transformOrigin: "120px 20px" }}>
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
          {checkmarks.map((cp, i) => {
            const checkProgress = Math.max(0, Math.min(1, (progress - cp.delay) / 0.2));
            return (
              <g key={i}>
                {/* Line text */}
                <rect
                  x="100"
                  y={cp.y}
                  width={70 * checkProgress}
                  height="6"
                  rx="3"
                  fill="var(--fg-muted)"
                  fillOpacity="0.3"
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
                <path
                  d={`M76 ${cp.y + 5} L80 ${cp.y + 9} L86 ${cp.y + 1}`}
                  stroke="var(--success)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  strokeDasharray="20"
                  strokeDashoffset={20 * (1 - checkProgress)}
                />
              </g>
            );
          })}

          {/* Signature line */}
          <g style={{ opacity: progress > 0.85 ? (progress - 0.85) * 6.67 : 0 }}>
            <line x1="75" y1="145" x2="165" y2="145" stroke="var(--fg-muted)" strokeWidth="1" />
            <path
              d="M90 142 Q105 130 120 142 Q135 154 150 142"
              stroke="var(--accent-primary)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="80"
              strokeDashoffset={progress > 0.9 ? 80 * (1 - (progress - 0.9) * 10) : 80}
            />
          </g>
        </g>

        {/* Seal / stamp effect */}
        <g 
          style={{ 
            transform: `scale(${progress > 0.95 ? 1 : 0})`, 
            transformOrigin: "190px 130px",
            transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
        >
          <circle cx="190" cy="130" r="22" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="2" />
          <CheckCircle2 x="178" y="118" width="24" height="24" stroke="var(--success)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

// ============================================
// FRAME 6: PARALLEL DELIVERY
// ============================================
function ParallelDelivery({ progress }: { progress: number }) {
  const leftProgress = Math.min(1, progress * 1.5);
  const rightProgress = Math.max(0, Math.min(1, (progress - 0.1) * 1.5));
  const completeProgress = Math.max(0, (progress - 0.7) * 3.33);

  const codeLines = [
    { code: "<App>", color: "#3b82f6" },
    { code: "  <Header/>", color: "#a855f7" },
    { code: "  <Hero/>", color: "#a855f7" },
    { code: "  <Features/>", color: "#a855f7" },
    { code: "</App>", color: "#3b82f6" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Dual glows */}
      <motion.div
        className="absolute left-1/4 w-32 h-32 bg-blue-500/15 rounded-full blur-3xl"
        style={{ opacity: leftProgress }}
      />
      <motion.div
        className="absolute right-1/4 w-32 h-32 bg-accent-primary/15 rounded-full blur-3xl"
        style={{ opacity: rightProgress }}
      />

      <div className="flex gap-4 items-stretch">
        {/* Left: Code Building */}
        <div
          className="relative w-36 bg-bg-tertiary/80 backdrop-blur border border-border-default rounded-xl overflow-hidden"
          style={{
            transform: `translateX(${(1 - leftProgress) * -60}px)`,
            opacity: leftProgress,
          }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-bg-secondary/50">
            <div className="w-2 h-2 rounded-full bg-red-500/70" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
            <div className="w-2 h-2 rounded-full bg-green-500/70" />
          </div>

          {/* Code lines */}
          <div className="p-3 font-mono text-[10px] space-y-1">
            {codeLines.map((line, i) => {
              const lineProgress = Math.max(0, Math.min(1, (leftProgress - 0.2 - i * 0.1) * 4));
              return (
                <div
                  key={i}
                  className="whitespace-pre"
                  style={{ 
                    color: line.color,
                    opacity: lineProgress,
                    transform: `translateX(${(1 - lineProgress) * -10}px)`,
                  }}
                >
                  {line.code}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-bg-secondary">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${leftProgress * 100}%` }}
            />
          </div>

          {/* Label */}
          <div className="absolute -bottom-7 left-0 right-0 text-center text-xs text-fg-muted flex items-center justify-center gap-1">
            <Code2 size={14} className="text-blue-500" />
            I Build
          </div>
        </div>

        {/* Center divider with checkmarks */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div
            className="w-px h-10 bg-border-default"
            style={{ transform: `scaleY(${completeProgress})` }}
          />
          <div
            className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center"
            style={{ 
              transform: `scale(${completeProgress})`,
              transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          >
            <CheckCircle2 
              size={24} 
              className="text-success"
              style={{ transform: `scale(${completeProgress > 0.5 ? 1 : 0})` }}
            />
          </div>
          <div
            className="w-px h-10 bg-border-default"
            style={{ transform: `scaleY(${completeProgress})` }}
          />
        </div>

        {/* Right: Trade Delivered */}
        <div
          className="relative w-36 bg-bg-tertiary/80 backdrop-blur border border-border-default rounded-xl overflow-hidden"
          style={{
            transform: `translateX(${(1 - rightProgress) * 60}px)`,
            opacity: rightProgress,
          }}
        >
          {/* Image gallery effect */}
          <div className="p-3 space-y-2">
            {[0, 1, 2].map((i) => {
              const cardProgress = Math.max(0, Math.min(1, (rightProgress - 0.2 - i * 0.15) * 3));
              return (
                <div
                  key={i}
                  className="h-10 rounded-lg bg-gradient-to-br from-accent-primary/20 to-accent-secondary/10 border border-accent-primary/20 flex items-center justify-center"
                  style={{
                    transform: `scale(${0.8 + cardProgress * 0.2})`,
                    opacity: cardProgress,
                  }}
                >
                  <Camera size={16} className="text-accent-primary" />
                </div>
              );
            })}
          </div>

          {/* Delivered badge */}
          <div
            className="absolute top-2 right-2 bg-success text-bg-primary text-xs font-bold px-2 py-0.5 rounded"
            style={{
              transform: `scale(${completeProgress})`,
              transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          >
            ✓
          </div>

          {/* Label */}
          <div className="absolute -bottom-7 left-0 right-0 text-center text-xs text-fg-muted flex items-center justify-center gap-1">
            <Sparkles size={14} className="text-accent-primary" />
            You Deliver
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN SCROLL ANIMATION COMPONENT
// ============================================
export function ScrollAnimation({ frames }: ScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          setProgress(self.progress);
          // 6 frames = 0-1 progress split into 6 segments
          const frame = Math.min(5, Math.floor(self.progress * 6));
          setCurrentFrame(frame);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Calculate per-frame progress (0-1 within each frame)
  const frameProgress = (progress * 6) % 1;
  const frameComponents = [
    <PriceTagShatter key="0" progress={currentFrame === 0 ? frameProgress : currentFrame > 0 ? 1 : 0} />,
    <PiecesMorph key="1" progress={currentFrame === 1 ? frameProgress : currentFrame > 1 ? 1 : 0} />,
    <FormAutoFill key="2" progress={currentFrame === 2 ? frameProgress : currentFrame > 2 ? 1 : 0} />,
    <ScalesBalance key="3" progress={currentFrame === 3 ? frameProgress : currentFrame > 3 ? 1 : 0} />,
    <ContractUnfold key="4" progress={currentFrame === 4 ? frameProgress : currentFrame > 4 ? 1 : 0} />,
    <ParallelDelivery key="5" progress={currentFrame === 5 ? frameProgress : 0} />,
  ];

  return (
    <div ref={containerRef} className="h-[600vh] relative">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-5xl w-full px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Animation */}
            <div className="relative aspect-[4/3] flex items-center justify-center">
              {frameComponents[currentFrame]}
            </div>

            {/* Right: Text content */}
            <div className="text-center lg:text-left">
              {/* Progress indicator */}
              <div className="flex items-center gap-2 mb-6">
                {frames.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full overflow-hidden bg-border-subtle"
                  >
                    <div
                      className="h-full bg-accent-primary transition-all duration-300"
                      style={{
                        width: i < currentFrame ? "100%" : i === currentFrame ? `${frameProgress * 100}%` : "0%",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Step badge */}
              <motion.div
                key={currentFrame}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 mb-4"
              >
                <span className="text-xs font-mono text-accent-primary">Step {currentFrame + 1} of 6</span>
              </motion.div>

              {/* Title */}
              <motion.h3
                key={`title-${currentFrame}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-3xl md:text-4xl font-bold text-fg-primary tracking-tight mb-4"
              >
                {frames[currentFrame]?.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                key={`desc-${currentFrame}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-lg text-fg-secondary leading-relaxed"
              >
                {frames[currentFrame]?.description}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fg-muted"
          animate={{ opacity: progress < 0.1 ? 1 : 0 }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-current">
              <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

