const ROOMS = [
  {
    name: "First Class Room",
    image: "first-class.jpg",
    rate: "220 / Day",
    description:
      "Cras dui sapien, feugiat vitae tristique ut, lobortis tempor orci. Donec pulvinar sagittis metus ut tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  },
  {
    name: "Deluxe Room",
    image: "deluxe.jpg",
    rate: "150 / Day",
    description:
      "Sed et augue lorem. In sit amet placerat arcu. Mauris volutpat ipsum ac justo mollis vel vestibulum orci gravida. Vestibulum sit amet porttitor odio. Nulla facilisi. Fusce at pretium felis.",
  },
  {
    name: "Suite Room",
    image: "suite.jpg",
    rate: "180 / Day",
    description:
      "Sed et augue lorem. In sit amet placerat arcu. Mauris volutpat ipsum ac justo mollis vel vestibulum orci gravida. Vestibulum sit amet porttitor odio. Nulla facilisi. Fusce at pretium felis.",
  },
];

export function Rooms() {
  return (
    <>
      <h1 className="text-3xl uppercase text-resort-heading mb-4">Rooms</h1>
      <ul className="divide-y divide-gray-300">
        {ROOMS.map((room) => (
          <li key={room.name} className="flex gap-4 py-6 first:pt-0 relative">
            <img
              src={`/images/${room.image}`}
              alt={room.name}
              className="w-40 h-28 object-cover border border-resort-link shrink-0"
            />
            <div>
              <h2 className="text-xl uppercase text-resort-link mb-2">
                {room.name}
              </h2>
              <p className="text-resort-text text-sm leading-relaxed">
                {room.description}
              </p>
              <span className="inline-block mt-2 border border-resort-text px-3 py-1 text-sm text-resort-heading">
                Rate: {room.rate}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
