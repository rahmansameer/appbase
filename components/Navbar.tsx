"use client";

import Button from "./Button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Store } from "lucide-react";
import { BellRing } from "lucide-react";
import { sanityServer } from "@/lib/sanity-server";
import { Wrench, FileText } from "lucide-react";

const DotGridIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
    {[2, 8, 14].map((y) =>
      [2, 8, 14].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.2" />),
    )}
  </svg>
);

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [tools, setTools] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    sanityServer
      .fetch(
        `*[_type=="tools"]{name,"slug":slug.current,"logo":logo.asset->url}`,
      )
      .then(setTools);

    sanityServer
      .fetch(`*[_type=="collection"]{title,"slug":slug.current,type}`)
      .then(setPages);
  }, []);

  const filteredTools = useMemo(() => {
    if (!query) return [];
    return tools
      .filter((t) => t.name?.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  }, [query, tools]);

  const filteredPages = useMemo(() => {
    if (!query) return [];
    return pages
      .filter((p) => p.title?.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  }, [query, pages]);

  const hasResults = filteredTools.length > 0 || filteredPages.length > 0;

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-[var(--color-background)] border-b border-[var(--color-border)]">
      <div className="container-custom h-16 flex items-center justify-between gap-6">
        {/* LEFT */}
        <div className="flex items-center gap-6">
          <a href="/">
            <Image
              src="/appbase.svg"
              alt="logo"
              width={32}
              height={32}
              style={{ height: "27px", width: "auto" }}
            />
          </a>

          <div className="hidden lg:flex items-center gap-6 text-sm">
            <Link href="/explore" className="flex items-center gap-2 group">
              <DotGridIcon />
              <span className="font-medium group-hover:text-[var(--color-primary)] transition">
                Explore Tools
              </span>
              <span className="ml-1 text-[11px] px-2 py-[2px] rounded-full bg-green-600 text-white">
                28 New
              </span>
            </Link>

            <Link href="/pricing" className="flex items-center gap-2 group">
              <span className="font-medium group-hover:text-[var(--color-primary)] transition">
                Pricing
              </span>
              <span className="ml-1 text-[11px] px-2 py-[2px] rounded-full bg-red-500 text-white">
                50% Off
              </span>
            </Link>
          </div>
        </div>

        {/* SEARCH */}
        <div className="flex-1 max-w-md hidden lg:flex relative">
          <div className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--color-border)]">
            <Search size={16} className="text-[var(--color-text-muted)]" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, tools, or workflows..."
              className="w-full bg-transparent outline-none text-sm placeholder:text-[var(--color-text-muted)]"
            />
          </div>

          {/* DROPDOWN */}
          {query && hasResults && (
            <div className="absolute top-full mt-2 w-full bg-white border border-[var(--color-border)] rounded-lg p-3">
              {/* TOOLS */}
              {filteredTools.length > 0 && (
                <>
                  <div className="flex items-center gap-2 text-xs font-medium text-[var(--color-text-muted)] mb-2">
                    <Wrench size={14} />
                    TOOLS
                  </div>

                  <div className="space-y-2 mb-3">
                    {filteredTools.map((t) => (
                      <Link
                        key={t.slug}
                        href={`/product/${t.slug}`}
                        className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[var(--color-surface)]"
                      >
                        <div className="w-8 h-8 rounded-md overflow-hidden border border-[var(--color-border)] bg-[var(--color-gray-100)]">
                          {t.logo && (
                            <Image
                              src={t.logo}
                              alt={t.name}
                              width={32}
                              height={32}
                            />
                          )}
                        </div>
                        <span className="text-sm">{t.name}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {/* PAGES */}
              {filteredPages.length > 0 && (
                <>
                  <div
                    className={`flex items-center gap-2 text-xs font-medium text-[var(--color-text-muted)] mb-2 ${
                      filteredTools.length > 0
                        ? "border-t pt-2 border-[var(--color-border)]"
                        : ""
                    }`}
                  >
                    <FileText size={14} />
                    PAGES
                  </div>

                  <div className="space-y-2">
                    {filteredPages.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/${p.type}/${p.slug}`}
                        className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-[var(--color-surface)]"
                      >
                        <span className="text-sm">{p.title}</span>
                        <span className="text-xs px-2 py-[2px] rounded bg-orange-100 text-orange-600">
                          {p.type?.charAt(0).toUpperCase() + p.type?.slice(1)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white">
            Sign Up
          </Button>

          <button className="w-10 h-10 rounded-md border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-surface)] cursor-pointer">
            <BellRing size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
