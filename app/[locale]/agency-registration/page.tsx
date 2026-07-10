import type {Metadata} from "next";
import {AgencyRegistrationForm} from "@/components/site/agency-registration-form";
import {Breadcrumbs} from "@/components/site/breadcrumbs";
import {PageHero} from "@/components/site/page-hero";
import {
  agencyRegistrationContentFallback,
  agencyRegistrationSeoFallback,
} from "@/lib/content/fallbacks";
import type {AppLocale, LocalizedValue} from "@/lib/locale";
import {resolveLocalized} from "@/lib/locale";
import {buildPageMetadata} from "@/lib/sanity/metadata";
import {resolveSanityImage, STOCK_IMAGES} from "@/lib/sanity/image";
import {agencyRegistrationPageQuery, fetchSanity} from "@/lib/sanity/queries";

type PageProps = {params: Promise<{locale: AppLocale}>};

type AgencyRegistrationPageData = {
  seo?: {metaTitle?: LocalizedValue; metaDescription?: LocalizedValue};
  heroImage?: unknown;
  h1?: LocalizedValue;
  introduction?: LocalizedValue;
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const data = await fetchSanity<AgencyRegistrationPageData>(
    agencyRegistrationPageQuery,
  );
  return buildPageMetadata(data?.seo, agencyRegistrationSeoFallback, locale);
}

export default async function AgencyRegistrationPage({params}: PageProps) {
  const {locale} = await params;
  const data =
    (await fetchSanity<AgencyRegistrationPageData>(
      agencyRegistrationPageQuery,
    )) ?? {};
  const fb = agencyRegistrationContentFallback;
  const heroTitle = resolveLocalized(data.h1, fb.h1, locale);
  const heroImage = resolveSanityImage(
    data.heroImage,
    STOCK_IMAGES.pageAgencyRegistration,
  );

  return (
    <div className="pb-16">
      <PageHero
        imageSrc={heroImage}
        imageAlt={heroTitle}
        title={heroTitle}
        subtitle={resolveLocalized(data.introduction, fb.introduction, locale)}
      />

      <Breadcrumbs />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <AgencyRegistrationForm />
      </section>
    </div>
  );
}
