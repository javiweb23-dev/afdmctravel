import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {PartnerLanding} from "@/components/site/partner-landing";
import {
  isPartnerLocale,
  partnerLandingCopy,
  type PartnerLocale,
} from "@/lib/content/partners-landing";

type PageProps = {params: Promise<{lang?: string[]}>};

/** /partners (English), plus one URL per translation. */
export function generateStaticParams() {
  return [{lang: []}, {lang: ["es"]}, {lang: ["fr"]}];
}

/**
 * Resolves the URL segment to a locale, or null when the path is not one of
 * the three landing URLs. `/global-agents/en` is null on purpose: English is served
 * from the bare /global-agents, and a second URL for it would be a duplicate.
 */
function resolveLocale(lang: string[] | undefined): PartnerLocale | null {
  if (!lang || lang.length === 0) return "en";
  if (lang.length > 1) return null;

  const segment = lang[0];
  if (segment === "en" || !isPartnerLocale(segment)) return null;
  return segment;
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {lang} = await params;
  const locale = resolveLocale(lang);
  if (!locale) return {};

  return {
    title: partnerLandingCopy[locale].metaTitle,
    description: partnerLandingCopy[locale].metaDescription,
    // Kept out of search results so the landing does not compete with the
    // main site. Remove this to make it indexable.
    robots: {index: false, follow: false},
  };
}

export default async function PartnersLandingPage({params}: PageProps) {
  const {lang} = await params;
  const locale = resolveLocale(lang);
  if (!locale) notFound();

  return <PartnerLanding locale={locale} />;
}
