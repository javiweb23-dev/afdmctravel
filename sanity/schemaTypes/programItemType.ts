import {defineArrayMember, defineField, defineType} from "sanity";

export const programItemType = defineType({
  name: "programItem",
  title: "Program Item",
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
      name: "categoryHighlight",
      title: "Category Highlight",
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
      name: "dataTable",
      title: "Data Table",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "localeString",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "localeText",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: "label.en", subtitle: "value.en"},
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "buttonLabel",
      title: "Button Label",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: "title.en", subtitle: "id"},
  },
});
