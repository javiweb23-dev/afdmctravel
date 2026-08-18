import type {PartnerLocale} from "./partners-landing";

/**
 * The four agent offers shown above the figures on the landing.
 *
 * Deliberately icon-led rather than photographed: the services section below
 * is already seven photo blocks, and repeating that treatment would make
 * these read as more services instead of as offers. The headline number is
 * the visual anchor here.
 */

export type Offer = {
  /** Key into the icon map in components/site/service-icon.tsx */
  icon: string;
  /** The number or percentage that carries the offer at a glance. */
  badge: string;
  title: string;
  subtitle: string;
  body: string;
  highlight: string;
};

export type OffersCopy = {
  sectionTitle: string;
  sectionIntro: string;
  offers: Offer[];
};

const ICONS = ["bus", "users", "gift", "percent"] as const;
const BADGES = ["1st free", "16th free", "50 AF$", "20–25%"] as const;

export const partnerOffers: Record<PartnerLocale, OffersCopy> = {
  en: {
    sectionTitle: "Exclusive Offers for Agents",
    sectionIntro:
      "Four ways working with us pays you back from the very first booking.",
    offers: [
      {
        icon: ICONS[0],
        badge: BADGES[0],
        title: "First Transfer Booking Free",
        subtitle: "Register with us and start saving",
        body: "Register and your first transfer booking is on us. It is our way of welcoming you and letting you experience our transfer service firsthand.",
        highlight: "Register today and enjoy your first transfer free.",
      },
      {
        icon: ICONS[1],
        badge: BADGES[1],
        title: "Group Rates",
        subtitle: "Bring 15 passengers, the 16th travels free",
        body: "Planning excursions for a family, a wedding party, a corporate group or any special occasion? For every 15 passengers booked, the 16th is free.",
        highlight: "Book 15 passengers and receive the 16th free.",
      },
      {
        icon: ICONS[2],
        badge: BADGES[2],
        title: "AF Dollars Rewards",
        subtitle: "50 AF Dollars with your first 10 excursion passengers",
        body: "When your first 10 passengers purchase excursions, you receive 50 AF Dollars towards future bookings. The more experiences you book, the more value you gain.",
        highlight: "Book 10 excursion passengers. Earn 50 AF Dollars.",
      },
      {
        icon: ICONS[3],
        badge: BADGES[3],
        title: "Agent Commission Boost",
        subtitle: "Earn more with every booking",
        body: "Enhanced commissions of 20–25% on a curated selection of our most in-demand excursions: catamaran cruises, Saona Island escapes, buggies and cultural experiences. Top-selling, easy to convert, with reliable support on the ground.",
        highlight: "Sell more. Earn more. Simple as that.",
      },
    ],
  },

  es: {
    sectionTitle: "Ofertas exclusivas para agentes",
    sectionIntro:
      "Cuatro formas en que trabajar con nosotros le compensa desde la primera reserva.",
    offers: [
      {
        icon: ICONS[0],
        badge: "1º gratis",
        title: "Primer traslado gratis",
        subtitle: "Regístrese y empiece a ahorrar",
        body: "Regístrese y su primera reserva de traslado corre de nuestra cuenta. Es nuestra forma de darle la bienvenida y de que pruebe nuestro servicio de primera mano.",
        highlight: "Regístrese hoy y disfrute su primer traslado gratis.",
      },
      {
        icon: ICONS[1],
        badge: "16º gratis",
        title: "Tarifas de grupo",
        subtitle: "Traiga 15 pasajeros y el 16º viaja gratis",
        body: "¿Organiza excursiones para una familia, una boda, un grupo corporativo o cualquier ocasión especial? Por cada 15 pasajeros reservados, el 16º es gratis.",
        highlight: "Reserve 15 pasajeros y reciba el 16º gratis.",
      },
      {
        icon: ICONS[2],
        badge: "50 AF$",
        title: "Recompensas AF Dollars",
        subtitle: "50 AF Dollars con sus primeros 10 pasajeros de excursión",
        body: "Cuando sus primeros 10 pasajeros compren excursiones, recibirá 50 AF Dollars para futuras reservas. Cuantas más experiencias reserve, más valor obtiene.",
        highlight: "Reserve 10 pasajeros de excursión. Gane 50 AF Dollars.",
      },
      {
        icon: ICONS[3],
        badge: BADGES[3],
        title: "Comisión ampliada para agentes",
        subtitle: "Gane más con cada reserva",
        body: "Comisiones ampliadas del 20–25% en una selección de nuestras excursiones más demandadas: catamaranes, isla Saona, buggies y experiencias culturales. Las más vendidas, fáciles de convertir y con soporte local de confianza.",
        highlight: "Venda más. Gane más. Así de sencillo.",
      },
    ],
  },

  fr: {
    sectionTitle: "Offres exclusives pour les agents",
    sectionIntro:
      "Quatre façons dont travailler avec nous vous rapporte dès la première réservation.",
    offers: [
      {
        icon: ICONS[0],
        badge: "1er offert",
        title: "Premier transfert offert",
        subtitle: "Inscrivez-vous et commencez à économiser",
        body: "Inscrivez-vous et votre première réservation de transfert est pour nous. C’est notre façon de vous accueillir et de vous faire découvrir notre service.",
        highlight: "Inscrivez-vous et profitez de votre premier transfert offert.",
      },
      {
        icon: ICONS[1],
        badge: "16e offert",
        title: "Tarifs de groupe",
        subtitle: "15 passagers réservés, le 16e voyage gratuitement",
        body: "Vous organisez des excursions pour une famille, un mariage, un groupe d’entreprise ou toute autre occasion ? Pour 15 passagers réservés, le 16e est offert.",
        highlight: "Réservez 15 passagers et le 16e est offert.",
      },
      {
        icon: ICONS[2],
        badge: "50 AF$",
        title: "Récompenses AF Dollars",
        subtitle: "50 AF Dollars avec vos 10 premiers passagers d’excursion",
        body: "Lorsque vos 10 premiers passagers achètent des excursions, vous recevez 50 AF Dollars à valoir sur de futures réservations. Plus vous réservez, plus vous gagnez.",
        highlight: "Réservez 10 passagers d’excursion. Gagnez 50 AF Dollars.",
      },
      {
        icon: ICONS[3],
        badge: BADGES[3],
        title: "Commission majorée",
        subtitle: "Gagnez plus à chaque réservation",
        body: "Commissions majorées de 20 à 25 % sur une sélection de nos excursions les plus demandées : croisières en catamaran, île de Saona, buggys et expériences culturelles. Les plus vendues, faciles à convertir, avec un soutien local fiable.",
        highlight: "Vendez plus. Gagnez plus. C’est aussi simple que ça.",
      },
    ],
  },
};
