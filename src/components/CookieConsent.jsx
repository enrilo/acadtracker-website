"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "acadtracker-cookie-consent";

export function getCookieConsent() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!getCookieConsent()) setVisible(true);
  }, []);

  const persist = (value) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage unavailable — banner simply reappears next visit */
    }
    window.dispatchEvent(
      new CustomEvent("cookie-consent-change", { detail: value })
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-xl border border-slate-line bg-slate p-5 text-slate-200 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-300">
          We use cookies to run this site and understand how it&apos;s used. See
          our{" "}
          <Link
            href="/privacy-policy"
            className="font-medium text-white underline underline-offset-2 hover:opacity-90"
          >
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => persist("declined")}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => persist("accepted")}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate transition hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
