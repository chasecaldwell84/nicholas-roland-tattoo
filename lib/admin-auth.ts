export function isAuthorizedRequest(req: Request) {
  const token = process.env.ARTIST_ADMIN_TOKEN;
  if (!token) return false;

  const authHeader = req.headers.get("authorization");
  const bearer = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length).trim() : "";
  const headerToken = req.headers.get("x-admin-token")?.trim() || "";
  return bearer === token || headerToken === token;
}
