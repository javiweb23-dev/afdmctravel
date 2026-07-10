import type {Metadata} from "next";
import {Link} from "@/i18n/navigation";
import {PageHero} from "@/components/site/page-hero";
import {
  programsContentFallback,
  programsSeoFallback,
} from "@/lib/content/fallbacks";
import type {AppLocale, LocalizedValue} from "@/lib/locale";
import {resolveArray, resolveLocalized} from "@/lib/locale";
import {buildPageMetadata} from "@/lib/sanity/metadata";
import {resolveSanityImage, STOCK_IMAGES} from "@/lib/sanity/image";
import {fetchSanity, programsPageQuery} from "@/lib/sanity/queries";

type PageProps = {params: Promise<{locale: AppLocale}>};

type ProgramItem = {
  id?: string;
  title?: LocalizedValue;
  categoryHighlight?: LocalizedValue;
  description?: LocalizedValue;
  dataTable?: {label?: LocalizedValue; value?: LocalizedValue}[];
  buttonLabel?: LocalizedValue;
};

type ProgramsPageData = {
  seo?: {metaTitle?: LocalizedValue; metaDescription?: LocalizedValue};
  heroImage?: unknown;
  h1?: LocalizedValue;
  introduction?: LocalizedValue;
  footerCtaText?: LocalizedValue;
  footerCtaEmail?: string;
  programs?: ProgramItem[];
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const data = await fetchSanity<ProgramsPageData>(programsPageQuery);
  return buildPageMetadata(data?.seo, programsSeoFallback, locale);
}

export default async function ProgramsPage({params}: PageProps) {
  const {locale} = await params;
  const data = (await fetchSanity<ProgramsPageData>(programsPageQuery)) ?? {};
  const fb = programsContentFallback;
  const email = data.footerCtaEmail ?? fb.footerCtaEmail;
  const heroTitle = resolveLocalized(data.h1, fb.h1, locale);
  const heroImage = resolveSanityImage(
    data.heroImage,
    STOCK_IMAGES.pagePrograms,
  );

  const programs = resolveArray(data.programs, fb.programs).map((program, index) => {
    const fallback = fb.programs[index] ?? fb.programs[0];
    const sanityProgram = data.programs?.[index];
    const dataTable = resolveArray(
      sanityProgram?.dataTable ?? program.dataTable,
      fallback.dataTable,
    );

    return {
      id: program.id ?? fallback.id,
      title: resolveLocalized(
        sanityProgram?.title ?? program.title,
        fallback.title,
        locale,
      ),
      categoryHighlight: resolveLocalized(
        sanityProgram?.categoryHighlight ?? program.categoryHighlight,
        fallback.categoryHighlight,
        locale,
      ),
      description: resolveLocalized(
        sanityProgram?.description ?? program.description,
        fallback.description,
        locale,
      ),
      buttonLabel: resolveLocalized(
        sanityProgram?.buttonLabel ?? program.buttonLabel,
        fallback.buttonLabel,
        locale,
      ),
      dataTable: dataTable.map((row, rowIndex) => ({
        label: resolveLocalized(
          sanityProgram?.dataTable?.[rowIndex]?.label ?? row.label,
          fallback.dataTable[rowIndex]?.label ?? {},
          locale,
        ),
        value: resolveLocalized(
          sanityProgram?.dataTable?.[rowIndex]?.value ?? row.value,
          fallback.dataTable[rowIndex]?.value ?? {},
          locale,
        ),
      })),
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
        {programs.map((program, index) => (
          <section
            key={program.id}
            id={program.id}
            className={`scroll-mt-24 py-16 ${index % 2 === 1 ? "rounded-2xl bg-slate-100 px-6 lg:px-10" : ""}`}
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
              {program.categoryHighlight}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-[#072b52] sm:text-3xl">
              {program.title}
            </h2>
            <p className="mt-4 max-w-3xl text-slate-700">{program.description}</p>
            <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <dl className="divide-y divide-slate-100">
                {program.dataTable.map((row, rowIndex) => (
                  <div
                    key={`${program.id}-row-${rowIndex}`}
                    className="grid gap-2 px-5 py-4 sm:grid-cols-[minmax(140px,220px)_1fr]"
                  >
                    <dt className="text-sm font-semibold text-[#072b52]">
                      {row.label}
                    </dt>
                    <dd className="text-sm leading-relaxed text-slate-700">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <Link
              href="/contact#contact-form"
              className="mt-6 inline-flex rounded-lg bg-[#072b52] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#05233f]"
            >
              {program.buttonLabel}
            </Link>
          </section>
        ))}
      </div>

      <section className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-medium text-slate-800">
          {resolveLocalized(data.footerCtaText, fb.footerCtaText, locale)}
        </p>
        <p className="mt-3">
          <a
            href={`mailto:${email}`}
            className="font-semibold text-[#072b52] underline-offset-2 hover:underline"
          >
            {email}
          </a>
          {" · "}
          <Link href="/contact#contact-form" className="font-semibold text-[#072b52] hover:underline">
            afdmctravel.com/contact
          </Link>
        </p>
      </section>
    </div>
  );
}
