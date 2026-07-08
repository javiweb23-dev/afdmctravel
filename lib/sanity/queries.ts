import {groq} from "next-sanity";

const seoProjection = groq`seo{
  metaTitle,
  metaDescription,
  ogImage
}`;

export const homePageQuery = groq`*[_type == "homePage"][0]{
  ${seoProjection},
  heroH1,
  heroSubtitle,
  heroCtaPrimary,
  heroCtaSecondary,
  heroBackgroundImage,
  whoWeServeTitle,
  whoWeServeIntro,
  whoWeServeItems,
  statsTitle,
  stats[]{value, label},
  whyChooseUsTitle,
  whyChooseUsItems[]{title, description},
  ctaBannerTitle,
  ctaBannerSubtitle,
  ctaBannerButtonLabel,
  ctaBannerContactLabel,
  ctaBannerContactEmail
}`;

export const servicesPageQuery = groq`*[_type == "servicesPage"][0]{
  ${seoProjection},
  h1,
  introduction,
  footerCtaText,
  services[]{
    id,
    title,
    description,
    bullets,
    icon,
    image{image, alt}
  }
}`;

export const programsPageQuery = groq`*[_type == "programsPage"][0]{
  ${seoProjection},
  h1,
  introduction,
  footerCtaText,
  footerCtaEmail,
  programs[]{
    id,
    title,
    categoryHighlight,
    description,
    dataTable[]{label, value},
    buttonLabel
  }
}`;

export const whiteLabelPageQuery = groq`*[_type == "whiteLabelPage"][0]{
  ${seoProjection},
  heroH1,
  heroBody,
  processTitle,
  steps[]{number, title, description},
  whoIsForTitle,
  whoIsForItems,
  whatWeHandleTitle,
  whatWeHandleItems,
  confidentialityTitle,
  confidentialityBody,
  ctaTitle,
  ctaBody,
  ctaButtonLabel,
  ctaContactName,
  ctaContactEmail
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  ${seoProjection},
  h1,
  story,
  missionTitle,
  missionPillars[]{title, description},
  jeannieSectionTitle,
  jeanniePhoto,
  jeanniePhotoAlt,
  jeannieBio,
  jeannieContactProfileTitle,
  jeannieLanguages,
  jeannieSpecialization,
  jeannieBased,
  jeannieEmail,
  jeannieAvailability,
  localExpertiseTitle,
  localExpertiseBullets,
  operationalCapacityTitle,
  operationalCapacityBullets
}`;

export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  ${seoProjection},
  h1,
  introduction,
  formSectionTitle,
  formLabels{
    fullName,
    agencyCompany,
    jobTitle,
    email,
    phone,
    country,
    groupSize,
    travelDates,
    programType,
    hotelPreference,
    budgetRange,
    servicesRequired,
    specialRequirements,
    referral
  },
  programTypeOptions,
  hotelPreferenceOptions,
  budgetRangeOptions,
  servicesRequiredOptions,
  referralOptions,
  submitButtonLabel,
  directContactTitle,
  jeannieEmail,
  jeannieWhatsApp,
  jeannieResponseTime,
  jeannieWorkingHours,
  jeannieLanguages,
  jeannieLocation,
  faqSectionTitle,
  faqs[]{question, answer}
}`;

export async function fetchSanity<T>(
  query: string,
): Promise<T | null> {
  try {
    const {client} = await import("@/sanity/lib/client");
    return await client.fetch<T>(query, {}, {next: {revalidate: 60}});
  } catch {
    return null;
  }
}
