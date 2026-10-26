import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, sep } from "node:path";
import { describe, expect, it } from "vitest";

const hexColor =
  /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})(?![0-9a-fA-F])/;

function filesUnder(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return filesUnder(path);
    return [path];
  });
}

describe("source", () => {
  it("keeps hex colors out of components and layout", () => {
    const files = [...filesUnder("src/components"), ...filesUnder("src/layout")];
    const hits = files.filter((file) => hexColor.test(readFileSync(file, "utf8")));
    expect(hits).toEqual([]);
  });

  it("keeps hex colors in the token source only", () => {
    const files = filesUnder("src").filter((file) => !file.endsWith(`${sep}tokens.css`));
    const hits = files.filter((file) => hexColor.test(readFileSync(file, "utf8")));
    expect(hits).toEqual([]);
  });
});
