import { sanityServer } from "@/lib/sanity-server";
import { notFound, redirect } from "next/navigation";

export default async function GoPage({ params }: any) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const tool = await sanityServer.fetch(
    `*[_type == "tools" && slug.current == $slug][0]{
      affiliateLink
    }`,
    { slug: slug }
  );

  if (!tool || !tool.affiliateLink) {
    return notFound();
  }

  redirect(tool.affiliateLink);
}