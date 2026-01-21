"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  magneticStrength?: number;
  type?: "button" | "submit" | "reset";
}

export function MagneticButton({
  children,
  className,
  onClick,
  disabled,
  magneticStrength = 0.3,
  type = "button",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring configuration for smooth magnetic pull
  const springConfig = { damping: 25, stiffness: 400 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // Liquid blob effect values
  const blobX = useMotionValue(0);
  const blobY = useMotionValue(0);
  const springBlobX = useSpring(blobX, { damping: 30, stiffness: 300 });
  const springBlobY = useSpring(blobY, { damping: 30, stiffness: 300 });
  
  // Transform mouse position to rotation
  const rotateX = useTransform(y, [-20, 20], [5, -5]);
  const rotateY = useTransform(x, [-20, 20], [-5, 5]);
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;
    
    mouseX.set(deltaX);
    mouseY.set(deltaY);
    
    // Update blob position (normalized 0-100)
    const normalizedX = ((e.clientX - rect.left) / rect.width) * 100;
    const normalizedY = ((e.clientY - rect.top) / rect.height) * 100;
    blobX.set(normalizedX);
    blobY.set(normalizedY);
  }, [mouseX, mouseY, blobX, blobY, magneticStrength, disabled]);
  
  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    blobX.set(50);
    blobY.set(50);
    setIsHovered(false);
  }, [mouseX, mouseY, blobX, blobY]);
  
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "magnetic-button relative inline-flex items-center justify-center",
        "px-8 py-4 text-lg font-semibold rounded-full",
        "bg-white text-black",
        "shadow-[0_0_30px_rgba(255,255,255,0.2)]",
        "overflow-hidden cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
        className
      )}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Liquid blob background that follows cursor */}
      <motion.div
        className="absolute w-[200%] h-[200%] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 50%)",
          left: springBlobX,
          top: springBlobY,
          x: "-50%",
          y: "-50%",
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />
      
      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-300"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "0%" : "-100%" }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      />
      
      {/* Base background */}
      <motion.div
        className="absolute inset-0 bg-white"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Shine sweep effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "200%", opacity: [0, 0.4, 0] }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            width: "50%",
          }}
        />
      )}
      
      {/* Content with 3D lift */}
      <motion.span
        className="relative z-10 flex items-center gap-2"
        style={{
          translateZ: isHovered ? 10 : 0,
        }}
      >
        {children}
      </motion.span>
      
      {/* Glow intensification on hover */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: "0 0 40px rgba(255,255,255,0.3)",
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}

