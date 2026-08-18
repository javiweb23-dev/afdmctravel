/**
 * Minimal Zoho Bigin API client.
 *
 * Credentials come from a Self Client registered in the Zoho API Console.
 * The refresh token does not expire; access tokens last an hour and are
 * cached in module scope, which on serverless means per warm instance —
 * good enough to avoid a token request on every single submission.
 */

const ACCOUNTS_HOST = "https://accounts.zoho.com";
const API_HOST = "https://www.zohoapis.com/bigin/v2";

/** Refreshed a minute early so a request never races the expiry. */
const EXPIRY_MARGIN_MS = 60_000;

let cachedToken: {value: string; expiresAt: number} | null = null;

export function isZohoConfigured(): boolean {
  return Boolean(
    process.env.ZOHO_CLIENT_ID &&
      process.env.ZOHO_CLIENT_SECRET &&
      process.env.ZOHO_REFRESH_TOKEN,
  );
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: process.env.ZOHO_CLIENT_ID!,
    client_secret: process.env.ZOHO_CLIENT_SECRET!,
    refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
  });

  const response = await fetch(`${ACCOUNTS_HOST}/oauth/v2/token`, {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: params.toString(),
  });

  const data = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
  };

  if (!data.access_token) {
    throw new Error(`Zoho token refresh failed: ${data.error ?? "unknown"}`);
  }

  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000 - EXPIRY_MARGIN_MS,
  };

  return cachedToken.value;
}

type ZohoRecordResponse = {
  data?: {code?: string; details?: {id?: string}; message?: string}[];
};

async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = await getAccessToken();

  const response = await fetch(`${API_HOST}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Zoho-oauthtoken ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Zoho ${response.status} on ${path}: ${body.slice(0, 300)}`);
  }

  // 204 means the search found nothing, which is a normal outcome.
  if (response.status === 204) return {} as T;

  return (await response.json()) as T;
}

/** Field metadata for a module — used to map our forms onto real fields. */
export async function getFields(module: string) {
  return request<{
    fields?: {
      api_name?: string;
      field_label?: string;
      data_type?: string;
      custom_field?: boolean;
      pick_list_values?: {display_value?: string; actual_value?: string}[];
    }[];
  }>(`/settings/fields?module=${encodeURIComponent(module)}`);
}

/** Looks for an existing record so we do not create duplicate agencies. */
export async function searchRecords(module: string, criteria: string) {
  return request<{data?: {id?: string}[]}>(
    `/${module}/search?criteria=${encodeURIComponent(criteria)}`,
  );
}

/** Creates one record and returns its id. */
export async function createRecord(
  module: string,
  record: Record<string, unknown>,
): Promise<string> {
  const result = await request<ZohoRecordResponse>(`/${module}`, {
    method: "POST",
    body: JSON.stringify({data: [record]}),
  });

  const first = result.data?.[0];
  if (first?.code !== "SUCCESS" || !first.details?.id) {
    throw new Error(
      `Zoho rejected the ${module} record: ${first?.message ?? "no detail"}`,
    );
  }

  return first.details.id;
}
