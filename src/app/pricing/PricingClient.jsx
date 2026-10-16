"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, Info } from "lucide-react";

export default function PricingClient() {
  const [billing, setBilling] = useState("monthly");

  return (
    <div className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        {/* Header */}
        <p className="stamp-blue mx-auto">Pricing</p>
        <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          Simple Pricing for Growing Consultancies
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          Start simple with our Regular plan or unlock advanced control with
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

        {/* Pricing Cards */}
        <div className="mt-14 grid gap-6 text-left sm:mt-16 md:grid-cols-2 md:gap-8">
          {/* Regular Plan */}
          <div className="relative flex flex-col rounded-2xl border border-slate-line bg-white p-6 shadow-lg shadow-ink/5 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              Regular
            </h2>
            <p className="mt-2 text-muted">
              Everything you need to manage students efficiently.
            </p>

            {/* Price */}
            <div className="mt-6 min-h-24">
              <span className="text-4xl font-extrabold text-ink">
                ₹{billing === "monthly" ? "6900" : "5175"}
              </span>
              <span className="text-sm text-muted">
                {" "}
                /month{" "}
                {billing === "annual" && <span>(billed annually)</span>}
              </span>
              <p className="mt-2 flex items-center gap-1.5 text-base font-semibold text-ink">
                + GST as applicable
              </p>

              {billing === "annual" && (
                <div className="mt-2">
                  <span className="stamp-gold">Save 25%</span>
                </div>
              )}
            </div>

            {/* Features */}
            <ul className="mb-4 mt-8 space-y-3.5">
              {[
                "2 Master Admin",
                "20 Users",
                "Email Support",
                "Role Based Access Control",
                "Unlimited Student Records",
                "Follow Ups & Reminders",
                "Document Storage",
                "Visa & Application Tracking",
                "Analytics & Reporting",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check size={18} className="shrink-0 text-blue" />
                  <span className="text-ink">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link href="/contact-us?plan=regular" className="mt-auto block w-full cursor-pointer rounded-lg bg-blue py-3 text-center font-semibold text-white transition hover:bg-blue-dark">
              Get Started
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col rounded-2xl border border-slate-line bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              Enterprise
            </h2>
            <p className="mt-2 text-muted">
              Tailored solutions for large teams and institutions.
            </p>

            {/* Price */}
            <div className="mt-6 min-h-24">
              <span className="text-3xl font-extrabold text-ink">
                Contact Us
              </span>
              <p className="mt-1 text-sm text-muted">
                Based on team size & requirements
              </p>
            </div>

            {/* Features */}
            <ul className="mb-4 mt-8 space-y-3.5">
              {[
                "Custom Number of Master Admin",
                "Custom Number of Users",
                "Priority support",
                "All Other Things From Regular Plan",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check size={18} className="shrink-0 text-ink" />
                  <span className="text-ink">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link href="/contact-us?plan=enterprise" className="mt-auto block w-full cursor-pointer rounded-lg bg-ink py-3 text-center font-semibold text-white transition hover:bg-slate">
              Contact Sales
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-14 text-sm text-muted sm:mt-16">
          No hidden fees. Cancel anytime. Secure & compliant infrastructure
          included.
        </p>
      </div>
    </div>
  );
}