import type { Meta, StoryObj } from "@storybook/react-vite";
import { Description, Primary } from "@storybook/addon-docs/blocks";
import { bookDesk } from "./book-desk";
import { renderLayout } from "../layout/render";

const meta = {
  title: "Book desk",
  parameters: {
    docs: {
      description: {
        component:
          "Charts and filters come from the shared primitives. Anything else is not a draft.",
      },
      page: () => (
        <>
          <Description />
          <Primary />
        </>
      ),
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const BookDesk: Story = {
  name: "Book desk",
  render: () => (
    <>
      {renderLayout(bookDesk)}
      <p className="catalog-caption">
        Charts and filters come from the shared primitives. Anything else is not a draft.
      </p>
    </>
  ),
};
