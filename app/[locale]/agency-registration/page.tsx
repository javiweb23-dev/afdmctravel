import type {Metadata} from "next";
import {AgencyRegistrationForm} from "@/components/site/agency-registration-form";
import {Breadcrumbs} from "@/components/site/breadcrumbs";
import {PageHero} from "@/components/site/page-hero";
import type {AppLocale} from "@/lib/locale";
import {STOCK_IMAGES} from "@/lib/sanity/image";

type PageProps = {params: Promise<{locale: AppLocale}>};

export const metadata: Metadata = {
  title: "Agency Registration | AF DMC Travel",
  description:
    "Register your travel agency as a B2B partner with AF DMC Travel in Punta Cana, Dominican Republic.",
};

export default async function AgencyRegistrationPage({params}: PageProps) {
  await params;

  return (
    <div className="pb-16">
      <PageHero
        imageSrc={STOCK_IMAGES.whiteLabel}
        imageAlt="Agency Registration"
        title="Agency Registration"
        subtitle="Complete the form below to register your agency as a B2B partner with AF DMC Travel."
      />

      <Breadcrumbs />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <AgencyRegistrationForm />
      </section>
    </div>
  );
}
