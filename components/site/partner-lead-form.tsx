"use client";

import {useEffect, useState} from "react";
import {
  captureAttribution,
  readAttribution,
} from "@/lib/campaign-tracking";
import {
  INTEREST_VALUES,
  type PartnerLandingCopy,
} from "@/lib/content/partners-landing";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#0c4a7a] focus:ring-2 focus:ring-[#0c4a7a]/20";

const labelClass = "text-sm font-medium text-slate-700";

function Required() {
  return <span className="text-amber-600">*</span>;
}

export function PartnerLeadForm({
  copy,
  locale,
}: {
  copy: PartnerLandingCopy["form"];
  locale: string;
}) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Runs once on arrival, before the visitor can navigate away or switch
  // language, so the campaign that brought them here is the one recorded.
  useEffect(() => {
    captureAttribution();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const interestIndex = Number(formData.get("interestIndex") ?? -1);

    const payload = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      agencyCompany: String(formData.get("agencyCompany") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      country: String(formData.get("country") ?? ""),
      // Sent as the canonical English value so the CRM stays consistent
      // whatever language the visitor filled the form in.
      interest: INTEREST_VALUES[interestIndex] ?? "",
      comments: String(formData.get("comments") ?? ""),
      marketingConsent: formData.get("marketingConsent") === "on",
      website: String(formData.get("website") ?? ""),
      locale,
      ...readAttribution(),
    };

    try {
      const response = await fetch("/api/partner-lead", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSent(true);
    } catch {
      setError(copy.errorMessage);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div
        className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-12"
        role="status"
      >
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-amber-100 text-2xl text-amber-700">
          ✓
        </div>
        <h3 className="mt-6 text-2xl font-bold text-[#072b52]">
          {copy.successTitle}
        </h3>
        <p className="mt-4 text-slate-600">
          {copy.successBody}{" "}
          <a
            href="mailto:director@afdmctravel.com"
            className="font-semibold text-[#072b52] underline-offset-2 hover:underline"
          >
            director@afdmctravel.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8 lg:p-10"
    >
      <h2 className="text-2xl font-bold text-[#072b52] sm:text-3xl">
        {copy.title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {copy.intro}
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          {copy.firstName} <Required />
          <input
            type="text"
            name="firstName"
            autoComplete="given-name"
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          {copy.lastName} <Required />
          <input
            type="text"
            name="lastName"
            autoComplete="family-name"
            required
            className={inputClass}
          />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          {copy.agencyCompany} <Required />
          <input
            type="text"
            name="agencyCompany"
            autoComplete="organization"
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          {copy.email} <Required />
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          {copy.phone}
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          {copy.country} <Required />
          <input
            type="text"
            name="country"
            autoComplete="country-name"
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          {copy.interest} <Required />
          <select
            name="interestIndex"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              {copy.interestPlaceholder}
            </option>
            {copy.interestOptions.map((option, index) => (
              <option key={option} value={index}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          {copy.comments}
          <textarea
            name="comments"
            rows={4}
            placeholder={copy.commentsPlaceholder}
            className={inputClass}
          />
        </label>
      </div>

      {/* Opt-in, unticked, and separate from submitting: consent to marketing
          email has to be given deliberately, not bundled into the enquiry. */}
      <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-slate-600">
        <input
          type="checkbox"
          name="marketingConsent"
          className="mt-0.5 size-4 shrink-0 rounded border-slate-300 text-[#0c4a7a]"
        />
        <span>{copy.consent}</span>
      </label>

      {/* Honeypot — hidden from users, catches automated submissions. */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {error ? (
        <p className="mt-6 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full rounded-lg bg-[#072b52] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#05233f] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? copy.sending : copy.submit}
      </button>

      <p className="mt-4 text-center text-xs text-slate-500">{copy.privacy}</p>
    </form>
  );
}
