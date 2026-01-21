"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function LaunchFastDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const phases = [
      { delay: 0 },     // Initial
      { delay: 300 },   // Browser chrome
      { delay: 600 },   // Nav bar
      { delay: 900 },   // Hero text
      { delay: 1200 },  // Subtext
      { delay: 1500 },  // CTA button
      { delay: 1800 },  // Features grid
      { delay: 2400 },  // Footer
    ];

    phases.forEach((p, i) => {
      setTimeout(() => setPhase(i), p.delay);
    });
  }, [isInView]);

  return (
    <div ref={containerRef} className="w-full h-full p-3 md:p-4 relative">
      <motion.div
        className="w-full h-full bg-[#0a0a0a] rounded-lg border border-white/10 overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* Browser chrome */}
        <motion.div
          className="h-5 bg-[#1a1a1a] flex items-center gap-1.5 px-2 border-b border-white/5"
          initial={{ opacity: 0 }}
          animate={phase >= 1 ? { opacity: 1 } : {}}
        >
          <div className="w-2 h-2 rounded-full bg-red-500/70" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <div className="w-2 h-2 rounded-full bg-green-500/70" />
          <div className="flex-1 mx-4">
            <div className="h-2.5 bg-white/10 rounded-full flex items-center px-2">
              <span className="text-[6px] text-white/40 font-mono">https://yourbrand.com</span>
            </div>
          </div>
        </motion.div>

        <div className="p-3 space-y-2">
          {/* Nav */}
          <motion.div
            className="flex items-center justify-between mb-3"
            initial={{ y: -10, opacity: 0 }}
            animate={phase >= 2 ? { y: 0, opacity: 1 } : {}}
          >
            <div className="w-6 h-6 rounded bg-white" />
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-1.5 w-6 bg-white/20 rounded" />
              ))}
            </div>
          </motion.div>

          {/* Hero text */}
          <motion.div
            className="text-center space-y-1.5"
            initial={{ opacity: 0 }}
            animate={phase >= 3 ? { opacity: 1 } : {}}
          >
            <motion.div
              className="h-4 w-3/4 mx-auto bg-gradient-to-r from-white/50 to-white/30 rounded"
              initial={{ scaleX: 0 }}
              animate={phase >= 3 ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5 }}
              style={{ transformOrigin: "center" }}
            />
            <motion.div
              className="h-1.5 w-1/2 mx-auto bg-white/15 rounded"
              initial={{ opacity: 0 }}
              animate={phase >= 4 ? { opacity: 1 } : {}}
            />
          </motion.div>

          {/* CTA */}
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0 }}
            animate={phase >= 5 ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="px-3 py-1 bg-white rounded text-[7px] text-black font-medium">
              Get Started
            </div>
          </motion.div>

          {/* Features grid */}
          <motion.div
            className="grid grid-cols-3 gap-1.5 mt-4"
            initial={{ opacity: 0 }}
            animate={phase >= 6 ? { opacity: 1 } : {}}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="bg-white/5 rounded p-2 border border-white/5"
                initial={{ y: 20, opacity: 0 }}
                animate={phase >= 6 ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-3 h-3 rounded bg-white/20 mb-1" />
                <div className="h-1 w-full bg-white/15 rounded" />
                <div className="h-1 w-2/3 bg-white/10 rounded mt-1" />
              </motion.div>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.div
            className="flex justify-center gap-3 mt-3 pt-2 border-t border-white/5"
            initial={{ opacity: 0 }}
            animate={phase >= 7 ? { opacity: 1 } : {}}
          >
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-1 w-4 bg-white/10 rounded" />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 -z-10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : {}}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white/10 rounded-full" />
      </motion.div>
    </div>
  );
}

