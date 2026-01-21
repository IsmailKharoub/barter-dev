"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-white text-black font-semibold
    shadow-[0_0_24px_rgba(255,255,255,0.15)]
  `,
  secondary: `
    bg-transparent text-fg-primary
    border border-border-default
  `,
  ghost: `
    bg-transparent text-fg-secondary
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  onClick,
  type = "button",
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center gap-2",
        "font-medium rounded-full overflow-hidden",
        "cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        // Focus state
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Animated background for primary */}
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-300"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "0%" : "-100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}

      {/* Hover glow effect for primary */}
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Border animation for secondary */}
      {variant === "secondary" && (
        <motion.div
          className="absolute inset-0 rounded-full border border-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Content */}
      <span className={cn(
        "relative z-10 flex items-center gap-2 transition-colors duration-200",
        variant === "secondary" && isHovered && "text-white",
        variant === "ghost" && isHovered && "text-fg-primary",
      )}>
        {children}
      </span>

      {/* Shine effect for primary on hover */}
      {variant === "primary" && isHovered && (
        <motion.div
          className="absolute inset-0 z-10"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "100%", opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          }}
        />
      )}
    </motion.button>
  );
}

Button.displayName = "Button";
