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
    eyebrow: "The Process",
    headlinePrimary: "How It",
    headlineAccent: "Works",
    subhead: "From first contact to final handoff — a clear, fair process for both sides.",
    reviewedNote: "Reviewed within 48 hours",
    frames: {
      problem: {
        title: "The Problem",
        description:
          "Agencies charge $10k–$50k+. Great idea, no budget.",
      },
      alternative: {
        title: "The Alternative",
        description:
          "No cash? Trade skills, services, goods, or access instead.",
      },
      apply: {
        title: "You Apply",
        description:
          "Tell me what you need and what you're offering. Clear and fair wins.",
      },
      evaluate: {
        title: "I Evaluate",
        description:
          "I scope the build. We align on value. No ambiguity.",
      },
      agree: {
        title: "We Agree",
        description:
          "Everything in writing: milestones, deliverables, trade terms.",
      },
      deliver: {
        title: "We Deliver",
        description: "I ship. You deliver. Clean handoff.",
      },
    },
    cta: "Apply for a Trade",
  },
  products: {
    eyebrow: "Capabilities",
    headlinePrimary: "What",
    headlineAccent: "I Build",
    subhead: "From weekend launches to enterprise systems. 12 years of shipping.",
    bottomStatPrimary: "From landing pages to fintech platforms",
    bottomStatSecondary: "the scope changes, the quality doesn't.",
    items: {
      launchFast: {
        title: "Launch Fast",
        subtitle: "Days to weeks",
        description:
          "Landing pages, marketing sites, portfolios. Pixel-perfect, performance-optimized, ready to convert. Sometimes you just need it live.",
        capabilities: ["Marketing sites", "Landing pages", "Portfolios", "Documentation sites"],
      },
      businessApps: {
        title: "Business Applications",
        subtitle: "Weeks to months",
        description:
          "Dashboards, admin panels, booking systems, internal tools. Role-based access, audit logs, the works. Built for your team, not just your demo.",
        capabilities: ["Custom dashboards", "Admin panels", "Booking systems", "Internal tools"],
      },
      commerce: {
        title: "Commerce & Marketplaces",
        subtitle: "Full product builds",
        description:
          "Headless storefronts, multi-vendor marketplaces, subscription platforms. Inventory, payments, shipping, analytics — architected to scale.",
        capabilities: ["Headless e-commerce", "Marketplaces", "Subscription platforms", "Inventory systems"],
      },
      realtime: {
        title: "Real-Time Systems",
        subtitle: "Live data, instant updates",
        description:
          "Tracking dashboards, collaborative tools, live feeds. WebSockets, event-driven architecture, optimistic updates. Data that moves.",
        capabilities: ["Live dashboards", "Collaboration tools", "Tracking systems", "Notification systems"],
      },
      integrations: {
        title: "APIs & Integrations",
        subtitle: "Connect everything",
        description:
          "Third-party integrations, headless backends, webhook orchestration. Your systems talking to each other, reliably.",
        capabilities: ["REST & GraphQL APIs", "Third-party integrations", "Webhook systems", "Data pipelines"],
      },
      complex: {
        title: "Complex Systems",
        subtitle: "Enterprise-grade",
        description:
          "Fintech platforms, healthcare systems, multi-tenant SaaS. Compliance-aware, audit-ready, built for scale. The stuff that keeps CTOs up at night.",
        capabilities: ["Fintech platforms", "Healthcare systems", "Multi-tenant SaaS", "Regulated industries"],
      },
    },
  },
  faq: {
    label: "Common Questions",
    headlinePrimary: "Frequently Asked",
    headlineAccent: "Questions",
    items: [
      {
        question: "What is barter-based web development?",
        answer:
          "Barter-based web development is a service model where software development work is exchanged for goods, services, or other non-cash value instead of traditional payment. This includes trading development work for professional services (legal, accounting, marketing), physical goods (equipment, inventory), creative work (design, photography), or hybrid arrangements combining partial cash with trade.",
      },
      {
        question: "What types of projects can be built through barter?",
        answer:
          "I build four main types of projects: Marketing websites (valued at $3,000-$8,000), Web applications like dashboards and booking systems ($8,000-$20,000), E-commerce stores with full catalog and checkout ($10,000-$25,000), and CMS platforms for content management ($4,000-$12,000). All projects include clear scope, milestones, and timelines.",
      },
      {
        question: "What can I trade for web development work?",
        answer:
          "Accepted trade categories include: Design & Creative services (graphic design, photography, videography, copywriting), Professional Services (legal consultation, accounting, marketing, business coaching), Physical Goods (furniture, electronics, equipment), Access & Opportunity (introductions, speaking engagements, partnerships), Skilled Labor (carpentry, renovation, catering), and Hybrid arrangements combining partial cash with any of the above.",
      },
      {
        question: "How long does the process take?",
        answer:
          "Applications are reviewed within 48 hours. Project timelines vary based on scope: marketing sites typically take 2-4 weeks, web applications 1-3 months, e-commerce stores 2-4 months, and CMS platforms 3-6 weeks. We agree on specific milestones and deadlines before starting.",
      },
      {
        question: "Do you accept equity or revenue share?",
        answer:
          "No. I don't accept equity, vague promises, or future commitments. Only tangible value that can be delivered now or within the project timeline is accepted. This ensures fair, clear exchanges for both parties and avoids the complications that come with equity arrangements.",
      },
      {
        question: "How do you determine trade value?",
        answer:
          "Trade value is determined by the market rate of what you're offering. For services, this is typically your hourly or project rate. For goods, it's the fair market value. We align on this during the scoping phase before any work begins, so both parties know exactly what's being exchanged.",
      },
    ],
    cta: {
      prompt: "Still have questions?",
      linkText: "Get in touch through the application form →",
    },
  },
  tradeTypes: {
    eyebrow: "Trade Categories",
    headlinePrimary: "What I'll Trade",
    headlineAccent: "For",
    headline: "What I'll Trade For",
    subhead: "Not everything needs to be paid in cash. Here's what I value and accept as fair exchange for development work.",
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
    eyebrow: "Start Trading",
    headlinePrimary: "Apply for",
    headlineAccent: "a Trade",
    headline: "Apply for a Trade",
    subhead:
      "This isn’t a contact form — it’s an application. Be specific about what you need and what you’re offering (vague requests get ignored).",
    steps: {
      whatYouNeed: {
        title: "What You Need",
        projectType: "What are you building?",
        projectTypes: [
          "Landing Page",
          "Web Application",
          "Mobile App",
          "E-Commerce Store",
          "Dashboard/Admin",
          "API/Backend",
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
          "Example: "50 hours of product photography + editing" or "Custom home office desk + delivery"",
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
    eyebrow: "The Work",
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
    statsLabels: {
      years: "Years",
      products: "Products",
      stack: "Stack",
    },
  },
  footerCta: {
    eyebrow: "Let's Build Something",
    headlinePrimary: "Ready to",
    headlineAccent: "trade?",
    subhead: "Got something valuable to offer? Let's talk about building your next project.",
    buttons: ["Apply for a Trade", "See How It Works ↑"],
  },
  footer: {
    copyright: "BARTER DEV © 2026",
    tagline: "No agencies. No invoices. Just fair trades.",
  },
};

