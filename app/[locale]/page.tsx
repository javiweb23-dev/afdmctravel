import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {client} from "@/sanity/lib/client";
import {groq} from "next-sanity";

type TourCard = {
  _id: string;
  title: string;
  description?: string;
};

const popularToursQuery = groq`
  *[_type == "tour" && isPopular == true] | order(_createdAt desc)[0...4]{
    _id,
    title,
    description
  }
`;

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const tours = await client.fetch<TourCard[]>(popularToursQuery);
  const introCards = [
    {href: "/private-experiences", key: "privateExperiences"},
    {href: "/golf-packages", key: "golfPackages"},
    {href: "/corporate-retreats", key: "corporateRetreats"},
  ];
  const tripTypes = [
    "privateVacation",
    "corporateRetreat",
    "golfTrip",
    "groupTravel",
  ] as const;

  return (
    <div className="space-y-16">
      <section className="rounded-2xl bg-slate-900 px-6 py-16 text-white md:px-10">
        <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
          {t("heroTitle")}
        </h1>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/tours"
            className="rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
          >
            {t("exploreTours")}
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-white px-5 py-3 text-sm font-semibold hover:bg-white hover:text-slate-900"
          >
            {t("planYourTrip")}
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {introCards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-slate-900">{t(card.key)}</h2>
            <p className="mt-3 text-sm text-slate-600">{t(`${card.key}Description`)}</p>
          </Link>
        ))}
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t("toursSectionTitle")}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tours.map((tour) => (
            <article
              key={tour._id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">{tour.title}</h3>
              {tour.description ? (
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                  {tour.description}
                </p>
              ) : null}
              <Link
                href="/tours"
                className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:text-blue-500"
              >
                {t("viewTour")}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-slate-900">{t("planFormTitle")}</h2>
        <form className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder={t("name")}
            className="rounded-md border border-slate-300 px-4 py-3 text-sm"
          />
          <input
            type="email"
            name="email"
            placeholder={t("email")}
            className="rounded-md border border-slate-300 px-4 py-3 text-sm"
          />
          <input
            type="tel"
            name="phone"
            placeholder={t("phone")}
            className="rounded-md border border-slate-300 px-4 py-3 text-sm"
          />
          <input
            type="text"
            name="travelDates"
            placeholder={t("travelDates")}
            className="rounded-md border border-slate-300 px-4 py-3 text-sm"
          />
          <input
            type="number"
            name="guests"
            placeholder={t("numberOfGuests")}
            className="rounded-md border border-slate-300 px-4 py-3 text-sm"
          />
          <select
            name="tripType"
            className="rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-700"
            defaultValue=""
          >
            <option value="" disabled>
              {t("tripType")}
            </option>
            {tripTypes.map((tripType) => (
              <option key={tripType} value={tripType}>
                {t(tripType)}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="md:col-span-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500"
          >
            {t("submit")}
          </button>
        </form>
      </section>
    </div>
  );
}
