import {getTranslations, setRequestLocale} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import type {AppLocale} from "@/lib/locale";

type PageProps = {params: Promise<{locale: AppLocale}>};

export default async function ThanksPage({params}: PageProps) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ThanksPage");

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-20">
      <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-lg">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-amber-100 text-2xl text-amber-700">
          ✓
        </div>
        <h1 className="mt-6 text-2xl font-bold text-[#072b52]">{t("title")}</h1>
        <p className="mt-4 text-slate-600">{t("body")}</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-lg bg-[#072b52] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#05233f]"
        >
          {t("backHome")}
        </Link>
      </div>
    </section>
  );
}
