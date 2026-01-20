import type { Translations } from "@/types/i18n";

export const en: Translations = {
  meta: {
    title: "Barter Dev — Dev Work. No Cash Required.",
    description:
      "I build websites, MVPs, and internal tools in exchange for real value (services, goods, access). Clear scope, milestones, and timelines. No invoices.",
  },
  nav: {
    products: "Products",
    howItWorks: "How It Works",
    apply: "Apply",
  },
  hero: {
    headline: ["Dev Work.", "No Cash Required."],
    subhead:
      "Need a site, MVP, or internal tool? I’ll build it in exchange for tangible value you can deliver — services, goods, or access. Clear scope, milestones, and timelines.",
    cta: "See How It Works ↓",
  },
  howItWorks: {
    frames: {
      problem: {
        title: "The Problem",
        description:
          "Agencies charge $10k–$50k+. You might have a real need (or a great idea) — but not the cash to fund it.",
      },
      alternative: {
        title: "The Alternative",
        description:
          "You may not have cash — but you do have value: skills, services, products, inventory, or access I can use.",
      },
      apply: {
        title: "You Apply",
        description:
          "You share what you need built and what you’re offering. If it’s clear, specific, and fair, we move forward.",
      },
      evaluate: {
        title: "I Evaluate",
        description:
          "I scope the build. We align on trade value and what “done” means. No ambiguity, no surprises.",
      },
      agree: {
        title: "We Agree",
        description:
          "Everything in writing: milestones, deliverables, timeline, and trade terms for both sides.",
      },
      deliver: {
        title: "We Deliver",
        description: "I ship the work. You deliver the trade. Clean handoff, fair exchange.",
      },
    },
    cta: "Apply for a Trade",
  },
  products: {
    headline: "What I Build",
    items: {
      marketingSites: {
        title: "Marketing Sites",
        description:
          "Landing pages and business sites that convert. Fast, responsive, polished motion.",
        tradeValue: "$3,000 - $8,000",
      },
      webApps: {
        title: "Web Applications",
        description:
          "Dashboards, booking, internal tools. Your workflow, built to spec and easy to maintain.",
        tradeValue: "$8,000 - $20,000",
      },
      ecommerce: {
        title: "E-Commerce Stores",
        description:
          "Full storefronts powered by Medusa. Catalog, checkout, payments, shipping — handled.",
        tradeValue: "$10,000 - $25,000",
      },
      cms: {
        title: "CMS & Content Platforms",
        description:
          "Content systems you can actually run. No developer needed after handoff.",
        tradeValue: "$4,000 - $12,000",
      },
    },
  },
  tradeTypes: {
    headline: "What I'll Trade For",
    note: "No equity. No vague promises. I trade for tangible value I can use now.",
    categories: {
      designCreative: {
        title: "Design & Creative",
        description: "Visual assets and creative work that elevate brands and tell stories.",
        items: [
          "Graphic design",
          "Photography & video",
          "Copywriting & content",
          "Brand identity",
        ],
      },
      professionalServices: {
        title: "Professional Services",
        description: "Expert knowledge and professional guidance that saves time and money.",
        items: [
          "Legal consultation",
          "Accounting & finance",
          "Marketing & PR",
          "Business coaching",
        ],
      },
      physicalGoods: {
        title: "Physical Goods",
        description: "Quality items and equipment with real, usable value.",
        items: [
          "Furniture & decor",
          "Electronics & tech",
          "Equipment & tools",
          "Product inventory",
        ],
      },
      accessOpportunity: {
        title: "Access & Opportunity",
        description: "Connections, introductions, and doors opened to new possibilities.",
        items: [
          "Warm introductions",
          "Speaking engagements",
          "Partnership opportunities",
          "Exclusive access",
        ],
      },
      skilledLabor: {
        title: "Skilled Labor",
        description: "Hands-on craftsmanship and professional trade skills.",
        items: [
          "Carpentry & trades",
          "Property & renovation",
          "Catering & events",
          "Installation services",
        ],
      },
      hybrid: {
        title: "Hybrid",
        description: "Flexible arrangements that blend different types of value.",
        items: [
          "Partial cash + trade",
          "Retainer arrangements",
          "Revenue share deals",
          "Creative proposals",
        ],
      },
    },
  },
  apply: {
    headline: "Apply for a Trade",
    subhead:
      "This isn’t a contact form — it’s an application. Be specific about what you need and what you’re offering (vague requests get ignored).",
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
        description: "Describe the project in 2–3 sentences:",
        descriptionPlaceholder: "What are you building, for who, and what’s the goal?",
        timeline: "Ideal timeline:",
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
        description: "Describe your offer (be specific):",
        descriptionPlaceholder:
          "Example: “50 hours of product photography + editing” or “Custom home office desk + delivery”",
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
          "I understand this isn’t a guarantee — trades are accepted selectively.",
          "I’m prepared to scope and negotiate in good faith.",
        ],
        submit: "Submit Application →",
      },
    },
    success:
      "Got it. I’ll review within 48 hours. If it’s a fit, I’ll reply with next steps and a short scoping checklist.",
  },
  portfolio: {
    headline: "A Decade of Shipping",
    subhead: "I don’t name names. But I can show outcomes.",
    projects: [
      {
        id: "agri-ml",
        title: "Agri-Risk ML Engine",
        category: "Fintech · Machine Learning",
        description: "Patented ML model turning fragmented farming data into 78% accurate lending decisions, plus compliance automation.",
        techHighlights: ["Python", "TensorFlow", "PostgreSQL", "NestJS"],
        featured: true,
      },
      {
        id: "cross-border",
        title: "Cross-Border Payment Orchestration",
        category: "Fintech · Blockchain",
        description: "B2B stablecoin transfers with AI agent integration: multi-country routing, compliance, and LLM-assisted ops.",
        techHighlights: ["Go", "Web3", "LLM Agents", "Kubernetes"],
        featured: true,
      },
      {
        id: "mobility",
        title: "Shared Mobility Platform",
        category: "IoT · Consumer",
        description: "End-to-end scooter sharing: consumer apps, operator tools, firmware integration, real-time fleet ops.",
        techHighlights: ["React Native", "Kotlin", "MQTT", "C"],
      },
      {
        id: "fleet",
        title: "Fleet Anti-Fraud System",
        category: "Logistics · Security",
        description: "Real-time tracking with automated certificate generation and custom fraud detection for delivery verification.",
        techHighlights: ["TypeScript", "Next.js", "Redis", "PostgreSQL"],
      },
      {
        id: "medical",
        title: "Offline-First Medical System",
        category: "Healthcare · NGO",
        description: "Mobile clinic management with queues, patient records, and offline-first sync back to Salesforce.",
        techHighlights: ["React Native", "SQLite", "Salesforce API", "Expo"],
      },
      {
        id: "learning",
        title: "Real-Time Learning Engine",
        category: "EdTech · Gaming",
        description: "Interactive e-learning with LiveKit conferencing, a custom game engine, and live classroom management.",
        techHighlights: ["LiveKit", "WebRTC", "React", "Game Engine"],
      },
    ],
    closing: "A decade of shipping. Now I trade.",
    stats: {
      years: "12",
      products: "15+",
      stack: "Full",
    },
  },
  footerCta: {
    headline: "Ready to trade?",
    buttons: ["Apply for a Trade", "See How It Works ↑"],
  },
  footer: {
    copyright: "BARTER DEV © 2026",
    tagline: "No agencies. No invoices. Just fair trades.",
  },
};

