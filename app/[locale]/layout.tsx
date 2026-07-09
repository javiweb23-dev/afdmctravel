import {Header} from "@/components/site/header";
import {Footer} from "@/components/site/footer";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";

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
    <NextIntlClientProvider messages={messages}>
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
