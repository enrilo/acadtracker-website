"use client";

import { useEffect, useState } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { getCookieConsent } from "@/components/CookieConsent";
import { GTM_ID } from "@/lib/analytics";

/**
 * Loads Google Tag Manager only when all of these are true:
 *  - this is a production build (local `next dev` visits are never tracked)
 *  - NEXT_PUBLIC_GTM_ID is set
 *  - the visitor clicked "Accept" on the cookie banner
 *
 * GA4 itself is configured inside the GTM container. Route changes are counted
 * by GA4 Enhanced Measurement ("page changes based on browser history events"),
 * so no manual page_view events are sent here.
 */
export default function Analytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsented(getCookieConsent() === "accepted");
    const onChange = (e) => setConsented(e.detail === "accepted");
    window.addEventListener("cookie-consent-change", onChange);
    return () => window.removeEventListener("cookie-consent-change", onChange);
  }, []);

  if (process.env.NODE_ENV !== "production" || !GTM_ID || !consented) {
    return null;
  }
  return <GoogleTagManager gtmId={GTM_ID} />;
}
