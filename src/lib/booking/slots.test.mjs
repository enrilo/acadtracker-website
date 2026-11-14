// Unit checks for the booking slot rules. Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  allSlotStartsForDate,
  bookableSlotStarts,
  formatTimeLabel,
  formatWhenLabel,
  formatZohoStartTime,
  getBookableSlots,
  isBookableDate,
  isDateInWindow,
  isValidSlotStart,
  istDateKey,
  lastBookableDateKey,
  overlapsBusy,
  parseDateKey,
} from "./slots.js";

// Fixed "now": Saturday 14 Nov 2026, 09:00 IST (= 03:30 UTC).
const NOW = Date.UTC(2026, 10, 14, 3, 30);
const MON = "2026-11-16"; // Monday

test("10:00 AM IST slot is 04:30 UTC", () => {
  const first = allSlotStartsForDate(MON)[0];
  assert.equal(new Date(first).toISOString(), "2026-11-16T04:30:00.000Z");
  assert.equal(formatTimeLabel(first), "10:00 AM");
});

test("weekday has 16 slots, 10:00 AM to 5:30 PM IST", () => {
  const starts = allSlotStartsForDate(MON);
  assert.equal(starts.length, 16);
  assert.equal(formatTimeLabel(starts.at(-1)), "5:30 PM");
  assert.equal(new Date(starts.at(-1)).toISOString(), "2026-11-16T12:00:00.000Z");
});

test("Saturday open, Sunday closed", () => {
  assert.equal(allSlotStartsForDate("2026-11-21").length, 16);
  assert.equal(allSlotStartsForDate("2026-11-15").length, 0);
  assert.equal(isBookableDate("2026-11-15", NOW), false);
});

test("past slots and slots inside the 120-minute notice are hidden", () => {
  // Today 09:00 IST: earliest bookable start is 11:00 IST.
  const labels = getBookableSlots("2026-11-14", NOW).map((s) => s.label);
  assert.equal(labels[0], "11:00 AM");
  assert.ok(!labels.includes("10:00 AM"));
  assert.ok(!labels.includes("10:30 AM"));
  // Late in the day: nothing left today.
  const late = Date.UTC(2026, 10, 14, 11, 0); // 16:30 IST
  assert.equal(bookableSlotStarts("2026-11-14", late).length, 0);
  assert.equal(isBookableDate("2026-11-14", late), false);
  // Yesterday is never bookable.
  assert.equal(isBookableDate("2026-11-13", NOW), false);
});

test("booking window is today + 60 days", () => {
  assert.equal(lastBookableDateKey(NOW), "2027-01-13");
  assert.equal(isDateInWindow("2027-01-13", NOW), true);
  assert.equal(isDateInWindow("2027-01-14", NOW), false);
  assert.equal(isBookableDate("2027-01-13", NOW), true); // Wednesday
});

test("IST date key ignores host timezone (UTC evening is next IST day)", () => {
  assert.equal(istDateKey(Date.UTC(2026, 10, 15, 19, 0)), "2026-11-16"); // 00:30 IST Mon
  assert.equal(istDateKey(Date.UTC(2026, 10, 15, 18, 29)), "2026-11-15"); // 23:59 IST Sun
});

test("isValidSlotStart accepts only exact, bookable slot starts", () => {
  const ok = allSlotStartsForDate(MON)[2]; // 11:00 IST
  assert.equal(isValidSlotStart(ok, NOW), true);
  assert.equal(isValidSlotStart(ok + 60_000, NOW), false); // off-grid
  assert.equal(isValidSlotStart(String(ok), NOW), false); // wrong type
  assert.equal(isValidSlotStart(allSlotStartsForDate("2026-11-14")[0], NOW), false); // past
  assert.equal(isValidSlotStart(Date.UTC(2026, 10, 16, 13, 0), NOW), false); // 18:30 IST, after hours
  assert.equal(isValidSlotStart(Date.UTC(2026, 10, 15, 4, 30), NOW), false); // Sunday
  assert.equal(isValidSlotStart(allSlotStartsForDate("2027-01-14")[0], NOW), false); // beyond window
});

test("parseDateKey rejects impossible dates", () => {
  assert.equal(parseDateKey("2026-02-30"), null);
  assert.equal(parseDateKey("2026-13-01"), null);
  assert.equal(parseDateKey("16-11-2026"), null);
  assert.deepEqual(parseDateKey("2028-02-29"), { year: 2028, month: 2, day: 29, weekday: 2 });
});

test("Zoho startTime format is zero-padded IST wall-clock", () => {
  const s = Date.UTC(2026, 10, 16, 5, 0); // 10:30 IST
  assert.equal(formatZohoStartTime(s), "Nov 16, 2026 10:30 AM");
  assert.equal(formatZohoStartTime(Date.UTC(2026, 11, 5, 9, 30)), "Dec 05, 2026 03:00 PM");
  assert.equal(formatWhenLabel(s), "10:30 AM – 11:00 AM IST, Monday, November 16, 2026");
});

test("overlap check uses half-open ranges", () => {
  const s = Date.UTC(2026, 10, 16, 5, 0);
  const e = s + 30 * 60_000;
  assert.equal(overlapsBusy(s, e, [{ start: e, end: e + 1 }]), false); // touching end
  assert.equal(overlapsBusy(s, e, [{ start: s - 1000, end: s }]), false); // touching start
  assert.equal(overlapsBusy(s, e, [{ start: s + 60_000, end: s + 120_000 }]), true);
});
