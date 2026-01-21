"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function WebAppDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    const phases = [
      { delay: 0 },      // 0: Login screen
      { delay: 600 },    // 1: Email typing
      { delay: 1400 },   // 2: Password typing
      { delay: 2000 },   // 3: Login button click
      { delay: 2400 },   // 4: Transition to dashboard
      { delay: 3000 },   // 5: Sidebar appears
      { delay: 3400 },   // 6: Header appears
      { delay: 3800 },   // 7: Stats cards
      { delay: 4600 },   // 8: Main chart
      { delay: 5400 },   // 9: Recent activity
      { delay: 6200 },   // 10: Notifications ping
    ];

    phases.forEach((p, i) => {
      setTimeout(() => setPhase(i), p.delay);
    });
  }, [isInView]);

  const showDashboard = phase >= 4;

  return (
    <div ref={containerRef} className="w-full h-full p-4 md:p-6 relative">
      <motion.div
        className="w-full h-full bg-[#0f0f0f] rounded-lg border border-border-default overflow-hidden shadow-2xl relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {!showDashboard ? (
            <LoginScreen key="login" phase={phase} />
          ) : (
            <Dashboard key="dashboard" phase={phase} />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 -z-10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.4 } : {}}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white/10 rounded-full" />
      </motion.div>
    </div>
  );
}

function LoginScreen({ phase }: { phase: number }) {
  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] to-[#111] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="w-48 p-4 bg-white/5 backdrop-blur rounded-lg border border-white/10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded" />
          </div>
        </div>

        {/* Email field */}
        <div className="mb-2">
          <div className="text-[8px] text-white/40 mb-1">Email</div>
          <motion.div 
            className="h-6 bg-white/5 rounded border border-white/10 px-2 flex items-center overflow-hidden"
            animate={phase >= 1 ? { borderColor: "rgba(255, 255, 255, 0.3)" } : {}}
          >
            <motion.span 
              className="text-[8px] text-white/70 font-mono"
              initial={{ opacity: 0 }}
              animate={phase >= 1 ? { opacity: 1 } : {}}
            >
              {phase >= 1 && "user@company.co"}
            </motion.span>
            {phase === 1 && (
              <motion.span 
                className="w-0.5 h-3 bg-white ml-0.5"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </motion.div>
        </div>

        {/* Password field */}
        <div className="mb-3">
          <div className="text-[8px] text-white/40 mb-1">Password</div>
          <motion.div 
            className="h-6 bg-white/5 rounded border border-white/10 px-2 flex items-center overflow-hidden"
            animate={phase >= 2 ? { borderColor: "rgba(16, 185, 129, 0.3)" } : {}}
          >
            <motion.span 
              className="text-[8px] text-white/70 tracking-widest"
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 1 } : {}}
            >
              {phase >= 2 && "••••••••"}
            </motion.span>
            {phase === 2 && (
              <motion.span 
                className="w-0.5 h-3 bg-white ml-0.5"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </motion.div>
        </div>

        {/* Login button */}
        <motion.div
          className="h-7 bg-white rounded flex items-center justify-center cursor-pointer"
          animate={phase >= 3 ? { scale: [1, 0.95, 1] } : {}}
          transition={{ duration: 0.2 }}
        >
            <span className="text-[9px] font-medium text-black">Sign In</span>
        </motion.div>

        {/* Loading indicator during transition */}
        {phase === 3 && (
          <motion.div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

function Dashboard({ phase }: { phase: number }) {
  return (
    <motion.div
      className="absolute inset-0 bg-[#0a0a0a] flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sidebar */}
      <motion.div
        className="w-12 md:w-14 bg-[#0f0f0f] border-r border-white/5 p-2 flex flex-col gap-2"
        initial={{ x: -60, opacity: 0 }}
        animate={phase >= 5 ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Logo */}
        <div className="w-full aspect-square rounded-lg bg-white flex items-center justify-center mb-2">
          <div className="w-4 h-4 border-2 border-white rounded" />
        </div>
        
        {/* Nav items */}
        {[true, false, false, false].map((active, i) => (
          <motion.div
            key={i}
            className={`w-full aspect-square rounded-lg flex items-center justify-center ${
              active ? "bg-white/15" : "bg-white/5"
            }`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={phase >= 5 ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            <div className={`w-3 h-3 rounded ${active ? "bg-white" : "bg-white/20"}`} />
          </motion.div>
        ))}
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.div
          className="h-10 border-b border-white/5 px-4 flex items-center justify-between"
          initial={{ y: -40, opacity: 0 }}
          animate={phase >= 6 ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
        >
          <div className="h-1.5 w-20 bg-white/20 rounded" />
          <div className="flex items-center gap-2">
            <motion.div 
              className="relative"
              animate={phase >= 10 ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
              </div>
              {/* Notification badge */}
              {phase >= 10 && (
                <motion.div
                  className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                />
              )}
            </motion.div>
            <div className="w-6 h-6 rounded-full bg-white" />
          </div>
        </motion.div>

        {/* Content area */}
        <div className="flex-1 p-3 md:p-4 space-y-3 overflow-hidden">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Revenue", value: "$24.5k", color: "white" },
              { label: "Users", value: "1,429", color: "gray" },
              { label: "Growth", value: "+12.3%", color: "white" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-white/5 rounded-lg p-2 border border-white/5"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={phase >= 7 ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
              >
                <div className="text-[7px] text-white/40">{stat.label}</div>
                <div className="text-[11px] md:text-xs font-bold text-white/90 mt-0.5">
                  {stat.value}
                </div>
                <motion.div
                  className={`h-0.5 mt-1 rounded-full bg-gradient-to-r ${
                    stat.color === "white" ? "from-white to-white/70" :
                    "from-gray-400 to-gray-300"
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={phase >= 7 ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  style={{ transformOrigin: "left" }}
                />
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <motion.div
            className="flex-1 bg-white/5 rounded-lg border border-white/5 p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 8 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-[8px] text-white/40">Analytics Overview</div>
              <div className="flex gap-1">
                {["1D", "1W", "1M"].map((t, i) => (
                  <div 
                    key={t}
                    className={`px-1.5 py-0.5 rounded text-[6px] ${
                      i === 2 ? "bg-white/10 text-white" : "text-white/30"
                    }`}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Chart bars */}
            <div className="h-12 md:h-16 flex items-end gap-1 px-1">
              {[35, 50, 40, 70, 55, 80, 45, 65, 75, 90, 60, 85].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-white to-white/60 rounded-t opacity-80"
                  initial={{ height: 0 }}
                  animate={phase >= 8 ? { height: `${h}%` } : {}}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: "easeOut" }}
                />
              ))}
            </div>
          </motion.div>

          {/* Recent activity */}
          <motion.div
            className="space-y-1.5"
            initial={{ opacity: 0 }}
            animate={phase >= 9 ? { opacity: 1 } : {}}
          >
            <div className="text-[8px] text-white/40">Recent Activity</div>
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 p-1.5 bg-white/5 rounded border border-white/5"
                initial={{ x: -20, opacity: 0 }}
                animate={phase >= 9 ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: i * 0.15 }}
              >
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div className="flex-1">
                  <div className="h-1.5 w-16 bg-white/20 rounded" />
                  <div className="h-1 w-10 bg-white/10 rounded mt-0.5" />
                </div>
                <div className="text-[6px] text-white/30">2m ago</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

