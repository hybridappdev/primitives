export type FilterOption = {
  value: string;
  label: string;
};

export type FilterProps = {
  id: string;
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
};

export function Filter({ id, label, options, value, onChange }: FilterProps) {
  return (
    <label className="pr-filter" htmlFor={id}>
      <span className="pr-filter-label">{label}</span>
      <span className="pr-filter-control">
        <select
          id={id}
          value={value}
          onChange={(event) => {
            const next = event.target.value;
            if (options.some((option) => option.value === next)) {
              onChange(next);
            }
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pr-filter-chevron" aria-hidden="true" />
      </span>
    </label>
  );
}
