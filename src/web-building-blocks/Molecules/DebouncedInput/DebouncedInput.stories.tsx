import type { Meta, StoryObj } from "@storybook/react";
import DebouncedInput, { type DebouncedInputProps } from "./DebouncedInput";

const meta: Meta<DebouncedInputProps> = {
  title: "Molecules/DebouncedInput",
  component: DebouncedInput,
  argTypes: {
    onChange: {
      action: "changed",
      description:
        "Callback function called after the debounce delay with the input value",
    },
    delay: {
      control: "number",
      description:
        "Delay in milliseconds before triggering the onChange callback",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input field",
    },
    initialValue: {
      control: "text",
      description: "Initial value of the input field",
    },
    value: {
      control: "text",
      description: "Controlled value of the input field",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the input",
    },
  },
  args: {
    onChange: (value: string) => console.log(value),
    delay: 2000,
    placeholder: "Search...",
  },
  parameters: {
    docs: {
      description: {
        component:
          "A debounced input component that delays the onChange callback until the user stops typing for a specified duration. Useful for search inputs and other scenarios where you want to reduce the number of API calls or expensive operations.",
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1f2937" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "2rem", width: "100%", maxWidth: "400px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<DebouncedInputProps>;

export default meta;
type Story = StoryObj<DebouncedInputProps>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Basic usage of DebouncedInput with default settings (2 second delay).",
      },
    },
  },
};

export const WithInitialValue: Story = {
  args: {
    initialValue: "Hello",
  },
  parameters: {
    docs: {
      description: {
        story: "DebouncedInput with an initial value set.",
      },
    },
  },
};

export const WithCustomDelay: Story = {
  args: {
    delay: 5000,
  },
  parameters: {
    docs: {
      description: {
        story:
          "DebouncedInput with a longer delay (5 seconds) before triggering the onChange callback.",
      },
    },
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    placeholder: "Type here...",
  },
  parameters: {
    docs: {
      description: {
        story: "DebouncedInput with a custom placeholder text.",
      },
    },
  },
};

export const WithCustomOnChange: Story = {
  args: {
    onChange: (value: any) => console.log(`value:${value}`),
  },
  parameters: {
    docs: {
      description: {
        story:
          "DebouncedInput with a custom onChange handler that shows an alert with the value.",
      },
    },
  },
};

export const WithPassedValue: Story = {
  args: {
    value: "Passed value",
  },
  parameters: {
    docs: {
      description: {
        story: "Controlled DebouncedInput with a passed value prop.",
      },
    },
  },
};

export const WithCustomStyling: Story = {
  args: {
    className:
      "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
    placeholder: "Custom styled input...",
  },
  parameters: {
    docs: {
      description: {
        story: "DebouncedInput with custom styling using Tailwind CSS classes.",
      },
    },
  },
};
