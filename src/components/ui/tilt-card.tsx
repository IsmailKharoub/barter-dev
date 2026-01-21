"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glareEnabled?: boolean;
  tiltMaxAngle?: number;
  scale?: number;
  transitionSpeed?: number;
  onClick?: () => void;
}

export function TiltCard({
  children,
  className,
  glareEnabled = true,
  tiltMaxAngle = 15,
  scale = 1.02,
  transitionSpeed = 400,
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring configuration
  const springConfig = { damping: 30, stiffness: transitionSpeed };
  
  // Smooth tilt values
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [tiltMaxAngle, -tiltMaxAngle]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-tiltMaxAngle, tiltMaxAngle]),
    springConfig
  );
  
  // Glare position
  const glareX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [0, 100]),
    springConfig
  );
  const glareY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [0, 100]),
    springConfig
  );
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalized position from -0.5 to 0.5
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;
    
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  }, [mouseX, mouseY]);
  
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "cursor-card relative rounded-2xl overflow-hidden",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        rotateX,
        rotateY,
      }}
      whileHover={{ scale }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Card content with 3D lift */}
      <motion.div
        className="relative h-full"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
      
      {/* Glare effect */}
      {glareEnabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(
              circle at ${glareX}% ${glareY}%,
              rgba(255,255,255,0.15) 0%,
              transparent 50%
            )`,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ opacity: { duration: 0.2 } }}
        />
      )}
      
      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(245, 158, 11, 0.2)",
        }}
        animate={{
          boxShadow: isHovered
            ? "inset 0 0 0 1px rgba(245, 158, 11, 0.4), 0 0 30px rgba(245, 158, 11, 0.15)"
            : "inset 0 0 0 1px rgba(245, 158, 11, 0.1)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// Floating 3D element helper - adds depth to child elements
export function Float3D({
  children,
  depth = 20,
  className,
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      style={{
        transform: `translateZ(${depth}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}

