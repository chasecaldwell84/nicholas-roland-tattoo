import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Temporary: just echo back to prove the endpoint works.
    // We'll plug Resend back in after deployment succeeds.
    return NextResponse.json({ ok: true, received: body });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Server error" }, { status: 500 });
  }
}
