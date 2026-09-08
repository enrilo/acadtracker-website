// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import { Menu, X } from "lucide-react";
// import logo from "@/assets/images/transparent-bg/without-tagline/acadtracker-without-tagline-1920x1080.png";

// const NAV_LINKS = [
//   { href: "/", label: "Home" },
//   { href: "/features", label: "Features" },
//   { href: "/pricing", label: "Pricing" },
//   { href: "/contact-us", label: "Contact us" },
// ];

// export default function Header() {
//   const pathname = usePathname();
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Close the mobile menu on route change so it never lingers open.
//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setMenuOpen(false);
//   }, [pathname]);

//   // Lock body scroll while the mobile menu is open.
//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [menuOpen]);

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-slate-line">
//       <div className="bg-white/90 backdrop-blur-sm">
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
//           {/* Logo */}
//           <Link href="/" className="relative z-50 flex shrink-0 items-center">
//             <Image
//               src={logo}
//               alt="AcadTracker"
//               height={60}
//               priority
//               className="h-20 w-auto sm:h-12"
//             />
//           </Link>

//           {/* Desktop nav */}
//           <nav className="hidden lg:flex lg:items-center lg:gap-8">
//             {NAV_LINKS.map((link) => {
//               const isActive = pathname === link.href;
//               return (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className={`text-sm font-semibold transition-colors ${
//                     isActive
//                       ? "text-ink"
//                       : "text-muted hover:text-ink"
//                   }`}
//                 >
//                   {link.label}
//                 </Link>
//               );
//             })}
//           </nav>

//           <div className="hidden lg:block">
//             <Link
//               href="/contact-us"
//               className="rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate"
//             >
//               Book a demo
//             </Link>
//           </div>

//           {/* Mobile toggle */}
//           <button
//             type="button"
//             className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-ink lg:hidden"
//             onClick={() => setMenuOpen((open) => !open)}
//             aria-label={menuOpen ? "Close menu" : "Open menu"}
//             aria-expanded={menuOpen}
//           >
//             {menuOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>
//       </div>
//       <div
//         className={`fixed inset-0 top-[57px] z-40 bg-white transition-transform duration-300 ease-out lg:hidden ${
//           menuOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <nav className="flex flex-col gap-1 px-4 py-6">
//           {NAV_LINKS.map((link) => {
//             const isActive = pathname === link.href;
//             return (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`rounded-lg px-3 py-3 text-base font-semibold ${
//                   isActive ? "bg-blue-light text-blue" : "text-ink"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             );
//           })}
//           <div className="my-3 divider-perforated" />
//           <Link
//             href="/privacy-policy"
//             className="rounded-lg px-3 py-3 text-sm text-muted"
//           >
//             Privacy Policy
//           </Link>
//           <Link
//             href="/terms-and-conditions"
//             className="rounded-lg px-3 py-3 text-sm text-muted"
//           >
//             Terms &amp; conditions
//           </Link>
//           <Link
//             href="/contact-us"
//             className="mt-4 rounded-lg bg-ink px-5 py-3 text-center text-base font-semibold text-white"
//           >
//             Book a demo
//           </Link>
//         </nav>
//       </div>
//     </header>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact-us", label: "Contact Us" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu on route change so it never lingers open.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-line shadow-sm shadow-ink/5">
      <div className="bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-50 flex items-center font-display text-xl font-bold tracking-tight sm:text-2xl"
          >
            <span className="text-ink">Acad</span>
            <span className="text-blue">Tracker</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex lg:items-center lg:gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-ink"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/contact-us"
              className="rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate"
            >
              Book a demo
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-ink lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel. Deliberately NOT nested inside the blurred bar
          above: a backdrop-filter/filter on an ancestor turns it into the
          containing block for `position: fixed` descendants, which would
          trap this panel inside the ~60px header bar instead of covering
          the full screen. */}
      <div
        className={`fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain bg-white transition-transform duration-300 ease-out lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-3 text-base font-semibold ${
                  isActive ? "bg-blue-light text-blue" : "text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="my-3 divider-perforated" />
          <Link
            href="/privacy-policy"
            className="rounded-lg px-3 py-3 text-sm text-muted"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-and-conditions"
            className="rounded-lg px-3 py-3 text-sm text-muted"
          >
            Terms &amp; conditions
          </Link>
          <Link
            href="/contact-us"
            className="mt-4 rounded-lg bg-ink px-5 py-3 text-center text-base font-semibold text-white"
          >
            Book a demo
          </Link>
        </nav>
      </div>
    </header>
  );
}