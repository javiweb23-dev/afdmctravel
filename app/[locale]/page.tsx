import Image from "next/image";
import {groq} from "next-sanity";
import {client} from "@/sanity/lib/client";
import {urlFor} from "@/sanity/lib/image";

type LocaleKey = "en" | "es" | "fr-CA";
type PageProps = {params: Promise<{locale: LocaleKey}>};
type LocalizedValue = {en?: string; es?: string; fr_CA?: string};
type HomeContent = {
  headerMenu?: LocalizedValue[];
  headerButton?: LocalizedValue;
  heroTitle?: LocalizedValue;
  heroSubtitle?: LocalizedValue;
  heroBody?: LocalizedValue;
  heroCtaPrimary?: LocalizedValue;
  heroCtaSecondary?: LocalizedValue;
  heroContact?: LocalizedValue;
  heroImage?: unknown;
  stats?: {label?: LocalizedValue; value?: LocalizedValue}[];
  whoWeServeTitle?: LocalizedValue;
  whoWeServeItems?: LocalizedValue[];
  servicesTitle?: LocalizedValue;
  services?: {title?: LocalizedValue; description?: LocalizedValue; image?: unknown}[];
  whiteLabelTitle?: LocalizedValue;
  whiteLabelBody?: LocalizedValue;
  whiteLabelItems?: LocalizedValue[];
  whiteLabelImage?: unknown;
  sampleProgramsTitle?: LocalizedValue;
  samplePrograms?: {title?: LocalizedValue; description?: LocalizedValue; bullets?: LocalizedValue[]; image?: unknown}[];
  whyPartnerTitle?: LocalizedValue;
  whyPartnerItems?: LocalizedValue[];
  whyPartnerGallery?: unknown[];
  leadTitle?: LocalizedValue;
  leadSubtitle?: LocalizedValue;
  submitLabel?: LocalizedValue;
  companyTypeOptions?: LocalizedValue[];
  eventTypeOptions?: LocalizedValue[];
  serviceOptions?: LocalizedValue[];
  budgetOptions?: LocalizedValue[];
  faqsTitle?: LocalizedValue;
  faqs?: {question?: LocalizedValue; answer?: LocalizedValue}[];
};

const query = groq`*[_type == "b2bLandingPage"][0]{
  headerMenu, headerButton, heroTitle, heroSubtitle, heroBody, heroCtaPrimary, heroCtaSecondary, heroContact, heroImage,
  stats, whoWeServeTitle, whoWeServeItems,
  servicesTitle, services,
  whiteLabelTitle, whiteLabelBody, whiteLabelItems, whiteLabelImage,
  sampleProgramsTitle, samplePrograms,
  whyPartnerTitle, whyPartnerItems, whyPartnerGallery,
  leadTitle, leadSubtitle, submitLabel, companyTypeOptions, eventTypeOptions, serviceOptions, budgetOptions,
  faqsTitle, faqs
}`;

