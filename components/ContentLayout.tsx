import Button from "@/components/Button";
import { Mail, ArrowRight, ExternalLink, Check } from "lucide-react";
import Image from "next/image";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container-custom py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        <div className="lg:col-span-9 space-y-5 mt-8">{children}</div>

        <div className="lg:col-span-3 lg:sticky lg:top-24 h-fit">
          <div className="bg-white border border-[var(--color-border)] rounded-2xl p-5 space-y-5">
            <div className="border border-[var(--color-border)] rounded-xl p-6">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--color-primary)] text-white">
                  <Mail size={20} />
                </div>

                <div>
                  <h3 className="text-lg font-medium text-[#0f172a]">
                    Unlock Deals
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Join{" "}
                    <span className="font-medium text-[#0f172a]">25k+</span>{" "}
                    people today!
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  "Exclusive deals sent weekly",
                  "Early access before deals expire",
                  "Save hundreds on premium tools",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[var(--color-primary)]/10 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                    </div>

                    <span className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <input
                placeholder="Enter your email"
                className="w-full border border-[var(--color-border)] rounded-lg px-4 py-3 text-sm mb-4 bg-white focus:outline-none"
              />

              <Button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 rounded-lg flex items-center justify-center gap-2">
                Unlock Deals
                <ArrowRight size={16} />
              </Button>
            </div>

            <div className="relative rounded-xl p-5 bg-gradient-to-br from-[#1e0f3a] via-[#0b0b2e] to-[#0f2a3f] text-white overflow-hidden shadow-md">
              <div className="absolute top-0 left-0 w-full h-[8px] bg-green-400" />

              <div className="flex items-start justify-between mb-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur flex items-center justify-center">
                  <Image
                    src="/sponsored-logo1.webp"
                    alt="Granola"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>

                <div className="text-[11px] px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur">
                  Sponsored
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-[20px] font-semibold tracking-tight">
                  Granola
                </h3>

                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <Check size={12} className="text-black" />
                </div>
              </div>

              <p className="text-sm text-white/75 mb-5 leading-relaxed">
                Granola wants to be your AI meeting assistant for taking notes
                and improving productivity.
              </p>

              <a href="/go/granola">
                <div className="flex items-center justify-center gap-2 w-full bg-white text-black py-3 rounded-lg text-sm font-medium hover:opacity-90 transition">
                  <ExternalLink size={16} />
                  Visit
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
