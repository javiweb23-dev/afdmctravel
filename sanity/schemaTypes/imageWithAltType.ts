import {defineField, defineType} from "sanity";

export const imageWithAltType = defineType({
  name: "imageWithAlt",
  title: "Image with Alt Text",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
  ],
});
