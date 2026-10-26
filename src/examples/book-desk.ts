import type { LayoutNode } from "../layout/schema";

export const bookDesk: LayoutNode = {
  type: "stack",
  gap: 6,
  children: [
    {
      type: "filter",
      id: "book",
      label: "Book",
      options: ["Equities", "Credit", "Rates"],
      value: "Equities",
    },
    {
      type: "chart",
      id: "unrealized-pnl",
      title: "Unrealized P&L",
      tone: "neutral",
      points: [12, 18, 14, 22, 19, 27],
    },
    {
      type: "table",
      id: "books",
      columns: ["Book", "Unrealized", "Day"],
      rows: [
        ["Equities", "+2.4", "+0.3"],
        ["Credit", "−0.8", "−0.1"],
        ["Rates", "+0.4", "+0.1"],
      ],
    },
    {
      type: "stream",
      id: "summary",
      source: "model",
      state: "settled",
      text: "Unrealized P&L is up on equities. Credit is the drag.",
    },
    {
      type: "button",
      variant: "primary",
      label: "Publish",
    },
  ],
};
