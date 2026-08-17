"use client";

import {useState} from "react";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#0c4a7a] focus:ring-2 focus:ring-[#0c4a7a]/20";

const labelClass = "text-sm font-medium text-slate-700";

export function PartnerLeadForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      comments: String(formData.get("comments") ?? ""),
      website: String(formData.get("website") ?? ""),
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
      setError(
        "We could not send your message. Please try again or write to director@afdmctravel.com.",
      );
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
          Thank you — your enquiry is on its way
        </h3>
        <p className="mt-4 text-slate-600">
          Our team in Punta Cana has received your details and will get back to
          you within 48 hours. For anything urgent, email us directly at{" "}
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
        Tell Us About Your Group
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Share a few details and our Punta Cana team will come back to you within
        48 hours with next steps.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          First Name <span className="text-amber-600">*</span>
          <input
            type="text"
            name="firstName"
            autoComplete="given-name"
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Last Name <span className="text-amber-600">*</span>
          <input
            type="text"
            name="lastName"
            autoComplete="family-name"
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Phone / WhatsApp
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Email Address <span className="text-amber-600">*</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            className={inputClass}
          />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Comments
          <textarea
            name="comments"
            rows={5}
            placeholder="Group size, travel dates, type of programme, anything else we should know…"
            className={inputClass}
          />
        </label>
      </div>

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
        {loading ? "Sending…" : "Send My Enquiry"}
      </button>

      <p className="mt-4 text-center text-xs text-slate-500">
        Your details are used only to prepare your proposal and are never shared
        with third parties.
      </p>
    </form>
  );
}
