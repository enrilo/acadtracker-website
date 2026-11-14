"use client";

import { useRef, useState } from "react";
import { Dialog, TextField, useMediaQuery } from "@mui/material";
import { ArrowLeft, CalendarDays, CircleCheck, Clock, Globe, Video, X } from "lucide-react";
import BookingCalendar from "./BookingCalendar";
import { BOOKING_EVENT, SLOT_MS, formatDateKeyLong, formatTimeLabel, formatWhenLabel, istDateKey, istParts } from "@/lib/booking/slots";
import { EMAIL_ERROR, EMAIL_MAX, isValidEmail } from "@/lib/booking/validation";

const IST_OFFSET = -330; // Date#getTimezoneOffset() value for IST
const EMPTY_FORM = { name: "", email: "", message: "", website: "" };

const fieldSx = { "& .MuiFormLabel-asterisk": { color: "red" } };

/** Visitor's local time for a slot, or null if they're on IST. Adds the weekday if the local date differs. */
function localTimeLabel(ms) {
  if (new Date(ms).getTimezoneOffset() === IST_OFFSET) return null;
  const d = new Date(ms);
  const localKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const sameDay = localKey === istDateKey(ms);
  return new Intl.DateTimeFormat(undefined, {
    ...(sameDay ? {} : { weekday: "short" }),
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(d);
}

function localWhenLabel(ms) {
  if (new Date(ms).getTimezoneOffset() === IST_OFFSET) return null;
  const fmt = new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" });
  const end = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
  return `${fmt.format(new Date(ms))} – ${end.format(new Date(ms + SLOT_MS))}`;
}

function validateForm(form) {
  const errors = {};
  const name = form.name.trim();
  const message = form.message.trim();
  if (name.length < 2 || name.length > 100) errors.name = "Please enter your full name (2–100 characters).";
  if (!isValidEmail(form.email)) errors.email = EMAIL_ERROR;
  if (message.length < 5 || message.length > 2000) errors.message = "Please tell us a little more (5–2000 characters).";
  return errors;
}

function EventSummary({ selectedStart, onBack }) {
  const localWhen = selectedStart ? localWhenLabel(selectedStart) : null;
  return (
    <div className="border-b border-slate-line p-5 sm:p-6 md:w-72 md:shrink-0 md:border-b-0 md:border-r">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to time selection"
          className="mb-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-line text-blue transition hover:bg-blue-light"
        >
          <ArrowLeft size={18} />
        </button>
      )}
      <p className="text-sm font-semibold text-muted">{BOOKING_EVENT.company}</p>
      <h2 id="booking-title" className="mt-1 font-display text-2xl font-semibold text-ink">
        {BOOKING_EVENT.title}
      </h2>
      <ul className="mt-5 space-y-3 text-sm font-medium text-muted">
        <li className="flex items-start gap-2.5">
          <Clock size={18} className="mt-px shrink-0" />
          {BOOKING_EVENT.durationLabel}
        </li>
        <li className="flex items-start gap-2.5">
          <Video size={18} className="mt-px shrink-0" />
          {BOOKING_EVENT.locationLabel}
        </li>
        {selectedStart && (
          <li className="flex items-start gap-2.5 text-ink">
            <CalendarDays size={18} className="mt-px shrink-0" />
            <span>
              {formatWhenLabel(selectedStart)}
              {localWhen && <span className="mt-1 block text-xs font-normal text-muted">Your time: {localWhen}</span>}
            </span>
          </li>
        )}
        <li className="flex items-start gap-2.5">
          <Globe size={18} className="mt-px shrink-0" />
          {BOOKING_EVENT.timezoneLabel}
        </li>
      </ul>
    </div>
  );
}

