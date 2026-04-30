import {defineArrayMember, defineField, defineType} from "sanity";

export const localePortableTextType = defineType({
  name: "localePortableText",
  title: "Localized Portable Text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [defineArrayMember({type: "block"})],
    }),
    defineField({
      name: "es",
      title: "Spanish",
      type: "array",
      of: [defineArrayMember({type: "block"})],
    }),
    defineField({
      name: "fr_CA",
      title: "Français (CA)",
      type: "array",
      of: [defineArrayMember({type: "block"})],
    }),
  ],
});
