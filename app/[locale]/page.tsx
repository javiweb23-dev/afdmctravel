import Image from "next/image";
import {Link} from "@/i18n/navigation";

type PageProps = {
  params: Promise<{locale: "en" | "es" | "fr-CA"}>;
};

const copy = {
  en: {
    heroTitle: "Private Experiences & Tours in Punta Cana",
    heroSubtitle: "Custom travel experiences organized by Adventures Finder DMC",
    exploreTours: "Explore Tours",
    planYourTrip: "Plan Your Trip",
    privateText: "Private yacht charters, exclusive excursions and customized itineraries.",
    golfText: "Golf vacations, tee times & curated activities.",
    corporateText: "Corporate programs, team building activities and incentive travel.",
    privateButton: "Private Experiences",
    golfButton: "Golf Packages",
    corporateButton: "Corporate Retreats",
    popularTours: "Popular Tours",
    viewAll: "View All Tours",
    planTitle: "Plan Your Punta Cana Experience",
    name: "Name",
    email: "Email",
    phone: "Phone",
    dates: "Travel Dates",
    guests: "Number of Guests",
    tripType: "Trip Type",
    startPlanning: "Start Planning",
    tripOptions: ["Private Vacation", "Corporate Retreat", "Golf Trip", "Group Travel"],
  },
  es: {
    heroTitle: "Experiencias Privadas y Tours en Punta Cana",
    heroSubtitle: "Experiencias de viaje personalizadas organizadas por Adventures Finder DMC",
    exploreTours: "Explorar Tours",
    planYourTrip: "Planifica Tu Viaje",
    privateText: "Yates privados, excursiones exclusivas e itinerarios personalizados.",
    golfText: "Vacaciones de golf, horarios de salida y actividades curadas.",
    corporateText: "Programas corporativos, actividades de equipo y viajes de incentivo.",
    privateButton: "Experiencias Privadas",
    golfButton: "Paquetes de Golf",
    corporateButton: "Retiros Corporativos",
    popularTours: "Tours Populares",
    viewAll: "Ver Todos los Tours",
    planTitle: "Planifica Tu Experiencia en Punta Cana",
    name: "Nombre",
    email: "Correo",
    phone: "Telefono",
    dates: "Fechas de Viaje",
    guests: "Numero de Huespedes",
    tripType: "Tipo de Viaje",
    startPlanning: "Comenzar Planificacion",
    tripOptions: ["Vacaciones Privadas", "Retiro Corporativo", "Viaje de Golf", "Viaje Grupal"],
  },
  "fr-CA": {
    heroTitle: "Experiences Privees et Tours a Punta Cana",
    heroSubtitle: "Experiences de voyage sur mesure organisees par Adventures Finder DMC",
    exploreTours: "Explorer les Tours",
    planYourTrip: "Planifier Votre Voyage",
    privateText: "Yachts prives, excursions exclusives et itineraires personnalises.",
    golfText: "Vacances golf, heures de depart et activites soigneusement preparees.",
    corporateText: "Programmes corporatifs, activites d equipe et voyages incitatifs.",
    privateButton: "Experiences Privees",
    golfButton: "Forfaits Golf",
    corporateButton: "Retraites Corporatives",
    popularTours: "Tours Populaires",
    viewAll: "Voir Tous les Tours",
    planTitle: "Planifiez Votre Experience a Punta Cana",
    name: "Nom",
    email: "Courriel",
    phone: "Telephone",
    dates: "Dates de Voyage",
    guests: "Nombre de Voyageurs",
    tripType: "Type de Voyage",
    startPlanning: "Commencer la Planification",
    tripOptions: ["Vacances Privees", "Retraite Corporative", "Voyage Golf", "Voyage de Groupe"],
  },
} as const;

const tourCards = [
  {title: "Buggy Adventure", seed: "buggy-pc"},
  {title: "Catamaran Cruise", seed: "catamaran-pc"},
  {title: "Saona Island", seed: "saona-pc"},
  {title: "Zipline", seed: "zipline-pc"},
] as const;

