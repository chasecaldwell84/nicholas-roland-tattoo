import { promises as fs } from "fs";
import path from "path";
import { getKVClient } from "@/lib/kv-store";

export type PortfolioImage = {
  src: string;
  alt: string;
};

const portfolioFilePath = path.join(process.cwd(), "app", "data", "portfolio.json");
const portfolioKVKey = "tattoo:portfolio";

function isValidImage(input: unknown): input is PortfolioImage {
  if (!input || typeof input !== "object") return false;
  const value = input as Record<string, unknown>;
  if (typeof value.src !== "string" || typeof value.alt !== "string") return false;
  const src = value.src.trim();
  const alt = value.alt.trim();
  if (!src || !alt) return false;
  if (!(src.startsWith("/") || src.startsWith("https://"))) return false;
  return true;
}

async function ensureDir() {
  await fs.mkdir(path.dirname(portfolioFilePath), { recursive: true });
}

export async function readPortfolio(): Promise<PortfolioImage[]> {
  const kv = await getKVClient();
  if (kv) {
    const value = await kv.get<unknown>(portfolioKVKey);
    if (!Array.isArray(value)) return [];
    return value.filter(isValidImage);
  }

  try {
    const raw = await fs.readFile(portfolioFilePath, "utf8");
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidImage);
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function writePortfolio(images: PortfolioImage[]) {
  const kv = await getKVClient();
  const sanitized = images.filter(isValidImage);

  if (kv) {
    await kv.set(portfolioKVKey, sanitized);
    return;
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Persistent storage not configured. Add Vercel KV (KV_REST_API_URL and KV_REST_API_TOKEN)."
    );
  }

  await ensureDir();
  await fs.writeFile(portfolioFilePath, JSON.stringify(sanitized, null, 2), "utf8");
}
