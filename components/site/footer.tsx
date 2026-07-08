import {getTranslations} from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="max-w-xl space-y-2">
            <p className="text-sm font-medium tracking-wide text-amber-400/90">
              AF DMC Travel · Adventures Finder MICE & DMC Division
            </p>
            <p className="text-sm leading-relaxed text-slate-400">
              Plaza Cueva Taina, Local #B2, Av. Estados Unidos - Bavaro, Dominican Republic
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-slate-500">Tel:</span>{" "}
              <a
                href="tel:+18294216101"
                className="font-medium text-white transition hover:text-amber-300"
              >
                +1 829 421 6101
              </a>
            </p>
            <p>
              <span className="text-slate-500">Email:</span>{" "}
              <a
                href="mailto:director@afdmctravel.com"
                className="font-medium text-white transition hover:text-amber-300"
              >
                director@afdmctravel.com
              </a>
            </p>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} AF DMC Travel. B2B MICE & DMC — Punta Cana, Dominican Republic.
        </p>
        <p className="mt-4 text-center text-xs text-gray-500 transition-colors">
          {t.rich("agencyCredit", {
            link: (chunks) => (
              <a
                href="https://www.afdigitalsolutions.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>
    </footer>
  );
}
