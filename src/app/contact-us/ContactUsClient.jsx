"use client";
import { useMemo } from "react";
import { useForm } from "@formspree/react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Select from "react-select";
import { TextField } from "@mui/material";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import { countryCodes } from "../components/countryCodeList.js";
import { LINKEDIN } from "@/lib/seo-config";

const PLAN_INTRO = {
  enterprise: "I'm interested in the Enterprise plan and would like to discuss pricing and requirements for my team.\n\n",
  regular: "I'm interested in getting started with the Regular plan.\n\n",
};

export default function ContactUsClient() {
  const [state, handleSubmit] = useForm("mredebve");
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const subject = plan === "enterprise" ? "Enterprise Plan Inquiry" : plan === "regular" ? "Regular Plan Inquiry" : "";

  // Form states
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(PLAN_INTRO[plan] || "");
  const [phone, setPhone] = useState("");
  const [countryCodeWithName, setCountryCodeWithName] = useState(null);
  const [menuPortalTarget, setMenuPortalTarget] = useState(null);

  // Combined full phone number
  const [fullPhone, setFullPhone] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuPortalTarget(document.body);
  }, []);

  // Update fullPhone whenever country code or phone changes
  useEffect(() => {
    if (countryCodeWithName?.value && phone.trim()) {
      const countryCode = countryCodeWithName.value;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFullPhone(`${countryCode} ${phone}`.trim());
    } else {
      setFullPhone("");
    }
  }, [countryCodeWithName, phone]);

  const countryCodeOptions = useMemo(
    () => countryCodes.map((c) => ({
      value: c.code,
      label: `${c.code} - ${c.name}`
    })),
    []
  );

  const linkedInLinks = useMemo(
    () => [
        LINKEDIN.company && { label: "Enrilo Technologies", url: LINKEDIN.company },
        LINKEDIN.product && { label: "AcadTracker", url: LINKEDIN.product },
        ...LINKEDIN.founders
          .filter((f) => f.url)
          .map((f) => ({ label: f.name, url: f.url })),
      ].filter(Boolean),
    []
  );

  return (
    <div className="px-4 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-2xl">
        {/* Success State */}
        {state.succeeded ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-lg shadow-ink/5 sm:p-10">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Thank you!
            </h2>
            <p className="mt-3 text-muted">
              We&rsquo;ve received your message. The AcadTracker team will contact you soon.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-5 shadow-lg shadow-ink/5 sm:p-8">
            <div className="mb-6 text-center">
              <p className="stamp-blue mx-auto">Get in touch</p>
              <h1 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
                {subject || "Contact Us"}
              </h1>
              <p className="mt-2 text-sm text-muted sm:text-base">
                {
                  plan === "enterprise" ? "Tell us about your team and we'll get back to you with a custom quote."
                  : "We would love to hear from you. Fill out the form below."
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {subject && (
                <input type="hidden" name="_subject" value={subject} />
              )}
              <div>
                {/* Full Name */}
                <TextField name="full_name" id="full_name" label="Please Enter Your Full Name" variant="outlined" fullWidth required value={full_name} onChange={(e) => setFullName(e.target.value)} sx={{ marginBottom: "1.25rem", minHeight: "56px", "& .MuiFormLabel-asterisk": { color: "red" }, }} />

                {/* Country Code + Phone */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row">
                  {/* Country Code */}
                  <div className="sm:w-[45%]">
                    <Select required isSearchable id="countryCode" placeholder="Country Code" options={countryCodeOptions} value={countryCodeWithName} menuPosition="fixed" menuPortalTarget={menuPortalTarget} instanceId="country-code-select" inputId="countryCode-input" onChange={(sel) => setCountryCodeWithName(sel)}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          minHeight: "56px",
                          height: "56px",
                          borderWidth: "2.5px",
                          borderRadius: "4px",
                          borderColor: state.isFocused ? "#2563EB" : "#E0E0E0",
                          boxShadow: "none",
                          cursor: "pointer",
                          "&:hover": { borderColor: "#2563EB" },
                        }),
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                    />
                  </div>

                  {/* Phone Number - NO name attribute (we only send full_phone) */}
                  <div className="sm:flex-1">
                    <TextField label="Please Enter Your Phone Number" id="phone_number" type="tel" variant="outlined" fullWidth required value={phone} onChange={(e) => setPhone(e.target.value)} sx={{ minHeight: "56px",  "& .MuiFormLabel-asterisk": { color: "red" }, }} />
                  </div>
                </div>

                {/* Hidden field - This is the only phone field sent to Formspree */}
                <input type="hidden" name="phone" value={fullPhone} />

                {/* Email Address */}
                <TextField name="email" id="email" type="email" label="Please Enter Your Email ID" placeholder="you@example.com" variant="outlined" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} sx={{ marginBottom: "1.25rem", minHeight: "56px",  "& .MuiFormLabel-asterisk": { color: "red" }, }} />
              </div>

              {/* Message */}
              <TextField name="message" id="message" label="Please Enter Your Message" placeholder="Message..." variant="outlined" fullWidth required multiline minRows={3} value={message} onChange={(e) => setMessage(e.target.value)} sx={{ marginBottom: "1.25rem",  "& .MuiFormLabel-asterisk": { color: "red" }, }} />

              {/* Button */}
              <button type="submit" disabled={state.submitting} className="w-full cursor-pointer rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate disabled:cursor-not-allowed disabled:opacity-50" >
                {state.submitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            {linkedInLinks.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-slate-100 pt-6">
                <span className="text-sm text-muted">Connect with us:</span>
                {linkedInLinks.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${link.label} on LinkedIn`} className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink">
                    <LinkedinIcon className="h-4 w-4" />
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}