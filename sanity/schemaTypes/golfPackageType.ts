import {defineArrayMember, defineField, defineType} from "sanity";

export const golfPackageType = defineType({
  name: "golfPackage",
  title: "Golf Package",
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
      name: "detailedDescription",
      title: "Detailed Description",
      type: "localePortableText",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "localeString",
    }),
    defineField({
      name: "includes",
      title: "Includes",
      type: "array",
      of: [defineArrayMember({type: "localeString"})],
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "seo",
      type: "seo",
    }),
  ],
});
