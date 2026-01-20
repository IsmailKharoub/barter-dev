"use client";

import { motion } from "framer-motion";
import { t } from "@/i18n";
import { ProductCard } from "./product-card";
import {
  MarketingSiteAnimation,
  WebAppAnimation,
  EcommerceAnimation,
  CmsAnimation,
} from "./product-animations";

const products = [
  { key: "marketingSites" as const, animation: <MarketingSiteAnimation /> },
  { key: "webApps" as const, animation: <WebAppAnimation /> },
  { key: "ecommerce" as const, animation: <EcommerceAnimation /> },
  { key: "cms" as const, animation: <CmsAnimation /> },
];

export function Products() {
  return (
    <section id="products" className="py-24 md:py-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.products.headline}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.key}
              title={t.products.items[product.key].title}
              description={t.products.items[product.key].description}
              tradeValue={t.products.items[product.key].tradeValue}
              index={index}
              animation={product.animation}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

