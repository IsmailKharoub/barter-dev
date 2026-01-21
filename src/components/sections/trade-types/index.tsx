"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/components/providers";
import { TradeCategory } from "./trade-category";
import type { TradeCategoryKey } from "./trade-icons";

// Category configuration with unique accent colors
const categories: {
  key: TradeCategoryKey;
  accentColor: string;
  accentName: string;
}[] = [
  { key: "designCreative", accentColor: "#FFFFFF", accentName: "white" },
  { key: "professionalServices", accentColor: "#E5E5E5", accentName: "gray" },
  { key: "physicalGoods", accentColor: "#FFFFFF", accentName: "white" },
  { key: "accessOpportunity", accentColor: "#E5E5E5", accentName: "gray" },
  { key: "skilledLabor", accentColor: "#FFFFFF", accentName: "white" },
  { key: "hybrid", accentColor: "#E5E5E5", accentName: "gray" },
];

// Animated background pattern - gradient mesh style
function BackgroundPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient mesh blobs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Radial fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, transparent 0%, var(--bg-secondary) 100%)",
        }}
      />
    </div>
  );
}

// Exchange symbol animation
function ExchangeSymbol() {
  return (
    <motion.div
      className="relative w-20 h-20 mx-auto mb-8"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-accent-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner elements */}
      <div className="absolute inset-2 rounded-full bg-bg-tertiary/50 backdrop-blur-sm border border-border-subtle flex items-center justify-center">
        {/* Exchange arrows */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <motion.path
            d="M6 10H22L18 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent-primary"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          <motion.path
            d="M26 22H10L14 26"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent-secondary"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        </svg>
      </div>

      {/* Orbiting dots */}
      <motion.div
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-primary shadow-lg shadow-accent-primary/50"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50% calc(50% + 44px)" }}
      />
      <motion.div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-secondary shadow-lg shadow-accent-secondary/50"
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50% calc(50% - 44px)" }}
      />
    </motion.div>
  );
}

// No equity badge
function NoEquityBadge({ note }: { note: string }) {
  return (
    <motion.div
      className="relative mt-16 flex justify-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-accent-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badge content */}
        <div className="relative flex items-center gap-4 px-8 py-5 rounded-2xl bg-bg-tertiary/80 backdrop-blur-sm border border-border-subtle hover:border-accent-primary/30 transition-colors duration-300">
          {/* Icon */}
          <div className="relative">
            <motion.div
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-accent-primary"
              >
                {/* Crossed out equity symbol */}
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M9 8V16M15 8V16M9 12H15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <motion.path
                  d="M4 4L20 20"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                />
              </svg>
            </motion.div>
          </div>

          {/* Text */}
          <div>
            <p className="text-fg-primary font-semibold text-lg">
              {note.split(".")[0]}.
            </p>
            <p className="text-fg-secondary text-sm mt-0.5">
              {note.split(".").slice(1).join(".").trim()}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function TradeTypes() {
  const { t, isRTL } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      id="trade-types"
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 bg-bg-secondary overflow-hidden"
    >
      <BackgroundPattern />

      <motion.div className="relative" style={{ opacity }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16 lg:mb-20">
            {/* Exchange symbol */}
            <ExchangeSymbol />

            {/* Eyebrow */}
            <motion.p
              className="text-accent-primary font-mono text-sm tracking-widest uppercase mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {isRTL ? "קטגוריות החלפה" : "Trade Categories"}
            </motion.p>

            {/* Headline */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-fg-primary">{t.tradeTypes.headline.split(" ").slice(0, -1).join(" ")} </span>
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {t.tradeTypes.headline.split(" ").slice(-1)[0]}
              </span>
            </motion.h2>

            {/* Subhead */}
            <motion.p
              className="mt-6 text-fg-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {isRTL 
                ? "לא הכל צריך להיות משולם במזומן. הנה מה שאני מעריך ומקבל כהחלפה הוגנת עבור עבודת פיתוח."
                : "Not everything needs to be paid in cash. Here's what I value and accept as fair exchange for development work."}
            </motion.p>

            {/* Decorative line */}
            <motion.div
              className="mt-8 mx-auto flex items-center justify-center gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-primary/50" />
              <div className="w-2 h-2 rounded-full bg-accent-primary/50" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-primary/50" />
            </motion.div>
          </div>

          {/* Categories grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((category, index) => (
              <TradeCategory
                key={category.key}
                categoryKey={category.key}
                title={t.tradeTypes.categories[category.key].title}
                description={
                  t.tradeTypes.categories[category.key].description || ""
                }
                items={t.tradeTypes.categories[category.key].items}
                index={index}
                accentColor={category.accentColor}
                accentName={category.accentName}
              />
            ))}
          </div>

          {/* No equity badge */}
          <NoEquityBadge note={t.tradeTypes.note} />
        </div>
      </motion.div>
    </section>
  );
}
