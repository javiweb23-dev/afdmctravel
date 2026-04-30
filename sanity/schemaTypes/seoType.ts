import {defineField, defineType} from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
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
  ],
});
