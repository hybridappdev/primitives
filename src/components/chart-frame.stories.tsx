import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChartFrame, type ChartFrameProps } from "./chart-frame";
import { ComponentDocs } from "../storybook/component-docs";

const meta = {
  title: "ChartFrame",
  component: ChartFrame,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "One line, stroked with the tone token. An empty series renders EmptyState.",
      },
      page: ComponentDocs,
      canvas: { sourceState: "none" },
    },
  },
  args: {
    title: "Unrealized P&L",
    tone: "neutral",
    points: [12, 18, 14, 22, 19, 27],
  },
  argTypes: {
    title: { description: "Frame title.", control: "text" },
    tone: {
      description: "positive, negative, neutral, or attention.",
      control: "inline-radio",
      options: ["positive", "negative", "neutral", "attention"],
      table: { type: { summary: '"positive" | "negative" | "neutral" | "attention"' } },
    },
    points: { description: "Series values.", control: "object" },
  },
} satisfies Meta<ChartFrameProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Unrealized: Story = {};

export const Empty: Story = {
  args: { points: [] },
};
