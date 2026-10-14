import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import favicon from "@/assets/images/svg/a-logo-transparent.svg";
import { SITE_URL, SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION, SITE_KEYWORDS, OG_IMAGE, PRODUCT_LOGO, PARENT_COMPANY, LINKEDIN, THEME_COLOR } from "@/lib/seo-config";

export const viewport = {
  themeColor: THEME_COLOR,
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: PARENT_COMPANY.name, url: PARENT_COMPANY.url }],
  creator: PARENT_COMPANY.name,
  publisher: PARENT_COMPANY.legalName,
  category: "Business Software",
  manifest: "/manifest.webmanifest",
  formatDetection: { telephone: false, email: false, address: false },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  icons: {
    // /favicon.ico is added automatically from src/app/favicon.ico.
    icon: { url: favicon.src, type: "image/svg+xml" },
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const parentOrganizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${PARENT_COMPANY.url}/#organization`,
  name: PARENT_COMPANY.name,
  legalName: PARENT_COMPANY.legalName,
  url: PARENT_COMPANY.url,
  logo: PARENT_COMPANY.logo,
  email: PARENT_COMPANY.email,
  ...(LINKEDIN.company && { sameAs: [LINKEDIN.company] }),
  address: {
    "@type": "PostalAddress",
    addressLocality: PARENT_COMPANY.location.city,
    addressRegion: PARENT_COMPANY.location.region,
    addressCountry: PARENT_COMPANY.location.country,
  },
};

const brandOrganizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: PRODUCT_LOGO.url,
    width: PRODUCT_LOGO.width,
    height: PRODUCT_LOGO.height,
  },
  image: OG_IMAGE.url,
  description: DEFAULT_DESCRIPTION,
  ...(LINKEDIN.product && { sameAs: [LINKEDIN.product] }),
  parentOrganization: { "@id": `${PARENT_COMPANY.url}/#organization` },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: SITE_NAME,
  url: SITE_URL,
  image: PRODUCT_LOGO.url,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: DEFAULT_DESCRIPTION,
  offers: {
    "@type": "Offer",
    price: "6900",
    priceCurrency: "INR",
    url: `${SITE_URL}/pricing`,
  },
  brand: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${PARENT_COMPANY.url}/#organization` },
};

const jsonLd = [
  parentOrganizationJsonLd,
  brandOrganizationJsonLd,
  websiteJsonLd,
  softwareApplicationJsonLd,
];

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-paper" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />

        {/* THIS is the key */}
        <main className="flex-1">
          {children}
        </main>

        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}