import type { Meta, StoryObj } from "@storybook/react";
import Badge, { BadgeProps } from "./Badge";
import { Loader2, Mail } from "lucide-react";
// import timerImage from "../../../public/images/logo192.png";
// import speedImage from "../../../public/images/logo192.png";

import Typography from "../Typography";

const meta: Meta<BadgeProps> = {
  title: "Atoms/Badge",
  component: Badge,
  argTypes: {},
  args: {
    children: "Badge",
  },
} satisfies Meta<BadgeProps>;

export default meta;
type Story = StoryObj<BadgeProps>;

export const Default: Story = {};

export const Filled: Story = {
  args: {
    variant: "filled",
    children: "Filled",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "Outlined",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

export const Customized: Story = {
  args: {
    styleClasses: {
      root: "bg-blue-500 text-white p-2 rounded-md hover:bg-red-100 hover:text-slate-500",
    },
    children: "Customized Chip",
  },
};

export const WithStartIcon: Story = {
  args: {
    startIcon: <Loader2 />,
    children: "With Start Icon",
  },
};

export const WithEndIcon: Story = {
  args: {
    endIcon: <Mail />,
    children: "With End Icon",
  },
};

export const WithStartAndEndIcon: Story = {
  args: {
    startIcon: <Loader2 />,
    endIcon: <Mail />,
    children: "With Start and End Icon",
  },
};

export const AppExample1: Story = {
  args: {
    styleClasses: {
      root: "px-2 bg-neutral1 text-neutral9 rounded-2xl",
    },
    variant: "outlined",
    // startIcon: <img src={timerImage} alt="timer" className="h-4 w-4" />,
    children: <Typography variant="caption1-strong">1h 36m</Typography>,
  },
};

export const AppExample2: Story = {
  args: {
    styleClasses: {
      root: "bg-neutral1 text-neutral9 rounded-2xl",
    },
    variant: "outlined",
    // startIcon: <img src={speedImage} alt="speed" className="h-4 w-4" />,
    children: (
      <Typography typographyStyle="" variant="caption1-strong">
        68km/h
      </Typography>
    ),
  },
};
