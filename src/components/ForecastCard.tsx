import React from "react";
import {
  WiDaySunnyOvercast,
  WiDayCloudy,
  WiDaySunny,
  WiCloudy,
  WiRain,
} from "react-icons/wi";
import Typography from "../web-building-blocks/Atoms/Typography";

interface ForecastDay {
  date: string;
  temperature: number;
  weather: "partly-cloudy" | "mostly-cloudy" | "sunny" | "cloudy" | "rainy";
}

interface ForecastCardProps {
  days: ForecastDay[];
}

const WeatherIcon: React.FC<{ type: ForecastDay["weather"] }> = ({ type }) => {
  const iconProps = { size: 24, className: "text-white" };

  switch (type) {
    case "partly-cloudy":
      return <WiDaySunnyOvercast {...iconProps} />;
    case "mostly-cloudy":
      return <WiDayCloudy {...iconProps} />;
    case "sunny":
      return <WiDaySunny {...iconProps} />;
    case "cloudy":
      return <WiCloudy {...iconProps} />;
    case "rainy":
      return <WiRain {...iconProps} />;
    default:
      return null;
  }
};

const ForecastCard: React.FC<ForecastCardProps> = ({ days }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg w-[300px]">
      <Typography variant="subtitle1" className="text-white mb-4">
        5 Days Forecast:
      </Typography>
      <div className="space-y-4">
        {days.map((day, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <WeatherIcon type={day.weather} />
              <Typography variant="body1-strong" className="text-white">
                {day.temperature}°C
              </Typography>
            </div>
            <Typography variant="body2" className="text-gray-400">
              {day.date}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
