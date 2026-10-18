"use client";
import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { PLANS, CORE_FEATURES } from "@/lib/plans";

export default function PricingClient() {
  const [billing, setBilling] = useState("monthly");

  return (
    <div className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        {/* Header */}
        <p className="stamp-blue mx-auto">Pricing</p>
        <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          Simple Pricing for Growing Consultancies
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          Start with Lite, grow into Regular, or unlock advanced control with
          Enterprise.
        </p>

        {/* Billing Toggle */}
        <div className="mt-10 flex justify-center">
          <div className="flex rounded-full bg-slate-line/60 p-1">
            <button onClick={() => setBilling("monthly")}
              className={`cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition sm:px-6 ${
                billing === "monthly"
                  ? "bg-white text-ink shadow"
                  : "text-muted"
              }`}
            >
              Monthly
            </button>
            <button onClick={() => setBilling("annual")} className={`cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition sm:px-6 ${ billing === "annual" ? "bg-white text-ink shadow" : "text-muted" }`}>
              Annual
            </button>
          </div>
        </div>

        {/* Plans: one panel, split into columns */}
        <div className="mx-auto mt-14 grid max-w-md divide-y divide-slate-line overflow-hidden rounded-2xl border border-slate-line bg-white text-left shadow-lg shadow-ink/5 sm:mt-16 lg:max-w-none lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {PLANS.map((plan) => (
            <PlanColumn key={plan.id} plan={plan} billing={billing} />
          ))}
        </div>

        {/* Included in every plan */}
        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-blue/20 bg-blue-light px-6 py-8 sm:px-10 sm:py-10 lg:max-w-none">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Every plan includes
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-muted">
            The full AcadTracker platform, whichever plan you choose.
          </p>
          <ul className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-3">
            {CORE_FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-2 rounded-full border border-blue/20 bg-white px-4 py-2.5 font-medium text-ink shadow-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue">
                  <Check size={13} strokeWidth={3} className="text-white" aria-hidden="true" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Note */}
        <p className="mt-10 text-sm text-muted sm:mt-12">
          No hidden fees. Cancel anytime. Secure, access-controlled data.
        </p>
      </div>
    </div>
  );
}

function formatINR(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function PlanColumn({ plan, billing }) {
  const { id, name, tagline, price, featured, features } = plan;
  const isAnnual = billing === "annual";
  const savings = price ? Math.round((1 - price.annual / price.monthly) * 100) : 0;

  return (
    <div className={`relative flex flex-col p-6 sm:p-8 ${featured ? "bg-blue-light/40" : ""}`}>
      {featured && <div className="absolute inset-x-0 top-0 h-1 bg-blue" aria-hidden="true" />}

      <div className="flex min-h-8 items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-semibold text-ink">{name}</h2>
        {featured && (
          <span className="text-xs font-semibold uppercase tracking-wider text-blue">
            Recommended
          </span>
        )}
      </div>
      <p className="mt-1 text-muted">{tagline}</p>

      {/* Price */}
      <div className="mt-6 min-h-24">
        {price ? (
          <>
            <p className="flex flex-wrap items-center gap-x-1">
              <span className="text-4xl font-extrabold text-ink">
                {formatINR(isAnnual ? price.annual : price.monthly)}
              </span>
              <span className="text-muted">/month</span>
              {isAnnual && savings > 0 && (
                <span className="stamp-gold ml-2">Save {savings}%</span>
              )}
            </p>
            <p className="mt-2 text-base font-semibold text-ink">
              + GST as applicable
            </p>
            <p className="mt-0.5 text-sm text-muted">
              {isAnnual ? "Billed annually" : "Billed monthly"}
            </p>
          </>
        ) : (
          <>
            <p className="text-4xl font-extrabold text-ink">Contact Us</p>
            <p className="mt-2 text-sm text-muted">
              Priced to your team size & requirements
            </p>
          </>
        )}
      </div>

      {/* CTA */}
      <Link href={`/contact-us?plan=${id}`} className={`mt-6 block w-full cursor-pointer rounded-lg py-3 text-center font-semibold transition ${
        featured
          ? "bg-blue text-white hover:bg-blue-dark"
          : price
            ? "border border-slate-line bg-white text-ink hover:border-blue hover:text-blue"
            : "bg-ink text-white hover:bg-slate"
      }`}>
        {price ? "Get Started" : "Contact Sales"}
      </Link>

      {/* Features */}
      <ul className="mt-8 space-y-3.5">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <Check size={18} className="shrink-0 text-blue" aria-hidden="true" />
            <span className="text-ink">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
