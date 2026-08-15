import { useNavigate } from "react-router-dom";
import { TripForm } from "../components/TripForm";
import { addTrip } from "../lib/api";
import type { Trip } from "../lib/types";

const EMPTY_TRIP: Trip = {
  code: "",
  name: "",
  length: "",
  start: "",
  resort: "",
  perPerson: 0,
  image: "",
  description: "",
};

export function AddTrip() {
  const navigate = useNavigate();

  async function handleSubmit(trip: Trip) {
    try {
      await addTrip(trip);
      navigate("/");
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  return (
    <TripForm
      title="Add Trip"
      initialValue={EMPTY_TRIP}
      submitLabel="Save"
      onSubmit={handleSubmit}
    />
  );
}
