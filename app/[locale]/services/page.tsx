import type {Metadata} from "next";
import Image from "next/image";
import {Link} from "@/i18n/navigation";
import {PageHero} from "@/components/site/page-hero";
import {ServiceIcon} from "@/components/site/service-icon";
import {
  servicesContentFallback,
  servicesSeoFallback,
} from "@/lib/content/fallbacks";
import type {AppLocale, LocalizedValue} from "@/lib/locale";
import {resolveArray, resolveLocalized} from "@/lib/locale";
import {buildPageMetadata} from "@/lib/sanity/metadata";
import {resolveSanityImage, STOCK_IMAGES} from "@/lib/sanity/image";
import {fetchSanity, servicesPageQuery} from "@/lib/sanity/queries";

type PageProps = {params: Promise<{locale: AppLocale}>};

type ServiceItem = {
  id?: string;
  title?: LocalizedValue;
  description?: LocalizedValue;
  bullets?: LocalizedValue[];
  icon?: string;
  image?: {image?: unknown; alt?: LocalizedValue};
};

type ServicesPageData = {
  seo?: {metaTitle?: LocalizedValue; metaDescription?: LocalizedValue};
  heroImage?: unknown;
  h1?: LocalizedValue;
  introduction?: LocalizedValue;
  footerCtaText?: LocalizedValue;
  services?: ServiceItem[];
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const data = await fetchSanity<ServicesPageData>(servicesPageQuery);
  return buildPageMetadata(data?.seo, servicesSeoFallback, locale);
}

export default async function ServicesPage({params}: PageProps) {
  const {locale} = await params;
  const data = (await fetchSanity<ServicesPageData>(servicesPageQuery)) ?? {};
  const fb = servicesContentFallback;
  const heroTitle = resolveLocalized(data.h1, fb.h1, locale);
  const heroImage = resolveSanityImage(
    data.heroImage,
    STOCK_IMAGES.pageServices,
  );

  const services = resolveArray(data.services, fb.services).map((service, index) => {
    const fallback = fb.services[index] ?? fb.services[0];
    const sanityService = data.services?.[index];
    return {
      id: service.id ?? fallback.id,
      title: resolveLocalized(
        sanityService?.title ?? service.title,
        fallback.title,
        locale,
      ),
      description: resolveLocalized(
        sanityService?.description ?? service.description,
        fallback.description,
        locale,
      ),
      icon: sanityService?.icon ?? service.icon ?? fallback.icon,
      bullets: resolveArray(sanityService?.bullets ?? service.bullets, fallback.bullets).map(
        (bullet, bulletIndex) =>
          resolveLocalized(
            sanityService?.bullets?.[bulletIndex] ?? bullet,
            fallback.bullets[bulletIndex] ?? {},
            locale,
          ),
      ),
      image: resolveSanityImage(
        sanityService?.image?.image,
        fallback.stockImage,
        1200,
      ),
      alt: resolveLocalized(
        sanityService?.image?.alt,
        fallback.alt,
        locale,
      ),
    };
  });

  return (
    <div className="pb-16">
      <PageHero
        imageSrc={heroImage}
        imageAlt={heroTitle}
        title={heroTitle}
        subtitle={resolveLocalized(data.introduction, fb.introduction, locale)}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={`scroll-mt-24 py-16 ${index % 2 === 1 ? "rounded-2xl bg-slate-100 px-6 lg:px-10" : ""}`}
          >
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <div className="mb-4 inline-flex rounded-xl bg-amber-100 p-3 text-[#072b52]">
                  <ServiceIcon name={service.icon} className="size-7" />
                </div>
                <h2 className="text-2xl font-bold text-[#072b52] sm:text-3xl">
                  {service.title}
                </h2>
                {service.description ? (
                  <p className="mt-4 text-base leading-relaxed text-slate-700">
                    {service.description}
                  </p>
                ) : null}
                <ul className="mt-6 space-y-3">
                  {service.bullets.map((bullet, bulletIndex) => (
                    <li
                      key={`${service.id}-bullet-${bulletIndex}`}
                      className="flex items-start gap-3 text-sm leading-relaxed text-slate-700"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-500" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-slate-700">
          {resolveLocalized(data.footerCtaText, fb.footerCtaText, locale)}
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-lg bg-[#072b52] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#05233f]"
        >
          Submit Group RFP
        </Link>
      </section>
    </div>
  );
}
