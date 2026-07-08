import {defineField, defineType} from "sanity";

export const seoMetaType = defineType({
  name: "seoMeta",
  title: "SEO Meta",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "localeString",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "localeText",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: {hotspot: true},
    }),
  ],
});
