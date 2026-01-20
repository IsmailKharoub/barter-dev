"use client";

import { motion } from "framer-motion";
import { t } from "@/i18n";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

export function HeroContent() {
  const handleScroll = () => {
    const target = document.getElementById("how-it-works");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
      <motion.h1
        className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0}
      >
        {t.hero.headline.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </motion.h1>

      <motion.p
        className="mt-6 max-w-xl text-lg text-fg-secondary sm:text-xl md:text-2xl"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0.2}
      >
        {t.hero.subhead}
      </motion.p>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0.4}
        className="mt-10"
      >
        <Button onClick={handleScroll} size="lg">
          {t.hero.cta}
        </Button>
      </motion.div>
    </div>
  );
}

