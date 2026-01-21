"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function IntegrationsDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [phase, setPhase] = useState(0);
  const [dataFlowing, setDataFlowing] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const phases = [
      { delay: 0 },
      { delay: 400 },   // Central hub appears
      { delay: 800 },   // Connectors appear
      { delay: 1200 },  // API boxes appear
      { delay: 1600 },  // Data starts flowing
      { delay: 3000 },  // Success state
    ];

    phases.forEach((p, i) => {
      setTimeout(() => setPhase(i), p.delay);
    });

    setTimeout(() => setDataFlowing(true), 1600);
  }, [isInView]);

  const apis = [
    { name: "Stripe", color: "violet", position: "top-2 left-1/2 -translate-x-1/2" },
    { name: "Twilio", color: "red", position: "top-1/2 right-2 -translate-y-1/2" },
    { name: "AWS", color: "orange", position: "bottom-2 left-1/2 -translate-x-1/2" },
    { name: "Slack", color: "purple", position: "top-1/2 left-2 -translate-y-1/2" },
  ];

  return (
    <div ref={containerRef} className="w-full h-full p-3 md:p-4 relative">
      <motion.div
        className="w-full h-full bg-[#0a0a0a] rounded-lg border border-white/10 overflow-hidden shadow-2xl relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* Central hub */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={phase >= 1 ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="w-8 h-8 rounded-lg bg-white flex items-center justify-center"
            animate={phase >= 5 ? { boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)" } : {}}
          >
            <span className="text-[8px] font-bold text-black">API</span>
          </motion.div>
        </motion.div>

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
          {/* Top */}
          <motion.line
            x1="50%" y1="50%" x2="50%" y2="20"
            stroke="url(#line-gradient)"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={phase >= 2 ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          />
          {/* Right */}
          <motion.line
            x1="50%" y1="50%" x2="calc(100% - 20px)" y2="50%"
            stroke="url(#line-gradient)"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={phase >= 2 ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          {/* Bottom */}
          <motion.line
            x1="50%" y1="50%" x2="50%" y2="calc(100% - 20px)"
            stroke="url(#line-gradient)"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={phase >= 2 ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          {/* Left */}
          <motion.line
            x1="50%" y1="50%" x2="20" y2="50%"
            stroke="url(#line-gradient)"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={phase >= 2 ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Data packets flowing */}
        {dataFlowing && (
          <>
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-white"
                initial={{ 
                  x: "50%", 
                  y: "50%",
                  scale: 0,
                }}
                animate={{
                  x: i === 0 ? "50%" : i === 1 ? "85%" : i === 2 ? "50%" : "15%",
                  y: i === 0 ? "15%" : i === 1 ? "50%" : i === 2 ? "85%" : "50%",
                  scale: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  repeatDelay: 0.5,
                }}
              />
            ))}
          </>
        )}

        {/* API endpoint boxes */}
        {apis.map((api, i) => (
          <motion.div
            key={api.name}
            className={`absolute ${api.position} px-2 py-1 rounded bg-white/5 border border-white/10`}
            initial={{ scale: 0, opacity: 0 }}
            animate={phase >= 3 ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: i * 0.1, type: "spring" }}
          >
            <div className="flex items-center gap-1">
              <motion.div
                className={`w-1.5 h-1.5 rounded-full ${
                  phase >= 5 ? "bg-green-400" : "bg-white/30"
                }`}
                animate={phase >= 5 ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.5 }}
              />
              <span className="text-[7px] text-white/70 font-medium">{api.name}</span>
            </div>
          </motion.div>
        ))}

        {/* Status indicator */}
        <motion.div
          className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1 bg-white/5 rounded border border-white/10"
          initial={{ opacity: 0, y: 10 }}
          animate={phase >= 5 ? { opacity: 1, y: 0 } : {}}
        >
          <span className="text-[6px] text-white/50">Sync Status</span>
          <div className="flex items-center gap-1">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-[6px] text-green-400 font-medium">All systems connected</span>
          </div>
        </motion.div>
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

