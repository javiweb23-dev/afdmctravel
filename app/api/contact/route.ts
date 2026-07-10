import nodemailer from "nodemailer";
import {NextResponse} from "next/server";

type ContactPayload = {
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
};

const fieldLabels: Record<string, string> = {
  fullName: "Full Name",
  agencyCompany: "Agency / Company Name",
  jobTitle: "Job Title / Role",
  email: "Email Address",
  phone: "WhatsApp or Phone",
  country: "Country of Origin",
  groupSize: "Estimated Group Size",
  travelDates: "Travel Dates",
  programType: "Program Type",
  hotelPreference: "Hotel Preference",
  budgetRange: "Budget Range (per person, USD)",
  servicesRequired: "Services Required",
  specialRequirements: "Special Requirements",
  referral: "How Did You Find Us?",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(data: ContactPayload) {
  const rows = Object.entries(fieldLabels)
    .map(([key, label]) => {
      const raw = data[key as keyof ContactPayload];
      const value = Array.isArray(raw)
        ? raw.join(", ")
        : typeof raw === "string"
          ? raw
          : "";
      return `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;width:220px;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">${escapeHtml(value || "—")}</td></tr>`;
    })
    .join("");

  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#0f172a;"><h2 style="color:#072b52;">New B2B Group RFP Submission</h2><table style="border-collapse:collapse;width:100%;max-width:720px;">${rows}</table></body></html>`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const required: (keyof ContactPayload)[] = [
      "fullName",
      "agencyCompany",
      "jobTitle",
      "email",
      "country",
      "groupSize",
      "travelDates",
      "programType",
      "hotelPreference",
      "budgetRange",
      "referral",
    ];

    for (const field of required) {
      const value = body[field];
      if (!value || (typeof value === "string" && !value.trim())) {
        return NextResponse.json({error: "Missing required fields"}, {status: 400});
      }
    }

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;

    if (!host || !user || !pass) {
      return NextResponse.json({error: "Email service not configured"}, {status: 500});
    }

    const port = Number(process.env.SMTP_PORT ?? 587);
    const secure = port === 465;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: user,
      to: "director@afdmctravel.com",
      replyTo: body.email,
      subject: `B2B Group RFP — ${body.agencyCompany}`,
      html: buildHtml(body),
    });

    return NextResponse.json({ok: true});
  } catch {
    return NextResponse.json({error: "Failed to send message"}, {status: 500});
  }
}
