export type AppLocale = "en" | "es" | "fr";

export type LocalizedValue = {
  en?: string;
  es?: string;
  fr?: string;
};

export function pickLocalized(
  value: LocalizedValue | undefined,
  locale: AppLocale,
): string {
  if (!value) return "";
  if (locale === "fr") return value.fr || value.en || value.es || "";
  return value[locale] || value.en || value.es || value.fr || "";
}

export function resolveLocalized(
  sanity: LocalizedValue | undefined,
  fallback: LocalizedValue,
  locale: AppLocale,
): string {
  const resolved = pickLocalized(sanity, locale);
  if (resolved) return resolved;
  return pickLocalized(fallback, locale);
}

export function resolveArray<T>(sanity: T[] | undefined, fallback: T[]): T[] {
  if (sanity && sanity.length > 0) return sanity;
  return fallback;
}

export function toLocalized(value: string): LocalizedValue {
  return {en: value};
}
