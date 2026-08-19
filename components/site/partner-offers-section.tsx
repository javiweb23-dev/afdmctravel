import {ServiceIcon} from "@/components/site/service-icon";
import {partnerOffers} from "@/lib/content/partner-offers";
import type {PartnerLocale} from "@/lib/content/partners-landing";

/**
 * The four agent offers, sitting between the form and the figures.
 *
 * The badge — "16th free", "20–25%" — is the point of each card, so it is set
 * large in Poppins and leads the card. Someone scanning only those four
 * figures should already know what is on the table. Running text drops to
 * Inter, and the visible change of face is what separates offer from prose.
 */
export function PartnerOffersSection({locale}: {locale: PartnerLocale}) {
  const copy = partnerOffers[locale];

  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
      <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-[#072b52] sm:text-4xl">
        {copy.sectionTitle}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-slate-600">
        {copy.sectionIntro}
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {copy.offers.map((offer) => (
          <article
            key={offer.title}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-7 shadow-[0_1px_3px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition duration-300 hover:shadow-[0_12px_32px_rgba(7,43,82,0.12)] hover:ring-amber-300 motion-safe:hover:-translate-y-1.5"
          >
            {/* Warm wash behind the figure, so it reads as a highlight rather
                than as another line of text. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-amber-100/60 blur-2xl transition duration-500 group-hover:bg-amber-200/70"
            />

            <div className="relative">
              <span className="flex size-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <ServiceIcon name={offer.icon} className="size-5" />
              </span>

              <p className="mt-4 font-display text-4xl font-extrabold leading-none tracking-tight text-amber-800">
                {offer.badge}
              </p>

              <h3 className="mt-5 font-display text-lg font-bold leading-snug text-[#072b52]">
                {offer.title}
              </h3>
              <p className="mt-2 text-sm font-medium leading-snug text-slate-500">
                {offer.subtitle}
              </p>
            </div>

            <p className="relative mt-5 flex-1 text-sm leading-relaxed text-slate-600">
              {offer.body}
            </p>

            <p className="relative mt-6 border-t border-slate-100 pt-4 font-display text-sm font-bold text-[#072b52]">
              {offer.highlight}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
