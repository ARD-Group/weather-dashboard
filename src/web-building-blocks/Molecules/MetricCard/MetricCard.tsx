// MetricCard.tsx
import React, { ReactElement } from "react";
import { cn } from "../../shadcnUI/lib/utils";
export interface MetricCardProps {
  /**
   * The value to display in the metric (e.g. "41%", "2km/h", "$500")
   */
  value: string | number;

  /**
   * The unit for the value (optional, e.g. "%", "km/h", "$")
   */
  unit?: string;

  /**
   * The label for the metric (e.g. "Humidity", "Wind Speed", "Revenue")
   */
  label: string;

  /**
   * Icon to display above the value
   */
  icon: ReactElement;

  /**
   * Additional className for the container
   */
  className?: {
    root?: string;
    iconStyle?: string;
    valueStyle?: string;
    labelStyle?: string;
  };

  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg";

  /**
   * Custom color theme
   */
  theme?: {
    valueColor?: string;
    labelColor?: string;
    iconColor?: string;
  };

  /**
   * Data test ID for testing
   */
  dataTestId?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  value,
  unit,
  label,
  icon,
  className = {
    root: "",
    iconStyle: "",
    valueStyle: "",
    labelStyle: "",
  },
  size = "md",
  theme = {
    valueColor: "text-gray-800",
    labelColor: "text-gray-600",
    iconColor: "text-gray-800",
  },
  dataTestId = "metric-card",
}) => {
  // Size variants
  const sizeClasses = {
    sm: {
      valueText: "text-4xl",
      labelText: "text-lg",
      iconClass: "mb-1 w-6 h-6",
    },
    md: {
      valueText: "text-5xl",
      labelText: "text-xl",
      iconClass: "mb-1 w-8 h-8",
    },
    lg: {
      valueText: "text-6xl",
      labelText: "text-2xl",
      iconClass: "mb-2 w-10 h-10",
    },
  };

  const valueDisplay = unit ? `${value}${unit}` : value;

  // Helper function to handle icon rendering with optional color
  const renderIcon = () => {
    if (React.isValidElement<{ className?: string }>(icon)) {
      return React.cloneElement(icon, {
        className: `${icon.props.className || ""} ${theme.iconColor}`,
      } as React.HTMLAttributes<HTMLElement>);
    }
    return icon;
  };

  return (
    <div
      className={cn(
        className.root,
        "flex flex-col items-center",
      )}
      data-testid={dataTestId}
    >
      <div className={cn(sizeClasses[size].iconClass, className.iconStyle)}>
        {renderIcon()}
      </div>

      <p
        className={cn(
          sizeClasses[size].valueText,
          "font-bold",
          theme.valueColor,
          className.valueStyle,
        )}
      >
        {valueDisplay}
      </p>

        <p className={cn(sizeClasses[size].labelText, theme.labelColor, className.labelStyle)}>
        {label}
      </p>
    </div>
  );
};

export default MetricCard;
