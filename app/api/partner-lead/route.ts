import {Resend} from "resend";
import {NextResponse} from "next/server";
import {sendGlobalAgentsLead} from "@/lib/zoho/global-agents-lead";

type PartnerLeadPayload = {
  firstName?: string;
  lastName?: string;
  agencyCompany?: string;
  email?: string;
  phone?: string;
  country?: string;
  interest?: string;
  comments?: string;
  marketingConsent?: boolean;
  /** Which landing produced the lead, e.g. "Global Agents". */
  leadSource?: string;
  locale?: string;
  // Campaign attribution, set by the landing page from the UTM parameters.
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landingPath?: string;
  referrer?: string;
  // Honeypot: real users never fill this in.
  website?: string;
};

const contactFields: [keyof PartnerLeadPayload, string][] = [
  ["firstName", "First Name"],
  ["lastName", "Last Name"],
  ["agencyCompany", "Agency / Company"],
  ["email", "Email Address"],
  ["phone", "Phone / WhatsApp"],
  ["country", "Country"],
  ["interest", "Interested In"],
  ["comments", "Comments"],
];

const campaignFields: [keyof PartnerLeadPayload, string][] = [
  ["utm_campaign", "Campaign"],
  ["utm_source", "Source"],
  ["utm_medium", "Medium"],
  ["utm_content", "Content"],
  ["utm_term", "Term"],
  ["landingPath", "Landing Page"],
  ["referrer", "Referrer"],
];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string) {
  return `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;width:200px;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e2e8f0;white-space:pre-wrap;">${escapeHtml(value || "—")}</td></tr>`;
}

function table(
  data: PartnerLeadPayload,
  fields: [keyof PartnerLeadPayload, string][],
) {
  return fields
    .map(([key, label]) => row(label, String(data[key] ?? "").trim()))
    .join("");
}

function buildHtml(data: PartnerLeadPayload) {
  const languageNames: Record<string, string> = {
    en: "English",
    es: "Spanish",
    fr: "French",
  };
  const language = languageNames[data.locale ?? ""] ?? data.locale ?? "—";

  const hasCampaign = campaignFields.some(([key]) => data[key]);
  const campaignBlock = hasCampaign
    ? `<h3 style="color:#072b52;margin-top:28px;">Campaign</h3><table style="border-collapse:collapse;width:100%;max-width:720px;">${table(data, campaignFields)}</table>`
    : `<p style="color:#92400e;background:#fef3c7;padding:10px 14px;border-radius:6px;margin-top:28px;">No campaign parameters — this visitor reached the landing page directly.</p>`;

  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#0f172a;">
<h2 style="color:#072b52;">New Partner Landing Enquiry</h2>
<h3 style="color:#072b52;">Contact</h3>
<table style="border-collapse:collapse;width:100%;max-width:720px;">
${table(data, contactFields)}
${row("Came from", data.leadSource ?? "—")}
${row("Submitted in", language)}
${row("Marketing consent", data.marketingConsent ? "YES — may be added to mailing lists" : "No — reply to this enquiry only")}
</table>
${campaignBlock}
</body></html>`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PartnerLeadPayload;

    // Silently accept honeypot hits so bots don't learn they were filtered.
    if (body.website && body.website.trim()) {
      return NextResponse.json({ok: true});
    }

    const required: (keyof PartnerLeadPayload)[] = [
      "firstName",
      "lastName",
      "agencyCompany",
      "email",
      "country",
      "interest",
    ];

    for (const field of required) {
      const value = body[field];
      if (typeof value !== "string" || !value.trim()) {
        return NextResponse.json(
          {error: "Missing required fields"},
          {status: 400},
        );
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(body.email!.trim())) {
      return NextResponse.json({error: "Invalid email address"}, {status: 400});
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {error: "Email service not configured"},
        {status: 500},
      );
    }

    const campaign = body.utm_campaign?.trim();
    const resend = new Resend(apiKey);
    const {error} = await resend.emails.send({
      from: "AF DMC Travel <no-reply@afdmctravel.com>",
      to: "director@afdmctravel.com",
      replyTo: body.email!.trim(),
      // The campaign is in the subject so leads can be sorted in the inbox
      // without opening them.
      subject: (() => {
        const source = body.leadSource?.trim() || "Partner";
        const agency = body.agencyCompany!.trim();
        return campaign
          ? `New ${source} Lead [${campaign}] — ${agency}`
          : `New ${source} Lead — ${agency}`;
      })(),
      html: buildHtml(body),
    });

    if (error) {
      return NextResponse.json({error: "Failed to send message"}, {status: 500});
    }

    // Only once the email is away. A CRM outage, an expired token or a field
    // renamed in Bigin must never cost us a lead, so this is deliberately
    // after the send and its failure is logged rather than surfaced.
    const crm = await sendGlobalAgentsLead({
      firstName: body.firstName!.trim(),
      lastName: body.lastName!.trim(),
      agencyCompany: body.agencyCompany!.trim(),
      email: body.email!.trim(),
      phone: body.phone,
      country: body.country!.trim(),
      interest: body.interest!.trim(),
      comments: body.comments,
      marketingConsent: Boolean(body.marketingConsent),
      locale: body.locale,
    });

    if (!crm.ok && crm.error !== "not_configured") {
      console.error("Bigin did not record this lead:", crm.error);
    }

    return NextResponse.json({ok: true});
  } catch {
    return NextResponse.json({error: "Failed to send message"}, {status: 500});
  }
}
