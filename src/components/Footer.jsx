import Link from "next/link";
import Image from "next/image";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import { PARENT_COMPANY, LINKEDIN } from "@/lib/seo-config";
import enriloTechLogo from "@/assets/images/company-logo/no-tagline/transparent-bg/enrilo-technologies-logo-1320x320-cropped.png";

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
            <p className="mt-1 max-w-xs text-sm text-white">
              The system of record for educational consultancies, from first
              inquiry to offer letter.
            </p>
            <div className="mt-4">
              <p className="text-xs uppercase tracking-wider text-whte">
                A product by
              </p>
              <a href={PARENT_COMPANY.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex rounded-lg bg-white px-3 py-2 transition hover:opacity-90">
                <Image
                  src={enriloTechLogo}
                  alt={`${PARENT_COMPANY.name} logo`}
                  className="h-10 w-auto"
                />
              </a>
            </div>

            <div className="mt-4 flex flex-row items-center">
              <p className="text-xs uppercase tracking-wider text-white">
                Follow us on:
              </p>
              &nbsp;&nbsp;&nbsp;
              {LINKEDIN.company && (
              <a href={LINKEDIN.company} target="_blank" rel="noopener noreferrer" aria-label={`${PARENT_COMPANY.name} on LinkedIn`} className="text-slate-400 transition-colors hover:text-white">
                <LinkedinIcon className="h-5 w-5" />
              </a>
            )}
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
