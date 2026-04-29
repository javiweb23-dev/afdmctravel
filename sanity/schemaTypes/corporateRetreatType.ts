import {defineField, defineType} from "sanity";

export const corporateRetreatType = defineType({
  name: "corporateRetreat",
  title: "Corporate Retreat",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "focus",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "duration",
      type: "string",
    }),
    defineField({
      name: "itinerary",
      type: "array",
      of: [{type: "text"}, {type: "block"}],
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
