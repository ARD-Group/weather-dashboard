import type { Meta, StoryObj } from "@storybook/react";
import Spinner, { SpinnerProps } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Atoms/Spinner",
  component: Spinner,
  argTypes: {},
  args: {},
} satisfies Meta<SpinnerProps>;

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Spinner size="small" />
      <Spinner size="medium" />
      <Spinner size="large" />
    </div>
  ),
};

export const WithTextAndCustomStyle: Story = {
  args: {
    children: <span className="text-red-400">Loading with custom style</span>,
    className: "text-red-400",
  },
};
