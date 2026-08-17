import type {Metadata} from "next";
import {setRequestLocale} from "next-intl/server";
import Image from "next/image";
import {PageHero} from "@/components/site/page-hero";
import {Breadcrumbs} from "@/components/site/breadcrumbs";
import {
  aboutContentFallback,
  aboutSeoFallback,
} from "@/lib/content/fallbacks";
import type {AppLocale, LocalizedValue} from "@/lib/locale";
import {resolveArray, resolveLocalized} from "@/lib/locale";
import {buildPageMetadata} from "@/lib/sanity/metadata";
import {
  resolveOptionalSanityImage,
  resolveSanityImage,
  STOCK_IMAGES,
} from "@/lib/sanity/image";
import {fetchSanity, aboutPageQuery} from "@/lib/sanity/queries";

type PageProps = {params: Promise<{locale: AppLocale}>};

type AboutPageData = {
  seo?: {metaTitle?: LocalizedValue; metaDescription?: LocalizedValue};
  heroImage?: unknown;
  h1?: LocalizedValue;
  story?: LocalizedValue;
  missionTitle?: LocalizedValue;
  missionPillars?: {title?: LocalizedValue; description?: LocalizedValue}[];
  jeannieSectionTitle?: LocalizedValue;
  jeanniePhoto?: unknown;
  jeanniePhotoAlt?: LocalizedValue;
  jeannieBio?: LocalizedValue;
  jeannieContactProfileTitle?: LocalizedValue;
  jeannieLanguages?: LocalizedValue;
  jeannieSpecialization?: LocalizedValue;
  jeannieBased?: LocalizedValue;
  jeannieEmail?: string;
  jeannieAvailability?: LocalizedValue;
  localExpertiseTitle?: LocalizedValue;
  localExpertiseBullets?: LocalizedValue[];
  operationalCapacityTitle?: LocalizedValue;
  operationalCapacityBullets?: LocalizedValue[];
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const data = await fetchSanity<AboutPageData>(aboutPageQuery);
  return buildPageMetadata(data?.seo, aboutSeoFallback, locale, "/about");
}

export default async function AboutPage({params}: PageProps) {
  const {locale} = await params;
  setRequestLocale(locale);
  const data = (await fetchSanity<AboutPageData>(aboutPageQuery)) ?? {};
  const fb = aboutContentFallback;
  const heroTitle = resolveLocalized(data.h1, fb.h1, locale);
  const heroImage = resolveSanityImage(
    data.heroImage,
    STOCK_IMAGES.pageAbout,
  );

  const missionPillars = resolveArray(data.missionPillars, fb.missionPillars);
  const localBullets = resolveArray(
    data.localExpertiseBullets,
    fb.localExpertiseBullets,
  );
  const capacityBullets = resolveArray(
    data.operationalCapacityBullets,
    fb.operationalCapacityBullets,
  );

  const jeanniePhoto = resolveOptionalSanityImage(data.jeanniePhoto, 600);
  const jeannieAlt = resolveLocalized(
    data.jeanniePhotoAlt,
    fb.jeanniePhotoAlt,
    locale,
  );
  const jeannieEmail = data.jeannieEmail ?? fb.jeannieEmail;

  const profileRows = [
    {
      label: "Languages",
      value: resolveLocalized(
        data.jeannieLanguages,
        fb.jeannieLanguages,
        locale,
      ),
    },
    {
      label: "Specialization",
      value: resolveLocalized(
        data.jeannieSpecialization,
        fb.jeannieSpecialization,
        locale,
      ),
    },
    {
      label: "Based",
      value: resolveLocalized(data.jeannieBased, fb.jeannieBased, locale),
    },
    {
      label: "Email",
      value: jeannieEmail,
      href: `mailto:${jeannieEmail}`,
    },
    {
      label: "Availability",
      value: resolveLocalized(
        data.jeannieAvailability,
        fb.jeannieAvailability,
        locale,
      ),
    },
  ];

  return (
    <div className="pb-16">
      <PageHero
        imageSrc={heroImage}
        imageAlt={heroTitle}
        title={heroTitle}
        subtitle={resolveLocalized(data.story, fb.story, locale)}
      />

      <Breadcrumbs />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#072b52] sm:text-3xl">
          {resolveLocalized(data.missionTitle, fb.missionTitle, locale)}
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {missionPillars.map((pillar, index) => (
            <article
              key={`pillar-${index}`}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-[#072b52]">
                {resolveLocalized(
                  pillar.title,
                  fb.missionPillars[index]?.title ?? {},
                  locale,
                )}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {resolveLocalized(
                  pillar.description,
                  fb.missionPillars[index]?.description ?? {},
                  locale,
                )}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`grid gap-10 lg:items-start ${
              jeanniePhoto ? "lg:grid-cols-[300px_1fr]" : ""
            }`}
          >
            {jeanniePhoto ? (
              <div className="mx-auto lg:mx-0">
                <div className="relative size-[300px] overflow-hidden rounded-full border-4 border-white shadow-xl">
                  <Image
                    src={jeanniePhoto}
                    alt={jeannieAlt}
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
              </div>
            ) : null}
            <div>
              <h2 className="text-2xl font-bold text-[#072b52] sm:text-3xl">
                {resolveLocalized(
                  data.jeannieSectionTitle,
                  fb.jeannieSectionTitle,
                  locale,
                )}
              </h2>
              <p className="mt-4 leading-relaxed text-slate-700">
                {resolveLocalized(data.jeannieBio, fb.jeannieBio, locale)}
              </p>
              <h3 className="mt-8 text-lg font-semibold text-[#072b52]">
                {resolveLocalized(
                  data.jeannieContactProfileTitle,
                  fb.jeannieContactProfileTitle,
                  locale,
                )}
              </h3>
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <dl className="divide-y divide-slate-100">
                  {profileRows.map((row) => (
                    <div
                      key={row.label}
                      className="grid gap-1 px-5 py-4 sm:grid-cols-[140px_1fr]"
                    >
                      <dt className="text-sm font-semibold text-[#072b52]">
                        {row.label}
                      </dt>
                      <dd className="text-sm text-slate-700">
                        {row.href ? (
                          <a
                            href={row.href}
                            className="font-medium hover:underline"
                          >
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#072b52] sm:text-3xl">
          {resolveLocalized(
            data.localExpertiseTitle,
            fb.localExpertiseTitle,
            locale,
          )}
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {localBullets.map((bullet, index) => (
            <li
              key={`local-${index}`}
              className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
            >
              <span className="text-amber-600">•</span>
              {resolveLocalized(
                bullet,
                fb.localExpertiseBullets[index] ?? {},
                locale,
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#072b52] sm:text-3xl">
            {resolveLocalized(
              data.operationalCapacityTitle,
              fb.operationalCapacityTitle,
              locale,
            )}
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {capacityBullets.map((bullet, index) => (
              <li
                key={`capacity-${index}`}
                className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
              >
                <span className="text-amber-600">•</span>
                {resolveLocalized(
                  bullet,
                  fb.operationalCapacityBullets[index] ?? {},
                  locale,
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
