import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Filter, type FilterProps } from "./filter";
import { ComponentDocs } from "../storybook/component-docs";

const bookOptions = [
  { value: "Equities", label: "Equities" },
  { value: "Credit", label: "Credit" },
  { value: "Rates", label: "Rates" },
];

function FilterCanvas(args: FilterProps) {
  const [value, setValue] = useState(args.value);
  return (
    <Filter
      id={args.id}
      label={args.label}
      options={args.options}
      value={value}
      onChange={(next) => {
        setValue(next);
        args.onChange(next);
      }}
    />
  );
}

const meta = {
  title: "Filter",
  component: Filter,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "A single select. It emits one of its options.",
      },
      page: ComponentDocs,
      canvas: { sourceState: "none" },
    },
  },
  args: {
    id: "book",
    label: "Book",
    options: bookOptions,
    value: "Equities",
    onChange: fn(),
  },
  argTypes: {
    id: { description: "Id of the select.", control: "text" },
    label: { description: "Visible label.", control: "text" },
    options: { description: "Options are { value, label }.", control: "object" },
    value: { description: "The selected option value.", control: "text" },
    onChange: { description: "Emits one of the option values.", control: false },
  },
  render: (args) => <FilterCanvas {...args} />,
} satisfies Meta<FilterProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Book: Story = {};
