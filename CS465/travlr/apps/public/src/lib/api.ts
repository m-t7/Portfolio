export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api";

export interface Trip {
  _id: string;
  code: string;
  name: string;
  length: string;
  start: string;
  resort: string;
  perPerson: number;
  image: string;
  description: string;
}

export async function fetchTrips(): Promise<Trip[]> {
  const res = await fetch(`${API_BASE_URL}/trips`);
  if (!res.ok) {
    throw new Error(`API lookup error: ${res.status}`);
  }
  const json = await res.json();
  return Array.isArray(json) ? json : [];
}
