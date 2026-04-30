import {defineField, defineType} from "sanity";

export const localeStringType = defineType({
  name: "localeString",
  title: "Localized String",
  type: "object",
  fields: [
    defineField({name: "en", title: "English", type: "string"}),
    defineField({name: "es", title: "Spanish", type: "string"}),
    defineField({name: "fr_CA", title: "Français (CA)", type: "string"}),
  ],
});
