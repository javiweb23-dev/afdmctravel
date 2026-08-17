import type {Metadata} from "next";
import type {AppLocale, LocalizedValue} from "@/lib/locale";
import {pickLocalized, resolveLocalized} from "@/lib/locale";

export const SITE_URL = "https://afdmctravel.com";

const OG_LOCALES: Record<AppLocale, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
};

const LOCALES: AppLocale[] = ["en", "es", "fr"];

type SeoMeta = {
  metaTitle?: LocalizedValue;
  metaDescription?: LocalizedValue;
  ogImage?: unknown;
};

type SeoFallback = {
  metaTitle: LocalizedValue;
  metaDescription: LocalizedValue;
};

/**
 * Builds the canonical + hreflang set for a page.
 * `path` is the route without the locale prefix, e.g. "/contact" or "" for home.
 */
export function buildAlternates(path: string, locale: AppLocale) {
  const suffix = path === "/" ? "" : path;
  const languages: Record<string, string> = {};

  for (const item of LOCALES) {
    languages[item] = `${SITE_URL}/${item}${suffix}`;
  }
  // Tells Google which version to serve when no language matches.
  languages["x-default"] = `${SITE_URL}/en${suffix}`;

  return {
    canonical: `${SITE_URL}/${locale}${suffix}`,
    languages,
  };
}

export function buildPageMetadata(
  seo: SeoMeta | undefined,
  fallback: SeoFallback,
  locale: AppLocale,
  path = "",
): Metadata {
  const title = resolveLocalized(seo?.metaTitle, fallback.metaTitle, locale);
  const description = resolveLocalized(
    seo?.metaDescription,
    fallback.metaDescription,
    locale,
  );
  const alternates = buildAlternates(path, locale);

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      type: "website",
      url: alternates.canonical,
      siteName: "AF DMC Travel",
      locale: OG_LOCALES[locale],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function getSeoText(
  seo: SeoMeta | undefined,
  fallback: SeoFallback,
  locale: AppLocale,
) {
  return {
    title: resolveLocalized(seo?.metaTitle, fallback.metaTitle, locale),
    description: resolveLocalized(
      seo?.metaDescription,
      fallback.metaDescription,
      locale,
    ),
  };
}

export function pickSeoLocalized(
  value: LocalizedValue | undefined,
  locale: AppLocale,
) {
  return pickLocalized(value, locale);
}
