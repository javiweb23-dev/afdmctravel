import Image from "next/image";
import {groq} from "next-sanity";
import {client} from "@/sanity/lib/client";
import {urlFor} from "@/sanity/lib/image";
import {LanguageSwitcher} from "@/components/site/language-switcher";

type LocaleKey = "en" | "es" | "fr-CA";
type PageProps = {params: Promise<{locale: LocaleKey}>};
type LocalizedValue = {en?: string; es?: string; fr_CA?: string};
type HomeContent = {
  headerMenu?: LocalizedValue[];
  headerButton?: LocalizedValue;
  heroTitle?: LocalizedValue;
  heroSubtitle?: LocalizedValue;
  heroBody?: LocalizedValue;
  heroCtaPrimary?: LocalizedValue;
  heroCtaSecondary?: LocalizedValue;
  heroContact?: LocalizedValue;
  heroImage?: unknown;
  stats?: {label?: LocalizedValue; value?: LocalizedValue}[];
  whoWeServeTitle?: LocalizedValue;
  whoWeServeItems?: LocalizedValue[];
  servicesTitle?: LocalizedValue;
  services?: {title?: LocalizedValue; description?: LocalizedValue; icon?: unknown; image?: unknown}[];
  whiteLabelTitle?: LocalizedValue;
  whiteLabelBody?: LocalizedValue;
  whiteLabelItems?: LocalizedValue[];
  whiteLabelImage?: unknown;
  sampleProgramsTitle?: LocalizedValue;
  samplePrograms?: {title?: LocalizedValue; description?: LocalizedValue; bullets?: LocalizedValue[]; image?: unknown}[];
  whyPartnerTitle?: LocalizedValue;
  whyPartnerItems?: LocalizedValue[];
  whyPartnerGallery?: unknown[];
  leadTitle?: LocalizedValue;
  leadSubtitle?: LocalizedValue;
  submitLabel?: LocalizedValue;
  companyTypeOptions?: LocalizedValue[];
  eventTypeOptions?: LocalizedValue[];
  serviceOptions?: LocalizedValue[];
  budgetOptions?: LocalizedValue[];
  faqsTitle?: LocalizedValue;
  faqs?: {question?: LocalizedValue; answer?: LocalizedValue}[];
};

const query = groq`*[_type == "b2bLandingPage"][0]{
  headerMenu, headerButton, heroTitle, heroSubtitle, heroBody, heroCtaPrimary, heroCtaSecondary, heroContact, heroImage,
  stats, whoWeServeTitle, whoWeServeItems,
  servicesTitle, services,
  whiteLabelTitle, whiteLabelBody, whiteLabelItems, whiteLabelImage,
  sampleProgramsTitle, samplePrograms,
  whyPartnerTitle, whyPartnerItems, whyPartnerGallery,
  leadTitle, leadSubtitle, submitLabel, companyTypeOptions, eventTypeOptions, serviceOptions, budgetOptions,
  faqsTitle, faqs
}`;

const fieldLabels = {
  en: {
    name: "Name",
    company: "Company",
    email: "Email",
    phone: "Phone / WhatsApp",
    country: "Country",
    companyType: "Company type",
    eventType: "Event type",
    guests: "Group Size",
    dates: "Event dates",
    destination: "Destination / hotel selected?",
    services: "Services needed",
    budget: "Budget range",
    whiteLabel: "Do you need white-label support?",
    upload: "Upload RFP or brief",
    message: "Message",
  },
  es: {
    name: "Nombre",
    company: "Empresa",
    email: "Correo",
    phone: "Telefono / WhatsApp",
    country: "Pais",
    companyType: "Tipo de empresa",
    eventType: "Tipo de evento",
    guests: "Tamano del grupo",
    dates: "Fechas del evento",
    destination: "Destino / hotel seleccionado?",
    services: "Servicios requeridos",
    budget: "Rango de presupuesto",
    whiteLabel: "Necesitas soporte white-label?",
    upload: "Subir RFP o brief",
    message: "Mensaje",
  },
  "fr-CA": {
    name: "Nom",
    company: "Entreprise",
    email: "Courriel",
    phone: "Telephone / WhatsApp",
    country: "Pays",
    companyType: "Type d entreprise",
    eventType: "Type d evenement",
    guests: "Taille du groupe",
    dates: "Dates de l evenement",
    destination: "Destination / hotel selectionne?",
    services: "Services necessaires",
    budget: "Plage budgetaire",
    whiteLabel: "Avez-vous besoin de support white-label?",
    upload: "Telecharger RFP ou brief",
    message: "Message",
  },
} as const;

