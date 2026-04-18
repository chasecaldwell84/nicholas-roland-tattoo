type KVLike = {
  get<T = unknown>(key: string): Promise<T | null>;
  set(key: string, value: unknown): Promise<unknown>;
};

export async function getKVClient(): Promise<KVLike | null> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return null;
  }

  const mod = await import("@vercel/kv");
  return mod.kv as KVLike;
}
