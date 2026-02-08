import { Button } from "../ui/Button";

interface IngredientFieldArrayProps {
  ingredients: string[];
  onChange: (ingredients: string[]) => void;
}

export function IngredientFieldArray({
  ingredients,
  onChange,
}: IngredientFieldArrayProps) {
  function updateAt(index: number, value: string) {
    const next = [...ingredients];
    next[index] = value;
    onChange(next);
  }

  function removeAt(index: number) {
    onChange(ingredients.filter((_, i) => i !== index));
  }

  function add() {
    onChange([...ingredients, ""]);
  }

  return (
    <fieldset>
      <legend className="block text-sm font-medium text-warm-700 mb-2">
        Ingredients <span className="text-red-600">*</span>
      </legend>
      <div className="space-y-2">
        {ingredients.map((ingredient, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => updateAt(i, e.target.value)}
              placeholder={`Ingredient ${i + 1}`}
              className="flex-1 rounded-md border border-warm-300 bg-white px-3 py-2 text-sm text-warm-900 placeholder:text-warm-400 focus:border-warm-500 focus:outline-none focus:ring-1 focus:ring-warm-500"
              aria-label={`Ingredient ${i + 1}`}
            />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="rounded-md px-2 py-2 text-sm text-warm-400 hover:text-red-600 transition-colors"
              aria-label={`Remove ingredient ${i + 1}`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="secondary"
        onClick={add}
        className="mt-2 text-xs"
      >
        + Add ingredient
      </Button>
    </fieldset>
  );
}
