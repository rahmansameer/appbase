import { NextResponse } from "next/server";
import { generateBestPages } from "@/lib/ai/generate-best";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function GET() {
  await generateBestPages();

  return NextResponse.json({ ok: true });
}
