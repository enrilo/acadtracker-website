import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: "Read the terms of service for using AcadTracker's consultancy management software.",
  path: "/terms-of-service",
});

const icons = [
  "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", // effective date - clock
  "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // introduction - info
  "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", // eligibility - person
  "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2M5 21h2m0 0h10M7 7h.01M7 11h.01M7 15h.01M12 7h.01M12 11h.01M12 15h.01M17 7h.01M17 11h.01M17 15h.01", // scope - building
  "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", // responsibilities - document
  "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", // data protection - lock
  "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 100-8 4 4 0 000 8zm6 0a4 4 0 10-8 0", // access & permissions - people
  "M17 9V7a4 4 0 00-8 0v2M5 9h14l1 12H4L5 9z", // subscription - bag
  "M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", // IP - shield
  "M13 10V3L4 14h7v7l9-11h-7z", // availability - lightning
  "M6 18L18 6M6 6l12 12", // termination - x
  "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", // liability - warning
  "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3", // indemnification - scale
  "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", // governing law - clipboard
  "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", // changes - refresh
  "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", // contact - mail
  "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21", // children's data / no tracking - eye off
];

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

        <div className="mt-10 wrap-break-word">
          <Section icon={icons[0]} title="Effective Date"
            content={
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  These Terms of Service are effective as of{" "}
                  <span className="font-bold">September 6, 2026</span>.
                </li>
                <li>
                  Last updated on{" "}
                  <span className="font-bold">October 18, 2026</span>.
                </li>
              </ul>
            }
          />

          <Section icon={icons[1]} title="Introduction"
            content={
              <>
                <p>
                  These Terms of Service (“Terms”) govern access to and use of the
                  AcadTracker platform (“Service”) operated by Enrilo Technologies
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

          <Section icon={icons[2]} title="Eligibility and Account Registration"
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

          <Section icon={icons[3]} title="Scope of Services"
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

          <Section icon={icons[4]} title="Customer Responsibilities"
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

          <Section icon={icons[5]} title="Data Protection and Privacy"
            content={
              <>
                <p>
                  Enrilo Technologies LLP acts as a Data Processor, and the
                  consultancy acts as the Data Fiduciary as defined under Indian
                  law.
                </p>
                <p className="mt-2">
                  Processing of Personal Data is governed by our Privacy Policy
                  and Data Processing Agreement, which form an integral part of
                  these Terms.
                </p>
                <p className="mt-2">
                  Documents uploaded for students (irrespective of the type of
                  document) and for your employees or users (mainly
                  government-issued identity documents) are stored with our cloud
                  storage provider, which encrypts them at rest. The links to every uploaded document are
                  encrypted before they are stored in our database, and each time
                  a document is requested, we verify that the person requesting
                  it is authorized to view it. Other data processed through the
                  Service may or may not be encrypted.
                </p>
              </>
            }
          />

          <Section icon={icons[16]} title="Children’s Data and No Behavioural Tracking"
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

          <Section icon={icons[6]} title="User Access and Permissions"
            content={
              <p>
                You are responsible for configuring user roles, permissions, and
                access controls within your organization. Enrilo Technologies LLP
                is not responsible for unauthorized access resulting from
                improper role assignment by you.
              </p>
            }
          />

          <Section icon={icons[7]} title="Subscription, Fees, and Payments"
            content={
              <p>
                All features of the Service require payment of fees.
                Pricing, billing cycles, and payment terms shall be communicated
                separately and agreed upon prior to activation of paid features.
              </p>
            }
          />

          <Section icon={icons[8]} title="Intellectual Property"
            content={
              <>
                <p>
                  The Service, including all software, designs, logos, and
                  content, is the intellectual property of Enrilo Technologies LLP.
                </p>
                <p className="mt-2">
                  You are granted a limited, non-exclusive, non-transferable
                  license to use the Service for your internal business purposes.
                </p>
              </>
            }
          />

          <Section icon={icons[9]} title="Service Availability and Modifications"
            content={
              <p>
                We strive to maintain high availability but do not guarantee
                uninterrupted access. We may modify, suspend, or discontinue
                features with reasonable notice.
              </p>
            }
          />

          <Section icon={icons[10]} title="Termination"
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

          <Section icon={icons[11]} title="Limitation of Liability"
            content={
              <p>
                To the maximum extent permitted by law, Enrilo Technologies LLP
                shall not be liable for indirect, incidental, or consequential damages,
                including loss of data or business opportunities.
              </p>
            }
          />

          <Section icon={icons[12]} title="Indemnification"
            content={
              <p>
                You agree to indemnify and hold harmless Enrilo Technologies LLP from claims,
                damages, or liabilities arising from your use of the Service or
                violation of these Terms.
              </p>
            }
          />

          <Section icon={icons[13]} title="Governing Law and Jurisdiction"
            content={
              <p>
                These Terms shall be governed by the laws of India. Courts located
                in India shall have exclusive jurisdiction.
              </p>
            }
          />

          <Section icon={icons[14]} title="Changes to These Terms"
            content={
              <p>
                We may update these Terms from time to time. Continued use of the
                Service after updates constitutes acceptance of the revised
                Terms.
              </p>
            }
          />

          <Section icon={icons[15]} title="Contact Us"
            content={
              <>
                <p>
                  If you have any questions regarding these Terms:
                </p>
                <p className="mt-2">
                  Email:{" "}
                  <span className="text-[#2563EB]">contactus@enrilotechnologies.com</span>
                </p>
                <p className="mt-1">
                  Website:{" "}
                  <a href="https://www.acadtracker.com/contact-us" className="text-[#2563EB] underline">
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

function Section({ title, content, icon }) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-6 mb-6">
      <h2 className="text-base sm:text-lg font-bold text-[#1E293B] tracking-tight flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <svg className="w-5 h-5 text-[#1E293B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
        {title}
      </h2>
      <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
        {content}
      </div>
    </section>
  );
}
