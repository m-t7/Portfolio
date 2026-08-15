import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <div className="mb-8">
        <img
          src="/images/sea-sound.jpg"
          alt="Sea sound"
          className="w-full h-56 object-cover rounded mb-4"
        />
        <h1 className="text-3xl uppercase text-resort-heading mb-3">
          Enjoy the Summer with Us!
        </h1>
        <p className="text-resort-text leading-relaxed">
          Welcome to Travlr Getaways. Browse our latest dive trips, rooms, and
          meals, or read the latest news from around the resort.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-resort-heading uppercase tracking-wide border-b border-dotted border-resort-text/40 pb-2 mb-3">
            Latest Blog
          </h3>
          <ul className="flex flex-col gap-4">
            <li className="border-b border-dotted border-resort-text/40 pb-3">
              <h4 className="text-lg">
                <Link to="/news" className="text-resort-text no-underline">
                  2023 Best Beaches Contest Winners
                </Link>
              </h4>
              <span className="block text-resort-text text-sm mb-1">
                April 02, 2023
              </span>
              <p className="text-resort-text text-sm leading-relaxed">
                Integer magna leo, posuere et dignissim vitae, porttitor at
                odio. Pellentesque a metus nec magna placerat volutpat. Nunc
                nisi mi, elementum sit amet...
              </p>
            </li>
            <li>
              <h4 className="text-lg">
                <Link to="/news" className="text-resort-text no-underline">
                  Top 10 Diving Spots
                </Link>
              </h4>
              <span className="block text-resort-text text-sm mb-1">
                May 29, 2023
              </span>
              <p className="text-resort-text text-sm leading-relaxed">
                Maecenas scelerisque odio quis arcu fringilla malesuada. Nulla
                facilisi. In libero nulla, fermentum ut pretium ac, pharetra et
                eros...
              </p>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-resort-link uppercase tracking-wide mb-3">
            Testimonials
          </h3>
          <p className="text-resort-text text-sm leading-relaxed italic">
            "In hac habitasse platea dictumst. Integer purus justo, egestas eu
            consectetur eu, cursus in tortor. Quisque nec nunc ac mi ultrices
            iaculis. Aenean quis elit mauris, nec vestibulum lorem." — Juan De
            La Cruz
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link to="/rooms">
          <img src="/images/rooms.png" alt="Rooms" className="rounded" />
        </Link>
        <img src="/images/dive-site.png" alt="Dive sites" className="rounded" />
        <Link to="/meals">
          <img src="/images/food.png" alt="Meals" className="rounded" />
        </Link>
      </div>
    </>
  );
}
