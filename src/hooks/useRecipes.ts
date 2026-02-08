import { useState, useEffect, useCallback } from "react";
import type { Recipe, RecipeFormData } from "../types/recipe";
import * as api from "../services/api";

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAllRecipes();
      setRecipes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load recipes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = useCallback(
    async (data: RecipeFormData): Promise<Recipe> => {
      const recipe = await api.addRecipe(data);
      await refresh();
      return recipe;
    },
    [refresh],
  );

  const update = useCallback(
    async (id: string, data: RecipeFormData): Promise<Recipe> => {
      const recipe = await api.updateRecipe(id, data);
      await refresh();
      return recipe;
    },
    [refresh],
  );

  const remove = useCallback(
    async (id: string): Promise<void> => {
      await api.deleteRecipe(id);
      await refresh();
    },
    [refresh],
  );

  return { recipes, loading, error, add, update, remove, refresh };
}
