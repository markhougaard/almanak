import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import type { RecipeFormData } from "../types/recipe";
import { useRecipes } from "../hooks/useRecipes";
import * as api from "../services/api";
import { RecipeFormFields } from "../components/form/RecipeFormFields";

const emptyFormData: RecipeFormData = {
  name: "",
  description: "",
  recipeIngredient: [""],
  recipeInstructions: [{ "@type": "HowToStep", position: 1, text: "" }],
  image: undefined,
  recipeYield: undefined,
  prepTime: undefined,
  cookTime: undefined,
  totalTime: undefined,
  recipeCategory: undefined,
  recipeCuisine: undefined,
  author: undefined,
  url: undefined,
};

export function RecipeFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { add, update } = useRecipes();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<RecipeFormData>(emptyFormData);
  const [loading, setLoading] = useState(Boolean(id));
  const [notFound, setNotFound] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.getRecipeById(id).then((recipe) => {
      if (recipe) {
        setFormData({
          name: recipe.name,
          description: recipe.description,
          recipeIngredient: recipe.recipeIngredient,
          recipeInstructions: recipe.recipeInstructions,
          image: recipe.image,
          recipeYield: recipe.recipeYield,
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
          totalTime: recipe.totalTime,
          recipeCategory: recipe.recipeCategory,
          recipeCuisine: recipe.recipeCuisine,
          author: recipe.author,
          url: recipe.url,
        });
      } else {
        setNotFound(true);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <p className="text-warm-500 py-8">Loading recipe...</p>;
  }

  if (notFound) {
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

  async function handleSubmit() {
    const cleanedIngredients = formData.recipeIngredient.filter(
      (s) => s.trim() !== "",
    );
    const cleanedInstructions = formData.recipeInstructions
      .filter((s) => s.text.trim() !== "")
      .map((s, i) => ({ ...s, position: i + 1 }));

    if (cleanedIngredients.length === 0 || cleanedInstructions.length === 0) {
      alert("Please add at least one ingredient and one instruction step.");
      return;
    }

    const payload: RecipeFormData = {
      ...formData,
      recipeIngredient: cleanedIngredients,
      recipeInstructions: cleanedInstructions,
    };

    try {
      setSubmitting(true);
      if (isEditing && id) {
        await update(id, payload);
        navigate(`/recipe/${id}`);
      } else {
        const created = await add(payload);
        navigate(`/recipe/${created._id}`);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save recipe");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          to={isEditing ? `/recipe/${id}` : "/"}
          className="text-sm text-warm-500 hover:text-warm-700"
        >
          &larr; {isEditing ? "Back to recipe" : "All recipes"}
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-warm-900 mb-6">
        {isEditing ? "Edit Recipe" : "New Recipe"}
      </h1>
      <RecipeFormFields
        data={formData}
        onChange={setFormData}
        onSubmit={handleSubmit}
        submitLabel={isEditing ? "Save Changes" : "Add Recipe"}
        disabled={submitting}
      />
    </div>
  );
}
