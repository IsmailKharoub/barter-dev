import { en } from "./en";
import { he } from "./he";
import type { Translations } from "@/types/i18n";

export type Locale = "en" | "he";

export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
}

export const locales: Record<Locale, LocaleConfig> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    dir: "ltr",
  },
  he: {
    code: "he",
    name: "Hebrew",
    nativeName: "עברית",
    dir: "rtl",
  },
};

const translations: Record<Locale, Translations> = {
  en,
  he,
};

export const defaultLocale: Locale = "en";

export const supportedLocales = Object.keys(locales) as Locale[];

export function getTranslations(locale: Locale = defaultLocale): Translations {
  return translations[locale] ?? translations[defaultLocale];
}

export function getLocaleConfig(locale: Locale): LocaleConfig {
  return locales[locale] ?? locales[defaultLocale];
}

export function isRTL(locale: Locale): boolean {
  return getLocaleConfig(locale).dir === "rtl";
}

export function detectBrowserLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  
  const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || "";
  const langCode = browserLang.split("-")[0].toLowerCase();
  
  if (supportedLocales.includes(langCode as Locale)) {
    return langCode as Locale;
  }
  
  return defaultLocale;
}

export function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  
  const stored = localStorage.getItem("locale");
  if (stored && supportedLocales.includes(stored as Locale)) {
    return stored as Locale;
  }
  
  return null;
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("locale", locale);
}

// For backwards compatibility - provides default translations
export const t = getTranslations();