export default function BookingDialog({ open, onClose, onBooked }) {
  const fullScreen = useMediaQuery("(max-width:767.95px)");

  const [now, setNow] = useState(() => Date.now());
  const [month, setMonth] = useState(() => {
    const p = istParts(Date.now());
    return { year: p.year, month: p.month };
  });
  const [step, setStep] = useState("time"); // time | details | done
  const [selectedDate, setSelectedDate] = useState(null);
  const [slotsState, setSlotsState] = useState({ status: "idle", slots: [], error: "" });
  const [selectedStart, setSelectedStart] = useState(null);
  const [notice, setNotice] = useState("");

  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState(null);

  const requestId = useRef(0);

  async function loadSlots(dateKey) {
    const id = ++requestId.current;
    setSlotsState({ status: "loading", slots: [], error: "" });
    try {
      const res = await fetch(`/api/booking/slots?date=${encodeURIComponent(dateKey)}`, { cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      if (id !== requestId.current) return;
      if (!res.ok) {
        setSlotsState({ status: "error", slots: [], error: data.error || "Could not load available times." });
        return;
      }
      setSlotsState({ status: "ready", slots: Array.isArray(data.slots) ? data.slots : [], error: "" });
    } catch {
      if (id !== requestId.current) return;
      setSlotsState({ status: "error", slots: [], error: "Could not load times. Check your connection and try again." });
    }
  }

  function handleSelectDate(dateKey) {
    setNow(Date.now());
    setSelectedDate(dateKey);
    setSelectedStart(null);
    setNotice("");
    loadSlots(dateKey);
  }

  function handleMonthChange(next) {
    setNow(Date.now());
    setMonth(next);
  }

  function updateField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((e) => ({ ...e, [name]: undefined }));
  }

  function backToTimes(message) {
    setStep("time");
    setSelectedStart(null);
    setNotice(message);
    setSubmitError("");
    if (selectedDate) loadSlots(selectedDate);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    const errors = validateForm(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start: selectedStart, ...form }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 409) {
        backToTimes(data.error || "That time was just booked. Please pick another.");
        return;
      }
      if (res.status === 400 && data.fields) {
        const { start: startError, ...rest } = data.fields;
        if (startError && !Object.keys(rest).length) {
          backToTimes(startError);
          return;
        }
        setFieldErrors(rest);
        setSubmitError(data.error || "Please check the highlighted fields.");
        return;
      }
      if (!res.ok || !data.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setResult({ ...data, email: form.email.trim() });
      setStep("done");
      onBooked?.();
    } catch {
      setSubmitError("Could not reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const close = () => {
    if (!submitting) onClose();
  };

  const showTimes = Boolean(selectedDate);

  return (
    <Dialog
      open={open}
      onClose={close}
      fullScreen={fullScreen}
      maxWidth={false}
      aria-labelledby="booking-title"
      slotProps={{
        paper: {
          sx: fullScreen
            ? { borderRadius: 0 }
            : {
                width: step === "time" && showTimes ? "min(1000px, calc(100% - 32px))" : "min(820px, calc(100% - 32px))",
                maxWidth: "none",
                borderRadius: "16px",
                transition: "width 200ms ease",
              },
        },
      }}
    >
      <div className="relative flex min-h-full flex-col bg-white text-ink">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-muted transition hover:bg-paper hover:text-ink"
        >
          <X size={20} />
        </button>

        {step === "done" ? (
          <ConfirmationView result={result} onClose={close} />
        ) : (
          <div className="flex flex-1 flex-col md:flex-row">
            <EventSummary selectedStart={step === "details" ? selectedStart : null} onBack={step === "details" ? () => setStep("time") : null} />

            {step === "time" && (
              <div className="flex-1 p-5 sm:p-6">
                <h3 className="mb-4 pr-10 text-lg font-semibold text-ink">Select a Date &amp; Time</h3>
                {notice && (
                  <p role="alert" className="mb-4 rounded-lg border border-status-red/30 bg-status-red-bg px-3 py-2 text-sm text-status-red">
                    {notice}
                  </p>
                )}
                <div className="flex flex-col gap-6 lg:flex-row">
                  <div className="mx-auto w-full max-w-sm lg:mx-0 lg:flex-1">
                    <BookingCalendar month={month} onMonthChange={handleMonthChange} selectedDate={selectedDate} onSelectDate={handleSelectDate} now={now} />
                    <p className="mt-5 flex items-center gap-2 text-xs text-muted">
                      <Globe size={14} /> All times in {BOOKING_EVENT.timezoneLabel}
                    </p>
                  </div>

                  {showTimes && (
                    <TimeColumn
                      dateKey={selectedDate}
                      slotsState={slotsState}
                      selectedStart={selectedStart}
                      onSelect={setSelectedStart}
                      onNext={() => {
                        setNotice("");
                        setStep("details");
                      }}
                      onRetry={() => loadSlots(selectedDate)}
                    />
                  )}
                </div>
              </div>
            )}

            {step === "details" && (
              <form onSubmit={handleSubmit} noValidate className="flex-1 p-5 sm:p-6">
                <h3 className="mb-5 pr-10 text-lg font-semibold text-ink">Enter Details</h3>
                <div className="flex flex-col gap-5">
                  <TextField
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    required
                    fullWidth
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    error={Boolean(fieldErrors.name)}
                    helperText={fieldErrors.name}
                    slotProps={{ htmlInput: { maxLength: 100 } }}
                    sx={fieldSx}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    fullWidth
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    onBlur={() => {
                      if (form.email.trim() && !isValidEmail(form.email)) setFieldErrors((errs) => ({ ...errs, email: EMAIL_ERROR }));
                    }}
                    error={Boolean(fieldErrors.email)}
                    helperText={fieldErrors.email || "We'll send the meeting invite and join link here"}
                    slotProps={{ htmlInput: { maxLength: EMAIL_MAX, inputMode: "email" } }}
                    sx={fieldSx}
                  />
                  <TextField
                    label="What should we prepare for this call?"
                    name="message"
                    required
                    fullWidth
                    multiline
                    minRows={4}
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    error={Boolean(fieldErrors.message)}
                    helperText={fieldErrors.message}
                    slotProps={{ htmlInput: { maxLength: 2000 } }}
                    sx={fieldSx}
                  />

                  {/* Honeypot: hidden from people, tempting to bots. */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label>
                      Website
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => updateField("website", e.target.value)} />
                    </label>
                  </div>
                </div>

                {submitError && (
                  <p role="alert" className="mt-5 rounded-lg border border-status-red/30 bg-status-red-bg px-3 py-2 text-sm text-status-red">
                    {submitError}
                  </p>
                )}

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setStep("time")}
                    disabled={submitting}
                    className="cursor-pointer rounded-lg border border-slate-line px-6 py-3 text-sm font-semibold text-ink transition hover:bg-paper disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="cursor-pointer rounded-lg bg-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue/20 transition hover:bg-blue-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Scheduling…" : "Schedule Event"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </Dialog>
  );
}

function TimeColumn({ dateKey, slotsState, selectedStart, onSelect, onNext, onRetry }) {
  return (
    <div className="w-full lg:w-52 lg:shrink-0">
      <p className="mb-3 text-sm font-semibold text-ink">{formatDateKeyLong(dateKey)}</p>

      {slotsState.status === "loading" && (
        <div className="space-y-2" aria-busy="true" aria-label="Loading times">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-lg bg-paper" />
          ))}
        </div>
      )}

      {slotsState.status === "error" && (
        <div className="rounded-lg border border-status-red/30 bg-status-red-bg p-3 text-sm text-status-red" role="alert">
          {slotsState.error}
          <button type="button" onClick={onRetry} className="mt-2 block cursor-pointer font-semibold underline">
            Try again
          </button>
        </div>
      )}

      {slotsState.status === "ready" && slotsState.slots.length === 0 && (
        <p className="rounded-lg bg-paper p-3 text-sm text-muted">No times left on this day. Please pick another date.</p>
      )}

      {slotsState.status === "ready" && slotsState.slots.length > 0 && (
        <ul className="space-y-2 lg:max-h-96 lg:overflow-y-auto lg:pr-1">
          {slotsState.slots.map((slot) => {
            const local = localTimeLabel(slot.start);
            const label = slot.label || formatTimeLabel(slot.start);
            const timeText = (
              <span className="flex flex-col items-center leading-tight">
                <span>{label}</span>
                {local && <span className="mt-0.5 text-[11px] font-normal opacity-80">{local}</span>}
              </span>
            );
            if (slot.start === selectedStart) {
              return (
                <li key={slot.start} className="flex gap-2">
                  <span className="flex min-h-12 flex-1 items-center justify-center rounded-lg bg-slate px-2 text-sm font-semibold text-white">
                    {timeText}
                  </span>
                  <button
                    type="button"
                    onClick={onNext}
                    autoFocus
                    className="min-h-12 flex-1 cursor-pointer rounded-lg bg-blue px-2 text-sm font-semibold text-white transition hover:bg-blue-dark"
                  >
                    Next
                  </button>
                </li>
              );
            }
            return (
              <li key={slot.start}>
                <button
                  type="button"
                  onClick={() => onSelect(slot.start)}
                  className="flex min-h-12 w-full cursor-pointer items-center justify-center rounded-lg border border-blue/40 px-2 text-sm font-semibold text-blue transition hover:border-2 hover:border-blue"
                >
                  {timeText}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function ConfirmationView({ result, onClose }) {
  const localWhen = result?.start ? localWhenLabel(result.start) : null;
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-5 py-10 text-center sm:px-10 sm:py-12">
      <CircleCheck size={44} className="text-status-green" />
      <h2 id="booking-title" className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
        You are scheduled
      </h2>
      <p className="mt-2 text-sm text-muted">
        {result?.emailSent
          ? `A confirmation email with a calendar invite is on its way to ${result.email}.`
          : `Zoho Meeting will email your invite to ${result?.email}.`}
      </p>

      <div className="mt-6 w-full max-w-md rounded-xl border border-slate-line bg-paper p-5 text-left">
        <p className="font-semibold text-ink">{BOOKING_EVENT.title}</p>
        <ul className="mt-3 space-y-3 text-sm text-muted">
          {result?.whenLabel && (
            <li className="flex items-start gap-2.5">
              <CalendarDays size={18} className="mt-px shrink-0" />
              <span className="text-ink">
                {result.whenLabel}
                {localWhen && <span className="mt-1 block text-xs text-muted">Your time: {localWhen}</span>}
              </span>
            </li>
          )}
          {result?.joinLink && (
            <li className="flex items-start gap-2.5">
              <Video size={18} className="mt-px shrink-0" />
              <a href={result.joinLink} target="_blank" rel="noopener noreferrer" className="break-all font-medium text-blue underline-offset-2 hover:underline">
                {result.joinLink}
              </a>
            </li>
          )}
          {result?.password && (
            <li className="flex items-start gap-2.5">
              <span className="w-4.5 shrink-0 text-center font-mono text-xs leading-5">#</span>
              <span>
                Meeting password: <span className="font-mono font-semibold text-ink">{result.password}</span>
              </span>
            </li>
          )}
        </ul>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-8 cursor-pointer rounded-lg bg-ink px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate"
      >
        Close
      </button>
    </div>
  );
}
