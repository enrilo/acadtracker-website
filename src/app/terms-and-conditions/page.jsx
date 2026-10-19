import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "Review the terms and conditions governing the use of AcadTracker's consultancy management platform.",
  path: "/terms-and-conditions",
});

const icons = [
  "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", // effective date - clock
  "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // introduction - info
  "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", // eligibility - check circle
  "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", // account - person
  "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", // use of platform - lock
  "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", // student data - document
  "M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", // data ownership - shield
  "M17 9V7a4 4 0 00-8 0v2M5 9h14l1 12H4L5 9z", // payments - bag
  "M13 10V3L4 14h7v7l9-11h-7z", // availability - lightning
  "M6 18L18 6M6 6l12 12", // termination - x
  "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", // liability - warning
  "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3", // indemnification - scale
  "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", // changes - refresh
  "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", // governing law - clipboard
  "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", // contact - mail
  "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21", // children's data / no tracking - eye off
  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", // document security - shield check
];

export default function TermsAndConditions() {
  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="stamp-blue mx-auto">Legal</p>
          <h1 className="mt-5 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Terms &amp; Conditions
          </h1>
        </div>

        <div className="mt-10 wrap-break-word">
          <Section icon={icons[0]} title="Effective Date" content={
              <>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>These Terms are effective as of <span className="font-bold">September 6, 2026</span>.</li>
                  <li>Last updated on <span className="font-bold">October 18, 2026</span>.</li>
                </ul>
              </>
            } />

          <Section icon={icons[1]} title="Introduction" content={
            <>
              <p>
                These Terms and Conditions (&apos;Terms&apos;) govern your use of the AcadTracker platform, which is operated by Enrilo Technologies LLP (&apos;Company&apos;, &apos;we&apos;, &apos;us&apos;, or &apos;our&apos;). By accessing or using AcadTracker, you agree to be bound by these Terms, our Privacy Policy, and our Data Processing Agreement (DPA). If you do not agree, you must not use the platform.
              </p>
              <p className="mt-2">
                AcadTracker is intended for use by educational consultancies and authorized representatives. Students and individuals whose data is processed do not directly contract with us.
              </p>
            </>
          } />

          <Section icon={icons[2]} title="Eligibility" content="AcadTracker is intended for use by educational consultancies and authorized representatives. You must be legally capable of entering into a binding agreement to use our services." />

          <Section icon={icons[3]} title="Account Registration"
            content={
              <>
                <p>
                  To use AcadTracker, you must contact us to create an account. You agree to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Provide accurate and up-to-date information</li>
                  <li>Maintain the confidentiality of your login credentials</li>
                  <li>Notify us immediately of any unauthorized account use</li>
                </ul>
              </>
            }
          />

          <Section icon={icons[4]} title="Use of the Platform"
            content={
              <>
                <p>You agree to use AcadTracker only for lawful purposes. You must not:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Upload false, misleading, or unauthorized data</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Attempt to gain unauthorized access to the platform</li>
                  <li>Disrupt or interfere with platform security or functionality</li>
                </ul>
              </>
            }
          />

          <Section icon={icons[5]} title="Student Data Responsibility" content="You acknowledge that any student data uploaded to AcadTracker is your responsibility. You confirm that you have obtained all necessary permissions and consents from students before storing or processing their information on the platform." />

          <Section icon={icons[15]} title="Children’s Data and No Behavioural Tracking"
            content={
              <>
                <p>
                  AcadTracker processes data of students and leads irrespective of age. Where a student is under 18, you are responsible for obtaining verifiable consent from a parent or legal guardian before uploading that student&apos;s data, as required by the Digital Personal Data Protection Act, 2023.
                </p>
                <p className="mt-2">
                  We do not use any data, whether of students, leads, or employees, for behavioural tracking, profiling, or targeted advertising, irrespective of age.
                </p>
              </>
            }
          />

          <Section icon={icons[6]} title="Data Ownership" content="You retain ownership of all data you upload to AcadTracker. By using the platform, you grant Enrilo Technologies LLP, the owner of AcadTracker, a limited license to store, process, and display this data solely for the purpose of providing the services." />

          <Section icon={icons[16]} title="Document Security"
            content={
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Documents uploaded for students (irrespective of the type of document) and for your employees or users (mainly government-issued identity documents) are stored with our cloud storage provider, which encrypts them at rest.</li>
                <li>The links to every uploaded document are encrypted before they are stored in our database.</li>
                <li>Each time a document is requested, we verify that the person requesting it is authorized to view it.</li>
                <li>Other data on the platform may or may not be encrypted. See our Privacy Policy for details of how we protect your data.</li>
              </ul>
            }
          />

          <Section icon={icons[7]} title="Subscription & Payments" content="All features of AcadTracker require a paid subscription. Pricing, billing cycles, and payment terms will be clearly communicated at the time of purchase. Failure to complete payments may result in account suspension or termination." />

          <Section icon={icons[8]} title="Service Availability" content="While we strive to provide uninterrupted service, Enrilo Technologies LLP does not guarantee that the platform will always be available or error-free. Maintenance, updates, or unforeseen issues may result in temporary downtime." />

          <Section icon={icons[9]} title="Termination" content="We reserve the right to suspend or terminate your account if you violate these Terms or misuse the platform. You may also terminate your account at any time, subject to applicable data retention policies." />

          <Section icon={icons[10]} title="Limitation of Liability" content="To the maximum extent permitted by law, Enrilo Technologies LLP shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform." />

          <Section icon={icons[11]} title="Indemnification" content="You agree to indemnify and hold Enrilo Technologies LLP harmless from any claims, damages, or liabilities arising from your use of the platform, including violations of these Terms or applicable laws." />

          <Section icon={icons[12]} title="Changes to These Terms" content="We may update these Terms from time to time. Continued use of AcadTracker after changes are posted constitutes acceptance of the revised Terms." />

          <Section icon={icons[13]} title="Governing Law" content="These Terms shall be governed by and interpreted in accordance to Vadodara Jurisdiction." />

          <Section icon={icons[14]} title="Contact Us"
            content={
              <>
                <p>If you have questions about these Terms, please contact us at: <span className='font-medium text-[#2563EB]'>contactus@enrilotechnologies.com</span></p>
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
