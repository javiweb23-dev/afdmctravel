import {ServiceIcon} from "@/components/site/service-icon";
import {partnerOffers} from "@/lib/content/partner-offers";
import type {PartnerLocale} from "@/lib/content/partners-landing";

/**
 * The four agent offers, sitting between the form and the figures.
 *
 * The badge — "16th free", "20–25%" — is the point of each card, so it leads
 * rather than the title. Someone scanning the page should be able to read
 * only the four badges and still know what is on the table.
 */
export function PartnerOffersSection({locale}: {locale: PartnerLocale}) {
  const copy = partnerOffers[locale];

  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
      <h2 className="text-center text-2xl font-bold text-[#072b52] sm:text-3xl">
        {copy.sectionTitle}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-slate-600">
        {copy.sectionIntro}
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {copy.offers.map((offer) => (
          <article
            key={offer.title}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:border-amber-300 hover:shadow-md motion-safe:hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#072b52] text-amber-400">
                <ServiceIcon name={offer.icon} className="size-5" />
              </span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-800">
                {offer.badge}
              </span>
            </div>

            <h3 className="mt-5 text-lg font-bold leading-snug text-[#072b52]">
              {offer.title}
            </h3>
            <p className="mt-1.5 text-sm font-medium text-slate-500">
              {offer.subtitle}
            </p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
              {offer.body}
            </p>
            <p className="mt-5 border-t border-slate-100 pt-4 text-sm font-semibold text-[#072b52]">
              {offer.highlight}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
