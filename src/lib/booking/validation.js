/**
 * Booking form validation shared by the popup (browser) and POST /api/booking (server).
 */

/**
 * Email: local part of letters/digits/._%+-, a domain made of labels that
 * don't start or end with "-", and a 2+ letter TLD. Max 254 chars overall.
 */
export const EMAIL_RE =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;

export const EMAIL_MAX = 254;

export function isValidEmail(value) {
  const email = typeof value === "string" ? value.trim() : "";
  return email.length > 0 && email.length <= EMAIL_MAX && EMAIL_RE.test(email) && !email.includes("..");
}

export const EMAIL_ERROR = "Please enter a valid email address (e.g. name@company.com).";
