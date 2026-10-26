import type { Meta, StoryObj } from "@storybook/react-vite";
import { colorNames, spaceScale, typeRoles } from "./tokens";
import "./foundations.css";

const samples: Record<(typeof typeRoles)[number], string> = {
  label: "Book",
  body: "Unrealized P&L is up on equities.",
  title: "Unrealized P&L",
  figure: "+2.4",
};

const meta = {
  title: "Foundations",
  parameters: {
    docs: {
      description: {
        component: "Named tokens. Hex values live only in the token source.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Color: Story = {
  render: () => (
    <ul className="token-list">
      {colorNames.map((name) => (
        <li key={name} className="token-row">
          <span className="swatch" data-color={name} />
          <p className="token-name">{name}</p>
        </li>
      ))}
    </ul>
  ),
};

export const Space: Story = {
  render: () => (
    <ul className="token-list">
      {spaceScale.map((step) => (
        <li key={step} className="token-row">
          <p className="space-name">{step}</p>
          <span className="space-bar" data-space={step} />
        </li>
      ))}
    </ul>
  ),
};

export const Type: Story = {
  render: () => (
    <ul className="type-list">
      {typeRoles.map((role) => (
        <li key={role} className="type-block">
          <p className="type-name">{role}</p>
          <p className="type-sample" data-role={role}>
            {samples[role]}
          </p>
        </li>
      ))}
    </ul>
  ),
};
