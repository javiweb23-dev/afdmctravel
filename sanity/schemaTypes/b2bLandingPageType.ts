import {defineArrayMember, defineField, defineType} from "sanity";

export const b2bLandingPageType = defineType({
  name: "b2bLandingPage",
  title: "B2B Landing Page",
  type: "document",
  fields: [
    defineField({
      name: "headerMenu",
      title: "Header Menu",
      type: "array",
      of: [defineArrayMember({type: "localeString"})],
      validation: (rule) => rule.min(6).max(6),
    }),
    defineField({name: "headerButton", title: "Header Button", type: "localeString"}),
    defineField({name: "heroTitle", title: "Hero Title", type: "localeString"}),
    defineField({name: "heroSubtitle", title: "Hero Subtitle", type: "localeText"}),
    defineField({name: "heroBody", title: "Hero Body", type: "localeText"}),
    defineField({name: "heroCtaPrimary", title: "Hero CTA Primary", type: "localeString"}),
    defineField({name: "heroCtaSecondary", title: "Hero CTA Secondary", type: "localeString"}),
    defineField({name: "heroContact", title: "Hero Contact", type: "localeString"}),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {hotspot: true},
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({name: "value", title: "Value", type: "localeString"}),
            defineField({name: "label", title: "Label", type: "localeString"}),
          ],
        }),
      ],
      validation: (rule) => rule.min(4).max(4),
    }),
    defineField({name: "whoWeServeTitle", title: "Who We Serve Title", type: "localeString"}),
    defineField({
      name: "whoWeServeItems",
      title: "Who We Serve Items",
      type: "array",
      of: [defineArrayMember({type: "localeString"})],
      validation: (rule) => rule.min(9),
    }),
    defineField({name: "servicesTitle", title: "Services Title", type: "localeString"}),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({name: "title", title: "Title", type: "localeString"}),
            defineField({name: "description", title: "Description", type: "localeText"}),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {hotspot: true},
            }),
          ],
        }),
      ],
      validation: (rule) => rule.min(7).max(7),
    }),
    defineField({name: "whiteLabelTitle", title: "White Label Title", type: "localeString"}),
    defineField({name: "whiteLabelBody", title: "White Label Body", type: "localeText"}),
    defineField({
      name: "whiteLabelItems",
      title: "White Label Items",
      type: "array",
      of: [defineArrayMember({type: "localeString"})],
      validation: (rule) => rule.min(4),
    }),
    defineField({
      name: "whiteLabelImage",
      title: "White Label Image",
      type: "image",
      options: {hotspot: true},
    }),
    defineField({name: "sampleProgramsTitle", title: "Sample Programs Title", type: "localeString"}),
    defineField({
      name: "samplePrograms",
      title: "Sample Programs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({name: "title", title: "Title", type: "localeString"}),
            defineField({name: "description", title: "Description", type: "localeText"}),
            defineField({
              name: "bullets",
              title: "Bullets",
              type: "array",
              of: [defineArrayMember({type: "localeString"})],
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {hotspot: true},
            }),
          ],
        }),
      ],
      validation: (rule) => rule.min(4).max(4),
    }),
    defineField({name: "whyPartnerTitle", title: "Why Partner Title", type: "localeString"}),
    defineField({
      name: "whyPartnerItems",
      title: "Why Partner Items",
      type: "array",
      of: [defineArrayMember({type: "localeString"})],
      validation: (rule) => rule.min(5),
    }),
    defineField({
      name: "whyPartnerGallery",
      title: "Why Partner Gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: {hotspot: true},
        }),
      ],
      validation: (rule) => rule.min(3),
    }),
    defineField({name: "leadTitle", title: "Lead Form Title", type: "localeString"}),
    defineField({name: "leadSubtitle", title: "Lead Form Subtitle", type: "localeText"}),
    defineField({name: "submitLabel", title: "Submit Label", type: "localeString"}),
    defineField({
      name: "companyTypeOptions",
      title: "Company Type Options",
      type: "array",
      of: [defineArrayMember({type: "localeString"})],
    }),
    defineField({
      name: "eventTypeOptions",
      title: "Event Type Options",
      type: "array",
      of: [defineArrayMember({type: "localeString"})],
    }),
    defineField({
      name: "serviceOptions",
      title: "Service Options",
      type: "array",
      of: [defineArrayMember({type: "localeString"})],
    }),
    defineField({
      name: "budgetOptions",
      title: "Budget Options",
      type: "array",
      of: [defineArrayMember({type: "localeString"})],
    }),
    defineField({name: "faqsTitle", title: "FAQs Title", type: "localeString"}),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({name: "question", title: "Question", type: "localeString"}),
            defineField({name: "answer", title: "Answer", type: "localeText"}),
          ],
        }),
      ],
      validation: (rule) => rule.min(8).max(8),
    }),
  ],
  preview: {
    prepare() {
      return {title: "B2B Landing Page"};
    },
  },
});
