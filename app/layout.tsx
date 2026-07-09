import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AF DMC Travel | B2B MICE & DMC Punta Cana",
  description:
    "AF DMC Travel is your trusted local DMC partner in Punta Cana, Dominican Republic. B2B only — MICE, incentive travel, corporate groups up to 7,000 guests.",
  icons: {
    icon: "/images/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
