"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/components/providers";
import { ProjectCard } from "./project-card";
import { useReducedEffects } from "@/lib/hooks";

export function Portfolio() {
  const { t, isRTL } = useLocale();
  const { projects, stats } = t.portfolio;
  const reducedEffects = useReducedEffects();

  return (
    <section id="portfolio" className="py-24 md:py-32 lg:py-40 bg-bg-secondary relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-secondary pointer-events-none" />
      
      {/* Horizontal lines pattern */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 80px,
            var(--fg-primary) 80px,
            var(--fg-primary) 81px
          )`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.p
            className="text-white/70 font-medium text-sm tracking-widest uppercase mb-4"
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {isRTL ? "העבודה" : "The Work"}
          </motion.p>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {t.portfolio.headline}
            </motion.span>
          </h2>
          
          <motion.p
            className="text-fg-secondary text-lg md:text-xl max-w-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {t.portfolio.subhead}
          </motion.p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-8 mb-12 lg:mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {[
            { value: stats.years, label: "Years" },
            { value: stats.products, label: "Products" },
            { value: stats.stack, label: "Stack" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center md:text-start"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-fg-muted text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-5 mb-20 lg:mb-24">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              category={project.category}
              description={project.description}
              techHighlights={project.techHighlights}
              featured={project.featured}
              index={index}
            />
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative line */}
          <motion.div
            className="absolute start-0 top-1/2 -translate-y-1/2 h-px bg-linear-to-r from-white/50 via-white/20 to-transparent hidden lg:block"
            initial={{ width: 0 }}
            whileInView={{ width: "15%" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          <div className="text-center lg:text-start lg:ps-[20%]">
            <motion.p
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-fg-primary leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-fg-secondary">
                {t.portfolio.closing.split(".")[0]}.
              </span>
              <br className="hidden sm:block" />
              <span className="text-white">
                {" "}{t.portfolio.closing.split(".").slice(1).join(".").trim()}
              </span>
            </motion.p>
          </div>

          {/* Decorative element */}
          <motion.div
            className="absolute end-0 top-1/2 -translate-y-1/2 w-20 h-20 hidden lg:block"
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <div className="w-full h-full rounded-xl bg-linear-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center">
              <motion.div
                className="w-3 h-3 rounded-full bg-white"
                animate={reducedEffects ? undefined : { scale: [1, 1.2, 1] }}
                transition={reducedEffects ? undefined : { duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