function PartnerIcon({index}: {index: number}) {
  const common = "size-5 text-cyan-700";
  if (index === 0) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}><path d="M3 18h18"/><path d="M6 18v-9l6-4 6 4v9"/><path d="M10 11h4"/><path d="M10 14h4"/></svg>;
  if (index === 1) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}><path d="M4 19V7h16v12"/><path d="M4 11h16"/><path d="M8 7V5h8v2"/></svg>;
  if (index === 2) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}><path d="m3 13 7-10 4 7 7 1-9 10-3-6z"/></svg>;
  if (index === 3) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3 11h18"/></svg>;
  if (index === 4) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}><path d="M4 8h16"/><path d="M4 12h16"/><path d="M4 16h10"/><path d="M3 5h18v14H3z"/></svg>;
  if (index === 5) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}><path d="M4 18h16"/><path d="M5 18V8a7 7 0 0 1 14 0v10"/><path d="M8 18v-4h8v4"/></svg>;
  if (index === 6) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}><path d="M5 19h14"/><path d="M7 19V9l5-4 5 4v10"/><path d="M9 13h6"/></svg>;
  if (index === 7) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}><path d="M3 8h18"/><path d="M6 8V5h12v3"/><path d="M4 8v11h16V8"/><path d="M9 13h6"/></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}><circle cx="12" cy="8" r="3"/><path d="M5 19a7 7 0 0 1 14 0"/><path d="M3 13h2"/><path d="M19 13h2"/></svg>;
}

function pickLocalized(value: LocalizedValue | undefined, locale: LocaleKey) {
  if (!value) return "";
  if (locale === "fr-CA") return value.fr_CA || value.en || value.es || "";
  return value[locale] || value.en || value.es || value.fr_CA || "";
}

function resolveImage(image: unknown) {
  if (!image) return "";
  try {
    return urlFor(image).width(1600).quality(80).url();
  } catch {
    return "";
  }
}

