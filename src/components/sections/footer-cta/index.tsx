"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { useReducedEffects } from "@/lib/hooks";

// Animated rings - CSS-only alternative to 3D canvas
function AnimatedRings({ reducedEffects }: { reducedEffects: boolean }) {
  if (reducedEffects) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full border border-accent-primary/10" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-accent-primary/15" />
        <div className="absolute w-[300px] h-[300px] rounded-full border-2 border-accent-primary/20" />
        <div className="absolute w-32 h-32 rounded-full bg-accent-primary/10 blur-2xl opacity-40" />
        <div className="absolute w-[350px] h-[350px]">
          <div className="absolute top-0 start-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-primary shadow-lg shadow-accent-primary/50" />
        </div>
        <div className="absolute w-[450px] h-[450px]">
          <div className="absolute top-0 start-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-secondary shadow-lg shadow-accent-secondary/50" />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Outer ring */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full border border-accent-primary/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Middle ring */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full border border-accent-primary/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner ring */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full border-2 border-accent-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Glowing center */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-accent-primary/10 blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbiting dots */}
      <motion.div
        className="absolute w-[350px] h-[350px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 start-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-primary shadow-lg shadow-accent-primary/50" />
      </motion.div>

      <motion.div
        className="absolute w-[450px] h-[450px]"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 start-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-secondary shadow-lg shadow-accent-secondary/50" />
      </motion.div>
    </div>
  );
}

// Background gradient
function Background() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top gradient fade */}
      <div className="absolute top-0 start-0 end-0 h-32 bg-gradient-to-b from-bg-secondary to-transparent" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[150px]" />
    </div>
  );
}

export function FooterCta() {
  const { t } = useLocale();
  const reducedEffects = useReducedEffects();
  
  const handleApply = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-32 md:py-40 bg-bg-primary overflow-hidden">
      <Background />
      <AnimatedRings reducedEffects={reducedEffects} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Eyebrow */}
          <motion.p
            className="text-accent-primary font-mono text-sm tracking-widest uppercase mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t.footerCta.eyebrow}
          </motion.p>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-fg-primary">{t.footerCta.headlinePrimary} </span>
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {t.footerCta.headlineAccent}
            </span>
          </h2>

          <p className="text-fg-secondary text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            {t.footerCta.subhead}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Button size="lg" onClick={handleApply}>
            {t.footerCta.buttons[0]}
          </Button>
          <Button variant="secondary" size="lg" onClick={handleHowItWorks}>
            {t.footerCta.buttons[1]}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
