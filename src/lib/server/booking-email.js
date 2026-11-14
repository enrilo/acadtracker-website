import "server-only";
import nodemailer from "nodemailer";
import { BOOKING_EVENT, SLOT_MS, formatWhenLabel } from "@/lib/booking/slots";

/** Email is optional: on only when SMTP is configured and not explicitly disabled. */
export function isEmailConfigured() {
  const env = process.env;
  return Boolean(
    env.SMTP_HOST?.trim() && env.SMTP_USER?.trim() && env.SMTP_PASS?.trim() && env.SEND_BOOKING_EMAIL?.trim() !== "false"
  );
}

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  const port = Number(process.env.SMTP_PORT) || 465;
  const secureEnv = process.env.SMTP_SECURE?.trim().toLowerCase();
  const secure = secureEnv ? secureEnv === "true" : port === 465;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST.trim(),
    port,
    secure,
    auth: { user: process.env.SMTP_USER.trim(), pass: process.env.SMTP_PASS },
  });
  return transporter;
}

const fromAddress = () => process.env.MAIL_FROM?.trim() || process.env.SMTP_USER.trim();

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// ---- .ics ------------------------------------------------------------------

const icsDate = (ms) => new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const icsText = (s) => String(s).replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/([,;])/g, "\\$1");

/** Fold lines to 75 octets per RFC 5545. */
function foldLine(line) {
  const bytes = Buffer.from(line, "utf8");
  if (bytes.length <= 75) return line;
  const parts = [];
  let current = "";
  for (const ch of line) {
    const limit = parts.length === 0 ? 75 : 74; // continuation lines start with a space
    if (Buffer.byteLength(current + ch, "utf8") > limit) {
      parts.push(current);
      current = ch;
    } else {
      current += ch;
    }
  }
  parts.push(current);
  return parts.join("\r\n ");
}

function buildIcs({ start, joinLink, password, meetingKey, uid }) {
  const description = [
    `${BOOKING_EVENT.title} with ${BOOKING_EVENT.company}`,
    `Join: ${joinLink}`,
    password && `Password: ${password}`,
    meetingKey && `Meeting ID: ${meetingKey}`,
  ]
    .filter(Boolean)
    .join("\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${BOOKING_EVENT.company}//Booking//EN`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${icsDate(Date.now())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(start + SLOT_MS)}`,
    `SUMMARY:${icsText(`${BOOKING_EVENT.title} — ${BOOKING_EVENT.company}`)}`,
    `DESCRIPTION:${icsText(description)}`,
    `LOCATION:${icsText(joinLink)}`,
    `URL:${icsText(joinLink)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .map(foldLine)
    .join("\r\n");
}

// ---- Emails ----------------------------------------------------------------

function visitorEmail({ name, start, joinLink, password, meetingKey }) {
  const when = formatWhenLabel(start);
  const subject = `Confirmed: ${BOOKING_EVENT.title} — ${when}`;
  const rows = [
    ["When", when],
    ["Where", "Zoho Meeting"],
    password && ["Password", password],
    meetingKey && ["Meeting ID", meetingKey],
  ].filter(Boolean);

  const text = [
    `Hi ${name},`,
    "",
    `Your ${BOOKING_EVENT.title} with ${BOOKING_EVENT.company} is confirmed.`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    `Join the meeting: ${joinLink}`,
    "",
    "A calendar invite is attached. Zoho Meeting will also email you its own invite.",
    "",
    `— ${BOOKING_EVENT.company}`,
  ].join("\n");

  const html = `<!doctype html><html><body style="margin:0;background:#f5f8fd;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#16233f">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e4e8f1;border-radius:12px;padding:28px">
<tr><td>
<p style="margin:0 0 4px;font-size:12px;letter-spacing:.05em;text-transform:uppercase;color:#2f66e3;font-weight:600">You are scheduled</p>
<h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:22px;font-weight:600">${escapeHtml(BOOKING_EVENT.title)}</h1>
<p style="margin:0 0 16px;font-size:15px;line-height:1.5">Hi ${escapeHtml(name)}, your call with ${escapeHtml(BOOKING_EVENT.company)} is confirmed.</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;line-height:1.5;margin:0 0 20px">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:6px 12px 6px 0;color:#5b6a85;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0;font-weight:600">${escapeHtml(v)}</td></tr>`
  )
  .join("\n")}
</table>
<a href="${escapeHtml(joinLink)}" style="display:inline-block;background:#16233f;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:8px">Join the meeting</a>
<p style="margin:20px 0 0;font-size:13px;color:#5b6a85;line-height:1.5">A calendar invite is attached. Zoho Meeting will also email you its own invite.</p>
</td></tr></table>
</td></tr></table></body></html>`;

  return { subject, text, html };
}

/**
 * Send the visitor confirmation (+ optional owner notice). Never throws:
 * returns true only if the visitor email was sent.
 */
export async function sendBookingEmails({ name, email, message, start, joinLink, password, meetingKey }) {
  if (!isEmailConfigured()) return false;
  const tx = getTransporter();
  let sent = false;

  try {
    const { subject, text, html } = visitorEmail({ name, start, joinLink, password, meetingKey });
    const ics = buildIcs({ start, joinLink, password, meetingKey, uid: `${meetingKey || start}@booking` });
    await tx.sendMail({
      from: fromAddress(),
      to: email,
      subject,
      text,
      html,
      attachments: [{ filename: "invite.ics", content: ics, contentType: "text/calendar; charset=utf-8; method=PUBLISH" }],
    });
    sent = true;
  } catch (err) {
    console.error("[booking] confirmation email failed:", err?.message || err);
  }

  const notify = process.env.BOOKING_NOTIFY_EMAIL?.trim();
  if (notify) {
    try {
      const when = formatWhenLabel(start);
      await tx.sendMail({
        from: fromAddress(),
        to: notify,
        replyTo: email,
        subject: `New booking: ${name} — ${when}`,
        text: [`Name: ${name}`, `Email: ${email}`, `When: ${when}`, ...(meetingKey ? [`Meeting ID: ${meetingKey}`] : []), "", "Message:", message].join("\n"),
      });
    } catch (err) {
      console.error("[booking] owner notification email failed:", err?.message || err);
    }
  }

  return sent;
}
