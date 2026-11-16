"use client";

import { useBooking } from "./BookingProvider";
import { trackEvent } from "@/lib/analytics";

/**
 * Opens the booking popup. Usable from server components (e.g. pages).
 * `location` is sent to GA4 with the book_walkthrough_click event.
 */
export default function BookWalkthroughButton({ className = "", children = "Book a Walkthrough", onClick, location = "unknown" }) {
  const { openBooking } = useBooking();
  return (
    <button
      type="button"
      className={`cursor-pointer ${className}`}
      aria-haspopup="dialog"
      onClick={(e) => {
        trackEvent("book_walkthrough_click", { location });
        onClick?.(e);
        openBooking();
      }}
    >
      {children}
    </button>
  );
}
