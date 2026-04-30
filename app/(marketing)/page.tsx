import Image from "next/image";
import Link from "next/link";

const tourCards = [
  {title: "Buggy Adventure", seed: "buggy-pc"},
  {title: "Catamaran Cruise", seed: "catamaran-pc"},
  {title: "Saona Island", seed: "saona-pc"},
  {title: "Zipline", seed: "zipline-pc"},
] as const;

const tripTypes = [
  "Private Vacation",
  "Corporate Retreat",
  "Golf Trip",
  "Group Travel",
] as const;

export default function HomePage() {
  return (
    <div className="w-full">
      <section className="relative flex min-h-[72vh] w-full items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <Image
          src="https://picsum.photos/seed/punta-hero/1920/1080"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-slate-950/55" />
        <div className="relative z-10 mx-auto w-full max-w-4xl text-center text-white">
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Private Experiences & Tours in Punta Cana
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-100 sm:text-xl">
            Custom travel experiences organized by Adventures Finder DMC
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/tours"
              className="rounded-md bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-500"
            >
              Explore Tours
            </Link>
            <Link
              href="/contact"
              className="rounded-md border-2 border-white bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-slate-900"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full border-b border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="https://picsum.photos/seed/private-yacht/1200/900"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Private Experiences</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Private yacht charters, exclusive excursions and customized itineraries.
            </p>
            <Link
              href="/private-experiences"
              className="mt-8 inline-flex rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Private Experiences
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full border-b border-slate-200 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold text-slate-900">Golf Packages</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Golf vacations, tee times & curated activities.
            </p>
            <Link
              href="/golf-packages"
              className="mt-8 inline-flex rounded-md bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              Golf Packages
            </Link>
          </div>
          <div className="relative order-1 aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="w-full border-b border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="https://picsum.photos/seed/corporate-retreat/1200/900"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Corporate Retreats</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Corporate programs, team building activities and incentive travel.
            </p>
            <Link
              href="/corporate-retreats"
              className="mt-8 inline-flex rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Corporate Retreats
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-slate-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-white">Popular Tours</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tourCards.map((card) => (
              <article
                key={card.seed}
                className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 shadow-lg"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={`https://picsum.photos/seed/${card.seed}/800/600`}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              href="/tours"
              className="rounded-md border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-slate-900"
            >
              View All Tours
            </Link>
          </div>
        </div>
      </section>

      <section
        id="plan"
        className="w-full bg-gradient-to-b from-slate-50 to-white px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Plan Your Punta Cana Experience
          </h2>
          <form className="mt-10 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-slate-700">Name</span>
                <input
                  type="text"
                  name="name"
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none ring-blue-500/30 focus:border-blue-500 focus:ring-4"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Email</span>
                <input
                  type="email"
                  name="email"
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none ring-blue-500/30 focus:border-blue-500 focus:ring-4"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Phone</span>
                <input
                  type="tel"
                  name="phone"
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none ring-blue-500/30 focus:border-blue-500 focus:ring-4"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-slate-700">Travel Dates</span>
                <input
                  type="text"
                  name="travelDates"
                  placeholder="e.g. March 10–18, 2026"
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none ring-blue-500/30 focus:border-blue-500 focus:ring-4"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-slate-700">Number of Guests</span>
                <input
                  type="number"
                  name="guests"
                  min={1}
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none ring-blue-500/30 focus:border-blue-500 focus:ring-4"
                />
              </label>
            </div>
            <fieldset>
              <legend className="text-sm font-medium text-slate-700">Trip Type</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {tripTypes.map((label) => (
                  <label
                    key={label}
                    className="flex cursor-pointer items-center gap-3 rounded-md border border-slate-200 px-4 py-3 transition hover:border-blue-400"
                  >
                    <input type="checkbox" name="tripType" value={label} className="size-4 rounded border-slate-300 text-blue-600" />
                    <span className="text-sm text-slate-800">{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-blue-500"
            >
              Start Planning
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
