import type {Metadata} from "next";
import {Header} from "@/components/site/header";
import {Footer} from "@/components/site/footer";
import {OrganizationSchema} from "@/components/site/structured-data";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import {SITE_URL} from "@/lib/sanity/metadata";
import "../globals.css";

/**
 * Root layout for the localised site. It owns <html> so `lang` can follow the
 * active locale — the reason there is no single app/layout.tsx above this one.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "AF DMC Travel | B2B MICE & DMC Punta Cana",
  description:
    "AF DMC Travel is your trusted local DMC partner in Punta Cana, Dominican Republic. B2B only — MICE, incentive travel, corporate groups up to 7,000 guests.",
  icons: {
    icon: "/images/icon.png",
  },
};

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          <OrganizationSchema />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
