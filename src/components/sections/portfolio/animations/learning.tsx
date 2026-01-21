"use client";

import { motion } from "framer-motion";
import type { AnimationProps } from "./types";

const participants = [
  { id: 1, speaking: true, name: "Teacher" },
  { id: 2, speaking: false, name: "Student A" },
  { id: 3, speaking: false, name: "Student B" },
  { id: 4, speaking: false, name: "Student C" },
];

function VideoTile({ 
  participant, 
  index, 
  isHovered 
}: { 
  participant: typeof participants[0]; 
  index: number;
  isHovered: boolean;
}) {
  const isTeacher = participant.speaking;
  
  return (
    <motion.div
      className="relative bg-bg-tertiary rounded-lg overflow-hidden border border-border-subtle"
      style={{ aspectRatio: "4/3" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
    >
      {/* Video placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-secondary to-bg-tertiary">
        {/* Avatar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-6 h-6 rounded-full bg-accent-primary/20 flex items-center justify-center"
            animate={isHovered && isTeacher ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span className="text-xs">{isTeacher ? "👨‍🏫" : "👨‍🎓"}</span>
          </motion.div>
        </div>
      </div>

      {/* Speaking indicator */}
      {isTeacher && (
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-success"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? [0, 1, 0] : 0.8 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Audio wave for speaker */}
      {isTeacher && (
        <div className="absolute bottom-1 left-1 right-1 flex items-end justify-center gap-0.5 h-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-0.5 bg-success rounded-full"
              animate={{ 
                height: isHovered 
                  ? [2, 4 + Math.random() * 8, 2] 
                  : [2, 6, 2]
              }}
              transition={{ 
                duration: 0.3 + Math.random() * 0.2, 
                repeat: Infinity,
                delay: i * 0.05 
              }}
            />
          ))}
        </div>
      )}

      {/* Name tag */}
      <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-bg-primary/80 rounded text-[7px] font-mono text-fg-muted backdrop-blur-sm">
        {participant.name}
      </div>

      {/* Mute indicator for non-speakers */}
      {!isTeacher && (
        <div className="absolute bottom-1 right-1 w-3 h-3 bg-red-500/20 rounded-full flex items-center justify-center">
          <span className="text-[6px]">🔇</span>
        </div>
      )}
    </motion.div>
  );
}

function VideoGrid({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      className="absolute left-3 top-3 w-[45%]"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* Live indicator */}
      <div className="flex items-center gap-1.5 mb-2">
        <motion.div
          className="flex items-center gap-1 px-2 py-0.5 bg-red-500/20 rounded-full"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-red-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <span className="text-[8px] font-mono text-red-400 font-bold">LIVE</span>
        </motion.div>
        <span className="text-[8px] font-mono text-fg-muted">4 participants</span>
      </div>

      {/* Video tiles */}
      <div className="grid grid-cols-2 gap-1.5">
        {participants.map((p, i) => (
          <VideoTile 
            key={p.id} 
            participant={p} 
            index={i} 
            isHovered={isHovered} 
          />
        ))}
      </div>
    </motion.div>
  );
}

function GameCanvas({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      className="absolute right-3 top-3 bottom-3 w-[45%] bg-gradient-to-br from-accent-primary/10 via-success/5 to-accent-secondary/10 rounded-xl border border-accent-primary/30 overflow-hidden"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {/* Game header */}
      <div className="p-2 border-b border-accent-primary/20 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">🎮</span>
          <span className="text-[9px] font-mono text-accent-primary uppercase tracking-wider">Game Mode</span>
        </div>
        <motion.div
          className="px-1.5 py-0.5 bg-success/20 rounded text-[8px] font-mono text-success font-bold"
          animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          +100
        </motion.div>
      </div>

      {/* Game elements */}
      <div className="relative h-[calc(100%-36px)] p-3">
        {/* Floating game elements */}
        {[
          { emoji: "🎯", x: 20, y: 30, delay: 0 },
          { emoji: "⭐", x: 60, y: 20, delay: 0.2 },
          { emoji: "🏆", x: 40, y: 60, delay: 0.4 },
          { emoji: "💎", x: 75, y: 45, delay: 0.6 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-lg"
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: isHovered ? [0, -8, 0] : 0,
              rotate: isHovered ? [0, 10, -10, 0] : 0,
            }}
            transition={{ 
              scale: { delay: 0.5 + item.delay, type: "spring" },
              y: { duration: 2, repeat: Infinity, delay: item.delay },
              rotate: { duration: 2, repeat: Infinity, delay: item.delay },
            }}
          >
            {item.emoji}
          </motion.div>
        ))}

        {/* Progress ring */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <svg width="60" height="60" className="transform -rotate-90">
            <circle
              cx="30"
              cy="30"
              r="26"
              fill="none"
              stroke="rgba(245,158,11,0.2)"
              strokeWidth="4"
            />
            <motion.circle
              cx="30"
              cy="30"
              r="26"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={163.36}
              initial={{ strokeDashoffset: 163.36 }}
              animate={{ strokeDashoffset: isHovered ? 40 : 80 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-lg font-bold text-accent-primary"
              animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {isHovered ? "85" : "75"}%
            </motion.span>
          </div>
        </motion.div>

        {/* Leaderboard preview */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-2 bg-bg-primary/80 backdrop-blur-sm rounded-t-lg border-t border-accent-primary/20"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-between text-[8px] font-mono">
            <span className="text-fg-muted">Leaderboard</span>
            <div className="flex items-center gap-2">
              {["🥇", "🥈", "🥉"].map((medal, i) => (
                <motion.span
                  key={i}
                  animate={isHovered ? { y: [0, -2, 0] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                >
                  {medal}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ClassInfo() {
  return (
    <motion.div
      className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 bg-bg-tertiary/80 rounded-full border border-border-subtle backdrop-blur-sm"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <span className="text-[9px] font-mono text-fg-muted">Math 101</span>
      <div className="w-px h-3 bg-border-subtle" />
      <span className="text-[9px] font-mono text-accent-primary">Level 3</span>
    </motion.div>
  );
}

export function LearningAnimation({ isHovered = false }: AnimationProps) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Video grid */}
      <VideoGrid isHovered={isHovered} />

      {/* Game canvas */}
      <GameCanvas isHovered={isHovered} />

      {/* Class info */}
      <ClassInfo />
    </div>
  );
}

