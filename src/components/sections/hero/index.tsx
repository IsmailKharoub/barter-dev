"use client";

import { motion } from "framer-motion";
import { HeroContent } from "./hero-content";
import { useReducedEffects } from "@/lib/hooks";

// Radial dot pattern
function DotPattern() {
  return (
    <div
      className="absolute inset-0 opacity-[0.4] pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle at center, var(--accent-primary) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        maskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, black 20%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, black 20%, transparent 70%)",
      }}
    />
  );
}

// Scroll indicator
function ScrollIndicator({ reducedEffects }: { reducedEffects: boolean }) {
  return (
    <motion.button
      onClick={() => {
        document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="absolute bottom-8 start-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fg-muted hover:text-fg-secondary transition-colors cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <span className="text-xs tracking-widest uppercase">Scroll</span>
      <motion.div
        animate={reducedEffects ? undefined : { y: [0, 6, 0] }}
        transition={reducedEffects ? undefined : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-current">
          <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.button>
  );
}

export function Hero() {
  const reducedEffects = useReducedEffects();
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary"
    >
      <DotPattern />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24 lg:py-32">
        <HeroContent />
      </div>

      <ScrollIndicator reducedEffects={reducedEffects} />
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 start-0 end-0 h-24 bg-linear-to-t from-bg-primary to-transparent pointer-events-none" />
    </section>
  );
}
