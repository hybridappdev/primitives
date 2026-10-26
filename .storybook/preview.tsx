import type { Preview } from "@storybook/react-vite";
import "../src/tokens/tokens.css";
import "../src/styles.css";
import "./preview.css";

const preview: Preview = {
  initialGlobals: {
    scheme: "dark",
  },
  globalTypes: {
    scheme: {
      description: "Color scheme",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "dark", title: "Dark" },
          { value: "light", title: "Light" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: "padded",
    options: {
      storySort: {
        order: [
          "Foundations",
          "Button",
          "Filter",
          "ChartFrame",
          "DataTable",
          "StreamRow",
          "EmptyState",
          "Book desk",
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const scheme = context.globals.scheme === "light" ? "light" : "dark";
      document.documentElement.dataset.scheme = scheme;
      return (
        <div className="catalog-frame">
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
