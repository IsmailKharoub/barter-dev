"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";
import posthog from "posthog-js";

function FAQItem({ 
  question, 
  answer, 
  isOpen, 
  onToggle,
  index,
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      className="border-b border-border-subtle"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-start group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-fg-primary group-hover:text-accent-primary transition-colors pe-8">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? "text-accent-primary" : "text-fg-muted"}`} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {/* faq-answer class is referenced in speakable schema for GEO */}
            <p className="faq-answer pb-6 text-fg-secondary leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLocale();

  const handleFaqToggle = (index: number, question: string) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);

    posthog.capture('faq_item_toggled', {
      faq_index: index,
      faq_question: question,
      action: isOpening ? 'expanded' : 'collapsed',
    });
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-bg-primary">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-accent-primary font-mono text-sm tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t.faq.label}
          </motion.p>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-fg-primary">{t.faq.headlinePrimary} </span>
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {t.faq.headlineAccent}
            </span>
          </h2>
        </motion.div>

        {/* FAQ list */}
        <div className="border-t border-border-subtle">
          {t.faq.items.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleFaqToggle(index, faq.question)}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-fg-secondary mb-4">
            {t.faq.cta.prompt}
          </p>
          <a
            href="#apply"
            className="text-accent-primary hover:text-accent-secondary font-medium transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t.faq.cta.linkText}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

