"use client";

import { motion } from "framer-motion";
import { t } from "@/i18n";

interface StepProps {
  data: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function StepWhatYouNeed({ data, onChange }: StepProps) {
  const step = t.apply.steps.whatYouNeed;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-fg-primary font-medium mb-3">
          {step.projectType}
        </label>
        <div className="flex flex-wrap gap-2">
          {step.projectTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onChange("projectType", type)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                data.projectType === type
                  ? "bg-accent-primary text-bg-primary"
                  : "bg-bg-tertiary text-fg-secondary hover:text-fg-primary border border-border-subtle"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-fg-primary font-medium mb-2">
          {step.description}
        </label>
        <textarea
          value={data.projectDescription || ""}
          onChange={(e) => onChange("projectDescription", e.target.value)}
          placeholder={step.descriptionPlaceholder}
          rows={3}
          className="w-full bg-bg-tertiary border border-border-subtle rounded-lg px-4 py-3 text-fg-primary placeholder:text-fg-muted focus:outline-none focus:border-accent-primary transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block text-fg-primary font-medium mb-3">
          {step.timeline}
        </label>
        <div className="flex flex-wrap gap-2">
          {step.timelineOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onChange("timeline", option)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                data.timeline === option
                  ? "bg-accent-primary text-bg-primary"
                  : "bg-bg-tertiary text-fg-secondary hover:text-fg-primary border border-border-subtle"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StepWhatYouOffer({ data, onChange }: StepProps) {
  const step = t.apply.steps.whatYouOffer;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-fg-primary font-medium mb-3">
          {step.tradeType}
        </label>
        <div className="flex flex-wrap gap-2">
          {step.tradeTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onChange("tradeType", type)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                data.tradeType === type
                  ? "bg-accent-primary text-bg-primary"
                  : "bg-bg-tertiary text-fg-secondary hover:text-fg-primary border border-border-subtle"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-fg-primary font-medium mb-2">
          {step.description}
        </label>
        <textarea
          value={data.offerDescription || ""}
          onChange={(e) => onChange("offerDescription", e.target.value)}
          placeholder={step.descriptionPlaceholder}
          rows={3}
          className="w-full bg-bg-tertiary border border-border-subtle rounded-lg px-4 py-3 text-fg-primary placeholder:text-fg-muted focus:outline-none focus:border-accent-primary transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block text-fg-primary font-medium mb-2">
          {step.estimatedValue}
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted">
            $
          </span>
          <input
            type="text"
            value={data.estimatedValue || ""}
            onChange={(e) => onChange("estimatedValue", e.target.value)}
            className="w-full bg-bg-tertiary border border-border-subtle rounded-lg pl-8 pr-4 py-3 text-fg-primary focus:outline-none focus:border-accent-primary transition-colors"
          />
        </div>
      </div>
    </div>
  );
}

export function StepAboutYou({ data, onChange }: StepProps) {
  const step = t.apply.steps.aboutYou;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-fg-primary font-medium mb-2">
          {step.name}
        </label>
        <input
          type="text"
          value={data.name || ""}
          onChange={(e) => onChange("name", e.target.value)}
          className="w-full bg-bg-tertiary border border-border-subtle rounded-lg px-4 py-3 text-fg-primary focus:outline-none focus:border-accent-primary transition-colors"
        />
      </div>

      <div>
        <label className="block text-fg-primary font-medium mb-2">
          {step.email}
        </label>
        <input
          type="email"
          value={data.email || ""}
          onChange={(e) => onChange("email", e.target.value)}
          className="w-full bg-bg-tertiary border border-border-subtle rounded-lg px-4 py-3 text-fg-primary focus:outline-none focus:border-accent-primary transition-colors"
        />
      </div>

      <div>
        <label className="block text-fg-primary font-medium mb-2">
          {step.website}
        </label>
        <input
          type="url"
          value={data.website || ""}
          onChange={(e) => onChange("website", e.target.value)}
          placeholder={step.websitePlaceholder}
          className="w-full bg-bg-tertiary border border-border-subtle rounded-lg px-4 py-3 text-fg-primary placeholder:text-fg-muted focus:outline-none focus:border-accent-primary transition-colors"
        />
      </div>

      <div>
        <label className="block text-fg-primary font-medium mb-2">
          {step.anything}
        </label>
        <textarea
          value={data.anything || ""}
          onChange={(e) => onChange("anything", e.target.value)}
          rows={3}
          className="w-full bg-bg-tertiary border border-border-subtle rounded-lg px-4 py-3 text-fg-primary focus:outline-none focus:border-accent-primary transition-colors resize-none"
        />
      </div>
    </div>
  );
}

export function StepConfirmation({
  data,
  onChange,
}: StepProps & { data: Record<string, string | boolean> }) {
  const step = t.apply.steps.confirmation;

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-fg-primary font-medium mb-4">{step.reviewLabel}</h4>
        <div className="bg-bg-tertiary rounded-lg p-4 space-y-2 text-sm">
          <p>
            <span className="text-fg-muted">Project:</span>{" "}
            <span className="text-fg-primary">{data.projectType}</span>
          </p>
          <p>
            <span className="text-fg-muted">Trade:</span>{" "}
            <span className="text-fg-primary">{data.tradeType}</span>
          </p>
          <p>
            <span className="text-fg-muted">Value:</span>{" "}
            <span className="text-accent-primary">${data.estimatedValue}</span>
          </p>
          <p>
            <span className="text-fg-muted">Contact:</span>{" "}
            <span className="text-fg-primary">{data.email}</span>
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {step.checkboxes.map((text, i) => (
          <label key={i} className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={!!data[`checkbox${i}`]}
              onChange={(e) =>
                onChange(`checkbox${i}`, e.target.checked.toString())
              }
              className="mt-1 w-4 h-4 rounded border-border-default bg-bg-tertiary checked:bg-accent-primary"
            />
            <span className="text-fg-secondary text-sm">{text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

