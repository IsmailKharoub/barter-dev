"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { t } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Frame, type FrameType } from "./frame";

const frames: { type: FrameType; key: keyof typeof t.howItWorks.frames }[] = [
  { type: "problem", key: "problem" },
  { type: "alternative", key: "alternative" },
  { type: "apply", key: "apply" },
  { type: "evaluate", key: "evaluate" },
  { type: "agree", key: "agree" },
  { type: "deliver", key: "deliver" },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.min(
        Math.floor(latest * frames.length),
        frames.length - 1
      );
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleApply = () => {
    const target = document.getElementById("apply");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative bg-bg-secondary"
      style={{ height: `${(frames.length + 1) * 100}vh` }}
    >
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-border-subtle z-50">
        <motion.div
          className="h-full bg-accent-primary"
          style={{ width: progressBarWidth }}
        />
      </div>

      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6">
        {/* Step indicators */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2">
          {frames.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "bg-accent-primary w-6"
                  : i < activeIndex
                  ? "bg-accent-primary/50"
                  : "bg-border-default"
              }`}
            />
          ))}
        </div>

        {/* Frames */}
        <div className="relative w-full max-w-4xl">
          {frames.map((frame, index) => (
            <div
              key={frame.key}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                index === activeIndex
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <Frame
                type={frame.type}
                title={t.howItWorks.frames[frame.key].title}
                description={t.howItWorks.frames[frame.key].description}
                isActive={index === activeIndex}
              />
            </div>
          ))}
        </div>

        {/* CTA - shows on last frame */}
        <motion.div
          className="absolute bottom-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: activeIndex === frames.length - 1 ? 1 : 0,
            y: activeIndex === frames.length - 1 ? 0 : 20,
          }}
          transition={{ duration: 0.3 }}
        >
          <Button onClick={handleApply} size="lg">
            {t.howItWorks.cta}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

