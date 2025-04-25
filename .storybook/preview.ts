import type { Preview } from "@storybook/react";
import "../src/index.css"; // Import your global styles

const preview: Preview = {
  tags: ["autodocs"],

  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      source: {
        type: "dynamic",
        excludeDecorators: true,
      },
    },
  },
};

export default preview;
