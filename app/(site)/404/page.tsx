import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="pb-20 pt-30">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] text-center px-8 py-20">
          <p className="text-md font-medium text-[var(--color-primary)] mb-4">
            404
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            This page doesn’t exist
          </h1>

          <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
            The page you’re looking for may have been removed, renamed, or the
            link might be incorrect. You can explore tools and find what you
            need from the homepage.
          </p>

          <div className="flex justify-center">
            <a href="/">
              <Button className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-lg">
                Discover software
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
