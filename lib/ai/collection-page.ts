import Groq from "groq-sdk";
import crypto from "crypto";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function runAI(prompt: string, max_tokens: number): Promise<string> {
  try {
    const res = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
      max_tokens,
    });
    return res.choices[0]?.message?.content?.trim() || "";
  } catch {
    return "";
  }
}

export function parseToPortableText(raw: string) {
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const blocks: any[] = [];

  for (const line of lines) {
    if (line.startsWith("##HEADING##")) {
      const text = line.replace("##HEADING##", "").trim();
      if (!text) continue;
      blocks.push({
        _type: "block",
        _key: crypto.randomUUID(),
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: crypto.randomUUID(),
            text,
            marks: ["strong"],
          },
        ],
      });
    } else if (line.startsWith("##TEXT##")) {
      const text = line.replace("##TEXT##", "").trim();
      if (!text) continue;
      blocks.push({
        _type: "block",
        _key: crypto.randomUUID(),
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: crypto.randomUUID(),
            text,
            marks: [],
          },
        ],
      });
    }
  }

  return blocks;
}

export async function generateBaseContent(data: {
  title: string;
  category: string;
}) {
  const whatIs = await runAI(
    `You are a senior editor at a SaaS review publication. Write an honest explanation of what "${data.category}" tools are.

2 paragraphs. Write as much as the topic genuinely needs — not padded, not artificially short.

Paragraph 1: What these tools do, the core problem they solve, and real use cases across different team types.
Paragraph 2: What separates a good ${data.category} tool from a bad one — think onboarding, pricing model, feature depth, integration quality.

No markdown. No cliche openers like "In today's world".`,
    400,
  );

  const howWeChose = await runAI(
    `You are a senior editor at a SaaS review publication. Explain how you selected the best ${data.category} tools for this list.

2 paragraphs. Write what genuinely needs to be said.

Paragraph 1: What you tested and how — real usage scenarios, not a checkbox evaluation.
Paragraph 2: The specific factors that moved tools up or down the list. Be direct.

No markdown. No filler.`,
    380,
  );

  const final = await runAI(
    `You are a senior editor at a SaaS review publication. Write practical closing advice for someone choosing a ${data.category} tool.

2-3 paragraphs depending on how much useful guidance the topic allows.

Cover: how to narrow down by team size or use case, what to do if still unsure, one concrete decision framework.

No markdown. No generic endings. Be direct.`,
    420,
  );

  return {
    whatIs:
      whatIs ||
      `${data.category} tools help teams manage work more effectively across different use cases and team sizes.`,
    howWeChose:
      howWeChose ||
      `We evaluated ${data.category.toLowerCase()} tools based on real-world usability, pricing, and feature depth.`,
    final:
      final ||
      `The best ${data.category.toLowerCase()} tool depends on how your team works and what you actually need day to day.`,
  };
}

export async function generateToolContent(data: {
  toolName: string;
  description?: string;
  category: string;
  features?: string[];
  pricingType?: string;
  startingPrice?: string;
  tags?: string[];
}) {
  const featuresText = data.features?.length
    ? `Features: ${data.features.join(", ")}`
    : "";
  const pricingText = data.pricingType
    ? `Pricing: ${data.pricingType}${data.startingPrice ? ` (from ${data.startingPrice})` : ""}`
    : "";
  const tagsText = data.tags?.length ? `Tags: ${data.tags.join(", ")}` : "";

  const text = await runAI(
    `You are a senior editor writing a review for a ${data.category} tool. Be specific, honest, and direct. No marketing language.

Tool: ${data.toolName}
${data.description ? `Description: ${data.description}` : ""}
${featuresText}
${pricingText}
${tagsText}

Write the review in EXACTLY this structure. Every line must start with ##TEXT## or ##HEADING##:

##TEXT## [2-3 sentences: what this tool does, its positioning, and who it is built for — be specific]
##TEXT## [2-3 sentences: genuine strengths — name actual features or real capabilities, not vague praise]
##TEXT## [1-2 sentences: honest limitations — who should avoid it and why]

##HEADING## Best for
##TEXT## [2-4 specific use cases or team types that genuinely benefit from this tool]

##HEADING## Not ideal if
##TEXT## [2-3 specific situations or team types where this tool falls short]

##HEADING## Real-world example
##TEXT## [1 concrete scenario showing how a real team would use this tool day to day]

##HEADING## Team fit
##TEXT## [which team sizes and roles this works best for, and which it does not]

##HEADING## Onboarding reality
##TEXT## [how long it actually takes to get productive, what the learning curve feels like]

##HEADING## Pricing friction
##TEXT## [what the free plan actually gives you, where the real cost starts, and whether it is worth it]

STRICT RULES:
- Follow the structure above exactly — all 6 sub-sections must be present
- Every line starts with ##TEXT## or ##HEADING## — no exceptions
- Do not repeat the tool name in the content
- No markdown, asterisks, or special characters`,
    700,
  );

  return {
    name: data.toolName,
    content: text,
  };
}
