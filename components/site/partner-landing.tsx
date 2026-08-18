import Image from "next/image";
import {PartnerLanguageSwitcher} from "@/components/site/partner-language-switcher";
import {PartnerLeadForm} from "@/components/site/partner-lead-form";
import {ServiceIcon} from "@/components/site/service-icon";
import {LOCAL_FALLBACK_IMAGE, resolveOptionalSanityImage} from "@/lib/sanity/image";
import {fetchSanity, partnerServicesQuery} from "@/lib/sanity/queries";
import {pickLocalized, type LocalizedValue} from "@/lib/locale";
import {
  partnerLandingCopy,
  SERVICE_IDS,
  type PartnerLandingCopy,
  STAT_VALUES,
  type PartnerLocale,
} from "@/lib/content/partners-landing";

type SanityService = {
  id?: string;
  title?: LocalizedValue;
  description?: LocalizedValue;
  bullets?: LocalizedValue[];
  icon?: string;
  image?: {image?: unknown; alt?: LocalizedValue};
};

type LandingService = {
  id: string;
  icon: string;
  title: string;
  description: string;
  bullets: string[];
  photo: {url: string; alt: string} | null;
};

/**
 * Reads the same service entries the /services page renders, so the landing
 * shows the full copy verbatim rather than a paraphrase that can drift.
 * The short copy in partners-landing.ts stays as the safety net: if Sanity is
 * unreachable the section still renders, just without the bullet lists.
 */
async function getServices(
  copy: PartnerLandingCopy,
  locale: PartnerLocale,
): Promise<LandingService[]> {
  const data = await fetchSanity<{services?: SanityService[]}>(
    partnerServicesQuery,
  );
  const fromCms = data?.services ?? [];

  return copy.services.map((short, index) => {
    const id = SERVICE_IDS[index];
    const cms = fromCms.find((item) => item?.id === id);
    // 1000px: these span roughly half the content width on desktop, and with
    // Next's optimizer disabled this is the width actually delivered.
    const url = resolveOptionalSanityImage(cms?.image?.image, 1000);
    const title = pickLocalized(cms?.title, locale) || short.title;

    return {
      id,
      icon: cms?.icon || short.icon,
      title,
      description: pickLocalized(cms?.description, locale) || short.description,
      bullets: (cms?.bullets ?? [])
        .map((bullet) => pickLocalized(bullet, locale))
        .filter(Boolean),
      photo: url
        ? {url, alt: pickLocalized(cms?.image?.alt, locale) || title}
        : null,
    };
  });
}

/** One layout, three locales — see lib/content/partners-landing.ts for copy. */
export async function PartnerLanding({locale}: {locale: PartnerLocale}) {
  const copy = partnerLandingCopy[locale];
  const services = await getServices(copy, locale);

  return (
    <main className="flex-1 bg-slate-50 text-slate-900">
      {/* Minimal brand bar — intentionally no site navigation, this page is a
          standalone landing served from partner websites. */}
      <div className="bg-[#072b52]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Image
            src="/images/afdmctravel.png"
            alt="AF DMC Travel"
            width={200}
            height={48}
            priority
            className="h-10 w-auto object-contain sm:h-12"
          />
          <PartnerLanguageSwitcher active={locale} />
        </div>
      </div>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={LOCAL_FALLBACK_IMAGE}
            alt={copy.heroImageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05233f]/92 via-[#05233f]/85 to-[#05233f]/75" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 pb-32 pt-16 text-center sm:px-6 sm:pt-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
            {copy.eyebrow}
          </p>
          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {copy.h1}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-100">
            {copy.heroSubtitle}
          </p>
        </div>
      </section>

      {/* The form is the centrepiece: pulled up over the hero so it is the
          first thing a visitor arriving from a partner site acts on. */}
      <section className="relative z-10 -mt-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <PartnerLeadForm copy={copy.form} locale={locale} />
        </div>
      </section>

      <section className="bg-[#072b52] py-14 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STAT_VALUES.map((value, index) => (
              <div
                key={value}
                className="group rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur transition duration-300 hover:border-amber-400/40 hover:bg-white/10 motion-safe:hover:-translate-y-1"
              >
                <p className="text-3xl font-bold text-amber-400 transition duration-300 motion-safe:group-hover:scale-110">
                  {value}
                </p>
                <p className="mt-2 text-sm text-slate-300 transition group-hover:text-slate-100">
                  {copy.statsLabels[index]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-[#072b52] sm:text-3xl">
          {copy.servicesTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center leading-relaxed text-slate-600">
          {copy.servicesIntro}
        </p>
        <div className="mt-12 space-y-6">
          {services.map((service, index) => {
            // Zig-zag: text leads on even rows, the photo leads on odd ones.
            const photoLeads = index % 2 === 1;

            return (
              <article
                key={service.id}
                className={`rounded-2xl px-4 py-10 sm:px-8 lg:px-10 ${
                  photoLeads ? "bg-slate-100" : "bg-white"
                }`}
              >
                <div
                  className={`grid items-center gap-8 lg:gap-12 ${
                    service.photo ? "lg:grid-cols-2" : ""
                  }`}
                >
                  <div className={photoLeads ? "lg:order-2" : undefined}>
                    <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-amber-100 text-[#072b52]">
                      <ServiceIcon name={service.icon} className="size-6" />
                    </span>
                    <h3 className="text-xl font-bold text-[#072b52] sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-slate-700">
                      {service.description}
                    </p>
                    {service.bullets.length > 0 ? (
                      <ul className="mt-6 space-y-3">
                        {service.bullets.map((bullet, bulletIndex) => (
                          <li
                            key={`${service.id}-${bulletIndex}`}
                            className="flex items-start gap-3 text-sm leading-relaxed text-slate-700"
                          >
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-500" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  {service.photo ? (
                    <div
                      className={`group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-lg ${
                        photoLeads ? "lg:order-1" : undefined
                      }`}
                    >
                      <Image
                        src={service.photo.url}
                        alt={service.photo.alt}
                        fill
                        className="object-cover transition duration-500 motion-safe:group-hover:scale-105"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-[#072b52] sm:text-3xl">
            {copy.reasonsTitle}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {copy.reasons.map((reason) => (
              <article
                key={reason.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:border-amber-300 hover:shadow-md motion-safe:hover:-translate-y-1"
              >
                <h3 className="font-semibold text-[#072b52]">{reason.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#072b52] sm:text-3xl">
            {copy.ctaTitle}
          </h2>
          <p className="mt-4 leading-relaxed text-slate-700">{copy.ctaBody}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            <a
              href="mailto:director@afdmctravel.com"
              className="font-bold text-[#072b52] underline-offset-2 hover:underline"
            >
              director@afdmctravel.com
            </a>
            <a
              href="tel:+18294216101"
              className="font-bold text-[#072b52] underline-offset-2 hover:underline"
            >
              +1 829 421 6101
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950 py-10 text-slate-300">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-medium tracking-wide text-amber-400/90">
            {copy.footerTagline}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {copy.footerAddress}
          </p>
          <p className="mt-6 text-xs text-slate-600">
            © {new Date().getFullYear()} {copy.footerRights}
          </p>
        </div>
      </footer>
    </main>
  );
}
