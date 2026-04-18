import { promises as fs } from "fs";
import path from "path";
import { getKVClient } from "@/lib/kv-store";
import { defaultSiteContent, normalizeSiteContent, type SiteContent } from "@/lib/site-content";

const siteContentFilePath = path.join(process.cwd(), "app", "data", "site-content.json");
const siteContentKVKey = "tattoo:site-content";

async function ensureDir() {
  await fs.mkdir(path.dirname(siteContentFilePath), { recursive: true });
}

export async function readSiteContent(): Promise<SiteContent> {
  const kv = await getKVClient();
  if (kv) {
    const content = await kv.get<unknown>(siteContentKVKey);
    return normalizeSiteContent(content);
  }

  try {
    const raw = await fs.readFile(siteContentFilePath, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return normalizeSiteContent(parsed);
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      return defaultSiteContent;
    }
    throw error;
  }
}

export async function writeSiteContent(content: unknown) {
  const kv = await getKVClient();
  const normalized = normalizeSiteContent(content);

  if (kv) {
    await kv.set(siteContentKVKey, normalized);
    return normalized;
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Persistent storage not configured. Add Vercel KV (KV_REST_API_URL and KV_REST_API_TOKEN)."
    );
  }

  await ensureDir();
  await fs.writeFile(siteContentFilePath, JSON.stringify(normalized, null, 2), "utf8");
  return normalized;
}
