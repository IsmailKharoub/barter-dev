"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

interface DevStats {
  yearsExperience: number;
  productsShipped: number;
  linesOfCode: string;
  coffeeConsumed: string;
  techStack: string[];
  funFacts: string[];
}

const DEV_STATS: DevStats = {
  yearsExperience: 12,
  productsShipped: 47,
  linesOfCode: "2M+",
  coffeeConsumed: "∞",
  techStack: [
    "TypeScript",
    "React / Next.js",
    "Node.js",
    "PostgreSQL",
    "Redis",
    "AWS / Vercel",
    "Three.js",
    "Framer Motion",
  ],
  funFacts: [
    "Wrote first line of code at age 11",
    "Former CTO at 3 startups",
    "Open source contributor",
    "Believes tabs > spaces (fight me)",
    "Dark mode is the only mode",
  ],
};

export function EasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  // Listen for Konami code
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const newSequence = [...inputSequence, e.code].slice(-KONAMI_CODE.length);
    setInputSequence(newSequence);

    // Check if sequence matches
    if (newSequence.length === KONAMI_CODE.length) {
      const matches = newSequence.every((key, i) => key === KONAMI_CODE[i]);
      if (matches) {
        setIsOpen(true);
        setInputSequence([]);
      }
    }
  }, [inputSequence]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Show hint after 30 seconds of inactivity on the page
  useEffect(() => {
    const hintTimer = setTimeout(() => {
      setShowHint(true);
      // Hide hint after 5 seconds
      setTimeout(() => setShowHint(false), 5000);
    }, 30000);

    return () => clearTimeout(hintTimer);
  }, []);

  return (
    <>
      {/* Subtle hint */}
      <AnimatePresence>
        {showHint && !isOpen && (
          <motion.div
            className="fixed bottom-4 right-4 z-50 px-3 py-2 bg-bg-tertiary/80 backdrop-blur-sm rounded-lg border border-border-subtle text-xs text-fg-muted"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-mono">↑↑↓↓←→←→BA</span>
            <span className="ml-2 opacity-60">🎮</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter egg modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-bg-primary/90 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal content */}
            <motion.div
              className="relative w-full max-w-lg bg-bg-secondary rounded-2xl border border-border-default overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="relative px-6 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="text-2xl">🎮</span>
                  <div>
                    <h2 className="text-lg font-bold text-bg-primary">
                      Achievement Unlocked!
                    </h2>
                    <p className="text-sm text-bg-primary/80">
                      You found the Konami Code
                    </p>
                  </div>
                </motion.div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-bg-primary/20 flex items-center justify-center text-bg-primary hover:bg-bg-primary/30 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Stats */}
              <div className="p-6 space-y-6">
                {/* Quick stats */}
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {[
                    { label: "Years", value: DEV_STATS.yearsExperience },
                    { label: "Products", value: DEV_STATS.productsShipped },
                    { label: "Lines", value: DEV_STATS.linesOfCode },
                    { label: "Coffee", value: DEV_STATS.coffeeConsumed },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      className="text-center p-3 bg-bg-tertiary rounded-xl"
                    >
                      <motion.div
                        className="text-2xl font-bold text-accent-primary font-mono"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.05, type: "spring" }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-xs text-fg-muted mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Tech stack */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-sm font-medium text-fg-muted mb-3">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {DEV_STATS.techStack.map((tech, i) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 bg-bg-tertiary rounded-full text-sm text-fg-secondary border border-border-subtle"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.03 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Fun facts */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-sm font-medium text-fg-muted mb-3">
                    Fun Facts
                  </h3>
                  <ul className="space-y-2">
                    {DEV_STATS.funFacts.map((fact, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2 text-sm text-fg-secondary"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.05 }}
                      >
                        <span className="text-accent-primary">→</span>
                        {fact}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Footer message */}
                <motion.p
                  className="text-center text-sm text-fg-muted pt-4 border-t border-border-subtle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  Thanks for finding this! Now go{" "}
                  <a
                    href="#apply"
                    onClick={() => setIsOpen(false)}
                    className="text-accent-primary hover:underline"
                  >
                    apply for a trade
                  </a>
                  .
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

