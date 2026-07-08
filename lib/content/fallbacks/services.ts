import {toLocalized} from "@/lib/locale";
import {STOCK_IMAGES} from "@/lib/sanity/image";

export const servicesSeoFallback = {
  metaTitle: toLocalized(
    "MICE Services Punta Cana | Group Transportation, Events & DMC",
  ),
  metaDescription: toLocalized(
    "Group transportation, hotel sourcing, team building, incentive programs, gala events & on-site DMC support in Punta Cana. B2B services for MICE agencies and corporate buyers.",
  ),
};

export const servicesContentFallback = {
  h1: toLocalized(
    "MICE & DMC Ground Services in Punta Cana — Full-Spectrum Group Management",
  ),
  introduction: toLocalized(
    "Every service listed below is delivered locally by our team in Punta Cana. When you work with AF DMC Travel, you are not outsourcing to a call center or a remote coordinator — you are activating a professional team that is physically present, locally connected, and accountable to your program.",
  ),
  footerCtaText: toLocalized(
    "Need a Proposal for Your Group? Submit your RFP at afdmctravel.com/contact — response within 48 hours.",
  ),
  services: [
    {
      id: "transportation",
      title: toLocalized(
        "Group Transportation & Airport Logistics in Punta Cana",
      ),
      description: toLocalized(
        "The first and last impression of any group program is transportation. We manage the entire journey from wheels-down to hotel check-in — and back again.",
      ),
      icon: "bus",
      stockImage: STOCK_IMAGES.serviceTransport,
      alt: toLocalized(
        "Group transportation and airport logistics for MICE programs in Punta Cana",
      ),
      bullets: [
        toLocalized(
          "Private and semi-private airport transfers (all vehicle classes)",
        ),
        toLocalized(
          "Meet-and-greet service at PUJ International Airport",
        ),
        toLocalized(
          "Flight monitoring and real-time adjustment for delays",
        ),
        toLocalized(
          "Motor coaches, minibuses, and VIP sprinter vans",
        ),
        toLocalized(
          "Branded vehicle coordination with your agency or client logo",
        ),
        toLocalized(
          "Inter-hotel transfers and daily shuttle programming",
        ),
        toLocalized("24/7 dispatch and on-call driver coordination"),
      ],
    },
    {
      id: "hotel-sourcing",
      title: toLocalized(
        "Hotel Sourcing & Room Block Coordination for Groups — Dominican Republic",
      ),
      description: toLocalized(
        "Punta Cana's hotel landscape is vast and complex. We navigate it on your behalf with established relationships that translate into rate advantages, room block flexibility, and on-property priority.",
      ),
      icon: "hotel",
      stockImage: STOCK_IMAGES.serviceHotel,
      alt: toLocalized(
        "Hotel sourcing and room block coordination for groups in Punta Cana Dominican Republic",
      ),
      bullets: [
        toLocalized(
          "RFP distribution and rate negotiation across all resort tiers",
        ),
        toLocalized("Room blocking and rooming list management"),
        toLocalized(
          "Group F&B planning: welcome dinners, themed evenings, buffets, BBQs",
        ),
        toLocalized(
          "Meeting room and conference space coordination",
        ),
        toLocalized("Amenity and VIP gift pre-placement"),
        toLocalized(
          "On-property liaison and group check-in management",
        ),
        toLocalized(
          "Suite and upgrade allocation for executives or top performers",
        ),
      ],
    },
    {
      id: "team-building",
      title: toLocalized(
        "Corporate Team Building Activities in Punta Cana",
      ),
      description: toLocalized(
        "We design and deliver team-building experiences that go beyond the generic. Every activity is adapted to your group size, culture, objectives, and budget.",
      ),
      icon: "users",
      stockImage: STOCK_IMAGES.serviceTeam,
      alt: toLocalized(
        "Corporate team building activities for groups in Punta Cana",
      ),
      bullets: [
        toLocalized(
          "Adventure challenges: beach olympics, treasure hunts, sailing competitions",
        ),
        toLocalized(
          "Cultural immersion: Dominican cooking classes, merengue workshops, craft sessions",
        ),
        toLocalized(
          "CSR experiences: community builds, beach clean-ups, local school visits",
        ),
        toLocalized(
          "Competitive formats: Amazing Race-style programs across the destination",
        ),
        toLocalized(
          "Leadership workshops integrated with outdoor scenarios",
        ),
        toLocalized(
          "Full facilitation, materials, and prize coordination included",
        ),
      ],
    },
    {
      id: "incentive-travel",
      title: toLocalized(
        "Incentive Travel Program Management — Punta Cana, Dominican Republic",
      ),
      description: toLocalized(
        "We understand incentive travel. Every touchpoint is a moment to reinforce the value of earning this reward. Our job is to make your top performers feel exactly that — top.",
      ),
      icon: "trophy",
      stockImage: STOCK_IMAGES.serviceIncentive,
      alt: toLocalized(
        "Incentive travel program management in Punta Cana Dominican Republic",
      ),
      bullets: [
        toLocalized(
          "Full program design from arrival to departure",
        ),
        toLocalized(
          "Exclusive venue buyouts: private beach clubs, catamaran dinners, island excursions",
        ),
        toLocalized(
          "Personalized itinerary booklets and welcome kits",
        ),
        toLocalized("VIP airport lounge coordination"),
        toLocalized("Dedicated on-site program director"),
        toLocalized(
          "Real-time communication and group management app support",
        ),
        toLocalized("Photography and videography coordination"),
      ],
    },
    {
      id: "events",
      title: toLocalized(
        "Corporate Events & Gala Dinners in Punta Cana (Up to 7,000 Guests)",
      ),
      description: toLocalized(
        "From board-level corporate dinners to large-scale gala evenings, we produce events with local flair and international production standards.",
      ),
      icon: "party-popper",
      stockImage: STOCK_IMAGES.serviceEvents,
      alt: toLocalized(
        "Corporate events and gala dinners for large groups in Punta Cana",
      ),
      bullets: [
        toLocalized(
          "Gala dinners and awards ceremonies (up to 7,000 guests)",
        ),
        toLocalized("Welcome receptions and farewell events"),
        toLocalized(
          "Themed evenings: Caribbean Night, White Party, Tropical Gala",
        ),
        toLocalized(
          "Product launches and brand activations in destination",
        ),
        toLocalized(
          "Entertainment: live bands, DJs, fire shows, cultural performers",
        ),
        toLocalized(
          "Full AV, staging, lighting, and decor sourcing and coordination",
        ),
      ],
    },
    {
      id: "tours",
      title: toLocalized(
        "Private Tours & Exclusive Destination Experiences — Punta Cana Groups",
      ),
      description: toLocalized(
        "Beyond the resort gates, Punta Cana offers extraordinary experiences that most groups never discover. We create access to places and moments your competitors cannot replicate.",
      ),
      icon: "map",
      stockImage: STOCK_IMAGES.serviceTours,
      alt: toLocalized(
        "Private tours and exclusive destination experiences for Punta Cana groups",
      ),
      bullets: [
        toLocalized(
          "Catamaran and sailing excursions to private islands",
        ),
        toLocalized(
          "Saona Island and Catalina Island full-day private charters",
        ),
        toLocalized(
          "Zip-line, buggy, and adventure park buyouts",
        ),
        toLocalized(
          "Whale watching (seasonal — January to March, Samana Bay)",
        ),
        toLocalized(
          "Historical and cultural tours of Santo Domingo (colonial city)",
        ),
        toLocalized(
          "Private beach club access and VIP day-pass coordination",
        ),
        toLocalized(
          "Helicopter tours and aerial photography arrangements",
        ),
      ],
    },
    {
      id: "onsite-support",
      title: toLocalized(
        "On-Site DMC Support & Program Management in the Dominican Republic",
      ),
      description: toLocalized(
        "When your team cannot be on the ground, ours is. We provide full program supervision so nothing is left to chance.",
      ),
      icon: "headset",
      stockImage: STOCK_IMAGES.serviceOnsite,
      alt: toLocalized(
        "On-site DMC support and program management in the Dominican Republic",
      ),
      bullets: [
        toLocalized(
          "Dedicated on-site program manager throughout the program",
        ),
        toLocalized("Daily briefings and supplier check-ins"),
        toLocalized(
          "Real-time problem resolution and contingency management",
        ),
        toLocalized(
          "Group leader communication and scheduling support",
        ),
        toLocalized("Emergency medical and insurance liaison"),
        toLocalized(
          "End-of-program reconciliation and billing support",
        ),
      ],
    },
  ],
};
