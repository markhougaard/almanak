export interface HowToStep {
  "@type": "HowToStep";
  position: number;
  text: string;
}

export interface Recipe {
  "@context": "https://schema.org";
  "@type": "Recipe";

  name: string;
  description: string;
  recipeIngredient: string[];
  recipeInstructions: HowToStep[];

  image?: string;
  recipeYield?: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  recipeCategory?: string;
  recipeCuisine?: string;
  author?: string;
  url?: string;

  _id: string;
  _createdAt: string;
  _updatedAt: string;
}

export type RecipeFormData = Omit<
  Recipe,
  "@context" | "@type" | "_id" | "_createdAt" | "_updatedAt"
>;

export type RecipeJsonLdData = Omit<Recipe, "_id" | "_createdAt" | "_updatedAt">;

export function toIsoDuration(hours: number, minutes: number): string {
  if (hours === 0 && minutes === 0) return "";
  let s = "PT";
  if (hours > 0) s += `${hours}H`;
  if (minutes > 0) s += `${minutes}M`;
  return s;
}

export function parseIsoDuration(iso: string): {
  hours: number;
  minutes: number;
} {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return { hours: 0, minutes: 0 };
  return {
    hours: parseInt(match[1] || "0", 10),
    minutes: parseInt(match[2] || "0", 10),
  };
}

export function formatDuration(iso: string | undefined): string {
  if (!iso) return "";
  const { hours, minutes } = parseIsoDuration(iso);
  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}min`);
  return parts.join(" ");
}
