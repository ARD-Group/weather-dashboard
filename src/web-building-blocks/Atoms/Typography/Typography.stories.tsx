import type { Meta, StoryObj } from "@storybook/react";
import Typography from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Atoms/Typography",
  component: Typography,
  args: {
    dataTestId: "Typography-test",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof Typography>;

export const All = () => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-4 border p-2">
      <Typography typographyStyle="w-24">Title1</Typography>
      <Typography variant="title1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
    </div>
    <div className="flex items-center gap-4 border p-2">
      <Typography typographyStyle="w-24">Title2</Typography>
      <Typography variant="title2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
    </div>
    <div className="flex items-center gap-4 border p-2">
      <Typography typographyStyle="w-24">Title3</Typography>
      <Typography variant="title3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
    </div>

    <div className="flex items-center gap-4 border p-2">
      <Typography typographyStyle="w-24">subtitle1</Typography>
      <Typography variant="subtitle1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
    </div>

    <div className="flex items-center gap-4 border p-2">
      <Typography typographyStyle="w-24">subtitle2-strong</Typography>
      <Typography variant="subtitle2-strong">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
    </div>

    <div className="flex items-center gap-4 border p-2">
      <Typography typographyStyle="w-24">subtitle2</Typography>
      <Typography variant="subtitle2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
    </div>

    <div className="flex items-center gap-4 border p-2">
      <Typography typographyStyle="w-24">body2</Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
    </div>

    <div className="flex items-center gap-4 border p-2">
      <Typography typographyStyle="w-24">body1-stronger</Typography>
      <Typography variant="body1-stronger">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
    </div>

    <div className="flex items-center gap-4 border p-2">
      <Typography typographyStyle="w-24">body1-strong</Typography>
      <Typography variant="body1-strong">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
    </div>

    <div className="flex items-center gap-4 border p-2">
      <Typography typographyStyle="w-24">body1</Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
    </div>

    <div className="flex items-center gap-4 border p-2">
      <Typography typographyStyle="w-24">caption1-stronger</Typography>
      <Typography variant="caption1-stronger">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
    </div>

    <div className="flex items-center gap-4 border p-2">
      <Typography typographyStyle="w-24">caption1-strong</Typography>
      <Typography variant="caption1-strong">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
    </div>

    <div className="flex items-center gap-4 border p-2">
      <Typography typographyStyle="w-24">caption1</Typography>
      <Typography variant="caption1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
    </div>

    <div className="flex items-center gap-4 border p-2">
      <Typography typographyStyle="w-24">caption2-strong</Typography>
      <Typography variant="caption2-strong">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
    </div>

    <div className="flex items-center gap-4 border p-2">
      <Typography typographyStyle="w-24">caption2</Typography>
      <Typography variant="caption2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
    </div>
  </div>
);

export const Default: Story = {};

export const Title1: Story = {
  args: {
    variant: "title1",
  },
};

export const Title2: Story = {
  args: {
    variant: "title2",
  },
};

export const Title3: Story = {
  args: {
    variant: "title3",
  },
};

export const Subtitle1: Story = {
  args: {
    variant: "subtitle1",
  },
};

export const Subtitle2: Story = {
  args: {
    variant: "subtitle2",
  },
};

export const Subtitle2Strong: Story = {
  args: {
    variant: "subtitle2-strong",
  },
};

export const Body2: Story = {
  args: {
    variant: "body2",
  },
};

export const Body1Stronger: Story = {
  args: {
    variant: "body1-stronger",
  },
};

export const Body1Strong: Story = {
  args: {
    variant: "body1-strong",
  },
};

export const Body1: Story = {
  args: {
    variant: "body1",
  },
};

export const Caption1Stronger: Story = {
  args: {
    variant: "caption1-stronger",
  },
};

export const Caption1Strong: Story = {
  args: {
    variant: "caption1-strong",
  },
};

export const Caption1: Story = {
  args: {
    variant: "caption1",
  },
};

export const Caption2Strong: Story = {
  args: {
    variant: "caption2-strong",
  },
};

export const Caption2: Story = {
  args: {
    variant: "caption2",
  },
};
