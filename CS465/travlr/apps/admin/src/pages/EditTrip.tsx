import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TripForm } from "../components/TripForm";
import { getTrip, updateTrip } from "../lib/api";
import type { Trip } from "../lib/types";

export function EditTrip() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!code) {
      navigate("/");
      return;
    }

    let cancelled = false;
    getTrip(code)
      .then((value) => {
        if (cancelled) return;
        const found = value[0];
        setTrip(found ?? null);
        setMessage(found ? `Trip: ${code} retrieved` : "No Trip Retrieved!");
      })
      .catch((error) => {
        if (cancelled) return;
        console.log(`Error: ${error}`);
      });

    return () => {
      cancelled = true;
    };
  }, [code, navigate]);

  async function handleSubmit(updated: Trip) {
    try {
      await updateTrip(updated);
      navigate("/");
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  if (!trip) {
    return <p>{message || "Loading..."}</p>;
  }

  return (
    <TripForm
      title="Edit Trip"
      initialValue={trip}
      submitLabel="Save"
      codeReadOnly
      onSubmit={handleSubmit}
    />
  );
}
