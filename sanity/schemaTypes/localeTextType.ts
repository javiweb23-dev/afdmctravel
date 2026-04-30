import {defineField, defineType} from "sanity";

export const localeTextType = defineType({
  name: "localeText",
  title: "Localized Text",
  type: "object",
  fields: [
    defineField({name: "en", title: "English", type: "text", rows: 4}),
    defineField({name: "es", title: "Spanish", type: "text", rows: 4}),
    defineField({name: "fr_CA", title: "Français (CA)", type: "text", rows: 4}),
  ],
});
