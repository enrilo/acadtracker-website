import PricingClient from "./PricingClient";
import { pageMetadata, SITE_URL, SITE_NAME } from "@/lib/seo-config";

export const metadata = pageMetadata({
  title: "Pricing - Simple Plans for Educational Consultancies",
  description:
    "Transparent pricing for AcadTracker's consultancy management software. Choose the Regular plan for growing teams or a custom Enterprise plan for larger institutions.",
  path: "/pricing",
});

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: `${SITE_NAME} - Consultancy Management Software`,
  description:
    "Consultancy management software for educational consultancies: student management, visa and application tracking, document storage, and follow-ups.",
  brand: { "@type": "Brand", name: SITE_NAME },
  offers: [
    {
      "@type": "Offer",
      name: "Regular",
      price: "6900",
      priceCurrency: "INR",
      url: `${SITE_URL}/pricing`,
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Enterprise",
      priceCurrency: "INR",
      url: `${SITE_URL}/pricing`,
      availability: "https://schema.org/InStock",
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <PricingClient />
    </>
  );
}
