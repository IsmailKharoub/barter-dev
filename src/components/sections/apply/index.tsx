"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { t } from "@/i18n";
import { Button } from "@/components/ui/button";
import {
  StepWhatYouNeed,
  StepWhatYouOffer,
  StepAboutYou,
  StepConfirmation,
} from "./form-steps";

const steps = [
  { key: "whatYouNeed", component: StepWhatYouNeed },
  { key: "whatYouOffer", component: StepWhatYouOffer },
  { key: "aboutYou", component: StepAboutYou },
  { key: "confirmation", component: StepConfirmation },
] as const;

export function Apply() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <section id="apply" className="py-24 md:py-32 bg-bg-primary">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.apply.headline}
          </h2>
          <p className="text-fg-secondary">{t.apply.subhead}</p>
        </motion.div>

        {/* Progress */}
        <div className="flex justify-center gap-2 mb-12">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 w-12 rounded-full transition-all ${
                i <= currentStep ? "bg-accent-primary" : "bg-border-subtle"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-primary/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-accent-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-fg-secondary text-lg">{t.apply.success}</p>
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-bg-secondary rounded-2xl p-8 border border-border-subtle">
                <h3 className="text-xl font-semibold mb-6 text-fg-primary">
                  {t.apply.steps[steps[currentStep].key].title}
                </h3>

                <CurrentStepComponent data={formData} onChange={handleChange} />

                <div className="flex justify-between mt-8 pt-6 border-t border-border-subtle">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={currentStep === 0 ? "invisible" : ""}
                  >
                    ← Back
                  </Button>

                  {currentStep === steps.length - 1 ? (
                    <Button onClick={handleSubmit}>
                      {t.apply.steps.confirmation.submit}
                    </Button>
                  ) : (
                    <Button onClick={handleNext}>Next →</Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

