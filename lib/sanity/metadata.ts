import type {Metadata} from "next";
import type {AppLocale, LocalizedValue} from "@/lib/locale";
import {resolveLocalized} from "@/lib/locale";
import {resolveOgImage} from "@/lib/sanity/image";

export const SITE_URL = "https://www.afdmctravel.com";

const OG_LOCALES: Record<AppLocale, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
};

const LOCALES: AppLocale[] = ["en", "es", "fr"];

/** Used when a page has no ogImage of its own in the CMS. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/punta-cana-aerial.jpg`;

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
  // Every page has an ogImage in the CMS; without this the link preview on
  // WhatsApp, Facebook and LinkedIn shows no picture at all.
  const image = resolveOgImage(seo?.ogImage) ?? DEFAULT_OG_IMAGE;

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
      images: [{url: image, width: 1200, height: 630, alt: title}],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
