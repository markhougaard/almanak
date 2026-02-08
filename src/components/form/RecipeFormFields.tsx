import type { RecipeFormData } from "../../types/recipe";
import { Input } from "../ui/Input";
import { TextArea } from "../ui/TextArea";
import { DurationInput } from "./DurationInput";
import { IngredientFieldArray } from "./IngredientFieldArray";
import { InstructionFieldArray } from "./InstructionFieldArray";
import { Button } from "../ui/Button";

interface RecipeFormFieldsProps {
  data: RecipeFormData;
  onChange: (data: RecipeFormData) => void;
  onSubmit: () => void;
  submitLabel: string;
  disabled?: boolean;
}

export function RecipeFormFields({
  data,
  onChange,
  onSubmit,
  submitLabel,
  disabled,
}: RecipeFormFieldsProps) {
  function set<K extends keyof RecipeFormData>(key: K, value: RecipeFormData[K]) {
    onChange({ ...data, [key]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Name"
        value={data.name}
        onChange={(e) => set("name", e.target.value)}
        required
        placeholder="e.g. Spaghetti Carbonara"
      />

      <TextArea
        label="Description"
        value={data.description}
        onChange={(e) => set("description", e.target.value)}
        required
        placeholder="A short description of the dish"
      />

      <Input
        label="Image URL"
        type="url"
        value={data.image || ""}
        onChange={(e) => set("image", e.target.value || undefined)}
        placeholder="https://example.com/photo.jpg"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Cuisine"
          value={data.recipeCuisine || ""}
          onChange={(e) => set("recipeCuisine", e.target.value || undefined)}
          placeholder="e.g. Italian"
        />
        <Input
          label="Category"
          value={data.recipeCategory || ""}
          onChange={(e) => set("recipeCategory", e.target.value || undefined)}
          placeholder="e.g. Dinner"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Servings"
          value={data.recipeYield || ""}
          onChange={(e) => set("recipeYield", e.target.value || undefined)}
          placeholder="e.g. 4 servings"
        />
        <Input
          label="Author"
          value={data.author || ""}
          onChange={(e) => set("author", e.target.value || undefined)}
          placeholder="e.g. Jamie Oliver"
        />
      </div>

      <Input
        label="Source URL"
        type="url"
        value={data.url || ""}
        onChange={(e) => set("url", e.target.value || undefined)}
        placeholder="https://example.com/recipe"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <DurationInput
          label="Prep time"
          value={data.prepTime || ""}
          onChange={(v) => set("prepTime", v || undefined)}
        />
        <DurationInput
          label="Cook time"
          value={data.cookTime || ""}
          onChange={(v) => set("cookTime", v || undefined)}
        />
        <DurationInput
          label="Total time"
          value={data.totalTime || ""}
          onChange={(v) => set("totalTime", v || undefined)}
        />
      </div>

      <hr className="border-warm-200" />

      <IngredientFieldArray
        ingredients={data.recipeIngredient}
        onChange={(v) => set("recipeIngredient", v)}
      />

      <hr className="border-warm-200" />

      <InstructionFieldArray
        instructions={data.recipeInstructions.map((s) => s.text)}
        onChange={(texts) =>
          set(
            "recipeInstructions",
            texts.map((text, i) => ({
              "@type": "HowToStep" as const,
              position: i + 1,
              text,
            })),
          )
        }
      />

      <hr className="border-warm-200" />

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={disabled}>
          {disabled ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
