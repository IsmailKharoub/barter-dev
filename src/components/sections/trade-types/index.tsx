"use client";

import { motion } from "framer-motion";
import { t } from "@/i18n";
import { TradeCategory } from "./trade-category";

const categories = [
  "designCreative",
  "professionalServices",
  "physicalGoods",
  "accessOpportunity",
  "skilledLabor",
  "hybrid",
] as const;

export function TradeTypes() {
  return (
    <section id="trade-types" className="py-24 md:py-32 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.tradeTypes.headline}
        </motion.h2>

        <motion.p
          className="text-fg-secondary text-center max-w-xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {t.tradeTypes.note}
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((key, index) => (
            <TradeCategory
              key={key}
              title={t.tradeTypes.categories[key].title}
              items={t.tradeTypes.categories[key].items}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

