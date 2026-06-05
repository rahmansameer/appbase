type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-md shadow-card p-5">
      {children}
    </div>
  );
}
