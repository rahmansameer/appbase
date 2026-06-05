import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateProductPageContent(data: {
  name: string;
  description?: string;
  features?: string[];
  pricing?: string;
  website?: string;
  affiliate?: string;
  slug: string;
  startingPrice?: string;
}) {
  const prompt = `
You are an expert SaaS product reviewer writing high-quality product pages.

Write a structured, natural, and detailed product review.

Product Name: ${data.name}
Slug: ${data.slug}
Description: ${data.description || ""}
Features: ${data.features?.join(", ") || ""}
Pricing Type: ${data.pricing || ""}
Starting Price: ${data.startingPrice || ""}
Website: ${data.website || ""}
Affiliate Link: ${data.affiliate || ""}

CORE RULES:

- Write like a real human, not robotic or overly formal
- No emojis
- No unnecessary symbols or decorative characters
- No markdown formatting like ** or *
- Keep writing clean, modern, and easy to read

CONTENT RULES:

- Overview must clearly explain what the product does and who it is for (minimum 5–6 lines)
- Avoid generic openings like "this tool is designed to"
- Be specific, practical, and realistic

- Key Features MUST be an array
- Each feature must have a short explanation (1–2 lines)
- Do not repeat the same idea

- Pricing:
  - MUST use provided pricing data
  - If pricing exists → explain it clearly
  - If both pricing type and starting price exist → combine naturally
  - If missing → say "Pricing information is not available"

- Pros & Cons:
  - Must feel real and balanced
  - Avoid generic statements
  - Focus on practical advantages and limitations

- Final Thoughts:
  - Give a clear recommendation
  - Mention who should use it and why
  - Keep it natural and confident

WRITING STYLE:

- Natural, slightly conversational tone
- Avoid repeating the product name too frequently
- Do not use filler words
- Keep sentences clean and readable
- Avoid repeating the same idea in different ways

LINKING RULES:

- Do NOT output raw URLs
- Do NOT add direct links in text
- If mentioning the product, write naturally like:
  "You can explore it on the official website"
  "You can get started directly from the platform"

- Do NOT force links
- Only mention naturally when relevant

SEO RULES:

- Naturally include relevant keywords based on the product name and category
- Include variations of the product name (e.g. "Trello tool", "Trello platform")
- Do NOT stuff keywords unnaturally
- Keep it natural and readable

- Overview must include what the tool is used for (important for search intent)
- Try to match real user intent (e.g. task management, automation, AI writing, etc.)

- Write content that answers:
  - What is it?
  - Who is it for?
  - Why should someone use it?

DATA USAGE RULES:

- Always prioritize given data (description, features, pricing)
- Do NOT hallucinate unknown details
- If something is missing → clearly say it's not available

QUALITY RULES:

- Avoid generic AI phrases
- Avoid repetition
- Write like a real product review found on a professional website
- Focus on real-world usage and value

ANTI-DUPLICATION RULES:

- Do NOT repeat the same sentence structure across sections
- Avoid using the same phrases like:
  "This tool is designed to..."
  "It helps users to..."
  "Overall, this tool..."

- Each section must feel slightly different in tone and structure
- Avoid repeating the same idea multiple times

- Make the content feel unique even if tools are similar
- Vary sentence openings and writing patterns

- Avoid generic AI-style writing
- Write like a real human who has used the product

- Use different writing styles for different products
- Sometimes start with use-case, sometimes with problem, sometimes with benefit

- Do not reuse patterns from previous outputs

OUTPUT STRICT JSON FORMAT:

{
  "sections": [
    {
      "title": "Overview",
      "content": "detailed paragraph..."
    },
    {
      "title": "Key Features",
      "content": ["feature explanation...", "feature explanation..."]
    },
    {
      "title": "Pricing",
      "content": "clear explanation..."
    },
    {
      "title": "Pros & Cons",
      "content": {
        "pros": ["..."],
        "cons": ["..."]
      }
    },
    {
      "title": "Final Verdict",
      "content": "final recommendation..."
    }
  ]
}
`;

  const res = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const text = res.choices[0]?.message?.content || "";

  const clean = text
    .replace(/```json|```/g, "")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .trim();

  try {
    return JSON.parse(clean);
  } catch (error) {
    console.error("Failed to parse AI response");
    return { sections: [] };
  }
}
