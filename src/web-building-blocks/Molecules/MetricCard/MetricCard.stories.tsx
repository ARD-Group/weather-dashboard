// MetricCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import MetricCard, { MetricCardProps } from "./MetricCard";
import {
  ArrowLeftSquare,
  CurrencyIcon,
  UserLockIcon,
  ClockIcon,
  WindIcon,
  SunIcon,
  CloudIcon,
  CloudLightningIcon,
} from "lucide-react";

const meta: Meta<typeof MetricCard> = {
  title: "Molecules/MetricCard",
  component: MetricCard,
  argTypes: {
    value: {
      control: "text",
      description:
        "The value to display in the metric (e.g. '41%', '2km/h', '$500')",
    },
    unit: {
      control: "text",
      description: "Unit for the value (optional, e.g. '%', 'km/h', '$')",
    },
    label: {
      control: "text",
      description:
        "Label text that appears below the value (e.g. 'Humidity', 'Wind Speed', 'Revenue')",
    },
    icon: {
      control: "object",
      description:
        "Icon component to display above the value (from Lucide icons or custom)",
    },
    size: {
      control: { type: "select", options: ["sm", "md", "lg"] },
      description: "Size variant for the component (small, medium, or large)",
    },
    className: {
      control: "text",
      description: "Additional class names to apply to the component",
    },
    theme: {
      control: "object",
      description:
        "Custom color theming for the component (valueColor, labelColor, iconColor)",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A flexible metric card component that displays a value with an icon and label. Perfect for displaying statistics, KPIs, or any numerical data with visual context.",
      },
    },
    backgrounds: {
      default: "light-gray",
      values: [
        { name: "light-gray", value: "#f3f4f6" },
        { name: "dark", value: "#1f2937" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{ padding: "2rem", background: "#e5e7eb", borderRadius: "1rem" }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

// Weather Metrics
export const Humidity: Story = {
  args: {
    value: 41,
    unit: "%",
    label: "Humidity",
    icon: <CloudIcon />,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story: "Weather metric showing humidity percentage with a cloud icon.",
      },
    },
  },
};

export const WindSpeed: Story = {
  args: {
    value: 2,
    unit: "km/h",
    label: "Wind Speed",
    icon: <WindIcon />,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story: "Weather metric showing wind speed with a wind icon.",
      },
    },
  },
};

export const Pressure: Story = {
  args: {
    value: 997,
    unit: "hPa",
    label: "Pressure",
    icon: <SunIcon />,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story: "Weather metric showing atmospheric pressure with a sun icon.",
      },
    },
  },
};

export const UVIndex: Story = {
  args: {
    value: 8,
    label: "UV",
    icon: <CloudLightningIcon />,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story: "Weather metric showing UV index without a unit.",
      },
    },
  },
};

// Business Metrics
export const Revenue: Story = {
  args: {
    value: 12.5,
    unit: "k",
    label: "Revenue",
    icon: <CurrencyIcon className="text-emerald-600" />,
    size: "md",
    theme: {
      valueColor: "text-emerald-700",
      labelColor: "text-emerald-600",
      iconColor: "text-emerald-600",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Business metric showing revenue with custom green theme.",
      },
    },
  },
};

export const Users: Story = {
  args: {
    value: 834,
    label: "New Users",
    icon: <UserLockIcon className="text-blue-600" />,
    size: "md",
    theme: {
      valueColor: "text-blue-700",
      labelColor: "text-blue-600",
      iconColor: "text-blue-600",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Business metric showing user count with custom blue theme.",
      },
    },
  },
};

export const Growth: Story = {
  args: {
    value: 24,
    unit: "%",
    label: "Growth",
    icon: <ArrowLeftSquare className="text-purple-600" />,
    size: "md",
    theme: {
      valueColor: "text-purple-700",
      labelColor: "text-purple-600",
      iconColor: "text-purple-600",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Business metric showing growth percentage with custom purple theme.",
      },
    },
  },
};

export const ResponseTime: Story = {
  args: {
    value: 120,
    unit: "ms",
    label: "Response Time",
    icon: <ClockIcon className="text-amber-600" />,
    size: "md",
    theme: {
      valueColor: "text-amber-700",
      labelColor: "text-amber-600",
      iconColor: "text-amber-600",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Performance metric showing response time with custom amber theme.",
      },
    },
  },
};

// Size variants
export const Small: Story = {
  args: {
    value: 41,
    unit: "%",
    label: "Humidity",
    icon: <CloudIcon width={24} height={24} />,
    size: "sm",
  },
  parameters: {
    docs: {
      description: {
        story: "Small size variant of the metric card.",
      },
    },
  },
};

export const Large: Story = {
  args: {
    value: 41,
    unit: "%",
    label: "Humidity",
    icon: <CloudIcon width={40} height={40} />,
    size: "lg",
  },
  parameters: {
    docs: {
      description: {
        story: "Large size variant of the metric card.",
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    value: 41,
    unit: "%",
    label: "Humidity",
    icon: <CloudIcon />,
    size: "md",
    className: {
      root: "bg-blue-100 p-4 rounded-lg shadow",
      iconStyle: "text-blue-600",
      valueStyle: "text-blue-700",
      labelStyle: "text-blue-500",
    },
    theme: {
      valueColor: "text-blue-700",
      labelColor: "text-blue-500",
      iconColor: "text-blue-600",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Metric card with custom styling including background, padding, and shadow.",
      },
    },
  },
};
