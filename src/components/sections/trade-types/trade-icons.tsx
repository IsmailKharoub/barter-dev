"use client";

import { motion } from "framer-motion";

// Animated icon wrapper for consistent styling
interface IconWrapperProps {
  children: React.ReactNode;
  color: string;
  className?: string;
}

function IconWrapper({ children, color, className = "" }: IconWrapperProps) {
  return (
    <div className={`relative icon-directional ${className}`}>
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-2xl blur-xl opacity-30"
        style={{ backgroundColor: color }}
      />
      {/* Icon container */}
      <div className="relative w-14 h-14 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// Design & Creative - Pen tool / paintbrush aesthetic
export function DesignCreativeIcon({ color }: { color: string }) {
  return (
    <IconWrapper color={color}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M24 4L28 8L10 26H6V22L24 4Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.path
          d="M20 8L24 12"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
        />
        <motion.circle
          cx="8"
          cy="24"
          r="2"
          fill={color}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.8 }}
        />
      </svg>
    </IconWrapper>
  );
}

// Professional Services - Briefcase/Scale of justice aesthetic
export function ProfessionalServicesIcon({ color }: { color: string }) {
  return (
    <IconWrapper color={color}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Balance beam */}
        <motion.line
          x1="16"
          y1="6"
          x2="16"
          y2="10"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        />
        <motion.line
          x1="6"
          y1="12"
          x2="26"
          y2="12"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        {/* Left scale */}
        <motion.path
          d="M6 12L8 20H4L6 12Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0, y: -5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
        />
        {/* Right scale */}
        <motion.path
          d="M26 12L28 20H24L26 12Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0, y: -5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
        />
        {/* Base */}
        <motion.path
          d="M16 10V26M12 26H20"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        />
      </svg>
    </IconWrapper>
  );
}

// Physical Goods - Box/Package aesthetic
export function PhysicalGoodsIcon({ color }: { color: string }) {
  return (
    <IconWrapper color={color}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Box body */}
        <motion.path
          d="M4 10L16 4L28 10V22L16 28L4 22V10Z"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        {/* Middle line */}
        <motion.path
          d="M16 16V28"
          stroke={color}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.5 }}
        />
        {/* Top diagonal lines */}
        <motion.path
          d="M4 10L16 16L28 10"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
      </svg>
    </IconWrapper>
  );
}

// Access & Opportunity - Key/Door opening aesthetic
export function AccessOpportunityIcon({ color }: { color: string }) {
  return (
    <IconWrapper color={color}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Door frame */}
        <motion.rect
          x="8"
          y="4"
          width="16"
          height="24"
          rx="2"
          stroke={color}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
        {/* Opening rays */}
        <motion.path
          d="M28 10L32 8M28 16L33 16M28 22L32 24"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ opacity: 0, x: -5 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
        />
        {/* Door handle */}
        <motion.circle
          cx="20"
          cy="16"
          r="1.5"
          fill={color}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.7 }}
        />
        {/* Light beam */}
        <motion.path
          d="M24 8V24"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="2 2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
      </svg>
    </IconWrapper>
  );
}

// Skilled Labor - Hammer/Wrench aesthetic
export function SkilledLaborIcon({ color }: { color: string }) {
  return (
    <IconWrapper color={color}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hammer head */}
        <motion.rect
          x="6"
          y="6"
          width="12"
          height="6"
          rx="1"
          stroke={color}
          strokeWidth="2"
          initial={{ scale: 0, rotate: -10 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, type: "spring" }}
        />
        {/* Hammer handle */}
        <motion.path
          d="M12 12L12 28"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        {/* Wrench */}
        <motion.path
          d="M22 14C24.5 14 26.5 16 26.5 18.5C26.5 19.5 26.2 20.4 25.7 21.1L28 28L24 28L22.5 22C22.3 22 22.2 22 22 22C19.5 22 17.5 20 17.5 17.5C17.5 15 19.5 14 22 14Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
      </svg>
    </IconWrapper>
  );
}

// Hybrid - Puzzle pieces / mix aesthetic
export function HybridIcon({ color }: { color: string }) {
  return (
    <IconWrapper color={color}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* First puzzle piece */}
        <motion.path
          d="M6 6H14V10C14 11.5 15.5 12 16 12C16.5 12 18 11.5 18 10V6H14"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
        {/* Connecting arc */}
        <motion.path
          d="M6 6V16H10C11.5 16 12 14.5 12 14C12 13.5 11.5 12 10 12H6"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        {/* Exchange arrows */}
        <motion.path
          d="M20 12L26 12M26 12L23 9M26 12L23 15"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0, x: -5 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
        />
        <motion.path
          d="M26 22L20 22M20 22L23 19M20 22L23 25"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0, x: 5 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
        />
        {/* Plus sign representing addition */}
        <motion.path
          d="M12 22V28M9 25H15"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.6 }}
        />
      </svg>
    </IconWrapper>
  );
}

// Export icon map for easy access
export const tradeCategoryIcons = {
  designCreative: DesignCreativeIcon,
  professionalServices: ProfessionalServicesIcon,
  physicalGoods: PhysicalGoodsIcon,
  accessOpportunity: AccessOpportunityIcon,
  skilledLabor: SkilledLaborIcon,
  hybrid: HybridIcon,
} as const;

export type TradeCategoryKey = keyof typeof tradeCategoryIcons;

