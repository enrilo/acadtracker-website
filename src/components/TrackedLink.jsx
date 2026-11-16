"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

/** A next/link that also sends a GA4 event on click. Usable from server components. */
export default function TrackedLink({ event, eventParams, onClick, ...props }) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(event, eventParams);
        onClick?.(e);
      }}
    />
  );
}
