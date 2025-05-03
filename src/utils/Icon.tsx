import React from "react";
import { ReactComponent as HumidityIcon } from "../icons/humidity.svg";
import { ReactComponent as WindIcon } from "../icons/wind.svg";
import { ReactComponent as PressureIcon } from "../icons/pressure.svg";
import { ReactComponent as UvIcon } from "../icons/uv.svg";
import { ReactComponent as SunriseIcon } from "../icons/sunrise.svg";
import { ReactComponent as SunsetIcon } from "../icons/sunset.svg";
import { ReactComponent as CurrentLocationIcon } from "../icons/current-location.svg";
import { ReactComponent as NavigationIcon } from "../icons/navigation.svg";
import { ReactComponent as HumidityIconDark } from "../icons/dark/humidity.svg";
import { ReactComponent as WindIconDark } from "../icons/dark/wind.svg";
import { ReactComponent as PressureIconDark } from "../icons/dark/pressure.svg";
import { ReactComponent as UvIconDark } from "../icons/dark/uv.svg";
import { ReactComponent as SunriseIconDark } from "../icons/dark/sunrise.svg";
import { ReactComponent as SunsetIconDark } from "../icons/dark/sunset.svg";
import { useTheme } from "../components/ThemeProvider";

const icons = {
  humidity: HumidityIcon,
  wind: WindIcon,
  pressure: PressureIcon,
  uv: UvIcon,
  sunrise: SunriseIcon,
  sunset: SunsetIcon,
  currentLocation: CurrentLocationIcon,
  navigation: NavigationIcon,
};

const darkIcons = {
  humidity: HumidityIconDark,
  wind: WindIconDark,
  pressure: PressureIconDark,
  uv: UvIconDark,
  sunrise: SunriseIconDark,
  sunset: SunsetIconDark,
  currentLocation: CurrentLocationIcon,
  navigation: NavigationIcon,
};

interface IconProps {
  name: keyof typeof icons;
  size?: number;
  color?: string;
  className?: string;
  direction?: number;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "black",
  className = "",
  direction = 0,
}) => {
  const { theme } = useTheme();
  const IconComponent = theme === "dark" ? darkIcons[name] : icons[name];

  if (!IconComponent) {
    console.error(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      className={className}
      style={{
        width: size,
        height: size,
        color,
        transform: `rotate(${direction}deg)`,
      }}
    />
  );
};

export default Icon;
