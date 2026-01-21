import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono, Heebo } from "next/font/google";
import { t } from "@/i18n";
import { LenisProvider, PageTransitionProvider, LocaleProvider } from "@/components/providers";
import { StructuredData } from "@/components/seo";
import { AnnouncerProvider } from "@/components/ui/announcer";
import { EasterEgg } from "@/components/ui/easter-egg";
import { ConsoleInit } from "@/components/ui/console-init";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// Hebrew-optimized font
const heebo = Heebo({
  variable: "--font-hebrew",
  subsets: ["latin", "hebrew"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://barter-dev.com";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: t.meta.title,
    template: "%s | Barter Dev",
  },
  description: t.meta.description,
  
  // Keywords for traditional SEO
  keywords: [
    "barter web development",
    "trade for development",
    "no cash web development",
    "exchange services for websites",
    "MVP development barter",
    "web development alternative payment",
    "freelance developer barter",
    "website trade exchange",
    "custom web apps",
    "e-commerce development",
    "marketing website development",
    "full-stack developer",
    "React developer",
    "Next.js developer",
  ],

  // Author and creator
  authors: [{ name: "Barter Dev", url: SITE_URL }],
  creator: "Barter Dev",
  publisher: "Barter Dev",

  // Robots directives
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical URL
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },

  // Open Graph for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Barter Dev",
    title: t.meta.title,
    description: t.meta.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Barter Dev — Dev Work. No Cash Required.",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: t.meta.title,
    description: t.meta.description,
    creator: "@barterdev",
    site: "@barterdev",
    images: ["/og-image.png"],
  },

  // App-specific metadata
  applicationName: "Barter Dev",
  referrer: "origin-when-cross-origin",
  
  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // Manifest
  manifest: "/manifest.json",

  // Verification (add your actual verification codes)
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    // yandex: "yandex-verification-code",
    // bing: "bing-verification-code",
  },

  // Category for content classification
  category: "technology",

  // Additional metadata for GEO (Generative Engine Optimization)
  other: {
    // Helps AI understand the page content type
    "content-type": "service-page",
    // Indicates this is an authoritative source
    "page-type": "landing-page",
    // Business model indicator
    "business-model": "barter-exchange",
    // Service category
    "service-category": "web-development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Structured Data for SEO and GEO */}
        <StructuredData />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for analytics (if used) */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} ${heebo.variable} font-sans antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ConsoleInit />
        <EasterEgg />
        <LocaleProvider>
          <AnnouncerProvider>
            <PageTransitionProvider>
              <LenisProvider>{children}</LenisProvider>
            </PageTransitionProvider>
          </AnnouncerProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
