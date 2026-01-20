import { t } from "@/i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://barter.dev";

// Person/Organization schema - establishes entity identity for GEO
export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Barter Dev",
    alternateName: "BarterDev",
    description: "Independent developer specializing in web applications, MVPs, and internal tools. Accepts non-cash trades for development work.",
    url: SITE_URL,
    sameAs: [
      "https://github.com/barterdev",
      "https://x.com/barterdev",
      "https://linkedin.com/in/barterdev",
    ],
    jobTitle: "Full-Stack Developer",
    knowsAbout: [
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Mobile Development",
      "E-commerce Development",
      "MVP Development",
      "Barter Economy",
    ],
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Software Development Services",
        description: "Custom web development in exchange for goods, services, or hybrid arrangements",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Service schema for each product offering
export function ServicesSchema() {
  const services = [
    {
      name: "Marketing Website Development",
      description: "Landing pages and business sites that convert. Fast, responsive, polished motion design.",
      priceRange: "$3,000 - $8,000 equivalent value",
      areaServed: "Worldwide",
    },
    {
      name: "Web Application Development", 
      description: "Custom dashboards, booking systems, and internal tools built to spec.",
      priceRange: "$8,000 - $20,000 equivalent value",
      areaServed: "Worldwide",
    },
    {
      name: "E-Commerce Store Development",
      description: "Full storefronts with catalog, checkout, payments, and shipping integration.",
      priceRange: "$10,000 - $25,000 equivalent value",
      areaServed: "Worldwide",
    },
    {
      name: "CMS & Content Platform Development",
      description: "Content management systems designed for non-technical users to manage independently.",
      priceRange: "$4,000 - $12,000 equivalent value",
      areaServed: "Worldwide",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/#service-${index + 1}`,
        name: service.name,
        description: service.description,
        provider: {
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
        },
        priceRange: service.priceRange,
        areaServed: service.areaServed,
        serviceType: "Software Development",
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema - Critical for GEO (Generative Engine Optimization)
// This helps AI systems understand and cite your content
export function FAQSchema() {
  const faqs = [
    {
      question: "What is barter-based web development?",
      answer: "Barter-based web development is a service model where software development work is exchanged for goods, services, or other non-cash value instead of traditional payment. This includes trading development work for professional services (legal, accounting, marketing), physical goods (equipment, inventory), creative work (design, photography), or hybrid arrangements combining partial cash with trade.",
    },
    {
      question: "What types of projects can be built through barter?",
      answer: "Barter Dev builds four main types of projects: Marketing websites ($3,000-$8,000 value), Web applications like dashboards and booking systems ($8,000-$20,000 value), E-commerce stores with full catalog and checkout ($10,000-$25,000 value), and CMS platforms for content management ($4,000-$12,000 value). All projects include clear scope, milestones, and timelines.",
    },
    {
      question: "What can be traded for web development work?",
      answer: "Accepted trade categories include: Design & Creative services (graphic design, photography, videography, copywriting), Professional Services (legal consultation, accounting, marketing, business coaching), Physical Goods (furniture, electronics, equipment), Access & Opportunity (introductions, speaking engagements, partnerships), Skilled Labor (carpentry, renovation, catering), and Hybrid arrangements combining partial cash with any of the above.",
    },
    {
      question: "How does the barter development process work?",
      answer: "The process has six steps: 1) Identify the problem (traditional agencies cost $10k-$50k+), 2) Recognize you have non-cash value to trade, 3) Submit an application specifying your project and offer, 4) Project scoping and trade value alignment, 5) Written agreement on milestones and deliverables, 6) Development delivery in exchange for your trade. Applications are reviewed within 48 hours.",
    },
    {
      question: "Is equity accepted as payment for development work?",
      answer: "No. Barter Dev does not accept equity, vague promises, or future commitments. Only tangible value that can be delivered now or within the project timeline is accepted. This ensures fair, clear exchanges for both parties.",
    },
    {
      question: "What experience does Barter Dev have?",
      answer: "Barter Dev has 12+ years of experience shipping 15+ products across multiple industries including fintech (ML-powered lending, cross-border payments), IoT (shared mobility platforms), healthcare (offline-first medical systems), edtech (real-time learning engines), and logistics (anti-fraud systems). The full-stack expertise covers React, Next.js, React Native, Python, Go, and various databases and infrastructure tools.",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// HowTo Schema - Helps AI understand the process
export function HowToSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${SITE_URL}/#howto`,
    name: "How to Get Web Development Through Barter",
    description: "A step-by-step guide to exchanging goods or services for professional web development work without cash payment.",
    totalTime: "P7D",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Identify Your Need",
        text: "Determine what type of web project you need: marketing site, web application, e-commerce store, or CMS platform.",
        url: `${SITE_URL}/#products`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Assess Your Trade Value",
        text: "Evaluate what goods, services, or skills you can offer in exchange. This can include professional services, physical goods, creative work, or access/opportunities.",
        url: `${SITE_URL}/#trade-types`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Submit Application",
        text: "Complete the trade application form with specific details about your project needs and what you're offering in exchange.",
        url: `${SITE_URL}/#apply`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Project Scoping",
        text: "If your application is accepted, participate in project scoping to align on trade value, deliverables, and timeline.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Written Agreement",
        text: "Review and sign a written agreement covering milestones, deliverables, timeline, and trade terms for both parties.",
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Exchange Delivery",
        text: "Receive your completed development work and deliver your trade value as agreed.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebPage schema with speakable (for voice assistants - GEO)
export function WebPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: t.meta.title,
    description: t.meta.description,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Barter Dev",
      description: "Web development services in exchange for goods and services",
      publisher: {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
      },
    },
    about: {
      "@type": "Thing",
      name: "Barter-based Software Development",
      description: "Professional web development exchanged for goods, services, or other non-cash value",
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#hero h1", "#how-it-works h2", "#products h2", ".faq-answer"],
    },
    mainEntity: {
      "@type": "Service",
      name: "Barter Web Development",
      description: "Custom web development services exchanged for tangible goods, professional services, or hybrid arrangements instead of cash payment.",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// BreadcrumbList for navigation context
export function BreadcrumbSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Combined structured data component
export function StructuredData() {
  return (
    <>
      <PersonSchema />
      <ServicesSchema />
      <FAQSchema />
      <HowToSchema />
      <WebPageSchema />
      <BreadcrumbSchema />
    </>
  );
}

