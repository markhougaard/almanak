import type { Recipe } from "../../types/recipe";
import { RecipeCard } from "./RecipeCard";

interface RecipeGridProps {
  recipes: Recipe[];
  view: "grid" | "list";
}

export function RecipeGrid({ recipes, view }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-warm-200 p-12 text-center">
        <p className="text-warm-500">No recipes yet.</p>
        <p className="mt-1 text-sm text-warm-400">
          Add your first recipe to get started.
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        view === "grid"
          ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          : "flex flex-col gap-4"
      }
    >
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} view={view} />
      ))}
    </div>
  );
}
