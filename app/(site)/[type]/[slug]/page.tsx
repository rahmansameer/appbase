import { sanityServer } from "@/lib/sanity-server";
import { getCollectionBySlug } from "@/lib/queries";
import { notFound } from "next/navigation";
import ContentLayout from "@/components/ContentLayout";
import Button from "@/components/Button";
import { PortableText } from "@portabletext/react";
import { ExternalLink } from "lucide-react";

const components = {
  block: {
    normal: ({ children, value }: any) => {
      const hasStrong = value?.children?.some((c: any) =>
        c.marks?.includes("strong"),
      );

      if (hasStrong) {
        return (
          <p className="text-[16px] font-medium text-[#0f172a] mt-6 mb-1">
            {children}
          </p>
        );
      }

      return <p className="leading-[1.8] text-[#475569] mb-3">{children}</p>;
    },
  },
};

export async function generateMetadata({ params }: any) {
  const { slug, type } = await params;
  const collection = await sanityServer.fetch(getCollectionBySlug, { slug });

  if (!collection || collection.type !== type) return {};

  return {
    title: collection.seoTitle || `${collection.title} | Appbase`,
    description: collection.seoDescription || collection.description || "",
  };
}

export default async function Page({ params }: any) {
  const { slug } = await params;
  const collection = await sanityServer.fetch(getCollectionBySlug, { slug });

  if (!collection) return notFound();

  const tools = collection.tools || [];
  const content = collection.content || [];

  const finalSection = content.find((c: any) =>
    c.title?.toLowerCase().includes("final"),
  );

  const toolSections = content.filter(
    (c: any) =>
      c !== finalSection && tools.some((t: any) => t.name === c.title),
  );

  const baseSections = content.filter(
    (c: any) =>
      c !== finalSection && !tools.some((t: any) => t.name === c.title),
  );

  const toolMap = Object.fromEntries(tools.map((t: any) => [t.name, t]));

  return (
    <ContentLayout>
      {tools.length > 0 && (
        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-lg font-medium">Tools Mentioned</h2>
              <span className="text-sm text-[var(--color-text-muted)]">
                Essential tools to enhance your workflow
              </span>
            </div>
            <div className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-600">
              Expert-curated selection
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {tools.map((tool: any) => (
              <div
                key={tool._id}
                className="flex items-center justify-between gap-4 border border-[var(--color-border)] bg-[var(--color-gray-50)] rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-[var(--color-gray-100)] border border-[var(--color-border)]">
                    {tool.logo ? (
                      <img
                        src={tool.logo}
                        alt={tool.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm font-medium">
                        {tool.name?.[0]}
                      </div>
                    )}
                  </div>
                  <span className="text-base font-medium truncate">
                    {tool.name}
                  </span>
                </div>
                <a href={`/go/${tool.slug}`}>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-sm bg-white">
                    <ExternalLink size={14} />
                    View
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {baseSections.map((section: any, i: number) => (
        <div
          key={i}
          className="bg-white border border-[var(--color-border)] rounded-2xl px-8 py-8"
        >
          <h2 className="text-[30px] font-medium mb-8">{section.title}</h2>
          <PortableText value={section.content} components={components} />
        </div>
      ))}

      {toolSections.map((section: any, i: number) => {
        const tool = toolMap[section.title];
        return (
          <div key={i} className="flex flex-col gap-0">
            <div className="bg-white border border-[var(--color-border)] rounded-t-2xl px-8 py-8">
              <h2 className="text-[24px] font-semibold mb-6">
                {section.title}
              </h2>
              <PortableText value={section.content} components={components} />
            </div>

            {tool && (
              <div className="border border-t-0 border-[var(--color-border)] rounded-b-2xl px-6 py-4 flex items-center justify-between bg-white">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-[var(--color-border)] bg-white">
                    {tool.logo ? (
                      <img
                        src={tool.logo}
                        alt={tool.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm font-medium">
                        {tool.name?.[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0f172a]">
                      {tool.name}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] line-clamp-1">
                      {tool.shortDescription}
                    </p>
                  </div>
                </div>
                <a href={`/go/${tool.slug}`} target="_blank">
                  <Button className="bg-[var(--color-primary)] text-white px-4 py-2 text-sm flex items-center gap-1">
                    <ExternalLink size={14} />
                    Visit
                  </Button>
                </a>
              </div>
            )}
          </div>
        );
      })}

      {finalSection && (
        <div className="bg-white border border-[var(--color-border)] rounded-2xl px-8 py-8">
          <h2 className="text-[30px] font-medium mb-8">{finalSection.title}</h2>
          <PortableText value={finalSection.content} components={components} />
        </div>
      )}
    </ContentLayout>
  );
}
