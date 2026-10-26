import type { Space } from "../tokens/tokens";
import type { ButtonVariant } from "../components/button";
import type { Tone } from "../tokens/tokens";
import type { StreamSource, StreamState } from "../components/stream-row";

export type LayoutNode =
  | StackNode
  | ButtonNode
  | FilterNode
  | ChartNode
  | TableNode
  | StreamNode
  | EmptyNode;

export type StackNode = {
  type: "stack";
  gap: Space;
  children: LayoutNode[];
};

export type ButtonNode = {
  type: "button";
  variant: ButtonVariant;
  label: string;
};

export type FilterNode = {
  type: "filter";
  id: string;
  label: string;
  options: string[];
  value: string;
};

export type ChartNode = {
  type: "chart";
  id: string;
  title: string;
  tone: Tone;
  points: number[];
};

export type TableNode = {
  type: "table";
  id: string;
  columns: string[];
  rows: string[][];
};

export type StreamNode = {
  type: "stream";
  id: string;
  source: StreamSource;
  state: StreamState;
  text: string;
};

export type EmptyNode = {
  type: "empty";
  title: string;
  reason: string;
};

export const layoutNodeTypes = [
  "stack",
  "button",
  "filter",
  "chart",
  "table",
  "stream",
  "empty",
] as const;

export type LayoutNodeType = (typeof layoutNodeTypes)[number];
