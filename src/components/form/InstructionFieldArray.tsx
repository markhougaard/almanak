import { Button } from "../ui/Button";

interface InstructionFieldArrayProps {
  instructions: string[];
  onChange: (instructions: string[]) => void;
}

export function InstructionFieldArray({
  instructions,
  onChange,
}: InstructionFieldArrayProps) {
  function updateAt(index: number, value: string) {
    const next = [...instructions];
    next[index] = value;
    onChange(next);
  }

  function removeAt(index: number) {
    onChange(instructions.filter((_, i) => i !== index));
  }

  function add() {
    onChange([...instructions, ""]);
  }

  return (
    <fieldset>
      <legend className="block text-sm font-medium text-warm-700 mb-2">
        Instructions <span className="text-red-600">*</span>
      </legend>
      <div className="space-y-3">
        {instructions.map((step, i) => (
          <div key={i} className="flex gap-2">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-warm-200 text-xs font-semibold text-warm-700 mt-1">
              {i + 1}
            </span>
            <textarea
              value={step}
              onChange={(e) => updateAt(i, e.target.value)}
              placeholder={`Step ${i + 1}`}
              rows={2}
              className="flex-1 rounded-md border border-warm-300 bg-white px-3 py-2 text-sm text-warm-900 placeholder:text-warm-400 focus:border-warm-500 focus:outline-none focus:ring-1 focus:ring-warm-500"
              aria-label={`Step ${i + 1}`}
            />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="rounded-md px-2 py-2 text-sm text-warm-400 hover:text-red-600 transition-colors self-start mt-1"
              aria-label={`Remove step ${i + 1}`}
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
        + Add step
      </Button>
    </fieldset>
  );
}
