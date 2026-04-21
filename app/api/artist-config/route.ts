import { NextResponse } from "next/server";

function decodeBase64Json(token: string) {
  const normalized = token.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4 || 4)) % 4);
  const raw = Buffer.from(padded, "base64").toString("utf8");
  return JSON.parse(raw) as unknown;
}

export async function GET() {
  const uploadthingToken = process.env.UPLOADTHING_TOKEN || "";
  const uploadthingConfigured = Boolean(uploadthingToken);
  const artistTokenConfigured = Boolean(process.env.ARTIST_ADMIN_TOKEN);
  const hasKV = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
  const runningOnVercel = Boolean(process.env.VERCEL);
  const storageConfigured = hasKV || !runningOnVercel;
  let uploadthingTokenValid = false;
  let uploadthingTokenError = "";

  if (uploadthingConfigured) {
    try {
      const parsed = decodeBase64Json(uploadthingToken) as Record<string, unknown>;
      uploadthingTokenValid =
        typeof parsed?.apiKey === "string" &&
        typeof parsed?.appId === "string" &&
        Array.isArray(parsed?.regions);
      if (!uploadthingTokenValid) {
        uploadthingTokenError = "Token decoded but shape is invalid (expected apiKey, appId, regions).";
      }
    } catch (error: unknown) {
      uploadthingTokenError = error instanceof Error ? error.message : "Token failed base64/JSON decode.";
    }
  }

  return NextResponse.json({
    uploadthingConfigured,
    uploadthingTokenValid,
    uploadthingTokenError,
    uploadthingTokenLength: uploadthingToken.length,
    artistTokenConfigured,
    storageConfigured,
    storageMode: hasKV ? "kv" : runningOnVercel ? "missing" : "local-file",
  });
}
