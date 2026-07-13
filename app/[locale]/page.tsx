import type {Metadata} from "next";
import Image from "next/image";
import {Link} from "@/i18n/navigation";
import {
  homeContentFallback,
  homeSeoFallback,
} from "@/lib/content/fallbacks";
import type {AppLocale, LocalizedValue} from "@/lib/locale";
import {resolveArray, resolveLocalized} from "@/lib/locale";
import {buildPageMetadata} from "@/lib/sanity/metadata";
import {resolveSanityImage, STOCK_IMAGES} from "@/lib/sanity/image";
import {fetchSanity, homePageQuery} from "@/lib/sanity/queries";

type PageProps = {params: Promise<{locale: AppLocale}>};

type HomePageData = {
  seo?: {metaTitle?: LocalizedValue; metaDescription?: LocalizedValue};
  heroH1?: LocalizedValue;
  heroSubtitle?: LocalizedValue;
  heroCtaPrimary?: LocalizedValue;
  heroCtaSecondary?: LocalizedValue;
  heroBackgroundImage?: unknown;
  whoWeServeTitle?: LocalizedValue;
  whoWeServeIntro?: LocalizedValue;
  whoWeServeItems?: LocalizedValue[];
  statsTitle?: LocalizedValue;
  stats?: {value?: LocalizedValue; label?: LocalizedValue}[];
  whyChooseUsTitle?: LocalizedValue;
  whyChooseUsItems?: {title?: LocalizedValue; description?: LocalizedValue}[];
  ctaBannerTitle?: LocalizedValue;
  ctaBannerSubtitle?: LocalizedValue;
  ctaBannerButtonLabel?: LocalizedValue;
  ctaBannerContactLabel?: LocalizedValue;
  ctaBannerContactEmail?: string;
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const data = await fetchSanity<HomePageData>(homePageQuery);
  return buildPageMetadata(data?.seo, homeSeoFallback, locale);
}

function PartnerIcon() {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#072b52]/10 text-sm font-bold text-[#072b52]">
      ✦
    </span>
  );
}

