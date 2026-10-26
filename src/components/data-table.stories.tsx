import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable, type DataTableProps } from "./data-table";
import { ComponentDocs } from "../storybook/component-docs";

const columns: DataTableProps["columns"] = [
  { key: "book", header: "Book", align: "start", tone: "neutral" },
  { key: "unrealized", header: "Unrealized", align: "end", tone: "positive" },
  { key: "day", header: "Day", align: "end", tone: "positive" },
];

const rows: DataTableProps["rows"] = [
  { book: "Equities", unrealized: "+2.4", day: "+0.3" },
  { book: "Credit", unrealized: "−0.8", day: "−0.1" },
  { book: "Rates", unrealized: "+0.4", day: "+0.1" },
];

const meta = {
  title: "DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Columns decide alignment and tone. A negative value uses the negative token through the column tone.",
      },
      page: ComponentDocs,
      canvas: { sourceState: "none" },
    },
  },
  args: {
    columns,
    rows,
    density: "regular",
  },
  argTypes: {
    columns: {
      description: "key, header, align start or end, and an optional tone.",
      control: "object",
    },
    rows: { description: "Records keyed by column.", control: "object" },
    density: {
      description: "compact or regular.",
      control: "inline-radio",
      options: ["compact", "regular"],
      table: { type: { summary: '"compact" | "regular"' } },
    },
  },
} satisfies Meta<DataTableProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Books: Story = {};

export const Compact: Story = {
  args: { density: "compact" },
};
