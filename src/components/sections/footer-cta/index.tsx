"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { t } from "@/i18n";
import { Button } from "@/components/ui/button";

const OrbitingShapes = dynamic(
  () =>
    import("@/components/three/orbiting-shapes").then(
      (mod) => mod.OrbitingShapes
    ),
  { ssr: false }
);

export function FooterCta() {
  const handleApply = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-32 bg-bg-primary overflow-hidden">
      {/* 3D Background */}
      <OrbitingShapes className="absolute inset-0 opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          className="text-5xl md:text-6xl font-bold mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.footerCta.headline}
        </motion.h2>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Button size="lg" onClick={handleApply}>
            {t.footerCta.buttons[0]}
          </Button>
          <Button variant="secondary" size="lg" onClick={handleHowItWorks}>
            {t.footerCta.buttons[1]}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

