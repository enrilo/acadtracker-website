// Pushes custom events to the Google Tag Manager dataLayer.
// GTM (and the GA4 tag configured inside it) loads only in production builds,
// after the visitor accepts cookies. Until then window.dataLayer doesn't exist
// and every call safely no-ops.

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

// Every parameter any event uses. Each push resets the ones it doesn't set,
// because GTM's data layer remembers values from earlier pushes; without this,
// e.g. a walkthrough generate_lead could inherit `plan` from an earlier click.
const PARAM_KEYS = ["location", "form_type", "plan", "cta", "billing"];
const RESET = Object.fromEntries(PARAM_KEYS.map((k) => [k, undefined]));

/**
 * Send a custom event to GTM.
 * @param {string} name   Event name, e.g. "book_walkthrough_click".
 * @param {Record<string, unknown>} [params]  Event parameters (keys from PARAM_KEYS).
 */
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined" || !Array.isArray(window.dataLayer)) return;
  try {
    window.dataLayer.push({ event: name, ...RESET, ...params });
  } catch {
    /* never let analytics break the UI */
  }
}
