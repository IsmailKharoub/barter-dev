import type { Translations } from "@/types/i18n";

export const en: Translations = {
  meta: {
    title: "Barter Dev — Dev Work. No Cash Required.",
    description:
      "12 years building products. Now I trade skills for skills. You bring value, I bring code.",
  },
  nav: {
    products: "Products",
    howItWorks: "How It Works",
    apply: "Apply",
  },
  hero: {
    headline: ["Dev Work.", "No Cash Required."],
    subhead:
      "12 years building products. Now I trade skills for skills. You bring value, I bring code.",
    cta: "See How It Works ↓",
  },
  howItWorks: {
    frames: {
      problem: {
        title: "The Problem",
        description:
          "Dev agencies charge $10k-50k. You've got a great idea but no budget.",
      },
      alternative: {
        title: "The Alternative",
        description:
          "But you have value. Skills. Services. Products. Access.",
      },
      apply: {
        title: "You Apply",
        description:
          "You tell me what you need built and what you can offer. Takes 5 minutes.",
      },
      evaluate: {
        title: "I Evaluate",
        description:
          "I scope the project. You scope your trade. We find equilibrium.",
      },
      agree: {
        title: "We Agree",
        description:
          "Everything in writing. Milestones for both sides. No surprises.",
      },
      deliver: {
        title: "We Deliver",
        description: "I build. You deliver. Fair and done.",
      },
    },
    cta: "Apply Now",
  },
  products: {
    headline: "What I Build",
    items: {
      marketingSites: {
        title: "Marketing Sites",
        description:
          "Landing pages and business sites that convert. Fast, responsive, scroll-animated.",
        tradeValue: "$3,000 - $8,000",
      },
      webApps: {
        title: "Web Applications",
        description:
          "Custom dashboards, booking systems, internal tools. Your logic, built to spec.",
        tradeValue: "$8,000 - $20,000",
      },
      ecommerce: {
        title: "E-Commerce Stores",
        description:
          "Full storefronts powered by Medusa. Inventory, payments, shipping — handled.",
        tradeValue: "$10,000 - $25,000",
      },
      cms: {
        title: "CMS & Content Platforms",
        description:
          "Content systems you can actually use. No dev needed after handoff.",
        tradeValue: "$4,000 - $12,000",
      },
    },
  },
  tradeTypes: {
    headline: "What I'll Trade For",
    note: "No equity deals. I trade for tangible value I can use now.",
    categories: {
      designCreative: {
        title: "Design & Creative",
        items: [
          "Graphic design",
          "Photography/video",
          "Copywriting",
          "Brand identity",
        ],
      },
      professionalServices: {
        title: "Professional Services",
        items: [
          "Legal consultation",
          "Accounting",
          "Marketing/PR",
          "Business coaching",
        ],
      },
      physicalGoods: {
        title: "Physical Goods",
        items: [
          "Furniture/decor",
          "Electronics",
          "Equipment",
          "Product inventory",
        ],
      },
      accessOpportunity: {
        title: "Access & Opportunity",
        items: [
          "Warm intros",
          "Speaking/events",
          "Collaboration",
        ],
      },
      skilledLabor: {
        title: "Skilled Labor",
        items: [
          "Carpentry/trades",
          "Property work",
          "Catering/food",
        ],
      },
      hybrid: {
        title: "Hybrid",
        items: [
          "Partial cash + trade",
          "Retainer arrangements",
          "Creative proposals",
        ],
      },
    },
  },
  apply: {
    headline: "Apply for a Trade",
    subhead:
      "This isn't a contact form. It's an application. Be specific — vague requests get ignored.",
    steps: {
      whatYouNeed: {
        title: "What You Need",
        projectType: "What are you building?",
        projectTypes: [
          "Marketing Site",
          "Web App",
          "E-Commerce",
          "CMS/Content",
          "Other",
        ],
        description: "Describe the project in 2-3 sentences:",
        descriptionPlaceholder: "Tell me about your project...",
        timeline: "Ideal launch timeline:",
        timelineOptions: [
          "< 1 month",
          "1-3 months",
          "3-6 months",
          "Flexible",
        ],
      },
      whatYouOffer: {
        title: "What You're Offering",
        tradeType: "Primary trade type:",
        tradeTypes: [
          "Services",
          "Physical Goods",
          "Hybrid (Cash + Trade)",
          "Other",
        ],
        description: "Describe your offer specifically:",
        descriptionPlaceholder:
          "Example: \"50 hours of photography including editing\" or \"Custom furniture for home office\"",
        estimatedValue: "Estimated market value of your offer:",
      },
      aboutYou: {
        title: "About You",
        name: "Your name:",
        email: "Email:",
        website: "Website or portfolio (optional):",
        websitePlaceholder: "https://",
        anything: "Anything else I should know?",
      },
      confirmation: {
        title: "Confirmation",
        reviewLabel: "Review your application:",
        checkboxes: [
          "I understand this is not a guarantee — trades are accepted selectively.",
          "I'm prepared to scope and negotiate in good faith.",
        ],
        submit: "Submit Application →",
      },
    },
    success:
      "Got it. I'll review within 48 hours. If there's a fit, we'll scope it out.",
  },
  portfolio: {
    headline: "12 Years of Building",
    subhead: "I don't name names. But I show the work.",
    projects: [
      { title: "Banking Platform — Consumer Fintech", role: "Technical Lead" },
      { title: "Real-Time Logistics Tracker — Supply Chain", role: "VP Engineering" },
      { title: "Patient Scheduling System — Healthcare", role: "Founding Engineer" },
      { title: "Inventory Management System — Retail", role: "CTO" },
      { title: "Publishing Platform — Media", role: "Head of Product" },
      { title: "Team Management SaaS — Enterprise", role: "Technical Co-founder" },
    ],
    closing: "47 products shipped. 12 years. Now I trade.",
  },
  footerCta: {
    headline: "Ready?",
    buttons: ["Apply Now", "See How It Works ↑"],
  },
  footer: {
    copyright: "BARTER DEV © 2026",
    tagline: "No agencies. No invoices. Just fair trades.",
  },
};

