import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmptyState, type EmptyStateProps } from "./empty-state";
import { ComponentDocs } from "../storybook/component-docs";

const meta = {
  title: "EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "An empty screen is a component that already knows why it is empty.",
      },
      page: ComponentDocs,
      canvas: { sourceState: "none" },
    },
  },
  args: {
    title: "No books",
    reason: "This desk has no positions.",
  },
  argTypes: {
    title: { description: "What is empty.", control: "text" },
    reason: { description: "Why it is empty.", control: "text" },
  },
} satisfies Meta<EmptyStateProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NoBooks: Story = {};
