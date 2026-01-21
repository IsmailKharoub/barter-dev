"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedEffects } from "@/lib/hooks";
import { ProjectAnimation } from "./project-animations";

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  techHighlights: string[];
  featured?: boolean;
  index: number;
}

export function ProjectCard({
  id,
  title,
  category,
  description,
  techHighlights,
  featured = false,
  index,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const reducedEffects = useReducedEffects();
  const animationRef = useRef<HTMLDivElement>(null);
  const animationInView = useInView(animationRef, { margin: "-120px" });
  const shouldAnimate = !reducedEffects && (isHovered || animationInView);

  return (
    <motion.article
      className={`group relative bg-bg-tertiary rounded-2xl overflow-hidden border border-border-subtle transition-colors duration-300 ${
        isHovered ? "border-white/40" : "hover:border-border-default"
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-white/3 opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{ opacity: isHovered ? 1 : 0 }}
      />

      {/* Animation container */}
      <div
        ref={animationRef}
        className="relative bg-bg-secondary overflow-hidden aspect-video"
      >
        <ProjectAnimation projectId={id} isHovered={isHovered} shouldAnimate={shouldAnimate} />

        {/* Category badge */}
        <motion.div
          className="absolute top-3 start-3 px-2.5 py-1 bg-bg-primary/80 backdrop-blur-sm rounded-full border border-border-subtle"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <span className="text-[10px] font-medium text-fg-secondary tracking-wide uppercase">
            {category}
          </span>
        </motion.div>

        {/* Featured badge */}
        {featured && (
          <motion.div
            className="absolute top-3 end-3 px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
          >
            <span className="text-[10px] font-bold text-white tracking-wide uppercase">
              Featured
            </span>
          </motion.div>
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-bg-tertiary to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <motion.h3
          className={`font-semibold mb-2 text-fg-primary transition-colors duration-300 text-base ${
            isHovered ? "text-white" : ""
          }`}
        >
          {title}
        </motion.h3>

        {/* Description */}
        <p
          className="text-fg-secondary leading-relaxed mb-4 text-sm"
        >
          {description}
        </p>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1.5">
          {techHighlights.map((tech, i) => (
            <motion.span
              key={tech}
              className="px-2 py-0.5 text-[11px] font-medium text-fg-muted bg-bg-secondary rounded-md border border-border-subtle transition-colors duration-200 hover:border-white/30 hover:text-fg-secondary"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.4 + i * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Hover border gradient effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)"
            : "transparent",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  );
}
