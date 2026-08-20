import type {Metadata} from "next";
import {setRequestLocale} from "next-intl/server";
import {AgencyRegistrationForm} from "@/components/site/agency-registration-form";
import {Breadcrumbs} from "@/components/site/breadcrumbs";
import {PageHero} from "@/components/site/page-hero";
import {ScrollToFormOnLoad} from "@/components/site/scroll-to-form-on-load";
import {
  agencyRegistrationContentFallback,
  agencyRegistrationSeoFallback,
} from "@/lib/content/fallbacks";
import type {AppLocale, LocalizedValue} from "@/lib/locale";
import {resolveLocalized} from "@/lib/locale";
import {buildPageMetadata} from "@/lib/sanity/metadata";
import {resolveSanityImage, STOCK_IMAGES} from "@/lib/sanity/image";
import {agencyRegistrationPageQuery, fetchSanity} from "@/lib/sanity/queries";

/** Scroll target for the on-load jump. */
const REGISTRATION_FORM_ID = "registration-form";

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
  return buildPageMetadata(data?.seo, agencyRegistrationSeoFallback, locale, "/agency-registration");
}

export default async function AgencyRegistrationPage({params}: PageProps) {
  const {locale} = await params;
  setRequestLocale(locale);
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
      {/* The form is the page; the hero above it is decoration. */}
      <ScrollToFormOnLoad targetId={REGISTRATION_FORM_ID} />
      <PageHero
        imageSrc={heroImage}
        title={heroTitle}
        subtitle={resolveLocalized(data.introduction, fb.introduction, locale)}
      />

      <Breadcrumbs />

      <section
        id={REGISTRATION_FORM_ID}
        tabIndex={-1}
        className="mx-auto max-w-5xl scroll-mt-24 px-4 py-16 outline-none sm:px-6 lg:px-8"
      >
        <AgencyRegistrationForm />
      </section>
    </div>
  );
}
