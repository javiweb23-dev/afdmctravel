import {defineArrayMember, defineField, defineType} from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoMeta",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "h1",
      title: "H1",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "story",
      title: "B2B Story",
      type: "localeText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "missionTitle",
      title: "Mission Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "missionPillars",
      title: "Mission Pillars",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "localeString",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "localeText",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: "title.en"},
          },
        }),
      ],
      validation: (rule) => rule.required().length(4),
    }),
    defineField({
      name: "jeannieSectionTitle",
      title: "Jeannie Section Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "jeanniePhoto",
      title: "Jeannie Photo",
      type: "image",
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "jeanniePhotoAlt",
      title: "Jeannie Photo Alt Text",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "jeannieBio",
      title: "Jeannie Bio",
      type: "localeText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "jeannieContactProfileTitle",
      title: "Jeannie Contact Profile Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "jeannieLanguages",
      title: "Jeannie Languages",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "jeannieSpecialization",
      title: "Jeannie Specialization",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "jeannieBased",
      title: "Jeannie Location",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "jeannieEmail",
      title: "Jeannie Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "jeannieAvailability",
      title: "Jeannie Availability",
      type: "localeText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "localExpertiseTitle",
      title: "Local Expertise Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "localExpertiseBullets",
      title: "Local Expertise Bullets",
      type: "array",
      of: [defineArrayMember({type: "localeString"})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "operationalCapacityTitle",
      title: "Operational Capacity Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "operationalCapacityBullets",
      title: "Operational Capacity Bullets",
      type: "array",
      of: [defineArrayMember({type: "localeString"})],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    prepare() {
      return {title: "About Page"};
    },
  },
});
