import { useState } from "react";
import { useRecipes } from "../hooks/useRecipes";
import { RecipeGrid } from "../components/recipe/RecipeGrid";

type View = "grid" | "list";

function getInitialView(): View {
  const stored = localStorage.getItem("almanak_view");
  return stored === "list" ? "list" : "grid";
}

export function RecipeListPage() {
  const { recipes, loading, error, refresh } = useRecipes();
  const [view, setView] = useState<View>(getInitialView);

  function toggleView(next: View) {
    setView(next);
    localStorage.setItem("almanak_view", next);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-warm-900">Recipes</h1>
        <div className="flex gap-1 rounded-md border border-warm-200 p-0.5" role="group" aria-label="View toggle">
          <button
            type="button"
            onClick={() => toggleView("grid")}
            aria-pressed={view === "grid"}
            className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
              view === "grid"
                ? "bg-warm-800 text-white"
                : "text-warm-600 hover:text-warm-900"
            }`}
          >
            Grid
          </button>
          <button
            type="button"
            onClick={() => toggleView("list")}
            aria-pressed={view === "list"}
            className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
              view === "list"
                ? "bg-warm-800 text-white"
                : "text-warm-600 hover:text-warm-900"
            }`}
          >
            List
          </button>
        </div>
      </div>
      {loading ? (
        <p className="text-warm-500">Loading recipes...</p>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
          <p className="text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => refresh()}
            className="mt-2 text-sm text-red-600 underline hover:text-red-800"
          >
            Try again
          </button>
        </div>
      ) : (
        <RecipeGrid recipes={recipes} view={view} />
      )}
    </div>
  );
}
