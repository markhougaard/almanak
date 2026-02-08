import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="border-b border-warm-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="text-xl font-bold text-warm-900 hover:text-warm-700">
          Almanak
        </Link>
        <nav aria-label="Main navigation">
          <Link
            to="/recipe/new"
            className="inline-flex items-center rounded-md bg-warm-800 px-4 py-2 text-sm font-medium text-white hover:bg-warm-700 transition-colors"
          >
            New Recipe
          </Link>
        </nav>
      </div>
    </header>
  );
}
