"use client";

import { useEffect, useState, useMemo } from "react";
import { sanityServer } from "@/lib/sanity-server";
import { getAllItems } from "@/lib/queries";
import Image from "next/image";
import Button from "@/components/Button";

import {
  Search,
  Flame,
  Tag,
  Clock,
  Layers,
  Monitor,
  DollarSign,
  Sparkles,
  ExternalLink,
  Info,
} from "lucide-react";

const COLORS = [
  "#0150FF",
  "#7C4DFF",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
];

export default function Page() {
  const [tools, setTools] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    sanityServer.fetch(getAllItems).then(setTools);
  }, []);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter],
    );
  };

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchSearch =
        tool.name?.toLowerCase().includes(search.toLowerCase()) ||
        tool.shortDescription?.toLowerCase().includes(search.toLowerCase());

      let matchFilters = true;

      if (activeFilters.includes("popular")) {
        matchFilters = tool.rating >= 4;
      }

      if (activeFilters.includes("deals")) {
        matchFilters = tool.pricingType === "Free";
      }

      if (activeFilters.includes("ai")) {
        matchFilters = tool.categories?.includes("ai");
      }

      return matchSearch && matchFilters;
    });
  }, [tools, search, activeFilters]);

  const clearFilters = () => {
    setSearch("");
    setActiveFilters([]);
  };

  const btn = (key: string) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm border ${
      activeFilters.includes(key)
        ? "bg-[var(--color-primary)] text-white"
        : "border-[var(--color-border)] bg-[var(--color-background)]"
    }`;

  return (
    <div className="space-y-6 container-custom">
      <div className="sticky top-[70px] z-40">
        <div className="flex flex-wrap items-center gap-3 border border-[var(--color-border)] rounded-xl p-3 bg-white">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] min-w-[220px]">
            <Search size={16} className="text-[var(--color-text-muted)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools..."
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => toggleFilter("popular")}
              className={`${btn("popular")} cursor-pointer`}
            >
              <Flame size={14} />
              Popular
            </button>

            <button
              onClick={() => toggleFilter("deals")}
              className={`${btn("deals")} cursor-pointer`}
            >
              <Tag size={14} />
              Deals
            </button>

            <button
              onClick={() => toggleFilter("new")}
              className={`${btn("new")} cursor-pointer`}
            >
              <Clock size={14} />
              New
            </button>

            <button
              onClick={() => toggleFilter("ai")}
              className={`${btn("ai")} cursor-pointer`}
            >
              <Sparkles size={14} />
              AI
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm cursor-pointer">
              <Layers size={14} />
              Categories +
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm cursor-pointer">
              <Monitor size={14} />
              Platform +
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm cursor-pointer">
              <DollarSign size={14} />
              Pricing +
            </button>
          </div>

          <div className="ml-auto flex items-center gap-3 text-sm">
            <span className="text-[var(--color-text-muted)]">
              {filteredTools.length} results
            </span>

            {(search || activeFilters.length > 0) && (
              <button
                onClick={clearFilters}
                className="text-[var(--color-primary)] font-medium cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredTools.map((tool, i) => (
          <div
            key={tool._id}
            className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-sm transition"
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

              <h3 className="text-lg font-medium mb-1">{tool.name}</h3>

              <p className="text-sm text-[var(--color-text-muted)] mb-5 line-clamp-2">
                {tool.shortDescription || "No description"}
              </p>

              <div className="flex gap-2">
                <a href={`/go/${tool.slug}`} target="_blank" className="w-full">
                  <Button className="w-full bg-[var(--color-primary)] text-white text-sm py-2 flex items-center justify-center gap-1.5">
                    <ExternalLink size={14} />
                    Visit
                  </Button>
                </a>

                <a href={`/product/${tool.slug}`} className="w-full">
                  <Button className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] text-sm py-2 flex items-center justify-center gap-1.5">
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
  );
}
