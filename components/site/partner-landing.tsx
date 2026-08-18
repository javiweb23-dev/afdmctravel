import Image from "next/image";
import {PartnerLanguageSwitcher} from "@/components/site/partner-language-switcher";
import {PartnerLeadForm} from "@/components/site/partner-lead-form";
import {ServiceIcon} from "@/components/site/service-icon";
import {LOCAL_FALLBACK_IMAGE} from "@/lib/sanity/image";
import {
  partnerLandingCopy,
  STAT_VALUES,
  type PartnerLocale,
} from "@/lib/content/partners-landing";

/** One layout, three locales — see lib/content/partners-landing.ts for copy. */
export function PartnerLanding({locale}: {locale: PartnerLocale}) {
  const copy = partnerLandingCopy[locale];

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
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
              >
                <p className="text-3xl font-bold text-amber-400">{value}</p>
                <p className="mt-2 text-sm text-slate-300">
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
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {copy.services.map((service) => (
            <article
              key={service.icon}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-300 hover:shadow-md"
            >
              <span className="flex size-11 items-center justify-center rounded-lg bg-[#072b52]/10 text-[#072b52]">
                <ServiceIcon name={service.icon} />
              </span>
              <h3 className="mt-5 font-semibold text-[#072b52]">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>
            </article>
          ))}
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
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
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
            © {new Date().getFullYear()}{" "}
            {copy.footerRights}
          </p>
        </div>
      </footer>
    </main>
  );
}
