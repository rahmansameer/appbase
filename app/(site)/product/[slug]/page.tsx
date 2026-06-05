import { sanityServer } from "@/lib/sanity-server";
import { getProductPageBySlug } from "@/lib/queries";
import { notFound } from "next/navigation";
import ContentLayout from "@/components/ContentLayout";
import { PortableText } from "@portabletext/react";
import { ExternalLink } from "lucide-react";

export async function generateMetadata({ params }: any) {
  const { slug } = await params;

  const product = await sanityServer.fetch(getProductPageBySlug, { slug });

  if (!product) return {};

  return {
    title: `${product.title} | Appbase`,
    description: product.description,
  };
}

export default async function Page({ params }: any) {
  const { slug } = await params;

  const product = await sanityServer.fetch(getProductPageBySlug, { slug });

  if (!product) return notFound();

  const { tool } = product;

  const components = {
    block: {
      normal: ({ children }: any) => (
        <p className="leading-[1.8]">{children}</p>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc pl-6 space-y-2">{children}</ul>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className="leading-[1.8]">{children}</li>
      ),
    },
    marks: {
      strong: ({ children }: any) => (
        <strong className="font-medium text-[#0f172a]">{children}</strong>
      ),
      link: ({ value, children }: any) => {
        const isInternal = value?.href?.startsWith("/");

        return (
          <a
            href={value?.href}
            className="text-[var(--color-primary)] underline"
            {...(!isInternal && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
          >
            {children}
          </a>
        );
      },
    },
  };

  return (
    <ContentLayout>
      <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 mt-8">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          {/* LEFT */}
          <div className="flex items-start gap-4">
            {/* LOGO */}
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-[var(--color-gray-100)] border border-[var(--color-border)] flex items-center justify-center shrink-0">
              {tool?.logo ? (
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg font-medium text-[#0f172a]">
                  {tool?.name?.[0]}
                </span>
              )}
            </div>

            {/* INFO */}
            <div className="max-w-md">
              <h1 className="text-xl font-semibold text-[#0f172a] leading-tight">
                {tool?.name}
              </h1>

              <p className="text-sm text-[var(--color-text-muted)] mt-1 leading-relaxed">
                {tool?.tagline || "No description available"}
              </p>

              {/* META TAGS */}
              <div className="flex gap-2 mt-3 flex-wrap">
                {tool?.pricingType && (
                  <span className="text-xs px-2.5 py-1 rounded-md bg-[var(--color-gray-100)] text-[#0f172a] font-medium">
                    {tool.pricingType}
                  </span>
                )}

                {tool?.startingPrice && (
                  <span className="text-xs px-2.5 py-1 rounded-md bg-[var(--color-gray-100)] text-[#0f172a] font-medium">
                    {tool.startingPrice}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-end gap-3">
            <a href={tool?.affiliateLink || tool?.website}>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-medium text-[#0f172a] hover:bg-[var(--color-gray-50)] transition">
                <ExternalLink size={14} />
                Visit
              </div>
            </a>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-6 pt-5 border-t border-[var(--color-border)] flex items-center justify-between flex-wrap gap-4 text-sm text-[var(--color-text-muted)]">
          <div className="flex items-center gap-5 flex-wrap">
            <a
              href={tool?.affiliateLink || tool?.website}
              className="flex items-center gap-2 hover:text-[#0f172a] transition"
            >
              <ExternalLink size={14} />
              <span>Official website</span>
            </a>

            {tool?.pricingType && (
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--color-text-muted)] rounded-full"></span>
                <span>{tool.pricingType}</span>
              </div>
            )}
          </div>

          <span className="text-xs">Product overview</span>
        </div>
      </div>

      {product.content?.map((item: any, i: number) => (
        <div
          key={i}
          className="bg-white border border-[var(--color-border)] rounded-2xl px-8 py-8"
        >
          <h2 className="text-[30px] leading-[1.2] font-medium text-[#0f172a] mb-8">
            {item.title}
          </h2>

          {item.title === "Key Features" ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {item.content.map((block: any, i: number) => {
                const text = block.children?.[0]?.text || "";

                return (
                  <div
                    key={i}
                    className="border border-[var(--color-border)] rounded-xl p-4 bg-[var(--color-gray-50)]"
                  >
                    <p className="text-sm leading-[1.6] text-[#334155]">
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : item.title === "Pros & Cons" ? (
            (() => {
              const consIndex = item.content.findIndex(
                (b: any) => b.children?.[0]?.text === "Cons",
              );

              const pros =
                consIndex !== -1
                  ? item.content.slice(1, consIndex)
                  : item.content;

              const cons =
                consIndex !== -1 ? item.content.slice(consIndex + 1) : [];

              return (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                    <h3 className="text-green-700 font-medium mb-3">Pros</h3>
                    <PortableText value={pros} components={components} />
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                    <h3 className="text-red-700 font-medium mb-3">Cons</h3>
                    <PortableText value={cons} components={components} />
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="space-y-7 text-[16px] leading-[1.8] text-[#475569]">
              <PortableText value={item.content} components={components} />
            </div>
          )}
        </div>
      ))}
    </ContentLayout>
  );
}
