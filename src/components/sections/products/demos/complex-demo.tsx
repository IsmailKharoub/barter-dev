"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function ComplexDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const phases = [
      { delay: 0 },
      { delay: 400 },   // Architecture diagram
      { delay: 800 },   // Microservices
      { delay: 1200 },  // Data flow
      { delay: 1600 },  // Database
      { delay: 2000 },  // Monitoring
      { delay: 2400 },  // Success indicators
    ];

    phases.forEach((p, i) => {
      setTimeout(() => setPhase(i), p.delay);
    });
  }, [isInView]);

  const services = [
    { name: "Auth", color: "from-white/80 to-white/50" },
    { name: "API", color: "from-gray-300 to-gray-500" },
    { name: "Worker", color: "from-white/70 to-white/40" },
    { name: "Cache", color: "from-gray-400 to-gray-600" },
  ];

  return (
    <div ref={containerRef} className="w-full h-full p-3 md:p-4 relative">
      <motion.div
        className="w-full h-full bg-[#0a0a0a] rounded-lg border border-white/10 overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* Header - Architecture label */}
        <motion.div
          className="h-6 border-b border-white/5 px-3 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={phase >= 1 ? { opacity: 1 } : {}}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded bg-white" />
            <span className="text-[7px] text-white/70 font-medium">System Architecture</span>
          </div>
          <div className="flex items-center gap-1">
            {phase >= 6 && (
              <>
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
                <span className="text-[6px] text-green-400">All services healthy</span>
              </>
            )}
          </div>
        </motion.div>

        <div className="p-3 h-[calc(100%-24px)] flex flex-col">
          {/* Top row - Load Balancer */}
          <motion.div
            className="flex justify-center mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
          >
            <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10">
              <div className="text-[6px] text-white/40 text-center">Load Balancer</div>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-3 bg-white/50 rounded"
                    animate={phase >= 3 ? { 
                      height: ["12px", "6px", "10px", "12px"],
                      opacity: [0.5, 0.8, 0.6, 0.5]
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Connection lines down */}
          <svg className="w-full h-4 overflow-visible">
            <motion.path
              d="M 50% 0 L 50% 100%"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={phase >= 2 ? { pathLength: 1 } : {}}
              transition={{ duration: 0.3 }}
            />
          </svg>

          {/* Microservices grid */}
          <motion.div
            className="grid grid-cols-4 gap-1.5 mb-2"
            initial={{ opacity: 0 }}
            animate={phase >= 2 ? { opacity: 1 } : {}}
          >
            {services.map((service, i) => (
              <motion.div
                key={service.name}
                className="p-1.5 rounded bg-white/5 border border-white/10 relative overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={phase >= 2 ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: i * 0.1 }}
              >
                {/* Service icon */}
                <div className={`w-full aspect-square rounded bg-gradient-to-br ${service.color} mb-1 flex items-center justify-center`}>
                  <span className="text-[6px] font-bold text-black">{service.name[0]}</span>
                </div>
                <div className="text-[5px] text-white/50 text-center">{service.name}</div>
                
                {/* Activity indicator */}
                {phase >= 3 && (
                  <motion.div
                    className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-green-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Database layer */}
          <motion.div
            className="flex gap-2 justify-center mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={phase >= 4 ? { y: 0, opacity: 1 } : {}}
          >
            <div className="px-2 py-1 rounded bg-white/5 border border-white/10 flex items-center gap-1">
              <div className="w-4 h-4 rounded bg-white flex items-center justify-center">
                <span className="text-[5px] text-black font-bold">DB</span>
              </div>
              <div>
                <div className="text-[5px] text-white/40">PostgreSQL</div>
                <div className="text-[6px] text-white/70">Primary</div>
              </div>
            </div>
            <div className="px-2 py-1 rounded bg-white/5 border border-white/10 flex items-center gap-1">
              <div className="w-4 h-4 rounded bg-gray-300 flex items-center justify-center">
                <span className="text-[5px] text-black font-bold">R</span>
              </div>
              <div>
                <div className="text-[5px] text-white/40">Redis</div>
                <div className="text-[6px] text-white/70">Cache</div>
              </div>
            </div>
          </motion.div>

          {/* Monitoring panel */}
          <motion.div
            className="flex-1 rounded bg-white/5 border border-white/5 p-2"
            initial={{ opacity: 0 }}
            animate={phase >= 5 ? { opacity: 1 } : {}}
          >
            <div className="text-[6px] text-white/40 mb-1.5">System Metrics</div>
            <div className="grid grid-cols-3 gap-1">
              {[
                { label: "CPU", value: "24%", color: "white" },
                { label: "Memory", value: "2.1GB", color: "gray" },
                { label: "Requests", value: "1.2k/s", color: "white" },
              ].map((metric, i) => (
                <motion.div
                  key={metric.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={phase >= 5 ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-[5px] text-white/40">{metric.label}</div>
                  <div className="text-[8px] text-white/90 font-bold">{metric.value}</div>
                  <motion.div
                    className="h-0.5 mt-0.5 rounded bg-white/50"
                    initial={{ scaleX: 0 }}
                    animate={phase >= 5 ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    style={{ transformOrigin: "left" }}
                  />
                </motion.div>
              ))}
            </div>
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

