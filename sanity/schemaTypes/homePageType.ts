import {defineArrayMember, defineField, defineType} from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
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
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "localeText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroCtaPrimary",
      title: "Hero Primary CTA",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroCtaSecondary",
      title: "Hero Secondary CTA",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroBackgroundImage",
      title: "Hero Background Image",
      type: "image",
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whoWeServeTitle",
      title: "Who We Serve Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whoWeServeIntro",
      title: "Who We Serve Intro",
      type: "localeText",
    }),
    defineField({
      name: "whoWeServeItems",
      title: "Who We Serve Items",
      type: "array",
      of: [defineArrayMember({type: "localeString"})],
      validation: (rule) => rule.required().length(9),
    }),
    defineField({
      name: "statsTitle",
      title: "Quick Stats Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stats",
      title: "Quick Stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "localeString",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "localeString",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: "value.en", subtitle: "label.en"},
          },
        }),
      ],
      validation: (rule) => rule.required().length(4),
    }),
    defineField({
      name: "whyChooseUsTitle",
      title: "Why Choose Us Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whyChooseUsItems",
      title: "Why Choose Us Reasons",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
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
            select: {title: "title.en", subtitle: "description.en"},
          },
        }),
      ],
      validation: (rule) => rule.required().length(6),
    }),
    defineField({
      name: "ctaBannerTitle",
      title: "CTA Banner Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaBannerSubtitle",
      title: "CTA Banner Subtitle",
      type: "localeText",
    }),
    defineField({
      name: "ctaBannerButtonLabel",
      title: "CTA Banner Button Label",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaBannerContactLabel",
      title: "CTA Banner Contact Label",
      type: "localeString",
    }),
    defineField({
      name: "ctaBannerContactEmail",
      title: "CTA Banner Contact Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
  ],
  preview: {
    prepare() {
      return {title: "Home Page"};
    },
  },
});
