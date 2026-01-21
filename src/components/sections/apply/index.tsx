"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { useReducedEffects } from "@/lib/hooks";
import type { ApplicationFormData } from "@/lib/validations/application";
import {
  StepWhatYouNeed,
  StepWhatYouOffer,
  StepAboutYou,
  StepConfirmation,
} from "./form-steps";
import {
  Rocket,
  Gift,
  User,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const steps = [
  { key: "whatYouNeed", component: StepWhatYouNeed, icon: Rocket, color: "white" },
  { key: "whatYouOffer", component: StepWhatYouOffer, icon: Gift, color: "gray" },
  { key: "aboutYou", component: StepAboutYou, icon: User, color: "white" },
  { key: "confirmation", component: StepConfirmation, icon: CheckCircle2, color: "gray" },
] as const;

// Background pattern with animated elements
function BackgroundPattern({ reducedEffects }: { reducedEffects: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <motion.div
        className="absolute top-0 start-1/4 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[150px]"
        animate={
          reducedEffects
            ? undefined
            : {
                x: [0, 50, 0],
                y: [0, 30, 0],
              }
        }
        transition={reducedEffects ? undefined : { duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 end-1/4 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-[120px]"
        animate={
          reducedEffects
            ? undefined
            : {
                x: [0, -30, 0],
                y: [0, -50, 0],
              }
        }
        transition={reducedEffects ? undefined : { duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, transparent 0%, var(--bg-primary) 100%)",
        }}
      />
    </div>
  );
}

// Animated step indicator
function StepIndicator({ 
  currentStep, 
  totalSteps,
  isRTL,
  reducedEffects,
}: { 
  currentStep: number; 
  totalSteps: number;
  isRTL: boolean;
  reducedEffects: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-3 md:gap-4">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;
        const isPending = i > currentStep;

        return (
          <div key={step.key} className="flex items-center">
            <motion.div
              className="relative"
              initial={false}
              animate={{
                scale: isActive ? 1 : 0.85,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Connector line */}
              {i < totalSteps - 1 && (
                <div
                  className={`absolute top-1/2 -translate-y-1/2 w-3 md:w-4 h-0.5 overflow-hidden ${
                    isRTL ? "end-full" : "start-full"
                  }`}
                >
                  <motion.div
                    className="h-full bg-white origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isCompleted ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-border-default -z-10" />
                </div>
              )}

              {/* Step circle */}
              <motion.div
                className={`
                  relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
                  transition-colors duration-300
                  ${isActive 
                    ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.3)]" 
                    : isCompleted 
                    ? "bg-white/20 text-white border-2 border-white/40"
                    : "bg-bg-tertiary text-fg-muted border border-border-default"
                  }
                `}
                whileHover={isPending ? { scale: 1.05 } : {}}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.div>
                ) : (
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                )}

                {/* Active ring pulse */}
                {isActive && !reducedEffects && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white"
                    animate={{
                      scale: [1, 1.3, 1.3],
                      opacity: [0.8, 0, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
              </motion.div>

              {/* Step label */}
              <motion.span
                className={`
                  absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-medium whitespace-nowrap
                  ${isActive ? "text-white" : isCompleted ? "text-fg-secondary" : "text-fg-muted"}
                `}
                animate={{ opacity: isActive || isCompleted ? 1 : 0.5 }}
              >
                {i + 1}
              </motion.span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

// Success animation component
function SuccessState({
  successMessage,
  isRTL,
  reducedEffects,
}: {
  successMessage: string;
  isRTL: boolean;
  reducedEffects: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-8 md:py-12"
    >
      {/* Animated success icon */}
      <motion.div
        className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
      >
        {/* Outer glow */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full blur-xl"
          animate={
            reducedEffects
              ? undefined
              : {
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.3, 0.5],
                }
          }
          transition={reducedEffects ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Circle background */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        />
        
        {/* Checkmark */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.4 }}
        >
          <svg
            className="w-12 h-12 md:w-16 md:h-16 text-bg-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            />
          </svg>
        </motion.div>

        {/* Sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              scale: 0,
              x: "50%",
              y: "50%",
            }}
            animate={{
              scale: [0, 1, 0],
              x: `${50 + Math.cos((i * Math.PI) / 3) * 80}%`,
              y: `${50 + Math.sin((i * Math.PI) / 3) * 80}%`,
            }}
            transition={{
              duration: 0.8,
              delay: 0.5 + i * 0.1,
              ease: "easeOut",
            }}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </motion.div>
        ))}
      </motion.div>

      {/* Success message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="space-y-4"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-fg-primary">
          {isRTL ? "הבקשה התקבלה!" : "Application Received!"}
        </h3>
        <p className="text-fg-secondary text-lg max-w-md mx-auto leading-relaxed">
          {successMessage}
        </p>
      </motion.div>

      {/* Decorative bottom dots */}
      <motion.div
        className="flex justify-center gap-2 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-white/30"
            animate={
              reducedEffects
                ? undefined
                : {
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }
            }
            transition={
              reducedEffects
                ? undefined
                : {
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }
            }
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

export function Apply() {
  const { t, isRTL } = useLocale();
  const reducedEffects = useReducedEffects();
  const sectionRef = useRef<HTMLElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (stepIndex: number) => {
    const projectDescription = (formData.projectDescription || "").trim();
    const tradeDescription = (formData.tradeDescription || "").trim();
    const name = (formData.name || "").trim();
    const email = (formData.email || "").trim();

    const estimatedValueRaw = (formData.estimatedValue || "").replace(/[,\s]/g, "");
    const estimatedValue = Number(estimatedValueRaw);

    if (stepIndex === 0) {
      if (!formData.projectType) {
        return isRTL ? "בחרו סוג פרויקט." : "Select a project type.";
      }
      if (projectDescription.length < 20) {
        return isRTL
          ? "תיאור הפרויקט חייב להיות לפחות 20 תווים."
          : "Project description must be at least 20 characters.";
      }
      if (!formData.timeline) {
        return isRTL ? "בחרו לוח זמנים." : "Select a timeline.";
      }
    }

    if (stepIndex === 1) {
      if (!formData.tradeType) {
        return isRTL ? "בחרו סוג הצעה." : "Select a trade type.";
      }
      if (tradeDescription.length < 20) {
        return isRTL
          ? "תיאור ההצעה חייב להיות לפחות 20 תווים."
          : "Trade description must be at least 20 characters.";
      }
      if (!Number.isFinite(estimatedValue)) {
        return isRTL ? "הכניסו ערך מספרי תקין." : "Enter a valid numeric value.";
      }
      if (estimatedValue < 500) {
        return isRTL ? "ערך מינימלי הוא $500." : "Minimum value is $500.";
      }
      if (estimatedValue > 100000) {
        return isRTL ? "ערך מקסימלי הוא $100,000." : "Maximum value is $100,000.";
      }
    }

    if (stepIndex === 2) {
      if (name.length < 2) {
        return isRTL ? "השם חייב להיות לפחות 2 תווים." : "Name must be at least 2 characters.";
      }
      if (!email) {
        return isRTL ? "האימייל הוא שדה חובה." : "Email is required.";
      }
      // Basic email sanity check (server still validates strictly)
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return isRTL ? "הכניסו אימייל תקין." : "Enter a valid email address.";
      }
    }

    if (stepIndex === 3) {
      const agreesToTerms = formData.checkbox0 === "true";
      const agreesToGoodFaith = formData.checkbox1 === "true";
      if (!agreesToTerms || !agreesToGoodFaith) {
        return isRTL ? "אנא אשרו את שתי התיבות לפני שליחה." : "Please check both boxes before submitting.";
      }
    }

    return null;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const error = validateStep(currentStep);
      if (error) {
        setSubmitError(error);
        return;
      }
      setSubmitError(null);
      setDirection(isRTL ? -1 : 1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(isRTL ? 1 : -1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitError(null);

    const stepError = validateStep(3);
    if (stepError) {
      setSubmitError(stepError);
      return;
    }

    const agreesToTerms = formData.checkbox0 === "true";
    const agreesToGoodFaith = formData.checkbox1 === "true";
    if (!agreesToTerms || !agreesToGoodFaith) {
      setSubmitError(
        isRTL ? "אנא אשרו את שתי התיבות לפני שליחה." : "Please check both boxes before submitting."
      );
      return;
    }

    // Map the UI labels to API enum values (server validates via Zod)
    const projectTypeLabel = formData.projectType || "";
    const tradeTypeLabel = formData.tradeType || "";
    const timelineLabel = formData.timeline || "";

    const projectType: ApplicationFormData["projectType"] =
      projectTypeLabel === "Landing Page"
        ? "marketing-site"
        : projectTypeLabel === "E-Commerce Store"
          ? "ecommerce"
          : projectTypeLabel === "CMS / Content Platform"
            ? "cms"
            : projectTypeLabel === "Web Application"
              ? "web-app"
              : "other";

    const tradeType: ApplicationFormData["tradeType"] =
      tradeTypeLabel === "Services"
        ? "services"
        : tradeTypeLabel === "Physical Goods"
          ? "physical-goods"
          : tradeTypeLabel === "Hybrid (Cash + Trade)"
            ? "hybrid"
            : "other";

    const timeline: ApplicationFormData["timeline"] =
      timelineLabel === "< 1 month"
        ? "less-than-1-month"
        : timelineLabel === "1-3 months"
          ? "1-3-months"
          : timelineLabel === "3-6 months"
            ? "3-6-months"
            : "flexible";

    const estimatedValueRaw = (formData.estimatedValue || "").replace(/[,\s]/g, "");
    const estimatedValue = Number(estimatedValueRaw);

    const payload: ApplicationFormData = {
      projectType,
      projectDescription: formData.projectDescription || "",
      timeline,
      tradeType,
      tradeDescription: formData.tradeDescription || "",
      estimatedValue,
      name: formData.name || "",
      email: formData.email || "",
      website: formData.website || "",
      additionalInfo: formData.additionalInfo || "",
      agreesToTerms: true,
      agreesToGoodFaith: true,
    };

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        const msg =
          json?.message ||
          json?.error ||
          (isRTL ? "משהו השתבש. נסו שוב." : "Something went wrong. Please try again.");
        setSubmitError(msg);
        return;
      }

      setSubmitted(true);
    } catch (e) {
      console.error("Submit failed:", e);
      setSubmitError(isRTL ? "שגיאת רשת. נסו שוב." : "Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const currentStepData = steps[currentStep];

  // Animation variants for step transitions
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 40 : -40,
      opacity: 0,
    }),
  };

  return (
    <section
      id="apply"
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 bg-bg-primary overflow-hidden"
    >
      <BackgroundPattern reducedEffects={reducedEffects} />

      <motion.div className="relative max-w-3xl mx-auto px-6 lg:px-8" style={{ opacity }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Eyebrow */}
          <motion.p
            className="text-accent-primary font-mono text-sm tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t.apply.eyebrow}
          </motion.p>

          {/* Main headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="block text-fg-primary">{t.apply.headlinePrimary}</span>
            <span className="block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {t.apply.headlineAccent}
            </span>
          </h2>

          {/* Subhead */}
          <p className="text-fg-secondary text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            {t.apply.subhead}
          </p>

          {/* Decorative line */}
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

        {/* Step indicator */}
        {!submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-12 md:mb-16"
          >
            <StepIndicator currentStep={currentStep} totalSteps={steps.length} isRTL={isRTL} reducedEffects={reducedEffects} />
          </motion.div>
        )}

        {/* Form container */}
        <AnimatePresence mode="wait" custom={direction}>
          {submitted ? (
            <SuccessState key="success" successMessage={t.apply.success} isRTL={isRTL} reducedEffects={reducedEffects} />
          ) : (
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              {/* Form card */}
              <div className="relative">
                {/* Card glow effect */}
                <div className="absolute -inset-[1px] bg-gradient-to-b from-white/20 via-border-subtle to-border-subtle rounded-3xl blur-[1px] -z-10" />
                
                <div className="bg-bg-secondary/80 backdrop-blur-sm rounded-3xl border border-border-subtle overflow-hidden">
                  {/* Step header */}
                  <div className="relative px-6 md:px-8 py-6 border-b border-border-subtle bg-bg-tertiary/50">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <currentStepData.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <p className="text-xs text-fg-muted font-mono uppercase tracking-wider">
                          {isRTL ? `שלב ${currentStep + 1} מתוך ${steps.length}` : `Step ${currentStep + 1} of ${steps.length}`}
                        </p>
                        <h3 className="text-xl md:text-2xl font-semibold text-fg-primary">
                          {t.apply.steps[currentStepData.key].title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Form content */}
                  <div className="px-6 md:px-8 py-8 md:py-10">
                    <CurrentStepComponent data={formData} onChange={handleChange} />
                  </div>

                  {/* Navigation footer */}
                  <div className="px-6 md:px-8 py-5 bg-bg-tertiary/30 border-t border-border-subtle">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className={`gap-2 ${currentStep === 0 ? "opacity-0 pointer-events-none" : ""}`}
                      >
                        <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                        {isRTL ? "חזרה" : "Back"}
                      </Button>

                      {currentStep === steps.length - 1 ? (
                        <Button onClick={handleSubmit} className="group gap-2" disabled={isSubmitting}>
                          <span>{t.apply.steps.confirmation.submit}</span>
                          <motion.span
                            animate={reducedEffects ? undefined : { x: [0, 4, 0] }}
                            transition={reducedEffects ? undefined : { duration: 1.5, repeat: Infinity }}
                          >
                            <Sparkles className="w-4 h-4" />
                          </motion.span>
                        </Button>
                      ) : (
                        <Button onClick={handleNext} className="group gap-2">
                          <span>{isRTL ? "המשך" : "Continue"}</span>
                          <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {submitError && (
          <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {submitError}
          </div>
        )}

        {/* Trust indicators */}
        {!submitted && (
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-fg-muted text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-success/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-success" />
              </div>
              <span>{isRTL ? "נסקר תוך 48 שעות" : "Reviewed within 48h"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <span>{isRTL ? "ללא התחייבות" : "No commitment required"}</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
