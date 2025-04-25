import React from "react";

import { MetricCard } from "../../web-building-blocks/Molecules";
import { Thermometer } from "lucide-react";
import { cn } from "../../web-building-blocks/shadcnUI/lib/utils";

interface WeatherDetailsProps {
  temperature: number;

}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ temperature }) => {
  return (
    <MetricCard
      value={temperature}
      label="Temperature"
      icon={<Thermometer />}
      className={{
        root: cn("text-foreground"),
        iconStyle: cn("text-foreground"),
        valueStyle: cn("text-foreground"),
        labelStyle: cn("text-foreground"),
      }}
      unit="°C"
    />
  );
};

export default WeatherDetails;
