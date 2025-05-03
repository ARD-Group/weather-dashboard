import type { Meta, StoryObj } from "@storybook/react";
import Skeleton, { SkeletonProps } from "./Skeleton";
import { Input } from "../Input";
import Typography from "../Typography";

const meta: Meta<typeof Skeleton> = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  argTypes: {},
  args: {
    styleClasses: {
      skeleton: "w-96 h-48",
    },
  },
} satisfies Meta<SkeletonProps>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const Demo: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton styleClasses={{ skeleton: "h-12 w-12 rounded-full" }} />
      <div className="space-y-2">
        <Skeleton styleClasses={{ skeleton: "h-4 w-[250px]" }} />
        <Skeleton styleClasses={{ skeleton: "h-4 w-[200px]" }} />
      </div>
    </div>
  ),
};

export const WithChild: Story = {
  render: () => (
    <Skeleton>
      <div className="h-36 w-80 bg-red-400 text-slate-500">Child with custom style</div>
    </Skeleton>
  ),
};

export const WithCircleChild: Story = {
  render: () => (
    <Skeleton>
      <div className="h-36 w-36 rounded-full bg-red-400">
        Child with custom style
      </div>
    </Skeleton>
  ),
};

export const WithCustomStyle: Story = {
  render: () => (
    <Skeleton>
      <div className="h-16 w-60 rounded-xl bg-blue-400">
        Child with custom style
      </div>
    </Skeleton>
  ),
};

export const InputSkeleton: Story = {
  render: () => (
    <div className="gap-2">
      <div className="flex flex-col gap-2">
        <Typography variant="body1">No Skeleton</Typography>
        <Input styleClasses={{ root: "w-[50rem]" }} />
        <Typography variant="body1">with Skeleton</Typography>
        <Skeleton>
          <Input styleClasses={{ root: "w-[50rem]" }} />
        </Skeleton>
      </div>
    </div>
  ),
};
