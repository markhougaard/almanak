interface IngredientListProps {
  ingredients: string[];
}

export function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-warm-900 mb-3">Ingredients</h2>
      <ul className="space-y-1.5">
        {ingredients.map((ingredient, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-warm-700">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warm-400" aria-hidden="true" />
            {ingredient}
          </li>
        ))}
      </ul>
    </section>
  );
}
