import {Resend} from "resend";
import {NextResponse} from "next/server";

type PartnerLeadPayload = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  comments?: string;
  // Honeypot: real users never fill this in.
  website?: string;
};

const fieldLabels: Record<string, string> = {
  firstName: "First Name",
  lastName: "Last Name",
  phone: "Phone / WhatsApp",
  email: "Email Address",
  comments: "Comments",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(data: PartnerLeadPayload) {
  const rows = Object.entries(fieldLabels)
    .map(([key, label]) => {
      const value = String(data[key as keyof PartnerLeadPayload] ?? "").trim();
      return `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;width:200px;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e2e8f0;white-space:pre-wrap;">${escapeHtml(value || "—")}</td></tr>`;
    })
    .join("");

  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#0f172a;"><h2 style="color:#072b52;">New Partner Landing Page Enquiry</h2><p style="color:#475569;font-size:14px;">Submitted from the partner landing page (/partners).</p><table style="border-collapse:collapse;width:100%;max-width:720px;">${rows}</table></body></html>`;
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
      "email",
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

    const resend = new Resend(apiKey);
    const {error} = await resend.emails.send({
      from: "AF DMC Travel <no-reply@afdmctravel.com>",
      to: "director@afdmctravel.com",
      replyTo: body.email!.trim(),
      subject: `New Partner Enquiry — ${body.firstName!.trim()} ${body.lastName!.trim()}`,
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
