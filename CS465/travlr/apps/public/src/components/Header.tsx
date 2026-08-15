import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Travel", to: "/travel" },
  { label: "Rooms", to: "/rooms" },
  { label: "Meals", to: "/meals" },
  { label: "News", to: "/news" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  return (
    <header className="pt-6 pb-4">
      <div className="flex justify-center mb-5">
        <NavLink to="/">
          <img
            src="/images/logo.png"
            alt="Travlr Getaways"
            height={100}
            width={200}
          />
        </NavLink>
      </div>
      <nav className="bg-resort-heading">
        <ul className="flex flex-wrap justify-center">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end
                className={({ isActive }) =>
                  `block px-5 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-resort-link/80 ${
                    isActive ? "bg-resort-link" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
