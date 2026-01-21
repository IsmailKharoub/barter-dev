"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  type Locale,
  type LocaleConfig,
  getTranslations,
  getLocaleConfig,
  detectBrowserLocale,
  getStoredLocale,
  setStoredLocale,
  defaultLocale,
  supportedLocales,
  locales,
} from "@/i18n";
import type { Translations } from "@/types/i18n";

interface LocaleContextValue {
  locale: Locale;
  localeConfig: LocaleConfig;
  t: Translations;
  setLocale: (locale: Locale) => void;
  isRTL: boolean;
  supportedLocales: typeof supportedLocales;
  locales: typeof locales;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize locale from storage or browser detection
  useEffect(() => {
    const storedLocale = getStoredLocale();
    const detectedLocale = storedLocale ?? detectBrowserLocale();
    setLocaleState(detectedLocale);
    setIsInitialized(true);
  }, []);

  // Update HTML attributes when locale changes
  useEffect(() => {
    if (!isInitialized) return;

    const config = getLocaleConfig(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = config.dir;
    
    // Add/remove RTL class for additional styling hooks
    if (config.dir === "rtl") {
      document.documentElement.classList.add("rtl");
    } else {
      document.documentElement.classList.remove("rtl");
    }
  }, [locale, isInitialized]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setStoredLocale(newLocale);
  }, []);

  const localeConfig = getLocaleConfig(locale);
  const t = getTranslations(locale);
  const isRTL = localeConfig.dir === "rtl";

  const value: LocaleContextValue = {
    locale,
    localeConfig,
    t,
    setLocale,
    isRTL,
    supportedLocales,
    locales,
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

