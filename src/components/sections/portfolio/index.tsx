"use client";

import { motion } from "framer-motion";
import { t } from "@/i18n";
import { ProjectCard } from "./project-card";

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.portfolio.headline}
          </h2>
          <p className="text-fg-secondary text-lg">{t.portfolio.subhead}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {t.portfolio.projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              role={project.role}
              index={index}
            />
          ))}
        </div>

        <motion.p
          className="text-center text-fg-secondary text-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t.portfolio.closing}
        </motion.p>
      </div>
    </section>
  );
}

