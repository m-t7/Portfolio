const MEALS = [
  {
    name: "SeaFood Special",
    image: "seafoods.jpg",
    caption: "Fried Salmon Special",
    description:
      "I'm a product overview. Here you can write more information about your product. Buyers like to know ...",
  },
  {
    name: "Sumptuous Desserts",
    image: "desserts.jpg",
    caption: "Choco Ice Cream Sandwich",
    description:
      "I'm a product overview. Here you can write more information about your product. Buyers like to know ...",
  },
  {
    name: "Buffet",
    image: "buffet.jpg",
    caption: "Mixed Buffet",
    description:
      "I'm a product overview. Here you can write more information about your product. Buyers like to know ...",
  },
];

export function Meals() {
  return (
    <>
      <h1 className="text-3xl uppercase text-resort-heading mb-4">Meals</h1>
      <ul className="flex flex-col gap-8">
        {MEALS.map((meal) => (
          <li key={meal.name}>
            <h2 className="text-xl uppercase text-resort-link mb-2">
              {meal.name}
            </h2>
            <img
              src={`/images/${meal.image}`}
              alt={meal.name}
              className="w-full h-56 object-cover rounded mb-3"
            />
            <p className="text-resort-text text-sm leading-relaxed">
              <span className="font-semibold">{meal.caption}</span>{" "}
              {meal.description}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