export default async function HomePage({params}: PageProps) {
  const {locale} = await params;
  const t = copy[locale] ?? copy.en;

  return (
    <div className="w-full">
      <section className="relative flex min-h-[72vh] w-full items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <Image src="https://picsum.photos/seed/punta-hero/1920/1080" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-slate-950/55" />
        <div className="relative z-10 mx-auto w-full max-w-4xl text-center text-white">
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{t.heroTitle}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-100 sm:text-xl">{t.heroSubtitle}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/tours" className="rounded-md bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-500">{t.exploreTours}</Link>
            <Link href="/contact" className="rounded-md border-2 border-white bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-slate-900">{t.planYourTrip}</Link>
          </div>
        </div>
      </section>

      <section className="w-full border-b border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
            <Image src="https://picsum.photos/seed/private-yacht/1200/900" alt="" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">{t.privateButton}</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{t.privateText}</p>
            <Link href="/private-experiences" className="mt-8 inline-flex rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">{t.privateButton}</Link>
          </div>
        </div>
      </section>

      <section className="w-full border-b border-slate-200 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold text-slate-900">{t.golfButton}</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{t.golfText}</p>
            <Link href="/golf-packages" className="mt-8 inline-flex rounded-md bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600">{t.golfButton}</Link>
          </div>
          <div className="relative order-1 aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl lg:order-2">
            <Image src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80" alt="" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="w-full border-b border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
            <Image src="https://picsum.photos/seed/corporate-retreat/1200/900" alt="" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">{t.corporateButton}</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{t.corporateText}</p>
            <Link href="/corporate-retreats" className="mt-8 inline-flex rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">{t.corporateButton}</Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-slate-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-white">{t.popularTours}</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tourCards.map((card) => (
              <article key={card.seed} className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 shadow-lg">
                <div className="relative aspect-[4/3] w-full">
                  <Image src={`https://picsum.photos/seed/${card.seed}/800/600`} alt="" fill className="object-cover" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link href="/tours" className="rounded-md border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-slate-900">{t.viewAll}</Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-gradient-to-b from-slate-50 to-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-slate-900">{t.planTitle}</h2>
          <form className="mt-10 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block sm:col-span-2"><span className="text-sm font-medium text-slate-700">{t.name}</span><input type="text" name="name" className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none ring-blue-500/30 focus:border-blue-500 focus:ring-4" /></label>
              <label className="block"><span className="text-sm font-medium text-slate-700">{t.email}</span><input type="email" name="email" className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none ring-blue-500/30 focus:border-blue-500 focus:ring-4" /></label>
              <label className="block"><span className="text-sm font-medium text-slate-700">{t.phone}</span><input type="tel" name="phone" className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none ring-blue-500/30 focus:border-blue-500 focus:ring-4" /></label>
              <label className="block sm:col-span-2"><span className="text-sm font-medium text-slate-700">{t.dates}</span><input type="text" name="travelDates" className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none ring-blue-500/30 focus:border-blue-500 focus:ring-4" /></label>
              <label className="block sm:col-span-2"><span className="text-sm font-medium text-slate-700">{t.guests}</span><input type="number" name="guests" min={1} className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none ring-blue-500/30 focus:border-blue-500 focus:ring-4" /></label>
            </div>
            <fieldset>
              <legend className="text-sm font-medium text-slate-700">{t.tripType}</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {t.tripOptions.map((label) => (
                  <label key={label} className="flex cursor-pointer items-center gap-3 rounded-md border border-slate-200 px-4 py-3 transition hover:border-blue-400"><input type="checkbox" name="tripType" value={label} className="size-4 rounded border-slate-300 text-blue-600" /><span className="text-sm text-slate-800">{label}</span></label>
                ))}
              </div>
            </fieldset>
            <button type="submit" className="w-full rounded-md bg-blue-600 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-blue-500">{t.startPlanning}</button>
          </form>
        </div>
      </section>
    </div>
  );
}
