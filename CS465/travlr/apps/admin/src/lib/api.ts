import { getToken, isLoggedIn } from "./auth";
import type { AuthResponse, Trip, User } from "./types";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api";

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (isLoggedIn()) {
    headers.set("Authorization", `Bearer ${getToken()}`);
  }

  const res = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
  if (!res.ok) {
    throw new Error(`Request to ${path} failed: ${res.status}`);
  }
  return res.json();
}

export function getTrips(): Promise<Trip[]> {
  return request<Trip[]>("/trips");
}

export function getTrip(tripCode: string): Promise<Trip[]> {
  return request<Trip[]>(`/trips/${tripCode}`);
}

export function addTrip(trip: Trip): Promise<Trip> {
  return request<Trip>("/trips", {
    method: "POST",
    body: JSON.stringify(trip),
  });
}

export function updateTrip(trip: Trip): Promise<Trip> {
  return request<Trip>(`/trips/${trip.code}`, {
    method: "PUT",
    body: JSON.stringify(trip),
  });
}

export function deleteTrip(tripCode: string): Promise<Trip> {
  return request<Trip>(`/trips/${tripCode}`, { method: "DELETE" });
}

function handleAuthApiCall(
  endpoint: "login" | "register",
  user: User,
  password: string,
): Promise<AuthResponse> {
  console.log(`Calling ${endpoint} API with user:`, user, "and password:", password);
  return request<AuthResponse>(`/${endpoint}`, {
    method: "POST",
    body: JSON.stringify({ name: user.name, email: user.email, password }),
  });
}

export function login(user: User, password: string): Promise<AuthResponse> {
  return handleAuthApiCall("login", user, password);
}

export function register(user: User, password: string): Promise<AuthResponse> {
  return handleAuthApiCall("register", user, password);
}
