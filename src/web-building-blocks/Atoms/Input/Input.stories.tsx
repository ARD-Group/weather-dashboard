import type { Meta, StoryObj } from "@storybook/react";
import Input, { InputProps } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onChangeHandler: (v) => console.log("Input clicked", v),
    type: "text",
    inputId: "input-id",
  },
} satisfies Meta<InputProps>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
  },
};

export const Text: Story = {
  args: {
    type: "text",
    placeholder: "Enter your text",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter your number",
  },
};

export const ColorPicker: Story = {
  args: {
    type: "color",
    label: "Select Color",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Enter your text",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email",
    inputId: "email-id",
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Enter your email",
  },
};

export const WithValue: Story = {
  args: {
    value: "Hello",
  },
};

export const WithCustomStyles: Story = {
  args: {
    label: "custom label style",
    styleClasses: {
      root: "text-white p-2 rounded-md",
      label: "text-neutral4",
      input: "text-white p-2 rounded-full",
    },
  },
};

export const Loading: Story = {
  args: {
    placeholder: "Enter your email",
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Enter your email",
    error: "something went wrong",
  },
};

export const Optional: Story = {
  args: {
    placeholder: "Enter your name",
    label: "Name",
    isOptional: true,
  },
};

export const Prefix: Story = {
  args: {
    prefix: "$",
    placeholder: "Enter Price",
    label: "Price",
  },
};

export const Postfix: Story = {
  args: {
    postfix: "KM",
    placeholder: "Enter your Distance",
    label: "Distance",
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    placeholder: "Enter your email",
    label: "Email",
    value: "test@test.com",
  },
};
