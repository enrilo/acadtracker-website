/**
 * Booking slot rules, shared by the browser (calendar UI) and the server
 * (API validation). Keep this file free of secrets and server-only imports.
 *
 * All date maths uses a fixed IST offset (UTC+05:30, no DST) applied to UTC
 * milliseconds, so results never depend on the server's or browser's timezone.
 */

// ---- Event details (shown in the booking popup and emails) -----------------
export const BOOKING_EVENT = {
  company: "Enrilo Technologies",
  title: "AcadTracker Walkthrough",
  durationLabel: "30 min",
  locationLabel: "Zoho Meeting (link sent by email)",
  timezoneLabel: "India Standard Time (IST)",
};

// ---- Scheduling rules ------------------------------------------------------
export const IST_OFFSET_MINUTES = 330; // UTC+05:30
export const SLOT_MINUTES = 30;
export const MIN_NOTICE_MINUTES = 120;
export const BOOKING_WINDOW_DAYS = 60;

/**
 * Working hours per weekday, in IST wall-clock time. 0 = Sunday … 6 = Saturday.
 * `null` means closed. `end` is exclusive: "18:00" makes 17:30 the last slot.
 */
export const WEEKLY_HOURS = {
  0: null,
  1: { start: "10:00", end: "18:00" },
  2: { start: "10:00", end: "18:00" },
  3: { start: "10:00", end: "18:00" },
  4: { start: "10:00", end: "18:00" },
  5: { start: "10:00", end: "18:00" },
  6: { start: "10:00", end: "18:00" },
};

const MINUTE_MS = 60 * 1000;
const DAY_MS = 24 * 60 * MINUTE_MS;
const OFFSET_MS = IST_OFFSET_MINUTES * MINUTE_MS;
export const SLOT_MS = SLOT_MINUTES * MINUTE_MS;

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const pad2 = (n) => String(n).padStart(2, "0");

function hhmmToMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** IST wall-clock parts of a UTC instant. `month` is 1–12, `weekday` 0–6 (Sun–Sat). */
export function istParts(ms) {
  const d = new Date(ms + OFFSET_MS);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    weekday: d.getUTCDay(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
  };
}

export function toDateKey(year, month, day) {
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

/** "YYYY-MM-DD" of the IST calendar day containing `ms`. */
export function istDateKey(ms) {
  const p = istParts(ms);
  return toDateKey(p.year, p.month, p.day);
}

/** Parse and validate "YYYY-MM-DD" as a real calendar date. Returns null if invalid. */
export function parseDateKey(dateKey) {
  if (typeof dateKey !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return null;
  const [year, month, day] = dateKey.split("-").map(Number);
  const d = new Date(Date.UTC(year, month - 1, day));
  if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) return null;
  return { year, month, day, weekday: d.getUTCDay() };
}

/** UTC ms of 00:00 IST on the given date key (assumes a valid key). */
function istMidnightUtc({ year, month, day }) {
  return Date.UTC(year, month - 1, day) - OFFSET_MS;
}

/** Shift a date key by whole days. */
export function addDaysToDateKey(dateKey, days) {
  const p = parseDateKey(dateKey);
  if (!p) return null;
  const d = new Date(Date.UTC(p.year, p.month - 1, p.day) + days * DAY_MS);
  return toDateKey(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
}

/** Number of days in a month (`month` 1–12). */
export function daysInMonth(year, month) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/** Weekday (0 = Sunday) of the 1st of a month. */
export function firstWeekdayOfMonth(year, month) {
  return new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
}

/** Last bookable IST date key: today + BOOKING_WINDOW_DAYS. */
export function lastBookableDateKey(now = Date.now()) {
  return addDaysToDateKey(istDateKey(now), BOOKING_WINDOW_DAYS);
}

/** Every slot start (UTC ms) on an IST date per WEEKLY_HOURS, ignoring notice/window. */
export function allSlotStartsForDate(dateKey) {
  const p = parseDateKey(dateKey);
  if (!p) return [];
  const hours = WEEKLY_HOURS[p.weekday];
  if (!hours) return [];
  const midnight = istMidnightUtc(p);
  const startMin = hhmmToMinutes(hours.start);
  const endMin = hhmmToMinutes(hours.end);
  const starts = [];
  for (let m = startMin; m + SLOT_MINUTES <= endMin; m += SLOT_MINUTES) {
    starts.push(midnight + m * MINUTE_MS);
  }
  return starts;
}

/** True if the date key is between IST today and today + window (inclusive). */
export function isDateInWindow(dateKey, now = Date.now()) {
  if (!parseDateKey(dateKey)) return false;
  return dateKey >= istDateKey(now) && dateKey <= lastBookableDateKey(now);
}

/** Bookable slot starts (UTC ms) for a date: within window and past minimum notice. */
export function bookableSlotStarts(dateKey, now = Date.now()) {
  if (!isDateInWindow(dateKey, now)) return [];
  const earliest = now + MIN_NOTICE_MINUTES * MINUTE_MS;
  return allSlotStartsForDate(dateKey).filter((start) => start >= earliest);
}

/** Bookable slots for a date as `{ start, label }`. */
export function getBookableSlots(dateKey, now = Date.now()) {
  return bookableSlotStarts(dateKey, now).map((start) => ({ start, label: formatTimeLabel(start) }));
}

/** True if at least one slot on this date can still be booked. */
export function isBookableDate(dateKey, now = Date.now()) {
  return bookableSlotStarts(dateKey, now).length > 0;
}

/** True only if `ms` is the exact start of a real, still-bookable slot. */
export function isValidSlotStart(ms, now = Date.now()) {
  if (typeof ms !== "number" || !Number.isSafeInteger(ms)) return false;
  return bookableSlotStarts(istDateKey(ms), now).includes(ms);
}

/** True if [start, end) overlaps any busy `{ start, end }` range. */
export function overlapsBusy(start, end, busyRanges) {
  return busyRanges.some((b) => start < b.end && b.start < end);
}

// ---- Formatting (IST) ------------------------------------------------------

function to12h(hour) {
  return { h: hour % 12 === 0 ? 12 : hour % 12, ampm: hour < 12 ? "AM" : "PM" };
}

/** "10:00 AM" in IST. */
export function formatTimeLabel(ms) {
  const p = istParts(ms);
  const { h, ampm } = to12h(p.hour);
  return `${h}:${pad2(p.minute)} ${ampm}`;
}

/** "Monday, November 16, 2026" for an IST date key. */
export function formatDateKeyLong(dateKey) {
  const p = parseDateKey(dateKey);
  if (!p) return "";
  return `${WEEKDAYS[p.weekday]}, ${MONTHS[p.month - 1]} ${p.day}, ${p.year}`;
}

/** "November 2026". */
export function formatMonthLabel(year, month) {
  return `${MONTHS[month - 1]} ${year}`;
}

/** "10:00 AM – 10:30 AM IST, Monday, November 16, 2026". */
export function formatWhenLabel(ms) {
  return `${formatTimeLabel(ms)} – ${formatTimeLabel(ms + SLOT_MS)} IST, ${formatDateKeyLong(istDateKey(ms))}`;
}

/** Zoho Meeting `startTime`: IST wall-clock as "Nov 16, 2026 10:30 AM" (zero-padded day and hour). */
export function formatZohoStartTime(ms) {
  const p = istParts(ms);
  const { h, ampm } = to12h(p.hour);
  return `${MONTHS[p.month - 1].slice(0, 3)} ${pad2(p.day)}, ${p.year} ${pad2(h)}:${pad2(p.minute)} ${ampm}`;
}
