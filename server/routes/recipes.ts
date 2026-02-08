import { Router } from "express";
import type { Request, Response } from "express";
import type Database from "better-sqlite3";
import crypto from "node:crypto";

interface RecipeRow {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  instructions: string;
  image: string | null;
  recipe_yield: string | null;
  prep_time: string | null;
  cook_time: string | null;
  total_time: string | null;
  category: string | null;
  cuisine: string | null;
  author: string | null;
  url: string | null;
  created_at: string;
  updated_at: string;
}

function rowToRecipe(row: RecipeRow) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "Recipe" as const,
    _id: row.id,
    _createdAt: row.created_at,
    _updatedAt: row.updated_at,
    name: row.name,
    description: row.description,
    recipeIngredient: JSON.parse(row.ingredients),
    recipeInstructions: JSON.parse(row.instructions),
    ...(row.image && { image: row.image }),
    ...(row.recipe_yield && { recipeYield: row.recipe_yield }),
    ...(row.prep_time && { prepTime: row.prep_time }),
    ...(row.cook_time && { cookTime: row.cook_time }),
    ...(row.total_time && { totalTime: row.total_time }),
    ...(row.category && { recipeCategory: row.category }),
    ...(row.cuisine && { recipeCuisine: row.cuisine }),
    ...(row.author && { author: row.author }),
    ...(row.url && { url: row.url }),
  };
}

function validateRecipeBody(
  body: Record<string, unknown>,
): string | null {
  if (!body.name || typeof body.name !== "string") {
    return "name is required";
  }
  if (!body.description || typeof body.description !== "string") {
    return "description is required";
  }
  if (
    !Array.isArray(body.recipeIngredient) ||
    body.recipeIngredient.length === 0
  ) {
    return "recipeIngredient must be a non-empty array";
  }
  if (
    !Array.isArray(body.recipeInstructions) ||
    body.recipeInstructions.length === 0
  ) {
    return "recipeInstructions must be a non-empty array";
  }
  return null;
}

export function createRecipeRouter(db: Database.Database): Router {
  const router = Router();

  // GET /api/recipes
  router.get("/", (_req: Request, res: Response) => {
    try {
      const rows = db
        .prepare("SELECT * FROM recipes ORDER BY created_at DESC")
        .all() as RecipeRow[];
      res.json(rows.map(rowToRecipe));
    } catch (err) {
      console.error("GET /api/recipes error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // GET /api/recipes/:id
  router.get("/:id", (req: Request, res: Response) => {
    try {
      const row = db
        .prepare("SELECT * FROM recipes WHERE id = ?")
        .get(req.params.id) as RecipeRow | undefined;
      if (!row) {
        res.status(404).json({ error: "Recipe not found" });
        return;
      }
      res.json(rowToRecipe(row));
    } catch (err) {
      console.error("GET /api/recipes/:id error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // POST /api/recipes
  router.post("/", (req: Request, res: Response) => {
    try {
      const validationError = validateRecipeBody(req.body);
      if (validationError) {
        res.status(400).json({ error: validationError });
        return;
      }

      const body = req.body;
      const id = crypto.randomUUID();
      const now = new Date().toISOString();

      db.prepare(
        `INSERT INTO recipes (id, name, description, ingredients, instructions,
          image, recipe_yield, prep_time, cook_time, total_time,
          category, cuisine, author, url, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ).run(
        id,
        body.name,
        body.description,
        JSON.stringify(body.recipeIngredient),
        JSON.stringify(body.recipeInstructions),
        body.image || null,
        body.recipeYield || null,
        body.prepTime || null,
        body.cookTime || null,
        body.totalTime || null,
        body.recipeCategory || null,
        body.recipeCuisine || null,
        body.author || null,
        body.url || null,
        now,
        now,
      );

      const row = db
        .prepare("SELECT * FROM recipes WHERE id = ?")
        .get(id) as RecipeRow;
      res.status(201).json(rowToRecipe(row));
    } catch (err) {
      console.error("POST /api/recipes error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // PUT /api/recipes/:id
  router.put("/:id", (req: Request, res: Response) => {
    try {
      const existing = db
        .prepare("SELECT * FROM recipes WHERE id = ?")
        .get(req.params.id) as RecipeRow | undefined;
      if (!existing) {
        res.status(404).json({ error: "Recipe not found" });
        return;
      }

      const validationError = validateRecipeBody(req.body);
      if (validationError) {
        res.status(400).json({ error: validationError });
        return;
      }

      const body = req.body;
      const now = new Date().toISOString();

      db.prepare(
        `UPDATE recipes SET
          name = ?, description = ?, ingredients = ?, instructions = ?,
          image = ?, recipe_yield = ?, prep_time = ?, cook_time = ?, total_time = ?,
          category = ?, cuisine = ?, author = ?, url = ?, updated_at = ?
        WHERE id = ?`,
      ).run(
        body.name,
        body.description,
        JSON.stringify(body.recipeIngredient),
        JSON.stringify(body.recipeInstructions),
        body.image || null,
        body.recipeYield || null,
        body.prepTime || null,
        body.cookTime || null,
        body.totalTime || null,
        body.recipeCategory || null,
        body.recipeCuisine || null,
        body.author || null,
        body.url || null,
        now,
        req.params.id,
      );

      const row = db
        .prepare("SELECT * FROM recipes WHERE id = ?")
        .get(req.params.id) as RecipeRow;
      res.json(rowToRecipe(row));
    } catch (err) {
      console.error("PUT /api/recipes/:id error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // DELETE /api/recipes/:id
  router.delete("/:id", (req: Request, res: Response) => {
    try {
      const result = db
        .prepare("DELETE FROM recipes WHERE id = ?")
        .run(req.params.id);
      if (result.changes === 0) {
        res.status(404).json({ error: "Recipe not found" });
        return;
      }
      res.status(204).send();
    } catch (err) {
      console.error("DELETE /api/recipes/:id error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
}
