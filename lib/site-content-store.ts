import { promises as fs } from "fs";
import path from "path";
import { defaultSiteContent, normalizeSiteContent, type SiteContent } from "@/lib/site-content";

const siteContentFilePath = path.join(process.cwd(), "app", "data", "site-content.json");

async function ensureDir() {
  await fs.mkdir(path.dirname(siteContentFilePath), { recursive: true });
}

export async function readSiteContent(): Promise<SiteContent> {
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
  await ensureDir();
  const normalized = normalizeSiteContent(content);
  await fs.writeFile(siteContentFilePath, JSON.stringify(normalized, null, 2), "utf8");
  return normalized;
}
