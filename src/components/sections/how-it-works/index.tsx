"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { t } from "@/i18n";
import { Button } from "@/components/ui/button";
import { FrameIcon } from "./frame-icon";
import {
  CircleDollarSign,
  Lightbulb,
  FileEdit,
  Scale,
  FileCheck,
  Rocket,
} from "lucide-react";

const steps = [
  { key: "problem" as const, icon: CircleDollarSign, color: "rose" },
  { key: "alternative" as const, icon: Lightbulb, color: "amber" },
  { key: "apply" as const, icon: FileEdit, color: "emerald" },
  { key: "evaluate" as const, icon: Scale, color: "sky" },
  { key: "agree" as const, icon: FileCheck, color: "violet" },
  { key: "deliver" as const, icon: Rocket, color: "orange" },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  rose: { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-400", glow: "shadow-rose-500/20" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", glow: "shadow-amber-500/20" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", glow: "shadow-emerald-500/20" },
  sky: { bg: "bg-sky-500/10", border: "border-sky-500/30", text: "text-sky-400", glow: "shadow-sky-500/20" },
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/30", text: "text-violet-400", glow: "shadow-violet-500/20" },
  orange: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400", glow: "shadow-orange-500/20" },
};

function StepCard({
  step,
  index,
  title,
  description,
}: {
  step: typeof steps[0];
  index: number;
  title: string;
  description: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, 0]);

  const Icon = step.icon;
  const colors = colorMap[step.color];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      className={`flex items-center gap-8 lg:gap-16 ${isEven ? "" : "lg:flex-row-reverse"}`}
      style={{ opacity, scale, y }}
    >
      {/* Step number - visible on lg */}
      <div className={`hidden lg:flex flex-1 ${isEven ? "justify-end" : "justify-start"}`}>
        <motion.span
          className="text-[120px] xl:text-[160px] font-bold text-border-subtle/30 leading-none select-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </div>

      {/* Card */}
      <motion.div
        className={`flex-1 relative group ${isEven ? "lg:pr-8" : "lg:pl-8"}`}
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Card glow */}
        <div className={`absolute inset-0 ${colors.bg} rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />

        <div className={`relative p-6 md:p-8 rounded-3xl bg-bg-tertiary/50 border ${colors.border} backdrop-blur-sm`}>
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            {/* Icon */}
            <div className={`shrink-0 w-14 h-14 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
              <Icon className={`w-7 h-7 ${colors.text}`} />
            </div>

            {/* Step badge */}
            <div className="flex-1">
              <span className={`inline-block px-3 py-1 text-xs font-mono ${colors.text} ${colors.bg} rounded-full mb-2`}>
                Step {index + 1}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-fg-primary">
                {title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-fg-secondary text-base md:text-lg leading-relaxed pl-0 md:pl-18">
            {description}
          </p>

          {/* Decorative corner */}
          <div className={`absolute top-0 right-0 w-16 h-16 ${colors.bg} rounded-bl-3xl rounded-tr-3xl opacity-50`} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function TimelineConnector({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="flex justify-center py-4 lg:py-8">
      <div className="relative w-0.5 h-16 lg:h-24 bg-border-subtle overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent-primary to-accent-secondary origin-top"
          style={{ scaleY, height: "100%" }}
        />
      </div>
    </div>
  );
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const handleApply = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 bg-bg-secondary overflow-hidden"
    >
      {/* Background elements */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-secondary/5 rounded-full blur-[100px]" />
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
          className="text-center mb-16 lg:mb-24"
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
            The Process
          </motion.p>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-fg-primary">How It </span>
            <span className="bg-gradient-to-r from-accent-primary via-amber-400 to-accent-secondary bg-clip-text text-transparent">
              Works
            </span>
          </h2>

          {/* Subhead */}
          <p className="text-fg-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From first contact to final handoff — a clear, fair process for both sides.
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
        <div className="space-y-0">
          {steps.map((step, index) => (
            <div key={step.key}>
              <StepCard
                step={step}
                index={index}
                title={t.howItWorks.frames[step.key].title}
                description={t.howItWorks.frames[step.key].description}
              />
              {index < steps.length - 1 && <TimelineConnector index={index} />}
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 lg:mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Button onClick={handleApply} size="lg" className="group">
            <span>{t.howItWorks.cta}</span>
            <motion.span
              className="inline-block ml-1"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Button>
          <p className="mt-4 text-sm text-fg-muted">
            Reviewed within 48 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
