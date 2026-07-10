import {toLocalized} from "@/lib/locale";

export const programsSeoFallback = {
  metaTitle: toLocalized(
    "Incentive Programs Punta Cana | Corporate Retreat DR | AF DMC",
  ),
  metaDescription: toLocalized(
    "Pre-designed MICE program frameworks for agencies: corporate incentive escapes, executive retreats, team building programs, and white-label DMC support in Punta Cana.",
  ),
};

export const programsContentFallback = {
  h1: toLocalized(
    "Signature MICE & Incentive Programs in Punta Cana — Built for Agencies",
  ),
  introduction: toLocalized(
    "Our Signature Programs are professionally structured program frameworks — built for MICE and incentive contexts — that your agency can customize, co-brand, and present to clients as your own. Each program comes with a full content brief, suggested supplier mix, pricing structure, and timeline guidance.",
  ),
  footerCtaText: toLocalized(
    "Request a Program Brief for Your Next Group",
  ),
  footerCtaEmail: "director@afdmctravel.com",
  programs: [
    {
      id: "incentive-escape",
      title: toLocalized(
        "Corporate Incentive Escape — Punta Cana, Dominican Republic (25–500 Guests)",
      ),
      categoryHighlight: toLocalized(
        "Ideal for: Incentive Houses · Sales Teams · Top Performer Rewards",
      ),
      description: toLocalized(
        "A 4-to-6-night high-impact incentive program for groups of 25–500 that delivers the full DR luxury experience without the complexity of building from scratch.",
      ),
      dataTable: [
        {label: toLocalized("Duration"), value: toLocalized("4–6 nights (customizable)")},
        {label: toLocalized("Group Size"), value: toLocalized("25 to 500 guests")},
        {
          label: toLocalized("Base Hotel Tier"),
          value: toLocalized("5-star all-inclusive resorts in Punta Cana (Bavaro)"),
        },
        {
          label: toLocalized("Included"),
          value: toLocalized(
            "VIP airport arrivals, welcome gala, 2 exclusive excursions, team building half-day, farewell dinner, branded materials, on-site director",
          ),
        },
        {
          label: toLocalized("Optional"),
          value: toLocalized(
            "Spa vouchers, golf, cultural workshop, CSR component, photographer",
          ),
        },
        {label: toLocalized("Languages"), value: toLocalized("EN, ES, FR, or IT")},
      ],
      buttonLabel: toLocalized("See Program"),
    },
    {
      id: "executive-retreat",
      title: toLocalized(
        "Executive Retreat Punta Cana — Private & Confidential Program for C-Suite Groups",
      ),
      categoryHighlight: toLocalized(
        "Ideal for: C-Suite Groups · Board Meetings · Senior Leadership Offsites",
      ),
      description: toLocalized(
        "An intimate, high-confidentiality program for groups of 8–40 executives requiring privacy, exclusivity, and flawless execution.",
      ),
      dataTable: [
        {label: toLocalized("Duration"), value: toLocalized("3–5 nights")},
        {label: toLocalized("Group Size"), value: toLocalized("8 to 40 guests")},
        {
          label: toLocalized("Base Property"),
          value: toLocalized(
            "Private villa compounds, boutique resorts, or exclusive resort wings",
          ),
        },
        {
          label: toLocalized("Included"),
          value: toLocalized(
            "Private airport lounge, dedicated driver fleet, private chef dinners, exclusive catamaran charter, personalized welcome kits, 24/7 concierge",
          ),
        },
        {
          label: toLocalized("Optional"),
          value: toLocalized(
            "Business session facilitation space, photography ban protocols, NDA-aligned supplier coordination",
          ),
        },
        {
          label: toLocalized("Key Feature"),
          value: toLocalized(
            "Strict discretion — no social media exposure unless requested",
          ),
        },
      ],
      buttonLabel: toLocalized("See Program"),
    },
    {
      id: "team-building-program",
      title: toLocalized(
        "Team Building & Celebration Program — Group Events Dominican Republic",
      ),
      categoryHighlight: toLocalized(
        "Ideal for: Annual Conferences · Company Milestones · Department Kickoffs",
      ),
      description: toLocalized(
        "Designed to close a meeting cycle with energy and reward. This program combines a structured activity day with a festive evening event.",
      ),
      dataTable: [
        {label: toLocalized("Duration"), value: toLocalized("2–3 days / nights")},
        {label: toLocalized("Group Size"), value: toLocalized("30 to 1,500 guests")},
        {
          label: toLocalized("Day 1"),
          value: toLocalized(
            "Group arrival, resort check-in, welcome mixer or beach reception",
          ),
        },
        {
          label: toLocalized("Day 2"),
          value: toLocalized(
            "Morning team building activity, afternoon free time, evening gala dinner with entertainment",
          ),
        },
        {
          label: toLocalized("Day 3"),
          value: toLocalized("Leisure excursion or departure transfers"),
        },
        {
          label: toLocalized("Included"),
          value: toLocalized(
            "Transportation, activity facilitation, gala production, entertainment, branded materials, on-site coordinator",
          ),
        },
      ],
      buttonLabel: toLocalized("See Program"),
    },
    {
      id: "white-label-program",
      title: toLocalized(
        "White-Label DMC Support Program — Local Ground Partner for Caribbean Programs",
      ),
      categoryHighlight: toLocalized(
        "Ideal for: International DMCs · Agencies Expanding to the DR · New Market Entry",
      ),
      description: toLocalized(
        "If your agency receives RFPs for the Dominican Republic but lacks local infrastructure, this program gives you instant ground capacity — under your brand, managed by our team.",
      ),
      dataTable: [
        {
          label: toLocalized("What We Provide"),
          value: toLocalized(
            "Full ground operations: transportation, hotel liaison, supplier contracting, on-site staff, billing support",
          ),
        },
        {
          label: toLocalized("What You Provide"),
          value: toLocalized(
            "Client relationship, program brief, pricing to end client",
          ),
        },
        {
          label: toLocalized("Branding"),
          value: toLocalized(
            "100% white-label — all materials and staff represent your agency brand",
          ),
        },
        {
          label: toLocalized("Confidentiality"),
          value: toLocalized(
            "We sign NDAs on request. Your client will never know we are behind the operation",
          ),
        },
        {
          label: toLocalized("Pricing Model"),
          value: toLocalized(
            "Net rates to your agency. You set your margin.",
          ),
        },
      ],
      buttonLabel: toLocalized("See Program"),
    },
  ],
};