const fallback: Required<HomeContent> = {
  headerMenu: [
    {en: "Home", es: "Inicio", fr_CA: "Accueil"},
    {en: "Activities", es: "Actividades", fr_CA: "Activites"},
    {en: "Transfers", es: "Traslados", fr_CA: "Transferts"},
    {en: "Packages", es: "Paquetes", fr_CA: "Forfaits"},
    {en: "MICE & DMC Services", es: "Servicios MICE y DMC", fr_CA: "Services MICE et DMC"},
    {en: "Contact", es: "Contacto", fr_CA: "Contact"},
  ],
  headerButton: {en: "Request Proposal", es: "Solicitar Propuesta", fr_CA: "Demander une proposition"},
  heroTitle: {en: "Your Local MICE & DMC Partner in Punta Cana", es: "Tu aliado local MICE y DMC en Punta Cana", fr_CA: "Votre partenaire local MICE et DMC a Punta Cana"},
  heroSubtitle: {en: "We help international DMCs, MICE agencies, corporate planners and event companies deliver seamless group programs in Punta Cana.", es: "Ayudamos a DMCs internacionales, agencias MICE, planners corporativos y empresas de eventos a ejecutar programas grupales sin friccion en Punta Cana.", fr_CA: "Nous aidons les DMC internationaux, agences MICE, planificateurs corporatifs et entreprises evenementielles a executer des programmes de groupe sans friction a Punta Cana."},
  heroBody: {en: "From airport transfers and hotel sourcing to team building, private experiences, celebrations and on-site logistics, our local team manages every detail.", es: "Desde traslados y hoteleria hasta team building, experiencias privadas, celebraciones y logistica on-site, nuestro equipo local gestiona cada detalle.", fr_CA: "Des transferts aeroport et hotels au team building, experiences privees, celebrations et logistique sur site, notre equipe locale gere chaque detail."},
  heroCtaPrimary: {en: "Request a Group Proposal", es: "Solicitar propuesta grupal", fr_CA: "Demander une proposition de groupe"},
  heroCtaSecondary: {en: "Contact Our Sales Team", es: "Contactar equipo comercial", fr_CA: "Contacter notre equipe commerciale"},
  heroContact: {en: "Jeannie Flores | Sales Manager | commercial@adventuresfinder.com", es: "Jeannie Flores | Sales Manager | commercial@adventuresfinder.com", fr_CA: "Jeannie Flores | Sales Manager | commercial@adventuresfinder.com"},
  heroImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1800&q=80",
  stats: [
    {value: {en: "Up to 7,000 guests", es: "Hasta 7,000 invitados", fr_CA: "Jusqu a 7 000 invites"}, label: {en: "Large-scale capacity", es: "Capacidad de gran escala", fr_CA: "Capacite grande echelle"}},
    {value: {en: "Hotel sourcing", es: "Gestion hotelera", fr_CA: "Sourcing hotelier"}, label: {en: "Resort and venue coordination", es: "Coordinacion de resorts y venues", fr_CA: "Coordination resorts et lieux"}},
    {value: {en: "Multilingual support", es: "Soporte multilingue", fr_CA: "Support multilingue"}, label: {en: "English, Spanish, French and Italian", es: "Ingles, espanol, frances e italiano", fr_CA: "Anglais, espagnol, francais et italien"}},
    {value: {en: "Local team", es: "Equipo local", fr_CA: "Equipe locale"}, label: {en: "On-the-ground operations", es: "Operacion en destino", fr_CA: "Operations sur le terrain"}},
  ],
  whoWeServeTitle: {en: "Built for DMCs, MICE Agencies & Corporate Groups", es: "Construido para DMCs, agencias MICE y grupos corporativos", fr_CA: "Concu pour les DMC, agences MICE et groupes corporatifs"},
  whoWeServeItems: [
    {en: "International DMCs", es: "DMCs internacionales", fr_CA: "DMC internationaux"},
    {en: "MICE agencies", es: "Agencias MICE", fr_CA: "Agences MICE"},
    {en: "Incentive travel companies", es: "Empresas de viajes de incentivo", fr_CA: "Entreprises de voyages incentive"},
    {en: "Corporate event planners", es: "Planners de eventos corporativos", fr_CA: "Planificateurs d evenements corporatifs"},
    {en: "Meeting planners", es: "Planificadores de reuniones", fr_CA: "Planificateurs de reunions"},
    {en: "Travel management companies", es: "Empresas de travel management", fr_CA: "Societes de gestion de voyages"},
    {en: "Celebration and wedding planners", es: "Planificadores de bodas y celebraciones", fr_CA: "Planificateurs de mariages et celebrations"},
    {en: "Event production companies", es: "Empresas de produccion de eventos", fr_CA: "Societes de production evenementielle"},
    {en: "Group travel agencies", es: "Agencias de viajes grupales", fr_CA: "Agences de voyages de groupe"},
  ],
  servicesTitle: {en: "Our MICE & Group Services", es: "Nuestros servicios MICE y de grupos", fr_CA: "Nos services MICE et groupes"},
  services: [
    {title: {en: "Group Transportation", es: "Transporte grupal", fr_CA: "Transport de groupe"}, description: {en: "Airport arrivals, VIP transfers, shuttles and multi-hotel dispatching.", es: "Llegadas aeropuerto, VIP transfers, shuttles y movimientos multi-hotel.", fr_CA: "Arrivees aeroport, transferts VIP, navettes et mouvements multi-hotels."}, image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=900&q=80"},
    {title: {en: "Hotel Sourcing & Coordination", es: "Sourcing y coordinacion hotelera", fr_CA: "Sourcing et coordination hoteliere"}, description: {en: "Resort recommendations, rooming lists, meeting spaces and venue support.", es: "Recomendaciones de resorts, rooming lists, meeting spaces y venues.", fr_CA: "Recommandations resorts, rooming lists, meeting spaces et lieux."}, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80"},
    {title: {en: "Team Building Programs", es: "Programas de team building", fr_CA: "Programmes de team building"}, description: {en: "Beach olympics, CSR activities, challenges and branded dynamics.", es: "Beach olympics, CSR, retos y dinamicas de marca.", fr_CA: "Beach olympics, activites RSE, defis et dynamiques de marque."}, image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80"},
    {title: {en: "Incentive Travel", es: "Viajes de incentivo", fr_CA: "Voyages incentive"}, description: {en: "Reward experiences, awards dinners and executive-level support.", es: "Experiencias de recompensa, cenas de premiacion y soporte ejecutivo.", fr_CA: "Experiences de recompense, diners de remise et support executif."}, image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=80"},
    {title: {en: "Events & Celebrations", es: "Eventos y celebraciones", fr_CA: "Evenements et celebrations"}, description: {en: "Gala dinners, beach parties, product launches and themed nights.", es: "Gala dinners, beach parties, lanzamientos y noches tematicas.", fr_CA: "Galas, beach parties, lancements et soirees thematiques."}, image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=80"},
    {title: {en: "Private Tours & Experiences", es: "Tours y experiencias privadas", fr_CA: "Tours et experiences privees"}, description: {en: "Curated destination programs for groups and corporate clients.", es: "Programas de destino curados para grupos y clientes corporativos.", fr_CA: "Programmes de destination sur mesure pour groupes et clients corporatifs."}, image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=900&q=80"},
    {title: {en: "On-Site Destination Support", es: "Soporte on-site en destino", fr_CA: "Support destination sur site"}, description: {en: "Hospitality desks, multilingual staff and full run-of-show execution.", es: "Hospitality desks, staff multilingue y ejecucion completa.", fr_CA: "Hospitality desks, equipe multilingue et execution complete."}, image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=80"},
  ],
  whiteLabelTitle: {en: "White-Label Local Support for Agencies", es: "Soporte local white-label para agencias", fr_CA: "Support local white-label pour agences"},
  whiteLabelBody: {en: "Operate with confidence while keeping your agency as the visible brand. We execute suppliers, logistics, staffing and delivery in Punta Cana behind the scenes.", es: "Opera con confianza manteniendo tu agencia como marca visible. Ejecutamos proveedores, logistica, staffing y operacion en Punta Cana en segundo plano.", fr_CA: "Operez avec confiance en gardant votre agence comme marque visible. Nous executons fournisseurs, logistique, staffing et operation a Punta Cana en arriere-plan."},
  whiteLabelItems: [
    {en: "Local supplier sourcing", es: "Sourcing de proveedores locales", fr_CA: "Sourcing de fournisseurs locaux"},
    {en: "Ground operations", es: "Operaciones terrestres", fr_CA: "Operations terrain"},
    {en: "Custom proposals", es: "Propuestas personalizadas", fr_CA: "Propositions personnalisees"},
    {en: "Confidential execution", es: "Ejecucion confidencial", fr_CA: "Execution confidentielle"},
  ],
  whiteLabelImage: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=80",
  sampleProgramsTitle: {en: "Sample Punta Cana Group Programs", es: "Programas grupales de ejemplo en Punta Cana", fr_CA: "Programmes de groupe exemples a Punta Cana"},
  samplePrograms: [
    {title: {en: "Corporate Incentive Escape", es: "Corporate Incentive Escape", fr_CA: "Corporate Incentive Escape"}, description: {en: "Reward-focused program for top performers and partner groups.", es: "Programa orientado a recompensas para top performers y partners.", fr_CA: "Programme axe recompenses pour top performers et partenaires."}, bullets: [{en: "Private catamaran", es: "Catamaran privado", fr_CA: "Catamaran prive"}, {en: "Awards dinner", es: "Cena de premiacion", fr_CA: "Diner de remise"}, {en: "On-site coordination", es: "Coordinacion on-site", fr_CA: "Coordination sur site"}], image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80"},
    {title: {en: "Executive Retreat", es: "Executive Retreat", fr_CA: "Executive Retreat"}, description: {en: "Leadership-oriented format for meetings and strategic sessions.", es: "Formato para liderazgo, reuniones y sesiones estrategicas.", fr_CA: "Format pour leadership, reunions et sessions strategiques."}, bullets: [{en: "VIP airport service", es: "Servicio VIP aeropuerto", fr_CA: "Service VIP aeroport"}, {en: "Luxury transport", es: "Transporte de lujo", fr_CA: "Transport de luxe"}, {en: "Private dining", es: "Cenas privadas", fr_CA: "Diners prives"}], image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"},
    {title: {en: "Team Building & Celebration", es: "Team Building y Celebracion", fr_CA: "Team Building et Celebration"}, description: {en: "High-energy experience designed for connection and brand culture.", es: "Experiencia de alta energia para conexion y cultura de marca.", fr_CA: "Experience haute energie pour connexion et culture de marque."}, bullets: [{en: "Beach Olympics", es: "Beach Olympics", fr_CA: "Beach Olympics"}, {en: "Cultural activity", es: "Actividad cultural", fr_CA: "Activite culturelle"}, {en: "Branded celebration", es: "Celebracion de marca", fr_CA: "Celebration de marque"}], image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1200&q=80"},
    {title: {en: "White-Label DMC Support", es: "Soporte DMC White-Label", fr_CA: "Support DMC White-Label"}, description: {en: "Flexible operating model for agencies that keep client ownership.", es: "Modelo flexible para agencias que mantienen ownership del cliente.", fr_CA: "Modele flexible pour agences conservant la relation client."}, bullets: [{en: "Back-end operations", es: "Operacion back-end", fr_CA: "Operations back-end"}, {en: "Supplier coordination", es: "Coordinacion de proveedores", fr_CA: "Coordination fournisseurs"}, {en: "Local emergency support", es: "Soporte local de emergencia", fr_CA: "Support local d urgence"}], image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80"},
  ],
  whyPartnerTitle: {en: "Why Partner With Adventures Finder?", es: "Por que asociarte con Adventures Finder", fr_CA: "Pourquoi collaborer avec Adventures Finder"},
  whyPartnerItems: [
    {en: "Local Punta Cana expertise", es: "Expertise local de Punta Cana", fr_CA: "Expertise locale de Punta Cana"},
    {en: "Experience in corporate and group programs", es: "Experiencia en programas corporativos y grupales", fr_CA: "Experience en programmes corporatifs et groupes"},
    {en: "Multilingual team", es: "Equipo multilingue", fr_CA: "Equipe multilingue"},
    {en: "Hotel sourcing and logistics in one partner", es: "Hoteleria y logistica en un solo partner", fr_CA: "Sourcing hotelier et logistique en un seul partenaire"},
    {en: "Fast sales communication", es: "Comunicacion comercial rapida", fr_CA: "Communication commerciale rapide"},
  ],
  whyPartnerGallery: [
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80",
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=80",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
  ],
  leadTitle: {en: "Planning a Group Program in Punta Cana?", es: "Planeando un programa grupal en Punta Cana?", fr_CA: "Vous planifiez un programme de groupe a Punta Cana?"},
  leadSubtitle: {en: "Share your event details and our team will build a tailored proposal.", es: "Comparte los detalles de tu evento y nuestro equipo preparara una propuesta a la medida.", fr_CA: "Partagez les details de votre evenement et notre equipe preparera une proposition sur mesure."},
  submitLabel: {en: "Send Group Request", es: "Enviar solicitud grupal", fr_CA: "Envoyer la demande de groupe"},
  companyTypeOptions: [
    {en: "DMC", es: "DMC", fr_CA: "DMC"},
    {en: "MICE agency", es: "Agencia MICE", fr_CA: "Agence MICE"},
    {en: "Corporate company", es: "Empresa corporativa", fr_CA: "Entreprise corporative"},
    {en: "Event planner", es: "Planificador de eventos", fr_CA: "Planificateur d evenements"},
    {en: "Travel agency", es: "Agencia de viajes", fr_CA: "Agence de voyages"},
    {en: "Other", es: "Otro", fr_CA: "Autre"},
  ],
  eventTypeOptions: [
    {en: "Incentive trip", es: "Viaje de incentivo", fr_CA: "Voyage incentive"},
    {en: "Corporate retreat", es: "Retiro corporativo", fr_CA: "Retraite corporative"},
    {en: "Meeting", es: "Reunion", fr_CA: "Reunion"},
    {en: "Team building", es: "Team building", fr_CA: "Team building"},
    {en: "Celebration", es: "Celebracion", fr_CA: "Celebration"},
    {en: "Product launch", es: "Lanzamiento de producto", fr_CA: "Lancement de produit"},
    {en: "Wedding / private celebration", es: "Boda / celebracion privada", fr_CA: "Mariage / celebration privee"},
    {en: "Other", es: "Otro", fr_CA: "Autre"},
  ],
  serviceOptions: [
    {en: "Hotels", es: "Hoteles", fr_CA: "Hotels"},
    {en: "Transfers", es: "Traslados", fr_CA: "Transferts"},
    {en: "Team building", es: "Team building", fr_CA: "Team building"},
    {en: "Excursions", es: "Excursiones", fr_CA: "Excursions"},
    {en: "Gala dinner", es: "Cena de gala", fr_CA: "Diner de gala"},
    {en: "Beach event", es: "Evento de playa", fr_CA: "Evenement de plage"},
    {en: "Staffing", es: "Staffing", fr_CA: "Staffing"},
    {en: "Full destination logistics", es: "Logistica integral destino", fr_CA: "Logistique destination complete"},
  ],
  budgetOptions: [
    {en: "Under USD 25,000", es: "Menos de USD 25,000", fr_CA: "Moins de 25 000 USD"},
    {en: "USD 25,000 - 50,000", es: "USD 25,000 - 50,000", fr_CA: "25 000 - 50 000 USD"},
    {en: "USD 50,000 - 100,000", es: "USD 50,000 - 100,000", fr_CA: "50 000 - 100 000 USD"},
    {en: "Over USD 100,000", es: "Mas de USD 100,000", fr_CA: "Plus de 100 000 USD"},
  ],
  faqsTitle: {en: "Frequently Asked Questions", es: "Preguntas frecuentes", fr_CA: "Questions frequentes"},
  faqs: [
    {question: {en: "Do you work with international DMCs and MICE agencies?", es: "Trabajan con DMCs y agencias MICE internacionales?", fr_CA: "Travaillez-vous avec des DMC et agences MICE internationales?"}, answer: {en: "Yes. We support international agencies and planners that need reliable local execution in Punta Cana.", es: "Si. Apoyamos agencias y planners internacionales que necesitan ejecucion local confiable en Punta Cana.", fr_CA: "Oui. Nous accompagnons les agences et planificateurs internationaux qui ont besoin d une execution locale fiable a Punta Cana."}},
    {question: {en: "Can you work white-label for agencies?", es: "Pueden operar white-label para agencias?", fr_CA: "Pouvez-vous operer en white-label pour les agences?"}, answer: {en: "Yes. We can operate behind the scenes while your agency keeps the client-facing relationship.", es: "Si. Podemos operar en segundo plano mientras tu agencia mantiene la relacion con el cliente.", fr_CA: "Oui. Nous pouvons operer en arriere-plan pendant que votre agence conserve la relation client."}},
    {question: {en: "Can you help with hotels?", es: "Pueden apoyar con hoteles?", fr_CA: "Pouvez-vous aider pour les hotels?"}, answer: {en: "Yes. We support hotel sourcing and coordination for groups, incentives and events.", es: "Si. Apoyamos sourcing y coordinacion hotelera para grupos, incentivos y eventos.", fr_CA: "Oui. Nous soutenons le sourcing et la coordination hoteliere pour groupes, incentives et evenements."}},
    {question: {en: "What group sizes can you manage?", es: "Que tamanos de grupo pueden manejar?", fr_CA: "Quelles tailles de groupe pouvez-vous gerer?"}, answer: {en: "We manage small to large programs, including large-scale operations up to 7,000 guests.", es: "Gestionamos programas pequenos y grandes, incluyendo operaciones de hasta 7,000 invitados.", fr_CA: "Nous gerons des programmes petits a grands, y compris des operations jusqu a 7 000 invites."}},
    {question: {en: "What languages does your team speak?", es: "Que idiomas habla el equipo?", fr_CA: "Quelles langues parle votre equipe?"}, answer: {en: "Our team supports guests in English, Spanish, French and Italian.", es: "Nuestro equipo atiende en ingles, espanol, frances e italiano.", fr_CA: "Notre equipe accompagne en anglais, espagnol, francais et italien."}},
    {question: {en: "Do you only offer tours?", es: "Solo ofrecen tours?", fr_CA: "Offrez-vous uniquement des tours?"}, answer: {en: "No. We handle transportation, hotels, events, team building, celebrations and full local logistics.", es: "No. Gestionamos transporte, hoteles, eventos, team building, celebraciones y logistica integral local.", fr_CA: "Non. Nous gerons transport, hotels, evenements, team building, celebrations et logistique locale complete."}},
    {question: {en: "Can you support gala dinners and corporate celebrations?", es: "Pueden apoyar galas y celebraciones corporativas?", fr_CA: "Pouvez-vous soutenir des galas et celebrations corporatives?"}, answer: {en: "Yes. We coordinate gala dinners, awards nights, beach parties and themed events.", es: "Si. Coordinamos galas, noches de premiacion, beach parties y eventos tematicos.", fr_CA: "Oui. Nous coordonnons galas, soirees de remise, beach parties et evenements thematiques."}},
    {question: {en: "Who should we contact?", es: "A quien debemos contactar?", fr_CA: "Qui devons-nous contacter?"}, answer: {en: "Contact Jeannie Flores at commercial@adventuresfinder.com.", es: "Contacta a Jeannie Flores en commercial@adventuresfinder.com.", fr_CA: "Contactez Jeannie Flores a commercial@adventuresfinder.com."}},
  ],
};

const fieldLabels = {
  en: {
    name: "Name",
    company: "Company",
    email: "Email",
    phone: "Phone / WhatsApp",
    country: "Country",
    companyType: "Company type",
    eventType: "Event type",
    guests: "Group Size",
    dates: "Event dates",
    destination: "Destination / hotel selected?",
    services: "Services needed",
    budget: "Budget range",
    whiteLabel: "Do you need white-label support?",
    upload: "Upload RFP or brief",
    message: "Message",
  },
  es: {
    name: "Nombre",
    company: "Empresa",
    email: "Correo",
    phone: "Telefono / WhatsApp",
    country: "Pais",
    companyType: "Tipo de empresa",
    eventType: "Tipo de evento",
    guests: "Tamano del grupo",
    dates: "Fechas del evento",
    destination: "Destino / hotel seleccionado?",
    services: "Servicios requeridos",
    budget: "Rango de presupuesto",
    whiteLabel: "Necesitas soporte white-label?",
    upload: "Subir RFP o brief",
    message: "Mensaje",
  },
  "fr-CA": {
    name: "Nom",
    company: "Entreprise",
    email: "Courriel",
    phone: "Telephone / WhatsApp",
    country: "Pays",
    companyType: "Type d entreprise",
    eventType: "Type d evenement",
    guests: "Taille du groupe",
    dates: "Dates de l evenement",
    destination: "Destination / hotel selectionne?",
    services: "Services necessaires",
    budget: "Plage budgetaire",
    whiteLabel: "Avez-vous besoin de support white-label?",
    upload: "Telecharger RFP ou brief",
    message: "Message",
  },
} as const;

function PartnerIcon({index}: {index: number}) {
  const common = "size-5 text-cyan-700";
  if (index === 0) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}><path d="M3 18h18"/><path d="M6 18v-9l6-4 6 4v9"/><path d="M10 11h4"/><path d="M10 14h4"/></svg>;
  if (index === 1) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}><path d="M4 19V7h16v12"/><path d="M4 11h16"/><path d="M8 7V5h8v2"/></svg>;
  if (index === 2) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}><path d="m3 13 7-10 4 7 7 1-9 10-3-6z"/></svg>;
  if (index === 3) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3 11h18"/></svg>;
  if (index === 4) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}><path d="M4 8h16"/><path d="M4 12h16"/><path d="M4 16h10"/><path d="M3 5h18v14H3z"/></svg>;
  if (index === 5) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}><path d="M4 18h16"/><path d="M5 18V8a7 7 0 0 1 14 0v10"/><path d="M8 18v-4h8v4"/></svg>;
  if (index === 6) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}><path d="M5 19h14"/><path d="M7 19V9l5-4 5 4v10"/><path d="M9 13h6"/></svg>;
  if (index === 7) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}><path d="M3 8h18"/><path d="M6 8V5h12v3"/><path d="M4 8v11h16V8"/><path d="M9 13h6"/></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}><circle cx="12" cy="8" r="3"/><path d="M5 19a7 7 0 0 1 14 0"/><path d="M3 13h2"/><path d="M19 13h2"/></svg>;
}

function pickLocalized(value: LocalizedValue | undefined, locale: LocaleKey) {
  if (!value) return "";
  if (locale === "fr-CA") return value.fr_CA || value.en || value.es || "";
  return value[locale] || value.en || value.es || value.fr_CA || "";
}

function resolveImage(image: unknown, fallbackUrl: string) {
  if (typeof image === "string" && image.length > 0) return image;
  if (image) {
    try {
      return urlFor(image).width(1600).quality(80).url();
    } catch {
      return fallbackUrl;
    }
  }
  return fallbackUrl;
}

export default async function HomePage({params}: PageProps) {
  const {locale} = await params;
  const labels = fieldLabels[locale];
  let data: HomeContent = {};
  try {
    data = (await client.fetch<HomeContent>(query)) || {};
  } catch {
    data = {};
  }
  const content = {...fallback, ...data};

  return (
    <div className="min-h-screen scroll-smooth bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-[#072b52] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="text-sm font-bold leading-tight">ADVENTURES FINDER</div>
            <div className="h-7 w-px bg-white/30" />
            <div className="text-sm font-semibold">AF DMC</div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
            {content.headerMenu.map((item, index) => (
              <a
                key={`menu-${index}`}
                href={index === 1 ? "https://adventuresfinder.com/" : index === 2 ? "https://adventuresfinder.com/transfers/" : index === 5 ? "#lead" : index === 0 ? `/${locale}` : `/${locale}#services`}
                className="transition hover:text-cyan-200"
              >
                {pickLocalized(item, locale)}
              </a>
            ))}
          </nav>
          <a href={`/${locale}#lead`} className="rounded-md bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-200">
            {pickLocalized(content.headerButton, locale)}
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={resolveImage(content.heroImage, "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1800&q=80")} alt={pickLocalized(content.heroTitle, locale)} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05233f]/90 via-[#05233f]/75 to-[#05233f]/35" />
        </div>
        <div className="relative mx-auto grid min-h-[76vh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{pickLocalized(content.heroTitle, locale)}</h1>
            <p className="mt-5 text-lg text-slate-100">{pickLocalized(content.heroSubtitle, locale)}</p>
            <p className="mt-4 text-base text-slate-200">{pickLocalized(content.heroBody, locale)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`/${locale}#lead`} className="rounded-md bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-900">{pickLocalized(content.heroCtaPrimary, locale)}</a>
              <a href="mailto:commercial@adventuresfinder.com" className="rounded-md border border-white/50 px-5 py-3 text-sm font-semibold text-white">{pickLocalized(content.heroCtaSecondary, locale)}</a>
            </div>
            <p className="mt-5 text-sm text-slate-200">{pickLocalized(content.heroContact, locale)}</p>
          </div>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-14 grid max-w-7xl gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {content.stats.map((stat, index) => (
          <article key={`stat-${index}`} className="rounded-xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/10">
            <p className="text-sm font-semibold text-cyan-700">{pickLocalized(stat.value, locale)}</p>
            <p className="mt-2 text-sm text-slate-600">{pickLocalized(stat.label, locale)}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold">{pickLocalized(content.whoWeServeTitle, locale)}</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {content.whoWeServeItems.map((item, index) => (
            <div key={`partner-${index}`} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm">
              <PartnerIcon index={index} />
              <span>{pickLocalized(item, locale)}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold">{pickLocalized(content.servicesTitle, locale)}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.services.map((service, index) => (
            <article key={`service-${index}`} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-[16/10]">
                <Image src={resolveImage(service.image, "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900&q=80")} alt={pickLocalized(service.title, locale)} fill className="object-cover" sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold">{pickLocalized(service.title, locale)}</h3>
                <p className="mt-2 text-sm text-slate-600">{pickLocalized(service.description, locale)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{pickLocalized(content.whiteLabelTitle, locale)}</h2>
            <p className="mt-4 text-sm text-slate-700">{pickLocalized(content.whiteLabelBody, locale)}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {content.whiteLabelItems.map((item, index) => (
                <div key={`white-${index}`} className="rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-700">
                  {pickLocalized(item, locale)}
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-48 overflow-hidden rounded-xl">
            <Image src={resolveImage(content.whiteLabelImage, "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=80")} alt={pickLocalized(content.whiteLabelTitle, locale)} fill className="object-cover" sizes="(min-width:1024px) 40vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold">{pickLocalized(content.sampleProgramsTitle, locale)}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.samplePrograms.map((program, index) => (
            <article key={`program-${index}`} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image src={resolveImage(program.image, "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80")} alt={pickLocalized(program.title, locale)} fill className="object-cover" sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold">{pickLocalized(program.title, locale)}</h3>
                <p className="mt-2 text-sm text-slate-600">{pickLocalized(program.description, locale)}</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-700">
                  {program.bullets?.map((bullet, bulletIndex) => (
                    <li key={`bullet-${index}-${bulletIndex}`} className="flex items-center gap-2">
                      <span className="text-cyan-700">•</span>
                      <span>{pickLocalized(bullet, locale)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_1.25fr] lg:px-8">
        <div>
          <h2 className="text-3xl font-bold">{pickLocalized(content.whyPartnerTitle, locale)}</h2>
          <ul className="mt-6 space-y-3">
            {content.whyPartnerItems.map((item, index) => (
              <li key={`why-${index}`} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="mt-0.5 text-cyan-700">✔</span>
                <span>{pickLocalized(item, locale)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {content.whyPartnerGallery.map((image, index) => (
            <div key={`gallery-${index}`} className={`relative overflow-hidden rounded-xl ${index === 0 ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}>
              <Image src={resolveImage(image, "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80")} alt="Partner showcase" fill className="object-cover" sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"} />
            </div>
          ))}
        </div>
      </section>

      <section id="lead" className="bg-[#072b52] py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">{pickLocalized(content.leadTitle, locale)}</h2>
          <p className="mt-3 text-slate-200">{pickLocalized(content.leadSubtitle, locale)}</p>
          <form action="mailto:commercial@adventuresfinder.com" method="post" encType="multipart/form-data" className="mt-8 grid gap-4 rounded-2xl bg-white p-6 text-slate-900 sm:grid-cols-2">
            <label className="text-sm">{labels.name}<input type="text" name="name" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="text-sm">{labels.company}<input type="text" name="company" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="text-sm">{labels.email}<input type="email" name="email" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="text-sm">{labels.phone}<input type="tel" name="phone" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="text-sm">{labels.country}<input type="text" name="country" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="text-sm">{labels.companyType}
              <select name="companyType" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
                {content.companyTypeOptions.map((item, index) => <option key={`company-${index}`} value={pickLocalized(item, locale)}>{pickLocalized(item, locale)}</option>)}
              </select>
            </label>
            <label className="text-sm sm:col-span-2">{labels.eventType}
              <select name="eventType" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
                {content.eventTypeOptions.map((item, index) => <option key={`event-${index}`} value={pickLocalized(item, locale)}>{pickLocalized(item, locale)}</option>)}
              </select>
            </label>
            <label className="text-sm">{labels.guests}<input type="number" min={1} name="groupSize" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="text-sm">{labels.dates}<input type="text" name="eventDates" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="text-sm sm:col-span-2">{labels.destination}<input type="text" name="destinationOrHotel" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <fieldset className="text-sm sm:col-span-2">
              <legend>{labels.services}</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {content.serviceOptions.map((item, index) => (
                  <label key={`service-option-${index}`} className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2">
                    <input type="checkbox" name="servicesNeeded" value={pickLocalized(item, locale)} className="size-4" />
                    <span>{pickLocalized(item, locale)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="text-sm">{labels.budget}
              <select name="budgetRange" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
                {content.budgetOptions.map((item, index) => <option key={`budget-${index}`} value={pickLocalized(item, locale)}>{pickLocalized(item, locale)}</option>)}
              </select>
            </label>
            <label className="text-sm">{labels.whiteLabel}
              <select name="whiteLabelSupport" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
                <option value={locale === "en" ? "Yes" : locale === "es" ? "Si" : "Oui"}>{locale === "en" ? "Yes" : locale === "es" ? "Si" : "Oui"}</option>
                <option value="No">No</option>
              </select>
            </label>
            <label className="text-sm sm:col-span-2">{labels.upload}<input type="file" name="rfpBrief" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="text-sm sm:col-span-2">{labels.message}<textarea name="message" rows={4} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            <button type="submit" className="sm:col-span-2 rounded-md bg-[#072b52] px-4 py-3 text-sm font-semibold text-white">{pickLocalized(content.submitLabel, locale)}</button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold">{pickLocalized(content.faqsTitle, locale)}</h2>
        <div className="mt-8 space-y-3">
          {content.faqs.map((faq, index) => (
            <details key={`faq-${index}`} className="rounded-xl border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">{pickLocalized(faq.question, locale)}</summary>
              <p className="mt-3 text-sm text-slate-600">{pickLocalized(faq.answer, locale)}</p>
            </details>
          ))}
        </div>
      </section>
      <footer className="bg-[#f7b500] py-8 text-black">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 text-center text-xl sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>Plaza Cueva Taina, Local #B2, Av. Estados Unidos - Bavaro, Dominican Republic</div>
          <div className="space-y-2">
            <div>+1 829 421 6101</div>
            <a href="mailto:commercial@adventuresfinder.com" className="block underline-offset-4 hover:underline">commercial@adventuresfinder.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
