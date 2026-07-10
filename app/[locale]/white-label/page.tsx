import type {Metadata} from "next";
import {Lock} from "lucide-react";
import {Link} from "@/i18n/navigation";
import {PageHero} from "@/components/site/page-hero";
import {
  whiteLabelContentFallback,
  whiteLabelSeoFallback,
} from "@/lib/content/fallbacks";
import type {AppLocale, LocalizedValue} from "@/lib/locale";
import {resolveArray, resolveLocalized} from "@/lib/locale";
import {buildPageMetadata} from "@/lib/sanity/metadata";
import {resolveSanityImage, STOCK_IMAGES} from "@/lib/sanity/image";
import {fetchSanity, whiteLabelPageQuery} from "@/lib/sanity/queries";

type PageProps = {params: Promise<{locale: AppLocale}>};

type StepItem = {
  number?: string;
  title?: LocalizedValue;
  description?: LocalizedValue;
};

type WhiteLabelPageData = {
  seo?: {metaTitle?: LocalizedValue; metaDescription?: LocalizedValue};
  heroImage?: unknown;
  heroH1?: LocalizedValue;
  heroBody?: LocalizedValue;
  processTitle?: LocalizedValue;
  steps?: StepItem[];
  whoIsForTitle?: LocalizedValue;
  whoIsForItems?: LocalizedValue[];
  whatWeHandleTitle?: LocalizedValue;
  whatWeHandleItems?: LocalizedValue[];
  confidentialityTitle?: LocalizedValue;
  confidentialityBody?: LocalizedValue;
  ctaTitle?: LocalizedValue;
  ctaBody?: LocalizedValue;
  ctaButtonLabel?: LocalizedValue;
  ctaContactName?: string;
  ctaContactEmail?: string;
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const data = await fetchSanity<WhiteLabelPageData>(whiteLabelPageQuery);
  return buildPageMetadata(data?.seo, whiteLabelSeoFallback, locale);
}

export default async function WhiteLabelPage({params}: PageProps) {
  const {locale} = await params;
  const data = (await fetchSanity<WhiteLabelPageData>(whiteLabelPageQuery)) ?? {};
  const fb = whiteLabelContentFallback;
  const heroTitle = resolveLocalized(data.heroH1, fb.heroH1, locale);
  const heroImage = resolveSanityImage(
    data.heroImage,
    STOCK_IMAGES.whiteLabel,
  );

  const steps = resolveArray(data.steps, fb.steps).map((step, index) => ({
    number: step.number ?? fb.steps[index]?.number ?? "01",
    title: resolveLocalized(
      data.steps?.[index]?.title ?? step.title,
      fb.steps[index]?.title ?? {},
      locale,
    ),
    description: resolveLocalized(
      data.steps?.[index]?.description ?? step.description,
      fb.steps[index]?.description ?? {},
      locale,
    ),
  }));

  const whoIsForItems = resolveArray(data.whoIsForItems, fb.whoIsForItems);
  const whatWeHandleItems = resolveArray(
    data.whatWeHandleItems,
    fb.whatWeHandleItems,
  );

  const contactName = data.ctaContactName ?? fb.ctaContactName;
  const contactEmail = data.ctaContactEmail ?? fb.ctaContactEmail;

  return (
    <div className="pb-16">
      <PageHero
        imageSrc={heroImage}
        imageAlt={heroTitle}
        title={heroTitle}
        subtitle={resolveLocalized(data.heroBody, fb.heroBody, locale)}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#072b52] sm:text-3xl">
          {resolveLocalized(data.processTitle, fb.processTitle, locale)}
        </h2>
        <div className="mt-10 space-y-8">
          {steps.map((step) => (
            <article
              key={step.number}
              className="grid gap-4 border-l-4 border-amber-400 pl-6 sm:grid-cols-[80px_1fr]"
            >
              <p className="text-4xl font-bold text-amber-600">{step.number}</p>
              <div>
                <h3 className="text-xl font-semibold text-[#072b52]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-[#072b52]">
              {resolveLocalized(data.whoIsForTitle, fb.whoIsForTitle, locale)}
            </h2>
            <ul className="mt-6 space-y-3">
              {whoIsForItems.map((item, index) => (
                <li
                  key={`who-${index}`}
                  className="flex items-start gap-3 text-sm text-slate-700"
                >
                  <span className="mt-1 text-amber-600">✓</span>
                  {resolveLocalized(item, fb.whoIsForItems[index] ?? {}, locale)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#072b52]">
              {resolveLocalized(data.whatWeHandleTitle, fb.whatWeHandleTitle, locale)}
            </h2>
            <ul className="mt-6 space-y-3">
              {whatWeHandleItems.map((item, index) => (
                <li
                  key={`handle-${index}`}
                  className="flex items-start gap-3 text-sm text-slate-700"
                >
                  <span className="mt-1 text-amber-600">✓</span>
                  {resolveLocalized(
                    item,
                    fb.whatWeHandleItems[index] ?? {},
                    locale,
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-slate-200/80 p-8 lg:p-10">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-white p-3 text-[#072b52] shadow-sm">
              <Lock className="size-6" aria-hidden />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#072b52]">
                {resolveLocalized(
                  data.confidentialityTitle,
                  fb.confidentialityTitle,
                  locale,
                )}
              </h2>
              <p className="mt-4 leading-relaxed text-slate-700">
                {resolveLocalized(
                  data.confidentialityBody,
                  fb.confidentialityBody,
                  locale,
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-100 to-amber-50 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#072b52] sm:text-3xl">
            {resolveLocalized(data.ctaTitle, fb.ctaTitle, locale)}
          </h2>
          <p className="mt-4 text-slate-700">
            {resolveLocalized(data.ctaBody, fb.ctaBody, locale)}
          </p>
          <p className="mt-4 text-sm text-slate-600">
            Contact: {contactName} —{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="font-semibold text-[#072b52] hover:underline"
            >
              {contactEmail}
            </a>
          </p>
          <Link
            href="/contact#contact-form"
            className="mt-8 inline-flex rounded-lg bg-[#072b52] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#05233f]"
          >
            {resolveLocalized(data.ctaButtonLabel, fb.ctaButtonLabel, locale)}
          </Link>
        </div>
      </section>
    </div>
  );
}
