/**
 * Console Easter Egg - Shows a styled message for developers who inspect
 */
export function initConsoleMessage() {
  if (typeof window === "undefined") return;

  const styles = {
    title: `
      font-size: 24px;
      font-weight: bold;
      color: #F59E0B;
      text-shadow: 2px 2px 0 #D97706;
      padding: 10px 0;
    `,
    subtitle: `
      font-size: 14px;
      color: #A8A29E;
      padding: 5px 0;
    `,
    highlight: `
      font-size: 12px;
      color: #10B981;
      padding: 3px 0;
    `,
    stack: `
      font-size: 11px;
      color: #78716C;
      padding: 2px 0;
    `,
    cta: `
      font-size: 13px;
      color: #F59E0B;
      font-weight: bold;
      padding: 10px 0;
    `,
  };

  // Main banner
  console.log(
    `%c
    ╔══════════════════════════════════════════╗
    ║                                          ║
    ║           🔥 BARTER DEV 🔥               ║
    ║                                          ║
    ║     Dev Work. No Cash Required.          ║
    ║                                          ║
    ╚══════════════════════════════════════════╝
    `,
    "color: #F59E0B; font-family: monospace;"
  );

  // Intro
  console.log(
    "%c👋 Hey there, fellow developer!",
    styles.title
  );

  console.log(
    "%cCurious about the code? I like that.",
    styles.subtitle
  );

  // Tech stack reveal
  console.log(
    "%c\n📦 Built with:",
    styles.highlight
  );

  const stack = [
    "→ Next.js 16 (App Router)",
    "→ React 19",
    "→ TypeScript",
    "→ Tailwind CSS v4",
    "→ React Three Fiber + Custom Shaders",
    "→ Framer Motion + GSAP",
    "→ Turso (SQLite at the edge)",
    "→ Resend (transactional email)",
  ];

  stack.forEach((item) => {
    console.log(`%c  ${item}`, styles.stack);
  });

  // Call to action
  console.log(
    "%c\n💡 Have a project idea? Let's trade.\n",
    styles.cta
  );

  console.log(
    "%c🔗 https://barter.dev/apply",
    styles.subtitle
  );

  // ASCII art signature
  console.log(
    `%c
    ┌─────────────────────────────────┐
    │  No agencies. No invoices.      │
    │  Just fair trades.              │
    └─────────────────────────────────┘
    `,
    "color: #78716C; font-family: monospace; font-size: 10px;"
  );
}

/**
 * Log performance metrics to console for developers
 */
export function logPerformanceMetrics() {
  if (typeof window === "undefined" || typeof performance === "undefined") return;

  // Wait for page to fully load
  window.addEventListener("load", () => {
    setTimeout(() => {
      const timing = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      
      if (!timing) return;

      const metrics = {
        "DNS Lookup": `${(timing.domainLookupEnd - timing.domainLookupStart).toFixed(2)}ms`,
        "TCP Connection": `${(timing.connectEnd - timing.connectStart).toFixed(2)}ms`,
        "Time to First Byte": `${(timing.responseStart - timing.requestStart).toFixed(2)}ms`,
        "Content Download": `${(timing.responseEnd - timing.responseStart).toFixed(2)}ms`,
        "DOM Interactive": `${(timing.domInteractive - timing.startTime).toFixed(2)}ms`,
        "DOM Complete": `${(timing.domComplete - timing.startTime).toFixed(2)}ms`,
        "Load Event": `${(timing.loadEventEnd - timing.startTime).toFixed(2)}ms`,
      };

      console.groupCollapsed(
        "%c⚡ Performance Metrics",
        "color: #10B981; font-weight: bold;"
      );
      
      Object.entries(metrics).forEach(([key, value]) => {
        console.log(`%c${key}: %c${value}`, "color: #A8A29E;", "color: #F59E0B;");
      });
      
      console.groupEnd();
    }, 100);
  });
}

