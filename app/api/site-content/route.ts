import { NextResponse } from "next/server";
import { isAuthorizedRequest } from "@/lib/admin-auth";
import { readSiteContent, writeSiteContent } from "@/lib/site-content-store";

function errorMessage(error: unknown, fallback: string) {
  if (error instanceof Error) return error.message;
  return fallback;
}

export async function GET() {
  try {
    const content = await readSiteContent();
    return NextResponse.json({ content });
  } catch (error: unknown) {
    return NextResponse.json({ error: errorMessage(error, "Failed to read site content.") }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!isAuthorizedRequest(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await req.json()) as { content?: unknown };
    const next = await writeSiteContent(body.content);
    return NextResponse.json({ ok: true, content: next });
  } catch (error: unknown) {
    return NextResponse.json({ error: errorMessage(error, "Failed to update site content.") }, { status: 500 });
  }
}
