import {useTranslations} from "next-intl";

type SectionPageProps = {
  titleKey: string;
  descriptionKey: string;
};

export function SectionPage({titleKey, descriptionKey}: SectionPageProps) {
  const t = useTranslations("Sections");

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">{t(titleKey)}</h1>
      <p className="mt-4 text-base text-slate-700">{t(descriptionKey)}</p>
    </section>
  );
}
