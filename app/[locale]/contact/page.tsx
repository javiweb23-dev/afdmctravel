import type {Metadata} from "next";
import {setRequestLocale} from "next-intl/server";
import {FaqAccordion} from "@/components/site/faq-accordion";
import {PageHero} from "@/components/site/page-hero";
import {Breadcrumbs} from "@/components/site/breadcrumbs";
import {RfpForm} from "@/components/site/rfp-form";
import {FaqSchema} from "@/components/site/structured-data";
import {
  contactContentFallback,
  contactSeoFallback,
} from "@/lib/content/fallbacks";
import type {AppLocale, LocalizedValue} from "@/lib/locale";
import {resolveArray, resolveLocalized} from "@/lib/locale";
import {buildPageMetadata} from "@/lib/sanity/metadata";
import {LOCAL_FALLBACK_IMAGE, resolveSanityImage} from "@/lib/sanity/image";
import {fetchSanity, contactPageQuery} from "@/lib/sanity/queries";

type PageProps = {params: Promise<{locale: AppLocale}>};

type ContactPageData = {
  seo?: {metaTitle?: LocalizedValue; metaDescription?: LocalizedValue};
  heroImage?: unknown;
  h1?: LocalizedValue;
  introduction?: LocalizedValue;
  formSectionTitle?: LocalizedValue;
  formLabels?: {
    fullName?: LocalizedValue;
    agencyCompany?: LocalizedValue;
    jobTitle?: LocalizedValue;
    email?: LocalizedValue;
    phone?: LocalizedValue;
    country?: LocalizedValue;
    groupSize?: LocalizedValue;
    travelDates?: LocalizedValue;
    programType?: LocalizedValue;
    hotelPreference?: LocalizedValue;
    budgetRange?: LocalizedValue;
    servicesRequired?: LocalizedValue;
    specialRequirements?: LocalizedValue;
    referral?: LocalizedValue;
  };
  programTypeOptions?: LocalizedValue[];
  hotelPreferenceOptions?: LocalizedValue[];
  budgetRangeOptions?: LocalizedValue[];
  servicesRequiredOptions?: LocalizedValue[];
  referralOptions?: LocalizedValue[];
  submitButtonLabel?: LocalizedValue;
  directContactTitle?: LocalizedValue;
  jeannieEmail?: string;
  jeannieWhatsApp?: LocalizedValue;
  jeannieResponseTime?: LocalizedValue;
  jeannieWorkingHours?: LocalizedValue;
  jeannieLanguages?: LocalizedValue;
  jeannieLocation?: LocalizedValue;
  faqSectionTitle?: LocalizedValue;
  faqs?: {question?: LocalizedValue; answer?: LocalizedValue}[];
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const data = await fetchSanity<ContactPageData>(contactPageQuery);
  return buildPageMetadata(data?.seo, contactSeoFallback, locale, "/contact");
}

function resolveLabel(
  sanity: LocalizedValue | undefined,
  fallback: LocalizedValue,
  locale: AppLocale,
) {
  return resolveLocalized(sanity, fallback, locale);
}

