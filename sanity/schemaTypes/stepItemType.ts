import {defineField, defineType} from "sanity";

export const stepItemType = defineType({
  name: "stepItem",
  title: "Step Item",
  type: "object",
  fields: [
    defineField({
      name: "number",
      title: "Step Number",
      type: "string",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true;
          return ["01", "02", "03", "04", "05"].includes(value)
            ? true
            : "Step number must be 01, 02, 03, 04, or 05";
        }),
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
  ],
  preview: {
    select: {title: "title.en", subtitle: "number"},
  },
});
