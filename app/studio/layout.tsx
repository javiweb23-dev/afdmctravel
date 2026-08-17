/**
 * Root layout for the Sanity Studio. The Studio ships its own styling, so this
 * deliberately does not import globals.css.
 */
export const metadata = {
  title: "AF DMC Travel — Studio",
  robots: {index: false, follow: false},
};

export default function StudioLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body style={{margin: 0}}>{children}</body>
    </html>
  );
}
