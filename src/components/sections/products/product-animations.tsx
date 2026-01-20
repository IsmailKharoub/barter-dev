"use client";

import { motion } from "framer-motion";

export function MarketingSiteAnimation() {
  return (
    <div className="w-full h-full p-4">
      <motion.div
        className="w-full h-full bg-bg-primary rounded-lg border border-border-subtle overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* Nav */}
        <motion.div
          className="h-6 bg-bg-tertiary flex items-center gap-1 px-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </motion.div>

        <div className="p-3 space-y-2">
          {/* Header */}
          <motion.div
            className="h-3 w-1/3 bg-fg-muted/20 rounded"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            viewport={{ once: true }}
            style={{ transformOrigin: "left" }}
          />
          {/* Hero text */}
          <motion.div
            className="h-6 w-2/3 bg-accent-primary/30 rounded mt-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
            style={{ transformOrigin: "left" }}
          />
          {/* Subtext */}
          <motion.div
            className="h-2 w-1/2 bg-fg-muted/10 rounded"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
          />
          {/* CTA */}
          <motion.div
            className="h-4 w-16 bg-accent-primary rounded mt-2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.9, type: "spring" }}
            viewport={{ once: true }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export function WebAppAnimation() {
  return (
    <div className="w-full h-full p-4">
      <motion.div className="w-full h-full bg-bg-primary rounded-lg border border-border-subtle overflow-hidden flex">
        {/* Sidebar */}
        <motion.div
          className="w-12 bg-bg-tertiary p-2 space-y-2"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-full aspect-square rounded ${
                i === 0 ? "bg-accent-primary/30" : "bg-fg-muted/10"
              }`}
            />
          ))}
        </motion.div>

        {/* Main content */}
        <div className="flex-1 p-3 space-y-2">
          {/* Stats row */}
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="flex-1 h-10 bg-bg-tertiary rounded p-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-1 w-1/2 bg-fg-muted/20 rounded" />
                <div className="h-2 w-3/4 bg-accent-primary/40 rounded mt-1" />
              </motion.div>
            ))}
          </div>

          {/* Chart placeholder */}
          <motion.div
            className="h-16 bg-bg-tertiary rounded flex items-end p-2 gap-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
          >
            {[40, 60, 30, 80, 50, 70, 45].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-accent-primary/40 rounded-t"
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                transition={{ delay: 0.8 + i * 0.05 }}
                viewport={{ once: true }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export function EcommerceAnimation() {
  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-full bg-bg-primary rounded-lg border border-border-subtle overflow-hidden p-3">
        {/* Product grid */}
        <div className="grid grid-cols-3 gap-2 h-full">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="bg-bg-tertiary rounded flex flex-col"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.1, type: "spring" }}
              viewport={{ once: true }}
            >
              <div className="flex-1 bg-fg-muted/5 rounded-t" />
              <div className="p-1">
                <div className="h-1 w-2/3 bg-fg-muted/20 rounded" />
                <div className="h-1.5 w-1/2 bg-accent-primary/40 rounded mt-1" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cart icon */}
        <motion.div
          className="absolute bottom-6 right-6 w-8 h-8 bg-accent-primary rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          viewport={{ once: true }}
        >
          <span className="text-xs text-bg-primary font-bold">3</span>
        </motion.div>
      </div>
    </div>
  );
}

export function CmsAnimation() {
  return (
    <div className="w-full h-full p-4">
      <motion.div className="w-full h-full bg-bg-primary rounded-lg border border-border-subtle overflow-hidden flex">
        {/* Content blocks */}
        <div className="flex-1 p-3 space-y-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="bg-bg-tertiary rounded p-2 cursor-move"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-accent-primary/50 rounded" />
                <div className="h-2 flex-1 bg-fg-muted/20 rounded" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Preview */}
        <motion.div
          className="w-1/2 bg-bg-secondary p-2 border-l border-border-subtle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-[8px] text-fg-muted mb-1">Preview</div>
          <div className="space-y-1">
            <div className="h-1.5 w-2/3 bg-fg-muted/20 rounded" />
            <div className="h-1 w-full bg-fg-muted/10 rounded" />
            <div className="h-1 w-4/5 bg-fg-muted/10 rounded" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

