import {createRecord, isZohoConfigured} from "./client";

/**
 * Sends an agency registration to Bigin.
 *
 * This form used to be a Zoho Form writing straight into the CRM, which is
 * why almost every field it collects already has a home in Companies. Those
 * existing fields are reused as they are rather than replaced.
 *
 * Like the Global Agents landing, one submission is one Companies record.
 */
const FIELD = {
  legalNameEntityType: "LEGAL_NAME_ENTITY_TYPE",
  hstGst: "HST_GST_NUMBER",
  address: "ADDRESS",
  city: "CITY",
  province: "PROVINCE",
  postalCode: "POSTAL_CODE",
  country: "COUNTRY",
  personName: "NAME1",
  personTitle: "TITLE",
  personEmail: "EMAIL",
  personPhone: "TELEFONO_CONTACTO",
  billingName: "BILLING_NAME",
  inquiry: "INQUIRY",
  form: "Formulario",
  language: "Idioma",
} as const;

/** Must match a value in the Formulario picklist. */
const FORM_NAME = "Agency Registration";

const LANGUAGES: Record<string, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
};

type Address = {
  streetAddress?: string;
  addressLine2?: string;
  city?: string;
  stateRegion?: string;
  postalCode?: string;
  country?: string;
};

export type AgencyRegistration = {
  agencyInformation?: {
    legalName?: string;
    entityType?: string;
    hstGstNumber?: string;
    address?: Address;
    phone?: string;
  };
  billingInformation?: {
    sameAsAgency?: boolean;
    businessName?: string;
    address?: Address;
  };
  businessContactInformation?: {
    firstName?: string;
    lastName?: string;
    title?: string;
    email?: string;
    phone?: string;
    inquiry?: string;
  };
  locale?: string;
};

function put(target: Record<string, unknown>, apiName: string, value: unknown) {
  if (value === undefined || value === null || value === "") return;
  target[apiName] = value;
}

/** Bigin has one street field; the form has two lines. */
function street(address: Address | undefined) {
  return [address?.streetAddress, address?.addressLine2]
    .map((part) => (part ?? "").trim())
    .filter(Boolean)
    .join(", ");
}

export async function sendAgencyRegistration(
  registration: AgencyRegistration,
): Promise<{ok: boolean; id?: string; error?: string}> {
  if (!isZohoConfigured()) {
    return {ok: false, error: "not_configured"};
  }

  try {
    const agency = registration.agencyInformation ?? {};
    const billing = registration.billingInformation ?? {};
    const contact = registration.businessContactInformation ?? {};
    const billingAddress = billing.sameAsAgency
      ? agency.address
      : billing.address;

    const legalName = (agency.legalName ?? "").trim();
    const entityType = (agency.entityType ?? "").trim();

    const record: Record<string, unknown> = {
      // Falls back to the contact's name so a record always has something
      // readable in the list, since Bigin requires a company name.
      Account_Name:
        legalName ||
        `${contact.firstName ?? ""} ${contact.lastName ?? ""}`.trim() ||
        "Unnamed agency",
      [FIELD.form]: FORM_NAME,
    };

    // The field is labelled "LEGAL NAME/ENTITY TYPE", so it carries both.
    put(
      record,
      FIELD.legalNameEntityType,
      [legalName, entityType].filter(Boolean).join(" / "),
    );
    put(record, FIELD.hstGst, agency.hstGstNumber);
    put(record, FIELD.address, street(agency.address));
    put(record, FIELD.city, agency.address?.city);
    put(record, FIELD.province, agency.address?.stateRegion);
    put(record, FIELD.postalCode, agency.address?.postalCode);
    put(record, FIELD.country, agency.address?.country);
    put(record, "Phone", agency.phone);

    // Billing goes into Bigin's own billing address fields.
    put(record, FIELD.billingName, billing.businessName);
    put(record, "Billing_Street", street(billingAddress));
    put(record, "Billing_City", billingAddress?.city);
    put(record, "Billing_State", billingAddress?.stateRegion);
    put(record, "Billing_Code", billingAddress?.postalCode);
    put(record, "Billing_Country", billingAddress?.country);

    put(
      record,
      FIELD.personName,
      `${contact.firstName ?? ""} ${contact.lastName ?? ""}`.trim(),
    );
    put(record, FIELD.personTitle, contact.title);
    put(record, FIELD.personEmail, contact.email);
    put(record, FIELD.personPhone, contact.phone);
    put(record, FIELD.inquiry, contact.inquiry);
    put(record, FIELD.language, LANGUAGES[registration.locale ?? ""]);

    const id = await createRecord("Accounts", record);
    return {ok: true, id};
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "unknown",
    };
  }
}
