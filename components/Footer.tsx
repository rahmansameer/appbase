export default function Footer() {
  return (
    <footer className="bg-[var(--color-surface)] mt-10">
      {/* CARD */}
      <div className="max-w-[1400px] mx-auto bg-[var(--color-background)] border-t border-l border-r border-[var(--color-border)] rounded-t-2xl px-6 md:px-10 py-10">
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-12 text-sm">
          {/* COLUMN */}
          <div>
            <h4 className="font-semibold mb-4">Best Productivity Tools</h4>
            <ul className="space-y-2 text-[var(--color-text-muted)]">
              {[
                "Best Project Management Tools",
                "Best Note-Taking Apps",
                "Best To-Do List Apps",
                "Best Calendar Apps",
                "Best Email Apps",
                "Best Habit Trackers",
                "Best Time Management Apps",
                "Best Second Brain Apps",
                "Best PKM Apps",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-[var(--color-text-muted)]">
              {[
                "Project Management",
                "Note Taking Apps",
                "To-Do List Apps",
                "Calendar Apps",
                "Email Apps",
                "All-In-One Apps",
                "AI Tools",
                "Writing Apps",
                "All Categories",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Top Tools</h4>
            <ul className="space-y-2 text-[var(--color-text-muted)]">
              {[
                "Motion",
                "Superhuman",
                "Sunsama",
                "ClickUp",
                "Akiflow",
                "Griply",
                "Todoist",
                "Monday.com",
                "All Tools",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-[var(--color-text-muted)]">
              {[
                "About",
                "Contact",
                "Sitemap",
                "Comparisons",
                "Alternatives",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-[var(--color-text-muted)]">
              {[
                "Browse Tools",
                "Browse Categories",
                "Browse Alternatives",
                "Browse Comparisons",
                "Browse Lists",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* EXPLORE MORE */}
        <div className="border-t border-[var(--color-border)] pt-8 mb-8">
          <h4 className="text-sm font-semibold mb-4">Explore More Pages</h4>

          <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
            {[
              "Best Time Management Apps",
              "Best Reminder Apps",
              "Best Knowledge Base Software",
              "Best Journal Apps",
              "Best Checklist Apps",
              "Best Time Blocking Apps",
              "Best PKM Apps",
              "Best Second Brain Apps",
              "Best Team Chat Apps",
              "Productivity Apps for Mac",
              "Productivity Tools for Windows",
              "Best To-Do List Apps for iPad",
              "Best iPad Note-Taking Apps",
              "Note-Taking Apps for Mac",
              "Note-Taking Apps for iPhone",
              "Best Email Clients for Mac",
              "Best Planner Apps",
              "Best Focus Apps",
              "Best Free Calendar Apps",
              "Notion Statistics",
              "Second Brain Guide",
            ].map((item, i) => (
              <span key={i}>
                <a href="#" className="hover:underline">
                  {item}
                </a>{" "}
                {i !== 20 && "•"}
              </span>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-sm text-[var(--color-text-muted)]">
          <p className="text-center sm:text-left">
            © 2020-2026 Appbase. All rights reserved. ·{" "}
            <a href="#" className="hover:underline">
              Terms of Use
            </a>{" "}
            ·{" "}
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
