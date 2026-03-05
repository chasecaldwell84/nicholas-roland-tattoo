import { NextResponse } from "next/server";
import { readPortfolio, writePortfolio, type PortfolioImage } from "@/lib/portfolio-store";

function errorMessage(error: unknown, fallback: string) {
  if (error instanceof Error) return error.message;
  return fallback;
}

function isAuthorized(req: Request) {
  const token = process.env.ARTIST_ADMIN_TOKEN;
  if (!token) return false;

  const authHeader = req.headers.get("authorization");
  const bearer = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length).trim() : "";
  const headerToken = req.headers.get("x-admin-token")?.trim() || "";
  return bearer === token || headerToken === token;
}

function validateImage(input: unknown): PortfolioImage | null {
  if (!input || typeof input !== "object") return null;
  const maybe = input as Record<string, unknown>;
  if (typeof maybe.src !== "string" || typeof maybe.alt !== "string") return null;
  const src = maybe.src.trim();
  const alt = maybe.alt.trim();
  if (!src || !alt) return null;
  if (!(src.startsWith("/") || src.startsWith("https://"))) return null;
  return { src, alt };
}

export async function GET() {
  try {
    const images = await readPortfolio();
    return NextResponse.json({ images });
  } catch (error: unknown) {
    return NextResponse.json({ error: errorMessage(error, "Failed to read portfolio.") }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await req.json()) as {
      image?: unknown;
      images?: unknown[];
    };

    const incoming = [
      ...(Array.isArray(body.images) ? body.images : []),
      ...(body.image ? [body.image] : []),
    ]
      .map(validateImage)
      .filter((v): v is PortfolioImage => Boolean(v));

    if (incoming.length === 0) {
      return NextResponse.json({ error: "No valid images were provided." }, { status: 400 });
    }

    const existing = await readPortfolio();
    const mergedBySrc = new Map(existing.map((img) => [img.src, img]));
    for (const img of incoming) {
      mergedBySrc.set(img.src, img);
    }

    const next = Array.from(mergedBySrc.values());
    await writePortfolio(next);
    return NextResponse.json({ ok: true, images: next });
  } catch (error: unknown) {
    return NextResponse.json({ error: errorMessage(error, "Failed to update portfolio.") }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await req.json()) as { src?: string };
    const src = body.src?.trim();
    if (!src) {
      return NextResponse.json({ error: "src is required." }, { status: 400 });
    }

    const existing = await readPortfolio();
    const next = existing.filter((img) => img.src !== src);
    await writePortfolio(next);
    return NextResponse.json({ ok: true, images: next });
  } catch (error: unknown) {
    return NextResponse.json({ error: errorMessage(error, "Failed to delete image.") }, { status: 500 });
  }
}
