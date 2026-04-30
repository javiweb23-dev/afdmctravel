import Image from "next/image";

const examples = [
  "Private yacht charters along the Caribbean coast",
  "Sunset catamaran cruises with premium onboard service",
  "Saona Island escapes with private beach setups",
  "Exclusive snorkeling and diving experiences",
  "Helicopter scenic flights over Punta Cana",
  "Chef-led private dining and rum pairing evenings",
];

export default function PrivateExperiencesPage() {
  return (
    <div className="w-full">
      <section className="relative flex min-h-[50vh] w-full items-end px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <Image
          src="https://picsum.photos/seed/lux-private/1920/900"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Luxury Private Experiences in Punta Cana | Adventures Finder DMC
          </h1>
        </div>
      </section>

      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900">Intro</h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Discover exclusive private experiences in Punta Cana designed for travelers seeking
            personalized adventures, comfort and flexibility. From private yacht charters and
            custom excursions to curated island experiences, Adventures Finder DMC creates
            unforgettable moments in the Dominican Republic.
          </p>
        </div>
      </section>

      <section className="w-full border-y border-slate-200 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Main Description</h2>
            <p className="mt-6 leading-relaxed text-slate-600">
              Designed for travelers who want more than traditional group tours, our private
              experiences combine flexibility, privacy, and authentic local insight so every
              moment feels tailored to your pace, interests, and travel style.
            </p>
            <p className="mt-6 leading-relaxed text-slate-600">
              As a local Destination Management Company based in Punta Cana, Adventures Finder DMC
              coordinates logistics, premium partners, and on-the-ground support to deliver
              seamless itineraries from arrival to departure, with responsive hosts who anticipate
              your needs before you ask.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900">Example Experiences</h2>
          <ul className="mt-8 space-y-4 text-lg text-slate-700">
            {examples.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-blue-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
