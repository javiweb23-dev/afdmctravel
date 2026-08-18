/**
 * Prints the real field structure of the Bigin account.
 *
 * Zoho derives a field's api_name from its label when you create it, so the
 * names rarely match what you would guess. Run this once the credentials are
 * in .env.local and paste the api_names into lib/zoho/global-agents-lead.ts.
 *
 *   node scripts/zoho-fields.mjs
 *   node scripts/zoho-fields.mjs Accounts     # one module only
 */

import {readFileSync} from "node:fs";

// Load .env.local without pulling in a dependency.
try {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (match) process.env[match[1] ??= ""] ||= match[2].replace(/^["']|["']$/g, "");
  }
} catch {
  // No .env.local — fall back to whatever is already in the environment.
}

const {ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN} = process.env;

if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) {
  console.error(
    "Missing credentials. Add ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET and\n" +
      "ZOHO_REFRESH_TOKEN to .env.local first.",
  );
  process.exit(1);
}

async function accessToken() {
  const response = await fetch("https://accounts.zoho.com/oauth/v2/token", {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: ZOHO_CLIENT_ID,
      client_secret: ZOHO_CLIENT_SECRET,
      refresh_token: ZOHO_REFRESH_TOKEN,
    }).toString(),
  });

  const data = await response.json();
  if (!data.access_token) {
    console.error("Could not refresh the token:", JSON.stringify(data));
    process.exit(1);
  }
  return data.access_token;
}

async function showModule(token, moduleName) {
  const response = await fetch(
    `https://www.zohoapis.com/bigin/v2/settings/fields?module=${moduleName}`,
    {headers: {Authorization: `Zoho-oauthtoken ${token}`}},
  );

  if (!response.ok) {
    console.log(`\n${moduleName}: ${response.status} ${await response.text()}`);
    return;
  }

  const {fields = []} = await response.json();
  const custom = fields.filter((f) => f.custom_field);

  console.log(`\n=== ${moduleName} — ${fields.length} fields, ${custom.length} custom ===`);
  for (const field of fields) {
    const mark = field.custom_field ? "*" : " ";
    const picks = (field.pick_list_values ?? [])
      .map((p) => p.display_value)
      .filter(Boolean);
    const suffix = picks.length ? `  [${picks.slice(0, 8).join(" | ")}]` : "";
    console.log(
      `  ${mark} ${String(field.api_name).padEnd(34)} ${String(field.data_type).padEnd(12)} ${field.field_label}${suffix}`,
    );
  }
}

const requested = process.argv[2];
const modules = requested ? [requested] : ["Accounts", "Deals", "Contacts"];
const token = await accessToken();

for (const moduleName of modules) {
  await showModule(token, moduleName);
}

console.log("\n(* = custom field)\n");
