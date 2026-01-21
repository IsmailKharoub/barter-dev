"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface PageTransitionContextValue {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  triggerTransition: (callback: () => void) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue>({
  isLoading: true,
  setIsLoading: () => {},
  triggerTransition: () => {},
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

// Clip-path reveal variants
const clipPathVariants: Variants = {
  hidden: {
    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
  },
  visible: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: {
      duration: 0.8,
      ease: [0.65, 0, 0.35, 1],
    },
  },
  exit: {
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    transition: {
      duration: 0.6,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

// Staggered children container variants
const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

// Individual item variants for stagger effect
const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionCallback, setTransitionCallback] = useState<(() => void) | null>(null);

  // Trigger a page transition with callback
  const triggerTransition = (callback: () => void) => {
    setIsTransitioning(true);
    setTransitionCallback(() => callback);
  };

  // Handle transition completion
  useEffect(() => {
    if (isTransitioning && transitionCallback) {
      const timer = setTimeout(() => {
        transitionCallback();
        setIsTransitioning(false);
        setTransitionCallback(null);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, transitionCallback]);

  useEffect(() => {
    // Simulate minimum load time for smooth transition
    const minLoadTime = setTimeout(() => {
      // Ready to transition out
    }, 300);

    // Wait for page to be ready
    const handleLoad = () => {
      if (document.readyState === "complete") {
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearTimeout(minLoadTime);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // Ensure we remove loading screen after max time
  useEffect(() => {
    const maxLoadTime = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(maxLoadTime);
  }, []);

  return (
    <PageTransitionContext.Provider value={{ isLoading, setIsLoading, triggerTransition }}>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      
      {/* Page transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <TransitionOverlay key="transition" />
        )}
      </AnimatePresence>
      
      {/* Main content with clip-path reveal */}
      <motion.div
        variants={clipPathVariants}
        initial="hidden"
        animate={isLoading ? "hidden" : "visible"}
        className="relative"
      >
        {children}
      </motion.div>
    </PageTransitionContext.Provider>
  );
}

// Enhanced loading screen with branded animation
function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 15, 100));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-bg-primary flex flex-col items-center justify-center overflow-hidden"
      exit={{ 
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at center, var(--accent-primary) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />

      {/* Ambient glow */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo container */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20,
          delay: 0.1 
        }}
      >
        {/* Outer ring */}
        <motion.div
          className="absolute -inset-4 rounded-full border-2 border-accent-primary/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner ring */}
        <motion.div
          className="absolute -inset-2 rounded-full border border-accent-primary/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* Logo */}
        <motion.div 
          className="relative w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-[0_0_60px_rgba(255,255,255,0.2)]"
          animate={{ 
            boxShadow: [
              "0 0 60px rgba(255,255,255,0.2)",
              "0 0 80px rgba(255,255,255,0.3)",
              "0 0 60px rgba(255,255,255,0.2)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-bg-primary">
            <motion.path
              d="M7 10H17L14 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
            <motion.path
              d="M17 14H7L10 17"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Brand text */}
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <span className="text-xl font-bold tracking-tight text-fg-primary">
          BARTER DEV
        </span>
        <span className="text-sm text-fg-muted">
          Dev Work. No Cash Required.
        </span>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="h-1 bg-border-subtle rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-white via-gray-300 to-white rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.15 }}
          />
        </div>
        <motion.span
          className="block text-center mt-2 text-xs text-fg-muted font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {Math.floor(progress)}%
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

// Transition overlay for page navigation
function TransitionOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Multiple bars for staggered reveal */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="flex-1 bg-bg-secondary"
          initial={{ scaleY: 0 }}
          animate={{ 
            scaleY: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1,
            delay: i * 0.08,
            ease: [0.65, 0, 0.35, 1],
            times: [0, 0.4, 0.6, 1],
          }}
          style={{ transformOrigin: "top" }}
        />
      ))}
    </motion.div>
  );
}

// Export variants for use in other components
export { staggerContainerVariants, staggerItemVariants, clipPathVariants };

