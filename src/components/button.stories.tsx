import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button, type ButtonProps } from "./button";
import { ComponentDocs } from "../storybook/component-docs";

const meta = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "One primary action per view.",
      },
      page: ComponentDocs,
      canvas: { sourceState: "none" },
    },
  },
  args: {
    variant: "primary",
    size: "md",
    label: "Publish",
    loading: false,
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    variant: {
      description: "primary, secondary, or ghost.",
      control: "inline-radio",
      options: ["primary", "secondary", "ghost"],
      table: { type: { summary: '"primary" | "secondary" | "ghost"' } },
    },
    size: {
      description: "sm, md, or lg.",
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { type: { summary: '"sm" | "md" | "lg"' } },
    },
    label: {
      description: "Visible label.",
      control: "text",
    },
    loading: {
      description: "Shows a spinner and does not call onClick.",
      control: "boolean",
    },
    disabled: {
      description: "Leaves the tab order.",
      control: "boolean",
    },
    icon: {
      description: "Optional leading icon, 16px. plus or check.",
      control: "select",
      options: ["plus", "check"],
      table: { type: { summary: '"plus" | "check"' } },
    },
    onClick: {
      description: "Called when the button activates.",
      control: false,
    },
  },
} satisfies Meta<ButtonProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const LeadingIcon: Story = {
  args: { icon: "plus", label: "Add" },
};
