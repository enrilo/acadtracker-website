import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "Review the terms and conditions governing the use of AcadTracker's consultancy management platform.",
  path: "/terms-and-conditions",
});

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

        <div className="mt-10 space-y-10 wrap-break-word rounded-2xl border border-slate-line bg-white px-5 py-8 shadow-lg shadow-ink/5 sm:space-y-12 sm:rounded-3xl sm:px-10 sm:py-12">

        <Section title="Effective Date" content={
            <>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>These Terms are effective as of <span className="font-bold">September 6, 2026</span>.</li>
                <li>Last updated on  <span className="font-bold">September 6, 2026</span>.</li>
              </ul>
            </>
          } />

        <Section title="Introduction" content={
          <>
            <p>
              These Terms and Conditions (&apos;Terms&apos;) govern your use of the AcadTracker platform, which is operated by TechCraft Infotech LLP (&apos;Company&apos;, &apos;we&apos;, &apos;us&apos;, or &apos;our&apos;). By accessing or using AcadTracker, you agree to be bound by these Terms, our Privacy Policy, and our Data Processing Agreement (DPA). If you do not agree, you must not use the platform.
            </p>
            <p className="mt-2">
              AcadTracker is intended for use by educational consultancies and authorized representatives. Students and individuals whose data is processed do not directly contract with us.
            </p>
          </>
        } />

        <Section title="Eligibility" content="AcadTracker is intended for use by educational consultancies and authorized representatives. You must be legally capable of entering into a binding agreement to use our services." />

        <Section title="Account Registration"
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

        <Section title="Use of the Platform"
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

        <Section title="Student Data Responsibility" content="You acknowledge that any student data uploaded to AcadTracker is your responsibility. You confirm that you have obtained all necessary permissions and consents from students before storing or processing their information on the platform." />

        <Section title="Children’s Data and No Behavioural Tracking"
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

        <Section title="Data Ownership" content="You retain ownership of all data you upload to AcadTracker. By using the platform, you grant AcadTracker a limited license to store, process, and display this data solely for the purpose of providing the services." />

        <Section title="Subscription & Payments" content="All features of AcadTracker require a paid subscription. Pricing, billing cycles, and payment terms will be clearly communicated at the time of purchase. Failure to complete payments may result in account suspension or termination." />

        <Section title="Service Availability" content="While we strive to provide uninterrupted service, AcadTracker does not guarantee that the platform will always be available or error-free. Maintenance, updates, or unforeseen issues may result in temporary downtime." />

        <Section title="Termination" content="We reserve the right to suspend or terminate your account if you violate these Terms or misuse the platform. You may also terminate your account at any time, subject to applicable data retention policies." />

        <Section title="Limitation of Liability" content="To the maximum extent permitted by law, TechCraft Infotech LLP shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform." />

        <Section title="Indemnification" content="You agree to indemnify and hold TechCraft Infotech LLP harmless from any claims, damages, or liabilities arising from your use of the platform, including violations of these Terms or applicable laws." />

        <Section title="Changes to These Terms" content="We may update these Terms from time to time. Continued use of AcadTracker after changes are posted constitutes acceptance of the revised Terms." />

        <Section title="Governing Law" content="These Terms shall be governed by and interpreted in accordance to Vadodara Jurisdiction." />

        <Section title="Contact Information"
          content={
            <>
              <p>If you have questions about these Terms, please contact us at: <span className='font-medium text-[#2563EB]'>support@techcraftinfotech.com</span></p>
            </>
          }
        />
        </div>
      </div>
    </div>
  )
}

function Section({ title, content }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-ink sm:text-2xl">
        {title}
      </h2>
      <div className="mt-1 leading-relaxed text-muted">
        {content}
      </div>
    </section>
  );
}