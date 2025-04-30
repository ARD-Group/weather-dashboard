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
  const iconProps = { className: "w-[80px] h-[80px] text-base-white" };

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
      className="w-[55px] h-[55px] flex items-center justify-center"
      style={{ transform: `rotate(${getRotation()}deg)` }}
    >
      <div className="text-base-white text-4xl">▲</div>
    </div>
  );
};

const HourCard: React.FC<HourlyData> = ({
  time,
  temperature,
  weather,
  windSpeed,
  windDirection,
}) => {
  return (
    <div className="w-full h-full bg-secondary-dark rounded-card flex flex-col items-center">
      {/* Hour */}
      <Typography
        variant="subtitle1"
        className="text-base-white font-bold mt-[13px]"
      >
        {time}
      </Typography>

      {/* Weather Icon */}
      <div className="mt-[29px]">
        <WeatherIcon type={weather} />
      </div>

      {/* Temperature */}
      <Typography
        variant="subtitle2"
        className="text-base-white font-bold mt-[1px]"
      >
        {temperature}°C
      </Typography>

      {/* Wind Direction */}
      <div className="mt-[4px]">
        <WindArrow direction={windDirection} />
      </div>

      {/* Wind Speed */}
      <Typography
        variant="subtitle2"
        className="text-base-white font-bold mt-[10px]"
      >
        {windSpeed}km/h
      </Typography>
    </div>
  );
};

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hours }) => {
  return (
    <div className="w-full h-full bg-primary-dark dark:bg-base-black rounded-panel shadow-panel p-4 flex">
      <div className="flex flex-col h-full">
        {/* Title */}
        <div className="flex justify-center mb-[54px]">
          <Typography variant="title3" className="text-base-white font-bold">
            Hourly Forecast
          </Typography>
        </div>

        {/* Hour Cards */}
        <div className="flex gap-[15px] px-[20px]">
          {hours.map((hour, index) => (
            <HourCard key={index} {...hour} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
