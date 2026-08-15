import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formError, setFormError] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError("");

    if (!credentials.email || !credentials.password || !credentials.name) {
      setFormError("All fields are required, please try again");
      return;
    }

    try {
      await login(
        { name: credentials.name, email: credentials.email },
        credentials.password,
      );
      navigate("/");
    } catch {
      setFormError("Login failed, please check your credentials and try again");
    }
  }

  return (
    <div className="max-w-md">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {formError && (
          <div className="bg-red-50 text-red-700 text-sm rounded px-3 py-2">
            {formError}
          </div>
        )}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Name"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            value={credentials.name}
            onChange={(e) =>
              setCredentials({ ...credentials, name: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email address"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="e.g 12+ alphanumerics"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          className="self-start bg-blue-600 text-white rounded px-4 py-2 text-sm hover:bg-blue-700"
        >
          Sign In!
        </button>
      </form>
    </div>
  );
}
