import {SITE_URL} from "@/lib/sanity/metadata";

/**
 * JSON-LD is injected as a plain <script> because Next's Metadata API has no
 * field for structured data. Values are serialised objects we control, never
 * user input, so there is nothing to escape beyond the closing-tag guard.
 */
function JsonLd({data}: {data: Record<string, unknown>}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "@id": `${SITE_URL}/#organization`,
        name: "AF DMC Travel",
        alternateName: "Adventures Finder MICE & DMC Division",
        url: SITE_URL,
        logo: `${SITE_URL}/images/afdmctravel.png`,
        description:
          "B2B destination management company in Punta Cana, Dominican Republic, specialising in MICE, incentive travel and corporate groups.",
        email: "director@afdmctravel.com",
        telephone: "+1-829-421-6101",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Plaza Cueva Taina, Local #B2, Av. Estados Unidos",
          addressLocality: "Bavaro",
          addressRegion: "La Altagracia",
          addressCountry: "DO",
        },
        areaServed: {
          "@type": "Place",
          name: "Punta Cana, Dominican Republic",
        },
        availableLanguage: ["English", "Spanish", "French"],
      }}
    />
  );
}

type Faq = {question: string; answer: string};

export function FaqSchema({items}: {items: Faq[]}) {
  const valid = items.filter((item) => item.question && item.answer);
  if (valid.length === 0) return null;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: valid.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {"@type": "Answer", text: item.answer},
        })),
      }}
    />
  );
}
