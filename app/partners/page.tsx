import type {Metadata} from "next";
import Image from "next/image";
import {PartnerLeadForm} from "@/components/site/partner-lead-form";
import {ServiceIcon} from "@/components/site/service-icon";
import {LOCAL_FALLBACK_IMAGE} from "@/lib/sanity/image";

export const metadata: Metadata = {
  title: "Plan Your Group in Punta Cana | AF DMC Travel",
  description:
    "Ground transportation, hotel sourcing, team building, incentive programmes, gala events and on-site support in Punta Cana. Tell us about your group and our local DMC team replies within 48 hours.",
  // Standalone partner landing page — kept out of search results so it does not
  // compete with the main site. Remove this block to make it indexable.
  robots: {index: false, follow: false},
};

const services = [
  {
    icon: "bus",
    title: "Group Transportation",
    description:
      "Airport meet-and-greet at PUJ, motor coaches, VIP sprinters, flight monitoring and 24/7 dispatch — from wheels-down to hotel check-in.",
  },
  {
    icon: "hotel",
    title: "Hotel Sourcing & Room Blocks",
    description:
      "Rate negotiation across every resort tier, rooming list management, meeting space and on-property group check-in support.",
  },
  {
    icon: "users",
    title: "Team Building",
    description:
      "Beach olympics, treasure hunts, Dominican cooking classes, CSR community builds and Amazing Race-style formats — fully facilitated.",
  },
  {
    icon: "trophy",
    title: "Incentive Programmes",
    description:
      "Private beach club buyouts, catamaran dinners, welcome kits, VIP lounge coordination and a dedicated on-site programme director.",
  },
  {
    icon: "party-popper",
    title: "Events & Gala Dinners",
    description:
      "Awards ceremonies and themed evenings for up to 7,000 guests, with full AV, staging, lighting, décor and live entertainment.",
  },
  {
    icon: "map",
    title: "Private Tours & Experiences",
    description:
      "Saona and Catalina island charters, zip-line and buggy buyouts, Santo Domingo colonial tours and helicopter arrangements.",
  },
  {
    icon: "headset",
    title: "On-Site DMC Support",
    description:
      "A dedicated programme manager on the ground, daily supplier briefings, real-time problem solving and end-of-programme reconciliation.",
  },
] as const;

const stats = [
  {value: "7,000+", label: "Max Guest Capacity"},
  {value: "4", label: "Languages Spoken"},
  {value: "48h", label: "Proposal Response Time"},
  {value: "100%", label: "Local Punta Cana Team"},
] as const;

const reasons = [
  {
    title: "Deep Local Roots",
    description:
      "Born and operated in Punta Cana. Our team knows every hotel, road, supplier and authority that matters for your group's success.",
  },
  {
    title: "Strict Confidentiality",
    description:
      "We work behind the scenes. Your client relationship stays yours — always. No direct marketing to your guests, ever.",
  },
  {
    title: "One Local Point of Contact",
    description:
      "No call centres and no remote coordinators. A named programme manager owns your group from first enquiry to final departure.",
  },
] as const;

export default function PartnersLandingPage() {
  return (
    <main className="flex-1 bg-slate-50 text-slate-900">
      {/* Minimal brand bar — intentionally no navigation, this page is a
          standalone landing served from partner websites. */}
      <div className="bg-[#072b52]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Image
            src="/images/afdmctravel.png"
            alt="AF DMC Travel"
            width={200}
            height={48}
            priority
            className="h-10 w-auto object-contain sm:h-12"
          />
          <a
            href="mailto:director@afdmctravel.com"
            className="hidden text-sm font-medium text-white transition hover:text-amber-300 sm:block"
          >
            director@afdmctravel.com
          </a>
        </div>
      </div>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={LOCAL_FALLBACK_IMAGE}
            alt="Aerial view of the Punta Cana coastline, Dominican Republic"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05233f]/92 via-[#05233f]/85 to-[#05233f]/75" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 pb-32 pt-16 text-center sm:px-6 sm:pt-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
            Punta Cana · Dominican Republic
          </p>
          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Your Local DMC Partner for Groups, Events & Incentives in Punta Cana
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-100">
            Transportation, hotels, team building, gala events and on-site
            coordination — all handled by one professional team on the ground.
            Tell us about your group and we will reply within 48 hours.
          </p>
        </div>
      </section>

      {/* The form is the centrepiece: pulled up over the hero so it is the
          first thing a visitor arriving from a partner site acts on. */}
      <section className="relative z-10 -mt-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <PartnerLeadForm />
        </div>
      </section>

      <section className="bg-[#072b52] py-14 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
              >
                <p className="text-3xl font-bold text-amber-400">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-[#072b52] sm:text-3xl">
          Everything We Handle on the Ground
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center leading-relaxed text-slate-600">
          Every service below is delivered locally by our own team in Punta
          Cana. You are not outsourcing to a remote coordinator — you are
          activating a team that is physically present and accountable to your
          programme.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-300 hover:shadow-md"
            >
              <span className="flex size-11 items-center justify-center rounded-lg bg-[#072b52]/10 text-[#072b52]">
                <ServiceIcon name={service.icon} />
              </span>
              <h3 className="mt-5 font-semibold text-[#072b52]">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-[#072b52] sm:text-3xl">
            Why Groups Choose AF DMC Travel
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => (
              <article
                key={reason.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-semibold text-[#072b52]">{reason.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#072b52] sm:text-3xl">
            Ready When You Are
          </h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            Send us your group details using the form above, or reach our team
            directly — we answer every enquiry within 48 hours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            <a
              href="mailto:director@afdmctravel.com"
              className="font-bold text-[#072b52] underline-offset-2 hover:underline"
            >
              director@afdmctravel.com
            </a>
            <a
              href="tel:+18294216101"
              className="font-bold text-[#072b52] underline-offset-2 hover:underline"
            >
              +1 829 421 6101
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950 py-10 text-slate-300">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-medium tracking-wide text-amber-400/90">
            AF DMC Travel · Adventures Finder MICE &amp; DMC Division
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Plaza Cueva Taina, Local #B2, Av. Estados Unidos — Bavaro, Dominican
            Republic
          </p>
          <p className="mt-6 text-xs text-slate-600">
            © {new Date().getFullYear()}{" "}
            AF DMC Travel. MICE &amp; DMC — Punta Cana, Dominican Republic.
          </p>
        </div>
      </footer>
    </main>
  );
}
