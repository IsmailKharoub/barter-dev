"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useLocale } from "@/components/providers";
import { useReducedEffects } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import {
  Ban,
  Sparkles,
  FileText,
  Scale,
  Handshake,
  CheckCircle2,
} from "lucide-react";

const frameKeys = ["problem", "alternative", "apply", "evaluate", "agree", "deliver"] as const;

const frameIcons = {
  problem: Ban,
  alternative: Sparkles,
  apply: FileText,
  evaluate: Scale,
  agree: Handshake,
  deliver: CheckCircle2,
};

const frameColors = {
  problem: { bg: "bg-white/5", border: "border-white/10", text: "text-gray-400" },
  alternative: { bg: "bg-white/5", border: "border-white/15", text: "text-gray-300" },
  apply: { bg: "bg-white/5", border: "border-white/10", text: "text-gray-400" },
  evaluate: { bg: "bg-white/5", border: "border-white/10", text: "text-gray-400" },
  agree: { bg: "bg-white/5", border: "border-white/15", text: "text-gray-300" },
  deliver: { bg: "bg-white/10", border: "border-white/20", text: "text-white" },
};

function StepCard({ 
  step, 
  index, 
  total,
  isRTL = false,
}: { 
  step: { id: typeof frameKeys[number]; title: string; description: string }; 
  index: number;
  total: number;
  isRTL?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = frameIcons[step.id];
  const colors = frameColors[step.id];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      className="relative"
    >
      {/* Connecting line to next step */}
      {index < total - 1 && (
        <div className="absolute start-8 top-20 bottom-0 w-px bg-gradient-to-b from-border-default to-transparent hidden md:block" />
      )}

      <div className="flex gap-6 items-start">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
          className={`relative flex-shrink-0 w-16 h-16 rounded-2xl ${colors.bg} ${colors.border} border flex items-center justify-center`}
        >
          <Icon className={`w-7 h-7 ${colors.text}`} />
          {/* Step number badge */}
          <div className="absolute -top-2 -end-2 w-6 h-6 rounded-full bg-bg-primary border border-border-default flex items-center justify-center">
            <span className="text-xs font-mono text-fg-muted">{index + 1}</span>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 pt-1">
          <motion.h3
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRTL ? 20 : -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            className="text-xl md:text-2xl font-bold text-fg-primary mb-2"
          >
            {step.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRTL ? 20 : -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
            className="text-fg-secondary leading-relaxed"
          >
            {step.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const { t, isRTL } = useLocale();
  const reducedEffects = useReducedEffects();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const handleApply = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  // Build frames data from translations
  const frames = frameKeys.map((key) => ({
    id: key,
    title: t.howItWorks.frames[key].title,
    description: t.howItWorks.frames[key].description,
  }));

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 bg-bg-secondary overflow-hidden"
    >
      {/* Background elements */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -start-32 w-96 h-96 bg-accent-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -end-32 w-96 h-96 bg-accent-secondary/5 rounded-full blur-[100px]" />
      </motion.div>

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {/* Eyebrow */}
          <motion.p
            className="text-accent-primary font-mono text-sm tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {isRTL ? "התהליך" : "The Process"}
          </motion.p>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-fg-primary">{isRTL ? "איך זה " : "How It "}</span>
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {isRTL ? "עובד" : "Works"}
            </span>
          </h2>

          {/* Subhead */}
          <p className="text-fg-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {isRTL 
              ? "מהקשר הראשון ועד למסירה הסופית — תהליך ברור והוגן לשני הצדדים."
              : "From first contact to final handoff — a clear, fair process for both sides."}
          </p>

          {/* Decorative divider */}
          <motion.div
            className="mt-8 mx-auto flex items-center justify-center gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-primary/50" />
            <div className="w-2 h-2 rounded-full bg-accent-primary/50" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-primary/50" />
          </motion.div>
        </motion.div>

        {/* Steps */}
        <div className="space-y-12 md:space-y-16 max-w-3xl mx-auto">
          {frames.map((frame, index) => (
            <StepCard key={frame.id} step={frame} index={index} total={frames.length} isRTL={isRTL} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16 md:mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Button onClick={handleApply} size="lg" className="group">
            <span>{t.howItWorks.cta}</span>
            <motion.span
              className={`inline-block ${isRTL ? "me-1 rotate-180" : "ms-1"}`}
              animate={reducedEffects ? undefined : { x: [0, 4, 0] }}
              transition={reducedEffects ? undefined : { duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Button>
          <p className="mt-4 text-sm text-fg-muted">
            {isRTL ? "נסקר תוך 48 שעות" : "Reviewed within 48 hours"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