export default async function HomePage({params}: PageProps) {
  const {locale} = await params;
  const data = (await fetchSanity<HomePageData>(homePageQuery)) ?? {};
  const fb = homeContentFallback;

  const heroImage = resolveSanityImage(
    data.heroBackgroundImage,
    STOCK_IMAGES.hero,
  );
  const whoWeServeItems = resolveArray(
    data.whoWeServeItems,
    fb.whoWeServeItems,
  );
  const stats = resolveArray(data.stats, fb.stats);
  const whyItems = resolveArray(data.whyChooseUsItems, fb.whyChooseUsItems);
  const contactEmail =
    data.ctaBannerContactEmail ?? fb.ctaBannerContactEmail;
  const contactLabelRaw = resolveLocalized(
    data.ctaBannerContactLabel,
    fb.ctaBannerContactLabel,
    locale,
  );
  const contactLabel = contactLabelRaw.endsWith(contactEmail)
    ? contactLabelRaw.slice(0, -contactEmail.length).trimEnd()
    : contactLabelRaw;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={resolveLocalized(data.heroH1, fb.heroH1, locale)}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05233f]/92 via-[#05233f]/78 to-[#05233f]/40" />
        </div>
        <div className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem]">
              {resolveLocalized(data.heroH1, fb.heroH1, locale)}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-100">
              {resolveLocalized(data.heroSubtitle, fb.heroSubtitle, locale)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact#contact-form"
                className="rounded-lg bg-amber-400 px-6 py-3 text-sm font-semibold text-[#072b52] transition hover:bg-amber-300"
              >
                {resolveLocalized(data.heroCtaPrimary, fb.heroCtaPrimary, locale)}
              </Link>
              <Link
                href="/contact#contact-form"
                className="rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {resolveLocalized(data.heroCtaSecondary, fb.heroCtaSecondary, locale)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#072b52] py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            {resolveLocalized(data.statsTitle, fb.statsTitle, locale)}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <article
                key={`stat-${index}`}
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
              >
                <p className="text-3xl font-bold text-amber-400">
                  {resolveLocalized(stat.value, fb.stats[index]?.value ?? {}, locale)}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {resolveLocalized(stat.label, fb.stats[index]?.label ?? {}, locale)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          {resolveLocalized(data.whoWeServeTitle, fb.whoWeServeTitle, locale)}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-slate-600">
          {resolveLocalized(data.whoWeServeIntro, fb.whoWeServeIntro, locale)}
        </p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {whoWeServeItems.map((item, index) => (
            <div
              key={`partner-${index}`}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <PartnerIcon />
              <span className="text-sm font-medium leading-relaxed text-slate-700">
                {resolveLocalized(item, fb.whoWeServeItems[index] ?? {}, locale)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            {resolveLocalized(data.whyChooseUsTitle, fb.whyChooseUsTitle, locale)}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyItems.map((item, index) => (
              <article
                key={`why-${index}`}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-semibold text-[#072b52]">
                  {resolveLocalized(
                    item.title,
                    fb.whyChooseUsItems[index]?.title ?? {},
                    locale,
                  )}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {resolveLocalized(
                    item.description,
                    fb.whyChooseUsItems[index]?.description ?? {},
                    locale,
                  )}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          {resolveLocalized(fb.servicesPreviewTitle, fb.servicesPreviewTitle, locale)}
        </h2>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {fb.servicesPreviewItems.map((item) => (
            <li key={item.anchor}>
              <Link
                href={`/services#${item.anchor}`}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-800 shadow-sm transition hover:border-amber-300 hover:bg-amber-50"
              >
                <span className="text-amber-600">→</span>
                {resolveLocalized(item.label, item.label, locale)}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            {resolveLocalized(fb.programsPreviewTitle, fb.programsPreviewTitle, locale)}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fb.programsPreviewItems.map((item) => (
              <article
                key={item.anchor}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="font-semibold text-[#072b52]">
                  {resolveLocalized(item.title, item.title, locale)}
                </h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">
                  {resolveLocalized(item.description, item.description, locale)}
                </p>
                <Link
                  href={`/programs#${item.anchor}`}
                  className="mt-4 inline-flex text-sm font-semibold text-amber-700 hover:text-amber-600"
                >
                  See Program →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
            OUR BRANDS
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-12 md:gap-24">
            <a
              href="https://afdmctravel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer filter grayscale opacity-60 transition-all duration-300 ease-in-out hover:grayscale-0 hover:opacity-100"
            >
              <Image
                src="/images/logo_marca_1.png"
                alt="AF DMC Travel"
                width={200}
                height={64}
                className="h-14 w-auto object-contain sm:h-16"
              />
            </a>
            <a
              href="https://afdigitalsolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer filter grayscale opacity-60 transition-all duration-300 ease-in-out hover:grayscale-0 hover:opacity-100"
            >
              <Image
                src="/images/logo_marca_2.png"
                alt="AF Digital Solutions"
                width={200}
                height={64}
                className="h-14 w-auto object-contain sm:h-16"
              />
            </a>
            <a
              href="https://adventuresfinder.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer filter grayscale opacity-60 transition-all duration-300 ease-in-out hover:grayscale-0 hover:opacity-100"
            >
              <Image
                src="/images/logo_marca_3.png"
                alt="Adventures Finder"
                width={200}
                height={64}
                className="h-14 w-auto object-contain sm:h-16"
              />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#072b52] sm:text-3xl">
            {resolveLocalized(data.ctaBannerTitle, fb.ctaBannerTitle, locale)}
          </h2>
          <p className="mt-4 text-slate-700">
            {resolveLocalized(data.ctaBannerSubtitle, fb.ctaBannerSubtitle, locale)}
          </p>
          <Link
            href="/contact#contact-form"
            className="mt-8 inline-flex rounded-lg bg-[#072b52] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#05233f]"
          >
            {resolveLocalized(data.ctaBannerButtonLabel, fb.ctaBannerButtonLabel, locale)}
          </Link>
          <p className="mt-5 text-sm text-slate-600">
            {contactLabel}{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="font-bold text-[#072b52] underline-offset-2 hover:underline"
            >
              {contactEmail}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
