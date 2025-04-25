import type { Meta, StoryObj } from "@storybook/react";
import SvgIconWrapper, { SvgIconWrapperProps } from "./SvgIconWrapper";

const meta: Meta<typeof SvgIconWrapper> = {
  title: "Atoms/SvgIconWrapper",
  component: SvgIconWrapper,
  argTypes: {},
  args: {
    dataTestId: "SvgIconWrapper-1",
    svgUrl: "",
  },
} satisfies Meta<SvgIconWrapperProps>;

export default meta;
type Story = StoryObj<typeof SvgIconWrapper>;

export const Default: Story = {
  args: {
    dataTestId: "1",
    svgUrl:
      "https://fe-temporary-assets.s3.eu-central-1.amazonaws.com/icons/arrow-up-sm.svg",
  },
};

export const CssColor: Story = {
  args: {
    dataTestId: "2",
    svgUrl:
      "https://fe-temporary-assets.s3.eu-central-1.amazonaws.com/icons/arrow-up-sm.svg",
    styles: {
      wrapper: "w-[30px] h-[30px] rounded-2xl bg-red-700",
    },
    colorType: "css",
    cssColor: "#FFFFFF",
  },
};

export const TailwindColor: Story = {
  args: {
    dataTestId: "3",
    svgUrl:
      "https://fe-temporary-assets.s3.eu-central-1.amazonaws.com/icons/arrow-up-sm.svg",
    styles: {
      wrapper: "w-[30px] h-[30px] rounded bg-blue-700",
    },
    colorType: "tailwind",
    tailwindColor: "secondary",
  },
};
