import type { User } from "./types";

const TOKEN_KEY = "travlr-token";

export function getToken(): string {
  return localStorage.getItem(TOKEN_KEY) ?? "";
}

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

function decodePayload(token: string): Record<string, unknown> | null {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  const token = getToken();
  if (!token) return false;
  const payload = decodePayload(token);
  const exp = payload?.exp;
  return typeof exp === "number" && exp > Date.now() / 1000;
}

export function getCurrentUser(): User | null {
  const token = getToken();
  if (!token) return null;
  const payload = decodePayload(token);
  if (!payload) return null;
  return {
    email: String(payload.email ?? ""),
    name: String(payload.name ?? ""),
  };
}
