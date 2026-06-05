import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { generateProductPageContent } from "@/lib/ai/product-page";
import { generateBestPages } from "@/lib/ai/generate-best";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function toBlocks(text: string) {
  return [
    {
      _type: "block",
      _key: Math.random().toString(36).slice(2),
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: Math.random().toString(36).slice(2),
          text,
          marks: [],
        },
      ],
    },
  ];
}

function toList(items: string[]) {
  return items.map((item) => ({
    _type: "block",
    _key: Math.random().toString(36).slice(2),
    style: "normal",
    listItem: "bullet",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: Math.random().toString(36).slice(2),
        text: item,
        marks: [],
      },
    ],
  }));
}

export async function POST(req: Request) {
  const doc = await req.json();
  console.log("WEBHOOK DATA:", doc);

  if (!doc?._id) {
    return NextResponse.json({ ok: false });
  }

  const {
    _id,
    name,
    slug,
    shortDescription,
    features,
    pricingType,
    startingPrice,
    website,
    affiliateLink,
  } = doc;

  const existing = await sanity.fetch(
    `*[_type=="productPage" && tool._ref==$id][0]`,
    { id: _id },
  );

  if (existing) return NextResponse.json({ ok: true });

  const ai = await generateProductPageContent({
    name,
    slug: slug?.current,
    description: shortDescription,
    features,
    pricing: pricingType,
    startingPrice,
    website,
    affiliate: affiliateLink,
  });

  const content = ai.sections.map((section: any) => {
    // Features list
    if (section.title === "Key Features") {
      return {
        _key: Math.random().toString(36).slice(2),
        title: section.title,
        content: toList(section.content),
      };
    }

    // Pros & Cons
    if (section.title === "Pros & Cons") {
      return {
        _key: Math.random().toString(36).slice(2),
        title: section.title,
        content: [
          ...toBlocks("Pros"),
          ...toList(section.content.pros),
          ...toBlocks("Cons"),
          ...toList(section.content.cons),
        ],
      };
    }

    return {
      _key: Math.random().toString(36).slice(2),
      title: section.title,
      content: toBlocks(section.content),
    };
  });

  await sanity.create({
    _type: "productPage",
    tool: { _type: "reference", _ref: _id },
    title: name,
    description: shortDescription || "",
    content,
  });

  await generateBestPages();

  return NextResponse.json({ success: true });
}
