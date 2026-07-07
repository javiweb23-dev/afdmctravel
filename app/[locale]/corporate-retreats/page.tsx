import Image from "next/image";

type Program = {
  title: string;
  days: {label: string; text: string}[];
};

type PageProps = {
  params: Promise<{locale: "en" | "es" | "fr"}>;
};

const copy = {
  en: {
    title: "Corporate Retreats in Punta Cana | Team Building & Incentive Travel | Adventures Finder DMC",
    introTitle: "Introduction",
    intro1:
      "Punta Cana blends world-class resorts, reliable air connectivity, and a warm Caribbean atmosphere that keeps teams energized and focused. From oceanfront boardrooms to incentive-ready beaches, the destination supports high-impact meetings without sacrificing downtime your executives and top performers expect.",
    intro2:
      "Adventures Finder DMC operates as your on-island partner, translating brand objectives into polished programs with vetted suppliers, transparent run-of-show documentation, and bilingual staffing that protects your timeline, budget, and attendee experience from first arrival to final departure.",
    servicesTitle: "Corporate Retreat Services",
    sampleTitle: "Sample Programs",
    showDays: "Show days",
    hideDays: "Hide days",
  },
  es: {
    title: "Retiros Corporativos en Punta Cana | Team Building y Viajes de Incentivo | Adventures Finder DMC",
    introTitle: "Introduccion",
    intro1:
      "Punta Cana combina resorts de clase mundial, excelente conectividad aerea y una atmosfera caribena que mantiene a los equipos motivados y enfocados. Desde salas frente al mar hasta playas ideales para incentivos, el destino permite reuniones de alto impacto sin sacrificar experiencias memorables.",
    intro2:
      "Adventures Finder DMC actua como tu socio local en destino, transformando objetivos de marca en programas impecables con proveedores verificados, ejecucion detallada y personal bilingue que protege cronograma, presupuesto y experiencia del participante de principio a fin.",
    servicesTitle: "Servicios para Retiros Corporativos",
    sampleTitle: "Programas de Ejemplo",
    showDays: "Ver dias",
    hideDays: "Ocultar dias",
  },
  fr: {
    title: "Retraites Corporatives a Punta Cana | Team Building et Voyages Incentifs | Adventures Finder DMC",
    introTitle: "Introduction",
    intro1:
      "Punta Cana combine des resorts haut de gamme, une excellente connectivite aerienne et une ambiance caribeenne qui garde les equipes motivees et alignees. Des salles face a l ocean aux plages ideales pour l incentive, la destination soutient des rencontres a fort impact.",
    intro2:
      "Adventures Finder DMC agit comme votre partenaire local sur place, transformant vos objectifs de marque en programmes fluides avec des fournisseurs verifies, une execution detaillee et un personnel bilingue qui protege vos delais, votre budget et l experience des participants.",
    servicesTitle: "Services de Retraite Corporative",
    sampleTitle: "Programmes Exemple",
    showDays: "Afficher les jours",
    hideDays: "Masquer les jours",
  },
} as const;

const services = [
  "Retreat strategy, budgeting, and agenda design",
  "Resort and offsite venue sourcing with site inspections",
  "Airport meet-and-greet, transfers, and VIP arrivals",
  "Team building, CSR activities, and curated excursions",
  "Gala dinners, awards nights, and branded experiences",
  "On-site staffing, signage, AV coordination, and contingency planning",
] as const;

const programs: Program[] = [
  {
    title: "Team Collaboration Workshop",
    days: [
      {label: "Day 1", text: "Airport welcome, resort check-in, welcome reception on the beach, and evening networking lounge."},
      {label: "Day 2", text: "Facilitated collaboration labs, breakout strategy sessions, and private group lunch overlooking the ocean."},
      {label: "Day 3", text: "Adventure challenge experience, CSR beach cleanup option, and sunset catamaran with live music."},
      {label: "Day 4", text: "Leadership keynote, action planning workshop, closing gala dinner, and departures with assisted transfers."},
    ],
  },
  {
    title: "Corporate Incentive Program",
    days: [
      {label: "Day 1", text: "VIP arrivals, branded welcome kits, cocktail reception, and optional spa appointments."},
      {label: "Day 2", text: "Recognition breakfast, golf or wellness track choice, and curated evening culinary experience."},
      {label: "Day 3", text: "Saona Island incentive day with private lounge, photographer, and awards presentation on the sand."},
      {label: "Day 4", text: "Leisure morning, luxury retail experience, farewell brunch, and coordinated departures."},
    ],
  },
  {
    title: "Executive Leadership Retreat",
    days: [
      {label: "Day 1", text: "Private transfers, executive suite check-in, intimate welcome dinner with curated wine pairings."},
      {label: "Day 2", text: "Boardroom sessions with AV support, executive coaching blocks, and golf at a premier course."},
      {label: "Day 3", text: "Helicopter island overview, strategic visioning workshop, and chef's table experience."},
      {label: "Day 4", text: "Wellness morning, closing executive briefing, and seamless onward travel arrangements."},
    ],
  },
];

export default async function CorporateRetreatsPage({params}: PageProps) {
  const {locale} = await params;
  const t = copy[locale] ?? copy.en;

  return (
    <div className="w-full">
      <section className="relative flex min-h-[50vh] w-full items-end px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <Image src="https://picsum.photos/seed/corp-hero/1920/900" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-900/30" />
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.35rem] lg:leading-snug">{t.title}</h1>
        </div>
      </section>

      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900">{t.introTitle}</h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">{t.intro1}</p>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">{t.intro2}</p>
        </div>
      </section>

      <section className="w-full border-y border-slate-200 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900">{t.servicesTitle}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s} className="rounded-lg border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-800 shadow-sm">{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">{t.sampleTitle}</h2>
          <div className="space-y-4">
            {programs.map((program) => (
              <details key={program.title} className="group rounded-2xl border border-slate-200 bg-slate-50 shadow-sm open:bg-white open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-lg font-semibold text-slate-900 marker:hidden [&::-webkit-details-marker]:hidden">
                  <span>{program.title}</span>
                  <span className="text-sm font-normal text-blue-600 group-open:hidden">{t.showDays}</span>
                  <span className="hidden text-sm font-normal text-blue-600 group-open:inline">{t.hideDays}</span>
                </summary>
                <div className="space-y-4 border-t border-slate-200 px-6 pb-6 pt-4">
                  {program.days.map((d) => (
                    <div key={d.label} className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
                      <p className="text-sm font-bold uppercase tracking-wide text-blue-700">{d.label}</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.text}</p>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
