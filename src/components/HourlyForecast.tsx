import React from "react";
import { WiDaySunny, WiDayCloudy } from "react-icons/wi";
import Typography from "../web-building-blocks/Atoms/Typography";

interface HourlyData {
  time: string;
  temperature: number;
  weather: "sunny" | "partly-cloudy";
  windSpeed: number;
  windDirection: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";
}

interface HourlyForecastProps {
  hours: HourlyData[];
}

const WeatherIcon: React.FC<{ type: HourlyData["weather"] }> = ({ type }) => {
  const iconProps = { size: 32, className: "text-yellow-400" };

  switch (type) {
    case "sunny":
      return <WiDaySunny {...iconProps} />;
    case "partly-cloudy":
      return <WiDayCloudy {...iconProps} />;
    default:
      return null;
  }
};

const WindArrow: React.FC<{ direction: HourlyData["windDirection"] }> = ({
  direction,
}) => {
  const getRotation = () => {
    const directions = {
      N: 0,
      NE: 45,
      E: 90,
      SE: 135,
      S: 180,
      SW: 225,
      W: 270,
      NW: 315,
    };
    return directions[direction];
  };

  return (
    <div
      className="w-6 h-6 flex items-center justify-center"
      style={{ transform: `rotate(${getRotation()}deg)` }}
    >
      <div className="text-blue-400 text-2xl">▲</div>
    </div>
  );
};

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hours }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <Typography variant="subtitle1" className="text-white mb-6 text-center">
        Hourly Forecast:
      </Typography>
      <div className="flex gap-4 justify-between">
        {hours.map((hour, index) => (
          <div
            key={index}
            className="bg-gray-700 rounded-lg p-4 flex flex-col items-center space-y-2 min-w-[80px]"
          >
            <Typography variant="body1-strong" className="text-white">
              {hour.time}
            </Typography>
            <WeatherIcon type={hour.weather} />
            <Typography variant="subtitle2" className="text-white">
              {hour.temperature}°C
            </Typography>
            <WindArrow direction={hour.windDirection} />
            <Typography variant="caption1" className="text-gray-400">
              {hour.windSpeed}km/h
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
