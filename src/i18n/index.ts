import { en } from "./en";
import type { Translations } from "@/types/i18n";

export type Locale = "en";

const translations: Record<Locale, Translations> = {
  en,
};

export const defaultLocale: Locale = "en";

export function getTranslations(locale: Locale = defaultLocale): Translations {
  return translations[locale];
}

export const t = getTranslations();

