import {createRecord, isZohoConfigured} from "./client";

/**
 * Sends a Global Agents landing submission to Bigin.
 *
 * Everything lands in Companies, one record per submission — agreed with the
 * team. Two people from the same company therefore produce two rows, which is
 * intended: they are two different enquiries from two different people, and
 * the Formulario field is what you sort the list by.
 *
 * Contacts is deliberately untouched; it holds adventuresfinder transfers,
 * a separate business.
 *
 * API names below were read from the account with `npm run zoho:fields`,
 * not guessed — Zoho derives them from the label and strips accents, which
 * is how "Interés" became "Inter_s".
 */
const FIELD = {
  personName: "NAME1",
  email: "EMAIL",
  country: "COUNTRY",
  comments: "INQUIRY",
  form: "Formulario",
  interest: "Inter_s",
  marketingConsent: "Consentimiento_marketing",
  language: "Idioma",
} as const;

/** Must match a value in the Formulario picklist. */
const FORM_NAME = "Global Agents";

const LANGUAGES: Record<string, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
};

export type GlobalAgentsLead = {
  firstName: string;
  lastName: string;
  agencyCompany: string;
  email: string;
  phone?: string;
  country: string;
  interest: string;
  comments?: string;
  marketingConsent: boolean;
  locale?: string;
};

/** Adds a field only when there is a value, so Zoho never gets empty strings. */
function put(target: Record<string, unknown>, apiName: string, value: unknown) {
  if (value === undefined || value === null || value === "") return;
  target[apiName] = value;
}

/**
 * Never throws: a CRM problem must not cost us the lead, which is already
 * safe in the notification email by the time this runs.
 */
export async function sendGlobalAgentsLead(
  lead: GlobalAgentsLead,
): Promise<{ok: boolean; id?: string; error?: string}> {
  if (!isZohoConfigured()) {
    return {ok: false, error: "not_configured"};
  }

  try {
    const record: Record<string, unknown> = {
      Account_Name: lead.agencyCompany,
      [FIELD.form]: FORM_NAME,
    };

    put(record, FIELD.personName, `${lead.firstName} ${lead.lastName}`.trim());
    put(record, FIELD.email, lead.email);
    put(record, "Phone", lead.phone);
    put(record, FIELD.country, lead.country);
    put(record, FIELD.comments, lead.comments);
    // The form submits the canonical English value, which is what the
    // Interés picklist holds, so a Spanish visitor still maps cleanly.
    put(record, FIELD.interest, lead.interest);
    put(record, FIELD.marketingConsent, lead.marketingConsent);
    put(record, FIELD.language, LANGUAGES[lead.locale ?? ""]);

    const id = await createRecord("Accounts", record);
    return {ok: true, id};
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "unknown",
    };
  }
}
