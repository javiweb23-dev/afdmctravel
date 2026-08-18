"use client";

import {useLocale} from "next-intl";

import {useState} from "react";
import {useRouter} from "@/i18n/navigation";

type FormLabels = {
  fullName: string;
  agencyCompany: string;
  jobTitle: string;
  email: string;
  phone: string;
  country: string;
  groupSize: string;
  travelDates: string;
  programType: string;
  hotelPreference: string;
  budgetRange: string;
  servicesRequired: string;
  specialRequirements: string;
  referral: string;
};

type RfpFormProps = {
  labels: FormLabels;
  programTypeOptions: string[];
  hotelPreferenceOptions: string[];
  budgetRangeOptions: string[];
  servicesRequiredOptions: string[];
  referralOptions: string[];
  submitLabel: string;
};

export function RfpForm({
  labels,
  programTypeOptions,
  hotelPreferenceOptions,
  budgetRangeOptions,
  servicesRequiredOptions,
  referralOptions,
  submitLabel,
}: RfpFormProps) {
  const router = useRouter();
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      agencyCompany: String(formData.get("agencyCompany") ?? ""),
      jobTitle: String(formData.get("jobTitle") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      country: String(formData.get("country") ?? ""),
      groupSize: String(formData.get("groupSize") ?? ""),
      travelDates: String(formData.get("travelDates") ?? ""),
      programType: String(formData.get("programType") ?? ""),
      hotelPreference: String(formData.get("hotelPreference") ?? ""),
      budgetRange: String(formData.get("budgetRange") ?? ""),
      servicesRequired: formData.getAll("servicesRequired").map(String),
      specialRequirements: String(formData.get("specialRequirements") ?? ""),
      referral: String(formData.get("referral") ?? ""),
      locale,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      router.push("/thanks");
    } catch {
      setLoading(false);
      setError("Unable to submit your RFP. Please try again or email director@afdmctravel.com.");
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#0c4a7a] focus:ring-2 focus:ring-[#0c4a7a]/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:grid-cols-2 lg:p-8"
    >
      <label className="text-sm font-medium text-slate-700">
        {labels.fullName}
        <input type="text" name="fullName" required className={inputClass} />
      </label>
      <label className="text-sm font-medium text-slate-700">
        {labels.agencyCompany}
        <input type="text" name="agencyCompany" required className={inputClass} />
      </label>
      <label className="text-sm font-medium text-slate-700">
        {labels.jobTitle}
        <input type="text" name="jobTitle" required className={inputClass} />
      </label>
      <label className="text-sm font-medium text-slate-700">
        {labels.email}
        <input type="email" name="email" required className={inputClass} />
      </label>
      <label className="text-sm font-medium text-slate-700">
        {labels.phone}
        <input type="tel" name="phone" className={inputClass} />
      </label>
      <label className="text-sm font-medium text-slate-700">
        {labels.country}
        <input type="text" name="country" required className={inputClass} />
      </label>
      <label className="text-sm font-medium text-slate-700">
        {labels.groupSize}
        <input type="number" name="groupSize" min={10} required className={inputClass} />
      </label>
      <label className="text-sm font-medium text-slate-700">
        {labels.travelDates}
        <input type="text" name="travelDates" required className={inputClass} />
      </label>
      <label className="text-sm font-medium text-slate-700">
        {labels.programType}
        <select name="programType" required className={inputClass}>
          <option value="">—</option>
          {programTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm font-medium text-slate-700">
        {labels.hotelPreference}
        <select name="hotelPreference" required className={inputClass}>
          <option value="">—</option>
          {hotelPreferenceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm font-medium text-slate-700">
        {labels.budgetRange}
        <select name="budgetRange" required className={inputClass}>
          <option value="">—</option>
          {budgetRangeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm font-medium text-slate-700">
        {labels.referral}
        <select name="referral" required className={inputClass}>
          <option value="">—</option>
          {referralOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <fieldset className="sm:col-span-2">
        <legend className="text-sm font-medium text-slate-700">
          {labels.servicesRequired}
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {servicesRequiredOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700"
            >
              <input
                type="checkbox"
                name="servicesRequired"
                value={option}
                className="size-4 rounded border-slate-300 text-[#0c4a7a]"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="text-sm font-medium text-slate-700 sm:col-span-2">
        {labels.specialRequirements}
        <textarea
          name="specialRequirements"
          rows={4}
          className={inputClass}
        />
      </label>
      {error ? (
        <p className="sm:col-span-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="sm:col-span-2 rounded-lg bg-[#0c4a7a] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#083657] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending..." : submitLabel}
      </button>
    </form>
  );
}
