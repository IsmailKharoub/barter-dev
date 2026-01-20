"use client";

import { motion, type Variants } from "framer-motion";
import { t } from "@/i18n";
import { Button } from "@/components/ui/button";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

// Trust badge
function TrustBadge() {
  return (
    <motion.div
      variants={item}
      className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border-subtle bg-bg-tertiary/50 backdrop-blur-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
      </span>
      <span className="text-sm text-fg-secondary">
        Accepting new trades
      </span>
    </motion.div>
  );
}

// Social proof
function SocialProof() {
  return (
    <motion.div 
      variants={item}
      className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
    >
      {[
        { value: "47+", label: "Products shipped" },
        { value: "12yr", label: "Experience" },
        { value: "$0", label: "Invoices" },
      ].map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-2xl font-bold text-fg-primary tabular-nums">
            {stat.value}
          </div>
          <div className="text-xs text-fg-muted">
            {stat.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export function HeroContent() {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center text-center gap-6"
    >
      <TrustBadge />
      
      <motion.h1
        variants={item}
        className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
      >
        <span className="block bg-gradient-to-r from-accent-primary to-amber-300 bg-clip-text text-transparent">
          Dev Work.
        </span>
        <span className="block text-fg-primary">
          No Cash Required.
        </span>
      </motion.h1>

      <motion.p
        variants={item}
        className="max-w-lg text-base text-fg-secondary sm:text-lg leading-relaxed"
      >
        {t.hero.subhead}
      </motion.p>

      <motion.div 
        variants={item}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
      >
        <Button 
          onClick={() => handleScroll("apply")} 
          size="lg"
        >
          Apply for a Trade
        </Button>
        <Button 
          onClick={() => handleScroll("how-it-works")} 
          variant="secondary"
          size="lg"
        >
          See How It Works
        </Button>
      </motion.div>

      <motion.div variants={item} className="pt-4">
        <SocialProof />
      </motion.div>
    </motion.div>
  );
}
