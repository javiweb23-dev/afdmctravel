/**
 * Copy for the standalone partner landing page.
 *
 * Held in code rather than Sanity on purpose: the landing is a fixed asset we
 * hand to partners, not a page the marketing team edits day to day.
 */

export const PARTNER_LOCALES = ["en", "es", "fr"] as const;
export type PartnerLocale = (typeof PARTNER_LOCALES)[number];

/** English lives at the bare /partners; the others take a suffix. */
export function partnersPath(locale: PartnerLocale) {
  return locale === "en" ? "/partners" : `/partners/${locale}`;
}

export function isPartnerLocale(value: string): value is PartnerLocale {
  return (PARTNER_LOCALES as readonly string[]).includes(value);
}

/** Shared across locales — figures, not words. */
export const STAT_VALUES = ["7,000+", "4", "48h", "100%"] as const;

type ServiceCopy = {icon: string; title: string; description: string};
type ReasonCopy = {title: string; description: string};

export type PartnerLandingCopy = {
  languageName: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  heroSubtitle: string;
  heroImageAlt: string;
  form: {
    title: string;
    intro: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    comments: string;
    commentsPlaceholder: string;
    submit: string;
    sending: string;
    privacy: string;
    errorMessage: string;
    successTitle: string;
    successBody: string;
  };
  statsLabels: string[];
  servicesTitle: string;
  servicesIntro: string;
  services: ServiceCopy[];
  reasonsTitle: string;
  reasons: ReasonCopy[];
  ctaTitle: string;
  ctaBody: string;
  footerTagline: string;
  footerAddress: string;
  footerRights: string;
};

