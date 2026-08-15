import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-2">
      <NavLink to="/" className="flex items-center">
        <img src="/images/logo.png" alt="Travlr" className="h-10" />
      </NavLink>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `text-sm font-semibold ${isActive ? "text-blue-600" : "text-gray-700"}`
        }
      >
        Trips
      </NavLink>
      <div>
        {!isLoggedIn && (
          <NavLink
            to="/login"
            className="text-sm text-gray-700 hover:text-blue-600"
          >
            Log In
          </NavLink>
        )}
        {isLoggedIn && (
          <button
            type="button"
            className="text-sm text-gray-700 hover:text-blue-600"
            onClick={logout}
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
}
