// Central SEO configuration.
// IMPORTANT: Update SITE_URL to your real production domain before deploying.
// Everything else (metadataBase, canonical URLs, sitemap, robots, OG tags)
// is derived from this file, so this is the only place you need to edit.

export const SITE_URL = "https://acadtracker.com"; // <-- change to your real domain
export const SITE_NAME = "AcadTracker";
export const DEFAULT_TITLE =
  "AcadTracker - Consultancy Management Software for Education Consultants";
export const DEFAULT_DESCRIPTION =
  "AcadTracker is an all-in-one consultancy management platform for educational consultancies. Manage students, track visa applications, monitor documents, and streamline follow-ups in one place.";

// Primary keyword targets. These aren't a ranking factor on their own,
// but they document the terms every page's title/description/H1s should
// reflect, and are used to seed the `keywords` meta field.
export const SITE_KEYWORDS = [
  "consultancy management software",
  "education consultancy software",
  "student management system",
  "visa application tracking software",
  "study abroad consultancy CRM",
  "student visa management platform",
  "education agent software",
  "overseas education consultancy tool",
];

export const TWITTER_HANDLE = "@acadtracker"; // update or remove if you don't have one

// AcadTracker is built and operated by its parent company, TechCraft Infotech.
// Referenced in structured data (schema.org) and the site footer so search
// engines and users can connect the product to the company behind it.
export const PARENT_COMPANY = {
  name: "TechCraft Infotech LLP",
  legalName: "TechCraft Infotech LLP",
  url: "https://techcraftinfotech.com",
  email: "support@techcraftinfotech.com",
  logo: `${SITE_URL}/techcraft-infotech-logo.png`,
  location: {
    city: "Vadodara",
    region: "Gujarat",
    country: "IN",
  },
};

export const OG_IMAGE = {
  url: `${SITE_URL}/opengraph-image.png`,
  width: 1920,
  height: 1080,
  alt: `${SITE_NAME} - Consultancy Management Platform`,
};

// Brand colour used for the mobile browser chrome (theme-color) and PWA.
export const THEME_COLOR = "#16233f";

/**
 * Build a consistent Next.js `metadata` object for a page.
 * Guarantees every page gets a canonical URL, OpenGraph + Twitter tags,
 * and an absolute OG image, so SEO metadata never drifts page to page.
 */
export function pageMetadata({ title, description, path = "/", keywords }) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;

  return {
    title,
    description,
    keywords: keywords ?? SITE_KEYWORDS,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
