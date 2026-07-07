import {toLocalized} from "@/lib/locale";

export const contactSeoFallback = {
  metaTitle: toLocalized(
    "Contact AF DMC Travel — Group RFP Punta Cana | B2B MICE",
  ),
  metaDescription: toLocalized(
    "Submit a group RFP or MICE inquiry to AF DMC Travel, Punta Cana. Response within 48 hours. B2B only — for MICE agencies, incentive houses, and corporate travel buyers.",
  ),
};

export const contactContentFallback = {
  h1: toLocalized(
    "Submit a Group RFP — MICE & DMC Inquiry for Punta Cana, Dominican Republic",
  ),
  introduction: toLocalized(
    "Use the form below to submit a Group RFP or general inquiry. All information is treated as strictly confidential and used solely to prepare your proposal. B2B inquiries only.",
  ),
  formSectionTitle: toLocalized(
    "Group Request Form — B2B Agencies & Corporate Travel Buyers Only",
  ),
  formLabels: {
    fullName: toLocalized("Full Name"),
    agencyCompany: toLocalized("Agency / Company Name"),
    jobTitle: toLocalized("Job Title / Role"),
    email: toLocalized("Email Address"),
    phone: toLocalized("WhatsApp or Phone"),
    country: toLocalized("Country of Origin"),
    groupSize: toLocalized("Estimated Group Size"),
    travelDates: toLocalized("Travel Dates"),
    programType: toLocalized("Program Type"),
    hotelPreference: toLocalized("Hotel Preference"),
    budgetRange: toLocalized("Budget Range (per person, USD)"),
    servicesRequired: toLocalized("Services Required"),
    specialRequirements: toLocalized("Special Requirements"),
    referral: toLocalized("How Did You Find Us?"),
  },
  programTypeOptions: [
    toLocalized("Incentive"),
    toLocalized("Team Building"),
    toLocalized("Conference"),
    toLocalized("Event"),
    toLocalized("Transfer"),
    toLocalized("Other"),
  ],
  hotelPreferenceOptions: [
    toLocalized("All-inclusive"),
    toLocalized("Boutique"),
    toLocalized("Specific property"),
    toLocalized("No preference"),
  ],
  budgetRangeOptions: [
    toLocalized("Under $100"),
    toLocalized("$100–$200"),
    toLocalized("$200–$400"),
    toLocalized("$400+"),
    toLocalized("Prefer not to say"),
  ],
  servicesRequiredOptions: [
    toLocalized("Transport"),
    toLocalized("Hotel"),
    toLocalized("Activities"),
    toLocalized("Events"),
    toLocalized("Tours"),
    toLocalized("On-Site Support"),
  ],
  referralOptions: [
    toLocalized("Referral"),
    toLocalized("Trade show"),
    toLocalized("Search"),
    toLocalized("LinkedIn"),
    toLocalized("Other"),
  ],
  submitButtonLabel: toLocalized("Submit Group RFP"),
  directContactTitle: toLocalized(
    "Direct Contact — Jeannie Flores, Sales Manager, Punta Cana",
  ),
  jeannieEmail: "commercial@adventuresfinder.com",
  jeannieWhatsApp: toLocalized(
    "Available upon first email contact — for confirmed agency partners",
  ),
  jeannieResponseTime: toLocalized(
    "Within 48 business hours for all RFP submissions",
  ),
  jeannieWorkingHours: toLocalized(
    "Monday – Friday, 9:00 AM – 6:00 PM (AST, UTC-4)",
  ),
  jeannieLanguages: toLocalized("English · Spanish · French · Italian"),
  jeannieLocation: toLocalized("Punta Cana, Dominican Republic"),
  faqSectionTitle: toLocalized(
    "Frequently Asked Questions — DMC & MICE Programs in the Dominican Republic",
  ),
  faqs: [
    {
      question: toLocalized(
        "Do you work with consumer clients or individuals?",
      ),
      answer: toLocalized(
        "No. AF DMC Travel is a strictly B2B platform. We do not accept direct bookings from individuals or consumer groups. If you are a traveler looking to book tours or experiences, please visit adventuresfinder.com.",
      ),
    },
    {
      question: toLocalized("What is the minimum group size you accept?"),
      answer: toLocalized(
        "We work with groups from 10 guests upward. There is no formal maximum — we have the capacity and supplier network to manage groups of up to 7,000 guests for large-scale incentive and event programs.",
      ),
    },
    {
      question: toLocalized("How quickly can you turn around a proposal?"),
      answer: toLocalized(
        "For standard RFPs, we aim to deliver a full ground proposal within 48 business hours. For complex or urgent programs, contact Jeannie directly via email to flag the deadline.",
      ),
    },
    {
      question: toLocalized(
        "Do you work on a white-label or confidential basis?",
      ),
      answer: toLocalized(
        "Yes. We regularly operate as an invisible local partner for international agencies. We sign NDAs on request and operate under full confidentiality protocols. Your client will never know we are behind the operation.",
      ),
    },
    {
      question: toLocalized("What destinations do you cover?"),
      answer: toLocalized(
        "Our primary area of expertise is Punta Cana and the eastern Dominican Republic (Bavaro, Cap Cana, Macao, Uvero Alto). For programs requiring operations in Santo Domingo or other parts of the DR, we coordinate with verified in-market partners.",
      ),
    },
    {
      question: toLocalized("What currencies and payment terms do you work in?"),
      answer: toLocalized(
        "We work primarily in USD. Payment terms and deposit structures are agreed upon per program and outlined in the service agreement. We provide itemized invoicing compatible with agency accounting systems.",
      ),
    },
    {
      question: toLocalized("Can you provide references from other agencies?"),
      answer: toLocalized(
        "Yes — upon request and with mutual confidentiality, we can arrange reference calls or share anonymized program case studies with serious agency partners.",
      ),
    },
    {
      question: toLocalized("Do you handle bookings for individual travelers?"),
      answer: toLocalized(
        "No. For individual or consumer bookings, please visit adventuresfinder.com, our consumer-facing brand. AF DMC Travel handles groups only.",
      ),
    },
  ],
};
