import {defineArrayMember, defineField, defineType} from "sanity";

export const whiteLabelPageType = defineType({
  name: "whiteLabelPage",
  title: "White Label Page",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoMeta",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroH1",
      title: "Hero H1",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroBody",
      title: "Hero Body",
      type: "localeText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "processTitle",
      title: "Process Section Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "steps",
      title: "Process Steps",
      type: "array",
      of: [defineArrayMember({type: "stepItem"})],
      validation: (rule) => rule.required().length(5),
    }),
    defineField({
      name: "whoIsForTitle",
      title: "Who Is For Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whoIsForItems",
      title: "Who Is For Items",
      type: "array",
      of: [defineArrayMember({type: "localeString"})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "whatWeHandleTitle",
      title: "What We Handle Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whatWeHandleItems",
      title: "What We Handle Items",
      type: "array",
      of: [defineArrayMember({type: "localeString"})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "confidentialityTitle",
      title: "Confidentiality Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "confidentialityBody",
      title: "Confidentiality Body",
      type: "localeText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaBody",
      title: "CTA Body",
      type: "localeText",
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "CTA Button Label",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaContactName",
      title: "CTA Contact Name",
      type: "string",
    }),
    defineField({
      name: "ctaContactEmail",
      title: "CTA Contact Email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
  ],
  preview: {
    prepare() {
      return {title: "White Label Page"};
    },
  },
});
