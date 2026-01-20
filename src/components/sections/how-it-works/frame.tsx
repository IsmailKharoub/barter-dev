"use client";

import { motion } from "framer-motion";
import { FrameIcon } from "./frame-icon";

export type FrameType =
  | "problem"
  | "alternative"
  | "apply"
  | "evaluate"
  | "agree"
  | "deliver";

interface FrameProps {
  type: FrameType;
  title: string;
  description: string;
  isActive: boolean;
}

export function Frame({ type, title, description, isActive }: FrameProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center gap-8 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: isActive ? 1 : 0.3,
        y: isActive ? 0 : 20,
        scale: isActive ? 1 : 0.95,
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="w-32 h-32 md:w-40 md:h-40">
        <FrameIcon type={type} className="w-full h-full" />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl md:text-3xl font-semibold text-fg-primary">
          {title}
        </h3>
        <p className="text-lg md:text-xl text-fg-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

