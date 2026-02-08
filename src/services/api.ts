import type { Recipe, RecipeFormData } from "../types/recipe";

const BASE = "/api/recipes";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { error?: string }).error || `Request failed: ${res.status}`,
    );
  }
  return res.json() as Promise<T>;
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const res = await fetch(BASE);
  return handleResponse<Recipe[]>(res);
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const res = await fetch(`${BASE}/${id}`);
  if (res.status === 404) return null;
  return handleResponse<Recipe>(res);
}

export async function addRecipe(data: RecipeFormData): Promise<Recipe> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Recipe>(res);
}

export async function updateRecipe(
  id: string,
  data: RecipeFormData,
): Promise<Recipe> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Recipe>(res);
}

export async function deleteRecipe(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok && res.status !== 404) {
    throw new Error(`Delete failed: ${res.status}`);
  }
}
