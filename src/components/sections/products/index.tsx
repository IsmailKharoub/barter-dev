"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLocale } from "@/components/providers";
import {
  LaunchFastDemo,
  WebAppDemo,
  EcommerceDemo,
  RealtimeDemo,
  IntegrationsDemo,
  ComplexDemo,
} from "./demos";

const productKeys = [
  "launchFast",
  "businessApps",
  "commerce",
  "realtime",
  "integrations",
  "complex",
] as const;

const productDemos: Record<typeof productKeys[number], React.ComponentType> = {
  launchFast: LaunchFastDemo,
  businessApps: WebAppDemo,
  commerce: EcommerceDemo,
  realtime: RealtimeDemo,
  integrations: IntegrationsDemo,
  complex: ComplexDemo,
};

const productColors = {
  launchFast: {
    gradient: "from-white to-gray-400",
    bg: "bg-white/5",
    border: "border-white/15",
    text: "text-white",
    glow: "group-hover:shadow-white/10",
  },
  businessApps: {
    gradient: "from-gray-300 to-gray-500",
    bg: "bg-white/5",
    border: "border-white/10",
    text: "text-gray-300",
    glow: "group-hover:shadow-white/10",
  },
  commerce: {
    gradient: "from-white to-gray-400",
    bg: "bg-white/5",
    border: "border-white/15",
    text: "text-white",
    glow: "group-hover:shadow-white/10",
  },
  realtime: {
    gradient: "from-gray-300 to-gray-500",
    bg: "bg-white/5",
    border: "border-white/10",
    text: "text-gray-300",
    glow: "group-hover:shadow-white/10",
  },
  integrations: {
    gradient: "from-white to-gray-400",
    bg: "bg-white/5",
    border: "border-white/15",
    text: "text-white",
    glow: "group-hover:shadow-white/10",
  },
  complex: {
    gradient: "from-gray-300 to-gray-500",
    bg: "bg-white/5",
    border: "border-white/10",
    text: "text-gray-300",
    glow: "group-hover:shadow-white/10",
  },
};

export function Products() {
  const { t, isRTL } = useLocale();
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
      className="relative py-24 md:py-32 lg:py-40 bg-bg-primary overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <motion.div
          className="absolute top-1/4 -start-64 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[120px]"
          style={{ opacity }}
        />
        <motion.div
          className="absolute bottom-1/4 -end-64 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-[120px]"
          style={{ opacity }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <motion.p
            className={`text-accent-primary text-sm mb-4 ${
              isRTL ? "font-medium tracking-normal" : "font-mono tracking-widest uppercase"
            }`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t.products.eyebrow}
          </motion.p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-fg-primary">{t.products.headlinePrimary} </span>
            <span className="bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {t.products.headlineAccent}
            </span>
          </h2>

          <p className="text-fg-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t.products.subhead}
          </p>

          <motion.div
            className="mt-8 mx-auto flex items-center justify-center gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="h-px w-12 bg-linear-to-r from-transparent to-accent-primary/50" />
            <div className="w-2 h-2 rounded-full bg-accent-primary/50" />
            <div className="h-px w-12 bg-linear-to-l from-transparent to-accent-primary/50" />
          </motion.div>
        </motion.div>

        {/* Product cards grid - 2 columns on larger screens for better demo visibility */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {productKeys.map((key, index) => (
            <ProductCard key={key} productKey={key} index={index} t={t} />
          ))}
        </div>

        {/* Bottom stat */}
        <motion.div
          className="mt-16 md:mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-fg-muted text-sm">
            <span className="text-fg-secondary font-semibold">
              {t.products.bottomStatPrimary}
            </span>
            {" "}— {t.products.bottomStatSecondary}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({
  productKey,
  index,
  t,
}: {
  productKey: typeof productKeys[number];
  index: number;
  t: ReturnType<typeof useLocale>["t"];
}) {
  const product = t.products.items[productKey];
  const colors = productColors[productKey];
  const Demo = productDemos[productKey];

  return (
    <motion.div
      className={`group relative bg-bg-secondary/50 backdrop-blur-sm border border-border-subtle rounded-2xl overflow-hidden transition-all duration-500 hover:border-border-default hover:shadow-2xl ${colors.glow}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Animated demo area */}
      <div className="aspect-16/10 bg-bg-tertiary/50 relative overflow-hidden">
        <Demo />
        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-bg-secondary/80 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 relative">
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-linear-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        <div className="relative">
          {/* Subtitle badge */}
          <div className="flex items-center justify-between mb-3">
            <motion.span
              className={`text-xs font-mono px-2 py-0.5 rounded-full ${colors.bg} ${colors.border} border ${colors.text}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              {product.subtitle}
            </motion.span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-fg-primary mb-3 group-hover:text-fg-primary transition-colors">
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-fg-secondary text-sm md:text-base leading-relaxed mb-5">
            {product.description}
          </p>

          {/* Capabilities tags */}
          <div className="flex flex-wrap gap-2">
            {product.capabilities.map((capability, i) => (
              <motion.span
                key={capability}
                className={`text-xs px-2.5 py-1 rounded-full bg-bg-tertiary/50 border border-border-subtle text-fg-muted hover:${colors.text} hover:${colors.bg} hover:${colors.border} transition-colors`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                {capability}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
