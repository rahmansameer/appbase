"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sanityServer } from "@/lib/sanity-server";
import { getToolsQuery } from "@/lib/queries";
import Button from "@/components/Button";
import { ExternalLink } from "lucide-react";
import { Info } from "lucide-react";

const COLORS = [
  "#0150FF",
  "#7C4DFF",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
  "#8B5CF6",
  "#10B981",
  "#F97316",
  "#EC4899",
];

export default function LatestTools() {
  const [tools, setTools] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sanityServer
      .fetch(
        `*[_type == "tools"]{
      _id,
      name,
      "slug": slug.current,
      shortDescription,
      "logo": logo.asset->url
    }`,
      )
      .then((data) => {
        console.log(data);
        setTools(data.slice(0, 10));
      });
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section>
      <div className="container-custom">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-medium">Latest Tools</h2>

          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] hover:bg-[var(--color-surface)] transition"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>

            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] hover:bg-[var(--color-surface)] transition"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {tools.map((tool, i) => (
            <div
              key={tool._id}
              className="min-w-[260px] bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-sm transition"
            >
              <div
                className="h-1.5 w-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />

              <div className="p-5">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-[var(--color-gray-100)] mb-4 relative border border-[var(--color-border)]">
                  {tool.logo ? (
                    <Image
                      src={tool.logo}
                      alt={tool.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm font-medium">
                      {tool.name?.[0]}
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-medium mb-1">{tool.name}</h3>

                <p className="text-sm text-[var(--color-text-muted)] mb-5 line-clamp-2">
                  {tool.shortDescription || "No description"}
                </p>

                <div className="flex gap-2">
                  <a
                    href={`/go/${tool.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm py-2">
                      <ExternalLink size={14} />
                      Visit
                    </Button>
                  </a>

                  <a href={`/product/${tool.slug}`} className="w-full">
                    <Button className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] text-sm py-2">
                      <Info size={14} />
                      Details
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
