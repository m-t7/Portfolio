import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { stripHtml } from "../../../shared/text";
import type { Trip } from "../lib/types";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function TripCard({ trip }: { trip: Trip }) {
  const { isLoggedIn } = useAuth();

  return (
    <div className="bg-white rounded shadow overflow-hidden flex flex-col">
      <div className="px-4 py-2 border-b font-semibold">{trip.name}</div>
      <img
        src={`/images/${trip.image}`}
        alt="trip thumbnail"
        className="h-40 w-full object-cover"
      />
      <div className="p-4 flex-1 flex flex-col gap-2">
        <h6 className="text-sm text-gray-500">{trip.resort}</h6>
        <p className="text-sm text-gray-500">
          {trip.length} only {currencyFormatter.format(trip.perPerson)} per
          person
        </p>
        <p className="text-sm">{stripHtml(trip.description)}</p>
        {isLoggedIn && (
          <Link
            className="mt-auto inline-block text-center bg-blue-600 text-white rounded px-3 py-1.5 text-sm hover:bg-blue-700"
            to={`/edit-trip/${trip.code}`}
          >
            Edit Trip
          </Link>
        )}
      </div>
    </div>
  );
}
