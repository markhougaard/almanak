import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import type { Recipe } from "../types/recipe";
import { formatDuration } from "../types/recipe";
import { useRecipes } from "../hooks/useRecipes";
import * as api from "../services/api";
import { IngredientList } from "../components/recipe/IngredientList";
import { InstructionList } from "../components/recipe/InstructionList";
import { RecipeJsonLd } from "../components/recipe/RecipeJsonLd";
import { Button } from "../components/ui/Button";

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { remove } = useRecipes();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .getRecipeById(id)
      .then(setRecipe)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-warm-500 py-8">Loading recipe...</p>;
  }

  if (!recipe) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-warm-900">Recipe not found</h1>
        <Link
          to="/"
          className="mt-4 inline-block text-warm-700 underline hover:text-warm-900"
        >
          Back to recipes
        </Link>
      </div>
    );
  }

  async function handleDelete() {
    if (window.confirm(`Delete "${recipe!.name}"? This cannot be undone.`)) {
      await remove(recipe!._id);
      navigate("/");
    }
  }

  const meta = [
    recipe.recipeCuisine && { label: "Cuisine", value: recipe.recipeCuisine },
    recipe.recipeCategory && {
      label: "Category",
      value: recipe.recipeCategory,
    },
    recipe.recipeYield && { label: "Servings", value: recipe.recipeYield },
    recipe.prepTime && { label: "Prep", value: formatDuration(recipe.prepTime) },
    recipe.cookTime && { label: "Cook", value: formatDuration(recipe.cookTime) },
    recipe.totalTime && {
      label: "Total",
      value: formatDuration(recipe.totalTime),
    },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article>
      <RecipeJsonLd recipe={recipe} />

      <div className="mb-6">
        <Link to="/" className="text-sm text-warm-500 hover:text-warm-700">
          &larr; All recipes
        </Link>
      </div>

      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          className="mb-6 w-full max-h-80 object-cover rounded-lg"
        />
      )}

      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-warm-900">{recipe.name}</h1>
          {recipe.author && (
            <p className="mt-1 text-sm text-warm-500">by {recipe.author}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => navigate(`/recipe/${recipe._id}/edit`)}
          >
            Edit
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <p className="text-warm-700 mb-6">{recipe.description}</p>

      {meta.length > 0 && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 rounded-lg bg-warm-100 px-4 py-3 mb-8 text-sm">
          {meta.map((m) => (
            <div key={m.label}>
              <span className="font-medium text-warm-700">{m.label}:</span>{" "}
              <span className="text-warm-600">{m.value}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <IngredientList ingredients={recipe.recipeIngredient} />
        <InstructionList instructions={recipe.recipeInstructions} />
      </div>

      {recipe.url && (
        <p className="mt-8 text-sm text-warm-500">
          Source:{" "}
          <a
            href={recipe.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-warm-700"
          >
            {recipe.url}
          </a>
        </p>
      )}
    </article>
  );
}
