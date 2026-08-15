import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TripCard } from "../components/TripCard";
import { useAuth } from "../context/AuthContext";
import { getTrips } from "../lib/api";
import type { Trip } from "../lib/types";

export function TripListing() {
  const { isLoggedIn } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    getTrips()
      .then((data) => {
        if (cancelled) return;
        setTrips(data);
        setMessage(
          data.length > 0
            ? `There are ${data.length} trips available.`
            : "There were no trips retrieved from the database",
        );
      })
      .catch((error) => {
        if (cancelled) return;
        console.log(`Error: ${error}`);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div className="flex justify-end mb-4">
        {isLoggedIn && (
          <Link
            className="bg-blue-600 text-white rounded px-4 py-2 text-sm hover:bg-blue-700"
            to="/add-trip"
          >
            Add Trip
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trips.map((trip) => (
          <TripCard key={trip.code} trip={trip} />
        ))}
      </div>
      {message && <p className="mt-4 text-sm text-gray-500">{message}</p>}
    </>
  );
}
