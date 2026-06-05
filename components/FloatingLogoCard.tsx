import Image from "next/image";

type Props = {
  label: string;
  color: string;
  src: string;
};

export default function FloatingLogoCard({ label, color, src }: Props) {
  return (
    <div className="relative inline-block float-slow">
      {/* LABEL */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-[#11b981] text-white text-[11px] px-3 py-[2px] rounded-full whitespace-nowrap shadow-sm">
        {label}
      </div>

      {/* BASE (REAL 3D DEPTH) */}
      <div
        className="absolute top-[6px] left-0 w-full h-full rounded-xl"
        style={{
          background: `linear-gradient(
            to bottom,
            ${color},
            ${color}cc,
            ${color}99
          )`,
          filter: "brightness(0.95)",
        }}
      />

      {/* CARD */}
      <div className="relative w-[72px] h-[72px] rounded-xl bg-white border border-[var(--color-border)] flex items-center justify-center shadow-[0_6px_12px_rgba(0,0,0,0.08)]">
        {/* TOP LIGHT (SUBTLE 3D EFFECT) */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/60" />

        <Image src={src} alt="" width={44} height={44} />
      </div>
    </div>
  );
}
