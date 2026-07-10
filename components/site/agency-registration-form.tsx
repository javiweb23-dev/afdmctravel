"use client";

import {useState} from "react";

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

const countries = [
  "Canada",
  "United States",
  "Dominican Republic",
  "Mexico",
  "United Kingdom",
  "France",
  "Germany",
  "Spain",
  "Italy",
  "Brazil",
  "Argentina",
  "Colombia",
  "Australia",
  "Other",
];

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#0c4a7a] focus:ring-2 focus:ring-[#0c4a7a]/20";

type AddressInputsProps = {
  prefix: string;
  values: AddressFields;
  onChange: (field: keyof AddressFields, value: string) => void;
  disabled?: boolean;
};

function AddressInputs({prefix, values, onChange, disabled}: AddressInputsProps) {
  return (
    <>
      <label className="text-sm font-medium text-slate-700 sm:col-span-2">
        Street Address
        <input
          type="text"
          name={`${prefix}-streetAddress`}
          value={values.streetAddress}
          onChange={(event) => onChange("streetAddress", event.target.value)}
          required
          disabled={disabled}
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700 sm:col-span-2">
        Address Line 2
        <input
          type="text"
          name={`${prefix}-addressLine2`}
          value={values.addressLine2}
          onChange={(event) => onChange("addressLine2", event.target.value)}
          disabled={disabled}
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700">
        City
        <input
          type="text"
          name={`${prefix}-city`}
          value={values.city}
          onChange={(event) => onChange("city", event.target.value)}
          required
          disabled={disabled}
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700">
        State / Region / Province
        <input
          type="text"
          name={`${prefix}-stateRegion`}
          value={values.stateRegion}
          onChange={(event) => onChange("stateRegion", event.target.value)}
          required
          disabled={disabled}
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700">
        Postal / Zip Code
        <input
          type="text"
          name={`${prefix}-postalCode`}
          value={values.postalCode}
          onChange={(event) => onChange("postalCode", event.target.value)}
          required
          disabled={disabled}
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700">
        Country
        <select
          name={`${prefix}-country`}
          value={values.country}
          onChange={(event) => onChange("country", event.target.value)}
          required
          disabled={disabled}
          className={inputClass}
        >
          <option value="">—</option>
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

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

    console.log(payload);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:grid-cols-2 lg:p-10"
    >
      <div className="sm:col-span-2">
        <h2 className="border-b border-slate-200 pb-3 text-lg font-bold uppercase tracking-wide text-[#072b52]">
          Agency Information
        </h2>
      </div>
      <label className="text-sm font-medium text-slate-700">
        Legal Name
        <input
          type="text"
          name="legalName"
          value={legalName}
          onChange={(event) => setLegalName(event.target.value)}
          required
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700">
        Entity Type
        <input
          type="text"
          name="entityType"
          value={entityType}
          onChange={(event) => setEntityType(event.target.value)}
          required
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700 sm:col-span-2">
        HST / GST Number
        <input
          type="text"
          name="hstGstNumber"
          value={hstGstNumber}
          onChange={(event) => setHstGstNumber(event.target.value)}
          className={inputClass}
        />
      </label>
      <AddressInputs
        prefix="agency"
        values={agencyAddress}
        onChange={updateAgencyAddress}
      />
      <label className="text-sm font-medium text-slate-700 sm:col-span-2">
        Phone
        <input
          type="tel"
          name="agencyPhone"
          value={agencyPhone}
          onChange={(event) => setAgencyPhone(event.target.value)}
          required
          className={inputClass}
        />
      </label>

      <div className="sm:col-span-2">
        <h2 className="border-b border-slate-200 pb-3 text-lg font-bold uppercase tracking-wide text-[#072b52]">
          Billing Information
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
        Same as above
      </label>
      <label className="text-sm font-medium text-slate-700 sm:col-span-2">
        Business Name *
        <input
          type="text"
          name="businessName"
          value={businessName}
          onChange={(event) => setBusinessName(event.target.value)}
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
          Business Contact Information
        </h2>
      </div>
      <label className="text-sm font-medium text-slate-700">
        First Name
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700">
        Last Name
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700">
        Title
        <input
          type="text"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700">
        Email
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700 sm:col-span-2">
        Phone
        <input
          type="tel"
          name="contactPhone"
          value={contactPhone}
          onChange={(event) => setContactPhone(event.target.value)}
          required
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-700 sm:col-span-2">
        Inquiry
        <textarea
          name="inquiry"
          value={inquiry}
          onChange={(event) => setInquiry(event.target.value)}
          rows={5}
          required
          className={inputClass}
        />
      </label>

      <div className="flex justify-end sm:col-span-2">
        <button
          type="submit"
          className="w-full rounded-lg bg-[#0c4a7a] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#083657] sm:w-auto"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
