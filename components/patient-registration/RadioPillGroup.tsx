type RadioPillGroupProps = {
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
};

export default function RadioPillGroup({ name, options, value, onChange }: RadioPillGroupProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-1.5 text-sm text-slate-700">
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            className="h-4 w-4 accent-emerald-600"
          />
          {option}
        </label>
      ))}
    </div>
  );
}
