export type ColorName =
  | "bg"
  | "bg-raised"
  | "bg-muted"
  | "fg"
  | "fg-secondary"
  | "fg-muted"
  | "line"
  | "accent"
  | "on-accent"
  | "positive"
  | "negative"
  | "attention";

export const colorNames = [
  "bg",
  "bg-raised",
  "bg-muted",
  "fg",
  "fg-secondary",
  "fg-muted",
  "line",
  "accent",
  "on-accent",
  "positive",
  "negative",
  "attention",
] as const satisfies readonly ColorName[];

export type Space = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12;

export const spaceScale = [0, 1, 2, 3, 4, 6, 8, 12] as const satisfies readonly Space[];

export type RadiusName = "control";

export const radiusNames = ["control"] as const satisfies readonly RadiusName[];

export type BorderName = "hairline";

export const borderNames = ["hairline"] as const satisfies readonly BorderName[];

export type TypeRole = "label" | "body" | "title" | "figure";

export const typeRoles = ["label", "body", "title", "figure"] as const satisfies readonly TypeRole[];

export type Tone = "positive" | "negative" | "neutral" | "attention";

export const tones = ["positive", "negative", "neutral", "attention"] as const satisfies readonly Tone[];

export type ColumnTone = "positive" | "negative" | "neutral";

export const columnTones = ["positive", "negative", "neutral"] as const satisfies readonly ColumnTone[];

export function isSpace(value: unknown): value is Space {
  return typeof value === "number" && (spaceScale as readonly number[]).includes(value);
}
