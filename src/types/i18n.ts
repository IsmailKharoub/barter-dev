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
    items: {
      marketingSites: {
        title: string;
        description: string;
        tradeValue: string;
      };
      webApps: {
        title: string;
        description: string;
        tradeValue: string;
      };
      ecommerce: {
        title: string;
        description: string;
        tradeValue: string;
      };
      cms: {
        title: string;
        description: string;
        tradeValue: string;
      };
    };
  };
  tradeTypes: {
    headline: string;
    note: string;
    categories: {
      designCreative: {
        title: string;
        items: string[];
      };
      professionalServices: {
        title: string;
        items: string[];
      };
      physicalGoods: {
        title: string;
        items: string[];
      };
      accessOpportunity: {
        title: string;
        items: string[];
      };
      skilledLabor: {
        title: string;
        items: string[];
      };
      hybrid: {
        title: string;
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
      title: string;
      role: string;
    }[];
    closing: string;
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

