import Link from "next/link";
import {
  FileCheck2,
  Bell,
  FolderClock,
  ListChecks,
  CircleCheck,
  Clock,
} from "lucide-react";
import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata({
  title: "All-in-One Consultancy Management Software",
  description:
    "Manage students, visa applications, documents, and follow-ups in one platform built specifically for educational consultancies. Replace spreadsheets and chaos with AcadTracker.",
  path: "/",
});

const PROBLEMS = [
  "Missed follow-ups and deadlines",
  "Confusing application statuses",
  "Lost or outdated documents",
  "No single source of truth for student data",
];

const FEATURES = [
  {
    icon: ListChecks,
    title: "Student Management",
    description:
      "Personal details, academic history, visa status, and counseling notes, all in one unified profile.",
  },
  {
    icon: Bell,
    title: "Smart Follow-Ups",
    description:
      "Automatically maintain follow up lists so your team never misses a call or reminder.",
  },
  {
    icon: FolderClock,
    title: "Document Storage",
    description:
      "Store transcripts, offer letters, payments, and visa documents with clear received/pending status.",
  },
  {
    icon: FileCheck2,
    title: "Application Tracking",
    description:
      "Track universities applied to and see outcomes instantly, whether it is accepted, rejected, or pending.",
  },
];

const DIFFERENTIATORS = [
  "Simple UI your team can learn quickly",
  "Works for small and large consultancies",
  "No unnecessary or confusing features",
];

const STEPS = [
  "Add a student",
  "Upload documents",
  "Track applications",
  "Monitor visa & payments",
  "Stay on top of follow-ups",
];

export default function Home() {
  return (
    <div className="w-full">
      {/* HERO */}
      <section className="surface-navy px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal text-center lg:text-left">
            <p className="stamp-blue mx-auto border-white/25 bg-white/10 text-blue-light lg:mx-0">
              For education consultancies
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              All your consultancy records.
              <br className="hidden sm:block" /> One powerful platform.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300 lg:mx-0">
              Manage students, documents, applications, and follow-ups
              without spreadsheets or chaos. AcadTracker is built specifically
              for educational consultancies.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/contact-us"
                className="rounded-lg bg-blue px-7 py-3.5 text-center font-semibold text-white shadow-lg shadow-blue/30 transition hover:bg-blue-dark"
              >
                Book a Free Demo
              </Link>
              <Link
                href="/pricing"
                className="rounded-lg border border-white/25 bg-white/5 px-7 py-3.5 text-center font-semibold text-white transition hover:bg-white/10"
              >
                See Pricing
              </Link>
            </div>
          </div>

          {/* Signature visual: a student dossier card */}
          <div className="reveal [animation-delay:120ms] mx-auto w-full max-w-md">
            <div className="rounded-2xl border border-slate-line bg-white p-5 shadow-2xl shadow-ink/40 sm:p-6">
              <div className="flex items-center justify-between border-b border-dashed border-slate-line pb-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    Student File · #EN-4821
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold text-ink">
                    Ananya Sharma
                  </p>
                </div>
                <span className="stamp-green">Accepted</span>
              </div>

              <ul className="mt-4 space-y-3">
                {[
                  { label: "Offer letter received", done: true },
                  { label: "Visa application filed", done: true },
                  { label: "Tuition deposit paid", done: false },
                ].map((row) => (
                  <li
                    key={row.label}
                    className="flex items-center gap-3 text-sm text-ink"
                  >
                    {row.done ? (
                      <CircleCheck size={18} className="shrink-0 text-status-green" />
                    ) : (
                      <Clock size={18} className="shrink-0 text-muted" />
                    )}
                    <span className={row.done ? "" : "text-muted"}>
                      {row.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between rounded-lg bg-paper px-4 py-3">
                <span className="text-xs font-semibold text-muted">
                  Next follow-up
                </span>
                <span className="stamp-gold">Tomorrow, 11:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="divider-perforated" />
      </div>

      {/* PROBLEM */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Still Managing Everything in Excel?
          </h2>
          <p className="mt-4 text-muted">
            Most consultancies still rely on spreadsheets, WhatsApp
            messages, and scattered files.
          </p>

          <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
            {PROBLEMS.map((item) => (
              <div
                key={item}
                className="card-lift rounded-xl border border-slate-line bg-white p-5"
              >
                <p className="font-medium text-ink">{item}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 font-semibold text-blue">
            AcadTracker replaces chaos with clarity.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="divider-perforated" />
      </div>

      {/* FEATURES */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
            Everything Your Consultancy Needs, In One Place
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="card-lift rounded-xl border border-slate-line bg-white p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-light">
                  <Icon size={22} className="text-blue" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="divider-perforated" />
      </div>

      {/* DIFFERENTIATOR */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Built Specifically for Educational Consultancies
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-muted">
            AcadTracker is not a generic CRM and not another spreadsheet. It&apos;s
            built around how consultancies actually work.
          </p>

          <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            {DIFFERENTIATORS.map((item) => (
              <div
                key={item}
                className="card-lift rounded-xl border border-slate-line bg-white p-5"
              >
                <p className="text-ink">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="divider-perforated" />
      </div>

      {/* HOW IT WORKS - this is a real sequence, so numbering earns its place */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
            How AcadTracker Works
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((step, index) => (
              <div
                key={step}
                className="card-lift rounded-xl border border-slate-line bg-white p-6 text-center"
              >
                <div className="mx-auto font-mono text-2xl font-bold text-blue">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="mt-3 font-medium text-ink">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="surface-navy mx-auto max-w-5xl rounded-2xl border border-white/10 px-6 py-14 text-center shadow-xl shadow-ink/20 sm:px-12 sm:py-16">
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Ready to Replace Spreadsheets for Good?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Bring clarity, structure, and efficiency to your consultancy
            operations.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact-us"
              className="rounded-lg bg-white px-7 py-3.5 text-center font-semibold text-ink transition hover:bg-slate-100"
            >
              Book a Free Demo
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-white/30 px-7 py-3.5 text-center font-semibold text-white transition hover:bg-white/10"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
