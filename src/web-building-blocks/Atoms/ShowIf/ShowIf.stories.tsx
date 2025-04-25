import type { Meta, StoryObj } from "@storybook/react";
import ShowIf, { type ShowIfProps } from "./ShowIf";

const meta: Meta<typeof ShowIf> = {
  title: "Atoms/ShowIf",
  component: ShowIf,
  args: {
    If: true,
    children: "ShowIf",
  },
} satisfies Meta<ShowIfProps>;

export default meta;
type Story = StoryObj<typeof ShowIf>;

export const Default: Story = {};
