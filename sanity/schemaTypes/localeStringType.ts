import {defineField, defineType} from "sanity";

export const localeStringType = defineType({
  name: "localeString",
  title: "Localized String",
  type: "object",
  fields: [
    defineField({name: "en", title: "English", type: "string"}),
    defineField({name: "es", title: "Español", type: "string"}),
    defineField({name: "fr", title: "Français", type: "string"}),
  ],
});
