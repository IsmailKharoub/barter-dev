"use client";

import {
  AgriMLAnimation,
  CrossBorderAnimation,
  MobilityAnimation,
  FleetAnimation,
  MedicalAnimation,
  LearningAnimation,
} from "./animations";
import { motion } from "framer-motion";

interface ProjectAnimationProps {
  projectId: string;
  isHovered?: boolean;
}

const animationMap: Record<string, React.ComponentType<{ isHovered?: boolean }>> = {
  "agri-ml": AgriMLAnimation,
  "cross-border": CrossBorderAnimation,
  "mobility": MobilityAnimation,
  "fleet": FleetAnimation,
  "medical": MedicalAnimation,
  "learning": LearningAnimation,
};

export function ProjectAnimation({ projectId, isHovered = false }: ProjectAnimationProps) {
  const AnimationComponent = animationMap[projectId];

  if (!AnimationComponent) {
    return <DefaultAnimation isHovered={isHovered} />;
  }

  return <AnimationComponent isHovered={isHovered} />;
}

function DefaultAnimation({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-bg-secondary/50">
      <motion.div
        className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary/30 to-accent-secondary/20 border border-accent-primary/40 flex items-center justify-center"
        animate={isHovered ? { rotate: 360, scale: [1, 1.1, 1] } : {}}
        transition={{ 
          rotate: { duration: 4, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: Infinity }
        }}
      >
        <span className="text-accent-primary text-xs font-mono">?</span>
      </motion.div>
    </div>
  );
}
