import { SITE_URL } from "@/lib/seo-config";

export default function sitemap() {
  // lastModified: bump a route's date when its content meaningfully changes.
  // A fixed date (rather than the build time) keeps the signal trustworthy.
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly", lastModified: "2026-10-14" },
    { path: "/features", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-09-17" },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-10-14" },
    { path: "/contact-us", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-09-17" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-09-12" },
    { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-09-12" },
    { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-09-16" },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}