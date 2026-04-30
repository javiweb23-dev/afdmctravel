import Image from "next/image";
import {PortableText, type PortableTextComponents} from "@portabletext/react";
import type {PortableTextBlock} from "@portabletext/types";
import {hasLocale} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import type {SanityImageSource} from "@sanity/image-url";
import {client} from "@/sanity/lib/client";
import {urlFor} from "@/sanity/lib/image";
import {routing} from "@/i18n/routing";
import {groq} from "next-sanity";

const privateExperienceQuery = groq`
  *[_type == "privateExperience" && slug.current == $slug][0]{
    "title": coalesce(title[$lang], title.en),
    "intro": coalesce(shortDescription[$lang], shortDescription.en),
    "body": coalesce(mainContent[$lang], mainContent.en),
    image,
    _updatedAt
  }
`;

const privateExperienceFallbackQuery = groq`
  *[_type == "privateExperience"] | order(_updatedAt desc)[0]{
    "title": coalesce(title[$lang], title.en),
    "intro": coalesce(shortDescription[$lang], shortDescription.en),
    "body": coalesce(mainContent[$lang], mainContent.en),
    image,
    _updatedAt
  }
`;

type PrivateExperienceDoc = {
  title: string | null;
  intro: string | null;
  body: PortableTextBlock[] | null;
  image: SanityImageSource | null;
  _updatedAt: string;
};

const portableComponents: PortableTextComponents = {
  block: {
    h2: ({children}) => (
      <h2 className="mt-10 text-2xl font-bold text-slate-900">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="mt-8 text-xl font-semibold text-slate-900">{children}</h3>
    ),
    normal: ({children}) => (
      <p className="mt-4 leading-relaxed text-slate-600">{children}</p>
    ),
    blockquote: ({children}) => (
      <blockquote className="mt-6 border-l-4 border-blue-600 pl-4 text-lg italic text-slate-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">{children}</ul>
    ),
    number: ({children}) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-700">{children}</ol>
    ),
  },
  marks: {
    link: ({value, children}) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      return (
        <a href={href} className="font-medium text-blue-600 underline hover:text-blue-500">
          {children}
        </a>
      );
    },
    strong: ({children}) => <strong className="font-semibold text-slate-900">{children}</strong>,
  },
};

type PageProps = {
  params: Promise<{locale: string}>;
};

export default async function PrivateExperiencesPage({params}: PageProps) {
  const {locale: rawLocale} = await params;

  if (!hasLocale(routing.locales, rawLocale)) {
    notFound();
  }

  setRequestLocale(rawLocale);
  const sanityLang = rawLocale === "fr-CA" ? "fr_CA" : rawLocale;

  let doc = await client.fetch<PrivateExperienceDoc | null>(privateExperienceQuery, {
    slug: "private-experiences",
    lang: sanityLang,
  });

  if (!doc?.title && !doc?.intro && !doc?.body?.length) {
    doc = await client.fetch<PrivateExperienceDoc | null>(privateExperienceFallbackQuery, {
      lang: sanityLang,
    });
  }

  if (!doc || (!doc.title && !doc.intro && !doc.body?.length)) {
    notFound();
  }

  const heroSrc = doc.image
    ? urlFor(doc.image).width(1920).height(900).fit("crop").url()
    : "https://picsum.photos/seed/private-exp-fallback/1920/900";

  return (
    <div className="w-full space-y-0">
      <section className="relative -mx-4 aspect-[21/9] min-h-[280px] overflow-hidden sm:-mx-6 lg:-mx-8">
        <Image
          src={heroSrc}
          alt={doc.title ?? ""}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
          <h1 className="max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {doc.title}
          </h1>
        </div>
      </section>

      {doc.intro ? (
        <section className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="text-lg leading-relaxed text-slate-600">{doc.intro}</p>
          </div>
        </section>
      ) : null}

      {doc.body?.length ? (
        <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <PortableText value={doc.body} components={portableComponents} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
