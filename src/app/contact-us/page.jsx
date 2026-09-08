import ContactUsClient from "./ContactUsClient";
import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata({
  title: "Contact Us - Talk to the AcadTracker Team",
  description:
    "Have questions about AcadTracker's consultancy management software? Reach out to our team for a demo, pricing details, or support for your education consultancy.",
  path: "/contact-us",
});

export default function ContactUsPage() {
  return <ContactUsClient />;
}
