import { useEffect, useState } from "react";
import { type Trip, fetchTrips } from "../lib/api";
import { stripHtml } from "../../../shared/text";

export function Travel() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchTrips()
      .then((data) => {
        if (cancelled) return;
        setTrips(data);
        setMessage(data.length < 1 ? "No trips exist in our database!" : null);
      })
      .catch(() => {
        if (cancelled) return;
        setTrips([]);
        setMessage("API lookup error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <h1 className="text-3xl uppercase text-resort-heading mb-4">Travel</h1>
      {message && <p className="text-resort-text mb-4">{message}</p>}
      <ul className="divide-y divide-gray-300">
        {trips.map((trip) => (
          <li key={trip.code} className="flex gap-4 py-6 first:pt-0">
            <img
              src={`/images/${trip.image}`}
              alt={trip.name}
              className="w-40 h-28 object-cover border border-resort-link shrink-0"
            />
            <div>
              <h2 className="text-xl uppercase text-resort-link mb-2">
                {trip.name}
              </h2>
              <p className="text-resort-text text-sm leading-relaxed">
                {stripHtml(trip.description)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
