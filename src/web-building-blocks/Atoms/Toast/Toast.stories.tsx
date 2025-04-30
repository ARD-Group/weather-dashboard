import type { Meta, StoryObj } from "@storybook/react";
import { Toast, Toaster } from ".";
import { ToasterProps } from "./toastInterface";

const meta: Meta<ToasterProps> = {
  title: "Atoms/Toast",
  args: {
    position: "bottom-right",
    dir: "ltr",
  },
  decorators: [
    (Story, props) => {
      return (
        <>
          <Toaster {...props.args} />
          <Story />
        </>
      );
    },
  ],
} satisfies Meta<ToasterProps>;

export default meta;
type Story = StoryObj<ToasterProps>;

export const SuccessDefault: Story = {
  render: () => {
    return (
      <button onClick={() => Toast.toastSuccess("Success Message")}>
        Click Me
      </button>
    );
  },
};

export const ErrorDefault: Story = {
  render: () => {
    return (
      <button onClick={() => Toast.toastError("Error Message")}>
        Click Me
      </button>
    );
  },
};

export const SuccessCustom: Story = {
  args: {
    position: "top-center",
    dir: "rtl",
  },
  render: () => {
    return (
      <button onClick={() => Toast.toastSuccess("Success Message")}>
        Click Me
      </button>
    );
  },
};
