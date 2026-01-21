"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Typewriter effect component
function TypewriterText({ 
  text, 
  delay = 0, 
  speed = 50,
  className = "",
  onComplete,
}: { 
  text: string; 
  delay?: number; 
  speed?: number;
  className?: string;
  onComplete?: () => void;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [displayedText, started, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {started && displayedText.length < text.length && (
        <motion.span 
          className="inline-block w-0.5 h-[1em] bg-white ml-0.5 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </span>
  );
}

export function MarketingSiteDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [phase, setPhase] = useState(0);

  // Progress through animation phases when in view
  useEffect(() => {
    if (!isInView) return;
    
    const phases = [
      { delay: 0 },      // 0: Browser appears
      { delay: 400 },    // 1: URL bar
      { delay: 800 },    // 2: Navigation
      { delay: 1400 },   // 3: Hero headline
      { delay: 2800 },   // 4: Hero subtext
      { delay: 3400 },   // 5: CTA button
      { delay: 4000 },   // 6: Hero image
      { delay: 4600 },   // 7: Feature cards
      { delay: 5400 },   // 8: Complete
    ];

    phases.forEach((p, i) => {
      setTimeout(() => setPhase(i), p.delay);
    });
  }, [isInView]);

  return (
    <div ref={containerRef} className="w-full h-full p-4 md:p-6">
      {/* Browser window */}
      <motion.div
        className="w-full h-full bg-[#0f0f0f] rounded-lg border border-border-default overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {/* Browser chrome */}
        <div className="h-8 bg-[#1a1a1a] flex items-center px-3 gap-2 border-b border-border-subtle">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <motion.div 
              className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"
              initial={{ scale: 0 }}
              animate={phase >= 0 ? { scale: 1 } : {}}
              transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
            />
            <motion.div 
              className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"
              initial={{ scale: 0 }}
              animate={phase >= 0 ? { scale: 1 } : {}}
              transition={{ delay: 0.15, type: "spring", stiffness: 500 }}
            />
            <motion.div 
              className="w-2.5 h-2.5 rounded-full bg-[#28c840]"
              initial={{ scale: 0 }}
              animate={phase >= 0 ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
            />
          </div>

          {/* URL bar */}
          <motion.div 
            className="flex-1 mx-2 h-5 bg-[#0f0f0f] rounded flex items-center px-2 overflow-hidden"
            initial={{ opacity: 0, width: 0 }}
            animate={phase >= 1 ? { opacity: 1, width: "100%" } : {}}
            transition={{ duration: 0.3 }}
          >
            {phase >= 1 && (
              <span className="text-[10px] text-fg-muted font-mono truncate">
                <TypewriterText text="https://yourcompany.com" delay={200} speed={30} />
              </span>
            )}
          </motion.div>
        </div>

        {/* Website content */}
        <div className="h-[calc(100%-2rem)] overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#111]">
          {/* Navigation */}
          <motion.div 
            className="h-10 border-b border-white/5 flex items-center justify-between px-4"
            initial={{ opacity: 0, y: -10 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 }}
            >
              <div className="w-5 h-5 rounded bg-white" />
              <div className="h-2 w-12 bg-white/80 rounded-sm" />
            </motion.div>

            {/* Nav items */}
            <div className="flex gap-3">
              {["Products", "About", "Contact"].map((item, i) => (
                <motion.div
                  key={item}
                  className="h-1.5 w-8 bg-white/40 rounded-sm"
                  initial={{ opacity: 0, x: 10 }}
                  animate={phase >= 2 ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Hero section */}
          <div className="p-4 md:p-6 space-y-4">
            {/* Headline */}
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={phase >= 3 ? { opacity: 1 } : {}}
              >
                <div className="text-[10px] md:text-sm font-bold text-white/90 leading-tight">
                  {phase >= 3 && (
                    <TypewriterText 
                      text="Build Something" 
                      delay={0} 
                      speed={40}
                    />
                  )}
                </div>
                <div className="text-[10px] md:text-sm font-bold text-white/90 leading-tight">
                  {phase >= 3 && (
                    <TypewriterText 
                      text="Remarkable" 
                      delay={600} 
                      speed={50}
                    />
                  )}
                </div>
              </motion.div>

              {/* Subtext */}
              <motion.div
                className="h-1.5 w-3/4 bg-white/20 rounded-sm"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={phase >= 4 ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: "left" }}
              />
              <motion.div
                className="h-1.5 w-1/2 bg-white/15 rounded-sm"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={phase >= 4 ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ transformOrigin: "left" }}
              />
            </div>

            {/* CTA Button */}
            <motion.div
              className="w-16 h-5 bg-white rounded flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={phase >= 5 ? { scale: 1, opacity: 1 } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <div className="h-1.5 w-8 bg-black/30 rounded-sm" />
            </motion.div>

            {/* Hero image placeholder */}
            <motion.div
              className="mt-4 aspect-video max-h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/10 overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              animate={phase >= 6 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={phase >= 6 ? { x: ["-100%", "100%"] } : {}}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              {/* Placeholder content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white/30 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[6px] border-l-white/50 border-y-[4px] border-y-transparent ml-0.5" />
                </div>
              </div>
            </motion.div>

            {/* Feature cards */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="aspect-square bg-white/5 rounded border border-white/10 p-2 flex flex-col"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={phase >= 7 ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ 
                    delay: i * 0.15,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                >
                  <div className="w-3 h-3 rounded bg-white/20 mb-1" />
                  <div className="h-1 w-full bg-white/20 rounded-sm" />
                  <div className="h-1 w-2/3 bg-white/10 rounded-sm mt-0.5" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Completion glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={phase >= 8 ? { opacity: [0, 1, 0] } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Ambient glow behind browser */}
      <motion.div
        className="absolute inset-0 -z-10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : {}}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white/10 rounded-full" />
      </motion.div>
    </div>
  );
}

