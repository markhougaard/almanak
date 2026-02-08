import { Link } from "react-router-dom";
import type { Recipe } from "../../types/recipe";
import { formatDuration } from "../../types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  view: "grid" | "list";
}

export function RecipeCard({ recipe, view }: RecipeCardProps) {
  const isGrid = view === "grid";

  return (
    <article
      className={`group overflow-hidden rounded-lg border border-warm-200 bg-white transition-shadow hover:shadow-md ${
        isGrid ? "" : "flex"
      }`}
    >
      <Link
        to={`/recipe/${recipe._id}`}
        className={`block ${isGrid ? "" : "flex flex-1"}`}
        aria-label={recipe.name}
      >
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.name}
            className={`object-cover ${
              isGrid
                ? "aspect-[4/3] w-full"
                : "h-32 w-40 flex-shrink-0 sm:h-36 sm:w-48"
            }`}
          />
        ) : (
          <div
            role="img"
            aria-label={`No image available for ${recipe.name}`}
            className={`flex items-center justify-center bg-warm-100 text-warm-400 ${
              isGrid
                ? "aspect-[4/3] w-full"
                : "h-32 w-40 flex-shrink-0 sm:h-36 sm:w-48"
            }`}
          >
            <svg
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
        )}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-warm-900 group-hover:text-warm-700">
            {recipe.name}
          </h2>
          <p className="mt-1 line-clamp-2 text-sm text-warm-600">
            {recipe.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-warm-500">
            {recipe.recipeCuisine && (
              <span className="rounded-full bg-warm-100 px-2 py-0.5">
                {recipe.recipeCuisine}
              </span>
            )}
            {recipe.recipeCategory && (
              <span className="rounded-full bg-warm-100 px-2 py-0.5">
                {recipe.recipeCategory}
              </span>
            )}
            {recipe.totalTime && (
              <span className="rounded-full bg-warm-100 px-2 py-0.5">
                {formatDuration(recipe.totalTime)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
