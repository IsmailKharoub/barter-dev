"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { tradeCategoryIcons, type TradeCategoryKey } from "./trade-icons";

interface TradeCategoryProps {
  categoryKey: TradeCategoryKey;
  title: string;
  description: string;
  items: string[];
  index: number;
  accentColor: string;
  accentName: string;
}

export function TradeCategory({
  categoryKey,
  title,
  description,
  items,
  index,
  accentColor,
  accentName,
}: TradeCategoryProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = tradeCategoryIcons[categoryKey];

  // Dynamic accent classes - now all grayscale for B&W theme
  const accentClasses = {
    white: {
      border: "hover:border-white/30",
      bg: "bg-white/5",
      text: "text-white",
      glow: "group-hover:shadow-white/10",
      dot: "bg-white",
      itemHover: "hover:bg-white/10",
    },
    gray: {
      border: "hover:border-gray-400/30",
      bg: "bg-white/5",
      text: "text-gray-300",
      glow: "group-hover:shadow-white/5",
      dot: "bg-gray-400",
      itemHover: "hover:bg-white/10",
    },
    // Keep legacy names mapping to grayscale for backwards compatibility
    rose: {
      border: "hover:border-white/30",
      bg: "bg-white/5",
      text: "text-white",
      glow: "group-hover:shadow-white/10",
      dot: "bg-white",
      itemHover: "hover:bg-white/10",
    },
    sky: {
      border: "hover:border-gray-400/30",
      bg: "bg-white/5",
      text: "text-gray-300",
      glow: "group-hover:shadow-white/5",
      dot: "bg-gray-400",
      itemHover: "hover:bg-white/10",
    },
    amber: {
      border: "hover:border-white/30",
      bg: "bg-white/5",
      text: "text-white",
      glow: "group-hover:shadow-white/10",
      dot: "bg-white",
      itemHover: "hover:bg-white/10",
    },
    emerald: {
      border: "hover:border-gray-400/30",
      bg: "bg-white/5",
      text: "text-gray-300",
      glow: "group-hover:shadow-white/5",
      dot: "bg-gray-400",
      itemHover: "hover:bg-white/10",
    },
    violet: {
      border: "hover:border-white/30",
      bg: "bg-white/5",
      text: "text-white",
      glow: "group-hover:shadow-white/10",
      dot: "bg-white",
      itemHover: "hover:bg-white/10",
    },
    orange: {
      border: "hover:border-gray-400/30",
      bg: "bg-white/5",
      text: "text-gray-300",
      glow: "group-hover:shadow-white/5",
      dot: "bg-gray-400",
      itemHover: "hover:bg-white/10",
    },
  };

  const colors = accentClasses[accentName as keyof typeof accentClasses] || accentClasses.white;

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      style={{
        perspective: "1000px",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={`
          relative h-full rounded-2xl overflow-hidden
          border border-border-subtle ${colors.border}
          bg-bg-tertiary/50 backdrop-blur-sm
          transition-all duration-500
          shadow-lg shadow-black/5 ${colors.glow}
          group-hover:shadow-2xl
        `}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Gradient overlay on hover */}
        <div
          className={`
            absolute inset-0 opacity-0 group-hover:opacity-100
            transition-opacity duration-500 pointer-events-none
            ${colors.bg}
          `}
        />

        {/* Corner accent */}
        <div
          className="absolute top-0 end-0 w-32 h-32 opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 100% 0%, ${accentColor} 0%, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative p-6 lg:p-8 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              {/* Category number */}
              <motion.span
                className="inline-block text-xs font-mono text-fg-muted mb-2 tracking-widest"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                0{index + 1}
              </motion.span>

              {/* Title */}
              <h3
                className={`text-xl lg:text-2xl font-bold text-fg-primary group-hover:${colors.text} transition-colors duration-300`}
              >
                {title}
              </h3>

              {/* Description */}
              <p className="text-sm text-fg-secondary mt-2 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Icon */}
            <motion.div
              className="flex-shrink-0 ms-4"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
            >
              <Icon color={accentColor} />
            </motion.div>
          </div>

          {/* Items list */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {items.map((item, i) => (
                <motion.span
                  key={i}
                  className={`
                    inline-flex items-center gap-2 py-1.5 px-3 rounded-full
                    bg-white/5 border border-white/10
                    text-fg-secondary text-sm
                    transition-all duration-200
                    hover:bg-white/10 hover:border-white/20
                  `}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1 + 0.4 + i * 0.05,
                    duration: 0.3,
                  }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
