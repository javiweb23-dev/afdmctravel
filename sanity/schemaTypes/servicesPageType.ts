import {defineArrayMember, defineField, defineType} from "sanity";

export const servicesPageType = defineType({
  name: "servicesPage",
  title: "Services Page",
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
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [defineArrayMember({type: "serviceItem"})],
      validation: (rule) => rule.required().length(7),
    }),
    defineField({
      name: "footerCtaText",
      title: "Footer CTA Text",
      type: "localeText",
    }),
  ],
  preview: {
    prepare() {
      return {title: "Services Page"};
    },
  },
});
