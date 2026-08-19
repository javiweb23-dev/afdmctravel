import {Inter, Poppins} from "next/font/google";
import {GoogleAnalytics} from "@next/third-parties/google";
import {GA_MEASUREMENT_ID} from "@/lib/analytics";
import {
  isPartnerLocale,
  type PartnerLocale,
} from "@/lib/content/partners-landing";
import "../../globals.css";

/**
 * Self-hosted by next/font, so nothing is requested from Google at render
 * time. Poppins carries the headings and the offer figures, Inter carries
 * running text — the contrast between a geometric display face and a neutral
 * reading face is the point.
 *
 * Attached here rather than site-wide: the landing is a standalone piece and
 * the main site keeps its own typography until we decide otherwise.
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{lang?: string[]}>;
};

/**
 * Root layout for the standalone partner landing. It sits under the dynamic
 * segment so `lang` can follow the URL: /global-agents is English, and
 * /global-agents/es and /global-agents/fr are the translations.
 */
export default async function PartnersLayout({children, params}: LayoutProps) {
  const {lang} = await params;
  const segment = lang?.[0];
  const locale: PartnerLocale =
    segment && isPartnerLocale(segment) ? segment : "en";

  return (
    <html
      lang={locale}
      className={`${poppins.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col">{children}</div>
      </body>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
}
