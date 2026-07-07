import Image from "next/image";

type PageProps = {
  params: Promise<{locale: "en" | "es" | "fr"}>;
};

const content = {
  en: {
    title: "Luxury Private Experiences in Punta Cana | Adventures Finder DMC",
    introTitle: "Introduction",
    intro:
      "Discover exclusive private experiences in Punta Cana designed for travelers seeking personalized adventures, comfort and flexibility. From private yacht charters and custom excursions to curated island experiences, Adventures Finder DMC creates unforgettable moments in the Dominican Republic.",
    mainTitle: "Main Description",
    p1:
      "Designed for travelers who want more than traditional group tours, our private experiences combine flexibility, privacy, and authentic local insight so every moment feels tailored to your pace, interests, and travel style.",
    p2:
      "As a local Destination Management Company based in Punta Cana, Adventures Finder DMC coordinates logistics, premium partners, and on-the-ground support to deliver seamless itineraries from arrival to departure, with responsive hosts who anticipate your needs before you ask.",
    examplesTitle: "Example Experiences",
  },
  es: {
    title: "Experiencias Privadas de Lujo en Punta Cana | Adventures Finder DMC",
    introTitle: "Introduccion",
    intro:
      "Descubre experiencias privadas exclusivas en Punta Cana disenadas para viajeros que buscan aventuras personalizadas, comodidad y flexibilidad. Desde yates privados y excursiones a medida hasta experiencias curadas en islas, Adventures Finder DMC crea momentos inolvidables en Republica Dominicana.",
    mainTitle: "Descripcion Principal",
    p1:
      "Disenadas para viajeros que quieren mas que tours grupales tradicionales, nuestras experiencias privadas combinan flexibilidad, privacidad y conocimiento local autentico para que cada momento se adapte a tu ritmo, intereses y estilo de viaje.",
    p2:
      "Como Destination Management Company local en Punta Cana, Adventures Finder DMC coordina logistica, aliados premium y soporte en destino para entregar itinerarios impecables desde la llegada hasta la salida, con un equipo atento que anticipa tus necesidades.",
    examplesTitle: "Experiencias de Ejemplo",
  },
  fr: {
    title: "Experiences Privees de Luxe a Punta Cana | Adventures Finder DMC",
    introTitle: "Introduction",
    intro:
      "Decouvrez des experiences privees exclusives a Punta Cana, concues pour les voyageurs qui recherchent des aventures personnalisees, du confort et de la flexibilite. Des yachts prives aux excursions sur mesure et experiences insulaires soigneusement planifiees, Adventures Finder DMC cree des moments inoubliables en Republique dominicaine.",
    mainTitle: "Description Principale",
    p1:
      "Concue pour les voyageurs qui veulent plus que des tours de groupe traditionnels, notre offre privee combine flexibilite, intimite et expertise locale afin que chaque moment corresponde a votre rythme, vos interets et votre style de voyage.",
    p2:
      "En tant que Destination Management Company locale basee a Punta Cana, Adventures Finder DMC coordonne la logistique, des partenaires premium et une assistance sur place pour offrir des itineraires fluides de l arrivee au depart.",
    examplesTitle: "Exemples d Experiences",
  },
} as const;

const examples = [
  "Private yacht charters along the Caribbean coast",
  "Sunset catamaran cruises with premium onboard service",
  "Saona Island escapes with private beach setups",
  "Exclusive snorkeling and diving experiences",
  "Helicopter scenic flights over Punta Cana",
  "Chef-led private dining and rum pairing evenings",
] as const;

export default async function PrivateExperiencesPage({params}: PageProps) {
  const {locale} = await params;
  const t = content[locale] ?? content.en;

  return (
    <div className="w-full">
      <section className="relative flex min-h-[50vh] w-full items-end px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <Image src="https://picsum.photos/seed/lux-private/1920/900" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{t.title}</h1>
        </div>
      </section>

      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900">{t.introTitle}</h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">{t.intro}</p>
        </div>
      </section>

      <section className="w-full border-y border-slate-200 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
            <Image src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80" alt="" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{t.mainTitle}</h2>
            <p className="mt-6 leading-relaxed text-slate-600">{t.p1}</p>
            <p className="mt-6 leading-relaxed text-slate-600">{t.p2}</p>
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900">{t.examplesTitle}</h2>
          <ul className="mt-8 space-y-4 text-lg text-slate-700">
            {examples.map((item) => (
              <li key={item} className="flex gap-3"><span className="mt-2 size-2 shrink-0 rounded-full bg-blue-600" /><span>{item}</span></li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
