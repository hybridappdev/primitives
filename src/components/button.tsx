export type ButtonVariant = "primary" | "secondary" | "ghost";

export const buttonVariants = ["primary", "secondary", "ghost"] as const satisfies readonly ButtonVariant[];

export type ButtonSize = "sm" | "md" | "lg";

export const buttonSizes = ["sm", "md", "lg"] as const satisfies readonly ButtonSize[];

export type ButtonIcon = "plus" | "check";

export const buttonIcons = ["plus", "check"] as const satisfies readonly ButtonIcon[];

export type ButtonProps = {
  variant: ButtonVariant;
  size: ButtonSize;
  label: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: ButtonIcon;
  onClick?: () => void;
};

export function Button({
  variant,
  size,
  label,
  loading = false,
  disabled = false,
  icon,
  onClick,
}: ButtonProps) {
  const inactive = loading || disabled;

  return (
    <button
      type="button"
      className="pr-button"
      data-variant={variant}
      data-size={size}
      aria-disabled={inactive || undefined}
      aria-busy={loading || undefined}
      onClick={(event) => {
        if (inactive) {
          event.preventDefault();
          return;
        }
        onClick?.();
      }}
    >
      {loading ? <Spinner /> : icon ? <Icon name={icon} /> : null}
      {label}
    </button>
  );
}

function Spinner() {
  return (
    <svg className="pr-spinner" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle
        cx="8"
        cy="8"
        r="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="22 16"
      />
    </svg>
  );
}

function Icon({ name }: { name: ButtonIcon }) {
  if (name === "plus") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8 3v10M3 8h10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.5 6.5 11.5 12.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
