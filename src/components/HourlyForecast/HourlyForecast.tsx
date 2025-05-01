import React from "react";
import { WiDaySunny, WiDayCloudy } from "react-icons/wi";
import Typography from "../../web-building-blocks/Atoms/Typography";

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
  const iconProps = {
    className: "w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-text",
  };

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
      className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center"
      style={{ transform: `rotate(${getRotation()}deg)` }}
    >
      <div className=" text-2xl md:text-3xl lg:text-4xl text-text">▲</div>
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
    <div className="w-20 sm:w-24 md:w-28 lg:w-32 h-full bg-secondary-light dark:bg-secondary-dark rounded-card flex flex-col items-center flex-shrink-0">
      {/* Hour */}
      <Typography variant="subtitle1" className=" font-bold mt-2 md:mt-3">
        {time}
      </Typography>

      {/* Weather Icon */}
      <div className="mt-2 md:mt-4 lg:mt-6">
        <WeatherIcon type={weather} />
      </div>

      {/* Temperature */}
      <Typography variant="subtitle2" className=" font-bold mt-1">
        {temperature}°C
      </Typography>

      {/* Wind Direction */}
      <div className="mt-1 md:mt-2">
        <WindArrow direction={windDirection} />
      </div>

      {/* Wind Speed */}
      <Typography variant="subtitle2" className=" font-bold mt-1 md:mt-2 mb-2">
        {windSpeed}km/h
      </Typography>
    </div>
  );
};

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hours }) => {
  return (
    <div className="w-full h-full text-center bg-card-bg rounded-panel shadow-panel p-2 md:p-4">
      <div className="flex flex-col h-full">
        {/* Title */}
        <div className="flex justify-center mb-4 md:mb-6 lg:mb-12">
          <Typography variant="title3" className=" font-bold">
            Hourly Forecast
          </Typography>
        </div>

        {/* Hour Cards */}
        <div className="flex justify-evenly  pb-4 gap-1 sm:gap-2 md:gap-3 px-2 sm:px-4 items-center overflow-x-hidden">
          {hours.map((hour, index) => (
            <HourCard key={index} {...hour} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
