import { ListChecks, Bell, FolderClock, FileCheck2, ShieldCheck, Lock } from "lucide-react";
import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata({
  title: "Features - Student Management, Visa Tracking, Documents & Follow-Ups",
  description: "See how AcadTracker handles student management, visa and application tracking, document storage, and smart follow-ups in one platform built for education consultancies.",
  path: "/features",
});

const FEATURES = [
  {
    icon: ListChecks,
    title: "Student Management",
    description: "Every student's personal details, academic history, visa status, and counseling notes live in one profile, so your team gets the full picture without digging through spreadsheets.",
  }, {
    icon: Bell,
    title: "Smart Follow-Ups",
    description: "Follow-up lists build and update themselves, so no call, deadline, or reminder slips through the cracks during a student's application journey.",
  }, {
    icon: FolderClock,
    title: "Document Storage",
    description: "Transcripts, offer letters, payment receipts, and visa documents, each tagged received or pending, so nothing gets lost in an email thread again.",
  }, {
    icon: FileCheck2,
    title: "Application Tracking",
    description:
      "See every university a student has applied to and the outcome, accepted, rejected, or pending, without switching between five different tools.",
  }, {
    icon: ShieldCheck,
    title: "Visa & Payment Monitoring",
    description: "Visa stages and payment status sit side by side, giving your team an accurate, real-time view of exactly where each student stands.",
  }, {
    icon: Lock,
    title: "Role-Based Access Control",
    description: "Decide exactly what each team member can see and edit, so sensitive student and financial data stays protected as your consultancy grows.",
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
            Student management, visa tracking, document storage, and
            follow-ups, all in one consultancy management platform, so your
            team spends less time on admin and more time getting students
            to acceptance.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="card-lift rounded-xl border border-slate-line bg-white p-6">
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