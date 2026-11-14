import { NextResponse } from "next/server";
import { SLOT_MS, getBookableSlots, overlapsBusy, parseDateKey } from "@/lib/booking/slots";
import { getBusyRanges, missingZohoEnv } from "@/lib/server/zoho";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, max-age=0" };
const json = (body, status = 200) => NextResponse.json(body, { status, headers: NO_STORE });

/** GET /api/booking/slots?date=YYYY-MM-DD → { slots: [{ start, label }] } */
export async function GET(request) {
  const date = request.nextUrl.searchParams.get("date");
  if (!parseDateKey(date)) {
    return json({ error: "Invalid or missing date. Use YYYY-MM-DD." }, 400);
  }

  const missing = missingZohoEnv();
  if (missing.length) {
    console.error(`[booking] Zoho not configured; missing: ${missing.join(", ")}`);
    return json({ error: "Booking is temporarily unavailable." }, 503);
  }

  const candidates = getBookableSlots(date);
  if (!candidates.length) return json({ slots: [] });

  try {
    const busy = await getBusyRanges();
    const slots = candidates.filter((s) => !overlapsBusy(s.start, s.start + SLOT_MS, busy));
    return json({ slots });
  } catch (err) {
    console.error("[booking] failed to load busy times:", err?.message || err);
    return json({ error: "Could not load available times. Please try again." }, 502);
  }
}
