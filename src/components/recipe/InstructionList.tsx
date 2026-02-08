import type { HowToStep } from "../../types/recipe";

interface InstructionListProps {
  instructions: HowToStep[];
}

export function InstructionList({ instructions }: InstructionListProps) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-warm-900 mb-3">Instructions</h2>
      <ol className="space-y-4">
        {instructions.map((step) => (
          <li key={step.position} className="flex gap-3 text-sm text-warm-700">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-warm-200 text-xs font-semibold text-warm-700">
              {step.position}
            </span>
            <p className="pt-0.5">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