export const partnerLandingCopy: Record<PartnerLocale, PartnerLandingCopy> = {
  en: {
    languageName: "English",
    metaTitle: "Plan Your Group in Punta Cana | AF DMC Travel",
    metaDescription:
      "Ground transportation, hotel sourcing, team building, incentive programmes, gala events and on-site support in Punta Cana. Tell us about your group and our local DMC team replies within 48 hours.",
    eyebrow: "Punta Cana · Dominican Republic",
    h1: "Your Local DMC Partner for Groups, Events & Incentives in Punta Cana",
    heroSubtitle:
      "Transportation, hotels, team building, gala events and on-site coordination — all handled by one professional team on the ground. Tell us about your group and we will reply within 48 hours.",
    heroImageAlt: "Aerial view of the Punta Cana coastline, Dominican Republic",
    form: {
      title: "Tell Us About Your Group",
      intro:
        "Share a few details and our Punta Cana team will come back to you within 48 hours with next steps.",
      firstName: "First Name",
      lastName: "Last Name",
      phone: "Phone / WhatsApp",
      email: "Email Address",
      comments: "Comments",
      commentsPlaceholder:
        "Group size, travel dates, type of programme, anything else we should know…",
      submit: "Send My Enquiry",
      sending: "Sending…",
      privacy:
        "Your details are used only to prepare your proposal and are never shared with third parties.",
      errorMessage:
        "We could not send your message. Please try again or write to director@afdmctravel.com.",
      successTitle: "Thank you — your enquiry is on its way",
      successBody:
        "Our team in Punta Cana has received your details and will get back to you within 48 hours. For anything urgent, email us directly at",
    },
    statsLabels: [
      "Max Guest Capacity",
      "Languages Spoken",
      "Proposal Response Time",
      "Local Punta Cana Team",
    ],
    servicesTitle: "Everything We Handle on the Ground",
    servicesIntro:
      "Every service below is delivered locally by our own team in Punta Cana. You are not outsourcing to a remote coordinator — you are activating a team that is physically present and accountable to your programme.",
    services: [
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
    ],
    reasonsTitle: "Why Groups Choose AF DMC Travel",
    reasons: [
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
    ],
    ctaTitle: "Ready When You Are",
    ctaBody:
      "Send us your group details using the form above, or reach our team directly — we answer every enquiry within 48 hours.",
    footerTagline: "AF DMC Travel · Adventures Finder MICE & DMC Division",
    footerAddress:
      "Plaza Cueva Taina, Local #B2, Av. Estados Unidos — Bavaro, Dominican Republic",
    footerRights: "AF DMC Travel. MICE & DMC — Punta Cana, Dominican Republic.",
  },

  es: {
    languageName: "Español",
    metaTitle: "Organice su grupo en Punta Cana | AF DMC Travel",
    metaDescription:
      "Transporte terrestre, hoteles, team building, programas de incentivo, eventos de gala y soporte en destino en Punta Cana. Cuéntenos sobre su grupo y nuestro equipo local responde en 48 horas.",
    eyebrow: "Punta Cana · República Dominicana",
    h1: "Su socio DMC local para grupos, eventos e incentivos en Punta Cana",
    heroSubtitle:
      "Transporte, hoteles, team building, eventos de gala y coordinación en destino — todo gestionado por un único equipo profesional sobre el terreno. Cuéntenos sobre su grupo y le respondemos en 48 horas.",
    heroImageAlt: "Vista aérea de la costa de Punta Cana, República Dominicana",
    form: {
      title: "Cuéntenos sobre su grupo",
      intro:
        "Comparta algunos datos y nuestro equipo en Punta Cana le responderá en 48 horas con los siguientes pasos.",
      firstName: "Nombre",
      lastName: "Apellido",
      phone: "Teléfono / WhatsApp",
      email: "Correo electrónico",
      comments: "Comentarios",
      commentsPlaceholder:
        "Tamaño del grupo, fechas de viaje, tipo de programa, cualquier cosa que debamos saber…",
      submit: "Enviar mi consulta",
      sending: "Enviando…",
      privacy:
        "Sus datos se utilizan únicamente para preparar su propuesta y nunca se comparten con terceros.",
      errorMessage:
        "No pudimos enviar su mensaje. Inténtelo de nuevo o escríbanos a director@afdmctravel.com.",
      successTitle: "Gracias — su consulta está en camino",
      successBody:
        "Nuestro equipo en Punta Cana ha recibido sus datos y le responderá en un plazo de 48 horas. Para cualquier urgencia, escríbanos directamente a",
    },
    statsLabels: [
      "Capacidad máxima de invitados",
      "Idiomas que hablamos",
      "Tiempo de respuesta",
      "Equipo local en Punta Cana",
    ],
    servicesTitle: "Todo lo que gestionamos en destino",
    servicesIntro:
      "Cada servicio de esta lista lo presta nuestro propio equipo en Punta Cana. No está subcontratando a un coordinador remoto: está activando un equipo presente físicamente y responsable de su programa.",
    services: [
      {
        icon: "bus",
        title: "Transporte de grupos",
        description:
          "Recepción en el aeropuerto de PUJ, autobuses, furgonetas VIP, seguimiento de vuelos y despacho 24/7 — desde el aterrizaje hasta el check-in del hotel.",
      },
      {
        icon: "hotel",
        title: "Hoteles y bloqueo de habitaciones",
        description:
          "Negociación de tarifas en todas las categorías de resort, gestión de listas de habitaciones, salas de reunión y apoyo en el check-in grupal.",
      },
      {
        icon: "users",
        title: "Team building",
        description:
          "Olimpiadas de playa, búsquedas del tesoro, clases de cocina dominicana, actividades de RSC y formatos tipo Amazing Race — con facilitación completa.",
      },
      {
        icon: "trophy",
        title: "Programas de incentivo",
        description:
          "Privatización de beach clubs, cenas en catamarán, kits de bienvenida, coordinación de salas VIP y un director de programa dedicado en destino.",
      },
      {
        icon: "party-popper",
        title: "Eventos y cenas de gala",
        description:
          "Ceremonias de premios y noches temáticas para hasta 7.000 invitados, con audiovisuales, escenario, iluminación, decoración y espectáculo en vivo.",
      },
      {
        icon: "map",
        title: "Excursiones privadas",
        description:
          "Chárteres a las islas Saona y Catalina, privatización de tirolinas y buggies, tours coloniales por Santo Domingo y vuelos en helicóptero.",
      },
      {
        icon: "headset",
        title: "Soporte DMC en destino",
        description:
          "Un responsable de programa sobre el terreno, reuniones diarias con proveedores, resolución de incidencias en tiempo real y cierre de cuentas.",
      },
    ],
    reasonsTitle: "Por qué los grupos eligen AF DMC Travel",
    reasons: [
      {
        title: "Raíces locales profundas",
        description:
          "Nacimos y operamos en Punta Cana. Nuestro equipo conoce cada hotel, carretera, proveedor y autoridad que importa para el éxito de su grupo.",
      },
      {
        title: "Confidencialidad estricta",
        description:
          "Trabajamos entre bastidores. La relación con su cliente es suya, siempre. Nunca hacemos marketing directo a sus invitados.",
      },
      {
        title: "Un único interlocutor local",
        description:
          "Sin centros de llamadas ni coordinadores remotos. Un responsable con nombre y apellido lleva su grupo desde la primera consulta hasta la salida.",
      },
    ],
    ctaTitle: "Cuando usted quiera",
    ctaBody:
      "Envíenos los datos de su grupo con el formulario de arriba, o contacte directamente con nuestro equipo — respondemos toda consulta en 48 horas.",
    footerTagline: "AF DMC Travel · División MICE y DMC de Adventures Finder",
    footerAddress:
      "Plaza Cueva Taina, Local #B2, Av. Estados Unidos — Bávaro, República Dominicana",
    footerRights:
      "AF DMC Travel. MICE y DMC — Punta Cana, República Dominicana.",
  },

  fr: {
    languageName: "Français",
    metaTitle: "Organisez votre groupe à Punta Cana | AF DMC Travel",
    metaDescription:
      "Transport terrestre, hôtellerie, team building, programmes incentives, soirées de gala et assistance sur place à Punta Cana. Parlez-nous de votre groupe : notre équipe locale répond sous 48 heures.",
    eyebrow: "Punta Cana · République dominicaine",
    h1: "Votre partenaire DMC local pour groupes, événements et incentives à Punta Cana",
    heroSubtitle:
      "Transport, hôtels, team building, soirées de gala et coordination sur place — le tout pris en charge par une seule équipe professionnelle sur le terrain. Parlez-nous de votre groupe, nous répondons sous 48 heures.",
    heroImageAlt:
      "Vue aérienne du littoral de Punta Cana, République dominicaine",
    form: {
      title: "Parlez-nous de votre groupe",
      intro:
        "Donnez-nous quelques détails et notre équipe à Punta Cana reviendra vers vous sous 48 heures avec les prochaines étapes.",
      firstName: "Prénom",
      lastName: "Nom",
      phone: "Téléphone / WhatsApp",
      email: "Adresse e-mail",
      comments: "Commentaires",
      commentsPlaceholder:
        "Taille du groupe, dates de voyage, type de programme, tout ce que nous devrions savoir…",
      submit: "Envoyer ma demande",
      sending: "Envoi…",
      privacy:
        "Vos données servent uniquement à préparer votre proposition et ne sont jamais transmises à des tiers.",
      errorMessage:
        "Nous n’avons pas pu envoyer votre message. Réessayez ou écrivez-nous à director@afdmctravel.com.",
      successTitle: "Merci — votre demande est en route",
      successBody:
        "Notre équipe à Punta Cana a bien reçu vos informations et vous répondra sous 48 heures. Pour toute urgence, écrivez-nous directement à",
    },
    statsLabels: [
      "Capacité maximale",
      "Langues parlées",
      "Délai de réponse",
      "Équipe locale à Punta Cana",
    ],
    servicesTitle: "Tout ce que nous gérons sur place",
    servicesIntro:
      "Chaque service ci-dessous est assuré localement par notre propre équipe à Punta Cana. Vous ne sous-traitez pas à un coordinateur à distance : vous activez une équipe physiquement présente et responsable de votre programme.",
    services: [
      {
        icon: "bus",
        title: "Transport de groupes",
        description:
          "Accueil à l’aéroport de PUJ, autocars, vans VIP, suivi des vols et régulation 24/7 — de l’atterrissage à l’arrivée à l’hôtel.",
      },
      {
        icon: "hotel",
        title: "Hôtellerie et blocs de chambres",
        description:
          "Négociation tarifaire sur toutes les gammes de resorts, gestion des listes de chambres, salles de réunion et accueil de groupe sur place.",
      },
      {
        icon: "users",
        title: "Team building",
        description:
          "Olympiades de plage, chasses au trésor, cours de cuisine dominicaine, actions RSE et formats façon Amazing Race — animation comprise.",
      },
      {
        icon: "trophy",
        title: "Programmes incentives",
        description:
          "Privatisation de beach clubs, dîners en catamaran, kits de bienvenue, coordination de salons VIP et un directeur de programme dédié.",
      },
      {
        icon: "party-popper",
        title: "Événements et dîners de gala",
        description:
          "Remises de prix et soirées à thème jusqu’à 7 000 invités, avec audiovisuel, scène, éclairage, décoration et spectacles live.",
      },
      {
        icon: "map",
        title: "Excursions privées",
        description:
          "Croisières vers les îles Saona et Catalina, privatisation de tyroliennes et buggys, visites coloniales de Saint-Domingue et vols en hélicoptère.",
      },
      {
        icon: "headset",
        title: "Assistance DMC sur place",
        description:
          "Un responsable de programme sur le terrain, points quotidiens avec les prestataires, résolution en temps réel et clôture des comptes.",
      },
    ],
    reasonsTitle: "Pourquoi les groupes choisissent AF DMC Travel",
    reasons: [
      {
        title: "Ancrage local fort",
        description:
          "Nés et implantés à Punta Cana. Notre équipe connaît chaque hôtel, route, prestataire et autorité qui compte pour la réussite de votre groupe.",
      },
      {
        title: "Confidentialité stricte",
        description:
          "Nous travaillons en coulisses. La relation avec votre client reste la vôtre, toujours. Aucun démarchage direct de vos invités.",
      },
      {
        title: "Un seul interlocuteur local",
        description:
          "Ni centre d’appels ni coordinateur à distance. Un responsable identifié suit votre groupe de la première demande au départ final.",
      },
    ],
    ctaTitle: "Quand vous voulez",
    ctaBody:
      "Envoyez-nous les détails de votre groupe via le formulaire ci-dessus, ou contactez directement notre équipe — nous répondons à chaque demande sous 48 heures.",
    footerTagline: "AF DMC Travel · Division MICE et DMC d’Adventures Finder",
    footerAddress:
      "Plaza Cueva Taina, Local #B2, Av. Estados Unidos — Bávaro, République dominicaine",
    footerRights:
      "AF DMC Travel. MICE et DMC — Punta Cana, République dominicaine.",
  },
};
