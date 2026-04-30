import {defineArrayMember, defineField, defineType} from "sanity";

export const tourType = defineType({
  name: "tour",
  title: "Tour",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "localeText",
    }),
    defineField({
      name: "startingPrice",
      title: "Starting Price",
      type: "number",
    }),
    defineField({
      name: "duration",
      type: "localeString",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: {hotspot: true},
        }),
      ],
    }),
    defineField({
      name: "isPopular",
      title: "Is Popular",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      type: "seo",
    }),
  ],
});
