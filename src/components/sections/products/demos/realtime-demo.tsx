"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function RealtimeDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [phase, setPhase] = useState(0);
  const [messages, setMessages] = useState<{ id: number; text: string; user: boolean }[]>([]);
  const [notifications, setNotifications] = useState<number[]>([]);

  useEffect(() => {
    if (!isInView) return;

    const phases = [
      { delay: 0 },
      { delay: 400 },   // Initial UI
      { delay: 800 },   // First message
      { delay: 1400 },  // Response
      { delay: 2000 },  // Another message
      { delay: 2600 },  // Typing indicator
      { delay: 3000 },  // Final response
    ];

    phases.forEach((p, i) => {
      setTimeout(() => setPhase(i), p.delay);
    });

    // Simulate live messages
    const msgTimers = [
      setTimeout(() => setMessages(m => [...m, { id: 1, text: "Hey team! 👋", user: true }]), 800),
      setTimeout(() => setMessages(m => [...m, { id: 2, text: "Hi! Ready for standup?", user: false }]), 1400),
      setTimeout(() => setMessages(m => [...m, { id: 3, text: "Let's do it", user: true }]), 2000),
      setTimeout(() => setMessages(m => [...m, { id: 4, text: "Starting now...", user: false }]), 3000),
    ];

    // Simulate notifications
    const notifTimers = [
      setTimeout(() => setNotifications(n => [...n, 1]), 1600),
      setTimeout(() => setNotifications(n => [...n, 2]), 2200),
    ];

    return () => {
      msgTimers.forEach(clearTimeout);
      notifTimers.forEach(clearTimeout);
    };
  }, [isInView]);

  return (
    <div ref={containerRef} className="w-full h-full p-3 md:p-4 relative">
      <motion.div
        className="w-full h-full bg-[#0a0a0a] rounded-lg border border-white/10 overflow-hidden shadow-2xl flex"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* Sidebar */}
        <motion.div
          className="w-12 bg-[#0f0f0f] border-r border-white/5 p-2 flex flex-col"
          initial={{ x: -50, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
        >
          {/* Channels */}
          {[
            { active: true, color: "white" },
            { active: false, color: "gray" },
            { active: false, color: "gray" },
          ].map((ch, i) => (
            <motion.div
              key={i}
              className={`relative w-full aspect-square rounded mb-2 flex items-center justify-center ${
                ch.active ? "bg-white/15" : "bg-white/5"
              }`}
              initial={{ scale: 0 }}
              animate={phase >= 1 ? { scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <div className={`w-3 h-3 rounded ${ch.active ? "bg-white" : "bg-white/20"}`} />
              {/* Live indicator */}
              {ch.active && (
                <motion.div
                  className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}

          {/* Notification badges */}
          <AnimatePresence>
            {notifications.map((n, i) => (
              <motion.div
                key={n}
                className="absolute"
                style={{ top: 40 + (i + 1) * 36 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <div className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center ml-8">
                  <span className="text-[6px] text-white font-bold">{n}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <motion.div
            className="h-8 border-b border-white/5 px-3 flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={phase >= 1 ? { opacity: 1 } : {}}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span className="text-[8px] text-white/70 font-medium">#general</span>
              <div className="flex items-center gap-0.5 ml-2">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-500"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[6px] text-green-400">Live</span>
              </div>
            </div>
            <div className="text-[6px] text-white/40">3 online</div>
          </motion.div>

          {/* Messages */}
          <div className="flex-1 p-2 space-y-1.5 overflow-hidden">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`flex ${msg.user ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div
                    className={`max-w-[80%] px-2 py-1 rounded-lg ${
                      msg.user
                        ? "bg-white/20 border border-white/30"
                        : "bg-white/10 border border-white/10"
                    }`}
                  >
                    <span className="text-[7px] text-white/90">{msg.text}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {phase >= 5 && phase < 6 && (
              <motion.div
                className="flex gap-0.5 px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full bg-white/40"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </motion.div>
            )}
          </div>

          {/* Input */}
          <motion.div
            className="h-7 border-t border-white/5 px-2 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={phase >= 1 ? { opacity: 1 } : {}}
          >
            <div className="flex-1 h-4 bg-white/5 rounded border border-white/10 px-1.5 flex items-center">
              <span className="text-[6px] text-white/30">Type a message...</span>
            </div>
            <div className="w-4 h-4 rounded bg-white/20 flex items-center justify-center">
              <div className="w-0 h-0 border-l-4 border-l-white border-y-2 border-y-transparent ml-0.5" />
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

