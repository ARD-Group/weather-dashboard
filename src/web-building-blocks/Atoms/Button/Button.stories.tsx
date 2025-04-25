import type { Meta, StoryObj } from "@storybook/react";
import { Loader2, Mail } from "lucide-react";

import Button, { ButtonProps } from "./Button";

const meta: Meta<ButtonProps> = {
  title: "Atoms/Button",
  component: Button,

  argTypes: {},
  args: {
    onClick: () => console.log("Button clicked"),
    dataTestId: "button-1",
    children: "Button",
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

export const Default: Story = {};

export const Filled: Story = {
  args: {
    variant: "filled",
    children: "Filled",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "destructive",
  },
};

export const Customized: Story = {
  args: {
    buttonStyle:
      "bg-blue-500 text-white p-2 rounded-md hover:bg-red-100 hover:text-slate-500",
    children: "Customized Button",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <p>Please wait</p>
      </>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Mail className="mr-2 h-4 w-4" />
        Login with Email
      </>
    ),
  },
};
