import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Read AcadTracker's privacy policy to understand how we collect, use, and protect your consultancy's and students' data.",
  path: "/privacy-policy",
});

export default function PrivacyPolicy() {
  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="stamp-blue mx-auto">Legal</p>
          <h1 className="mt-5 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Privacy Policy
          </h1>
        </div>

        <div className="mt-10 space-y-10 wrap-break-word rounded-2xl border border-slate-line bg-white px-5 py-8 shadow-lg shadow-ink/5 sm:space-y-12 sm:rounded-3xl sm:px-10 sm:py-12">

        <Section
          title="Effective Date"
          content={
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                This Privacy Policy is effective as of{" "}
                <span className="font-bold">September 6, 2026</span>.
              </li>
              <li>
                Last updated on{" "}
                <span className="font-bold">September 6, 2026</span>.
              </li>
            </ul>
          }
        />

        <Section
          title="Introduction"
          content={
            <>
              <p>
                This Privacy Policy describes how TechCraft Infotech LLP
                (“Company”, “we”, “us”, or “our”), the operator of the
                AcadTracker platform, collects, uses, stores, and protects
                Personal Data when you use our platform and services (“Service”).
              </p>
              <p className="mt-2">
                Our Service is intended for use by educational consultancies and
                similar organizations. Students and individuals whose data is
                processed do not directly contract with us.
              </p>
              <p className="mt-2">
                This Policy is drafted in accordance with the Digital Personal
                Data Protection Act, 2023 (“DPDP Act”) and other applicable laws
                of India.
              </p>
              <p className="mt-2">
                Consultancies using the Service represent that they have obtained
                valid consent from students and individuals before uploading their data.
              </p>
            </>
          }
        />

        <Section title="Interpretation and Definitions"
          content={
            <>
              <h3 className="font-semibold mt-4">Definitions</h3>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Company:</strong> TechCraft Infotech LLP, Vadodara,
                  Gujarat, India, the operator of AcadTracker.
                </li>
                <li>
                  <strong>Service:</strong> The AcadTracker web and/or mobile platform.
                </li>
                <li>
                  <strong>Personal Data:</strong> Any data about an identifiable
                  individual, including students and consultancy employees.
                </li>
                <li>
                  <strong>Data Fiduciary:</strong> The consultancy using AcadTracker
                  that determines the purpose and means of processing data.
                </li>
                <li>
                  <strong>Data Processor:</strong> TechCraft Infotech LLP, which
                  processes Personal Data on behalf of Data Fiduciaries.
                </li>
                <li>
                  <strong>You:</strong> A user of the Service, including
                  consultancies, employees, or students whose data is processed.
                </li>
              </ul>
            </>
          }
        />

        <Section title="Categories of Personal Data We Collect"
          content={
            <>
              <p>
                Depending on how the Service is used, we may collect and process
                the following categories of Personal Data:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Full name, email address, phone number</li>
                <li>Residential address and location details</li>
                <li>Educational records and test scores</li>
                <li>University and college application details</li>
                <li>Passport, visa, and immigration information</li>
                <li>Financial records, payment receipts, and fee details</li>
                <li>Documents uploaded to the platform</li>
                <li>User account credentials and access roles</li>
                <li>Usage logs, device information, and IP address</li>
              </ul>
            </>
          }
        />

        <Section title="Purpose of Processing"
          content={
            <>
              <p>We process Personal Data strictly for the following purposes:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Providing and maintaining the Service</li>
                <li>Managing student admissions and applications</li>
                <li>Document storage and record management</li>
                <li>User authentication and access control</li>
                <li>Customer support and issue resolution</li>
                <li>Legal and regulatory compliance</li>
                <li>Security monitoring and fraud prevention</li>
              </ul>
            </>
          }
        />

        <Section title="Legal Basis for Processing"
          content={
            <p>
              We process Personal Data based on consent, contractual necessity,
              and legitimate use as permitted under the Digital Personal Data
              Protection Act, 2023. Consultancies using the Service represent
              that they have obtained valid consent from students whose data is
              processed on the platform.
            </p>
          }
        />

        <Section title="Data Sharing and Disclosure"
          content={
            <>
              <p>
                We do not sell or rent Personal Data. Personal Data may be shared
                only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  With trusted Service Providers (cloud hosting, storage,
                  communication services) strictly for operating the Service
                </li>
                <li>With Data Fiduciaries (consultancies) authorized by users</li>
                <li>To comply with legal obligations or lawful requests</li>
                <li>
                  During mergers, acquisitions, or restructuring, subject to
                  data protection safeguards
                </li>
              </ul>
            </>
          }
        />

        <Section title="Data Retention"
          content={
            <p>
              Personal Data is retained only for as long as necessary to fulfill
              the purposes outlined in this Policy or to comply with legal
              obligations. Upon account termination or valid deletion requests,
              data is securely deleted or anonymized unless retention is
              required by law.
            </p>
          }
        />

        <Section title="Cross-Border Data Transfers"
          content={
            <p>
              Personal Data may be stored or processed outside India using secure
              cloud infrastructure. Such transfers are conducted in compliance
              with the DPDP Act and appropriate technical and organizational
              safeguards are implemented.
            </p>
          }
        />

        <Section title="Children’s Personal Data"
          content={
            <>
              <p>
                The Service processes data of students and leads irrespective of
                age, and students do not contract with us directly. Where a
                student is under 18, the consultancy acting as Data Fiduciary is
                responsible for obtaining verifiable consent from a parent or
                legal guardian before uploading that student&apos;s data, as
                required by the DPDP Act.
              </p>
              <p className="mt-2">
                We do not use any data, whether of students, leads, or employees,
                for behavioural tracking, profiling, or targeted advertising,
                irrespective of age.
              </p>
            </>
          }
        />

        <Section title="Your Rights Under Indian Law"
          content={
            <>
              <p>
                Subject to applicable law, you have the right to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Access your Personal Data</li>
                <li>Request correction or updating of inaccurate data</li>
                <li>Request deletion of Personal Data</li>
                <li>Withdraw consent where applicable</li>
                <li>Raise grievances regarding data processing</li>
              </ul>
            </>
          }
        />

        <Section title="Security of Personal Data"
          content={
            <p>
              We implement appropriate technical and organizational security
              measures to protect Personal Data against unauthorized access,
              loss, misuse, or alteration. However, no method of transmission or
              storage is completely secure.
            </p>
          }
        />

        <Section title="Grievance Redressal"
          content={
            <>
              <p>
                In accordance with the DPDP Act, grievances may be addressed to:
              </p>
              <p className="mt-2 font-medium">
                Grievance Officer – TechCraft Infotech LLP (AcadTracker)
              </p>
              <p>Email: <span className="text-[#2563EB]">support@techcraftinfotech.com</span></p>
              <p className="mt-1">
                We aim to resolve grievances within a reasonable timeframe.
              </p>
            </>
          }
        />

        <Section title="Changes to This Privacy Policy"
          content={
            <p>
              We may update this Privacy Policy periodically. Any changes will
              be posted on this page with the updated effective date.
            </p>
          }
        />

        <Section title="Contact Us"
          content={
            <>
              <p>If you have questions regarding this Privacy Policy:</p>
              <p className="mt-2">
                Email: <span className="text-[#2563EB]">support@techcraftinfotech.com</span>
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