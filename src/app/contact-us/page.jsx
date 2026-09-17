import { Suspense } from "react";
import ContactUsClient from "./ContactUsClient";
import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata({
  title: "Contact Us - Book a Demo of AcadTracker",
  description: "Get in touch with the AcadTracker team to book a demo, ask about pricing, or get support for your education consultancy's student, visa, and application tracking.",
  path: "/contact-us",
});

export default function ContactUsPage() {
  return (
    <Suspense fallback={null}>
      <ContactUsClient />
    </Suspense>
  );
}