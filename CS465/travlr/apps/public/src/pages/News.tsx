const LATEST_NEWS = [
  "2023 Best Beaches Contest Winners",
  "Top 10 Diving Spots",
  "Fishing ban to be implemented this year",
  "Lifeguard saves child from drowning",
];

const VACATION_TIPS = [
  "What to bring on the beach?",
  "Planning Fun Activities",
  "Diving Checklist",
  "First Aid",
  "How to Build a Sand Castle?",
  "Tanning Tips",
];

export function News() {
  return (
    <div className="flex gap-8">
      <aside className="w-48 shrink-0">
        <h3 className="text-resort-link uppercase tracking-wide mb-2 border-t border-gray-300 pt-3 first:border-0 first:pt-0">
          Latest News
        </h3>
        <ul className="flex flex-col gap-1 mb-4">
          {LATEST_NEWS.map((item) => (
            <li key={item}>
              <span className="text-resort-text text-sm">{item}</span>
            </li>
          ))}
        </ul>
        <h3 className="text-resort-link uppercase tracking-wide mb-2 border-t border-gray-300 pt-3">
          Vacation Tips
        </h3>
        <ul className="flex flex-col gap-1">
          {VACATION_TIPS.map((item) => (
            <li key={item}>
              <span className="text-resort-text text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex-1">
        <h1 className="text-3xl uppercase text-resort-heading mb-4">News</h1>
        <img
          src="/images/kayak.jpg"
          alt="Kayaking"
          className="w-full h-56 object-cover rounded mb-3"
        />
        <h2 className="text-xl uppercase text-resort-link mb-1">
          Experience Kayaking!
        </h2>
        <span className="block text-resort-text text-sm mb-3">
          April 03, 2023 — by: Juan De La Cruz
        </span>
        <p className="text-resort-text text-sm leading-relaxed mb-4">
          Sed et augue lorem. In sit amet placerat arcu. Mauris volutpat ipsum
          ac justo mollis vel vestibulum orci gravida. Vestibulum sit amet
          porttitor odio. Nulla facilisi. Fusce at pretium felis. Sed consequat
          libero ut turpis venenatis ut aliquam risus semper.
        </p>
        <p className="text-resort-text text-sm leading-relaxed mb-4">
          Cras dui sapien, feugiat vitae tristique ut, lobortis tempor orci.
          Donec pulvinar sagittis metus ut tristique. Pellentesque habitant
          morbi tristique senectus et netus et malesuada fames ac turpis
          egestas.
        </p>
        <p className="text-resort-text text-sm leading-relaxed">
          Phasellus viverra fringilla lacus, malesuada blandit velit iaculis
          dignissim. Suspendisse rutrum massa mauris. Donec quis tempus elit.
        </p>
      </div>
    </div>
  );
}
