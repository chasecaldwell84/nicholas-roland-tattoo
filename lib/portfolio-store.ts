import { promises as fs } from "fs";
import path from "path";

export type PortfolioImage = {
  src: string;
  alt: string;
};

const portfolioFilePath = path.join(process.cwd(), "app", "data", "portfolio.json");

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
  await ensureDir();
  const sanitized = images.filter(isValidImage);
  await fs.writeFile(portfolioFilePath, JSON.stringify(sanitized, null, 2), "utf8");
}
