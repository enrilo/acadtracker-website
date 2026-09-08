import {
  ListChecks,
  Bell,
  FolderClock,
  FileCheck2,
  ShieldCheck,
  Lock,
} from "lucide-react";

import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata({
  title: "Features - Student Management, Visa Tracking & More",
  description:
    "Explore AcadTracker's core features: student management, visa & application tracking, document storage, and smart follow-ups, all built for educational consultancies.",
  path: "/features",
});

const FEATURES = [
  {
    icon: ListChecks,
    title: "Student Management",
    description:
      "Keep every student's personal details, academic history, visa status, and counseling notes in one unified profile, so your team always has the full picture without digging through spreadsheets.",
  },
  {
    icon: Bell,
    title: "Smart Follow-Ups",
    description:
      "AcadTracker automatically maintains follow-up lists for your team, so no call, deadline, or reminder slips through the cracks during a student's application journey.",
  },
  {
    icon: FolderClock,
    title: "Document Storage",
    description:
      "Store transcripts, offer letters, payment receipts, and visa documents with a clear received or pending status, eliminating lost paperwork and endless email threads.",
  },
  {
    icon: FileCheck2,
    title: "Application Tracking",
    description:
      "Track every university a student has applied to and see outcomes instantly, whether accepted, rejected, or pending, without switching between multiple tools.",
  },
  {
    icon: ShieldCheck,
    title: "Visa & Payment Monitoring",
    description:
      "Monitor visa application stages and payment status side by side, giving your team an accurate, real-time view of where each student stands.",
  },
  {
    icon: Lock,
    title: "Role-Based Access Control",
    description:
      "Control exactly what each team member can see and edit, keeping sensitive student and financial data secure as your consultancy grows.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="w-full">
      <section className="px-4 pt-14 pb-6 sm:px-6 sm:pt-20 lg:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="stamp-blue mx-auto">Product features</p>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            Everything Your Consultancy Needs, In One Place
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            AcadTracker brings student management, visa tracking, document
            storage, and follow-ups together in a single consultancy
            management platform, so your team spends less time on admin
            and more time helping students.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="card-lift rounded-xl border border-slate-line bg-white p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-light">
                <Icon size={22} className="text-blue" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-ink">{title}</h2>
              <p className="mt-2 text-muted">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
