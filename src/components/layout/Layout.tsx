import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="min-h-screen bg-warm-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-warm-800 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:m-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
