import {Resend} from "resend";
import {NextResponse} from "next/server";

type AddressFields = {
  streetAddress?: string;
  addressLine2?: string;
  city?: string;
  stateRegion?: string;
  postalCode?: string;
  country?: string;
};

type AgencyRegistrationPayload = {
  agencyInformation?: {
    legalName?: string;
    entityType?: string;
    hstGstNumber?: string;
    address?: AddressFields;
    phone?: string;
  };
  billingInformation?: {
    sameAsAgency?: boolean;
    businessName?: string;
    address?: AddressFields;
  };
  businessContactInformation?: {
    firstName?: string;
    lastName?: string;
    title?: string;
    email?: string;
    phone?: string;
    inquiry?: string;
  };
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatAddress(address: AddressFields | undefined) {
  if (!address) return "";
  return [
    address.streetAddress,
    address.addressLine2,
    address.city,
    address.stateRegion,
    address.postalCode,
    address.country,
  ]
    .map((part) => (part ?? "").trim())
    .filter(Boolean)
    .join(", ");
}

function section(title: string, rows: [string, string][]) {
  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;width:220px;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e2e8f0;white-space:pre-wrap;">${escapeHtml(value || "—")}</td></tr>`,
    )
    .join("");
  return `<h3 style="color:#072b52;margin-top:24px;">${escapeHtml(title)}</h3><table style="border-collapse:collapse;width:100%;max-width:720px;">${body}</table>`;
}

function buildHtml(data: AgencyRegistrationPayload) {
  const agency = data.agencyInformation ?? {};
  const billing = data.billingInformation ?? {};
  const contact = data.businessContactInformation ?? {};

  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#0f172a;">
<h2 style="color:#072b52;">New Agency Registration</h2>
${section("Agency Information", [
  ["Legal Name", agency.legalName ?? ""],
  ["Entity Type", agency.entityType ?? ""],
  ["HST / GST Number", agency.hstGstNumber ?? ""],
  ["Address", formatAddress(agency.address)],
  ["Phone", agency.phone ?? ""],
])}
${section("Billing Information", [
  ["Same as Agency", billing.sameAsAgency ? "Yes" : "No"],
  ["Business Name", billing.businessName ?? ""],
  ["Billing Address", formatAddress(billing.address)],
])}
${section("Business Contact", [
  ["First Name", contact.firstName ?? ""],
  ["Last Name", contact.lastName ?? ""],
  ["Title", contact.title ?? ""],
  ["Email", contact.email ?? ""],
  ["Phone", contact.phone ?? ""],
  ["Inquiry", contact.inquiry ?? ""],
])}
</body></html>`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AgencyRegistrationPayload;

    const legalName = body.agencyInformation?.legalName?.trim();
    const email = body.businessContactInformation?.email?.trim();

    if (!legalName || !email) {
      return NextResponse.json(
        {error: "Missing required fields"},
        {status: 400},
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json({error: "Invalid email address"}, {status: 400});
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {error: "Email service not configured"},
        {status: 500},
      );
    }

    const resend = new Resend(apiKey);
    const {error} = await resend.emails.send({
      from: "AF DMC Travel <no-reply@afdmctravel.com>",
      to: "director@afdmctravel.com",
      replyTo: email,
      subject: `New Agency Registration — ${legalName}`,
      html: buildHtml(body),
    });

    if (error) {
      return NextResponse.json({error: "Failed to send message"}, {status: 500});
    }

    return NextResponse.json({ok: true});
  } catch {
    return NextResponse.json({error: "Failed to send message"}, {status: 500});
  }
}
