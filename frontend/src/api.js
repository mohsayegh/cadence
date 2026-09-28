export const BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  return res;
}