export default async function HomePage({params}: PageProps) {
  const {locale} = await params;
  const labels = fieldLabels[locale];
  let data: HomeContent = {};
  try {
    data = (await client.fetch<HomeContent>(query)) || {};
  } catch {
    data = {};
  }
  const content = data;
  const heroImage = resolveImage(content?.heroImage);

  return (
    <div className="min-h-screen scroll-smooth bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-[#072b52] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="text-sm font-bold leading-tight">ADVENTURES FINDER</div>
            <div className="h-7 w-px bg-white/30" />
            <div className="text-sm font-semibold">AF DMC</div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
            {(content.headerMenu ?? []).map((item, index) => (
              <a
                key={`menu-${index}`}
                href={index === 1 ? "https://adventuresfinder.com/" : index === 2 ? "https://adventuresfinder.com/transfers/" : index === 5 ? "#lead" : index === 0 ? `/${locale}` : `/${locale}#services`}
                className="transition hover:text-cyan-200"
              >
                {pickLocalized(item, locale)}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <a href={`/${locale}#lead`} className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#072b52] transition hover:bg-slate-100">
              {pickLocalized(content.headerButton, locale)}
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        {heroImage ? (
          <div className="absolute inset-0">
            <Image src={heroImage} alt={pickLocalized(content.heroTitle, locale)} fill priority className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#05233f]/90 via-[#05233f]/75 to-[#05233f]/35" />
          </div>
        ) : null}
        <div className="relative mx-auto grid min-h-[76vh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{pickLocalized(content.heroTitle, locale)}</h1>
            <p className="mt-5 text-lg text-slate-100">{pickLocalized(content.heroSubtitle, locale)}</p>
            <p className="mt-4 text-base text-slate-200">{pickLocalized(content.heroBody, locale)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`/${locale}#lead`} className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#072b52]">{pickLocalized(content.heroCtaPrimary, locale)}</a>
              <a href="mailto:commercial@adventuresfinder.com" className="rounded-md border border-white/50 px-5 py-3 text-sm font-semibold text-white">{pickLocalized(content.heroCtaSecondary, locale)}</a>
            </div>
            <p className="mt-5 text-sm text-slate-200">{pickLocalized(content.heroContact, locale)}</p>
          </div>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-14 grid max-w-7xl gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {(content.stats ?? []).map((stat, index) => (
          <article key={`stat-${index}`} className="rounded-xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/10">
            <p className="text-sm font-semibold text-cyan-700">{pickLocalized(stat.value, locale)}</p>
            <p className="mt-2 text-sm text-slate-600">{pickLocalized(stat.label, locale)}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold">{pickLocalized(content.whoWeServeTitle, locale)}</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(content.whoWeServeItems ?? []).map((item, index) => (
            <div key={`partner-${index}`} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm">
              <PartnerIcon index={index} />
              <span>{pickLocalized(item, locale)}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold">{pickLocalized(content.servicesTitle, locale)}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(content.services ?? []).map((service, index) => {
            const serviceImage = resolveImage(service.image);
            const serviceIcon = resolveImage(service.icon);
            return (
            <article key={`service-${index}`} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              {serviceImage ? (
                <div className="relative aspect-[16/10]">
                  <Image src={serviceImage} alt={pickLocalized(service.title, locale)} fill className="object-cover" sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" />
                </div>
              ) : null}
              <div className="p-4">
                {serviceIcon ? (
                  <div className="mb-3 inline-flex rounded-lg bg-cyan-50 p-2">
                    <Image src={serviceIcon} alt={pickLocalized(service.title, locale)} width={20} height={20} className="size-5 object-contain" />
                  </div>
                ) : null}
                <h3 className="text-base font-semibold">{pickLocalized(service.title, locale)}</h3>
                <p className="mt-2 text-sm text-slate-600">{pickLocalized(service.description, locale)}</p>
              </div>
            </article>
          );
          })}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{pickLocalized(content.whiteLabelTitle, locale)}</h2>
            <p className="mt-4 text-sm text-slate-700">{pickLocalized(content.whiteLabelBody, locale)}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {(content.whiteLabelItems ?? []).map((item, index) => (
                <div key={`white-${index}`} className="rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-700">
                  {pickLocalized(item, locale)}
                </div>
              ))}
            </div>
          </div>
          {resolveImage(content.whiteLabelImage) ? (
            <div className="relative min-h-48 overflow-hidden rounded-xl">
              <Image src={resolveImage(content.whiteLabelImage)} alt={pickLocalized(content.whiteLabelTitle, locale)} fill className="object-cover" sizes="(min-width:1024px) 40vw, 100vw" />
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold">{pickLocalized(content.sampleProgramsTitle, locale)}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(content.samplePrograms ?? []).map((program, index) => (
            <article key={`program-${index}`} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              {resolveImage(program.image) ? (
                <div className="relative aspect-[4/3]">
                  <Image src={resolveImage(program.image)} alt={pickLocalized(program.title, locale)} fill className="object-cover" sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" />
                </div>
              ) : null}
              <div className="p-4">
                <h3 className="text-base font-semibold">{pickLocalized(program.title, locale)}</h3>
                <p className="mt-2 text-sm text-slate-600">{pickLocalized(program.description, locale)}</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-700">
                  {program.bullets?.map((bullet, bulletIndex) => (
                    <li key={`bullet-${index}-${bulletIndex}`} className="flex items-center gap-2">
                      <span className="text-cyan-700">•</span>
                      <span>{pickLocalized(bullet, locale)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_1.25fr] lg:px-8">
        <div>
          <h2 className="text-3xl font-bold">{pickLocalized(content.whyPartnerTitle, locale)}</h2>
          <ul className="mt-6 space-y-3">
            {(content.whyPartnerItems ?? []).map((item, index) => (
              <li key={`why-${index}`} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="mt-0.5 text-cyan-700">✔</span>
                <span>{pickLocalized(item, locale)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {(content.whyPartnerGallery ?? []).map((image, index) => (
            <div key={`gallery-${index}`} className={`relative overflow-hidden rounded-xl ${index === 0 ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}>
              {resolveImage(image) ? (
                <Image src={resolveImage(image)} alt="Partner showcase" fill className="object-cover" sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"} />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section id="lead" className="bg-[#072b52] py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">{pickLocalized(content.leadTitle, locale)}</h2>
          <p className="mt-3 text-slate-200">{pickLocalized(content.leadSubtitle, locale)}</p>
          <form action="mailto:commercial@adventuresfinder.com" method="post" encType="multipart/form-data" className="mt-8 grid gap-4 rounded-2xl bg-white p-6 text-slate-900 sm:grid-cols-2">
            <label className="text-sm">{labels.name}<input type="text" name="name" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="text-sm">{labels.company}<input type="text" name="company" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="text-sm">{labels.email}<input type="email" name="email" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="text-sm">{labels.phone}<input type="tel" name="phone" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="text-sm">{labels.country}<input type="text" name="country" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="text-sm">{labels.companyType}
              <select name="companyType" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
                {(content.companyTypeOptions ?? []).map((item, index) => <option key={`company-${index}`} value={pickLocalized(item, locale)}>{pickLocalized(item, locale)}</option>)}
              </select>
            </label>
            <label className="text-sm sm:col-span-2">{labels.eventType}
              <select name="eventType" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
                {(content.eventTypeOptions ?? []).map((item, index) => <option key={`event-${index}`} value={pickLocalized(item, locale)}>{pickLocalized(item, locale)}</option>)}
              </select>
            </label>
            <label className="text-sm">{labels.guests}<input type="number" min={1} name="groupSize" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="text-sm">{labels.dates}<input type="text" name="eventDates" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="text-sm sm:col-span-2">{labels.destination}<input type="text" name="destinationOrHotel" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <fieldset className="text-sm sm:col-span-2">
              <legend>{labels.services}</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {(content.serviceOptions ?? []).map((item, index) => (
                  <label key={`service-option-${index}`} className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2">
                    <input type="checkbox" name="servicesNeeded" value={pickLocalized(item, locale)} className="size-4" />
                    <span>{pickLocalized(item, locale)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="text-sm">{labels.budget}
              <select name="budgetRange" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
                {(content.budgetOptions ?? []).map((item, index) => <option key={`budget-${index}`} value={pickLocalized(item, locale)}>{pickLocalized(item, locale)}</option>)}
              </select>
            </label>
            <label className="text-sm">{labels.whiteLabel}
              <select name="whiteLabelSupport" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
                <option value={locale === "en" ? "Yes" : locale === "es" ? "Si" : "Oui"}>{locale === "en" ? "Yes" : locale === "es" ? "Si" : "Oui"}</option>
                <option value="No">No</option>
              </select>
            </label>
            <label className="text-sm sm:col-span-2">{labels.upload}<input type="file" name="rfpBrief" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="text-sm sm:col-span-2">{labels.message}<textarea name="message" rows={4} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <button type="submit" className="sm:col-span-2 rounded-md bg-[#072b52] px-4 py-3 text-sm font-semibold text-white">{pickLocalized(content.submitLabel, locale)}</button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold">{pickLocalized(content.faqsTitle, locale)}</h2>
        <div className="mt-8 space-y-3">
          {(content.faqs ?? []).map((faq, index) => (
            <details key={`faq-${index}`} className="rounded-xl border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">{pickLocalized(faq.question, locale)}</summary>
              <p className="mt-3 text-sm text-slate-600">{pickLocalized(faq.answer, locale)}</p>
            </details>
          ))}
        </div>
      </section>
      <footer className="border-t border-slate-800 bg-slate-950 py-10 text-slate-200">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 text-center text-base sm:px-6 lg:grid-cols-2 lg:px-8 lg:text-left">
          <div className="leading-relaxed">Plaza Cueva Taina, Local #B2, Av. Estados Unidos - Bavaro, Dominican Republic</div>
          <div className="space-y-2">
            <div className="font-medium text-white">+1 829 421 6101</div>
            <a href="mailto:commercial@adventuresfinder.com" className="block text-slate-200 underline-offset-4 hover:text-white hover:underline">commercial@adventuresfinder.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
