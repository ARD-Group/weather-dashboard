import type { Meta, StoryObj } from "@storybook/react";
import Avatar, { AvatarProps } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",

  component: Avatar,
  argTypes: {},
  args: {
    dataTestId: "Avatar-1",
    src: "https://avatars.githubusercontent.com/u/4726921?v=4",
    alt: "avatar",
  },
} satisfies Meta<AvatarProps>;

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const Customized: Story = {
  args: {
    styleClasses: { root: "h-20 w-20" },
  },
};

export const WithFallback: Story = {
  args: {
    src: "",
    styleClasses: { root: "bg-blue-900 text-white-500" },
  },
};

export const CustomizedFallback: Story = {
  args: {
    src: "",
    fallback: "SN",
  },
};

export const Avatar1: Story = {
  args: {
    styleClasses: { root: "h-10 w-10 bg-neutral1", img: "p-[0.625rem]" },
    src: "carImage.svg",
    alt: "avatar",
  },
};
export const Avatar2: Story = {
  args: {
    styleClasses: { root: "h-[6.25rem] w-[6.25rem] bg-neutral1" },
    src: "carImage1.svg",
    alt: "avatar",
  },
};
