"use client";

import { useBooking } from "./BookingProvider";

/** Opens the booking popup. Usable from server components (e.g. pages). */
export default function BookWalkthroughButton({ className = "", children = "Book a Walkthrough", onClick }) {
  const { openBooking } = useBooking();
  return (
    <button
      type="button"
      className={`cursor-pointer ${className}`}
      aria-haspopup="dialog"
      onClick={(e) => {
        onClick?.(e);
        openBooking();
      }}
    >
      {children}
    </button>
  );
}
