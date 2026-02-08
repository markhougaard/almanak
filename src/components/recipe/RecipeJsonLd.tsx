import type { Recipe } from "../../types/recipe";

interface RecipeJsonLdProps {
  recipe: Recipe;
}

export function RecipeJsonLd({ recipe }: RecipeJsonLdProps) {
  const jsonLd: Record<string, unknown> = { ...recipe };

  // Strip internal fields
  delete jsonLd._id;
  delete jsonLd._createdAt;
  delete jsonLd._updatedAt;

  // Wrap author as Person if present
  if (recipe.author) {
    jsonLd.author = {
      "@type": "Person",
      name: recipe.author,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
