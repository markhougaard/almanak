import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { seedRecipes } from "./seed-data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function initDb(): Database.Database {
  const dataDir = path.resolve(__dirname, "../data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const db = new Database(path.join(dataDir, "almanak.db"));
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
      id            TEXT PRIMARY KEY,
      name          TEXT NOT NULL,
      description   TEXT NOT NULL,
      ingredients   TEXT NOT NULL,
      instructions  TEXT NOT NULL,
      image         TEXT,
      recipe_yield  TEXT,
      prep_time     TEXT,
      cook_time     TEXT,
      total_time    TEXT,
      category      TEXT,
      cuisine       TEXT,
      author        TEXT,
      url           TEXT,
      created_at    TEXT NOT NULL,
      updated_at    TEXT NOT NULL
    )
  `);

  // Seed only if table is empty
  const count = db.prepare("SELECT COUNT(*) as count FROM recipes").get() as {
    count: number;
  };

  if (count.count === 0) {
    const insert = db.prepare(`
      INSERT INTO recipes (id, name, description, ingredients, instructions,
        image, recipe_yield, prep_time, cook_time, total_time,
        category, cuisine, author, url, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction(() => {
      for (const r of seedRecipes) {
        insert.run(
          r.id,
          r.name,
          r.description,
          JSON.stringify(r.ingredients),
          JSON.stringify(r.instructions),
          r.image ?? null,
          r.recipeYield ?? null,
          r.prepTime ?? null,
          r.cookTime ?? null,
          r.totalTime ?? null,
          r.category ?? null,
          r.cuisine ?? null,
          r.author ?? null,
          r.url ?? null,
          r.createdAt,
          r.updatedAt,
        );
      }
    });

    insertMany();
    console.log(`Seeded ${seedRecipes.length} recipes`);
  }

  return db;
}
