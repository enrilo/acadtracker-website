import PricingClient from "./PricingClient";
import { pageMetadata, SITE_NAME, PRODUCT_LOGO, OG_IMAGE } from "@/lib/seo-config";
import { planOffers } from "@/lib/plans";

export const metadata = pageMetadata({
  title: "Pricing - Simple Plans for Educational Consultancies",
  description: "Transparent pricing for AcadTracker's consultancy management software. Start with the Lite plan from ₹4,140/month, choose Regular for unlimited students and storage, or a custom Enterprise plan for larger institutions.",
  path: "/pricing",
});

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: `${SITE_NAME} - Consultancy Management Software`,
  description: "Consultancy management software for educational consultancies: student management, a visa application module, application tracking, document storage, and follow-ups.",
  image: [PRODUCT_LOGO.url, OG_IMAGE.url],
  brand: { "@type": "Brand", name: SITE_NAME, logo: PRODUCT_LOGO.url },
  // Only plans with a published price are listed: an Offer without `price`
  // is invalid, and Enterprise pricing is "Contact Us".
  offers: planOffers(),
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