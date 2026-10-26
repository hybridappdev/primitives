import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../src/components/button";

describe("Button", () => {
  it("does not call onClick while loading", () => {
    const onClick = vi.fn();
    render(
      <Button variant="primary" size="md" label="Publish" loading onClick={onClick} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Publish" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("calls onClick when it is not loading", () => {
    const onClick = vi.fn();
    render(<Button variant="primary" size="md" label="Publish" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button", { name: "Publish" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
