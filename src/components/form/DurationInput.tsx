import { parseIsoDuration, toIsoDuration } from "../../types/recipe";

interface DurationInputProps {
  label: string;
  value: string;
  onChange: (iso: string) => void;
}

export function DurationInput({ label, value, onChange }: DurationInputProps) {
  const { hours, minutes } = parseIsoDuration(value);
  const baseId = label.toLowerCase().replace(/\s+/g, "-");

  function handleChange(h: number, m: number) {
    onChange(toIsoDuration(Math.max(0, h), Math.max(0, m)));
  }

  return (
    <fieldset>
      <legend className="block text-sm font-medium text-warm-700 mb-1">
        {label}
      </legend>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <input
            id={`${baseId}-hours`}
            type="number"
            min={0}
            max={99}
            value={hours || ""}
            onChange={(e) => handleChange(parseInt(e.target.value) || 0, minutes)}
            className="w-16 rounded-md border border-warm-300 bg-white px-2 py-2 text-sm text-warm-900 focus:border-warm-500 focus:outline-none focus:ring-1 focus:ring-warm-500"
            aria-label={`${label} hours`}
          />
          <label htmlFor={`${baseId}-hours`} className="text-sm text-warm-500">
            h
          </label>
        </div>
        <div className="flex items-center gap-1">
          <input
            id={`${baseId}-minutes`}
            type="number"
            min={0}
            max={59}
            value={minutes || ""}
            onChange={(e) => handleChange(hours, parseInt(e.target.value) || 0)}
            className="w-16 rounded-md border border-warm-300 bg-white px-2 py-2 text-sm text-warm-900 focus:border-warm-500 focus:outline-none focus:ring-1 focus:ring-warm-500"
            aria-label={`${label} minutes`}
          />
          <label htmlFor={`${baseId}-minutes`} className="text-sm text-warm-500">
            min
          </label>
        </div>
      </div>
    </fieldset>
  );
}
