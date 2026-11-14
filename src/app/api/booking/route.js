import { NextResponse } from "next/server";
import { BOOKING_EVENT, SLOT_MS, formatWhenLabel, isValidSlotStart, overlapsBusy } from "@/lib/booking/slots";
import { clearBusyCache, createMeeting, getBusyRanges, missingZohoEnv } from "@/lib/server/zoho";
import { sendBookingEmails } from "@/lib/server/booking-email";
import { EMAIL_ERROR, isValidEmail } from "@/lib/booking/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, max-age=0" };
const json = (body, status = 200) => NextResponse.json(body, { status, headers: NO_STORE });

// Slots currently being booked by this server instance (guards double-submits).
const inFlight = new Set();

function validate(body) {
  const name = typeof body.name === "string" ? body.name.replace(/\s+/g, " ").trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const start = body.start;

  const fields = {};
  if (name.length < 2 || name.length > 100) fields.name = "Please enter your full name (2–100 characters).";
  if (!isValidEmail(email)) fields.email = EMAIL_ERROR;
  if (message.length < 5 || message.length > 2000) fields.message = "Please tell us a little more (5–2000 characters).";
  if (!isValidSlotStart(start)) fields.start = "That time is no longer available. Please pick another.";

  return { fields, data: { name, email, message, start } };
}

/** POST /api/booking  { start, name, email, message, website } */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }
  if (!body || typeof body !== "object") return json({ error: "Invalid request body." }, 400);

  // Honeypot: bots fill hidden fields. Pretend success, do nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return json({ ok: true });
  }

  const { fields, data } = validate(body);
  if (Object.keys(fields).length) {
    return json({ error: "Please check the highlighted fields.", fields }, 400);
  }

  const missing = missingZohoEnv();
  if (missing.length) {
    console.error(`[booking] Zoho not configured; missing: ${missing.join(", ")}`);
    return json({ error: "Booking is temporarily unavailable." }, 503);
  }

  const { name, email, message, start } = data;
  if (inFlight.has(start)) {
    return json({ error: "That time was just booked. Please pick another." }, 409);
  }
  inFlight.add(start);

  try {
    let busy;
    try {
      busy = await getBusyRanges({ fresh: true });
    } catch (err) {
      console.error("[booking] failed to re-check busy times:", err?.message || err);
      return json({ error: "Could not confirm availability. Please try again." }, 502);
    }
    if (overlapsBusy(start, start + SLOT_MS, busy)) {
      return json({ error: "That time was just booked. Please pick another." }, 409);
    }

    let meeting;
    try {
      meeting = await createMeeting({
        topic: `${BOOKING_EVENT.title} — ${name}`,
        agenda: `Name: ${name}\nEmail: ${email}\n\nWhat should we prepare for this call?\n${message}`,
        start,
        email,
      });
    } catch (err) {
      console.error("[booking] failed to create Zoho meeting:", err?.message || err);
      return json({ error: "We couldn't create the meeting. Please try again shortly." }, 502);
    }

    clearBusyCache();

    const emailSent = await sendBookingEmails({ name, email, message, start, ...meeting });

    // Never include the host startLink here.
    return json({
      ok: true,
      start,
      whenLabel: formatWhenLabel(start),
      joinLink: meeting.joinLink,
      password: meeting.password,
      emailSent,
    });
  } finally {
    inFlight.delete(start);
  }
}
