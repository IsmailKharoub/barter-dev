"use client";

import { motion } from "framer-motion";

interface TradeCategoryProps {
  title: string;
  items: string[];
  index: number;
}

export function TradeCategory({ title, items, index }: TradeCategoryProps) {
  return (
    <motion.div
      className="bg-bg-tertiary rounded-xl p-6 border border-border-subtle hover:border-accent-primary/30 transition-colors"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <h3 className="text-lg font-semibold text-fg-primary mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <motion.li
            key={i}
            className="text-fg-secondary text-sm flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + i * 0.05 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary/50" />
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

