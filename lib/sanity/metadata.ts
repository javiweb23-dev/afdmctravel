import type {Metadata} from "next";
import type {AppLocale, LocalizedValue} from "@/lib/locale";
import {pickLocalized, resolveLocalized} from "@/lib/locale";

type SeoMeta = {
  metaTitle?: LocalizedValue;
  metaDescription?: LocalizedValue;
  ogImage?: unknown;
};

type SeoFallback = {
  metaTitle: LocalizedValue;
  metaDescription: LocalizedValue;
};

export function buildPageMetadata(
  seo: SeoMeta | undefined,
  fallback: SeoFallback,
  locale: AppLocale,
): Metadata {
  const title = resolveLocalized(seo?.metaTitle, fallback.metaTitle, locale);
  const description = resolveLocalized(
    seo?.metaDescription,
    fallback.metaDescription,
    locale,
  );

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : locale === "es" ? "es_ES" : "en_US",
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
