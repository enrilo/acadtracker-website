// Central SEO configuration.
// Everything else (metadataBase, canonical URLs, sitemap, robots, OG tags)
// is derived from this file, so this is the only place you need to edit.

export const SITE_URL = "https://acadtracker.com";
export const SITE_NAME = "AcadTracker";
export const DEFAULT_TITLE =
  "AcadTracker - Consultancy Management Software for Education Consultants";
export const DEFAULT_DESCRIPTION =
  "AcadTracker is the all-in-one platform for educational consultancies. Track students, visa applications, documents, and follow-ups in one place, and stop running your consultancy out of spreadsheets.";

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
  "visa application management software",
  "visa consultancy software",
  "education agent software",
  "overseas education consultancy tool",
];

// AcadTracker is built and operated by its parent company, Enrilo Technologies.
// Referenced in structured data (schema.org) and the site footer so search
// engines and users can connect the product to the company behind it.
export const PARENT_COMPANY = {
  name: "Enrilo Technologies",
  legalName: "Enrilo Technologies LLP",
  url: "https://www.enrilotechnologies.com",
  email: "contactus@enrilotechnologies.com",
  logo: `${SITE_URL}/enrilo-tech-logo.png`,
  location: {
    city: "Vadodara",
    region: "Gujarat",
    country: "IN",
  },
};

// LinkedIn presence. Fill in the real URLs; leave a value as "" to omit
// that link from the UI (e.g. the product page is still pending approval).
export const LINKEDIN = {
  company: "https://www.linkedin.com/company/enrilo-technologies",
  product: "https://www.linkedin.com/showcase/acad-tracker", // AcadTracker LinkedIn showcase page
  founders: [
    { name: "Aunsh Patel", url: "https://www.linkedin.com/in/aunsh-patel/" },
    { name: "Shoaib Shaikh", url: "https://www.linkedin.com/in/shoaib98/" },
  ],
};

export const OG_IMAGE = {
  url: `${SITE_URL}/opengraph-image.png`,
  width: 1920,
  height: 1080,
  alt: `${SITE_NAME} - Consultancy Management Platform`,
};

// Square AcadTracker logo for structured data (schema.org `logo`/`image`).
// Google requires a square-ish logo of at least 112x112, so the 16:9 OG
// banner must not be used here.
export const PRODUCT_LOGO = {
  url: `${SITE_URL}/icon.png`,
  width: 500,
  height: 500,
};

// Brand colour used for the mobile browser chrome (theme-color) and PWA.
export const THEME_COLOR = "#16233f";

/**
 * Build a consistent Next.js `metadata` object for a page.
 * Guarantees every page gets a canonical URL, OpenGraph + Twitter tags,
 * and an absolute OG image, so SEO metadata never drifts page to page.
 * Pass `noIndex` for pages (e.g. 404) that must not be indexed or claim
 * a canonical URL. Pass `title` as `{ absolute: "..." }` to skip the
 * "| AcadTracker" suffix when the title already contains the brand.
 */
export function pageMetadata({ title, description, path = "/", keywords, noIndex = false }) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const fullTitle = title?.absolute ?? (title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE);

  return {
    title,
    description,
    keywords: keywords ?? SITE_KEYWORDS,
    ...(noIndex
      ? { robots: { index: false, follow: true }, alternates: { canonical: null } }
      : { alternates: { canonical: path } }),
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
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
