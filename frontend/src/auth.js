export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function clearToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}

export function getRoleFromToken() {
  // Prefer explicitly stored role (set at login), fallback to token payload
  const stored = localStorage.getItem("role");
  if (stored) return stored;

  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || payload.authorities?.[0]?.replace("ROLE_", "");
  } catch {
    return null;
  }
}

export function setRole(role) {
  if (role) localStorage.setItem("role", role);
}

export function getRole() {
  return localStorage.getItem("role") || getRoleFromToken();
}
