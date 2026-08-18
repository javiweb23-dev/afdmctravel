import {
  createRecord,
  isZohoConfigured,
  searchRecords,
} from "./client";

/**
 * Sends a Global Agents landing submission to Bigin.
 *
 * Shape agreed with the team:
 *   Companies  — the agency itself, one record reused across every form
 *   Pipelines  — one deal per submission, in the "Global Agents" pipeline
 *   Contacts   — deliberately untouched; reserved for adventuresfinder
 *
 * Custom field API names live in FIELD below. They are read from the account
 * with `npm run zoho:fields` rather than guessed, because Zoho derives api
 * names from the label at creation time and they rarely match what you expect.
 */

/**
 * Custom field API names, filled in from the account's own metadata.
 * Anything left empty is skipped rather than sent, so a missing field
 * degrades to a partial record instead of a rejected one.
 */
const FIELD = {
  company: {
    source: "",
    country: "",
  },
  deal: {
    contactFirstName: "",
    contactLastName: "",
    contactEmail: "",
    contactPhone: "",
    country: "",
    interest: "",
    comments: "",
    marketingConsent: "",
    language: "",
    leadSource: "",
    campaign: "",
  },
} as const;

/** Set once the pipeline exists; without it Bigin uses the default one. */
const PIPELINE_NAME = "Global Agents";

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
  leadSource?: string;
  utm_campaign?: string;
};

/**
 * Adds a field only when we know its api name and have a value for it.
 * An unmapped field is skipped rather than sent, so a record missing one
 * custom field still saves instead of being rejected outright.
 */
function put(
  target: Record<string, unknown>,
  apiName: string,
  value: unknown,
) {
  if (!apiName) return;
  if (value === undefined || value === null || value === "") return;
  target[apiName] = value;
}

/** Escapes a value for use inside a Zoho search criteria string. */
function criteriaValue(value: string) {
  return value.replace(/[()]/g, "").trim();
}

async function findOrCreateCompany(lead: GlobalAgentsLead): Promise<string> {
  const name = criteriaValue(lead.agencyCompany);

  // Reuse the agency if it is already on file, whichever form created it.
  const existing = await searchRecords(
    "Accounts",
    `(Account_Name:equals:${name})`,
  );
  const found = existing.data?.[0]?.id;
  if (found) return found;

  const company: Record<string, unknown> = {Account_Name: lead.agencyCompany};
  put(company, "Phone", lead.phone);
  put(company, FIELD.company.source, "Global Agents");
  put(company, FIELD.company.country, lead.country);

  return createRecord("Accounts", company);
}

/**
 * Returns the Bigin deal id, or null when the CRM is not configured.
 * Never throws for a caller: a CRM problem must not cost us the lead.
 */
export async function sendGlobalAgentsLead(
  lead: GlobalAgentsLead,
): Promise<{ok: boolean; dealId?: string; error?: string}> {
  if (!isZohoConfigured()) {
    return {ok: false, error: "not_configured"};
  }

  try {
    const companyId = await findOrCreateCompany(lead);

    const languages: Record<string, string> = {
      en: "English",
      es: "Spanish",
      fr: "French",
    };

    const deal: Record<string, unknown> = {
      Deal_Name: `${lead.agencyCompany} — ${lead.interest}`,
      Account_Name: companyId,
      Pipeline: PIPELINE_NAME,
    };
    put(deal, FIELD.deal.contactFirstName, lead.firstName);
    put(deal, FIELD.deal.contactLastName, lead.lastName);
    put(deal, FIELD.deal.contactEmail, lead.email);
    put(deal, FIELD.deal.contactPhone, lead.phone);
    put(deal, FIELD.deal.country, lead.country);
    put(deal, FIELD.deal.interest, lead.interest);
    put(deal, FIELD.deal.comments, lead.comments);
    put(deal, FIELD.deal.marketingConsent, lead.marketingConsent);
    put(deal, FIELD.deal.language, languages[lead.locale ?? ""] ?? lead.locale);
    put(deal, FIELD.deal.leadSource, lead.leadSource);
    put(deal, FIELD.deal.campaign, lead.utm_campaign);

    const dealId = await createRecord("Deals", deal);

    return {ok: true, dealId};
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "unknown",
    };
  }
}
