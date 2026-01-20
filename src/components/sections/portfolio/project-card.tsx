"use client";

import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  role: string;
  index: number;
}

export function ProjectCard({ title, role, index }: ProjectCardProps) {
  return (
    <motion.div
      className="group relative bg-bg-tertiary rounded-xl overflow-hidden border border-border-subtle hover:border-accent-primary/50 transition-all"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      {/* Animation placeholder */}
      <div className="aspect-video bg-bg-secondary relative overflow-hidden">
        <ProjectAnimation index={index} />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-tertiary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-fg-primary font-medium mb-1 group-hover:text-accent-primary transition-colors">
          {title}
        </h3>
        <p className="text-fg-muted text-sm italic">Role: {role}</p>
      </div>
    </motion.div>
  );
}

function ProjectAnimation({ index }: { index: number }) {
  const animations = [
    // Fintech dashboard
    <div key={0} className="w-full h-full p-4 flex flex-col gap-2">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="flex-1 h-8 bg-accent-primary/20 rounded"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
      <motion.div
        className="flex-1 bg-border-subtle/30 rounded"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      />
    </div>,
    // Logistics tracker
    <div key={1} className="w-full h-full p-4 relative">
      <div className="absolute inset-4 bg-border-subtle/20 rounded" />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-accent-primary rounded-full"
          style={{ left: `${20 + i * 30}%`, top: "50%" }}
          animate={{ x: [0, 20, 0], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>,
    // Healthcare portal
    <div key={2} className="w-full h-full p-4 flex gap-2">
      <div className="w-1/3 bg-border-subtle/30 rounded p-2 space-y-1">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="h-3 bg-fg-muted/10 rounded"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
      <div className="flex-1 bg-border-subtle/20 rounded" />
    </div>,
    // E-commerce admin
    <div key={3} className="w-full h-full p-4 grid grid-cols-4 gap-1">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="bg-border-subtle/30 rounded"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, type: "spring" }}
        />
      ))}
    </div>,
    // Publishing platform
    <div key={4} className="w-full h-full p-4 flex gap-2">
      <div className="flex-1 bg-border-subtle/20 rounded p-2">
        <motion.div
          className="h-2 w-3/4 bg-fg-muted/20 rounded mb-1"
          initial={{ width: 0 }}
          whileInView={{ width: "75%" }}
          viewport={{ once: true }}
        />
        <motion.div
          className="h-1 w-full bg-fg-muted/10 rounded"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        />
      </div>
      <div className="w-8 space-y-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-full aspect-square bg-accent-primary/30 rounded"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1 }}
          />
        ))}
      </div>
    </div>,
    // SaaS dashboard
    <div key={5} className="w-full h-full p-4 flex flex-col gap-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-6 h-6 bg-border-subtle/40 rounded-full"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
      <motion.div
        className="flex-1 bg-border-subtle/20 rounded flex items-end p-2 gap-1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {[60, 40, 80, 30, 70].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-accent-primary/30 rounded-t"
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1 }}
          />
        ))}
      </motion.div>
    </div>,
  ];

  return animations[index % animations.length];
}

