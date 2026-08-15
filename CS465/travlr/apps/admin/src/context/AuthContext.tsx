import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import * as api from "../lib/api";
import {
  isLoggedIn as checkIsLoggedIn,
  clearToken,
  saveToken,
} from "../lib/auth";
import type { User } from "../lib/types";

interface AuthContextValue {
  isLoggedIn: boolean;
  login: (user: User, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(checkIsLoggedIn());

  const login = useCallback(async (user: User, password: string) => {
    console.log("In login function", user, password);
    const authResp = await api.login(user, password);
    console.log("Login response", authResp);
    saveToken(authResp.token);
    setLoggedIn(checkIsLoggedIn());
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setLoggedIn(false);
  }, []);

  const value = useMemo(
    () => ({ isLoggedIn: loggedIn, login, logout }),
    [loggedIn, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
