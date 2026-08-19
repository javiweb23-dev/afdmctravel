/**
 * Campaign attribution for the partner landing.
 *
 * The landing is served from one URL per language, and campaigns are told
 * apart by UTM parameters rather than by having a page each — five campaigns
 * across three languages would otherwise mean fifteen pages to keep in sync.
 *
 * The parameters are copied into sessionStorage on arrival because the visitor
 * can switch language mid-visit, and a lead that lost its campaign on the way
 * to the form is a lead we cannot attribute.
 */

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type Attribution = Partial<Record<UtmKey, string>> & {
  landingPath?: string;
  referrer?: string;
};

const STORAGE_KEY = "af:campaign";

/** Values are echoed back in emails, so keep them short and boring. */
const MAX_VALUE_LENGTH = 200;

function clean(value: string | null): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim().slice(0, MAX_VALUE_LENGTH);
  return trimmed || undefined;
}

/**
 * Reads UTM parameters from the current URL and remembers them for the visit.
 * Existing values win: the campaign that brought someone here is the one that
 * gets credit, even if they later land on a URL without parameters.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const found: Attribution = {};

  for (const key of UTM_KEYS) {
    const value = clean(params.get(key));
    if (value) found[key] = value;
  }

  if (Object.keys(found).length === 0) return;

  found.landingPath = window.location.pathname;
  const referrer = clean(document.referrer);
  if (referrer) found.referrer = referrer;

  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // Private browsing can refuse storage; the lead still arrives, just
    // without attribution.
  }
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Attribution) : {};
  } catch {
    return {};
  }
}
