import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Read AcadTracker's privacy policy to understand how we collect, use, and protect your consultancy's and students' data.",
  path: "/privacy-policy",
});

const icons = [
  "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", // effective date - clock
  "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // introduction - info
  "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", // definitions - book
  "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", // categories - document
  "M13 10V3L4 14h7v7l9-11h-7z", // purpose - lightning
  "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", // legal basis - clipboard
  "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 100-8 4 4 0 000 8zm6 0a4 4 0 10-8 0", // sharing - people
  "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 10v2m9-8a9 9 0 11-18 0 9 9 0 0118 0z", // retention - clock/coin
  "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // cross-border - globe
  "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", // children - person
  "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", // rights - check circle
  "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", // security - lock
  "M18.364 5.636a9 9 0 010 12.728m0 0l-4.243-4.243m4.243 4.243L18.364 5.636m-4.243 8.485a4 4 0 10-4.242-4.243", // grievance - support
  "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", // changes - refresh
  "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", // contact - mail
];

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

        <div className="mt-10 wrap-break-word">
          <Section icon={icons[0]} title="Effective Date"
            content={
              <ul className="list-disc pl-6 mb-2 space-y-1">
                <li>
                  This Privacy Policy is effective as of{" "}
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
              <ul className="list-disc pl-6 mb-2 space-y-1">
                <li>
                  This Privacy Policy describes how Enrilo Technologies LLP
                  (“Company”, “we”, “us”, or “our”), the operator of the
                  AcadTracker platform, collects, uses, stores, and protects
                  Personal Data when you use our platform and services (“Service”).
                </li>
                <li>
                  Our Service is intended for use by educational consultancies and
                  similar organizations. Students and individuals whose data is
                  processed do not directly contract with us.
                </li>
                <li>
                  This Policy is drafted in accordance with the Digital Personal
                  Data Protection Act, 2023 (“DPDP Act”) and other applicable laws
                  of India.
                </li>
                <li>
                  Consultancies using the Service represent that they have obtained
                  valid consent from students and individuals before uploading their data.
                </li>
              </ul>
            }
          />

          <Section icon={icons[2]} title="Interpretation and Definitions"
            content={
              <>
                <h3 className="font-semibold mt-4">Definitions</h3>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                  <li>
                    <strong>Company:</strong> Enrilo Technologies LLP, Vadodara,
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
                    <strong>Data Processor:</strong> Enrilo Technologies LLP, which
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

          <Section icon={icons[3]} title="Categories of Personal Data We Collect"
            content={
              <>
                <p>
                  Depending on how the Service is used, we may collect and process
                  the following categories of Personal Data:
                </p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                  <li>Full name, email address, phone number</li>
                  <li>Residential address and location details</li>
                  <li>Educational records and test scores</li>
                  <li>University and college application details</li>
                  <li>Passport, visa, and immigration information</li>
                  <li>Financial records, payment receipts, and fee details</li>
                  <li>Documents uploaded to the platform for students</li>
                  <li>
                    Documents uploaded for employees and users, mainly
                    government-issued identity documents
                  </li>
                  <li>User account credentials and access roles</li>
                  <li>Usage logs, device information, and IP address</li>
                </ul>
              </>
            }
          />

          <Section icon={icons[4]} title="Purpose of Processing"
            content={
              <>
                <p>We process Personal Data strictly for the following purposes:</p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
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

          <Section icon={icons[5]} title="Legal Basis for Processing"
            content={
              <ul className="list-disc pl-6 mb-2 space-y-1">
                <li>
                  We process Personal Data based on consent, contractual necessity,
                  and legitimate use as permitted under the Digital Personal Data
                  Protection Act, 2023. Consultancies using the Service represent
                  that they have obtained valid consent from students whose data is
                  processed on the platform.
                </li>
              </ul>
            }
          />

          <Section icon={icons[6]} title="Data Sharing and Disclosure"
            content={
              <>
                <p>
                  We do not sell or rent Personal Data. Personal Data may be shared
                  only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
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

          <Section icon={icons[7]} title="Data Retention"
            content={
              <ul className="list-disc pl-6 mb-2 space-y-1">
                <li>
                  Personal Data is retained only for as long as necessary to fulfill
                  the purposes outlined in this Policy or to comply with legal
                  obligations. Upon account termination or valid deletion requests,
                  data is securely deleted or anonymized unless retention is
                  required by law.
                </li>
              </ul>
            }
          />

          <Section icon={icons[8]} title="Cross-Border Data Transfers"
            content={
              <ul className="list-disc pl-6 mb-2 space-y-1">
                <li>
                Personal Data may be stored or processed outside India using secure
                cloud infrastructure. Such transfers are conducted in compliance
                with the DPDP Act and appropriate technical and organizational
                safeguards are implemented.
                </li>
              </ul>
            }
          />

          <Section icon={icons[9]} title="Children’s Personal Data"
            content={
              <ul className="list-disc pl-6 mb-2 space-y-1">
                <li>
                  The Service processes data of students and leads irrespective of
                  age, and students do not contract with us directly. Where a
                  student is under 18, the consultancy acting as Data Fiduciary is
                  responsible for obtaining verifiable consent from a parent or
                  legal guardian before uploading that student&apos;s data, as
                  required by the DPDP Act.
                </li>
                <li>
                  We do not use any data, whether of students, leads, or employees,
                  for behavioural tracking, profiling, or targeted advertising,
                  irrespective of age.
                </li>
              </ul>
            }
          />

          <Section icon={icons[10]} title="Your Rights Under Indian Law"
            content={
              <>
                <p>
                  Subject to applicable law, you have the right to:
                </p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                  <li>Access your Personal Data</li>
                  <li>Request correction or updating of inaccurate data</li>
                  <li>Request deletion of Personal Data</li>
                  <li>Withdraw consent where applicable</li>
                  <li>Raise grievances regarding data processing</li>
                </ul>
              </>
            }
          />

          <Section icon={icons[11]} title="Security of Personal Data"
            content={
              <>
                <p>
                  We implement appropriate technical and organizational security
                  measures to protect Personal Data against unauthorized access,
                  loss, misuse, or alteration.
                </p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li>
                    <strong>Document storage:</strong> Documents uploaded to the
                    platform, whether for a student (irrespective of the type of
                    document) or for a consultancy&apos;s employees or users
                    (mainly government-issued identity documents), are stored
                    with our cloud storage provider, which encrypts them at rest.
                  </li>
                  <li>
                    <strong>Encrypted document links:</strong> The links to every
                    uploaded document are encrypted before they are stored in
                    our database.
                  </li>
                  <li>
                    <strong>Access checks:</strong> Each time a document is
                    requested, we verify that the person requesting it is
                    authorized to view it before it is made available.
                  </li>
                  <li>
                    <strong>Other data:</strong> Other Personal Data processed on
                    the platform may or may not be encrypted, and is protected by
                    the other security measures described in this section.
                  </li>
                </ul>
                <p>
                  However, no method of transmission or storage is completely
                  secure.
                </p>
              </>
            }
          />

          <Section icon={icons[12]} title="Grievance Redressal"
            content={
              <ul className="list-disc pl-6 mb-2 space-y-1">
                <li>
                  In accordance with the DPDP Act, grievances may be addressed to:
                </li>
                <p className="mb-2 font-medium">
                  Grievance Officer – Enrilo Technologies LLP (AcadTracker)
                </p>
                <p>Email: <span className="text-[#2563EB]">contactus@enrilotechnologies.com</span></p>
                <p>
                  We aim to resolve grievances within a reasonable timeframe.
                </p>
              </ul>
            }
          />

          <Section icon={icons[13]} title="Changes to This Privacy Policy"
            content={
              <ul className="list-disc pl-6 mb-2 space-y-1">
                <li>
                  We may update this Privacy Policy periodically. Any changes will
                  be posted on this page with the updated effective date.
                </li>
              </ul>
            }
          />

          <Section icon={icons[14]} title="Contact Us"
            content={
              <ul className="list-disc pl-6 mb-2 space-y-1">
                <li>If you have questions regarding this Privacy Policy:</li>
                <p>
                  Email: <span className="text-[#2563EB]">contactus@enrilotechnologies.com</span>
                </p>
                <p className="mt-1">
                  Website:{" "}
                  <a href="https://www.acadtracker.com/contact-us" className="text-[#2563EB] underline">
                    https://www.acadtracker.com/contact-us
                  </a>
                </p>
              </ul>
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
