import { NextResponse } from "next/server";
import { Resend } from "resend";

function parseRecipients(value: string): string[] {
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

async function sendOrThrow(
  resend: Resend,
  payload: Parameters<Resend["emails"]["send"]>[0],
  label: string
) {
  const result = await resend.emails.send(payload);
  if (result.error) {
    throw new Error(`${label} failed: ${result.error.message}`);
  }
}

function errorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Server error";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      phone,
      instagram,
      placement,
      size,
      style,
      color,
      description,
      additionalInfo,
      referencePhotoUrls,
    } = body as {
      fullName: string;
      email: string;
      phone?: string;
      instagram?: string;
      placement: string;
      size: number;
      style: string;
      color: string;
      description: string;
      additionalInfo?: string;
      referencePhotoUrls?: string[];
    };

    // Basic required fields
    if (!fullName || !email || !placement || !description) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Since we temporarily removed uploadthing, allow this to be optional for now.
    const photoLines =
      referencePhotoUrls && referencePhotoUrls.length > 0
        ? referencePhotoUrls.map((u) => `- ${u}`).join("\n")
        : "(Photos will be requested after review)";

    const adminRecipients = parseRecipients(process.env.ADMIN_EMAIL || "");
    const fromEmail = process.env.FROM_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (adminRecipients.length === 0 || !fromEmail || !resendApiKey) {
      return NextResponse.json(
        { error: "Server email is not configured (missing env vars)." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    // 1) Email admin (Nicholas)
    await sendOrThrow(
      resend,
      {
        from: fromEmail,
        to: adminRecipients,
        replyTo: email,
        subject: `New Tattoo Request — ${fullName}`,
        text:
          `New tattoo request received:\n\n` +
          `Name: ${fullName}\n` +
          `Email: ${email}\n` +
          `Phone: ${phone || "(not provided)"}\n` +
          `Instagram: ${instagram || "(not provided)"}\n\n` +
          `Placement: ${placement}\n` +
          `Size (scale): ${size ?? "(not provided)"}\n` +
          `Style: ${style || "(not provided)"}\n` +
          `Color: ${color || "(not provided)"}\n\n` +
          `Description:\n${description}\n\n` +
          `Additional information:\n${additionalInfo || "(none)"}\n\n` +
          `Reference photos:\n${photoLines}\n`,
      },
      "Admin notification email"
    );

    // 2) Confirmation email to user
    await sendOrThrow(
      resend,
      {
        from: fromEmail,
        to: email,
        subject: "Request received — under review",
        text:
          `Hey ${fullName},\n\n` +
          `Your tattoo request has been received and is under review.\n` +
          `If it’s a fit, you’ll receive next steps for scheduling and the deposit.\n\n` +
          `Thanks,\nNicholas`,
      },
      "Client confirmation email"
    );

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
