import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col bg-repeat-x bg-top"
      style={{ backgroundImage: "url(/images/bg-pattern.jpg)" }}
    >
      <div className="max-w-3xl w-full mx-auto flex-1">
        <Header />
        <main className="bg-white/90 rounded shadow px-8 py-6">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
