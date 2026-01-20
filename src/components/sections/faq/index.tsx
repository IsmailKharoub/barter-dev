"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is barter-based web development?",
    answer: "Barter-based web development is a service model where software development work is exchanged for goods, services, or other non-cash value instead of traditional payment. This includes trading development work for professional services (legal, accounting, marketing), physical goods (equipment, inventory), creative work (design, photography), or hybrid arrangements combining partial cash with trade.",
  },
  {
    question: "What types of projects can be built through barter?",
    answer: "I build four main types of projects: Marketing websites (valued at $3,000-$8,000), Web applications like dashboards and booking systems ($8,000-$20,000), E-commerce stores with full catalog and checkout ($10,000-$25,000), and CMS platforms for content management ($4,000-$12,000). All projects include clear scope, milestones, and timelines.",
  },
  {
    question: "What can I trade for web development work?",
    answer: "Accepted trade categories include: Design & Creative services (graphic design, photography, videography, copywriting), Professional Services (legal consultation, accounting, marketing, business coaching), Physical Goods (furniture, electronics, equipment), Access & Opportunity (introductions, speaking engagements, partnerships), Skilled Labor (carpentry, renovation, catering), and Hybrid arrangements combining partial cash with any of the above.",
  },
  {
    question: "How long does the process take?",
    answer: "Applications are reviewed within 48 hours. Project timelines vary based on scope: marketing sites typically take 2-4 weeks, web applications 1-3 months, e-commerce stores 2-4 months, and CMS platforms 3-6 weeks. We agree on specific milestones and deadlines before starting.",
  },
  {
    question: "Do you accept equity or revenue share?",
    answer: "No. I don't accept equity, vague promises, or future commitments. Only tangible value that can be delivered now or within the project timeline is accepted. This ensures fair, clear exchanges for both parties and avoids the complications that come with equity arrangements.",
  },
  {
    question: "How do you determine trade value?",
    answer: "Trade value is determined by the market rate of what you're offering. For services, this is typically your hourly or project rate. For goods, it's the fair market value. We align on this during the scoping phase before any work begins, so both parties know exactly what's being exchanged.",
  },
];

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
        className="w-full py-6 flex items-center justify-between text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-fg-primary group-hover:text-accent-primary transition-colors pr-8">
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
            Common Questions
          </motion.p>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-fg-primary">Frequently Asked </span>
            <span className="bg-gradient-to-r from-accent-primary to-amber-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        </motion.div>

        {/* FAQ list */}
        <div className="border-t border-border-subtle">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
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
            Still have questions?
          </p>
          <a
            href="#apply"
            className="text-accent-primary hover:text-accent-secondary font-medium transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get in touch through the application form →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

