import { defineType, defineField } from "sanity";

export const tool = defineType({
  name: "tools",
  title: "Tools",
  type: "document",

  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "logo",
      type: "image",
    }),

    defineField({
      name: "tagline",
      type: "string",
    }),

    defineField({
      name: "shortDescription",
      type: "text",
    }),

    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),

    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "pricingType",
      type: "string",
      options: {
        list: ["Free", "Freemium", "Paid"],
      },
    }),

    defineField({
      name: "startingPrice",
      type: "string",
    }),

    defineField({
      name: "features",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "website",
      type: "url",
    }),

    defineField({
      name: "affiliateLink",
      type: "url",
    }),

    defineField({
      name: "content",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
