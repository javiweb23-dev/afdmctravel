import {defineField, defineType} from "sanity";

export const agencyRegistrationPageType = defineType({
  name: "agencyRegistrationPage",
  title: "Agency Registration Page",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoMeta",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {hotspot: true},
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
  ],
  preview: {
    prepare() {
      return {title: "Agency Registration Page"};
    },
  },
});
