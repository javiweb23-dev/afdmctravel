/**
 * Prints the most recent Companies records, to confirm what actually landed
 * in Bigin after a test submission.
 *
 *   node scripts/zoho-latest.mjs
 */

import {readFileSync} from "node:fs";

try {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (match) {
      process.env[match[1]] ||= match[2].replace(/^["']|["']$/g, "");
    }
  }
} catch {
  // Fall back to the ambient environment.
}

const {ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN} = process.env;

if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) {
  console.error("Missing Zoho credentials in .env.local");
  process.exit(1);
}

const tokenResponse = await fetch("https://accounts.zoho.com/oauth/v2/token", {
  method: "POST",
  headers: {"Content-Type": "application/x-www-form-urlencoded"},
  body: new URLSearchParams({
    grant_type: "refresh_token",
    client_id: ZOHO_CLIENT_ID,
    client_secret: ZOHO_CLIENT_SECRET,
    refresh_token: ZOHO_REFRESH_TOKEN,
  }).toString(),
});

const {access_token: token} = await tokenResponse.json();
if (!token) {
  console.error("Could not refresh the token");
  process.exit(1);
}

const shown = [
  "Account_Name",
  "Formulario",
  "NAME1",
  "EMAIL",
  "Phone",
  "COUNTRY",
  "Inter_s",
  "Idioma",
  "Consentimiento_marketing",
  "INQUIRY",
  "Created_Time",
];

const response = await fetch(
  `https://www.zohoapis.com/bigin/v2/Accounts?fields=${shown.join(",")}&sort_by=Created_Time&sort_order=desc&per_page=5`,
  {headers: {Authorization: `Zoho-oauthtoken ${token}`}},
);

if (!response.ok) {
  console.error(response.status, await response.text());
  process.exit(1);
}

const {data = []} = await response.json();

console.log(`\n=== ${data.length} empresas más recientes ===\n`);
for (const record of data) {
  console.log(`  ${record.Account_Name ?? "(sin nombre)"}`);
  for (const key of shown) {
    if (key === "Account_Name") continue;
    const value = record[key];
    if (value === null || value === undefined || value === "") continue;
    console.log(`     ${key.padEnd(26)} ${value}`);
  }
  console.log("");
}
