// Single source of truth for pricing plans. Used by the pricing page UI and
// by the schema.org offers in structured data, so prices never drift apart.
// Prices are in INR per month, exclusive of GST. A plan with `price: null`
// has no published price ("Contact Us").

import { SITE_URL } from "@/lib/seo-config";

// Features every plan includes. Shown once below the plans instead of
// being repeated per plan.
export const CORE_FEATURES = [
  "Visa Application Module",
  "Application Tracking",
  "Follow Ups & Reminders",
  "Role Based Access Control",
  "Analytics & Reporting",
];

// Every plan lists the same rows in the same order (team, students,
// storage, leads, support), so the columns line up for comparison.
export const PLANS = [
  {
    id: "lite",
    name: "Lite",
    tagline: "For small teams getting organised.",
    price: { monthly: 4140, annual: 3105 },
    features: [
      "1 Master Admin + 10 Users",
      "Up to 500 Students",
      "20 GB Document Storage",
      "Unlimited Leads",
      "Email Support",
    ],
  }, {
    id: "regular",
    name: "Regular",
    tagline: "For growing consultancies.",
    price: { monthly: 6900, annual: 5175 },
    featured: true,
    features: [
      "2 Master Admins + 20 Users",
      "Unlimited Students",
      "Unlimited Document Storage",
      "Unlimited Leads",
      "Email Support",
    ],
  }, {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For large, multi-branch teams.",
    price: null,
    features: [
      "Custom Admins & Users",
      "Unlimited Students",
      "Unlimited Document Storage",
      "Unlimited Leads",
      "Priority Support",
    ],
  },
];

/**
 * schema.org Offer objects for every plan with a published price.
 * Plans without a price are skipped: an Offer without `price` is invalid.
 */
export function planOffers() {
  return PLANS.filter((plan) => plan.price).map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    price: String(plan.price.monthly),
    priceCurrency: "INR",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: String(plan.price.monthly),
      priceCurrency: "INR",
      valueAddedTaxIncluded: false, // price is exclusive of GST
      referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
    },
    url: `${SITE_URL}/pricing`,
    availability: "https://schema.org/InStock",
  }));
}
