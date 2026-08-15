import { useState } from "react";
import type { FormEvent } from "react";
import type { Trip } from "../lib/types";

const FIELDS: Array<{ key: keyof Trip; label: string; type: string }> = [
  { key: "code", label: "Code", type: "text" },
  { key: "name", label: "Name", type: "text" },
  { key: "length", label: "Length", type: "text" },
  { key: "start", label: "Start", type: "date" },
  { key: "resort", label: "Resort", type: "text" },
  { key: "perPerson", label: "Per Person", type: "text" },
  { key: "image", label: "Image Name", type: "text" },
  { key: "description", label: "Description", type: "text" },
];

interface TripFormProps {
  title: string;
  initialValue: Trip;
  submitLabel: string;
  codeReadOnly?: boolean;
  onSubmit: (trip: Trip) => Promise<void>;
}

export function TripForm({
  title,
  initialValue,
  submitLabel,
  codeReadOnly = false,
  onSubmit,
}: TripFormProps) {
  const [trip, setTrip] = useState<Trip>(initialValue);
  const [submitted, setSubmitted] = useState(false);

  const errors = FIELDS.filter(
    (f) => f.key !== "perPerson" && !trip[f.key],
  ).concat(
    trip.perPerson || trip.perPerson === 0
      ? []
      : [{ key: "perPerson", label: "Per Person", type: "text" }],
  );

  function fieldError(key: keyof Trip): string | null {
    if (!submitted) return null;
    return errors.some((e) => e.key === key)
      ? `${FIELDS.find((f) => f.key === key)?.label} is required`
      : null;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    if (errors.length > 0) return;
    await onSubmit(trip);
  }

  return (
    <div className="max-w-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {FIELDS.map((field) => {
          const error = fieldError(field.key);
          return (
            <div key={field.key}>
              <label
                htmlFor={field.key}
                className="block text-sm font-medium mb-1"
              >
                {field.label}:
              </label>
              <input
                type={field.type}
                id={field.key}
                placeholder={field.label}
                className={`w-full rounded border px-3 py-2 text-sm ${error ? "border-red-500" : "border-gray-300"}`}
                readOnly={field.key === "code" && codeReadOnly}
                value={trip[field.key] as string | number}
                onChange={(e) =>
                  setTrip({ ...trip, [field.key]: e.target.value })
                }
              />
              {error && (
                <div className="text-red-600 text-xs mt-1">{error}</div>
              )}
            </div>
          );
        })}
        <button
          type="submit"
          className="self-start bg-blue-600 text-white rounded px-4 py-2 text-sm hover:bg-blue-700"
        >
          {submitLabel}
        </button>
      </form>
    </div>
  );
}
