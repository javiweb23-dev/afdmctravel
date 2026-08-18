import {GoogleAnalytics} from "@next/third-parties/google";
import {GA_MEASUREMENT_ID} from "@/lib/analytics";
import {
  isPartnerLocale,
  type PartnerLocale,
} from "@/lib/content/partners-landing";
import "../../globals.css";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{lang?: string[]}>;
};

/**
 * Root layout for the standalone partner landing. It sits under the dynamic
 * segment so `lang` can follow the URL: /global-agents is English, /global-agents/es and
 * /global-agents/fr are the translations.
 */
export default async function PartnersLayout({
  children,
  params,
}: LayoutProps) {
  const {lang} = await params;
  const segment = lang?.[0];
  const locale: PartnerLocale =
    segment && isPartnerLocale(segment) ? segment : "en";

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col">{children}</div>
      </body>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
}
