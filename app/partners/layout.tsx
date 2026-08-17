import "../globals.css";

/**
 * Root layout for the standalone partner landing page. It lives outside
 * [locale] and is English-only, so `lang` is fixed here.
 */
export default function PartnersLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
