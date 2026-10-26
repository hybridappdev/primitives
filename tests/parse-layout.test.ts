import { describe, expect, it } from "vitest";
import { bookDesk } from "../src/examples/book-desk";
import { parseLayout, type LayoutError } from "../src/layout/parse";
import type { LayoutNode } from "../src/layout/schema";

function isErrorList(result: LayoutNode | LayoutError[]): result is LayoutError[] {
  return Array.isArray(result);
}

describe("parseLayout", () => {
  it("accepts the book desk fixture", () => {
    expect(parseLayout(bookDesk)).toEqual(bookDesk);
  });

  it("rejects an unknown node", () => {
    const result = parseLayout({ type: "div" });
    expect(isErrorList(result)).toBe(true);
  });

  it("rejects a className field", () => {
    const result = parseLayout({
      type: "empty",
      title: "None",
      reason: "No rows",
      className: "leak",
    });
    expect(isErrorList(result)).toBe(true);
  });

  it("rejects a style field", () => {
    const result = parseLayout({
      type: "button",
      variant: "primary",
      label: "Publish",
      style: { margin: 0 },
    });
    expect(isErrorList(result)).toBe(true);
  });

  it("rejects a color field", () => {
    const result = parseLayout({
      type: "button",
      variant: "primary",
      label: "Publish",
      color: "accent",
    });
    expect(isErrorList(result)).toBe(true);
  });

  it("rejects a hex color", () => {
    const result = parseLayout({
      type: "empty",
      title: "Accent",
      reason: "#4f46e5",
    });
    expect(isErrorList(result)).toBe(true);
  });
});
