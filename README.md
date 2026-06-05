# AppBase

AppBase is a platform to discover, compare, and explore software tools, products, and digital platforms.

It uses AI and a headless CMS to generate scalable, SEO-friendly collection pages while keeping the design fully controlled by the frontend.

---

## What This Project Is

AppBase is built as a content-driven platform where:

- AI generates structured content  
- Sanity CMS stores all content  
- Next.js renders everything dynamically  

The system is designed so that content and design are completely separated.

Content lives in Sanity.  
Design lives in the frontend.

---

## How to Run the Project

Install dependencies:

npm install  

Start development server:

npm run dev  

Then open:

http://localhost:3000  

---

## Environment Variables

Create a `.env.local` file in the root:

NEXT_PUBLIC_SANITY_DATASET=production  
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id  
SANITY_API_TOKEN=your_sanity_token  
GROQ_API_KEY=your_groq_api_key  

These are required for:

- Connecting to Sanity  
- Running AI generation  

---

## Sanity Configuration

You need a Sanity project with:

- A dataset (usually `production`)  
- An API token with Editor permission  

Also ensure:

- Dataset is publicly readable  
- CORS includes your local and production domains  

---

## Automatic Page Generation (Important)

This project is designed to generate pages automatically based on data changes.

### Product Pages

- When a new tool is added in Sanity  
- A product page is automatically available via dynamic routing  

No manual generation required  

---

### Best (Collection) Pages

- When a category has enough tools (typically 5–10)  
- A “best tools” page is generated using AI  

---

## How Generation is Triggered

In development:

You can manually trigger generation using:

/api/ai/debug/generate  

---

In production

You should set up a **Sanity webhook** to trigger generation automatically.

---

## Sanity Webhook Setup

Go to:

Sanity Dashboard → Settings → API → Webhooks  

Create a webhook:

- Name: Generate Pages  
- URL: https://your-domain.com/api/ai/debug/generate  
- Dataset: production  
- Trigger on: Create + Update  
- Filter:  
  _type == "tools" || _type == "category"

This ensures:

- When a tool is added/updated → generation runs  
- When a category changes → generation runs  

---

## Deployment

Deploy using Vercel.

After deployment:

- Add all environment variables in Vercel dashboard  
- Redeploy the project  

---

## Key Concept

AppBase is designed with a strict separation:

- Sanity → content only  
- Next.js → design only  

Because of this:

- You can change UI anytime  
- All pages update instantly  
- No need to regenerate content for design changes  

---

## Summary

- Run the project locally  
- Set environment variables  
- Add tools and categories in Sanity  
- Pages generate automatically  
- use webhook for full automation  

This allows you to scale content without manual work.
