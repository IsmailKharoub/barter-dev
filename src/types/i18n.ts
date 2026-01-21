export interface Translations {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    products: string;
    howItWorks: string;
    apply: string;
  };
  hero: {
    headline: string[];
    subhead: string;
    cta: string;
  };
  howItWorks: {
    frames: {
      problem: {
        title: string;
        description: string;
      };
      alternative: {
        title: string;
        description: string;
      };
      apply: {
        title: string;
        description: string;
      };
      evaluate: {
        title: string;
        description: string;
      };
      agree: {
        title: string;
        description: string;
      };
      deliver: {
        title: string;
        description: string;
      };
    };
    cta: string;
  };
  products: {
    headline: string;
    subhead: string;
    items: {
      launchFast: {
        title: string;
        subtitle: string;
        description: string;
        capabilities: string[];
      };
      businessApps: {
        title: string;
        subtitle: string;
        description: string;
        capabilities: string[];
      };
      commerce: {
        title: string;
        subtitle: string;
        description: string;
        capabilities: string[];
      };
      realtime: {
        title: string;
        subtitle: string;
        description: string;
        capabilities: string[];
      };
      integrations: {
        title: string;
        subtitle: string;
        description: string;
        capabilities: string[];
      };
      complex: {
        title: string;
        subtitle: string;
        description: string;
        capabilities: string[];
      };
    };
  };
  faq: {
    label: string;
    headlinePrimary: string;
    headlineAccent: string;
    items: {
      question: string;
      answer: string;
    }[];
    cta: {
      prompt: string;
      linkText: string;
    };
  };
  tradeTypes: {
    headline: string;
    note: string;
    categories: {
      designCreative: {
        title: string;
        description: string;
        items: string[];
      };
      professionalServices: {
        title: string;
        description: string;
        items: string[];
      };
      physicalGoods: {
        title: string;
        description: string;
        items: string[];
      };
      accessOpportunity: {
        title: string;
        description: string;
        items: string[];
      };
      skilledLabor: {
        title: string;
        description: string;
        items: string[];
      };
      hybrid: {
        title: string;
        description: string;
        items: string[];
      };
    };
  };
  apply: {
    headline: string;
    subhead: string;
    steps: {
      whatYouNeed: {
        title: string;
        projectType: string;
        projectTypes: string[];
        description: string;
        descriptionPlaceholder: string;
        timeline: string;
        timelineOptions: string[];
      };
      whatYouOffer: {
        title: string;
        tradeType: string;
        tradeTypes: string[];
        description: string;
        descriptionPlaceholder: string;
        estimatedValue: string;
      };
      aboutYou: {
        title: string;
        name: string;
        email: string;
        website: string;
        websitePlaceholder: string;
        anything: string;
      };
      confirmation: {
        title: string;
        reviewLabel: string;
        checkboxes: string[];
        submit: string;
      };
    };
    success: string;
  };
  portfolio: {
    headline: string;
    subhead: string;
    projects: {
      id: string;
      title: string;
      category: string;
      description: string;
      techHighlights: string[];
      featured?: boolean;
    }[];
    closing: string;
    stats: {
      years: string;
      products: string;
      stack: string;
    };
  };
  footerCta: {
    headline: string;
    buttons: string[];
  };
  footer: {
    copyright: string;
    tagline: string;
  };
}

