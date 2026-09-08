import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import favicon from "@/assets/images/svg/a-logo-transparent.svg";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  SITE_KEYWORDS,
  TWITTER_HANDLE,
  OG_IMAGE,
  PARENT_COMPANY,
  THEME_COLOR,
} from "@/lib/seo-config";

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
    icon: favicon.src,
    apple: "/icon.png",
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
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
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
  logo: OG_IMAGE.url,
  description: DEFAULT_DESCRIPTION,
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
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: DEFAULT_DESCRIPTION,
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
  },
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
      </body>
    </html>
  );
}
