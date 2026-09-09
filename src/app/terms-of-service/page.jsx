import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "Read the terms of service for using AcadTracker's consultancy management software.",
  path: "/terms-of-service",
});

export default function TermsOfService() {
  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="stamp-blue mx-auto">Legal</p>
          <h1 className="mt-5 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Terms of Service
          </h1>
        </div>

        <div className="mt-10 space-y-10 wrap-break-word rounded-2xl border border-slate-line bg-white px-5 py-8 shadow-lg shadow-ink/5 sm:space-y-12 sm:rounded-3xl sm:px-10 sm:py-12">

        <Section title="Effective Date"
          content={
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                These Terms of Service are effective as of{" "}
                <span className="font-bold">September 6, 2026</span>.
              </li>
              <li>
                Last updated on{" "}
                <span className="font-bold">September 6, 2026</span>.
              </li>
            </ul>
          }
        />

        <Section title="Introduction"
          content={
            <>
              <p>
                These Terms of Service (“Terms”) govern access to and use of the
                AcadTracker platform (“Service”) operated by TechCraft Infotech
                LLP (“Company”, “we”, “us”, or “our”).
              </p>
              <p className="mt-2">
                Our Service is intended for use by educational consultancies and
                similar organizations. Students and individuals whose data is
                processed on the platform do not directly contract with us.
              </p>
              <p className="mt-2">
                By accessing or using the Service, you agree to be bound by
                these Terms, our Privacy Policy, and our Data Processing
                Agreement (“DPA”).
              </p>
            </>
          }
        />

        <Section title="Eligibility and Account Registration"
          content={
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                You must be a legally registered business or organization to
                use the Service.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of
                account credentials.
              </li>
              <li>
                You agree to provide accurate and up-to-date information when
                creating an account.
              </li>
            </ul>
          }
        />

        <Section title="Scope of Services"
          content={
            <>
              <p>
                AcadTracker provides software tools that enable consultancies to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Manage student records and documents</li>
                <li>Track university and college applications</li>
                <li>Manage employee access and permissions</li>
                <li>Store academic, visa, and financial records</li>
              </ul>
            </>
          }
        />

        <Section title="Customer Responsibilities"
          content={
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                You are solely responsible for the legality of the Personal Data
                you upload or process using the Service.
              </li>
              <li>
                You confirm that you have obtained all necessary consents from
                students and individuals whose data is processed.
              </li>
              <li>
                You shall ensure compliance with applicable data protection
                laws, including the Digital Personal Data Protection Act, 2023.
              </li>
              <li>
                You shall not use the Service for unlawful or fraudulent
                activities.
              </li>
            </ul>
          }
        />

        <Section title="Data Protection and Privacy"
          content={
            <>
              <p>
                AcadTracker acts as a Data Processor, and the consultancy acts as the
                Data Fiduciary as defined under Indian law.
              </p>
              <p className="mt-2">
                Processing of Personal Data is governed by our Privacy Policy
                and Data Processing Agreement, which form an integral part of
                these Terms.
              </p>
            </>
          }
        />

        <Section title="Children’s Data and No Behavioural Tracking"
          content={
            <>
              <p>
                The Service processes data of students and leads irrespective of
                age. Where a student is under 18, you, as the Data Fiduciary, are
                responsible for obtaining verifiable consent from a parent or
                legal guardian before uploading that student&apos;s data, as
                required by the Digital Personal Data Protection Act, 2023.
              </p>
              <p className="mt-2">
                We do not use any data, whether of students, leads, or employees,
                for behavioural tracking, profiling, or targeted advertising,
                irrespective of age.
              </p>
            </>
          }
        />

        <Section title="User Access and Permissions"
          content={
            <p>
              You are responsible for configuring user roles, permissions, and
              access controls within your organization. AcadTracker is not
              responsible for unauthorized access resulting from improper role
              assignment by the customer.
            </p>
          }
        />

        <Section title="Subscription, Fees, and Payments"
          content={
            <p>
              All features of the Service require payment of fees.
              Pricing, billing cycles, and payment terms shall be communicated
              separately and agreed upon prior to activation of paid features.
            </p>
          }
        />

        <Section title="Intellectual Property"
          content={
            <>
              <p>
                The Service, including all software, designs, logos, and
                content, is the intellectual property of TechCraft Infotech LLP.
              </p>
              <p className="mt-2">
                You are granted a limited, non-exclusive, non-transferable
                license to use the Service for your internal business purposes.
              </p>
            </>
          }
        />

        <Section title="Service Availability and Modifications"
          content={
            <p>
              We strive to maintain high availability but do not guarantee
              uninterrupted access. We may modify, suspend, or discontinue
              features with reasonable notice.
            </p>
          }
        />

        <Section title="Termination"
          content={
            <>
              <p>
                We may suspend or terminate access to the Service if you violate
                these Terms or applicable laws.
              </p>
              <p className="mt-2">
                Upon termination, data handling shall be governed by the DPA
                and applicable law.
              </p>
            </>
          }
        />

        <Section title="Limitation of Liability"
          content={
            <p>
              To the maximum extent permitted by law, TechCraft Infotech LLP
              shall not be liable for indirect, incidental, or consequential damages,
              including loss of data or business opportunities.
            </p>
          }
        />

        <Section title="Indemnification"
          content={
            <p>
              You agree to indemnify and hold harmless TechCraft Infotech LLP from claims,
              damages, or liabilities arising from your use of the Service or
              violation of these Terms.
            </p>
          }
        />

        <Section title="Governing Law and Jurisdiction"
          content={
            <p>
              These Terms shall be governed by the laws of India. Courts located
              in India shall have exclusive jurisdiction.
            </p>
          }
        />

        <Section title="Changes to These Terms"
          content={
            <p>
              We may update these Terms from time to time. Continued use of the
              Service after updates constitutes acceptance of the revised
              Terms.
            </p>
          }
        />

        <Section title="Contact Us"
          content={
            <>
              <p>
                If you have any questions regarding these Terms:
              </p>
              <p className="mt-2">
                Email:{" "}
                <span className="text-[#2563EB]">support@techcraftinfotech.com</span>
              </p>
              <p className="mt-1">
                Website:{" "}
                <a href="https://www.acadtracker.com/contact-us" className="wrap-anywhere text-[#2563EB] underline">
                  https://www.acadtracker.com/contact-us
                </a>
              </p>
            </>
          }
        />
        </div>
      </div>
    </div>
  );
}

function Section({ title, content }) {
  return (
    <section>
      <h2 className="mb-1 text-xl font-semibold text-ink sm:text-2xl">
        {title}
      </h2>
      <div className="leading-relaxed text-muted">
        {content}
      </div>
    </section>
  );
}