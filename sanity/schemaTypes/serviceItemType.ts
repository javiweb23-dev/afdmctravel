import {defineArrayMember, defineField, defineType} from "sanity";

export const serviceItemType = defineType({
  name: "serviceItem",
  title: "Service Item",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Anchor ID",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bullets",
      title: "Description Bullets",
      type: "array",
      of: [defineArrayMember({type: "localeString"})],
      validation: (rule) => rule.required().min(6).max(7),
    }),
    defineField({
      name: "icon",
      title: "Lucide Icon Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: "title.en", subtitle: "id"},
  },
});
