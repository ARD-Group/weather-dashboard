import type { Meta, StoryObj } from "@storybook/react";
import Switch, { SwitchProps } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Atoms/Switch",
  component: Switch,
  argTypes: {},
  args: {
    dataTestId: "Switch-1",
    label: "Custom Label",
    switchId: "switch-1",
    defaultChecked: false,
    onCheckedChange: (checked: boolean) =>
      console.log("CheckedValue:", checked),
  },
} satisfies Meta<SwitchProps>;

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const CustomStyles1: Story = {
  args: {
    styleClasses: {
      switch:
        "data-[state=unchecked]:bg-blue-200 data-[state=checked]:bg-blue-500",
      label: "text-red-600",
    },
  },
};

export const CustomStyles2: Story = {
  args: {
    styleClasses: {
      switch:
        "border border-red-200 rounded-md  data-[state=unchecked]:bg-blue-200 data-[state=checked]:bg-blue-500",
      label: "text-red-600",
    },
  },
};

export const CustomDefaultChecked: Story = {
  args: {
    defaultChecked: true,
  },
};
