import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {Footer} from "@/components/site/footer";
import {Header} from "@/components/site/header";
import {routing} from "@/i18n/routing";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = routing.defaultLocale;
  const messages = await getMessages({locale});

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