export default async function ContactPage({params}: PageProps) {
  const {locale} = await params;
  setRequestLocale(locale);
  const data = (await fetchSanity<ContactPageData>(contactPageQuery)) ?? {};
  const fb = contactContentFallback;
  const heroTitle = resolveLocalized(data.h1, fb.h1, locale);
  const heroImage = resolveSanityImage(data.heroImage, LOCAL_FALLBACK_IMAGE);

  const formLabels = {
    fullName: resolveLabel(
      data.formLabels?.fullName,
      fb.formLabels.fullName,
      locale,
    ),
    agencyCompany: resolveLabel(
      data.formLabels?.agencyCompany,
      fb.formLabels.agencyCompany,
      locale,
    ),
    jobTitle: resolveLabel(
      data.formLabels?.jobTitle,
      fb.formLabels.jobTitle,
      locale,
    ),
    email: resolveLabel(data.formLabels?.email, fb.formLabels.email, locale),
    phone: resolveLabel(data.formLabels?.phone, fb.formLabels.phone, locale),
    country: resolveLabel(
      data.formLabels?.country,
      fb.formLabels.country,
      locale,
    ),
    groupSize: resolveLabel(
      data.formLabels?.groupSize,
      fb.formLabels.groupSize,
      locale,
    ),
    travelDates: resolveLabel(
      data.formLabels?.travelDates,
      fb.formLabels.travelDates,
      locale,
    ),
    programType: resolveLabel(
      data.formLabels?.programType,
      fb.formLabels.programType,
      locale,
    ),
    hotelPreference: resolveLabel(
      data.formLabels?.hotelPreference,
      fb.formLabels.hotelPreference,
      locale,
    ),
    budgetRange: resolveLabel(
      data.formLabels?.budgetRange,
      fb.formLabels.budgetRange,
      locale,
    ),
    servicesRequired: resolveLabel(
      data.formLabels?.servicesRequired,
      fb.formLabels.servicesRequired,
      locale,
    ),
    specialRequirements: resolveLabel(
      data.formLabels?.specialRequirements,
      fb.formLabels.specialRequirements,
      locale,
    ),
    referral: resolveLabel(
      data.formLabels?.referral,
      fb.formLabels.referral,
      locale,
    ),
  };

  const mapOptions = (
    sanity: LocalizedValue[] | undefined,
    fallback: LocalizedValue[],
  ) =>
    resolveArray(sanity, fallback).map((item, index) =>
      resolveLocalized(
        sanity?.[index] ?? item,
        fallback[index] ?? {},
        locale,
      ),
    );

  const faqs = resolveArray(data.faqs, fb.faqs).map((faq, index) => ({
    id: `faq-${index}`,
    question: resolveLocalized(
      data.faqs?.[index]?.question ?? faq.question,
      fb.faqs[index]?.question ?? {},
      locale,
    ),
    answer: resolveLocalized(
      data.faqs?.[index]?.answer ?? faq.answer,
      fb.faqs[index]?.answer ?? {},
      locale,
    ),
  }));

  const directContactRows = [
    {
      label: "Email",
      value: data.jeannieEmail ?? fb.jeannieEmail,
      href: `mailto:${data.jeannieEmail ?? fb.jeannieEmail}`,
    },
    {
      label: "WhatsApp",
      value: resolveLocalized(
        data.jeannieWhatsApp,
        fb.jeannieWhatsApp,
        locale,
      ),
    },
    {
      label: "Response Time",
      value: resolveLocalized(
        data.jeannieResponseTime,
        fb.jeannieResponseTime,
        locale,
      ),
    },
    {
      label: "Working Hours",
      value: resolveLocalized(
        data.jeannieWorkingHours,
        fb.jeannieWorkingHours,
        locale,
      ),
    },
    {
      label: "Languages",
      value: resolveLocalized(
        data.jeannieLanguages,
        fb.jeannieLanguages,
        locale,
      ),
    },
    {
      label: "Location",
      value: resolveLocalized(
        data.jeannieLocation,
        fb.jeannieLocation,
        locale,
      ),
    },
  ];

  return (
    <div className="pb-16">
      <FaqSchema items={faqs} />
      <PageHero
        imageSrc={heroImage}
        imageAlt={heroTitle}
        title={heroTitle}
        subtitle={resolveLocalized(data.introduction, fb.introduction, locale)}
      />

      <Breadcrumbs />

      <section
        id="contact-form"
        className="scroll-mt-24 mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <h2 className="text-2xl font-bold text-[#072b52] sm:text-3xl">
          {resolveLocalized(data.formSectionTitle, fb.formSectionTitle, locale)}
        </h2>
        <div className="mt-8">
          <RfpForm
            labels={formLabels}
            programTypeOptions={mapOptions(
              data.programTypeOptions,
              fb.programTypeOptions,
            )}
            hotelPreferenceOptions={mapOptions(
              data.hotelPreferenceOptions,
              fb.hotelPreferenceOptions,
            )}
            budgetRangeOptions={mapOptions(
              data.budgetRangeOptions,
              fb.budgetRangeOptions,
            )}
            servicesRequiredOptions={mapOptions(
              data.servicesRequiredOptions,
              fb.servicesRequiredOptions,
            )}
            referralOptions={mapOptions(
              data.referralOptions,
              fb.referralOptions,
            )}
            submitLabel={resolveLocalized(
              data.submitButtonLabel,
              fb.submitButtonLabel,
              locale,
            )}
          />
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#072b52] sm:text-3xl">
            {resolveLocalized(
              data.directContactTitle,
              fb.directContactTitle,
              locale,
            )}
          </h2>
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <dl className="divide-y divide-slate-100">
              {directContactRows.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-1 px-5 py-4 sm:grid-cols-[160px_1fr]"
                >
                  <dt className="text-sm font-semibold text-[#072b52]">
                    {row.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-slate-700">
                    {row.href ? (
                      <a href={row.href} className="font-medium hover:underline">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="scroll-mt-24 mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <h2 className="text-2xl font-bold text-[#072b52] sm:text-3xl">
          {resolveLocalized(data.faqSectionTitle, fb.faqSectionTitle, locale)}
        </h2>
        <div className="mt-8">
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </div>
  );
}
