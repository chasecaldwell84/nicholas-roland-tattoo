import { NextResponse } from "next/server";

export async function GET() {
  const uploadthingConfigured = Boolean(process.env.UPLOADTHING_TOKEN);
  const artistTokenConfigured = Boolean(process.env.ARTIST_ADMIN_TOKEN);
  const hasKV = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
  const runningOnVercel = Boolean(process.env.VERCEL);
  const storageConfigured = hasKV || !runningOnVercel;

  return NextResponse.json({
    uploadthingConfigured,
    artistTokenConfigured,
    storageConfigured,
    storageMode: hasKV ? "kv" : runningOnVercel ? "missing" : "local-file",
  });
}
