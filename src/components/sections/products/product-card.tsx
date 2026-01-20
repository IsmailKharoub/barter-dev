"use client";

import { motion } from "framer-motion";

interface ProductCardProps {
  title: string;
  description: string;
  tradeValue: string;
  index: number;
  animation: React.ReactNode;
}

export function ProductCard({
  title,
  description,
  tradeValue,
  index,
  animation,
}: ProductCardProps) {
  return (
    <motion.div
      className="group relative bg-bg-tertiary rounded-2xl overflow-hidden border border-border-subtle hover:border-accent-primary/50 transition-colors"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Animation area */}
      <div className="aspect-video bg-bg-secondary flex items-center justify-center overflow-hidden">
        {animation}
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-semibold text-fg-primary group-hover:text-accent-primary transition-colors">
          {title}
        </h3>
        <p className="text-fg-secondary text-sm leading-relaxed">
          {description}
        </p>
        <div className="pt-2 border-t border-border-subtle">
          <span className="text-xs text-fg-muted">Typical trade value</span>
          <p className="text-accent-primary font-mono font-medium">
            {tradeValue}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

