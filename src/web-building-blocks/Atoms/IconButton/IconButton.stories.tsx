import type { Meta, StoryObj } from "@storybook/react";
import IconButton, { IconButtonProps } from "./IconButton";
import { AArrowDown, ChevronRight, Mail } from "lucide-react";

const meta: Meta<typeof IconButton> = {
  title: "Atoms/IconButton",
  component: IconButton,
  argTypes: {
    variant: {
      options: ["filled", "outlined", "ghost", "link"],
      control: { type: "select" },
    },
    size: {
      options: ["default", "sm", "lg", "icon"],
      control: { type: "select" },
    },
  },
  args: {
    onClick: () => console.log("IconButton clicked"),
    children: <AArrowDown />,
  },
} satisfies Meta<IconButtonProps>;

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export const CustomizedButtonIcon: Story = {
  args: {
    iconButtonStyle:
      "bg-blue-500 text-white p-2 rounded-md hover:bg-red-100 hover:text-slate-500",
  },
};

export const ButtonMailIcon: Story = {
  args: {
    children: <Mail className="h-4 w-4" />,
  },
};
export const ButtonBackIcon: Story = {
  args: {
    children: <ChevronRight className="h-4 w-4" />,
  },
};
