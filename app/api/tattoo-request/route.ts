import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, instagram, placement, size, style, color, description, additionalInfo } =
      await req.json();

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!apiKey) {
      return NextResponse.json({ error: "Missing RESEND_API_KEY" }, { status: 500 });
    }
    if (!adminEmail) {
      return NextResponse.json({ error: "Missing ADMIN_EMAIL" }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    // 1) Email admin
    const adminResult = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `New Tattoo Request — ${fullName || "Unknown"}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>New Tattoo Request</h2>
          <p><strong>Name:</strong> ${escapeHtml(fullName || "")}</p>
          <p><strong>Email:</strong> ${escapeHtml(email || "")}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone || "(not provided)")}</p>
          <p><strong>Instagram:</strong> ${escapeHtml(instagram || "(not provided)")}</p>
          <hr/>
          <p><strong>Placement:</strong> ${escapeHtml(placement || "")}</p>
          <p><strong>Size:</strong> ${escapeHtml(String(size ?? ""))}</p>
          <p><strong>Style:</strong> ${escapeHtml(style || "")}</p>
          <p><strong>Color:</strong> ${escapeHtml(color || "")}</p>
          <p><strong>Description:</strong><br/>${escapeHtml(description || "").replace(/\n/g, "<br/>")}</p>
          <p><strong>Additional info:</strong><br/>${escapeHtml(additionalInfo || "(none)").replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    // 2) Confirmation to user (only if email provided)
    let userResult: any = null;
    if (email) {
      userResult = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "Request received — under review",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <p>Hey ${escapeHtml(fullName || "there")},</p>
            <p>Your tattoo request has been received and is under review.</p>
            <p>If it’s a fit, you’ll receive next steps for scheduling and the deposit.</p>
            <p>— Nicholas</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ ok: true, adminResult, userResult });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
