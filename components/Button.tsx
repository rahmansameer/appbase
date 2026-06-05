type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  children,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-5 py-2.5 rounded-lg text-sm font-normal
        flex items-center justify-center gap-2
        transition-all
        border border-[rgba(255,255,255,0.15)]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
}
