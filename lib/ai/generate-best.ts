import { createClient } from "@sanity/client";
import {
  generateBaseContent,
  generateToolContent,
  parseToPortableText,
} from "@/lib/ai/collection-page";
import crypto from "crypto";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function toBlocks(text: string) {
  if (!text) return [];

  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => ({
      _type: "block",
      _key: crypto.randomUUID(),
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: crypto.randomUUID(),
          text: line,
          marks: [],
        },
      ],
    }));
}

export async function generateBestPages() {
  const categories = await sanity.fetch(
    `*[_type=="category"]{_id,title,"slug":slug.current}`,
  );

  for (const category of categories) {
    const tools = await sanity.fetch(
      `*[_type=="tools" && references($catId)]{
        _id,
        name,
        "slug": slug.current,
        shortDescription,
        features,
        pricingType,
        startingPrice,
        tags,
        website,
        affiliateLink,
        "logo": logo.asset->url
      }`,
      { catId: category._id },
    );

    if (!tools || tools.length < 5) continue;

    const uniqueTools = Array.from(
      new Map(tools.map((t: any) => [t.name, t])).values(),
    );

    const topTools = uniqueTools.slice(0, 10) as any[];

    const base = await generateBaseContent({
      title: `Best ${category.title} software`,
      category: category.title,
    });

    const toolSections = [];

    for (const tool of topTools) {
      const aiTool = await generateToolContent({
        toolName: tool.name,
        description: tool.shortDescription,
        category: category.title,
        features: tool.features,
        pricingType: tool.pricingType,
        startingPrice: tool.startingPrice,
        tags: tool.tags,
      });

      if (!aiTool?.content || aiTool.content.length < 50) continue;

      const portableBlocks = parseToPortableText(aiTool.content);

      if (portableBlocks.length === 0) continue;

      toolSections.push({
        _type: "object",
        _key: crypto.randomUUID(),
        title: tool.name,
        content: portableBlocks,
      });
    }

    if (toolSections.length === 0) continue;

    const existing = await sanity.fetch(
      `*[_type=="collection" && type=="best" && category._ref==$catId]`,
      { catId: category._id },
    );

    for (const doc of existing) {
      await sanity.delete(doc._id);
    }

    await sanity.create({
      _type: "collection",
      title: `Best ${category.title}`,
      slug: {
        _type: "slug",
        current: `${category.slug}-software`,
      },
      type: "best",
      category: { _type: "reference", _ref: category._id },
      seoTitle: `Best ${category.title} Tools (${new Date().getFullYear()})`,
      seoDescription: `Discover the best ${category.title.toLowerCase()} tools for different use cases.`,
      tools: topTools.map((t: any) => ({
        _type: "reference",
        _ref: t._id,
      })),
      content: [
        {
          _type: "object",
          _key: crypto.randomUUID(),
          title: `What is ${category.title} software?`,
          content: toBlocks(base.whatIs),
        },
        {
          _type: "object",
          _key: crypto.randomUUID(),
          title: "How We Chose These Tools",
          content: toBlocks(base.howWeChose),
        },
        ...toolSections,
        {
          _type: "object",
          _key: crypto.randomUUID(),
          title: "Final Thoughts",
          content: toBlocks(base.final),
        },
      ],
    });
  }
}
