import {defineField, defineType} from "sanity";

export const faqItemType = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "localeText",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: "question.en"},
  },
});
