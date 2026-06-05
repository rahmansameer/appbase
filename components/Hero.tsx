"use client";

import { ArrowRight, Tag, ShieldCheck, Users } from "lucide-react";
import Button from "@/components/Button";
import FloatingLogoCard from "@/components/FloatingLogoCard";

export default function Hero() {
  return (
    <section className="relative pt-20 md:pt-28 pb-24 overflow-hidden">
      {/* BLUE GRADIENT */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#EAF2FF] via-[#F4F7FF] to-white" />

      {/* FLOATING LEFT */}
      <div className="hidden xl:block absolute left-20 top-40 w-[260px] h-[220px]">
        <div className="absolute left-0 top-0 float-slow">
          <FloatingLogoCard
            label="1 month free"
            color="#81f58b"
            src="/hero-floating-logo1.webp"
          />
        </div>

        <div className="absolute left-40 top-0 float-slow float-delay-1">
          <FloatingLogoCard
            label="3 month free"
            color="#9103fb"
            src="/hero-floating-logo2.webp"
          />
        </div>

        <div className="absolute left-20 top-32 float-slow float-delay-2">
          <FloatingLogoCard
            label="1 month free"
            color="#0f727c"
            src="/hero-floating-logo3.webp"
          />
        </div>
      </div>

      {/* FLOATING RIGHT */}
      <div className="hidden xl:block absolute right-20 top-40 w-[260px] h-[220px]">
        <div className="absolute right-40 top-0 float-slow">
          <FloatingLogoCard
            label="1 month free"
            color="#18181a"
            src="/hero-floating-logo4.webp"
          />
        </div>

        <div className="absolute right-0 top-0 float-slow float-delay-1">
          <FloatingLogoCard
            label="12 month free"
            color="#e44332"
            src="/hero-floating-logo5.webp"
          />
        </div>

        <div className="absolute right-20 top-32 float-slow float-delay-2">
          <FloatingLogoCard
            label="2 month free"
            color="#4d4260"
            src="/hero-floating-logo6.webp"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="container-custom text-left md:text-center max-w-3xl mx-auto relative">
        {/* HEADING */}
        <h1 className="text-4xl md:text-5xl font-medium leading-tight mb-3">
          Find & Save on{" "}
          <span className="relative inline-block px-1">
            <span className="relative z-10">Software.</span>
            <span className="absolute left-0 right-0 bottom-[4px] h-[70%] bg-[rgba(1,80,255,0.15)] -z-0" />
          </span>
        </h1>

        {/* SUBTEXT */}
        <p className="mb-6 opacity-80">
          Discover the latest AI tools, savings & great software.
        </p>

        {/* Email Subscribe */}
        <div className="flex flex-col sm:flex-row gap-2 p-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] max-w-xl mx-0 md:mx-auto">
          <input
            type="text"
            placeholder="Enter email to unlock deals"
            className="flex-1 bg-transparent outline-none text-sm px-3 py-2"
          />

          <Button className="w-full sm:w-auto bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] px-4 py-3 justify-center">
            Unlock Weekly Savings <ArrowRight size={14} />
          </Button>
        </div>

        {/* TRUST (HIDDEN ON MOBILE) */}
        <div className="hidden md:flex flex-wrap justify-center items-center gap-5 mt-7 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#3B82F6]">
              <Tag size={14} className="text-white" />
            </div>
            <span className="text-[var(--color-text)] font-medium">
              150+ exclusive deals
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#10B981]">
              <ShieldCheck size={14} className="text-white" />
            </div>
            <span className="text-[var(--color-text)] font-medium">
              Negotiated by us
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#EF4444]">
              <Users size={14} className="text-white" />
            </div>
            <span className="text-[var(--color-text)] font-medium">
              Trusted by 500K+ people
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[var(--color-surface)] pointer-events-none" />
    </section>
  );
}
