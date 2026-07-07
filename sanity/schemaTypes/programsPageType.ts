import {defineArrayMember, defineField, defineType} from "sanity";

export const programsPageType = defineType({
  name: "programsPage",
  title: "Programs Page",
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
      name: "introduction",
      title: "Introduction",
      type: "localeText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "programs",
      title: "Programs",
      type: "array",
      of: [defineArrayMember({type: "programItem"})],
      validation: (rule) => rule.required().length(4),
    }),
    defineField({
      name: "footerCtaText",
      title: "Footer CTA Text",
      type: "localeText",
    }),
    defineField({
      name: "footerCtaEmail",
      title: "Footer CTA Email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
  ],
  preview: {
    prepare() {
      return {title: "Programs Page"};
    },
  },
});
