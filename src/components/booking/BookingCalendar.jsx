"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  daysInMonth,
  firstWeekdayOfMonth,
  formatDateKeyLong,
  formatMonthLabel,
  isBookableDate,
  istDateKey,
  istParts,
  lastBookableDateKey,
  toDateKey,
} from "@/lib/booking/slots";

const WEEKDAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthIndex = ({ year, month }) => year * 12 + (month - 1);

/** Month grid in IST. Bookable days are highlighted; all others are disabled. */
export default function BookingCalendar({ month, onMonthChange, selectedDate, onSelectDate, now }) {
  const todayKey = istDateKey(now);
  const today = istParts(now);
  const [lastY, lastM] = lastBookableDateKey(now).split("-").map(Number);

  const canPrev = monthIndex(month) > monthIndex(today);
  const canNext = monthIndex(month) < monthIndex({ year: lastY, month: lastM });

  const shift = (delta) => {
    const idx = monthIndex(month) + delta;
    onMonthChange({ year: Math.floor(idx / 12), month: (idx % 12) + 1 });
  };

  const leading = firstWeekdayOfMonth(month.year, month.month);
  const total = daysInMonth(month.year, month.month);
  const cells = [...Array(leading).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shift(-1)}
          disabled={!canPrev}
          aria-label="Previous month"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-blue transition hover:bg-blue-light disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent"
        >
          <ChevronLeft size={20} />
        </button>
        <p className="font-semibold text-ink" aria-live="polite">
          {formatMonthLabel(month.year, month.month)}
        </p>
        <button
          type="button"
          onClick={() => shift(1)}
          disabled={!canNext}
          aria-label="Next month"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-blue transition hover:bg-blue-light disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center" role="grid">
        {WEEKDAY_HEADERS.map((d) => (
          <div key={d} className="pb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-muted" role="columnheader">
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={`blank-${i}`} />;
          const key = toDateKey(month.year, month.month, day);
          const bookable = isBookableDate(key, now);
          const selected = key === selectedDate;
          const isToday = key === todayKey;
          return (
            <div key={key} className="flex justify-center">
              <button
                type="button"
                disabled={!bookable}
                onClick={() => onSelectDate(key)}
                aria-label={`${formatDateKeyLong(key)}${bookable ? "" : " (unavailable)"}`}
                aria-pressed={selected}
                className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sm transition sm:h-11 sm:w-11 ${
                  selected
                    ? "bg-blue font-semibold text-white"
                    : bookable
                      ? "bg-blue-light font-semibold text-blue hover:bg-blue hover:text-white"
                      : "cursor-default text-slate-400"
                }`}
              >
                {day}
                {isToday && (
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-1 h-1 w-1 rounded-full ${selected ? "bg-white" : bookable ? "bg-blue" : "bg-slate-400"}`}
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
