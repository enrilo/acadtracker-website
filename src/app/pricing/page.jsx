import PricingClient from "./PricingClient";
import { pageMetadata, SITE_URL, SITE_NAME, PRODUCT_LOGO, OG_IMAGE } from "@/lib/seo-config";

export const metadata = pageMetadata({
  title: "Pricing - Simple Plans for Educational Consultancies",
  description: "Transparent pricing for AcadTracker's consultancy management software. Choose the Regular plan for growing teams or a custom Enterprise plan for larger institutions.",
  path: "/pricing",
});

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: `${SITE_NAME} - Consultancy Management Software`,
  description: "Consultancy management software for educational consultancies: student management, visa and application tracking, document storage, and follow-ups.",
  image: [PRODUCT_LOGO.url, OG_IMAGE.url],
  brand: { "@type": "Brand", name: SITE_NAME, logo: PRODUCT_LOGO.url },
  // Only plans with a published price are listed: an Offer without `price`
  // is invalid, and Enterprise pricing is "Contact Us".
  offers: [
    {
      "@type": "Offer",
      name: "Regular",
      price: "6900",
      priceCurrency: "INR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "6900",
        priceCurrency: "INR",
        valueAddedTaxIncluded: false, // price is exclusive of GST
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
      },
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