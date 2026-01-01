export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function clearToken() {
  localStorage.removeItem("token");
}

export function getRoleFromToken() {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || payload.authorities?.[0]?.replace("ROLE_", "");
  } catch {
    return null;
  }
}

export async function apiRequest(path, method = "GET", body) {
  // In dev, use relative /api paths so Vite dev server proxy handles CORS.
  const isDev = import.meta.env.DEV;
  const base = isDev ? "" : (import.meta.env.VITE_API_BASE || "http://localhost:8080").replace(/\/$/, "");

  const url = path.startsWith("http")
    ? path
    : path.startsWith("/api/")
    ? `${base}${path}`
    : `${base}${isDev ? "/api/v1" : "/api/v1"}${path.startsWith("/") ? "" : "/"}${path}`;

  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  // Debug: log request info and whether token is present
  try {
    const short = token ? (`Bearer ${token.slice(0,10)}...`) : "(no-token)";
    console.debug("apiRequest", method, url, { authorization: short, bodyProvided: body !== undefined });
  } catch (e) {
    // ignore
  }

  const opts = { method, headers };
  if (body !== undefined) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  if (res.status === 204) return null;
  const text = await res.text();
  try {
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) throw data || new Error(res.statusText);
    return data;
  } catch (e) {
    if (res.ok) return text;
    throw e;
  }
}
