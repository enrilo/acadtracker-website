import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata({
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or may have been moved. Head back to AcadTracker's homepage to find what you need.",
  path: "/404",
});

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact-us", label: "Contact Us" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-light">
          <FileQuestion size={30} className="text-blue" />
        </div>

        <p className="stamp-blue mx-auto mt-6">Error 404</p>
        <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist, may have
          been moved, or the link might be broken.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="rounded-lg bg-blue px-7 py-3.5 text-center font-semibold text-white shadow-lg shadow-blue/30 transition hover:bg-blue-dark">
            Back to Home
          </Link>
          <Link href="/contact-us" className="rounded-lg border border-slate-line bg-white px-7 py-3.5 text-center font-semibold text-ink transition hover:bg-paper">
            Contact Us
          </Link>
        </div>

        <div className="mx-auto mt-12 max-w-md">
          <div className="divider-perforated" />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {QUICK_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-semibold text-muted transition-colors hover:text-ink">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
