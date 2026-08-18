import {createRecord, isZohoConfigured} from "./client";

/**
 * Sends a Group RFP to Bigin.
 *
 * Four of the RFP's answers get their own field because they are what the
 * team actually filters and sorts by. The rest are written into INQUIRY as a
 * labelled block: readable on the record, but not worth spending one of the
 * 25 custom fields per module on something nobody filters.
 */
const FIELD = {
  personName: "NAME1",
  personTitle: "TITLE",
  personEmail: "EMAIL",
  personPhone: "TELEFONO_CONTACTO",
  country: "COUNTRY",
  groupSize: "TAMA_O_DE_GRUPO",
  travelDates: "FECHAS_DE_VIAJE",
  programType: "TIPO_DE_PROGRAMA",
  budget: "Presupuesto",
  inquiry: "INQUIRY",
  form: "Formulario",
  language: "Idioma",
} as const;

/** Must match a value in the Formulario picklist. */
const FORM_NAME = "Group RFP";

const LANGUAGES: Record<string, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
};

export type GroupRfp = {
  fullName?: string;
  agencyCompany?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  country?: string;
  groupSize?: string;
  travelDates?: string;
  programType?: string;
  hotelPreference?: string;
  budgetRange?: string;
  servicesRequired?: string[];
  specialRequirements?: string;
  referral?: string;
  locale?: string;
};

function put(target: Record<string, unknown>, apiName: string, value: unknown) {
  if (value === undefined || value === null || value === "") return;
  target[apiName] = value;
}

/**
 * The answers that do not have their own field, written as a labelled block
 * so they stay readable rather than becoming an anonymous run of text.
 */
function buildInquiry(rfp: GroupRfp) {
  const lines: string[] = [];

  if (rfp.hotelPreference) {
    lines.push(`Hotel preference: ${rfp.hotelPreference}`);
  }
  if (rfp.servicesRequired?.length) {
    lines.push(`Services required: ${rfp.servicesRequired.join(", ")}`);
  }
  if (rfp.referral) {
    lines.push(`How they found us: ${rfp.referral}`);
  }
  if (rfp.specialRequirements) {
    if (lines.length) lines.push("");
    lines.push("Special requirements:", rfp.specialRequirements);
  }

  return lines.join("\n");
}

export async function sendGroupRfp(
  rfp: GroupRfp,
): Promise<{ok: boolean; id?: string; error?: string}> {
  if (!isZohoConfigured()) {
    return {ok: false, error: "not_configured"};
  }

  try {
    const record: Record<string, unknown> = {
      Account_Name:
        (rfp.agencyCompany ?? "").trim() ||
        (rfp.fullName ?? "").trim() ||
        "Unnamed agency",
      [FIELD.form]: FORM_NAME,
    };

    put(record, FIELD.personName, rfp.fullName);
    put(record, FIELD.personTitle, rfp.jobTitle);
    put(record, FIELD.personEmail, rfp.email);
    put(record, FIELD.personPhone, rfp.phone);
    put(record, FIELD.country, rfp.country);

    // The form uses a number input, but it arrives as a string.
    const groupSize = Number.parseInt(rfp.groupSize ?? "", 10);
    if (Number.isFinite(groupSize)) {
      record[FIELD.groupSize] = groupSize;
    }

    put(record, FIELD.travelDates, rfp.travelDates);
    // Picklists: the options are English-only in the CMS, so every locale
    // submits the same values these lists were built from.
    put(record, FIELD.programType, rfp.programType);
    put(record, FIELD.budget, rfp.budgetRange);
    put(record, FIELD.inquiry, buildInquiry(rfp));
    put(record, FIELD.language, LANGUAGES[rfp.locale ?? ""]);

    const id = await createRecord("Accounts", record);
    return {ok: true, id};
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "unknown",
    };
  }
}
