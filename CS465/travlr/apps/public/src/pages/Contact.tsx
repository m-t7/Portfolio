import { useState } from "react";
import type { FormEvent } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <>
      <h1 className="text-3xl uppercase text-resort-heading mb-4">Contact</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md mb-8"
      >
        {sent && (
          <div className="bg-green-50 text-green-700 text-sm rounded px-3 py-2">
            Thanks — we'll be in touch!
          </div>
        )}
        <div>
          <label
            htmlFor="name"
            className="block text-sm uppercase text-resort-text mb-1"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full border border-resort-text rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm uppercase text-resort-text mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full border border-resort-text rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="subject"
            className="block text-sm uppercase text-resort-text mb-1"
          >
            Subject
          </label>
          <input
            id="subject"
            type="text"
            className="w-full border border-resort-text rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm uppercase text-resort-text mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className="w-full border border-resort-text rounded px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="self-start bg-resort-link text-white rounded px-4 py-2 text-sm hover:bg-resort-heading"
        >
          Send
        </button>
      </form>
      <h2 className="text-xl uppercase text-resort-heading mb-2">
        Travlr Getaways
      </h2>
      <p className="text-resort-text text-sm mb-1">
        <span className="uppercase font-semibold">Address:</span> 123 Lorem
        Ipsum Cove, Sed Ut City, LI 12345
      </p>
      <p className="text-resort-text text-sm mb-1">
        <span className="uppercase font-semibold">Telephone Number:</span>{" "}
        1-800-999-9999
      </p>
      <p className="text-resort-text text-sm">
        <span className="uppercase font-semibold">Fax Number:</span>{" "}
        1-800-111-1111
      </p>
    </>
  );
}
