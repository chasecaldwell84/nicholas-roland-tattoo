function stripWrappedQuotes(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function hasValidBearerToken(req: Request) {
  const token = process.env.ARTIST_ADMIN_TOKEN;
  if (!token) return false;

  const authHeader = req.headers.get("authorization");
  const bearer = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length).trim() : "";
  const headerToken = req.headers.get("x-admin-token")?.trim() || "";
  return bearer === token || headerToken === token;
}

function hasValidBasicAuth(req: Request) {
  const rawUser = process.env.ARTIST_BASIC_USER;
  const rawPass = process.env.ARTIST_BASIC_PASS;
  if (!rawUser || !rawPass) return false;

  const expectedUser = stripWrappedQuotes(rawUser);
  const expectedPass = stripWrappedQuotes(rawPass);
  if (!expectedUser || !expectedPass) return false;

  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) return false;

  const encoded = authHeader.slice("Basic ".length).trim();
  try {
    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    const idx = decoded.indexOf(":");
    if (idx < 0) return false;
    const user = decoded.slice(0, idx);
    const pass = decoded.slice(idx + 1);
    return user === expectedUser && pass === expectedPass;
  } catch {
    return false;
  }
}

export function isAuthorizedRequest(req: Request) {
  return hasValidBearerToken(req) || hasValidBasicAuth(req);
}
