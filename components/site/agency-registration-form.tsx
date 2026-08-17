"use client";

import {useState} from "react";
import {useTranslations} from "next-intl";

type AddressFields = {
  streetAddress: string;
  addressLine2: string;
  city: string;
  stateRegion: string;
  postalCode: string;
  country: string;
};

type AgencyRegistrationData = {
  agencyInformation: {
    legalName: string;
    entityType: string;
    hstGstNumber: string;
    address: AddressFields;
    phone: string;
  };
  billingInformation: {
    sameAsAgency: boolean;
    businessName: string;
    address: AddressFields;
  };
  businessContactInformation: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    inquiry: string;
  };
};

const emptyAddress = (): AddressFields => ({
  streetAddress: "",
  addressLine2: "",
  city: "",
  stateRegion: "",
  postalCode: "",
  country: "",
});

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#0c4a7a] focus:ring-2 focus:ring-[#0c4a7a]/20";

type AddressInputsProps = {
  prefix: string;
  values: AddressFields;
  onChange: (field: keyof AddressFields, value: string) => void;
  disabled?: boolean;
};

function AddressInputs({prefix, values, onChange, disabled}: AddressInputsProps) {
  const t = useTranslations("agencyRegistrationForm");
  const countries = t.raw("countryOptions") as string[];

  return (
    <>
      <label className="text-sm font-medium text-slate-700 sm:col-span-2">
        {t("streetAddress")}
        <input
          type="text"
          name={`${prefix}-streetAddress`}
          value={values.streetAddress}
          onChange={(event) => onChange("streetAddress", event.target.value)}
          placeholder={t("placeholders.streetAddress")}
          required
          disabled={disabled}
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700 sm:col-span-2">
        {t("addressLine2")}
        <input
          type="text"
          name={`${prefix}-addressLine2`}
          value={values.addressLine2}
          onChange={(event) => onChange("addressLine2", event.target.value)}
          placeholder={t("placeholders.addressLine2")}
          disabled={disabled}
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700">
        {t("city")}
        <input
          type="text"
          name={`${prefix}-city`}
          value={values.city}
          onChange={(event) => onChange("city", event.target.value)}
          placeholder={t("placeholders.city")}
          required
          disabled={disabled}
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700">
        {t("stateRegion")}
        <input
          type="text"
          name={`${prefix}-stateRegion`}
          value={values.stateRegion}
          onChange={(event) => onChange("stateRegion", event.target.value)}
          placeholder={t("placeholders.stateRegion")}
          required
          disabled={disabled}
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700">
        {t("postalCode")}
        <input
          type="text"
          name={`${prefix}-postalCode`}
          value={values.postalCode}
          onChange={(event) => onChange("postalCode", event.target.value)}
          placeholder={t("placeholders.postalCode")}
          required
          disabled={disabled}
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700">
        {t("country")}
        <select
          name={`${prefix}-country`}
          value={values.country}
          onChange={(event) => onChange("country", event.target.value)}
          required
          disabled={disabled}
          className={inputClass}
        >
          <option value="">{t("selectPlaceholder")}</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}

export function AgencyRegistrationForm() {
  const t = useTranslations("agencyRegistrationForm");
  const [agencyAddress, setAgencyAddress] = useState<AddressFields>(emptyAddress);
  const [billingAddress, setBillingAddress] = useState<AddressFields>(emptyAddress);
  const [sameAsAgency, setSameAsAgency] = useState(false);
  const [legalName, setLegalName] = useState("");
  const [entityType, setEntityType] = useState("");
  const [hstGstNumber, setHstGstNumber] = useState("");
  const [agencyPhone, setAgencyPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateAgencyAddress(field: keyof AddressFields, value: string) {
    setAgencyAddress((current) => {
      const next = {...current, [field]: value};
      if (sameAsAgency) {
        setBillingAddress(next);
      }
      return next;
    });
  }

  function updateBillingAddress(field: keyof AddressFields, value: string) {
    setBillingAddress((current) => ({...current, [field]: value}));
  }

  function handleSameAsAgencyChange(checked: boolean) {
    setSameAsAgency(checked);
    if (checked) {
      setBillingAddress({...agencyAddress});
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const payload: AgencyRegistrationData = {
      agencyInformation: {
        legalName,
        entityType,
        hstGstNumber,
        address: agencyAddress,
        phone: agencyPhone,
      },
      billingInformation: {
        sameAsAgency,
        businessName,
        address: sameAsAgency ? {...agencyAddress} : billingAddress,
      },
      businessContactInformation: {
        firstName,
        lastName,
        title,
        email,
        phone: contactPhone,
        inquiry,
      },
    };

    try {
      const response = await fetch("/api/agency-registration", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSent(true);
    } catch {
      setError(t("errorMessage"));
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div
        className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg sm:p-12"
        role="status"
      >
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-amber-100 text-2xl text-amber-700">
          ✓
        </div>
        <h2 className="mt-6 text-2xl font-bold text-[#072b52]">
          {t("successTitle")}
        </h2>
        <p className="mt-4 text-slate-600">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:grid-cols-2 lg:p-10"
    >
      <div className="sm:col-span-2">
        <h2 className="border-b border-slate-200 pb-3 text-lg font-bold uppercase tracking-wide text-[#072b52]">
          {t("agencyInformation")}
        </h2>
      </div>
      <label className="text-sm font-medium text-slate-700">
        {t("legalName")}
        <input
          type="text"
          name="legalName"
          value={legalName}
          onChange={(event) => setLegalName(event.target.value)}
          placeholder={t("placeholders.legalName")}
          required
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700">
        {t("entityType")}
        <input
          type="text"
          name="entityType"
          value={entityType}
          onChange={(event) => setEntityType(event.target.value)}
          placeholder={t("placeholders.entityType")}
          required
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700 sm:col-span-2">
        {t("hstGstNumber")}
        <input
          type="text"
          name="hstGstNumber"
          value={hstGstNumber}
          onChange={(event) => setHstGstNumber(event.target.value)}
          placeholder={t("placeholders.hstGstNumber")}
          className={inputClass}
        />
      </label>
      <AddressInputs
        prefix="agency"
        values={agencyAddress}
        onChange={updateAgencyAddress}
      />
      <label className="text-sm font-medium text-slate-700 sm:col-span-2">
        {t("phone")}
        <input
          type="tel"
          name="agencyPhone"
          value={agencyPhone}
          onChange={(event) => setAgencyPhone(event.target.value)}
          placeholder={t("placeholders.phone")}
          required
          className={inputClass}
        />
      </label>

      <div className="sm:col-span-2">
        <h2 className="border-b border-slate-200 pb-3 text-lg font-bold uppercase tracking-wide text-[#072b52]">
          {t("billingInformation")}
        </h2>
      </div>
      <label className="flex items-center gap-2.5 text-sm font-medium text-slate-700 sm:col-span-2">
        <input
          type="checkbox"
          name="sameAsAgency"
          checked={sameAsAgency}
          onChange={(event) => handleSameAsAgencyChange(event.target.checked)}
          className="size-4 rounded border-slate-300 text-[#0c4a7a]"
        />
        {t("sameAsAbove")}
      </label>
      <label className="text-sm font-medium text-slate-700 sm:col-span-2">
        {t("businessName")}
        <input
          type="text"
          name="businessName"
          value={businessName}
          onChange={(event) => setBusinessName(event.target.value)}
          placeholder={t("placeholders.businessName")}
          required
          className={inputClass}
        />
      </label>
      <AddressInputs
        prefix="billing"
        values={billingAddress}
        onChange={updateBillingAddress}
        disabled={sameAsAgency}
      />

      <div className="sm:col-span-2">
        <h2 className="border-b border-slate-200 pb-3 text-lg font-bold uppercase tracking-wide text-[#072b52]">
          {t("businessContactInformation")}
        </h2>
      </div>
      <label className="text-sm font-medium text-slate-700">
        {t("firstName")}
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          placeholder={t("placeholders.firstName")}
          required
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700">
        {t("lastName")}
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          placeholder={t("placeholders.lastName")}
          required
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700">
        {t("title")}
        <input
          type="text"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder={t("placeholders.title")}
          required
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700">
        {t("email")}
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t("placeholders.email")}
          required
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700 sm:col-span-2">
        {t("phone")}
        <input
          type="tel"
          name="contactPhone"
          value={contactPhone}
          onChange={(event) => setContactPhone(event.target.value)}
          placeholder={t("placeholders.phone")}
          required
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700 sm:col-span-2">
        {t("inquiry")}
        <textarea
          name="inquiry"
          value={inquiry}
          onChange={(event) => setInquiry(event.target.value)}
          placeholder={t("placeholders.inquiry")}
          rows={5}
          required
          className={inputClass}
        />
      </label>

      {error ? (
        <p className="sm:col-span-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
      <div className="flex justify-end sm:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#0c4a7a] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#083657] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {loading ? t("sending") : t("submit")}
        </button>
      </div>
    </form>
  );
}
