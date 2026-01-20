"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { t } from "@/i18n";
import { MarketingSiteDemo, WebAppDemo, EcommerceDemo, CmsDemo } from "./demos";

const products = [
  { 
    key: "marketingSites" as const, 
    Demo: MarketingSiteDemo,
    accent: "amber",
    gradient: "from-amber-500/10 via-transparent to-orange-500/5",
  },
  { 
    key: "webApps" as const, 
    Demo: WebAppDemo,
    accent: "emerald",
    gradient: "from-emerald-500/10 via-transparent to-teal-500/5",
  },
  { 
    key: "ecommerce" as const, 
    Demo: EcommerceDemo,
    accent: "violet",
    gradient: "from-violet-500/10 via-transparent to-purple-500/5",
  },
  { 
    key: "cms" as const, 
    Demo: CmsDemo,
    accent: "indigo",
    gradient: "from-indigo-500/10 via-transparent to-blue-500/5",
  },
];

export function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative bg-bg-primary overflow-hidden"
    >
      {/* Section background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Diagonal lines pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              rgba(255,255,255,0.5) 40px,
              rgba(255,255,255,0.5) 41px
            )`,
          }}
        />
        
        {/* Gradient orbs */}
        <motion.div 
          className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[120px]"
          style={{ opacity }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-[120px]"
          style={{ opacity }}
        />
      </div>

      <div className="relative">
        {/* Section header */}
        <div className="pt-24 md:pt-32 pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
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
                Products
              </motion.p>
              
              {/* Main headline */}
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block text-fg-primary">{t.products.headline.split(" ")[0]}</span>
                <span className="block bg-gradient-to-r from-accent-primary via-amber-400 to-accent-secondary bg-clip-text text-transparent">
                  {t.products.headline.split(" ").slice(1).join(" ")}
                </span>
              </h2>

              {/* Subtle line decoration */}
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
          </div>
        </div>

        {/* Product showcases */}
        <div className="space-y-0">
          {products.map((product, index) => (
            <ProductShowcase
              key={product.key}
              title={t.products.items[product.key].title}
              description={t.products.items[product.key].description}
              tradeValue={t.products.items[product.key].tradeValue}
              Demo={product.Demo}
              index={index}
              accent={product.accent}
              gradient={product.gradient}
              reversed={index % 2 === 1}
            />
          ))}
        </div>

        {/* Bottom section spacer with fade */}
        <div className="h-24 md:h-32 bg-gradient-to-b from-transparent to-bg-secondary" />
      </div>
    </section>
  );
}

interface ProductShowcaseProps {
  title: string;
  description: string;
  tradeValue: string;
  Demo: React.ComponentType;
  index: number;
  accent: string;
  gradient: string;
  reversed: boolean;
}

function ProductShowcase({
  title,
  description,
  tradeValue,
  Demo,
  index,
  accent,
  gradient,
  reversed,
}: ProductShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const accentColors: Record<string, { text: string; border: string; bg: string; glow: string }> = {
    amber: { 
      text: "text-amber-400", 
      border: "border-amber-500/30",
      bg: "bg-amber-500/10",
      glow: "shadow-amber-500/20",
    },
    emerald: { 
      text: "text-emerald-400", 
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      glow: "shadow-emerald-500/20",
    },
    violet: { 
      text: "text-violet-400", 
      border: "border-violet-500/30",
      bg: "bg-violet-500/10",
      glow: "shadow-violet-500/20",
    },
    indigo: { 
      text: "text-indigo-400", 
      border: "border-indigo-500/30",
      bg: "bg-indigo-500/10",
      glow: "shadow-indigo-500/20",
    },
  };

  const colors = accentColors[accent] || accentColors.amber;

  return (
    <div 
      ref={ref}
      className={`relative py-16 md:py-24 bg-gradient-to-b ${gradient}`}
    >
      {/* Section number indicator */}
      <motion.div
        className="absolute top-8 left-6 lg:left-8 font-mono text-6xl md:text-8xl font-bold text-border-subtle/50 select-none pointer-events-none"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        0{index + 1}
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${reversed ? "lg:flex-row-reverse" : ""}`}>
          {/* Content side */}
          <motion.div
            className={`${reversed ? "lg:order-2" : ""} space-y-6`}
            initial={{ opacity: 0, x: reversed ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* Product number badge */}
            <motion.div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.bg} ${colors.border} border`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${colors.text.replace("text-", "bg-")}`} />
              <span className={`text-xs font-mono ${colors.text}`}>Product 0{index + 1}</span>
            </motion.div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-fg-primary leading-tight">
              {title}
            </h3>

            {/* Description */}
            <p className="text-lg md:text-xl text-fg-secondary leading-relaxed max-w-lg">
              {description}
            </p>

            {/* Trade value */}
            <motion.div
              className={`inline-block p-4 rounded-xl ${colors.bg} border ${colors.border}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-xs text-fg-muted block mb-1">Typical trade value</span>
              <span className={`text-2xl md:text-3xl font-bold font-mono ${colors.text}`}>
                {tradeValue}
              </span>
            </motion.div>

            {/* Decorative dots */}
            <div className="flex gap-1.5 pt-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i <= index ? colors.text.replace("text-", "bg-") : "bg-border-subtle"}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Demo side */}
          <motion.div 
            className={`${reversed ? "lg:order-1" : ""} relative`}
            style={{ y, scale }}
          >
            {/* Demo container */}
            <motion.div
              className={`relative aspect-[4/3] rounded-2xl overflow-hidden border ${colors.border} bg-bg-tertiary shadow-2xl ${colors.glow}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <Demo />
              
              {/* Corner accents */}
              <div className={`absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 ${colors.border} rounded-tl-2xl pointer-events-none`} />
              <div className={`absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 ${colors.border} rounded-br-2xl pointer-events-none`} />
            </motion.div>

            {/* Floating decoration */}
            <motion.div
              className={`absolute -bottom-4 -right-4 w-24 h-24 ${colors.bg} rounded-full blur-2xl pointer-events-none`}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Horizontal divider line */}
      {index < products.length - 1 && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
        </div>
      )}
    </div>
  );
}
