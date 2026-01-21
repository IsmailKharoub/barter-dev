import { z } from "zod";

// Project types that can be selected
export const projectTypes = [
  "marketing-site",
  "web-app",
  "ecommerce",
  "cms",
  "other",
] as const;

// Trade types that can be offered
export const tradeTypes = [
  "services",
  "physical-goods",
  "hybrid",
  "other",
] as const;

// Timeline options
export const timelines = [
  "less-than-1-month",
  "1-3-months",
  "3-6-months",
  "flexible",
] as const;

// Zod schema for application form
export const applicationSchema = z.object({
  // Step 1: What you need
  projectType: z.enum(projectTypes, {
    message: "Please select a project type",
  }),
  projectDescription: z
    .string()
    .min(20, "Please provide at least 20 characters describing your project")
    .max(1000, "Description must be less than 1000 characters"),
  timeline: z.enum(timelines, {
    message: "Please select a timeline",
  }),

  // Step 2: What you're offering
  tradeType: z.enum(tradeTypes, {
    message: "Please select a trade type",
  }),
  tradeDescription: z
    .string()
    .min(20, "Please provide at least 20 characters describing your offer")
    .max(1000, "Description must be less than 1000 characters"),
  estimatedValue: z
    .number()
    .min(500, "Minimum trade value is $500")
    .max(100000, "Maximum trade value is $100,000"),

  // Step 3: About you
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  additionalInfo: z.string().max(1000, "Additional info must be less than 1000 characters").optional(),

  // Step 4: Agreements
  agreesToTerms: z.literal(true, {
    message: "You must agree to the terms",
  }),
  agreesToGoodFaith: z.literal(true, {
    message: "You must agree to negotiate in good faith",
  }),
});

// Type inference for the form data
export type ApplicationFormData = z.infer<typeof applicationSchema>;

// Partial schema for step-by-step validation
export const step1Schema = applicationSchema.pick({
  projectType: true,
  projectDescription: true,
  timeline: true,
});

export const step2Schema = applicationSchema.pick({
  tradeType: true,
  tradeDescription: true,
  estimatedValue: true,
});

export const step3Schema = applicationSchema.pick({
  name: true,
  email: true,
  website: true,
  additionalInfo: true,
});

export const step4Schema = applicationSchema.pick({
  agreesToTerms: true,
  agreesToGoodFaith: true,
});

// Labels for display
export const projectTypeLabels: Record<typeof projectTypes[number], string> = {
  "marketing-site": "Marketing Site",
  "web-app": "Web Application",
  "ecommerce": "E-Commerce Store",
  "cms": "CMS / Content Platform",
  "other": "Other",
};

export const tradeTypeLabels: Record<typeof tradeTypes[number], string> = {
  "services": "Services",
  "physical-goods": "Physical Goods",
  "hybrid": "Hybrid (Cash + Trade)",
  "other": "Other",
};

export const timelineLabels: Record<typeof timelines[number], string> = {
  "less-than-1-month": "Less than 1 month",
  "1-3-months": "1-3 months",
  "3-6-months": "3-6 months",
  "flexible": "Flexible",
};

