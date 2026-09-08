import Link from "next/link";
import Image from "next/image";
import { PARENT_COMPANY } from "@/lib/seo-config";
import techcraftLogo from "@/assets/images/company-logo/techcraft-infotech-logo-trimmed.png";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    heading: "Company",
    links: [{ href: "/contact-us", label: "Contact Us" }],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-and-conditions", label: "Terms & Conditions" },
      { href: "/terms-of-service", label: "Terms of Service" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-line bg-slate text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="font-display text-xl font-semibold text-white">
              AcadTracker
            </span>
            <p className="mt-3 max-w-xs text-sm text-slate-400">
              Consultancy management software for educational consultancies.
            </p>
            <div className="mt-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                A product by
              </p>
              <a href={PARENT_COMPANY.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex rounded-lg bg-white px-3 py-2 transition hover:opacity-90">
                <Image
                  src={techcraftLogo}
                  alt={`${PARENT_COMPANY.name} logo`}
                  width={450}
                  height={140}
                  className="h-10 w-auto"
                />
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="stamp-gold mb-4">{col.heading}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="my-8 h-px bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-3 text-sm text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()}{" "}
            <a
              href={PARENT_COMPANY.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              {PARENT_COMPANY.legalName}
            </a>
            . All rights reserved.
          </p>
          <p>Built for educational consultancies.</p>
        </div>
      </div>
    </footer>
  );
}
