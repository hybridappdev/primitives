import type { Meta, StoryObj } from "@storybook/react-vite";
import { StreamRow, type StreamRowProps } from "./stream-row";
import { ComponentDocs } from "../storybook/component-docs";

const meta = {
  title: "StreamRow",
  component: StreamRow,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Model output is a row on the surface.",
      },
      page: ComponentDocs,
      canvas: { sourceState: "none" },
    },
  },
  args: {
    source: "model",
    state: "settled",
    text: "Unrealized P&L is up on equities. Credit is the drag.",
  },
  argTypes: {
    source: {
      description: "model, person, or system.",
      control: "inline-radio",
      options: ["model", "person", "system"],
      table: { type: { summary: '"model" | "person" | "system"' } },
    },
    state: {
      description: "streaming or settled.",
      control: "inline-radio",
      options: ["streaming", "settled"],
      table: { type: { summary: '"streaming" | "settled"' } },
    },
    text: { description: "Mono text.", control: "text" },
  },
} satisfies Meta<StreamRowProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Settled: Story = {};

export const Streaming: Story = {
  args: { state: "streaming" },
};
