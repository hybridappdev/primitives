import { buttonVariants } from "../components/button";
import { streamSources, streamStates } from "../components/stream-row";
import { isSpace } from "../tokens/tokens";
import { tones } from "../tokens/tokens";
import { layoutNodeTypes, type LayoutNode, type LayoutNodeType } from "./schema";

export type LayoutError = {
  path: string;
  message: string;
};

const bannedKeys = new Set(["className", "style", "color"]);

const fields: Record<LayoutNodeType, readonly string[]> = {
  stack: ["type", "gap", "children"],
  button: ["type", "variant", "label"],
  filter: ["type", "id", "label", "options", "value"],
  chart: ["type", "id", "title", "tone", "points"],
  table: ["type", "id", "columns", "rows"],
  stream: ["type", "id", "source", "state", "text"],
  empty: ["type", "title", "reason"],
};

const hexColor =
  /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})(?![0-9a-fA-F])/;

export function parseLayout(input: unknown): LayoutNode | LayoutError[] {
  const errors: LayoutError[] = [];
  scan(input, "$", errors);
  validateNode(input, "$", errors);
  if (errors.length > 0) return errors;
  return input as LayoutNode;
}

function scan(value: unknown, path: string, errors: LayoutError[]) {
  if (typeof value === "string") {
    if (hexColor.test(value)) {
      errors.push({ path, message: "Hex colors are not allowed." });
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => scan(item, `${path}[${index}]`, errors));
    return;
  }

  if (!isRecord(value)) return;

  for (const [key, child] of Object.entries(value)) {
    if (bannedKeys.has(key)) {
      errors.push({ path: `${path}.${key}`, message: `${key} is not allowed.` });
    }
    scan(child, `${path}.${key}`, errors);
  }
}

function validateNode(value: unknown, path: string, errors: LayoutError[]) {
  if (!isRecord(value)) {
    errors.push({ path, message: "Expected a node." });
    return;
  }

  const type = value.type;
  if (!isNodeType(type)) {
    errors.push({ path: `${path}.type`, message: "Unknown node type." });
    return;
  }

  const allowed = fields[type];
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key) && !bannedKeys.has(key)) {
      errors.push({ path: `${path}.${key}`, message: `Unknown field ${key}.` });
    }
  }

  switch (type) {
    case "stack":
      validateStack(value, path, errors);
      return;
    case "button":
      requireEnum(value.variant, buttonVariants, `${path}.variant`, errors);
      requireString(value.label, `${path}.label`, errors);
      return;
    case "filter":
      validateFilter(value, path, errors);
      return;
    case "chart":
      validateChart(value, path, errors);
      return;
    case "table":
      validateTable(value, path, errors);
      return;
    case "stream":
      requireString(value.id, `${path}.id`, errors);
      requireEnum(value.source, streamSources, `${path}.source`, errors);
      requireEnum(value.state, streamStates, `${path}.state`, errors);
      requireString(value.text, `${path}.text`, errors);
      return;
    case "empty":
      requireString(value.title, `${path}.title`, errors);
      requireString(value.reason, `${path}.reason`, errors);
      return;
    default: {
      const unreachable: never = type;
      return unreachable;
    }
  }
}

function validateStack(value: Record<string, unknown>, path: string, errors: LayoutError[]) {
  if (!isSpace(value.gap)) {
    errors.push({ path: `${path}.gap`, message: "gap must be a space token." });
  }
  if (!Array.isArray(value.children)) {
    errors.push({ path: `${path}.children`, message: "children must be a list of nodes." });
    return;
  }
  value.children.forEach((child, index) => validateNode(child, `${path}.children[${index}]`, errors));
}

function validateFilter(value: Record<string, unknown>, path: string, errors: LayoutError[]) {
  requireString(value.id, `${path}.id`, errors);
  requireString(value.label, `${path}.label`, errors);
  const options = value.options;
  if (!isStringArray(options)) {
    errors.push({ path: `${path}.options`, message: "options must be a list of strings." });
    return;
  }
  if (typeof value.value !== "string" || !options.includes(value.value)) {
    errors.push({ path: `${path}.value`, message: "value must be one of the options." });
  }
}

function validateChart(value: Record<string, unknown>, path: string, errors: LayoutError[]) {
  requireString(value.id, `${path}.id`, errors);
  requireString(value.title, `${path}.title`, errors);
  requireEnum(value.tone, tones, `${path}.tone`, errors);
  if (!isNumberArray(value.points)) {
    errors.push({ path: `${path}.points`, message: "points must be a list of numbers." });
  }
}

function validateTable(value: Record<string, unknown>, path: string, errors: LayoutError[]) {
  requireString(value.id, `${path}.id`, errors);
  const columns = value.columns;
  if (!isStringArray(columns)) {
    errors.push({ path: `${path}.columns`, message: "columns must be a list of strings." });
    return;
  }
  const rows = value.rows;
  if (!Array.isArray(rows)) {
    errors.push({ path: `${path}.rows`, message: "rows must be a list of string lists." });
    return;
  }
  rows.forEach((row, index) => {
    if (!isStringArray(row) || row.length !== columns.length) {
      errors.push({
        path: `${path}.rows[${index}]`,
        message: "Each row must be strings, one cell per column.",
      });
    }
  });
}

function requireString(value: unknown, path: string, errors: LayoutError[]) {
  if (typeof value !== "string") {
    errors.push({ path, message: "Expected a string." });
  }
}

function requireEnum(
  value: unknown,
  allowed: readonly string[],
  path: string,
  errors: LayoutError[],
) {
  if (typeof value !== "string" || !allowed.includes(value)) {
    errors.push({ path, message: "Value is not allowed." });
  }
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isNumberArray(value: unknown): value is number[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "number" && Number.isFinite(item))
  );
}

function isNodeType(value: unknown): value is LayoutNodeType {
  return typeof value === "string" && (layoutNodeTypes as readonly string[]).includes(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
