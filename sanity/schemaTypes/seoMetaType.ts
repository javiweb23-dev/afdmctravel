import {defineField, defineType} from "sanity";

type LocaleValue = {en?: string; es?: string; fr?: string};

const validateLocaleMaxLength = (max: number, localeTitle: string) =>
  (value: LocaleValue | undefined) => {
    if (!value) return true;
    const locales: Array<{key: keyof LocaleValue; title: string}> = [
      {key: "en", title: "English"},
      {key: "es", title: "Español"},
      {key: "fr", title: "Français"},
    ];
    for (const {key, title} of locales) {
      const text = value[key];
      if (text && text.length > max) {
        return `${localeTitle}: ${title} must be at most ${max} characters`;
      }
    }
    return true;
  };

export const seoMetaType = defineType({
  name: "seoMeta",
  title: "SEO Meta",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "localeString",
      validation: (rule) =>
        rule.custom((value) => validateLocaleMaxLength(60, "Meta Title")(value as LocaleValue | undefined)),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "localeText",
      validation: (rule) =>
        rule.custom((value) =>
          validateLocaleMaxLength(160, "Meta Description")(value as LocaleValue | undefined),
        ),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: {hotspot: true},
    }),
  ],
});
