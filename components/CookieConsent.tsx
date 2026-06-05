"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";

type CookiePrefs = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [prefs, setPrefs] = useState<CookiePrefs>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("appbase-cookie-consent");
    if (!saved) setVisible(true);
  }, []);

  const acceptAll = () => {
    const all: CookiePrefs = {
      necessary: true,
      analytics: true,
      marketing: true,
    };

    localStorage.setItem("appbase-cookie-consent", JSON.stringify(all));
    setVisible(false);
  };

  const savePreferences = () => {
    localStorage.setItem("appbase-cookie-consent", JSON.stringify(prefs));
    setVisible(false);
    setShowSettings(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Banner */}
      {!showSettings && (
        <div className="fixed bottom-6 left-6 z-[9999]">
          <div className="max-w-sm rounded-xl border border-[var(--color-border)] bg-white px-6 py-5 shadow-sm">
            <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed">
              We use cookies to improve your experience. Read our{" "}
              <Link
                href="/privacy-policy"
                className="text-[var(--color-text)] underline hover:opacity-80"
              >
                Cookie Policy
              </Link>
              .
            </p>

            <div className="flex gap-3 justify-end">
              <Button
                onClick={() => setShowSettings(true)}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-sm px-4 py-2"
              >
                Settings
              </Button>

              <Button
                onClick={acceptAll}
                className="bg-[var(--color-primary)] text-white text-sm px-5 py-2"
              >
                Accept
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-[var(--color-text)] mb-6">
              Cookie Preferences
            </h3>

            <div className="space-y-5">
              <PreferenceItem
                title="Necessary"
                desc="Required for the website to function"
                checked
                locked
              />

              <PreferenceItem
                title="Analytics"
                desc="Helps us improve the website"
                checked={prefs.analytics}
                onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
              />

              <PreferenceItem
                title="Marketing"
                desc="Used for marketing purposes"
                checked={prefs.marketing}
                onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
              />
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <Button
                onClick={() => setShowSettings(false)}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-sm px-4 py-2"
              >
                Cancel
              </Button>

              <Button
                onClick={savePreferences}
                className="bg-[var(--color-primary)] text-white text-sm px-5 py-2"
              >
                Save preferences
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PreferenceItem({
  title,
  desc,
  checked,
  onChange,
  locked = false,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  locked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <div className="text-[var(--color-text)] font-medium">{title}</div>
        <div className="text-sm text-[var(--color-text-muted)]">{desc}</div>
      </div>

      <button
        disabled={locked}
        onClick={() => onChange && onChange(!checked)}
        className={`relative w-11 h-6 shrink-0 rounded-full transition ${
          checked ? "bg-green-600" : "bg-gray-300"
        } ${locked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-[2px] left-[2px] w-5 h-5 rounded-full bg-white transition ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}
