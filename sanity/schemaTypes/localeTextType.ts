import {defineField, defineType} from "sanity";

export const localeTextType = defineType({
  name: "localeText",
  title: "Localized Text",
  type: "object",
  fields: [
    defineField({name: "en", title: "English", type: "text", rows: 4}),
    defineField({name: "es", title: "Español", type: "text", rows: 4}),
    defineField({name: "fr", title: "Français", type: "text", rows: 4}),
  ],
});
