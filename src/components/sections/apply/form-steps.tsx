"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/components/providers";
import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  FileText,
  HelpCircle,
  Briefcase,
  Package,
  Shuffle,
  Clock,
  Mail,
  User as UserIcon,
  Link2,
  MessageSquare,
  DollarSign,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface StepProps {
  data: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

// Project type icons
const projectTypeIcons: Record<string, LucideIcon> = {
  "Landing Page": Globe,
  "Web Application": Smartphone,
  "Mobile App": Smartphone,
  "E-Commerce Store": ShoppingCart,
  "Dashboard/Admin": FileText,
  "API/Backend": Briefcase,
  "Other": HelpCircle,
};

// Trade type icons
const tradeTypeIcons: Record<string, LucideIcon> = {
  "Services": Briefcase,
  "Physical Goods": Package,
  "Hybrid (Cash + Trade)": Shuffle,
  "Other": HelpCircle,
};

// Timeline icons
const timelineIcons: Record<string, LucideIcon> = {
  "< 1 month": Clock,
  "1-3 months": Clock,
  "3-6 months": Clock,
  "Flexible": Clock,
};

// Reusable selection button component
function SelectionButton({
  label,
  isSelected,
  onClick,
  icon: Icon,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  icon?: LucideIcon;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`
        relative flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium
        transition-all duration-300 ease-out
        ${isSelected
          ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          : "bg-bg-tertiary text-fg-secondary hover:text-fg-primary border border-border-subtle hover:border-white/30"
        }
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
      {isSelected && (
        <motion.div
          className="absolute -top-1 -end-1 w-4 h-4 bg-black rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        >
          <CheckCircle2 className="w-3 h-3 text-white" />
        </motion.div>
      )}
    </motion.button>
  );
}

// Reusable input component with icon
function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  prefix,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  prefix?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-fg-primary font-medium text-sm">
        {Icon && <Icon className="w-4 h-4 text-fg-muted" />}
        <span>
          {label}
          {required && <span className="text-red-400 ms-1">*</span>}
        </span>
      </label>
      <div className="relative group">
        {prefix && (
          <span className="absolute start-4 top-1/2 -translate-y-1/2 text-fg-muted font-mono">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          aria-required={required ? "true" : undefined}
          className={`
            w-full bg-bg-tertiary border border-border-subtle rounded-xl
            ${prefix ? "ps-8" : "ps-4"} pe-4 py-3.5
            text-fg-primary placeholder:text-fg-muted/50
            focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/10
            transition-all duration-200
          `}
        />
        <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </div>
  );
}

// Reusable textarea component
function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  icon: Icon,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  icon?: LucideIcon;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-fg-primary font-medium text-sm">
        {Icon && <Icon className="w-4 h-4 text-fg-muted" />}
        <span>
          {label}
          {required && <span className="text-red-400 ms-1">*</span>}
        </span>
      </label>
      <div className="relative group">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          required={required}
          aria-required={required ? "true" : undefined}
          className={`
            w-full bg-bg-tertiary border border-border-subtle rounded-xl
            px-4 py-3.5
            text-fg-primary placeholder:text-fg-muted/50
            focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/10
            transition-all duration-200 resize-none
          `}
        />
        <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </div>
  );
}

// Section header for grouping fields
function FieldSection({ 
  title, 
  children,
  required,
}: { 
  title: string; 
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h4 className="text-sm font-medium text-fg-muted uppercase tracking-wider">
        {title}
        {required && <span className="text-red-400 ms-1">*</span>}
      </h4>
      {children}
    </motion.div>
  );
}

export function StepWhatYouNeed({ data, onChange }: StepProps) {
  const { t } = useLocale();
  const step = t.apply.steps.whatYouNeed;

  return (
    <div className="space-y-8">
      {/* Project Type Selection */}
      <FieldSection title={step.projectType} required>
        <div className="flex flex-wrap gap-3">
          {step.projectTypes.map((type, i) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <SelectionButton
                label={type}
                isSelected={data.projectType === type}
                onClick={() => onChange("projectType", type)}
                icon={projectTypeIcons[type]}
              />
            </motion.div>
          ))}
        </div>
      </FieldSection>

      {/* Project Description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <TextareaField
          label={step.description}
          value={data.projectDescription || ""}
          onChange={(value) => onChange("projectDescription", value)}
          placeholder={step.descriptionPlaceholder}
          rows={4}
          icon={MessageSquare}
          required
        />
      </motion.div>

      {/* Timeline Selection */}
      <FieldSection title={step.timeline} required>
        <div className="flex flex-wrap gap-3">
          {step.timelineOptions.map((option, i) => (
            <motion.div
              key={option}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              <SelectionButton
                label={option}
                isSelected={data.timeline === option}
                onClick={() => onChange("timeline", option)}
                icon={timelineIcons[option]}
              />
            </motion.div>
          ))}
        </div>
      </FieldSection>
    </div>
  );
}

export function StepWhatYouOffer({ data, onChange }: StepProps) {
  const { t, isRTL } = useLocale();
  const step = t.apply.steps.whatYouOffer;

  return (
    <div className="space-y-8">
      {/* Trade Type Selection */}
      <FieldSection title={step.tradeType} required>
        <div className="flex flex-wrap gap-3">
          {step.tradeTypes.map((type, i) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <SelectionButton
                label={type}
                isSelected={data.tradeType === type}
                onClick={() => onChange("tradeType", type)}
                icon={tradeTypeIcons[type]}
              />
            </motion.div>
          ))}
        </div>
      </FieldSection>

      {/* Offer Description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <TextareaField
          label={step.description}
          value={data.tradeDescription || ""}
          onChange={(value) => onChange("tradeDescription", value)}
          placeholder={step.descriptionPlaceholder}
          rows={4}
          icon={MessageSquare}
          required
        />
      </motion.div>
    </div>
  );
}

export function StepAboutYou({ data, onChange }: StepProps) {
  const { t, isRTL } = useLocale();
  const step = t.apply.steps.aboutYou;

  return (
    <div className="space-y-6">
      {/* Name & Email in a grid on larger screens */}
      <div className="grid gap-6 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <InputField
            label={step.name}
            value={data.name || ""}
            onChange={(value) => onChange("name", value)}
            placeholder={isRTL ? "השם המלא שלכם" : "Your full name"}
            icon={UserIcon}
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <InputField
            label={step.email}
            type="email"
            value={data.email || ""}
            onChange={(value) => onChange("email", value)}
            placeholder="you@example.com"
            icon={Mail}
            required
          />
        </motion.div>
      </div>

      {/* Website */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <InputField
          label={step.website}
          type="url"
          value={data.website || ""}
          onChange={(value) => onChange("website", value)}
          placeholder={step.websitePlaceholder}
          icon={Link2}
        />
      </motion.div>

      {/* Additional info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <TextareaField
          label={step.anything}
          value={data.additionalInfo || ""}
          onChange={(value) => onChange("additionalInfo", value)}
          placeholder={isRTL ? "כל הקשר שיכול לעזור לי להעריך את הבקשה שלכם..." : "Any context that might help me evaluate your application..."}
          rows={3}
          icon={MessageSquare}
        />
      </motion.div>
    </div>
  );
}

// Checkbox component
function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <motion.div
          className={`
            w-5 h-5 rounded-md border-2 flex items-center justify-center
            transition-colors duration-200
            ${checked
              ? "bg-white border-white"
              : "bg-bg-tertiary border-border-default group-hover:border-white/50"
            }
          `}
          whileTap={{ scale: 0.9 }}
        >
          <motion.svg
            className="w-3 h-3 text-bg-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
            initial={false}
            animate={{
              pathLength: checked ? 1 : 0,
              opacity: checked ? 1 : 0,
            }}
          >
            <motion.path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </div>
      <span className={`text-sm leading-relaxed transition-colors ${checked ? "text-fg-primary" : "text-fg-secondary"}`}>
        {label}
      </span>
    </label>
  );
}

export function StepConfirmation({
  data,
  onChange,
}: StepProps & { data: Record<string, string | boolean> }) {
  const { t, isRTL } = useLocale();
  const step = t.apply.steps.confirmation;

  return (
    <div className="space-y-8">
      {/* Application summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h4 className="text-sm font-medium text-fg-muted uppercase tracking-wider mb-4">
          {step.reviewLabel}
        </h4>
        <div className="bg-bg-tertiary rounded-2xl border border-border-subtle overflow-hidden">
          {/* Summary grid */}
          <div className="grid gap-px bg-border-subtle">
            <SummaryRow 
              label="Project Type" 
              value={data.projectType as string} 
              icon={projectTypeIcons[data.projectType as string] || FileText}
            />
            <SummaryRow 
              label="Timeline" 
              value={data.timeline as string}
              icon={Clock}
            />
            <SummaryRow 
              label="Trade Type" 
              value={data.tradeType as string}
              icon={tradeTypeIcons[data.tradeType as string] || Package}
            />
            <SummaryRow 
              label="Contact" 
              value={data.email as string}
              icon={Mail}
            />
          </div>
        </div>
      </motion.div>

      {/* Checkboxes */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h4 className="text-sm font-medium text-fg-muted uppercase tracking-wider">
          Before you submit
        </h4>
        {step.checkboxes.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <Checkbox
              checked={data[`checkbox${i}`] === "true"}
              onChange={(checked) => onChange(`checkbox${i}`, checked.toString())}
              label={text}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Summary row component
function SummaryRow({
  label,
  value,
  icon: Icon,
  highlight,
}: {
  label: string;
  value: string | undefined;
  icon: LucideIcon;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 px-4 py-3.5 bg-bg-tertiary">
      <div className="w-8 h-8 rounded-lg bg-bg-secondary flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-fg-muted" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-fg-muted">{label}</p>
        <p className={`text-sm font-medium truncate ${highlight ? "text-white" : "text-fg-primary"}`}>
          {value || "—"}
        </p>
      </div>
    </div>
  );
}
